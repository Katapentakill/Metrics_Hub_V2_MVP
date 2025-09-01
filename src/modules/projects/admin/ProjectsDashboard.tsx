// Ubicación: src/features/admin/projects/components/ProjectsDashboard.tsx
// Este componente añade métricas y análisis visual al módulo de proyectos

import React, { useState, useMemo } from 'react';
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
  PieChart
} from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ProjectsDashboardProps {
  projects: ProjectView[];
  timeframe?: '7d' | '30d' | '90d' | '1y';
}

export default function ProjectsDashboard({ 
  projects, 
  timeframe = '30d' 
}: ProjectsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'team' | 'timeline'>('overview');

  // Calcular métricas principales
  const metrics = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(p => p.project.status === 'active').length;
    const completed = projects.filter(p => p.project.status === 'completed').length;
    const planning = projects.filter(p => p.project.status === 'planning').length;
    const paused = projects.filter(p => p.project.status === 'paused').length;
    
    const totalMembers = projects.reduce((acc, p) => acc + (p.members?.length || 0), 0);
    const avgProgress = Math.round(projects.reduce((acc, p) => acc + p.progressPct, 0) / total || 0);
    
    // Calcular proyectos en riesgo (deadline cercano o progreso bajo)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Proyectos</h2>
          <p className="text-gray-600">Resumen y métricas de rendimiento</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={timeframe} 
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
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Rendimiento de Proyectos</h3>
                <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Gráfico de rendimiento</p>
                    <p className="text-xs text-gray-400">Implementar con librería de gráficos</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Métricas Clave</h3>
                <div className="space-y-3">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-600">{metrics.completionRate}%</div>
                    <div className="text-sm text-emerald-700">Tasa de Finalización</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{metrics.teamUtilization}%</div>
                    <div className="text-sm text-blue-700">Utilización de Equipos</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">{metrics.atRisk}</div>
                    <div className="text-sm text-orange-700">Proyectos en Riesgo</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Gestión de Equipos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{metrics.totalMembers}</div>
                  <div className="text-sm text-blue-700">Total Miembros</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-emerald-600">
                    {Math.round(metrics.totalMembers / metrics.active || 0)}
                  </div>
                  <div className="text-sm text-emerald-700">Promedio por Proyecto</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{metrics.teamUtilization}%</div>
                  <div className="text-sm text-purple-700">Capacidad Utilizada</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-800 mb-4">Proyectos por Capacidad de Equipo</h4>
                <div className="space-y-3">
                  {projects.slice(0, 5).map((project) => {
                    const utilization = (project.project.current_team_size / project.project.max_team_size) * 100;
                    return (
                      <div key={project.project.id} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{project.project.name}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                utilization >= 90 ? 'bg-red-500' : 
                                utilization >= 75 ? 'bg-yellow-500' : 'bg-emerald-500'
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
              <h3 className="text-lg font-semibold text-gray-800">Cronograma de Proyectos</h3>
              
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
                      <div key={project.project.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            isOverdue ? 'bg-red-500' : 
                            isUrgent ? 'bg-orange-500' : 
                            'bg-green-500'
                          }`}></div>
                          <div>
                            <h4 className="font-medium text-gray-800">{project.project.name}</h4>
                            <p className="text-sm text-gray-600">{project.lead?.name}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            isOverdue ? 'text-red-600' : 
                            isUrgent ? 'text-orange-600' : 
                            'text-gray-600'
                          }`}>
                            {isOverdue ? `${Math.abs(daysLeft)} días vencido` :
                             daysLeft === 0 ? 'Hoy' :
                             `${daysLeft} días restantes`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {deadline.toLocaleDateString('es-ES')}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-800">{project.progressPct}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className="h-1 bg-emerald-500 rounded-full"
                              style={{ width: `${project.progressPct}%` }}
                            />
                          </div>
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