// 📁 src/lib/utils/evaluationFilters.ts
// Utilidades para filtrar evaluaciones según el rol del usuario

import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';
import type { ExtendedUserWithProfile } from '@/lib/types';
import type { EvaluationMetrics, PerformanceInsight } from '@/lib/types/evaluations';

export interface FilteredEvaluationData {
  evaluations: EvaluationView[];
  metrics: EvaluationMetrics;
  performanceInsights: PerformanceInsight[];
  users: ExtendedUserWithProfile[];
}

/**
 * Filtra evaluaciones para un volunteer - solo sus propias evaluaciones
 */
export function filterEvaluationsForVolunteer(
  allEvaluations: EvaluationView[],
  allUsers: ExtendedUserWithProfile[],
  allMetrics: EvaluationMetrics,
  allPerformanceInsights: PerformanceInsight[],
  currentUserId: string
): FilteredEvaluationData {
  // Solo evaluaciones donde el usuario es el evaluado
  const filteredEvaluations = allEvaluations.filter(
    evaluation => evaluation.evaluation.evaluated_user_id === currentUserId
  );

  // Solo el usuario actual
  const filteredUsers = allUsers.filter(user => user.id === currentUserId);

  // Recalcular métricas solo para las evaluaciones del usuario
  const metrics = calculateMetricsForEvaluations(filteredEvaluations);

  // Solo insights del usuario actual
  const performanceInsights = allPerformanceInsights.filter(
    insight => insight.user_id === currentUserId
  );

  return {
    evaluations: filteredEvaluations,
    metrics,
    performanceInsights,
    users: filteredUsers
  };
}

/**
 * Filtra evaluaciones para un lead - evaluaciones de su equipo sin detalles confidenciales
 */
export function filterEvaluationsForLead(
  allEvaluations: EvaluationView[],
  allUsers: ExtendedUserWithProfile[],
  allMetrics: EvaluationMetrics,
  allPerformanceInsights: PerformanceInsight[],
  currentUserId: string,
  projects: any[] // Proyectos donde el usuario es lead
): FilteredEvaluationData {
  // Obtener IDs de miembros del equipo del lead
  const teamMemberIds = new Set<string>();
  
  // Agregar el lead mismo
  teamMemberIds.add(currentUserId);
  
  // Agregar miembros de equipos donde el usuario es lead
  projects.forEach(project => {
    if (project.lead_id === currentUserId) {
      project.team_members.forEach((memberId: string) => {
        teamMemberIds.add(memberId);
      });
    }
  });

  // Filtrar evaluaciones del equipo
  const filteredEvaluations = allEvaluations.filter(
    evaluation => teamMemberIds.has(evaluation.evaluation.evaluated_user_id)
  );

  // Filtrar usuarios del equipo
  const filteredUsers = allUsers.filter(user => teamMemberIds.has(user.id));

  // Recalcular métricas para el equipo
  const metrics = calculateMetricsForEvaluations(filteredEvaluations);

  // Filtrar insights del equipo
  const performanceInsights = allPerformanceInsights.filter(
    insight => teamMemberIds.has(insight.user_id)
  );

  return {
    evaluations: filteredEvaluations,
    metrics,
    performanceInsights,
    users: filteredUsers
  };
}

/**
 * Crea una versión de evaluación sin detalles confidenciales para leads
 */
export function sanitizeEvaluationForLead(
  evaluation: EvaluationView,
  currentUserId: string
): EvaluationView {
  // Si es la evaluación del propio lead, mostrar todos los detalles
  if (evaluation.evaluation.evaluated_user_id === currentUserId) {
    return evaluation;
  }

  // Para evaluaciones del equipo, ocultar detalles confidenciales
  return {
    ...evaluation,
    evaluation: {
      ...evaluation.evaluation,
      // Mantener información básica
      id: evaluation.evaluation.id,
      evaluated_user_id: evaluation.evaluation.evaluated_user_id,
      evaluator_id: evaluation.evaluation.evaluator_id,
      period_id: evaluation.evaluation.period_id,
      type: evaluation.evaluation.type,
      status: evaluation.evaluation.status,
      due_date: evaluation.evaluation.due_date,
      completed_date: evaluation.evaluation.completed_date,
      created_at: evaluation.evaluation.created_at,
      updated_at: evaluation.evaluation.updated_at,
      // Ocultar detalles confidenciales
      overall_score: undefined,
      criteria_scores: undefined,
      feedback_text: undefined,
      strengths: undefined,
      improvement_areas: undefined,
      achievements: undefined,
      challenges: undefined,
      goals_next_period: undefined,
      recommended_training: undefined
    }
  };
}

/**
 * Para HR y Admin - acceso global sin filtros
 */
export function filterEvaluationsForGlobalAccess(
  allEvaluations: EvaluationView[],
  allUsers: ExtendedUserWithProfile[],
  allMetrics: EvaluationMetrics,
  allPerformanceInsights: PerformanceInsight[]
): FilteredEvaluationData {
  return {
    evaluations: allEvaluations,
    metrics: allMetrics,
    performanceInsights: allPerformanceInsights,
    users: allUsers
  };
}

/**
 * Calcula métricas para un conjunto específico de evaluaciones
 */
function calculateMetricsForEvaluations(evaluations: EvaluationView[]): EvaluationMetrics {
  const total = evaluations.length;
  const completed = evaluations.filter(e => e.evaluation.status === 'completed').length;
  const pending = evaluations.filter(e => e.evaluation.status === 'pending').length;
  const overdue = evaluations.filter(e => e.evaluation.status === 'overdue').length;

  const completedEvals = evaluations.filter(e => typeof e.evaluation.overall_score === 'number');
  const averageScore = completedEvals.length > 0
    ? completedEvals.reduce((acc, e) => acc + (e.evaluation.overall_score || 0), 0) / completedEvals.length
    : 0;

  return {
    total_evaluations: total,
    completed_evaluations: completed,
    pending_evaluations: pending,
    overdue_evaluations: overdue,
    average_score: averageScore,
    completion_rate: total > 0 ? (completed / total) * 100 : 0,
    risk_evaluations: overdue + pending
  };
}

/**
 * Obtiene el ID del usuario actual desde la sesión
 */
export function getCurrentUserId(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionData = localStorage.getItem('auth_session');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    return session.userId || null;
  } catch {
    return null;
  }
}

/**
 * Obtiene el rol del usuario actual desde la sesión
 */
export function getCurrentUserRole(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionData = localStorage.getItem('auth_session');
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    return session.role || null;
  } catch {
    return null;
  }
}
