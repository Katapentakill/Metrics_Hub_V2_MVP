// src/modules/dashboard/lead/QuickActions.tsx
'use client';

import { 
  Plus, 
  Calendar, 
  Users, 
  CheckSquare, 
  AlertTriangle,
  Clock,
  Target,
  FileText,
  MessageSquare,
  TrendingUp,
  UserPlus,
  Settings
} from 'lucide-react';

export default function QuickActions() {
  const handleAction = (action: string) => {
    console.log(`Executing lead action: ${action}`);
    // Aquí irían las acciones reales para Lead Project
  };

  const quickActions = [
    {
      title: 'Nueva Tarea',
      description: 'Asignar tarea al equipo',
      icon: Plus,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: 'create-task'
    },
    {
      title: 'Planificar Sprint',
      description: 'Configurar próximo ciclo',
      icon: Calendar,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: 'plan-sprint'
    },
    {
      title: 'Revisar Equipos',
      description: 'Evaluar productividad',
      icon: Users,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: 'review-teams'
    }
  ];

  const urgentTasks = [
    {
      title: '3 Tareas vencen hoy',
      description: 'EcoVerde - Diseño de interfaz y documentación',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: '/lead_project/tasks?filter=due-today'
    },
    {
      title: '2 Entregas pendientes de revisión',
      description: 'TechEdu y HealthConnect requieren aprobación',
      icon: CheckSquare,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      action: '/lead_project/projects?status=pending-review'
    },
    {
      title: '1 Reunión programada en 30min',
      description: 'Daily standup con equipo CommunityAid',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: '/lead_project/calendar'
    }
  ];

  const teamActions = [
    {
      title: 'Asignar Nuevo Miembro',
      description: 'Agregar voluntario a proyecto',
      icon: UserPlus,
      action: 'assign-member'
    },
    {
      title: 'Enviar Mensaje al Equipo',
      description: 'Comunicar actualizaciones',
      icon: MessageSquare,
      action: 'team-message'
    },
    {
      title: 'Generar Reporte de Progreso',
      description: 'Estado actual de proyectos',
      icon: FileText,
      action: 'progress-report'
    },
    {
      title: 'Configurar Objetivos',
      description: 'Establecer metas del sprint',
      icon: Target,
      action: 'set-objectives'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Acciones rápidas principales */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleAction(action.action)}
              className={`${action.color} text-white p-4 rounded-xl transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center space-x-3">
                <action.icon className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs opacity-90">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tareas urgentes */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Requiere Atención Inmediata</h3>
        <div className="space-y-3">
          {urgentTasks.map((task, index) => (
            <div key={index} className={`p-4 ${task.bgColor} rounded-lg border-l-4 border-current`}>
              <div className="flex items-start space-x-3">
                <task.icon className={`w-5 h-5 ${task.color} mt-0.5`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${task.color}`}>{task.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{task.description}</p>
                  <button 
                    onClick={() => window.location.href = task.action}
                    className="text-xs text-slate-500 hover:text-slate-700 mt-2 underline"
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gestión de equipos */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Gestión de Equipos</h3>
        <div className="space-y-2">
          {teamActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action.action)}
              className="w-full flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors text-left"
            >
              <action.icon className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-sm font-medium text-slate-700">{action.title}</p>
                <p className="text-xs text-slate-500">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Resumen de productividad */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Productividad Semanal
        </h3>
        
        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">18</p>
            <p className="text-xs text-green-600">Tareas Completadas</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">89%</p>
            <p className="text-xs text-blue-600">Eficiencia del Equipo</p>
          </div>
        </div>

        {/* Estado de proyectos activos */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700">Proyectos Activos</h4>
          {[
            { name: 'EcoVerde', progress: 87, color: 'bg-green-500' },
            { name: 'TechEdu', progress: 73, color: 'bg-blue-500' },
            { name: 'HealthConnect', progress: 91, color: 'bg-purple-500' },
            { name: 'CommunityAid', progress: 65, color: 'bg-orange-500' }
          ].map((project) => (
            <div key={project.name} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
              <span className="text-sm text-slate-700">{project.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 ${project.color} rounded-full transition-all duration-300`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-600 w-8 text-right">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración rápida */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Configuración Rápida
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Notificaciones de tareas</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Recordatorios de deadlines</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Reportes automáticos</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}