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
      color: 'quick-action-emerald',
      action: 'create-project'
    },
    {
      title: 'Generar Reporte',
      description: 'Crear reporte ejecutivo',
      icon: FileText,
      color: 'quick-action-purple',
      action: 'generate-report'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Settings,
      color: 'quick-action-slate',
      action: 'system-settings'
    }
  ];

  const pendingTasks = [
    {
      title: '8 Entrevistas programadas hoy',
      description: 'Gestión de entrevistas requiere supervisión',
      icon: Clock,
      variant: 'task-blue',
      action: '/admin/recruitment/evaluation/interview-management'
    },
    {
      title: '12 Aplicaciones por revisar',
      description: 'Candidatos esperando evaluación inicial',
      icon: Clock,
      variant: 'task-yellow',
      action: '/admin/recruitment/candidate-management/tracker'
    },
    {
      title: '3 Proyectos con tareas bloqueadas',
      description: 'Requieren atención inmediata',
      icon: AlertTriangle,
      variant: 'task-red',
      action: '/admin/projects?filter=blocked'
    },
    {
      title: '5 Evaluaciones completadas',
      description: 'Listas para revisión final',
      icon: CheckCircle,
      variant: 'task-green',
      action: '/admin/evaluations?status=completed'
    }
  ];

  return (
    <div className="admin-quick-actions-wrapper">
      {/* Acciones rápidas principales */}
      <div className="admin-quick-actions-card">
        <h3 className="admin-section-title">Acciones Rápidas</h3>
        <div className="admin-actions-grid">
          {quickActions.map((action) => (
            <button
              key={action.action}
              onClick={() => handleAction(action.action)}
              className={`admin-action-btn ${action.color}`}
            >
              <div className="admin-action-content">
                <action.icon className="admin-action-icon" />
                <div className="admin-action-text">
                  <p className="admin-action-title">{action.title}</p>
                  <p className="admin-action-description">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tareas pendientes */}
      <div className="admin-pending-tasks-card">
        <h3 className="admin-section-title">Requiere Atención</h3>
        <div className="admin-tasks-list">
          {pendingTasks.map((task, index) => (
            <div key={index} className={`admin-task-item ${task.variant}`}>
              <div className="admin-task-content">
                <task.icon className="admin-task-icon" />
                <div className="admin-task-info">
                  <p className="admin-task-title">{task.title}</p>
                  <p className="admin-task-description">{task.description}</p>
                  <button 
                    onClick={() => window.location.href = task.action}
                    className="admin-task-link"
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