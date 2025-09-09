// src/modules/dashboard/lead/ProjectOverview.tsx
'use client';

import { 
  FolderOpen, 
  Users, 
  Calendar, 
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  MoreVertical,
  Play,
  Pause,
  Eye
} from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'planning' | 'review' | 'paused' | 'completed';
  progress: number;
  teamSize: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  tasksCompleted: number;
  totalTasks: number;
  lastActivity: string;
  color: string;
}

export default function ProjectOverview() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'EcoVerde',
      description: 'Plataforma digital para educación ambiental',
      status: 'active',
      progress: 87,
      teamSize: 5,
      dueDate: '2025-02-15',
      priority: 'high',
      tasksCompleted: 15,
      totalTasks: 18,
      lastActivity: 'Hace 15 min',
      color: 'bg-green-500'
    },
    {
      id: '2',
      name: 'TechEdu',
      description: 'Sistema de gestión educativa para ONGs',
      status: 'active',
      progress: 73,
      teamSize: 4,
      dueDate: '2025-03-01',
      priority: 'medium',
      tasksCompleted: 12,
      totalTasks: 16,
      lastActivity: 'Hace 2 horas',
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'HealthConnect',
      description: 'App móvil para seguimiento de salud comunitaria',
      status: 'review',
      progress: 91,
      teamSize: 6,
      dueDate: '2025-02-08',
      priority: 'high',
      tasksCompleted: 20,
      totalTasks: 22,
      lastActivity: 'Hace 4 horas',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'CommunityAid',
      description: 'Portal web para coordinación de ayuda humanitaria',
      status: 'planning',
      progress: 25,
      teamSize: 3,
      dueDate: '2025-04-15',
      priority: 'medium',
      tasksCompleted: 3,
      totalTasks: 12,
      lastActivity: 'Hace 1 día',
      color: 'bg-orange-500'
    }
  ];

  const getStatusConfig = (status: Project['status']) => {
    const configs = {
      active: { 
        label: 'Activo', 
        color: 'text-green-700 bg-green-100',
        icon: Play
      },
      planning: { 
        label: 'Planificación', 
        color: 'text-blue-700 bg-blue-100',
        icon: Calendar
      },
      review: { 
        label: 'En Revisión', 
        color: 'text-yellow-700 bg-yellow-100',
        icon: Eye
      },
      paused: { 
        label: 'Pausado', 
        color: 'text-slate-700 bg-slate-100',
        icon: Pause
      },
      completed: { 
        label: 'Completado', 
        color: 'text-emerald-700 bg-emerald-100',
        icon: CheckCircle
      }
    };
    return configs[status];
  };

  const getPriorityColor = (priority: Project['priority']) => {
    const colors = {
      high: 'border-red-300 bg-red-50',
      medium: 'border-yellow-300 bg-yellow-50',
      low: 'border-green-300 bg-green-50'
    };
    return colors[priority];
  };

  const getDaysUntilDeadline = (dueDate: string) => {
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { days: Math.abs(diffDays), status: 'overdue' };
    if (diffDays <= 7) return { days: diffDays, status: 'urgent' };
    if (diffDays <= 14) return { days: diffDays, status: 'soon' };
    return { days: diffDays, status: 'normal' };
  };

  const handleProjectAction = (projectId: string, action: string) => {
    console.log(`Action ${action} on project ${projectId}`);
    // Aquí irían las acciones específicas del proyecto
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <FolderOpen className="w-5 h-5 mr-2 text-emerald-600" />
          Mis Proyectos
        </h3>
        <div className="flex items-center space-x-2">
          <select className="text-sm border border-slate-300 rounded px-3 py-1 bg-white">
            <option>Todos los estados</option>
            <option>Solo activos</option>
            <option>En revisión</option>
            <option>Próximos deadlines</option>
          </select>
          <button className="text-sm text-primary hover:underline">
            Ver todos los proyectos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {projects.map((project) => {
          const statusConfig = getStatusConfig(project.status);
          const deadline = getDaysUntilDeadline(project.dueDate);
          const StatusIcon = statusConfig.icon;

          return (
            <div 
              key={project.id}
              className={`border-l-4 ${getPriorityColor(project.priority)} p-4 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer`}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
            >
              {/* Encabezado del proyecto */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-slate-800">{project.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusConfig.color} flex items-center space-x-1`}>
                      <StatusIcon className="w-3 h-3" />
                      <span>{statusConfig.label}</span>
                    </span>
                    {project.priority === 'high' && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                        Alta prioridad
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{project.description}</p>
                </div>
                
                <button className="p-1 hover:bg-slate-100 rounded">
                  <MoreVertical className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Métricas principales */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className={`w-8 h-8 ${project.color} rounded-full mx-auto mb-1 flex items-center justify-center text-white font-semibold text-sm`}>
                    {project.progress}%
                  </div>
                  <p className="text-xs text-slate-600">Progreso</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span className="font-semibold text-slate-700">{project.teamSize}</span>
                  </div>
                  <p className="text-xs text-slate-600">Miembros</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-slate-700">{project.tasksCompleted}/{project.totalTasks}</span>
                  </div>
                  <p className="text-xs text-slate-600">Tareas</p>
                </div>
                
                <div className="text-center">
                  <div className={`font-semibold mb-1 ${
                    deadline.status === 'overdue' ? 'text-red-600' :
                    deadline.status === 'urgent' ? 'text-orange-600' :
                    deadline.status === 'soon' ? 'text-yellow-600' : 'text-slate-700'
                  }`}>
                    {deadline.status === 'overdue' ? `+${deadline.days}d` : `${deadline.days}d`}
                  </div>
                  <p className="text-xs text-slate-600">
                    {deadline.status === 'overdue' ? 'Retrasado' : 'Restantes'}
                  </p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-600">Progreso general</span>
                  <span className="text-xs text-slate-500">Última actividad: {project.lastActivity}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 ${project.color} rounded-full transition-all duration-500`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Detalles expandidos */}
              {selectedProject === project.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-200">
                  {/* Alertas importantes */}
                  {deadline.status === 'overdue' && (
                    <div className="flex items-center space-x-2 p-2 bg-red-50 rounded text-red-700">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs">Este proyecto está atrasado</span>
                    </div>
                  )}
                  {deadline.status === 'urgent' && (
                    <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded text-orange-700">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Deadline próximo - requiere atención</span>
                    </div>
                  )}

                  {/* Acciones rápidas */}
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction(project.id, 'view-tasks');
                      }}
                      className="px-3 py-1 text-xs bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                    >
                      Ver tareas
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction(project.id, 'view-team');
                      }}
                      className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                    >
                      Gestionar equipo
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectAction(project.id, 'generate-report');
                      }}
                      className="px-3 py-1 text-xs bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                    >
                      Generar reporte
                    </button>
                    {project.status === 'review' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectAction(project.id, 'approve');
                        }}
                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                      >
                        Revisar entrega
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-emerald-600">69%</span>
          </div>
          <p className="text-xs text-slate-600">Progreso Promedio</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-600">18</span>
          </div>
          <p className="text-xs text-slate-600">Total Miembros</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-purple-600">50/68</span>
          </div>
          <p className="text-xs text-slate-600">Tareas Completadas</p>
        </div>
      </div>
    </div>
  );
}