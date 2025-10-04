// 📁 src/lib/types/combined.ts
// Tipos combinados y utilitarios

import { User, UserProfile, SimpleSkill, SimpleLanguage } from './base';
import { Project, Team, TeamMember } from './projects';
import { Skill, UserSkill, Language, UserLanguage } from './base';

// Tipos combinados útiles
export interface SkillWithLevel extends Skill {
  level?: string;
  verified?: number;
}

export interface LanguageWithLevel extends Language {
  level?: string;
}

// Tipos para estadísticas y reportes
// UserStats se importa desde users.ts para evitar duplicación

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
