// UBICACIÓN: src/app/hr/projects/[id]/page.tsx
// Página del proyecto CON modales funcionales para Configurar y Editar

'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  BarChart3,
  Activity,
  FileText,
  Target,
  Settings,
  Edit,
  X,
  Save
} from 'lucide-react';

import type { Project, ExtendedUserWithProfile, Task } from '@/lib/types';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import { mockProjects, mockTeams, mockTeamMembers } from '@/lib/data/mockProjects';
import { mockTasks, mockActivities, ProjectActivity } from '@/lib/data/mockTasks';
import { buildProjectViews, ProjectView } from '@/lib/map/projects/projectView';
import ProjectKanbanBoard from '@/modules/projects/hr/trello/ProjectKanbanBoard';
import SimpleProjectTeamView from '@/modules/projects/hr/trello/SimpleProjectTeamView';
import ProjectFilesManager from '@/modules/projects/hr/files/ProjectFilesManager';

type TabKey = 'kanban' | 'activity' | 'files' | 'team';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [project, setProject] = useState<ProjectView | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activities, setActivities] = useState<ProjectActivity[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('kanban');
  const [isLoading, setIsLoading] = useState(true);

  // Estados de modales
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estados de formularios
  const [configForm, setConfigForm] = useState({
    status: 'active' as Project['status']
  });

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    deadline: '',
    max_team_size: 8
  });

  // Cargar datos del proyecto
  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const views = buildProjectViews(
        mockProjects, 
        extendedMockUsers, 
        mockTeams, 
        mockTeamMembers
      );
      
      const projectView = views.find(p => p.project.id === id);
      if (!projectView) {
        router.push('/hr/projects');
        return;
      }
      
      setProject(projectView);
      setTasks(mockTasks.filter(task => task.project_id === id));
      setActivities(mockActivities.filter(activity => activity.project_id === id));
      
      // Inicializar formularios
      setConfigForm({
        status: projectView.project.status
      });
      
      setEditForm({
        name: projectView.project.name,
        description: projectView.project.description || '',
        deadline: projectView.project.deadline || '',
        max_team_size: projectView.project.max_team_size
      });
      
      setIsLoading(false);
    };

    loadProject();
  }, [id, router]);

  // Handlers
  const handleConfigSave = () => {
    if (!project) return;
    
    // Simular actualización del estado
    const updatedProject = {
      ...project,
      project: {
        ...project.project,
        status: configForm.status
      }
    };
    
    setProject(updatedProject);
    setShowConfigModal(false);
    alert(`Estado del proyecto actualizado a: ${getStatusText(configForm.status)}`);
  };

  const handleEditSave = () => {
    if (!project) return;
    
    // Simular actualización del proyecto
    const updatedProject = {
      ...project,
      project: {
        ...project.project,
        name: editForm.name,
        description: editForm.description,
        deadline: editForm.deadline,
        max_team_size: editForm.max_team_size
      }
    };
    
    setProject(updatedProject);
    setShowEditModal(false);
    alert('Proyecto actualizado correctamente');
  };

  // Estadísticas del proyecto
  const projectStats = useMemo(() => {
    if (!tasks.length) return null;
    
    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const totalHours = tasks.reduce((acc, t) => acc + (t.actual_hours || 0), 0);
    const estimatedHours = tasks.reduce((acc, t) => acc + t.estimated_hours, 0);
    
    return {
      totalTasks: tasks.length,
      completed,
      inProgress,
      completionRate: Math.round((completed / tasks.length) * 100),
      totalHours,
      estimatedHours,
      efficiency: Math.round((totalHours / estimatedHours) * 100)
    };
  }, [tasks]);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="loading-skeleton h-12 w-96"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-skeleton h-24 rounded-xl"></div>
          ))}
        </div>
        <div className="loading-skeleton h-96 rounded-xl"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Proyecto no encontrado</h1>
        <button 
          onClick={() => router.push('/hr/projects')}
          className="btn-living"
        >
          Volver a Proyectos
        </button>
      </div>
    );
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'planning': return 'En Planificación';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header del proyecto */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/hr/projects')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Volver"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-800">
                  {project.project.name}
                </h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.project.status)}`}>
                  {getStatusText(project.project.status)}
                </span>
              </div>
              
              {project.project.description && (
                <p className="text-gray-600 mb-3">{project.project.description}</p>
              )}
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.lead?.name || 'Sin líder asignado'}</span>
                </div>
                
                {(project.country || project.city) && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.city ? `${project.city}, ` : ''}{project.country}</span>
                  </div>
                )}
                
                {project.project.deadline && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Vence: {new Date(project.project.deadline).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowConfigModal(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Configurar</span>
            </button>
            <button 
              onClick={() => setShowEditModal(true)}
              className="btn-living flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Editar Proyecto</span>
            </button>
          </div>
        </div>

        {/* Métricas del proyecto */}
        {projectStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700">Total Tareas</p>
                  <p className="text-2xl font-bold text-blue-800">{projectStats.totalTasks}</p>
                </div>
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-700">Completadas</p>
                  <p className="text-2xl font-bold text-emerald-800">{projectStats.completed}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-600 font-medium">
                    {projectStats.completionRate}%
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-700">En Progreso</p>
                  <p className="text-2xl font-bold text-orange-800">{projectStats.inProgress}</p>
                </div>
                <Activity className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700">Horas Trabajadas</p>
                  <p className="text-2xl font-bold text-purple-800">{projectStats.totalHours}h</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-600 font-medium">
                    de {projectStats.estimatedHours}h est.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'kanban', label: 'Kanban', icon: BarChart3 },
              { key: 'activity', label: 'Actividad', icon: Activity },
              { key: 'files', label: 'Archivos', icon: FileText },
              { key: 'team', label: 'Equipo', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as TabKey)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de las tabs */}
        <div className="p-6">
          {activeTab === 'kanban' && (
            <ProjectKanbanBoard
              projectId={project.project.id}
              tasks={tasks}
              setTasks={handleTaskUpdate}
              projectMembers={project.members || []}
              projectLead={project.lead}
            />
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Actividad Reciente
              </h3>
              
              {activities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay actividad reciente</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const user = extendedMockUsers.find(u => u.id === activity.user_id);
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium text-gray-800">{user?.name}</span>
                            {' '}
                            <span className="text-gray-600">{activity.title}</span>
                          </p>
                          {activity.description && (
                            <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(activity.created_at.replace(' ', 'T')).toLocaleString('es-ES')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'files' && (
            <ProjectFilesManager />
          )}

          {activeTab === 'team' && (
            <SimpleProjectTeamView
              projectMembers={project.members || []}
              projectLead={project.lead}
              maxTeamSize={project.project.max_team_size}
            />
          )}
        </div>
      </div>

      {/* Modal Configurar Estado */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Configurar Proyecto</h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Estado del Proyecto
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'active', label: 'Activo', color: 'emerald' },
                    { value: 'paused', label: 'Pausado', color: 'yellow' },
                    { value: 'completed', label: 'Finalizado', color: 'green' }
                  ].map(({ value, label, color }) => (
                    <label
                      key={value}
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        configForm.status === value
                          ? `border-${color}-500 bg-${color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={value}
                        checked={configForm.status === value}
                        onChange={(e) => setConfigForm({ status: e.target.value as Project['status'] })}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        configForm.status === value
                          ? `border-${color}-500 bg-${color}-500`
                          : 'border-gray-300'
                      }`}>
                        {configForm.status === value && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfigSave}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Proyecto */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Edit className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Editar Proyecto</h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="Nombre del proyecto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="Descripción del proyecto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    value={editForm.deadline}
                    onChange={(e) => setEditForm(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamaño Máximo del Equipo
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={editForm.max_team_size}
                    onChange={(e) => setEditForm(prev => ({ ...prev, max_team_size: parseInt(e.target.value) || 8 }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditSave}
                  disabled={!editForm.name.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}