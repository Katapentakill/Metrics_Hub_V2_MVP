// src/modules/dashboard/lead/RecentActivity.tsx
'use client';

import { 
  Clock, 
  CheckSquare, 
  AlertCircle, 
  UserCheck,
  Calendar,
  MessageCircle,
  Target,
  GitBranch,
  Award,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';

interface LeadActivityItem {
  id: string;
  type: 'task' | 'project' | 'team' | 'milestone' | 'meeting' | 'assignment' | 'review';
  title: string;
  description: string;
  time: string;
  project?: string;
  member?: string;
  icon: any;
  color: string;
  bgColor: string;
  priority?: 'high' | 'medium' | 'low';
}

export default function RecentActivity() {
  const activities: LeadActivityItem[] = [
    {
      id: '1',
      type: 'task',
      title: 'Tarea completada',
      description: 'Diseño de mockups finalizado por Carlos Ruiz',
      time: 'Hace 15 minutos',
      project: 'EcoVerde',
      member: 'Carlos Ruiz',
      icon: CheckSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Hito alcanzado',
      description: 'Primera fase del proyecto TechEdu completada',
      time: 'Hace 32 minutos',
      project: 'TechEdu',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: '3',
      type: 'assignment',
      title: 'Nueva asignación',
      description: 'Tarea de desarrollo backend asignada a María González',
      time: 'Hace 1 hora',
      project: 'HealthConnect',
      member: 'María González',
      icon: UserCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Reunión completada',
      description: 'Daily standup con equipo CommunityAid finalizada',
      time: 'Hace 2 horas',
      project: 'CommunityAid',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: '5',
      type: 'review',
      title: 'Revisión pendiente',
      description: 'Entrega de wireframes requiere aprobación',
      time: 'Hace 3 horas',
      project: 'EcoVerde',
      member: 'Ana Martínez',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      priority: 'high'
    },
    {
      id: '6',
      type: 'project',
      title: 'Estado actualizado',
      description: 'TechEdu movido a fase de testing',
      time: 'Hace 4 horas',
      project: 'TechEdu',
      icon: GitBranch,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: '7',
      type: 'task',
      title: 'Tarea bloqueada',
      description: 'Implementación de API requiere recursos adicionales',
      time: 'Hace 5 horas',
      project: 'HealthConnect',
      member: 'Pedro Sánchez',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      priority: 'high'
    },
    {
      id: '8',
      type: 'team',
      title: 'Nuevo miembro',
      description: 'Diego Morales se unió al equipo CommunityAid',
      time: 'Hace 6 horas',
      project: 'CommunityAid',
      member: 'Diego Morales',
      icon: UserCheck,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ];

  const getTimeAgo = (time: string) => {
    return time;
  };

  const handleViewTask = (activityId: string) => {
    console.log(`Ver detalles de actividad: ${activityId}`);
    // Aquí iría la lógica para mostrar detalles específicos del lead
  };

  const getProjectBadgeColor = (project: string) => {
    const colors: {[key: string]: string} = {
      'EcoVerde': 'bg-green-100 text-green-700',
      'TechEdu': 'bg-blue-100 text-blue-700',
      'HealthConnect': 'bg-purple-100 text-purple-700',
      'CommunityAid': 'bg-orange-100 text-orange-700'
    };
    return colors[project] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-slate-600" />
          Actividad de Mis Proyectos
        </h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors">
            Solo urgentes
          </button>
          <button className="text-sm text-primary hover:underline">
            Ver historial completo
          </button>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 group">
            {/* Icono de actividad con indicador de prioridad */}
            <div className={`${activity.bgColor} p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform relative`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
              {activity.priority === 'high' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Contenido de la actividad */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                      {activity.title}
                    </p>
                    {activity.project && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getProjectBadgeColor(activity.project)}`}>
                        {activity.project}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  {activity.member && (
                    <p className="text-xs text-slate-500 mt-1">
                      <span className="font-medium">{activity.member}</span>
                      {activity.type === 'assignment' && ' - Nueva asignación'}
                      {activity.type === 'task' && ' - Responsable'}
                      {activity.type === 'review' && ' - Esperando revisión'}
                    </p>
                  )}
                </div>
                <div className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  {getTimeAgo(activity.time)}
                </div>
              </div>

              {/* Acciones rápidas */}
              {(activity.type === 'review' || activity.priority === 'high') && (
                <div className="mt-2 flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewTask(activity.id)}
                    className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark transition-colors"
                  >
                    Revisar
                  </button>
                  {activity.type === 'task' && (
                    <button className="text-xs text-slate-500 hover:text-slate-700">
                      Reasignar
                    </button>
                  )}
                </div>
              )}

              {/* Línea divisoria sutil */}
              <div className="mt-3 border-b border-slate-100 last:border-b-0"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de actividad por proyecto */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Actividad por Proyecto</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">EcoVerde</span>
              <span className="text-xs font-medium text-green-600">3 actividades</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">TechEdu</span>
              <span className="text-xs font-medium text-blue-600">2 actividades</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">HealthConnect</span>
              <span className="text-xs font-medium text-purple-600">2 actividades</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-600">CommunityAid</span>
              <span className="text-xs font-medium text-orange-600">2 actividades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas de productividad */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-green-600">8</p>
            <p className="text-xs text-slate-600">Completadas hoy</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-yellow-600">3</p>
            <p className="text-xs text-slate-600">Pendientes revisión</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-blue-600">12</p>
            <p className="text-xs text-slate-600">En progreso</p>
          </div>
        </div>
      </div>

      {/* Filtros y acciones */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Solo mis proyectos
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Tareas bloqueadas
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Próximos deadlines
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Exportar reporte
        </button>
      </div>
    </div>
  );
}