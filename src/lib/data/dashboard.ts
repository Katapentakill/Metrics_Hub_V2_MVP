// 📁 src/lib/data/dashboard.ts
// Datos mock para dashboards y métricas

import { 
  DashboardData, 
  ActivityItem, 
  HRDashboardData, 
  RecentHire, 
  PendingApplication, 
  HiringStats,
  RecruitmentMetrics,
  ServiceStatus
} from '@/lib/types/dashboard';
import { 
  UserPlus, 
  CheckSquare, 
  FolderOpen, 
  Settings, 
  Award, 
  FileText, 
  UserMinus,
  AlertTriangle,
  Star,
  Users,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';

// Datos del dashboard principal (Admin)
export const mockAdminDashboardData = {
  totalUsers: 30,
  activeUsers: 28,
  totalProjects: 8,
  activeProjects: 6,
  totalTasks: 100,
  completedTasks: 67,
  pendingApplications: 12,
  thisMonthRegistrations: 6
};

// Datos del dashboard de Lead
export const mockLeadDashboardData = {
  totalProjects: 8,
  activeProjects: 6,
  completedProjects: 2,
  totalTeamMembers: 24,
  activeTeamMembers: 22,
  totalTasks: 150,
  completedTasks: 98,
  overdueTasks: 8,
  upcomingDeadlines: 12,
  thisMonthCompletions: 23,
  teamProductivity: 87
};

// Datos del dashboard de Volunteer
export const mockVolunteerDashboardData = {
  totalProjects: 8,
  completedTasks: 45,
  pendingTasks: 3,
  hoursVolunteered: 156,
  currentStreak: 12,
  evaluationsReceived: 6,
  averageRating: 4.7
};

// Actividad reciente para Volunteer
export const mockVolunteerRecentActivity = [
  {
    id: '1',
    type: 'task_completed' as const,
    title: 'Tarea completada',
    description: 'Completaste la tarea "Diseño de folleto" en el proyecto Educación Comunitaria',
    timestamp: '2024-01-15T10:30:00Z',
    projectName: 'Educación Comunitaria'
  },
  {
    id: '2',
    type: 'evaluation_received' as const,
    title: 'Nueva evaluación',
    description: 'Recibiste una evaluación de 5 estrellas por tu trabajo en el proyecto de Medio Ambiente',
    timestamp: '2024-01-14T16:45:00Z',
    projectName: 'Medio Ambiente'
  },
  {
    id: '3',
    type: 'milestone_reached' as const,
    title: 'Hito alcanzado',
    description: '¡Felicitaciones! Has alcanzado las 150 horas de voluntariado',
    timestamp: '2024-01-13T09:15:00Z'
  }
];

// Tareas próximas para Volunteer
export const mockVolunteerUpcomingTasks = [
  {
    id: '1',
    title: 'Revisar documentación técnica',
    projectName: 'Tecnología Social',
    dueDate: '2024-01-20',
    priority: 'high' as const
  },
  {
    id: '2',
    title: 'Participar en reunión de equipo',
    projectName: 'Educación Comunitaria',
    dueDate: '2024-01-22',
    priority: 'medium' as const
  },
  {
    id: '3',
    title: 'Actualizar perfil de habilidades',
    projectName: 'General',
    dueDate: '2024-01-25',
    priority: 'low' as const
  }
];

// Actividad reciente para Admin
export const mockAdminRecentActivity = [
  {
    id: '1',
    type: 'user',
    title: 'Nuevo usuario registrado',
    description: 'María González se registró como voluntaria',
    time: 'Hace 15 minutos',
    user: 'María González',
    icon: UserPlus,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: '2',
    type: 'task',
    title: 'Tarea completada',
    description: 'Diseño de mockups finalizado en proyecto EcoVerde',
    time: 'Hace 32 minutos',
    user: 'Carlos Ruiz',
    icon: CheckSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: '3',
    type: 'project',
    title: 'Proyecto actualizado',
    description: 'TechEdu cambió estado a "Activo"',
    time: 'Hace 1 hora',
    user: 'Ana Martínez',
    icon: FolderOpen,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    id: '4',
    type: 'system',
    title: 'Configuración modificada',
    description: 'Ajustes de notificaciones actualizados',
    time: 'Hace 2 horas',
    user: 'Admin Sistema',
    icon: Settings,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50'
  },
  {
    id: '5',
    type: 'application',
    title: 'Aplicación aprobada',
    description: 'Candidato Diego Morales aceptado como voluntario',
    time: 'Hace 3 horas',
    user: 'Laura Pérez (HR)',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: '6',
    type: 'evaluation',
    title: 'Evaluación completada',
    description: 'Evaluación Q4 de equipo HealthConnect finalizada',
    time: 'Hace 4 horas',
    user: 'Pedro Sánchez',
    icon: FileText,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  }
];

// Datos para gráficos del dashboard de Admin
export const mockAdminChartData = {
  usersByRole: [
    { role: 'Volunteers', count: 19, color: 'bg-blue-500' },
    { role: 'Lead Projects', count: 5, color: 'bg-emerald-500' },
    { role: 'HR', count: 4, color: 'bg-purple-500' },
    { role: 'Admins', count: 2, color: 'bg-red-500' }
  ],
  projectStatus: [
    { status: 'Activos', count: 6, color: 'bg-green-500' },
    { status: 'En Planificación', count: 1, color: 'bg-yellow-500' },
    { status: 'Completados', count: 1, color: 'bg-gray-500' }
  ],
  monthlyActivity: [
    { month: 'Oct', registrations: 5, projects: 2 },
    { month: 'Nov', registrations: 12, projects: 3 },
    { month: 'Dic', registrations: 8, projects: 1 },
    { month: 'Ene', registrations: 15, projects: 2 },
    { month: 'Feb', registrations: 10, projects: 0 }
  ]
};

// Datos del dashboard de HR (actualizados para coincidir con la página)
export const mockHRDashboardData = {
  totalApplications: 142,
  pendingApplications: 28,
  approvedApplications: 24,
  rejectedApplications: 18,
  activeInterviews: 12,
  scheduledInterviews: 15,
  newHires: 5,
  thisMonthApplications: 35,
  conversionRate: 17
};

// Contrataciones recientes
export const mockRecentHires: RecentHire[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@livingstone.org',
    phone: '+57 300 123 4567',
    position: 'Desarrolladora Frontend',
    department: 'Tecnología',
    hireDate: '2024-02-15',
    startDate: '2024-02-20',
    location: 'Bogotá, Colombia',
    experience: '3 años',
    source: 'linkedin',
    onboardingStatus: 'in_progress',
    mentor: 'Carlos Ruiz',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    notes: 'Excelente portafolio, muy motivada'
  },
  {
    id: '2',
    name: 'Diego Morales',
    email: 'diego.morales@livingstone.org',
    phone: '+57 301 987 6543',
    position: 'Especialista en Marketing',
    department: 'Marketing',
    hireDate: '2024-02-12',
    startDate: '2024-02-19',
    location: 'Medellín, Colombia',
    experience: '2 años',
    source: 'website',
    onboardingStatus: 'completed',
    mentor: 'Ana Martínez',
    skills: ['SEO', 'Google Ads', 'Content Marketing']
  },
  {
    id: '3',
    name: 'Laura Pérez',
    email: 'laura.perez@livingstone.org',
    phone: '+57 302 456 7890',
    position: 'Coordinadora de Proyectos',
    department: 'Operaciones',
    hireDate: '2024-02-08',
    startDate: '2024-02-12',
    location: 'Cali, Colombia',
    experience: '4 años',
    source: 'referral',
    onboardingStatus: 'completed',
    mentor: 'Pedro Sánchez',
    skills: ['Project Management', 'Scrum', 'Leadership']
  }
];

// Aplicaciones pendientes
export const mockPendingApplications: PendingApplication[] = [
  {
    id: '1',
    candidateName: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+57 300 123 4567',
    position: 'Desarrolladora Frontend',
    appliedDate: '2024-02-15',
    stage: 'initial_review',
    priority: 'high',
    experience: '3 años',
    skills: ['React', 'TypeScript', 'Tailwind'],
    status: 'pending'
  },
  {
    id: '2',
    candidateName: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    phone: '+57 301 987 6543',
    position: 'Diseñador UX/UI',
    appliedDate: '2024-02-14',
    stage: 'hr_filter',
    priority: 'medium',
    experience: '2 años',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    status: 'in_review',
    notes: 'Portfolio muy completo'
  },
  {
    id: '3',
    candidateName: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+57 302 456 7890',
    position: 'Especialista en Marketing',
    appliedDate: '2024-02-12',
    stage: 'video_evaluation',
    priority: 'low',
    experience: '1 año',
    skills: ['Social Media', 'Content Creation', 'Analytics'],
    status: 'in_review'
  }
];

// Estadísticas de contratación
export const mockHiringStats: HiringStats = {
  thisMonth: 5,
  lastMonth: 3,
  thisQuarter: 12,
  lastQuarter: 8,
  yearToDate: 45,
  averageProcessingTime: 7.5,
  conversionRate: 48.0,
  topSource: 'LinkedIn'
};

// Métricas de reclutamiento
export const mockRecruitmentMetrics: RecruitmentMetrics = {
  totalApplications: 25,
  pendingReview: 8,
  inProgress: 5,
  completed: 12,
  conversionRate: 48.0,
  averageProcessingTime: 7.5,
  activeProcesses: 13
};

// Estado de servicios
export const mockServiceStatus: ServiceStatus[] = [
  {
    name: 'API Principal',
    status: 'operational',
    uptime: 99.9,
    responseTime: 120,
    icon: CheckSquare
  },
  {
    name: 'Base de Datos',
    status: 'operational',
    uptime: 99.8,
    responseTime: 45,
    icon: CheckSquare
  },
  {
    name: 'Servicio de Email',
    status: 'degraded',
    uptime: 95.2,
    responseTime: 2500,
    icon: AlertTriangle
  },
  {
    name: 'CDN',
    status: 'operational',
    uptime: 99.5,
    responseTime: 80,
    icon: CheckSquare
  }
];
