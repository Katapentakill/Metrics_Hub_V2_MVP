// 📁 src/lib/types/base.ts
// Tipos base y fundamentales del sistema

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'hr' | 'lead' | 'volunteer' | 'unassigned';
  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  avatar?: string;
  email_verified: number;
  created_at: string;
  last_login?: string;
}

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

// Interfaces simplificadas para uso en frontend
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

export interface ExtendedUserWithProfile extends User {
  profile?: UserProfile & {
    // Arrays simplificados para habilidades e idiomas
    skills?: SimpleSkill[];
    languages?: SimpleLanguage[];
    certifications?: string[];
  };
}

// Tipos para configuración del sistema
export interface ConfigurationSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en' | 'pt' | 'fr';
  primaryColor: 'emerald' | 'blue' | 'purple' | 'rose' | 'orange';
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
    evaluationReminders: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'team' | 'private';
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
  };
  display: {
    compactMode: boolean;
    showAvatars: boolean;
    animationsEnabled: boolean;
  };
}