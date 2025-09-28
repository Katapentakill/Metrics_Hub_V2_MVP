// 📁 src/lib/types/notifications.ts
// Tipos para notificaciones y alertas

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
