// src/modules/recruitment/shared/constants.ts
import { CandidateStatus, CptOptStatus } from '@/lib/data/mockRecruitmentData';

// Status colors - centralizados para evitar duplicación
export const STATUS_COLORS: Record<CandidateStatus, string> = {
  'Application Received': 'bg-blue-100 text-blue-700',
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

// CPT/OPT status colors
export const CPT_OPT_COLORS: Record<CptOptStatus, string> = {
  'No required': 'bg-slate-100 text-slate-700',
  'Requested': 'bg-blue-100 text-blue-700',
  'Received': 'bg-purple-100 text-purple-700',
  'Approved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

// Lista completa de estados - para usar en selects y validaciones
export const CANDIDATE_STATUSES: CandidateStatus[] = [
  'Application Received',
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

// Lista ordenada de estados por rol
export const ADMIN_VISIBLE_STATUSES: CandidateStatus[] = [
  'Application Received',
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

export const HR_EDITABLE_STATUSES: CandidateStatus[] = [
  'Application Received',
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

export const LEAD_RELEVANT_STATUSES: CandidateStatus[] = [
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Rejected by PM',
  'Onboard',
];

// Roles disponibles para aplicar
export const AVAILABLE_ROLES = [
  'Innovation Manager',
  'Senior Project Manager',
  'Data Analyst',
  'Graphic Designer',
  'Software Developer',
  'UX/UI Designer',
];

// Tipos de voluntario
export const VOLUNTEER_TYPES = ['Regular', 'CPT', 'OPT'] as const;

// CPT/OPT options
export const CPT_OPT_OPTIONS: CptOptStatus[] = [
  'No required',
  'Requested',
  'Received',
  'Approved',
  'Rejected',
];

// Action button variants para consistencia visual
export const ACTION_BUTTON_VARIANTS = {
  primary: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  success: 'bg-green-100 text-green-700 hover:bg-green-200',
  danger: 'bg-red-100 text-red-700 hover:bg-red-200',
  warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
} as const;

// Tamaños de botones
export const BUTTON_SIZES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
} as const;

// Mensajes de notificación por cambio de estado
export const STATUS_NOTIFICATIONS: Record<CandidateStatus, string> = {
  'Application Received': 'Notification: "HR Review, Schedule Interview"',
  'HR Review': 'Notification: "HR Review in progress"',
  'Interview Scheduled': 'Notification: "Interview Scheduled"',
  'Interview Completed': 'Notification: "Interview Completed"',
  'Offer Sent': 'Notification: "Offer Sent"',
  'Accepted by HR': 'Notification: "PM Schedule Interview"',
  'Accepted by PM': 'Notification: "PM Sent form and HR Send Offer Letter"',
  'Accepted by Candidate': 'Notification: "HR Agreement, Request Docs, Welcome Letter, Records & Access"',
  'Rejected by HR': 'Notification: "Rejected"',
  'Rejected by PM': 'Notification: "Rejected"',
  'Rejected by Candidate': 'Notification: "Rejected"',
  'Onboard': 'Notification: "Done"',
};

// Estados que permiten eliminar candidatos
export const DELETABLE_STATUSES: CandidateStatus[] = [
  'Rejected by HR',
  'Rejected by PM',
  'Rejected by Candidate',
];

// Estados que permiten agregar a voluntarios activos
export const ADDABLE_STATUSES: CandidateStatus[] = [
  'Onboard',
];

// Estados que requieren feedback de PM
export const FEEDBACK_REQUIRED_STATUSES: CandidateStatus[] = [
  'Interview Completed',
];

// Configuración de tabla por rol
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

// Columnas visibles por rol
export const VISIBLE_COLUMNS = {
  admin: ['name', 'status', 'role', 'volunteerType', 'cptOpt'],
  hr: ['name', 'status', 'role', 'volunteerType', 'cptOpt', 'actions'],
  lead_project: ['name', 'status', 'role', 'actions'],
  volunteer: ['stage', 'status', 'documents', 'tasks'],
} as const;

// Permisos por rol - corresponden a los roles en tu types.ts
export const ROLE_PERMISSIONS = {
  admin: {
    canEdit: false,        // Solo lectura para supervisión
    canDelete: false,
    canViewAll: true,
    canCreate: false,
    canViewAnalytics: true,
    canExport: true,
  },
  hr: {
    canEdit: true,         // Control total del pipeline
    canDelete: true,
    canViewAll: true,
    canCreate: true,
    canScheduleInterview: true,
    canViewAnalytics: true,
    canExport: true,
  },
  lead_project: {
    canEdit: false,        // Solo candidatos asignados
    canDelete: false,
    canViewAll: false,     // Solo sus candidatos
    canCreate: false,
    canSubmitFeedback: true,
  },
  volunteer: {
    canEdit: false,        // Solo su propia aplicación
    canDelete: false,
    canViewAll: false,     // Solo su perfil
    canCreate: false,
    canUploadDocuments: true,
  },
  unassigned: {
    canEdit: false,
    canDelete: false,
    canViewAll: false,
    canCreate: false,
  }
} as const;

// Placeholders y textos por defecto
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