// src/modules/dashboard/admin/QuickActions.tsx
'use client';

import { 
  FolderPlus, 
  FileText, 
  Settings, 
  Clock,
  AlertTriangle,
  CheckCircle
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
      color: 'bg-gradient-to-r from-[#15803d] to-[#14532d]',
      hoverColor: 'hover:from-[#166534] hover:to-[#15803d]',
      action: 'create-project'
    },
    {
      title: 'Generar Reporte',
      description: 'Crear reporte ejecutivo',
      icon: FileText,
      color: 'bg-gradient-to-r from-[#22c55e] to-[#059669]',
      hoverColor: 'hover:from-[#059669] hover:to-[#15803d]',
      action: 'generate-report'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Settings,
      color: 'bg-gradient-to-r from-slate-500 to-slate-600',
      hoverColor: 'hover:from-slate-600 hover:to-slate-700',
      action: 'system-settings'
    }
  ];

  const pendingTasks = [
    {
      title: '8 Entrevistas programadas hoy',
      description: 'Gestión de entrevistas requiere supervisión',
      icon: Clock,
      color: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-600',
      action: '/admin/recruitment/evaluation/interview-management'
    },
    {
      title: '12 Aplicaciones por revisar',
      description: 'Candidatos esperando evaluación inicial',
      icon: Clock,
      color: 'text-blue-800',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      action: '/admin/recruitment/candidate-management/tracker'
    },
    {
      title: '3 Proyectos con tareas bloqueadas',
      description: 'Requieren atención inmediata',
      icon: AlertTriangle,
      color: 'text-yellow-800',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      action: '/admin/projects?filter=blocked'
    },
    {
      title: '5 Evaluaciones completadas',
      description: 'Listas para revisión final',
      icon: CheckCircle,
      color: 'text-emerald-800',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-600',
      action: '/admin/evaluations?status=completed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Acciones rápidas principales */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleAction(action.action)}
              className={`${action.color} ${action.hoverColor} text-white p-4 rounded-xl transition-all duration-200 hover:transform hover:scale-105 hover:shadow-lg`}
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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Requiere Atención</h3>
        <div className="space-y-3">
          {pendingTasks.map((task, index) => (
            <div 
              key={index} 
              className={`p-4 ${task.bgColor} rounded-lg border-l-4 ${task.borderColor} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start space-x-3">
                <task.icon className={`w-5 h-5 ${task.color} mt-0.5`} />
                <div className="flex-1">
                  <p className={`font-medium text-sm ${task.color}`}>{task.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                  <button 
                    onClick={() => window.location.href = task.action}
                    className="text-xs text-[#22c55e] hover:text-[#059669] mt-2 font-medium transition-colors"
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}