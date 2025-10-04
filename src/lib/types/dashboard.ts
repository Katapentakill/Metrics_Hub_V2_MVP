// 📁 src/lib/types/dashboard.ts
// Tipos para dashboards y métricas

export interface DashboardData {
  total_users: number;
  active_users: number;
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  overdue_tasks: number;
  recent_activity: DashboardActivityItem[];
}

export interface DashboardActivityItem {
  id: string;
  type: 'user' | 'task' | 'project' | 'system' | 'application' | 'evaluation';
  title: string;
  description: string;
  time: string;
  user: string;
  icon: any;
  color: string;
  bgColor: string;
}

export interface HRDashboardData {
  total_applications: number;
  pending_applications: number;
  approved_applications: number;
  rejected_applications: number;
  recent_hires: number;
  onboarding_in_progress: number;
  completed_onboarding: number;
  average_processing_time: number;
  conversion_rate: number;
}

export interface RecentHire {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  startDate: string;
  location: string;
  experience: string;
  source: string;
  onboardingStatus: 'pending' | 'in_progress' | 'completed';
  mentor: string;
  skills: string[];
  notes?: string;
}

export interface PendingApplication {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  position: string;
  appliedDate: string;
  stage: 'initial_review' | 'hr_filter' | 'video_evaluation' | 'interview' | 'final_decision';
  priority: 'low' | 'medium' | 'high';
  experience: string;
  skills: string[];
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  notes?: string;
}

export interface HiringStats {
  thisMonth: number;
  lastMonth: number;
  thisQuarter: number;
  lastQuarter: number;
  yearToDate: number;
  averageProcessingTime: number;
  conversionRate: number;
  topSource: string;
}

export interface RecruitmentMetrics {
  totalApplications: number;
  pendingReview: number;
  inProgress: number;
  completed: number;
  conversionRate: number;
  averageProcessingTime: number;
  activeProcesses: number;
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  icon: any;
}
