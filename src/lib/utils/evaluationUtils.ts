// 📁 src/lib/utils/evaluationUtils.ts
// Utilidades y helpers para el módulo de evaluaciones

import type { Evaluation, EvaluationType, EvaluationStatus, CriteriaScores } from '@/lib/types/evaluations';

// Funciones de formateo
export const formatEvaluationType = (type: EvaluationType): string => {
  const typeLabels: Record<EvaluationType, string> = {
    'performance': 'Evaluación de Desempeño',
    'peer_feedback': 'Feedback de Pares',
    'self_evaluation': 'Auto-evaluación',
    'upward_feedback': 'Feedback Hacia Arriba',
    '360_feedback': 'Feedback 360°'
  };
  return typeLabels[type] || type;
};

export const formatEvaluationStatus = (status: EvaluationStatus): string => {
  const statusLabels: Record<EvaluationStatus, string> = {
    'pending': 'Pendiente',
    'in_progress': 'En Progreso',
    'completed': 'Completada',
    'overdue': 'Vencida'
  };
  return statusLabels[status] || status;
};

export const getStatusColor = (status: EvaluationStatus): string => {
  const statusColors: Record<EvaluationStatus, string> = {
    'completed': 'text-green-600 bg-green-100 border-green-200',
    'in_progress': 'text-blue-600 bg-blue-100 border-blue-200',
    'pending': 'text-yellow-600 bg-yellow-100 border-yellow-200',
    'overdue': 'text-red-600 bg-red-100 border-red-200'
  };
  return statusColors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
};

// Funciones de cálculo
export const calculateOverallScore = (criteriaScores: CriteriaScores): number => {
  const scores = Object.values(criteriaScores).filter(score => score && score > 0) as number[];
  return scores.length > 0 ? scores.reduce((acc, score) => acc + score, 0) / scores.length : 0;
};

export const calculateCompletionRate = (evaluations: Evaluation[]): number => {
  if (evaluations.length === 0) return 0;
  const completed = evaluations.filter(e => e.status === 'completed').length;
  return (completed / evaluations.length) * 100;
};

export const calculateAverageScore = (evaluations: Evaluation[]): number => {
  const completedEvals = evaluations.filter(e => e.overall_score);
  if (completedEvals.length === 0) return 0;
  return completedEvals.reduce((acc, e) => acc + (e.overall_score || 0), 0) / completedEvals.length;
};

// Funciones de fecha
export const formatDate = (dateStr: string, locale: string = 'es-ES'): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};

export const formatDateTime = (dateStr: string, locale: string = 'es-ES'): string => {
  const date = new Date(dateStr);
  return date.toLocaleString(locale, { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateDaysUntilDue = (dueDate: string): number | null => {
  const today = new Date();
  const deadline = new Date(dueDate);
  const diffTime = deadline.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDate: string, status: EvaluationStatus): boolean => {
  if (status === 'completed') return false;
  const daysUntilDue = calculateDaysUntilDue(dueDate);
  return daysUntilDue !== null && daysUntilDue < 0;
};

export const isUrgent = (dueDate: string, status: EvaluationStatus, urgentThreshold: number = 3): boolean => {
  if (status === 'completed') return false;
  const daysUntilDue = calculateDaysUntilDue(dueDate);
  return daysUntilDue !== null && daysUntilDue <= urgentThreshold && daysUntilDue >= 0;
};

// Funciones de validación
export const validateEvaluationForm = (data: {
  evaluated_user_id: string;
  evaluator_id: string;
  period_id: string;
  due_date: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.evaluated_user_id) {
    errors.evaluated_user_id = 'Debe seleccionar un usuario a evaluar';
  }

  if (!data.evaluator_id) {
    errors.evaluator_id = 'Debe seleccionar un evaluador';
  }

  if (!data.period_id) {
    errors.period_id = 'Debe seleccionar un período';
  }

  if (!data.due_date) {
    errors.due_date = 'Debe establecer una fecha límite';
  }

  if (data.evaluated_user_id === data.evaluator_id) {
    errors.evaluator_id = 'El evaluador no puede ser la misma persona que el evaluado';
  }

  // Validar que la fecha límite no sea en el pasado
  if (data.due_date) {
    const today = new Date();
    const dueDate = new Date(data.due_date);
    if (dueDate < today) {
      errors.due_date = 'La fecha límite no puede ser en el pasado';
    }
  }

  return errors;
};

export const validateFeedbackContent = (content: string, minLength: number = 10): string | null => {
  if (!content.trim()) {
    return 'El contenido del feedback es requerido';
  }

  if (content.length < minLength) {
    return `El feedback debe tener al menos ${minLength} caracteres`;
  }

  return null;
};

// Funciones de filtrado y búsqueda
export const filterEvaluationsByStatus = (evaluations: Evaluation[], status: EvaluationStatus | 'all'): Evaluation[] => {
  if (status === 'all') return evaluations;
  return evaluations.filter(e => e.status === status);
};

export const filterEvaluationsByType = (evaluations: Evaluation[], type: EvaluationType | 'all'): Evaluation[] => {
  if (type === 'all') return evaluations;
  return evaluations.filter(e => e.type === type);
};

export const filterEvaluationsByPeriod = (evaluations: Evaluation[], periodId: string | 'all'): Evaluation[] => {
  if (periodId === 'all') return evaluations;
  return evaluations.filter(e => e.period_id === periodId);
};

export const filterEvaluationsByEvaluator = (evaluations: Evaluation[], evaluatorId: string | 'all'): Evaluation[] => {
  if (evaluatorId === 'all') return evaluations;
  return evaluations.filter(e => e.evaluator_id === evaluatorId);
};

export const searchEvaluations = (evaluations: Evaluation[], query: string, users: { id: string; name: string; email: string }[]): Evaluation[] => {
  if (!query.trim()) return evaluations;
  
  const lowerQuery = query.toLowerCase();
  
  return evaluations.filter(evaluation => {
    const evaluatedUser = users.find(u => u.id === evaluation.evaluated_user_id);
    const evaluator = users.find(u => u.id === evaluation.evaluator_id);
    
    return (
      evaluatedUser?.name.toLowerCase().includes(lowerQuery) ||
      evaluatedUser?.email.toLowerCase().includes(lowerQuery) ||
      evaluator?.name.toLowerCase().includes(lowerQuery) ||
      evaluation.feedback_text?.toLowerCase().includes(lowerQuery) ||
      evaluation.strengths?.toLowerCase().includes(lowerQuery) ||
      evaluation.improvement_areas?.toLowerCase().includes(lowerQuery)
    );
  });
};

// Funciones de análisis
export const getRiskLevel = (averageScore: number): 'low' | 'medium' | 'high' => {
  if (averageScore < 3.0) return 'high';
  if (averageScore < 4.0) return 'medium';
  return 'low';
};

export const getTrend = (currentScore: number, previousScore: number): 'improving' | 'declining' | 'stable' => {
  const diff = currentScore - previousScore;
  if (diff > 0.2) return 'improving';
  if (diff < -0.2) return 'declining';
  return 'stable';
};

export const getPriorityLevel = (dueDate: string, status: EvaluationStatus): 'urgent' | 'high' | 'medium' | 'low' => {
  if (status === 'completed') return 'low';
  
  const daysUntilDue = calculateDaysUntilDue(dueDate);
  if (daysUntilDue === null) return 'low';
  
  if (daysUntilDue < 0) return 'urgent'; // Overdue
  if (daysUntilDue <= 3) return 'urgent';
  if (daysUntilDue <= 7) return 'high';
  if (daysUntilDue <= 14) return 'medium';
  return 'low';
};

// Funciones de exportación
export const generateCSVData = (evaluations: Evaluation[], users: { id: string; name: string; email: string }[]): string => {
  const headers = [
    'ID',
    'Usuario Evaluado',
    'Email',
    'Evaluador',
    'Tipo',
    'Estado',
    'Puntuación General',
    'Fecha Límite',
    'Fecha Completada',
    'Compromiso',
    'Puntualidad',
    'Habilidades Técnicas',
    'Trabajo en Equipo',
    'Iniciativa',
    'Creatividad',
    'Adaptación Cultural'
  ];

  const csvData = evaluations.map(evaluation => {
    const evaluatedUser = users.find(u => u.id === evaluation.evaluated_user_id);
    const evaluator = users.find(u => u.id === evaluation.evaluator_id);
    
    return [
      evaluation.id,
      evaluatedUser?.name || 'N/A',
      evaluatedUser?.email || 'N/A',
      evaluator?.name || 'N/A',
      formatEvaluationType(evaluation.type),
      formatEvaluationStatus(evaluation.status),
      evaluation.overall_score || 'N/A',
      evaluation.due_date || 'N/A',
      evaluation.completed_date || 'N/A',
      evaluation.criteria_scores?.commitment || 'N/A',
      evaluation.criteria_scores?.punctuality || 'N/A',
      evaluation.criteria_scores?.technical_skills || 'N/A',
      evaluation.criteria_scores?.teamwork || 'N/A',
      evaluation.criteria_scores?.initiative || 'N/A',
      evaluation.criteria_scores?.creativity || 'N/A',
      evaluation.criteria_scores?.cultural_adaptation || 'N/A'
    ];
  });

  return [headers, ...csvData]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
};

// Funciones de helpers para UI
export const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
};

export const getProgressColor = (progress: number): string => {
  if (progress === 100) return 'bg-gradient-to-r from-green-400 to-green-500';
  if (progress >= 50) return 'bg-gradient-to-r from-blue-400 to-blue-500';
  return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
};

export const getScoreColor = (score: number): string => {
  if (score >= 4.5) return 'text-green-600';
  if (score >= 4.0) return 'text-blue-600';
  if (score >= 3.5) return 'text-yellow-600';
  if (score >= 3.0) return 'text-orange-600';
  return 'text-red-600';
};

// Constantes útiles
export const CRITERIA_LABELS = {
  commitment: 'Compromiso',
  punctuality: 'Puntualidad',
  technical_skills: 'Habilidades Técnicas',
  teamwork: 'Trabajo en Equipo',
  initiative: 'Iniciativa',
  creativity: 'Creatividad',
  cultural_adaptation: 'Adaptación Cultural'
} as const;

export const EVALUATION_TYPE_DESCRIPTIONS = {
  performance: 'Evaluación formal del rendimiento y desempeño',
  peer_feedback: 'Evaluación entre compañeros de trabajo del mismo nivel',
  self_evaluation: 'Auto-evaluación del propio desempeño',
  upward_feedback: 'Evaluación del supervisor por parte de subordinados',
  '360_feedback': 'Evaluación integral desde múltiples perspectivas'
} as const;

export const PRIORITY_THRESHOLDS = {
  urgent: 3,
  high: 7,
  medium: 14
} as const;