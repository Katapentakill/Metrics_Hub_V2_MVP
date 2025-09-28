// 📁 src/lib/types/evaluations.ts
// Tipos para el sistema de evaluaciones

export interface EvaluationPeriod {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  description?: string;
  created_at: string;
  updated_at?: string;
}

export interface CriteriaScores {
  commitment?: number;         // Compromiso
  punctuality?: number;        // Puntualidad
  technical_skills?: number;   // Habilidades técnicas
  teamwork?: number;          // Trabajo en equipo
  initiative?: number;        // Iniciativa
  creativity?: number;        // Creatividad
  cultural_adaptation?: number; // Adaptación cultural
}

export type EvaluationType = 
  | 'performance'        // Evaluación de desempeño
  | 'peer_feedback'      // Feedback de pares
  | 'self_evaluation'    // Auto-evaluación
  | 'upward_feedback'    // Feedback hacia arriba
  | '360_feedback';      // Feedback 360°

export type EvaluationStatus = 
  | 'pending'      // Pendiente
  | 'in_progress'  // En progreso
  | 'completed'    // Completada
  | 'overdue';     // Vencida

export interface Evaluation {
  id: string;
  evaluated_user_id: string;
  evaluator_id: string;
  period_id: string;
  type: EvaluationType;
  status: EvaluationStatus;
  overall_score?: number;
  criteria_scores?: CriteriaScores;
  feedback_text?: string;
  strengths?: string;
  improvement_areas?: string;
  achievements?: string;
  challenges?: string;
  goals_next_period?: string;
  recommended_training?: string;
  due_date?: string;
  completed_date?: string;
  created_at: string;
  updated_at: string;
}

export type FeedbackType = 
  | 'upward'      // Hacia arriba (subordinado a supervisor)
  | 'downward'    // Hacia abajo (supervisor a subordinado)
  | 'horizontal'; // Horizontal (entre pares)

export interface FeedbackSession {
  id: string;
  evaluation_id: string;
  feedback_type: FeedbackType;
  feedback_content: string;
  is_anonymous: boolean;
  created_by: string;
  created_at: string;
  updated_at?: string;
}

// Interfaces para formularios
export interface EvaluationFormData {
  type: EvaluationType;
  evaluated_user_id: string;
  evaluator_id: string;
  period_id: string;
  due_date?: string;
  criteria_scores?: CriteriaScores;
  feedback_text?: string;
  strengths?: string;
  improvement_areas?: string;
  achievements?: string;
  challenges?: string;
  goals_next_period?: string;
  recommended_training?: string;
}

export interface FeedbackFormData {
  evaluation_id: string;
  feedback_type: FeedbackType;
  feedback_content: string;
  is_anonymous: boolean;
}

// Interfaces para análisis y reportes
export interface EvaluationMetrics {
  total_evaluations: number;
  completed_evaluations: number;
  pending_evaluations: number;
  overdue_evaluations: number;
  average_score: number;
  completion_rate: number;
  risk_evaluations: number;
}

export interface PerformanceInsight {
  user_id: string;
  user_name: string;
  average_score: number;
  trend: 'improving' | 'declining' | 'stable';
  risk_level: 'low' | 'medium' | 'high';
  last_evaluation_date?: string;
  areas_of_concern: string[];
  strengths: string[];
}

export interface TeamPerformanceData {
  team_name: string;
  total_members: number;
  average_score: number;
  completion_rate: number;
  high_performers: number;
  at_risk_members: number;
  feedback_quality_score: number;
}

// Interfaces para filtros y búsqueda
export interface EvaluationFilters {
  status?: EvaluationStatus[];
  type?: EvaluationType[];
  period_id?: string;
  evaluator_id?: string;
  date_range?: {
    start: string;
    end: string;
  };
  score_range?: {
    min: number;
    max: number;
  };
  risk_level?: 'low' | 'medium' | 'high';
}

export interface EvaluationSearchParams {
  query?: string;
  filters?: EvaluationFilters;
  sort_by?: 'name' | 'score' | 'date' | 'status';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Tipos para evaluaciones de desempeño extendidas
export interface PerformanceEvaluation {
  user_id: string;
  evaluator_id: string;
  period: string;
  criteria: {
    commitment: number; // 1-5
    punctuality: number; // 1-5
    technical_skills: number; // 1-5
    teamwork: number; // 1-5
    initiative: number; // 1-5
    creativity: number; // 1-5
    cultural_adaptation: number; // 1-5
  };
  weighted_score: number;
  qualitative_feedback: {
    strengths: string[];
    areas_for_improvement: string[];
    achievements: string[];
    challenges_faced: string[];
  };
  development_plan: {
    skills_to_develop: string[];
    suggested_training: string[];
    goals_next_period: string[];
    career_interests: string[];
  };
  status: 'exceptional' | 'outstanding' | 'satisfactory' | 'needs_improvement' | 'inadequate';
  recommended_action: 'promotion' | 'additional_responsibilities' | 'continue_development' | 'improvement_plan' | 'role_change';
}