// src/modules/dashboard/admin/QuickActions.tsx
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
  BarChart3 // Se mantiene si se usa en otro lugar, pero no es necesario aquí.
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
      action: '/admin/recruitment/candidate-management/tracker'
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

  /*
  // El arreglo systemActions fue eliminado
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
  */

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

      {/* // La sección de Acciones del sistema fue eliminada 
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Sistema</h3>
        <div className="space-y-2">
          {systemActions.map((action, index) => (
            // ... (código de acciones del sistema)
          ))}
        </div>
      </div>
      */}

      {/* // La sección de Estado del servidor fue eliminada
      
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Estado del Servidor</h3>
        // ... (código de estado del servidor)
      </div>
      */}
    </div>
  );
}