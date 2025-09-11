'use client';

import { CheckSquare, Clock, AlertCircle, Plus } from 'lucide-react';

/**
 * Representa una tarea asignada a un voluntario en el dashboard.
 */
interface VolunteerTask {
  /** Identificador único de la tarea */
  id: string;
  /** Título breve de la tarea */
  title: string;
  /** Nombre del proyecto al que pertenece la tarea */
  project: string;
  /** Prioridad de la tarea */
  priority: 'high' | 'medium' | 'low';
  /** Fecha límite de entrega en formato ISO (YYYY-MM-DD) */
  dueDate: string;
  /** Estado actual de la tarea */
  status: 'pending' | 'in_progress' | 'completed';
  /** Número estimado de horas requeridas para completarla */
  estimatedHours: number;
}

export default function MyTasks() {
  // Datos ficticios de tareas del voluntario
  const tasks: VolunteerTask[] = [
    {
      id: '1',
      title: 'Revisar documentos del proyecto EcoVerde',
      project: 'EcoVerde',
      priority: 'high',
      dueDate: '2025-09-10',
      status: 'pending',
      estimatedHours: 3
    },
    {
      id: '2',
      title: 'Preparar presentación para reunión de equipo',
      project: 'TechEdu',
      priority: 'medium',
      dueDate: '2025-09-12',
      status: 'in_progress',
      estimatedHours: 2
    },
    {
      id: '3',
      title: 'Actualizar base de datos de beneficiarios',
      project: 'HealthConnect',
      priority: 'low',
      dueDate: '2025-09-15',
      status: 'pending',
      estimatedHours: 1
    },
    {
      id: '4',
      title: 'Participar en capacitación de nuevos voluntarios',
      project: 'General',
      priority: 'medium',
      dueDate: '2025-09-11',
      status: 'completed',
      estimatedHours: 4
    }
  ];

  /**
   * Devuelve las clases CSS de color para mostrar la prioridad de una tarea.
   */
  const getPriorityColor = (priority: VolunteerTask['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  /**
   * Retorna el icono adecuado según el estado de la tarea.
   */
  const getStatusIcon = (status: VolunteerTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  /**
   * Devuelve el texto legible en español para cada estado.
   */
  const getStatusText = (status: VolunteerTask['status']) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'in_progress': return 'En progreso';
      case 'pending': return 'Pendiente';
    }
  };

  /**
   * Formatea una fecha en función de su cercanía:
   * - "Hoy" si coincide con la fecha actual
   * - "Mañana" si es el día siguiente
   * - Fecha abreviada (ej: "15 sept.") en otros casos
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  // Filtrar tareas según estado
  const pendingTasks = tasks.filter(task => task.status !== 'completed');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="card p-6">
      {/* Encabezado con título y botón para nueva tarea */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CheckSquare className="w-5 h-5 text-living-green-600" />
          <h3 className="text-lg font-semibold text-slate-800">Mis Tareas</h3>
        </div>
        <button className="btn-living-outline px-3 py-1 text-sm">
          <Plus className="w-4 h-4 mr-1" />
          Nueva Tarea
        </button>
      </div>

      {/* Resumen rápido con métricas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-800">{pendingTasks.length}</div>
          <div className="text-xs text-slate-600">Pendientes</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">
            {tasks.filter(t => t.status === 'in_progress').length}
          </div>
          <div className="text-xs text-blue-600">En Progreso</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-700">{completedTasks.length}</div>
          <div className="text-xs text-green-600">Completadas</div>
        </div>
      </div>

      {/* Lista de tareas activas */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Tareas Activas</h4>
        {pendingTasks.slice(0, 3).map((task) => (
          <div 
            key={task.id} 
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center space-x-3 flex-1">
              {getStatusIcon(task.status)}
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{task.title}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-slate-500">{task.project}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{task.estimatedHours}h</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
              <span className="text-xs text-slate-500">
                {formatDate(task.dueDate)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Tareas completadas recientemente */}
      {completedTasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-slate-700 mb-3">Completadas Recientemente</h4>
          {completedTasks.slice(0, 2).map((task) => (
            <div 
              key={task.id} 
              className="flex items-center justify-between p-3 bg-green-50 rounded-lg mb-2 last:mb-0"
            >
              <div className="flex items-center space-x-3 flex-1">
                {getStatusIcon(task.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">{task.title}</p>
                  <span className="text-xs text-green-600">{task.project}</span>
                </div>
              </div>
              <span className="text-xs text-green-700 font-medium">
                ✓ {getStatusText(task.status)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Enlace para ver todas las tareas */}
      <div className="mt-4 text-center">
        <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
          Ver todas mis tareas →
        </button>
      </div>
    </div>
  );
}
