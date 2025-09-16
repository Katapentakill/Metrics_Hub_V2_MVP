//src/modules/recruitment/shared/constants.ts
import { CandidateStatus, CptOptStatus } from '@/lib/data/mockRecruitmentData';
import { User } from '@/lib/types';

export const STATUS_COLORS: Record<CandidateStatus, string> = {
  'Application Received': 'bg-blue-100 text-blue-700',
  'Application Accepted': 'bg-teal-100 text-teal-700',
  'HR Review': 'bg-purple-100 text-purple-700',
  'Interview Scheduled': 'bg-yellow-100 text-yellow-700',
  'Interview Completed': 'bg-orange-100 text-orange-700',
  'Offer Sent': 'bg-sky-100 text-sky-700',
  'Accepted by HR': 'bg-green-100 text-green-700',
  'Accepted by PM': 'bg-green-100 text-green-700',
  'Accepted by Candidate': 'bg-green-100 text-green-700',
  'Onboard': 'bg-emerald-100 text-emerald-700',
  'Rejected by HR': 'bg-red-100 text-red-700',
  'Rejected by PM': 'bg-red-100 text-red-700',
  'Rejected by Candidate': 'bg-red-100 text-red-700',
};

export const CPT_OPT_COLORS: Record<CptOptStatus, string> = {
  'No Required': 'bg-slate-100 text-slate-700',
  'Requested': 'bg-blue-100 text-blue-700',
  'Received': 'bg-purple-100 text-purple-700',
  'Approved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export const CANDIDATE_STATUSES: CandidateStatus[] = [
  'Application Received',
  'Application Accepted',
  'HR Review',
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Accepted by HR',
  'Accepted by PM',
  'Accepted by Candidate',
  'Rejected by HR',
  'Rejected by PM',
  'Rejected by Candidate',
  'Onboard',
];

export const AVAILABLE_ROLES = [
  'Innovation Manager',
  'Senior Project Manager',
  'Data Analyst',
  'Graphic Designer',
  'Software Developer',
  'UX/UI Designer',
];

export const VOLUNTEER_TYPES = ['Regular', 'CPT', 'OPT'] as const;

export const CPT_OPT_OPTIONS: CptOptStatus[] = [
  'No Required',
  'Requested',
  'Received',
  'Approved',
  'Rejected',
];

export const DELETABLE_STATUSES: CandidateStatus[] = [
  'Rejected by HR',
  'Rejected by PM',
  'Rejected by Candidate',
];

export const ADDABLE_STATUSES: CandidateStatus[] = [
  'Onboard',
];

// FIXED: Proper role permissions interface
export interface RecruitmentRolePermissions {
  canEdit: boolean;
  canDelete: boolean;
  canViewAll: boolean;
  canCreate: boolean;
  canScheduleInterview?: boolean;
  canSubmitFeedback?: boolean;
  canUploadDocuments?: boolean;
  canViewAnalytics?: boolean;
  canExport?: boolean;
}

export const ROLE_PERMISSIONS: Record<User['role'], RecruitmentRolePermissions> = {
  admin: {
    canEdit: false,
    canDelete: false,
    canViewAll: true,
    canCreate: false,
    canViewAnalytics: true,
    canExport: true,
  },
  hr: {
    canEdit: true,
    canDelete: true,
    canViewAll: true,
    canCreate: true,
    canScheduleInterview: true,
    canViewAnalytics: true,
    canExport: true,
  },
  lead_project: {
    canEdit: false,
    canDelete: false,
    canViewAll: false,
    canCreate: false,
    canSubmitFeedback: true,
  },
  volunteer: {
    canEdit: true,
    canDelete: false,
    canViewAll: false,
    canCreate: false,
    canUploadDocuments: true,
  },
  unassigned: {
    canEdit: false,
    canDelete: false,
    canViewAll: false,
    canCreate: false,
  }
};

export const TABLE_CONFIG = {
  admin: {
    showActions: false,
    showFilters: true,
    showAnalytics: true,
    allowEditing: false,
  },
  hr: {
    showActions: true,
    showFilters: true,
    showAnalytics: false,
    allowEditing: true,
  },
  lead_project: {
    showActions: true,
    showFilters: false,
    showAnalytics: false,
    allowEditing: false,
  },
  volunteer: {
    showActions: false,
    showFilters: false,
    showAnalytics: false,
    allowEditing: false,
  },
} as const;

export const DEFAULT_TEXTS = {
  noData: {
    admin: 'No candidates in the system.',
    hr: 'No candidates in the onboarding tracker.',
    lead_project: 'No candidates assigned to your projects.',
    volunteer: 'Your application is not found.',
  },
  pageTitle: {
    admin: 'Recruitment Overview (Admin)',
    hr: 'Recruitment Tracker (HR)',
    lead_project: 'Onboarding Dashboard (Project Lead)',
    volunteer: 'My Application Status',
  },
  addButton: 'Add Candidate',
  searchPlaceholder: 'Search candidates...',
} as const;