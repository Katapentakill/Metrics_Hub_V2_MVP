// src/features/admin/RecentActivity.tsx
'use client';

import { 
  Clock, 
  UserPlus, 
  FolderOpen, 
  CheckSquare, 
  AlertTriangle, 
  Mail,
  Settings,
  FileText,
  Users,
  Award
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'user' | 'project' | 'task' | 'system' | 'evaluation' | 'application';
  title: string;
  description: string;
  time: string;
  user?: string;
  icon: any;
  color: string;
  bgColor: string;
}

export default function RecentActivity() {
  const activities: ActivityItem[] = [
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
    },
    {
      id: '7',
      type: 'user',
      title: 'Usuario desactivado',
      description: 'Cuenta de Roberto García suspendida temporalmente',
      time: 'Hace 5 horas',
      user: 'Admin Sistema',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: '8',
      type: 'system',
      title: 'Notificación enviada',
      description: 'Recordatorio de evaluaciones enviado a 45 usuarios',
      time: 'Hace 6 horas',
      user: 'Sistema Automático',
      icon: Mail,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const getTimeAgo = (time: string) => {
    return time;
  };

  const handleViewDetails = (activityId: string) => {
    console.log(`Ver detalles de actividad: ${activityId}`);
    // Aquí iría la lógica para mostrar detalles
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-slate-600" />
          Actividad Reciente
        </h3>
        <button className="text-sm text-primary hover:underline">
          Ver todo el historial
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 group">
            {/* Icono de actividad */}
            <div className={`${activity.bgColor} p-2 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>

            {/* Contenido de la actividad */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className="text-xs text-slate-500 mt-1">
                      por <span className="font-medium">{activity.user}</span>
                    </p>
                  )}
                </div>
                <div className="text-xs text-slate-400 ml-2 flex-shrink-0">
                  {getTimeAgo(activity.time)}
                </div>
              </div>

              {/* Línea divisoria sutil */}
              <div className="mt-3 border-b border-slate-100 last:border-b-0"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de actividad */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-blue-600">12</p>
            <p className="text-xs text-slate-600">Hoy</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-emerald-600">47</p>
            <p className="text-xs text-slate-600">Esta semana</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-purple-600">189</p>
            <p className="text-xs text-slate-600">Este mes</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas desde actividad */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Filtrar por usuario
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Solo proyectos
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Exportar log
        </button>
      </div>
    </div>
  );
}