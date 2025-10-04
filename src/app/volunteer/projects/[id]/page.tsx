// UBICACIÓN: src/app/volunteer/projects/[id]/page.tsx
// Página de detalle de proyecto para Voluntario - Vista limitada

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Target, 
  Clock,
  CheckCircle2,
  AlertTriangle,
  Star,
  FileText,
  MessageSquare,
  Settings,
  Eye,
  BarChart3
} from 'lucide-react';
import type { Project, ExtendedUserWithProfile } from '@/lib/types';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import { mockProjects, mockTeams, mockTeamMembers } from '@/lib/data/mockProjects';
import { buildProjectViews, ProjectView } from '@/lib/map/projects/projectView';
import { useAuth } from '@/lib/auth';

export default function VolunteerProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<ProjectView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'tasks' | 'files'>('overview');

  const loadProjectData = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Buscar el proyecto específico
      const foundProject = mockProjects.find(p => p.id === params.id);
      if (!foundProject) {
        router.push('/volunteer/projects');
        return;
      }

      // Verificar que el usuario actual es voluntario en este proyecto
      const projectTeam = mockTeams.find(t => t.project_id === foundProject.id);
      const teamMembers = projectTeam ? mockTeamMembers.filter(tm => tm.team_id === projectTeam.id) : [];
      const isVolunteer = teamMembers.some(tm => tm.user_id === user?.userId);
      
      if (!isVolunteer) {
        router.push('/volunteer/projects');
        return;
      }

      // Construir la vista del proyecto
      const projectView = buildProjectViews([foundProject], extendedMockUsers, mockTeams, mockTeamMembers)[0];
      setProject(projectView);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading project:', error);
      setIsLoading(false);
    }
  }, [params.id, router, user?.userId]);

  useEffect(() => {
    loadProjectData();
  }, [params.id, loadProjectData]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="loading-skeleton h-8 w-64"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="loading-skeleton h-96 rounded-xl"></div>
          </div>
          <div className="loading-skeleton h-96 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Proyecto no encontrado</h2>
          <p className="text-slate-600">No tienes acceso a este proyecto o no existe.</p>
          <button
            onClick={() => router.push('/volunteer/projects')}
            className="btn-living mt-4"
          >
            Volver a Mis Proyectos
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'planning': return 'Planificación';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/volunteer/projects')}
            className="text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{project.project.name}</h1>
            <p className="text-slate-600">Vista de voluntario • {project.lead?.name || 'Sin líder'}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.project.status)}`}>
            {getStatusLabel(project.project.status)}
          </span>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Progreso</p>
              <p className="text-3xl font-bold text-slate-800">{project.progressPct}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Equipo</p>
              <p className="text-3xl font-bold text-slate-800">{project.project.current_team_size}/{project.project.max_team_size}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Fecha Límite</p>
              <p className="text-3xl font-bold text-slate-800">
                {project.project.deadline ? new Date(project.project.deadline).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : 'Sin fecha'}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Mi Rol</p>
              <p className="text-3xl font-bold text-slate-800">Voluntario</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="card overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Resumen', icon: BarChart3 },
              { key: 'team', label: 'Equipo', icon: Users },
              { key: 'tasks', label: 'Tareas', icon: CheckCircle2 },
              { key: 'files', label: 'Archivos', icon: FileText }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información del proyecto */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Información del Proyecto</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Descripción</label>
                      <p className="text-slate-800 mt-1">{project.project.description || 'Sin descripción'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Líder de Proyecto</label>
                      <p className="text-slate-800 mt-1">{project.lead?.name || 'Sin asignar'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Ubicación</label>
                      <p className="text-slate-800 mt-1">
                        {project.city && project.country ? `${project.city}, ${project.country}` : 'No especificada'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progreso detallado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Progreso del Proyecto</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-slate-600">Progreso General</span>
                        <span className="font-medium text-slate-800">{project.progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${project.progressPct}%` }}
                        />
                      </div>
                    </div>

                    {project.project.deadline && (
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span className="font-medium text-slate-800">Fecha Límite</span>
                        </div>
                        <p className="text-slate-600">{formatDate(project.project.deadline)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Equipo del Proyecto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.members?.map((member) => (
                  <div key={member.id} className="card p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800">{member.name}</h4>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Mis Tareas</h3>
              
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-600 mb-2">Sistema de Tareas</h4>
                <p className="text-slate-500">Las tareas se gestionan a través del sistema Kanban del proyecto.</p>
                <p className="text-sm text-slate-400 mt-2">Contacta con tu líder de proyecto para más información.</p>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Archivos del Proyecto</h3>
              
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-600 mb-2">Gestión de Archivos</h4>
                <p className="text-slate-500">Los archivos se gestionan a través del sistema de archivos del proyecto.</p>
                <p className="text-sm text-slate-400 mt-2">Contacta con tu líder de proyecto para acceder a los archivos.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
