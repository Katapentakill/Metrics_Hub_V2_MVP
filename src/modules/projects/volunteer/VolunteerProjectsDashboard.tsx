// UBICACIÓN: src/modules/projects/volunteer/VolunteerProjectsDashboard.tsx
// Dashboard de proyectos para Voluntario - Solo muestra sus proyectos
// ✅ Actualizado con colores institucionales Living Stones

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Target, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Eye,
  ArrowRight,
  Star,
  Award,
  FileText,
  Kanban,
  Filter,
  Download
} from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';
import ProjectFilesManager from './files/ProjectFilesManager';
import ProjectDetailModal from './modals/ProjectDetailModal';
import ProjectKanbanBoard from './trello/ProjectKanbanBoard';
import AdvancedProjectFilters from './AdvancedProjectFilters';
import ExportProjects from './ExportProjects';

interface VolunteerProjectsDashboardProps {
  projects: ProjectView[];
  timeframe?: '7d' | '30d' | '90d' | '1y';
}

export default function VolunteerProjectsDashboard({ 
  projects, 
  timeframe: initialTimeframe = '30d' 
}: VolunteerProjectsDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'team' | 'timeline' | 'files' | 'kanban' | 'export'>('overview');
  const [selectedProject, setSelectedProject] = useState<ProjectView | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>(initialTimeframe);

  // Función para navegar al proyecto
  const navigateToProject = (projectId: string) => {
    router.push(`/volunteer/projects/${projectId}`);
  };

  // Calcular métricas principales
  const metrics = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.project.status === 'active').length;
    const completed = projects.filter(p => p.project.status === 'completed').length;
    const planning = projects.filter(p => p.project.status === 'planning').length;
    const paused = projects.filter(p => p.project.status === 'paused').length;
    
    const totalMembers = projects.reduce((acc, p) => acc + (p.members?.length || 0), 0);
    const avgProgress = Math.round(projects.reduce((acc, p) => acc + p.progressPct, 0) / total || 0);
    
    const currentTime = new Date().getTime();
    const atRisk = projects.filter(p => {
      if (!p.project.deadline) return false;
      const daysUntilDeadline = Math.ceil(
        (new Date(p.project.deadline).getTime() - currentTime) / (1000 * 60 * 60 * 24)
      );
      return (daysUntilDeadline <= 14 && p.progressPct < 80) || daysUntilDeadline < 0;
    }).length;

    const teamUtilization = projects.reduce((acc, p) => {
      return acc + (p.project.current_team_size / p.project.max_team_size);
    }, 0) / total * 100;

    return {
      total,
      active,
      completed,
      planning,
      paused,
      totalMembers,
      avgProgress,
      atRisk,
      teamUtilization: Math.round(teamUtilization || 0),
      completionRate: Math.round((completed / total) * 100 || 0)
    };
  }, [projects]);

  // Datos para gráficos con colores institucionales
  const statusDistribution = [
    { name: 'Activos', value: metrics.active, color: 'bg-[#059669]', textColor: 'text-[#059669]' },
    { name: 'Completados', value: metrics.completed, color: 'bg-[#22c55e]', textColor: 'text-[#22c55e]' },
    { name: 'Planificación', value: metrics.planning, color: 'bg-[#3b82f6]', textColor: 'text-[#3b82f6]' },
    { name: 'Pausados', value: metrics.paused, color: 'bg-[#eab308]', textColor: 'text-[#eab308]' }
  ];

  const progressRanges = useMemo(() => {
    const ranges = {
      low: projects.filter(p => p.progressPct < 25).length,
      medium: projects.filter(p => p.progressPct >= 25 && p.progressPct < 75).length,
      high: projects.filter(p => p.progressPct >= 75).length
    };
    return ranges;
  }, [projects]);

  const getMetricCard = (title: string, value: string | number, change: string, icon: React.ElementType, trend: 'up' | 'down' | 'neutral' = 'neutral') => {
    const Icon = icon;
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Target;
    const trendColor = trend === 'up' ? 'text-[#059669]' : trend === 'down' ? 'text-[#ef4444]' : 'text-[#4b5563]';
    
    return (
      <div className="bg-[#f0fdf4] border-2 border-[#14b8a6] rounded-xl shadow-md p-6 
                      hover:shadow-lg hover:-translate-y-1 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#4b5563] mb-1">{title}</p>
            <p className="text-3xl font-bold text-[#1e293b]">{value}</p>
            <div className="flex items-center mt-2 text-sm">
              <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
              <span className={trendColor}>{change}</span>
              <span className="text-[#4b5563] ml-1">vs período anterior</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#166534] to-[#059669] rounded-xl 
                          flex items-center justify-center shadow-md">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1e293b]">Panel de Mis Proyectos</h2>
          <p className="text-[#4b5563]">Resumen de los proyectos en los que participo como voluntario</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as '7d' | '30d' | '90d' | '1y')}
            className="bg-white border-2 border-[#e2e8f0] rounded-lg px-3 py-2 text-sm 
                       focus:outline-none focus:border-[#059669] focus:ring-3 focus:ring-[#059669]/10
                       transition-all"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="1y">Último año</option>
          </select>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricCard("Mis Proyectos", metrics.total, "+12%", Target, 'up')}
        {getMetricCard("Proyectos Activos", metrics.active, "+8%", CheckCircle2, 'up')}
        {getMetricCard("Progreso Promedio", `${metrics.avgProgress}%`, "+5%", BarChart3, 'up')}
        {getMetricCard("En Riesgo", metrics.atRisk, "-3%", AlertTriangle, 'down')}
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-xl shadow-md border border-[#e2e8f0]">
        <div className="border-b border-[#e2e8f0]">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Resumen', icon: BarChart3 },
              { key: 'performance', label: 'Rendimiento', icon: TrendingUp },
              { key: 'team', label: 'Equipos', icon: Users },
              { key: 'timeline', label: 'Cronograma', icon: Calendar },
              { key: 'files', label: 'Archivos', icon: FileText },
              { key: 'kanban', label: 'Tareas', icon: Kanban },
              { key: 'export', label: 'Exportar', icon: Download }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  activeTab === key
                    ? 'border-[#166534] text-[#166534] bg-[#f0fdf4]'
                    : 'border-transparent text-[#4b5563] hover:text-[#1e293b] hover:bg-[#f9fafb]'
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
                {/* Distribución por estado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1e293b]">Distribución por Estado</h3>
                  <div className="space-y-3">
                    {statusDistribution.map((status) => (
                      <div key={status.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                          <span className="text-sm font-medium text-[#1e293b]">{status.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-bold ${status.textColor}`}>
                            {status.value}
                          </span>
                          <span className="text-xs text-[#4b5563]">
                            ({Math.round((status.value / metrics.total) * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribución por progreso */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#1e293b]">Distribución por Progreso</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                        <span className="text-sm font-medium text-[#1e293b]">Bajo (&lt;25%)</span>
                      </div>
                      <span className="text-sm font-bold text-[#ef4444]">{progressRanges.low}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
                        <span className="text-sm font-medium text-[#1e293b]">Medio (25-75%)</span>
                      </div>
                      <span className="text-sm font-bold text-[#eab308]">{progressRanges.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-[#059669]"></div>
                        <span className="text-sm font-medium text-[#1e293b]">Alto (&gt;75%)</span>
                      </div>
                      <span className="text-sm font-bold text-[#059669]">{progressRanges.high}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de proyectos destacados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1e293b]">Mis Proyectos Destacados</h3>
                  <button 
                    onClick={() => router.push('/volunteer/projects')}
                    className="text-[#166534] hover:text-[#059669] text-sm font-semibold 
                               flex items-center space-x-1 transition-colors"
                  >
                    <span>Ver todos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((project) => (
                    <div 
                      key={project.project.id}
                      className="bg-white border border-[#e2e8f0] rounded-xl p-4 
                                 hover:shadow-md hover:border-[#14b8a6] transition-all duration-200 
                                 cursor-pointer group"
                      onClick={() => navigateToProject(project.project.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-[#1e293b] group-hover:text-[#166534] transition-colors">
                          {project.project.name}
                        </h4>
                        <Eye className="w-4 h-4 text-[#4b5563] group-hover:text-[#166534] transition-colors" />
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-[#4b5563] mb-3">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{project.project.current_team_size}/{project.project.max_team_size}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.project.status === 'active' ? 'bg-[#d1fae5] text-[#065f46]' :
                          project.project.status === 'planning' ? 'bg-[#dbeafe] text-[#1e40af]' :
                          'bg-[#f9fafb] text-[#4b5563]'
                        }`}>
                          {project.project.status === 'active' ? 'Activo' : 
                           project.project.status === 'planning' ? 'Planificación' : 
                           project.project.status}
                        </div>
                      </div>
                      
                      <div className="w-full bg-[#e2e8f0] rounded-full h-2">
                        <div 
                          className="h-2 bg-[#166534] rounded-full transition-all duration-300"
                          style={{ width: `${project.progressPct}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-[#4b5563] mt-1 font-medium">
                        {project.progressPct}% completado
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-[#1e293b]">Mi Rendimiento en Proyectos</h3>
                <div className="bg-[#f9fafb] rounded-xl p-4 h-64 flex items-center justify-center 
                                border border-[#e2e8f0]">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-[#94a3b8] mx-auto mb-2" />
                    <p className="text-[#4b5563]">Gráfico de rendimiento</p>
                    <p className="text-xs text-[#94a3b8]">Implementar con librería de gráficos</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#1e293b]">Métricas Clave</h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-br from-[#d1fae5] to-[#f0fdf4] rounded-xl p-4 
                                  border border-[#059669]">
                    <div className="text-2xl font-bold text-[#065f46]">{metrics.completionRate}%</div>
                    <div className="text-sm font-semibold text-[#059669]">Tasa de Finalización</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] rounded-xl p-4 
                                  border border-[#3b82f6]">
                    <div className="text-2xl font-bold text-[#1e40af]">{metrics.teamUtilization}%</div>
                    <div className="text-sm font-semibold text-[#3b82f6]">Utilización de Equipos</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#fef3c7] to-[#fef9c3] rounded-xl p-4 
                                  border border-[#eab308]">
                    <div className="text-2xl font-bold text-[#92400e]">{metrics.atRisk}</div>
                    <div className="text-sm font-semibold text-[#eab308]">Proyectos en Riesgo</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#1e293b]">Mis Equipos de Trabajo</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] rounded-xl p-4 
                                border border-[#3b82f6]">
                  <div className="text-2xl font-bold text-[#1e40af]">{metrics.totalMembers}</div>
                  <div className="text-sm font-semibold text-[#3b82f6]">Total Miembros</div>
                </div>
                <div className="bg-gradient-to-br from-[#d1fae5] to-[#f0fdf4] rounded-xl p-4 
                                border border-[#059669]">
                  <div className="text-2xl font-bold text-[#065f46]">
                    {Math.round(metrics.totalMembers / metrics.active || 0)}
                  </div>
                  <div className="text-sm font-semibold text-[#059669]">Promedio por Proyecto</div>
                </div>
                <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-xl p-4 
                                border border-[#14b8a6]">
                  <div className="text-2xl font-bold text-[#166534]">{metrics.teamUtilization}%</div>
                  <div className="text-sm font-semibold text-[#14b8a6]">Capacidad Utilizada</div>
                </div>
              </div>

              <div className="bg-[#f9fafb] rounded-xl p-6 border border-[#e2e8f0]">
                <h4 className="font-bold text-[#1e293b] mb-4">Mis Proyectos por Capacidad de Equipo</h4>
                <div className="space-y-3">
                  {projects.slice(0, 5).map((project) => {
                    const utilization = (project.project.current_team_size / project.project.max_team_size) * 100;
                    return (
                      <div 
                        key={project.project.id}
                        className="flex items-center justify-between hover:bg-white rounded-lg p-2 
                                   cursor-pointer transition-colors border border-transparent 
                                   hover:border-[#14b8a6]"
                        onClick={() => navigateToProject(project.project.id)}
                      >
                        <span className="text-sm font-medium text-[#1e293b] hover:text-[#166534] transition-colors">
                          {project.project.name}
                        </span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-[#e2e8f0] rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                utilization >= 90 ? 'bg-[#ef4444]' : 
                                utilization >= 75 ? 'bg-[#eab308]' : 'bg-[#059669]'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-[#4b5563] min-w-[60px] font-medium">
                            {project.project.current_team_size}/{project.project.max_team_size}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[#1e293b]">Cronograma de Mis Proyectos</h3>
              
              <div className="space-y-4">
                {projects
                  .filter(p => p.project.deadline)
                  .sort((a, b) => new Date(a.project.deadline!).getTime() - new Date(b.project.deadline!).getTime())
                  .slice(0, 8)
                  .map((project) => {
                    const deadline = new Date(project.project.deadline!);
                    const today = new Date();
                    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    const isOverdue = daysLeft < 0;
                    const isUrgent = daysLeft <= 7 && daysLeft >= 0;
                    
                    return (
                      <div 
                        key={project.project.id} 
                        className="flex items-center justify-between p-4 bg-white border border-[#e2e8f0] 
                                   rounded-xl hover:shadow-md hover:border-[#14b8a6] cursor-pointer 
                                   transition-all group"
                        onClick={() => navigateToProject(project.project.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            isOverdue ? 'bg-[#ef4444]' : 
                            isUrgent ? 'bg-[#eab308]' : 
                            'bg-[#059669]'
                          }`}></div>
                          <div>
                            <h4 className="font-semibold text-[#1e293b] group-hover:text-[#166534] transition-colors">
                              {project.project.name}
                            </h4>
                            <p className="text-sm text-[#4b5563]">{project.lead?.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className={`text-sm font-semibold ${
                              isOverdue ? 'text-[#ef4444]' : 
                              isUrgent ? 'text-[#eab308]' : 
                              'text-[#4b5563]'
                            }`}>
                              {isOverdue ? `${Math.abs(daysLeft)} días vencido` :
                               daysLeft === 0 ? 'Hoy' :
                               `${daysLeft} días restantes`}
                            </div>
                            <div className="text-xs text-[#94a3b8]">
                              {deadline.toLocaleDateString('es-ES')}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-semibold text-[#1e293b]">{project.progressPct}%</div>
                            <div className="w-16 bg-[#e2e8f0] rounded-full h-1 mt-1">
                              <div 
                                className="h-1 bg-[#166534] rounded-full"
                                style={{ width: `${project.progressPct}%` }}
                              />
                            </div>
                          </div>
                          
                          <Eye className="w-4 h-4 text-[#4b5563] group-hover:text-[#166534] transition-colors" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              <ProjectFilesManager />
            </div>
          )}

          {/* Kanban Tab */}
          {activeTab === 'kanban' && (
            <div className="space-y-6">
              <ProjectKanbanBoard 
                projectId={projects[0]?.project.id || ''}
                tasks={[]}
                setTasks={() => {}}
              />
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Download className="w-16 h-16 text-[#94a3b8] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">Exportar Proyectos</h3>
                <p className="text-[#4b5563] mb-6">Descarga tus proyectos en formato CSV</p>
                <ExportProjects views={projects} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal */}
      {showDetailModal && selectedProject && (
        <ProjectDetailModal
          view={selectedProject}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
}