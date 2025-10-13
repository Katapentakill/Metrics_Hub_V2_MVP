// src/modules/dashboard/config/dashboardConfig.tsx
import { 
  Users, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  UserPlus, 
  Clock, 
  MessageSquare,
  Target,
  Star,
  TrendingUp,
  BarChart3,
  Award
} from 'lucide-react';

// Importar componentes específicos
import DashboardStats from '../admin/DashboardStats';
import QuickActions from '../admin/QuickActions';
import RecentActivity from '../admin/RecentActivity';
import SystemHealth from '../admin/SystemHealth';
import DashboardStatsHR from '../hr/DashboardStatsHR';
import ApplicationsPending from '../hr/ApplicationsPending';
import RecruitmentPipeline from '../hr/RecruitmentPipeline';
import RecentHires from '../hr/RecentHires';
import ProjectsOverview from '../lead/ProjectsOverview';
import TeamAssignments from '../lead/TeamAssignments';
import UpcomingDeadlines from '../lead/UpcomingDeadlines';
import TeamPerformance from '../lead/TeamPerformance';
import UpcomingTasks from '../volunteer/UpcomingTasks';
import VolunteerRecentActivity from '../volunteer/RecentActivity';

// Configuración para Admin
const adminConfig = {
  title: "Dashboard Administrativo",
  subtitle: "Resumen general del sistema Living Stones",
  metrics: [
    {
      label: "Total Usuarios",
      getValue: (data: any) => data?.totalUsers || 0,
      getSubtitle: (data: any) => `+${data?.thisMonthRegistrations || 0} este mes`,
      subtitleColor: "text-emerald-600",
      icon: Users,
      iconBg: "bg-gradient-to-br from-[#166534] to-[#14532d]"
    },
    {
      label: "Proyectos Activos",
      getValue: (data: any) => data?.activeProjects || 0,
      getSubtitle: (data: any) => `de ${data?.totalProjects || 0} total`,
      subtitleColor: "text-gray-600",
      icon: FolderOpen,
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      label: "Tareas Completadas",
      getValue: (data: any) => data?.completedTasks || 0,
      getSubtitle: (data: any) => `${Math.round((data?.completedTasks || 0) / (data?.totalTasks || 1) * 100)}% de progreso`,
      subtitleColor: "text-emerald-600",
      icon: CheckSquare,
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      label: "Aplicaciones Pendientes",
      getValue: (data: any) => data?.pendingApplications || 0,
      getSubtitle: (data: any) => "Requieren revisión",
      subtitleColor: "text-gray-600",
      icon: FileText,
      iconBg: "bg-gradient-to-br from-[#84cc16] to-[#65a30d]"
    }
  ],
  mainComponent: DashboardStats,
  secondaryComponent: QuickActions,
  bottomComponents: [RecentActivity, SystemHealth],
  alerts: {
    title: "Alertas del Sistema",
    items: [
      {
        getMessage: (data: any) => "3 proyectos tienen tareas bloqueadas por más de 5 días",
        getSubtitle: (data: any) => "EcoVerde, TechEdu, HealthConnect",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-800",
        subtitleColor: "text-yellow-600",
        action: "Revisar"
      },
      {
        getMessage: (data: any) => "12 aplicaciones pendientes de revisión inicial",
        getSubtitle: (data: any) => "Algunas llevan más de 3 días en espera",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-500",
        textColor: "text-blue-800",
        subtitleColor: "text-blue-600",
        action: "Ver Lista"
      },
      {
        getMessage: (data: any) => "Sistema funcionando correctamente",
        getSubtitle: (data: any) => "Todas las métricas dentro de rangos normales",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-600",
        textColor: "text-emerald-800",
        subtitleColor: "text-emerald-600",
        action: null
      }
    ]
  },
  
};

// Configuración para HR
const hrConfig = {
  title: "Dashboard de Recursos Humanos",
  subtitle: "Gestión integral del proceso de reclutamiento y talento",
  metrics: [
    {
      label: "Total Aplicaciones",
      getValue: (data: any) => data?.totalApplications || 0,
      getSubtitle: (data: any) => `+${data?.thisMonthApplications || 0} este mes`,
      subtitleColor: "text-emerald-600",
      icon: Users,
      iconBg: "bg-gradient-to-br from-[#166534] to-[#14532d]"
    },
    {
      label: "Pendientes Revisión",
      getValue: (data: any) => data?.pendingApplications || 0,
      getSubtitle: (data: any) => "Requieren atención",
      subtitleColor: "text-gray-600",
      icon: Clock,
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      label: "Entrevistas Activas",
      getValue: (data: any) => data?.activeInterviews || 0,
      getSubtitle: (data: any) => `${data?.scheduledInterviews || 0} programadas`,
      subtitleColor: "text-emerald-600",
      icon: MessageSquare,
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      label: "Nuevas Contrataciones",
      getValue: (data: any) => data?.newHires || 0,
      getSubtitle: (data: any) => `${data?.conversionRate || 0}% conversión`,
      subtitleColor: "text-emerald-600",
      icon: UserPlus,
      iconBg: "bg-gradient-to-br from-[#84cc16] to-[#65a30d]"
    }
  ],
  mainComponent: DashboardStatsHR,
  secondaryComponent: ApplicationsPending,
  bottomComponents: [RecruitmentPipeline, RecentHires],
  alerts: {
    title: "Alertas de Recursos Humanos",
    items: [
      {
        getMessage: (data: any) => "8 aplicaciones llevan más de 5 días sin revisión inicial",
        getSubtitle: (data: any) => "Algunas son candidatos de alta prioridad",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-800",
        subtitleColor: "text-yellow-600",
        action: "Revisar Urgentes"
      },
      {
        getMessage: (data: any) => "3 entrevistas programadas para mañana necesitan confirmación",
        getSubtitle: (data: any) => "María González, Carlos Ruiz, Ana Martínez",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-500",
        textColor: "text-blue-800",
        subtitleColor: "text-blue-600",
        action: "Confirmar"
      },
      {
        getMessage: (data: any) => "5 candidatos aprobados esperan proceso de onboarding",
        getSubtitle: (data: any) => "Programar sesiones de integración",
        bgColor: "bg-teal-50",
        borderColor: "border-teal-500",
        textColor: "text-teal-800",
        subtitleColor: "text-teal-600",
        action: "Programar"
      },
      {
        getMessage: (data: any) => "Pipeline de reclutamiento funcionando óptimamente",
        getSubtitle: (data: any) => `Tasa de conversión del ${data?.conversionRate || 0}% supera objetivo del 15%`,
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-600",
        textColor: "text-emerald-800",
        subtitleColor: "text-emerald-600",
        action: null
      }
    ]
  },
  quickActions: {
    title: "Acciones Rápidas de HR",
    actions: [
      {
        icon: "📊",
        title: "Reporte de Reclutamiento",
        subtitle: "Métricas del mes",
        bgColor: "bg-emerald-50",
        hoverColor: "bg-emerald-100"
      },
      {
        icon: "📞",
        title: "Programar Entrevistas",
        subtitle: "Calendario disponible",
        bgColor: "bg-[#166534]/10",
        hoverColor: "bg-[#166534]/20"
      },
      {
        icon: "💌",
        title: "Enviar Invitaciones",
        subtitle: "A candidatos seleccionados",
        bgColor: "bg-teal-50",
        hoverColor: "bg-teal-100"
      },
      {
        icon: "⚙️",
        title: "Optimizar Pipeline",
        subtitle: "Configurar proceso",
        bgColor: "bg-slate-50",
        hoverColor: "bg-slate-100"
      }
    ]
  }
};

// Configuración para Lead
const leadConfig = {
  title: "Dashboard de Líder de Proyecto",
  subtitle: "Administra tus proyectos, equipos y cronogramas",
  metrics: [
    {
      label: "Proyectos Activos",
      getValue: (data: any) => data?.activeProjects || 0,
      getSubtitle: (data: any) => `de ${data?.totalProjects || 0} total`,
      subtitleColor: "text-emerald-600",
      icon: FolderOpen,
      iconBg: "bg-gradient-to-br from-[#166534] to-[#14532d]"
    },
    {
      label: "Miembros del Equipo",
      getValue: (data: any) => data?.activeTeamMembers || 0,
      getSubtitle: (data: any) => `${data?.teamProductivity || 0}% productividad`,
      subtitleColor: "text-emerald-600",
      icon: Users,
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      label: "Tareas Completadas",
      getValue: (data: any) => data?.completedTasks || 0,
      getSubtitle: (data: any) => `${Math.round((data?.completedTasks || 0) / (data?.totalTasks || 1) * 100)}% progreso general`,
      subtitleColor: "text-emerald-600",
      icon: CheckSquare,
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      label: "Deadlines Próximos",
      getValue: (data: any) => data?.upcomingDeadlines || 0,
      getSubtitle: (data: any) => `${data?.overdueTasks || 0} atrasadas`,
      subtitleColor: "text-gray-600",
      icon: Target,
      iconBg: "bg-gradient-to-br from-[#84cc16] to-[#65a30d]"
    }
  ],
  mainComponent: ProjectsOverview,
  secondaryComponent: TeamAssignments,
  bottomComponents: [UpcomingDeadlines, TeamPerformance],
  alerts: {
    title: "Alertas de Proyecto",
    items: [
      {
        getMessage: (data: any) => "3 tareas críticas bloqueadas en EcoVerde",
        getSubtitle: (data: any) => "Requieren intervención inmediata del líder",
        bgColor: "bg-red-50",
        borderColor: "border-red-500",
        textColor: "text-red-800",
        subtitleColor: "text-red-600",
        action: "Resolver"
      },
      {
        getMessage: (data: any) => "2 miembros del equipo reportan sobrecarga de trabajo",
        getSubtitle: (data: any) => "María González y Carlos Ruiz necesitan reasignación",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-800",
        subtitleColor: "text-yellow-600",
        action: "Revisar Carga"
      },
      {
        getMessage: (data: any) => "Nuevo voluntario asignado al equipo TechEdu",
        getSubtitle: (data: any) => "Ana Martínez se incorporó como Project Manager",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-500",
        textColor: "text-blue-800",
        subtitleColor: "text-blue-600",
        action: "Ver Perfil"
      },
      {
        getMessage: (data: any) => "Productividad del equipo supera objetivos",
        getSubtitle: (data: any) => `${data?.teamProductivity || 0}% de eficiencia, meta era 80%`,
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-600",
        textColor: "text-emerald-800",
        subtitleColor: "text-emerald-600",
        action: null
      }
    ]
  },
  quickActions: {
    title: "Acciones Rápidas de Proyecto",
    actions: [
      {
        icon: "📋",
        title: "Crear Nueva Tarea",
        subtitle: "Asignar al equipo",
        bgColor: "bg-[#166534]/10",
        hoverColor: "bg-[#166534]/20"
      },
      {
        icon: "👥",
        title: "Gestionar Equipo",
        subtitle: "Asignaciones y roles",
        bgColor: "bg-emerald-50",
        hoverColor: "bg-emerald-100"
      },
      {
        icon: "📊",
        title: "Reporte de Progreso",
        subtitle: "Métricas del proyecto",
        bgColor: "bg-blue-50",
        hoverColor: "bg-blue-100"
      },
      {
        icon: "⏰",
        title: "Cronograma",
        subtitle: "Deadlines y fechas",
        bgColor: "bg-slate-50",
        hoverColor: "bg-slate-100"
      }
    ]
  }
};

// Configuración para Volunteer
const volunteerConfig = {
  title: "Dashboard de Voluntario",
  subtitle: "Gestiona tus proyectos y contribuciones",
  metrics: [
    {
      label: "Proyectos Activos",
      getValue: (data: any) => data?.totalProjects || 0,
      getSubtitle: (data: any) => `${data?.pendingTasks || 0} tareas pendientes`,
      subtitleColor: "text-emerald-600",
      icon: Target,
      iconBg: "bg-gradient-to-br from-[#166534] to-[#14532d]"
    },
    {
      label: "Tareas Completadas",
      getValue: (data: any) => data?.completedTasks || 0,
      getSubtitle: (data: any) => `${data?.currentStreak || 0} días de racha`,
      subtitleColor: "text-emerald-600",
      icon: CheckSquare,
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      label: "Horas Voluntariado",
      getValue: (data: any) => data?.hoursVolunteered || 0,
      getSubtitle: (data: any) => "Horas acumuladas",
      subtitleColor: "text-gray-600",
      icon: Clock,
      iconBg: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      label: "Calificación Promedio",
      getValue: (data: any) => `${data?.averageRating || 0}/5`,
      getSubtitle: (data: any) => `${data?.evaluationsReceived || 0} evaluaciones`,
      subtitleColor: "text-gray-600",
      icon: Star,
      iconBg: "bg-gradient-to-br from-[#84cc16] to-[#65a30d]"
    }
  ],
  mainComponent: UpcomingTasks,
  secondaryComponent: VolunteerRecentActivity,
  bottomComponents: [],
  alerts: {
    title: "Alertas de Voluntario",
    items: [
      {
        getMessage: (data: any) => "Tienes 3 tareas próximas a vencer",
        getSubtitle: (data: any) => "Revisa tu lista de tareas pendientes",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-500",
        textColor: "text-yellow-800",
        subtitleColor: "text-yellow-600",
        action: "Ver Tareas"
      },
      {
        getMessage: (data: any) => "¡Felicitaciones! Has completado 45 tareas",
        getSubtitle: (data: any) => "Sigue así, tu contribución es valiosa",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-600",
        textColor: "text-emerald-800",
        subtitleColor: "text-emerald-600",
        action: null
      }
    ]
  },
  quickActions: {
    title: "Acciones Rápidas de Voluntario",
    actions: [
      {
        icon: "📚",
        title: "Ver Proyectos",
        subtitle: "Explorar oportunidades",
        bgColor: "bg-emerald-50",
        hoverColor: "bg-emerald-100"
      },
      {
        icon: "📄",
        title: "Mis Documentos",
        subtitle: "Archivos y recursos",
        bgColor: "bg-teal-50",
        hoverColor: "bg-teal-100"
      },
      {
        icon: "💬",
        title: "Mensajes",
        subtitle: "Comunicación del equipo",
        bgColor: "bg-blue-50",
        hoverColor: "bg-blue-100"
      },
      {
        icon: "⚙️",
        title: "Mi Perfil",
        subtitle: "Configuración personal",
        bgColor: "bg-slate-50",
        hoverColor: "bg-slate-100"
      }
    ]
  }
};

export const dashboardConfig = {
  admin: adminConfig,
  hr: hrConfig,
  lead: leadConfig,
  volunteer: volunteerConfig
};