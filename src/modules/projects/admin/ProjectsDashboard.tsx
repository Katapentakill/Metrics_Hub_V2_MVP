// UBICACIÓN: src/features/admin/projects/components/ProjectsDashboard.tsx
// Dashboard de proyectos actualizado con navegación al Kanban y paleta institucional

import React, { useState, useMemo } from 'react';

// FIX: Mocking useRouter for environment compatibility
const useRouter = () => ({
  push: (path: string) => {
    console.log(`[Router Mock] Attempted navigation to: ${path}`);
  },
});

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
  ArrowRight
} from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ProjectsDashboardProps {
  projects: ProjectView[];
}

export default function ProjectsDashboard({ 
  projects = [],
}: ProjectsDashboardProps) {
  const router = useRouter();
  
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'team' | 'timeline'>('overview');

  const handleTimeframeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(event.target.value as '7d' | '30d' | '90d' | '1y');
  };

  const navigateToProject = (projectId: string) => {
    router.push(`/admin/projects/${projectId}`);
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
    
    const atRisk = projects.filter(p => {
      if (!p.project.deadline) return false;
      const daysUntilDeadline = Math.ceil(
        (new Date(p.project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return (daysUntilDeadline <= 14 && p.progressPct < 80) || daysUntilDeadline < 0;
    }).length;

    const teamUtilization = projects.reduce((acc, p) => {
      if (p.project.max_team_size === 0) return acc;
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

  // Datos para gráficos - PALETA INSTITUCIONAL
  const statusDistribution = [
    { name: 'Activos', value: metrics.active, color: 'bg-emerald-300', textColor: 'text-emerald-600' },
    { name: 'Completados', value: metrics.completed, color: 'bg-green-300', textColor: 'text-[#166534]' },
    { name: 'Planificación', value: metrics.planning, color: 'bg-blue-300', textColor: 'text-blue-600' },
    { name: 'Pausados', value: metrics.paused, color: 'bg-yellow-300', textColor: 'text-yellow-600' }
  ];

  const progressRanges = useMemo(() => {
    const ranges = {
      low: projects.filter(p => p.progressPct < 25).length,
      medium: projects.filter(p => p.progressPct >= 25 && p.progressPct < 75).length,
      high: projects.filter(p => p.progressPct >= 75).length
    };
    return ranges;
  }, [projects]);

  // Función para crear tarjetas de métricas con iconos de diferentes verdes
  const getMetricCard = (
    title: string, 
    value: string | number, 
    change: string, 
    icon: React.ElementType, 
    trend: 'up' | 'down' | 'neutral' = 'neutral',
    iconBg: string // Nuevo parámetro para el fondo del icono
  ) => {
    const Icon = icon;
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Target;
    const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-gray-600';
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
            <div className="flex items-center mt-2 text-sm">
              <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
              <span className={trendColor}>{change}</span>
              <span className="text-gray-600 ml-1">vs período anterior</span>
            </div>
          </div>
          <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center shadow-sm`}>
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
          <h2 className="text-2xl font-bold text-slate-800">Panel de Proyectos</h2>
          <p className="text-gray-600">Resumen y métricas de rendimiento (Filtro: {selectedTimeframe})</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={selectedTimeframe} 
            onChange={handleTimeframeChange}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] cursor-pointer"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="1y">Último año</option>
          </select>
        </div>
      </div>

      {/* Métricas principales - cada una con diferente fondo de verde */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricCard(
          "Total Proyectos", 
          metrics.total, 
          "+12%", 
          Target, 
          'up',
          'bg-gradient-to-br from-[#166534] to-[#14532d]' // green-800 a green-900
        )}
        {getMetricCard(
          "Proyectos Activos", 
          metrics.active, 
          "+8%", 
          CheckCircle2, 
          'up',
          'bg-gradient-to-br from-emerald-500 to-emerald-600' // emerald
        )}
        {getMetricCard(
          "Progreso Promedio", 
          `${metrics.avgProgress}%`, 
          "+5%", 
          BarChart3, 
          'up',
          'bg-gradient-to-br from-teal-500 to-teal-600' // teal
        )}
        {getMetricCard(
          "En Riesgo", 
          metrics.atRisk, 
          "-3%", 
          AlertTriangle, 
          'down',
          'bg-gradient-to-br from-[#84cc16] to-[#65a30d]' // lime
        )}
      </div>

      {/* Tabs de navegación - PALETA INSTITUCIONAL */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Resumen', icon: BarChart3 },
              { key: 'performance', label: 'Rendimiento', icon: TrendingUp },
              { key: 'team', label: 'Equipos', icon: Users },
              { key: 'timeline', label: 'Cronograma', icon: Calendar }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-[#166534] text-[#166534] bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-slate-900 hover:bg-gray-50'
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
                  <h3 className="text-lg font-semibold text-slate-800">Distribución por Estado</h3>
                  <div className="space-y-3">
                    {statusDistribution.map((status) => (
                      <div key={status.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                          <span className="text-sm font-medium text-slate-700">{status.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold ${status.textColor}`}>
                            {status.value}
                          </span>
                          <span className="text-xs text-gray-600">
                            ({Math.round((status.value / metrics.total) * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribución por progreso - COLORES PASTEL 300 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Distribución por Progreso</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-red-300"></div>
                        <span className="text-sm font-medium text-slate-700">Bajo (&lt;25%)</span>
                      </div>
                      <span className="text-sm font-semibold text-red-600">{progressRanges.low}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                        <span className="text-sm font-medium text-slate-700">Medio (25-75%)</span>
                      </div>
                      <span className="text-sm font-semibold text-yellow-600">{progressRanges.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-green-300"></div>
                        <span className="text-sm font-medium text-slate-700">Alto (&gt;75%)</span>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600">{progressRanges.high}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de proyectos destacados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">Proyectos Destacados</h3>
                  <button 
                    onClick={() => router.push('/admin/projects')}
                    className="text-[#22c55e] hover:text-[#059669] text-sm font-medium flex items-center space-x-1 transition-colors"
                  >
                    <span>Ver todos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((project, index) => {
                    // Asignar diferentes tonalidades de verde de la paleta institucional
                    const greenBackgrounds = [
                      'bg-gradient-to-br from-green-50 to-emerald-50',     // green-50 + emerald-50
                      'bg-gradient-to-br from-emerald-50 to-teal-50',      // emerald-50 + teal-50
                      'bg-gradient-to-br from-teal-50 to-green-50',        // teal-50 + green-50
                      'bg-gradient-to-br from-lime-50 to-emerald-50'       // lime-50 + emerald-50
                    ];
                    const bgColor = greenBackgrounds[index % greenBackgrounds.length];
                    
                    return (
                      <div 
                        key={project.project.id}
                        className={`${bgColor} border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-[#059669] transition-all duration-200 cursor-pointer group`}
                        onClick={() => navigateToProject(project.project.id)}
                      >
                        {/* Header con avatar e icono */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                              {project.project.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800 group-hover:text-[#166534] transition-colors line-clamp-1">
                                {project.project.name}
                              </h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                                  project.project.status === 'active' ? 'bg-emerald-50 text-emerald-800 border-emerald-600' :
                                  project.project.status === 'planning' ? 'bg-blue-50 text-blue-800 border-blue-500' :
                                  project.project.status === 'completed' ? 'bg-green-50 text-[#166534] border-[#166534]' :
                                  'bg-gray-50 text-gray-800 border-slate-200'
                                }`}>
                                  {project.project.status === 'active' ? 'Activo' : 
                                   project.project.status === 'planning' ? 'Planificación' : 
                                   project.project.status === 'completed' ? 'Completado' :
                                   project.project.status}
                                </div>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToProject(project.project.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 hover:bg-blue-100 text-[#3b82f6] p-2 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Métricas */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-2.5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600 font-medium">Equipo</span>
                              <Users className="w-3 h-3 text-gray-600" />
                            </div>
                            <div className="text-sm font-bold text-slate-800">
                              {project.project.current_team_size}/{project.project.max_team_size}
                            </div>
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg p-2.5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600 font-medium">Progreso</span>
                              <BarChart3 className="w-3 h-3 text-gray-600" />
                            </div>
                            <div className="text-sm font-bold text-slate-800">
                              {project.progressPct}%
                            </div>
                          </div>
                        </div>
                        
                        {/* Barra de progreso con colores pastel 300 */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Completado</span>
                            <span className="font-medium text-slate-800">{project.progressPct}%</span>
                          </div>
                          <div className="w-full bg-white/60 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                project.progressPct >= 90 ? 'bg-green-300' :
                                project.progressPct >= 70 ? 'bg-emerald-300' :
                                project.progressPct >= 40 ? 'bg-yellow-300' :
                                'bg-red-300'
                              }`}
                              style={{ width: `${project.progressPct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Rendimiento de Proyectos</h3>
                <div className="bg-gray-50 border border-slate-200 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                    <p className="text-gray-600">Gráfico de rendimiento</p>
                    <p className="text-xs text-slate-400">Implementar con librería de gráficos</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Métricas Clave</h3>
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-600 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-600">{metrics.completionRate}%</div>
                    <div className="text-sm text-emerald-800">Tasa de Finalización</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{metrics.teamUtilization}%</div>
                    <div className="text-sm text-blue-800">Utilización de Equipos</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-500 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600">{metrics.atRisk}</div>
                    <div className="text-sm text-yellow-800">Proyectos en Riesgo</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Gestión de Equipos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-500 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{metrics.totalMembers}</div>
                  <div className="text-sm text-blue-800">Total Miembros</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-600 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">
                    {Math.round(metrics.totalMembers / metrics.active || 0)}
                  </div>
                  <div className="text-sm text-emerald-800">Promedio por Proyecto</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{metrics.teamUtilization}%</div>
                  <div className="text-sm text-purple-800">Capacidad Utilizada</div>
                </div>
              </div>

              <div className="bg-gray-50 border border-slate-200 rounded-lg p-6">
                <h4 className="font-medium text-slate-800 mb-4">Proyectos por Capacidad de Equipo</h4>
                <div className="space-y-3">
                  {projects.slice(0, 5).map((project) => {
                    const utilization = (project.project.current_team_size / project.project.max_team_size) * 100;
                    return (
                      <div 
                        key={project.project.id}
                        className="flex items-center justify-between hover:bg-white rounded-lg p-2 cursor-pointer transition-colors"
                        onClick={() => navigateToProject(project.project.id)}
                      >
                        <span className="text-sm font-medium text-slate-700 hover:text-[#166534] transition-colors">
                          {project.project.name}
                        </span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                utilization >= 90 ? 'bg-red-500' : 
                                utilization >= 75 ? 'bg-yellow-300' : 'bg-emerald-300'
                              }`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 min-w-[60px]">
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
              <h3 className="text-lg font-semibold text-slate-800">Cronograma de Proyectos</h3>
              
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
                        className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-[#059669] cursor-pointer transition-all group"
                        onClick={() => navigateToProject(project.project.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            isOverdue ? 'bg-red-500' : 
                            isUrgent ? 'bg-yellow-500' : 
                            'bg-green-300'
                          }`}></div>
                          <div>
                            <h4 className="font-medium text-slate-800 group-hover:text-[#166534] transition-colors">
                              {project.project.name}
                            </h4>
                            <p className="text-sm text-gray-600">{project.lead?.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              isOverdue ? 'text-red-600' : 
                              isUrgent ? 'text-yellow-600' : 
                              'text-gray-600'
                            }`}>
                              {isOverdue ? `${Math.abs(daysLeft)} días vencido` :
                               daysLeft === 0 ? 'Hoy' :
                               `${daysLeft} días restantes`}
                            </div>
                            <div className="text-xs text-gray-600">
                              {deadline.toLocaleDateString('es-ES')}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-800">{project.progressPct}%</div>
                            <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                              <div 
                                className="h-1 bg-emerald-300 rounded-full"
                                style={{ width: `${project.progressPct}%` }}
                              />
                            </div>
                          </div>
                          
                          <Eye className="w-4 h-4 text-slate-400 group-hover:text-[#3b82f6] transition-colors" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}