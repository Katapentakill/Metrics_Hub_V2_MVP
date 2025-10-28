// src/modules/recruitment/hr/Talent-Management.tsx
'use client';

import { useState } from 'react';
import {
  Users,
  UserPlus,
  Briefcase,
  BarChart,
  Clock,
  UserCheck,
  AlertTriangle,
  Handshake,
  Shield,
  TrendingUp,
  Activity,
  ArrowRight,
  Settings,
  Calendar,
  FileCheck,
  Mail,
  CheckCircle,
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface DashboardStat {
  title: string;
  value: string | number;
  trend?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface SectionItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgHover: string;
  stats: {
    label: string;
    value: string | number;
    subValue?: string;
  };
  priority?: 'high' | 'medium' | 'low';
  quickActions?: { label: string; href: string }[];
}

interface RecentActivity {
  id: string;
  action: string;
  user: string;
  detail: string;
  time: string;
  type: 'candidate' | 'interview' | 'offer' | 'hire';
}

// ============================================================================
// DATA
// ============================================================================

const dashboardStats: DashboardStat[] = [
  {
    title: 'Vacantes Activas',
    value: 24,
    trend: '+12%',
    icon: Briefcase,
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  {
    title: 'Candidatos en Proceso',
    value: 156,
    trend: '+8%',
    icon: Users,
    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
  {
    title: 'Contrataciones del Mes',
    value: 8,
    trend: '-5%',
    icon: UserCheck,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
  },
  {
    title: 'Tiempo Promedio',
    value: '18 días',
    trend: '-12%',
    icon: Clock,
    color: 'bg-gradient-to-br from-lime-500 to-lime-600',
  },
];

const sections: SectionItem[] = [
  {
    title: 'Gestión de Vacantes',
    description: 'Supervisa todas las solicitudes de vacantes, desde las que están en borrador hasta las publicadas.',
    href: '/hr/recruitment/job-openings',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-emerald-600',
    bgHover: 'hover:bg-emerald-50',
    stats: { label: 'Vacantes', value: 24, subValue: '12 pendientes de aprobación' },
    priority: 'high',
  },
  {
    title: 'Gestión de Candidatos',
    description: 'Visualiza el pipeline completo, la base de datos de candidatos y la comunicación de todo el equipo.',
    href: '/hr/recruitment/candidate-management',
    icon: Users,
    gradient: 'from-teal-500 to-teal-600',
    bgHover: 'hover:bg-teal-50',
    stats: { label: 'Candidatos', value: 156, subValue: '42 nuevos esta semana' },
    priority: 'high',
  },
  {
    title: 'Evaluación y Selección',
    description: 'Accede a las herramientas de evaluación, flujos de entrevistas y comentarios de los entrevistadores.',
    href: '/hr/recruitment/evaluation',
    icon: UserCheck,
    gradient: 'from-green-500 to-green-600',
    bgHover: 'hover:bg-green-50',
    stats: { label: 'Evaluaciones', value: 23, subValue: '8 entrevistas pendientes' },
    priority: 'high',
    quickActions: [
      { label: 'Gestionar Entrevistas', href: '/hr/recruitment/evaluation/interview-management' },
      { label: 'Ver Calendario', href: '/hr/recruitment/evaluation/interview-management?view=calendar' }
    ]
  },
  {
    title: 'Ofertas y Contratación',
    description: 'Monitorea el estado de las ofertas de empleo y el proceso de formalización de la contratación.',
    href: '/hr/recruitment/offers-hiring',
    icon: Handshake,
    gradient: 'from-lime-500 to-lime-600',
    bgHover: 'hover:bg-lime-50',
    stats: { label: 'Ofertas', value: 5, subValue: '3 aceptadas, 2 pendientes' },
    priority: 'medium',
  },
  {
    title: 'Reportes y Analíticas',
    description: 'Obtén una visión estratégica con métricas clave y datos sobre la efectividad de los canales de reclutamiento.',
    href: '/hr/recruitment/analytics',
    icon: BarChart,
    gradient: 'from-cyan-500 to-cyan-600',
    bgHover: 'hover:bg-cyan-50',
    stats: { label: 'Reportes', value: 12, subValue: '45 métricas activas' },
    priority: 'low',
  }
];

const recentActivities: RecentActivity[] = [
  { id: '1', action: 'aplicó a', user: 'María García', detail: 'Senior Developer Position', time: '5 min ago', type: 'candidate' },
  { id: '2', action: 'programó entrevista con', user: 'Carlos López', detail: 'John Smith - Marketing Manager', time: '12 min ago', type: 'interview' },
  { id: '3', action: 'envió oferta a', user: 'Ana Martínez', detail: 'Sarah Johnson - UX Designer', time: '1 hour ago', type: 'offer' },
  { id: '4', action: 'contrató a', user: 'Roberto Sánchez', detail: 'Michael Chen - Data Analyst', time: '2 hours ago', type: 'hire' },
];

const ACTIVITY_COLOR_MAP = {
  candidate: { icon: Users, text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  interview: { icon: Calendar, text: 'text-teal-700', bg: 'bg-teal-50', border: 'border-teal-200' },
  offer: { icon: Mail, text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
  hire: { icon: CheckCircle, text: 'text-lime-700', bg: 'bg-lime-50', border: 'border-lime-200' },
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatCard = ({ stat }: { stat: DashboardStat }) => {
  const isUp = stat.trend && stat.trend.includes('+');
  const trendColor = isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50';

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${stat.color}`}>
          <stat.icon className="w-5 h-5 text-white" />
        </div>
        {stat.trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendColor}`}>
            <TrendingUp className={`w-3 h-3 ${isUp ? 'text-emerald-700' : 'text-red-700 rotate-180'}`} />
            <span className="text-xs font-medium">{stat.trend}</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
      <p className="text-sm text-gray-600">{stat.title}</p>
    </div>
  );
};

const SectionCard = ({ section }: { section: SectionItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={section.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden bg-white rounded-xl border-2 border-gray-200 block
        hover:shadow-2xl hover:-translate-y-2 
        transition-all duration-300 cursor-pointer
        ${section.bgHover}
      `}
    >
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${section.gradient}`} />
      
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`
              p-3 rounded-xl bg-gradient-to-br ${section.gradient} 
              shadow-sm transition-transform duration-300 flex-shrink-0
              ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
            `}>
              <section.icon className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {section.title}
                </h3>
                {section.priority === 'high' && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Alta
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold
                  bg-gradient-to-r ${section.gradient} text-white shadow-sm
                `}>
                  {section.stats.value}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {section.stats.label}
                </span>
              </div>
            </div>
          </div>
          
          <ArrowRight className={`
            w-6 h-6 text-gray-400 transition-all duration-300
            ${isHovered ? 'text-gray-700 translate-x-1' : ''}
          `} />
        </div>

        {section.stats.subValue && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 ml-16">
            <Activity className="w-3 h-3" />
            <span>{section.stats.subValue}</span>
          </div>
        )}
      </div>
      
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {section.description}
        </p>
        
        {section.quickActions && (
          <div className="mb-4 flex flex-wrap gap-2">
            {section.quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = action.href;
                }}
                className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-100">
          <span className={`
            text-sm font-medium transition-colors
            ${isHovered ? 'text-emerald-600' : 'text-gray-400'}
          `}>
            Explorar sección →
          </span>
        </div>
      </div>
    </a>
  );
};

const ActivityItem = ({ activity }: { activity: RecentActivity }) => {
  const config = ACTIVITY_COLOR_MAP[activity.type];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-gray-200">
      <div className={`p-2 rounded-lg ${config.bg} border ${config.border}`}>
        <Icon className={`w-4 h-4 ${config.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{activity.user}</span>
          {' '}{activity.action}{' '}
          <span className="font-medium text-gray-700">{activity.detail}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TalentManagementAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <UserPlus className="w-10 h-10 text-emerald-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Seguimiento de Candidatos</h1>
              <p className="text-gray-600 mt-1">
                Bienvenido al panel de reclutamiento. Usa estas secciones para gestionar todo el ciclo de vida de la contratación, desde la publicación de vacantes hasta la formalización de la oferta.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardStats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Secciones de Gestión</h2>
              <p className="text-gray-600">Accede a las diferentes áreas del sistema de reclutamiento</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky lg:top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  Actividad Reciente
                </h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Ver Todo
                </button>
              </div>
              
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-2xl font-bold text-emerald-600">12</p>
                    <p className="text-xs text-gray-600">Hoy</p>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <p className="text-2xl font-bold text-teal-600">87</p>
                    <p className="text-xs text-gray-600">Esta Semana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Acciones Rápidas</h2>
              <p className="text-sm text-gray-600">Operaciones frecuentes para gestión eficiente</p>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <Settings className="w-4 h-4" />
              Personalizar
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">Nueva Vacante</span>
            </button>
            <button className="p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">Ver Candidatos</span>
            </button>
            <button className="p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-teal-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span className="font-medium">Entrevistas</span>
            </button>
            <button className="p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <FileCheck className="w-5 h-5 text-green-600" />
              <span className="font-medium">Reportes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}