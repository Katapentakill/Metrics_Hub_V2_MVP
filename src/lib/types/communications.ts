// 📁 src/lib/types/communications.ts
// Tipos para el sistema de comunicaciones

export interface Communication {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'announcement' | 'update' | 'reminder' | 'event';
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  author_name: string;
  created_at: string;
  published_at?: string;
  updated_at: string;
  tags: string[];
  image_url?: string;
  excerpt: string;
  featured: boolean;
  target_audience: 'all' | 'volunteers' | 'coordinators' | 'donors' | 'leads' | 'hr' | 'admin';
  location?: string;
  deadline?: string;
  event_date?: string;
  registration_required?: boolean;
  read_count: number;
  likes_count: number;
  comments_count: number;
}

export interface CommunicationStats {
  total_communications: number;
  published_communications: number;
  draft_communications: number;
  archived_communications: number;
}

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
