// src/lib/types/types.ts

// Tipos principales para la base de datos
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'hr' | 'lead_project' | 'volunteer' | 'unassigned';
  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  avatar?: string;
  email_verified: number;
  created_at: string;
  last_login?: string;
}

// UserProfile extendido según el blueprint
export interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  country: string;
  city: string;
  timezone: string;
  bio?: string;
  birth_date?: string;
  hours_per_week: 10 | 20;
  preferred_days?: string;
  preferred_hours: string;
  // Campos adicionales del blueprint
  linkedin?: string;
  github?: string;
  portfolio?: string;
  motivation?: string;
  university?: string;
  program?: string;
  supervisor_name?: string;
  supervisor_email?: string;
  // Referencias profesionales (para profesionales internacionales)
  professional_reference_1_name?: string;
  professional_reference_1_company?: string;
  professional_reference_1_email?: string;
  professional_reference_2_name?: string;
  professional_reference_2_company?: string;
  professional_reference_2_email?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  lead_id: string;
  status: 'planning' | 'active' | 'completed' | 'paused' | 'cancelled';
  max_team_size: number;
  current_team_size: number;
  deadline?: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project_id: string;
  assigned_to?: string;
  created_by: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'testing' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_hours: number;
  actual_hours?: number;
  due_date?: string;
  created_at: string;
  tags?: string;
}

export interface Application {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  city: string;
  birth_date?: string;
  type: 'regular' | 'student_usa' | 'student_intl' | 'professional_intl';
  current_stage: number;
  status: 'submitted' | 'in_review' | 'accepted' | 'rejected' | 'waiting_list';
  assigned_to_hr?: string;
  cv_path?: string;
  notes?: string;
  created_at: string;
  completed_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'development' | 'design' | 'marketing' | 'analytics' | 'management' | 'communication' | 'hr';
  description?: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verified: number;
  verified_by?: string;
  verified_at?: string;
}

export interface Language {
  id: string;
  code: string;
  name: string;
}

export interface UserLanguage {
  id: string;
  user_id: string;
  language_id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

export interface Team {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  lead_id: string;
  max_size: number;
  current_size: number;
  timezone: string;
  working_hours: string;
  primary_language: string;
  status: 'forming' | 'active' | 'completed' | 'disbanded';
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  joined_at: string;
  role: 'lead' | 'member' | 'mentor';
  status: 'active' | 'inactive' | 'left';
}

export interface TeamSkillRequirement {
  id: string;
  team_id: string;
  skill_id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  is_required: number;
  priority: number;
}

export interface ApplicationStage {
  id: string;
  application_id: string;
  stage: number;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'failed';
  started_at?: string;
  completed_at?: string;
  notes?: string;
  completed_by?: string;
}

export interface Interview {
  id: string;
  application_id: string;
  scheduled_at: string;
  duration: number;
  zoom_link?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface Evaluation {
  id: string;
  evaluated_user_id: string;
  evaluator_id: string;
  type: 'performance' | 'peer' | '360' | 'self';
  period: string;
  overall_score: number;
  criteria_scores?: string;
  comments?: string;
  status: 'pending' | 'completed' | 'reviewed';
  created_at: string;
  due_date: string;
  completed_at?: string;
}

export interface Feedback {
  id: string;
  from_user_id: string;
  to_user_id: string;
  type: 'upward' | 'downward' | 'peer';
  is_anonymous: number;
  content: string;
  tags?: string;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  type: 'certificate' | 'letter' | 'agreement' | 'reference';
  title: string;
  content: string;
  verification_code: string;
  status: 'draft' | 'generated' | 'sent' | 'verified';
  expires_at?: string;
  created_at: string;
  metadata?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'task_assigned' | 'evaluation_due' | 'document_expiring' | 'system_update' | 'general';
  title: string;
  message: string;
  data?: string;
  is_read: number;
  created_at: string;
}

// Interfaces adicionales para habilidades y idiomas simplificados (para uso en frontend)
export interface SimpleSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'development' | 'design' | 'marketing' | 'analytics' | 'management' | 'communication' | 'hr';
}

export interface SimpleLanguage {
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

// Tipos combinados útiles
export interface UserWithProfile extends User {
  profile?: UserProfile;
}

export interface TaskWithProject extends Task {
  project_name?: string;
}

export interface ProjectWithLead extends Project {
  lead_name?: string;
}

export interface SkillWithLevel extends Skill {
  level?: string;
  verified?: number;
}

export interface LanguageWithLevel extends Language {
  level?: string;
}

export interface ApplicationWithStages extends Application {
  stages?: ApplicationStage[];
}

export interface TeamWithMembers extends Team {
  members?: (TeamMember & { user_name?: string })[];
}

export interface ProjectWithTeam extends Project {
  team?: Team;
  lead_name?: string;
}

// Tipo extendido para uso en frontend con arrays simplificados
export interface ExtendedUserWithProfile extends User {
  profile?: UserProfile & {
    // Arrays simplificados para habilidades e idiomas
    skills?: SimpleSkill[];
    languages?: SimpleLanguage[];
    certifications?: string[];
  };
}

// Tipos para estadísticas y reportes
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  deleted: number;
  byRole: {
    admin: number;
    hr: number;
    lead_project: number;
    volunteer: number;
    unassigned: number;
  };
  byCountry: Record<string, number>;
  bySkillCategory: Record<string, number>;
}

// Tipos para matching inteligente
export interface MatchingScore {
  user_id: string;
  team_id: string;
  total_score: number;
  breakdown: {
    technical_skills: number;
    timezone_compatibility: number;
    availability: number;
    language: number;
    experience: number;
  };
  recommendation: 'perfect_match' | 'high_compatibility' | 'good_fit' | 'medium_fit' | 'low_compatibility';
}

// Tipos para el proceso de reclutamiento
export interface RecruitmentPipeline {
  stage_1_submitted: number;
  stage_2_initial_filter: number;
  stage_3_video_evaluation: number;
  stage_4_interview: number;
  stage_5_final_decision: number;
  stage_6_onboarding: number;
  conversion_rates: {
    stage_1_to_2: number;
    stage_2_to_3: number;
    stage_3_to_4: number;
    stage_4_to_5: number;
    stage_5_to_6: number;
    overall: number;
  };
}

// Tipos para evaluaciones de desempeño
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

// Tipos para certificados y documentos
export interface CertificateData {
  type: 'participation' | 'outstanding_contribution' | 'leadership' | 'technical_specialization' | 'community_service' | 'volunteer_of_the_year';
  recipient_name: string;
  service_period: {
    start_date: string;
    end_date: string;
  };
  total_hours: number;
  main_project: string;
  key_skills: string[];
  verification_code: string;
  issued_date: string;
  expires_date?: string;
  issuer_signature: string;
}

// Tipos para comunicaciones y notificaciones
export interface CommunicationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  purpose: 'application_confirmation' | 'video_request' | 'interview_confirmation' | 'acceptance_letter' | 'document_reminder' | 'evaluation_invitation';
  language: 'es' | 'en';
  region?: 'usa' | 'latin_america' | 'europe' | 'other';
  subject: string;
  content: string;
  variables: string[]; // Array of placeholder variables like {name}, {project}, etc.
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationSettings {
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  notification_schedule: '24_7' | 'work_hours_only' | 'custom';
  custom_schedule?: {
    start_time: string;
    end_time: string;
    days: string[];
  };
  blocked_notification_types: string[];
  digest_frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}