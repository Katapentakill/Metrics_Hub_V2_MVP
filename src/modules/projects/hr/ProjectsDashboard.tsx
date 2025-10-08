// UBICACIÓN: src/modules/projects/hr/ProjectsDashboard.tsx
// FIX: Línea 130 - Agregar onChange al select

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
  ArrowRight
} from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ProjectsDashboardProps {
  projects: ProjectView[];
  timeframe?: '7d' | '30d' | '90d' | '1y';
}

export default function ProjectsDashboard({ 
  projects, 
  timeframe: initialTimeframe = '30d' 
}: ProjectsDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'team' | 'timeline'>('overview');
  
  // ✅ FIX: Agregar estado para timeframe
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>(initialTimeframe);

  // Calcular métricas principales
  const metrics = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.project.status === 'active').length;
    const completed = projects.filter(p => p.project.status === 'completed').length;
    const planning = projects.filter(p => p.project.status === 'planning').length;
    const paused = projects.filter(p => p.project.status === 'paused').length;
    
    const totalMembers = projects.reduce((acc, p) => acc + (p.members?.length || 0), 0);
    const avgProgress = Math.round(projects.reduce((acc, p) => acc + p.progressPct, 0) / total || 0);
    
    // Calcular proyectos en riesgo
    const atRisk = projects.filter(p => {
      if (!p.project.deadline) return false;
      const daysUntilDeadline = Math.ceil(
        (new Date(p.project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return (daysUntilDeadline <= 14 && p.progressPct < 80) || daysUntilDeadline < 0;
    }).length;

    // Calcular utilización de equipos
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

  // Datos para gráficos
  const statusDistribution = [
    { name: 'Activos', value: metrics.active, color: 'bg-emerald-500', textColor: 'text-emerald-600' },
    { name: 'Completados', value: metrics.completed, color: 'bg-green-500', textColor: 'text-green-600' },
    { name: 'Planificación', value: metrics.planning, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { name: 'Pausados', value: metrics.paused, color: 'bg-yellow-500', textColor: 'text-yellow-600' }
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
    const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <div className="flex items-center mt-2 text-sm">
              <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
              <span className={trendColor}>{change}</span>
              <span className="text-gray-500 ml-1">vs período anterior</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>
    );
  };

  const navigateToProject = (projectId: string) => {
    router.push(`/hr/projects/${projectId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Proyectos</h2>
          <p className="text-gray-600">Resumen y métricas de rendimiento</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* ✅ FIX: Agregar onChange handler */}
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as '7d' | '30d' | '90d' | '1y')}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
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
        {getMetricCard("Total Proyectos", metrics.total, "+12%", Target, 'up')}
        {getMetricCard("Proyectos Activos", metrics.active, "+8%", CheckCircle2, 'up')}
        {getMetricCard("Progreso Promedio", `${metrics.avgProgress}%`, "+5%", BarChart3, 'up')}
        {getMetricCard("En Riesgo", metrics.atRisk, "-3%", AlertTriangle, 'down')}
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
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

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Distribución por estado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Distribución por Estado</h3>
                  <div className="space-y-3">
                    {statusDistribution.map((status) => (
                      <div key={status.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                          <span className="text-sm font-medium text-gray-700">{status.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold ${status.textColor}`}>
                            {status.value}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({Math.round((status.value / metrics.total) * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distribución por progreso */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Distribución por Progreso</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-gray-700">Bajo (&lt;25%)</span>
                      </div>
                      <span className="text-sm font-semibold text-red-600">{progressRanges.low}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm font-medium text-gray-700">Medio (25-75%)</span>
                      </div>
                      <span className="text-sm font-semibold text-yellow-600">{progressRanges.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-gray-700">Alto (&gt;75%)</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{progressRanges.high}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de proyectos destacados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Proyectos Destacados</h3>
                  <button 
                    onClick={() => router.push('/hr/projects')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Ver todos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.slice(0, 4).map((project) => (
                    <div 
                      key={project.project.id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      onClick={() => navigateToProject(project.project.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {project.project.name}
                        </h4>
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{project.project.current_team_size}/{project.project.max_team_size}</span>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          project.project.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                          project.project.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.project.status === 'active' ? 'Activo' : 
                           project.project.status === 'planning' ? 'Planificación' : 
                           project.project.status}
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                          style={{ width: `${project.progressPct}%` }}
                        />
                      </div>
                      <div className="text-right text-xs text-gray-500 mt-1">
                        {project.progressPct}% completado
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resto de tabs... (performance, team, timeline) */}
          {activeTab === 'performance' && (
            <div className="text-center py-12 text-gray-500">
              Contenido de rendimiento...
            </div>
          )}
          
          {activeTab === 'team' && (
            <div className="text-center py-12 text-gray-500">
              Contenido de equipos...
            </div>
          )}
          
          {activeTab === 'timeline' && (
            <div className="text-center py-12 text-gray-500">
              Contenido de cronograma...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}