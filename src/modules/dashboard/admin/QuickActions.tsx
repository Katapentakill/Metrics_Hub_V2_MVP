// src/features/admin/QuickActions.tsx
'use client';

import { 
  FolderPlus, 
  FileText, 
  Settings, 
  Mail, 
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export default function QuickActions() {
  const handleAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // Aquí irían las acciones reales
  };

  const quickActions = [
    {
      title: 'Nuevo Proyecto',
      description: 'Iniciar un nuevo proyecto',
      icon: FolderPlus,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: 'create-project'
    },
    {
      title: 'Generar Reporte',
      description: 'Crear reporte ejecutivo',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: 'generate-report'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Settings,
      color: 'bg-slate-500 hover:bg-slate-600',
      action: 'system-settings'
    }
  ];

  const pendingTasks = [
    {
      title: '12 Aplicaciones por revisar',
      description: 'Candidatos esperando evaluación inicial',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      action: '/admin/applications'
    },
    {
      title: '3 Proyectos con tareas bloqueadas',
      description: 'Requieren atención inmediata',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: '/admin/projects?filter=blocked'
    },
    {
      title: '5 Evaluaciones completadas',
      description: 'Listas para revisión final',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: '/admin/evaluations?status=completed'
    }
  ];

  const systemActions = [
    {
      title: 'Enviar Notificación Global',
      description: 'Comunicar a todos los usuarios',
      icon: Mail,
      action: 'global-notification'
    },
    {
      title: 'Exportar Base de Datos',
      description: 'Descargar respaldo completo',
      icon: Download,
      action: 'export-database'
    },
    {
      title: 'Métricas Avanzadas',
      description: 'Ver analytics detallado',
      icon: BarChart3,
      action: 'advanced-metrics'
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

      {/* Tareas pendientes */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Requiere Atención</h3>
        <div className="space-y-3">
          {pendingTasks.map((task, index) => (
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

      {/* Acciones del sistema */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Sistema</h3>
        <div className="space-y-2">
          {systemActions.map((action, index) => (
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

      {/* Estado del servidor */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Estado del Servidor</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">CPU</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-slate-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '45%' }} />
              </div>
              <span className="text-xs text-slate-500">45%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Memoria</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-slate-200 rounded-full h-2">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: '67%' }} />
              </div>
              <span className="text-xs text-slate-500">67%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Base de Datos</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-600">Conectada</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
