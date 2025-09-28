// 📁 src/lib/types/users.ts
// Tipos relacionados con usuarios y gestión de personal

import { User, UserProfile, UserWithProfile, ExtendedUserWithProfile } from './base';

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

export interface ApplicationWithStages extends Application {
  stages?: ApplicationStage[];
}

// Tipos para estadísticas de usuarios
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  deleted: number;
  byRole: {
    admin: number;
    hr: number;
    lead: number;
    volunteer: number;
    unassigned: number;
  };
  byCountry: Record<string, number>;
  bySkillCategory: Record<string, number>;
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

// Tipos para proyectos de usuario
export interface UserProject {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  role: string;
  start_date: string;
  end_date?: string;
  hours_contributed: number;
  team_size: number;
}

// Tipos para actividad de usuario
export interface ActivityItem {
  id: string;
  user_id: string;
  type: 'project_joined' | 'skill_added' | 'profile_updated' | 'login' | 'achievement';
  description: string;
  timestamp: string;
  metadata?: any;
}

// Tipos para currículum/CV
export interface CVExperience {
  id: string;
  position: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  achievements: string[];
}

export interface CVEducation {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start_date: string;
  end_date?: string;
  gpa?: string;
  honors?: string;
  relevant_courses?: string[];
}

export interface CVData {
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
  volunteer_experience: Array<{
    organization: string;
    role: string;
    start_date: string;
    end_date?: string;
    description: string;
  }>;
  cv_file_url?: string;
  last_updated: string;
}

// Re-exportar tipos base
export type { User, UserProfile, UserWithProfile, ExtendedUserWithProfile };
