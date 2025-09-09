// src/app/lead_project/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  FolderOpen, 
  Users, 
  CheckSquare, 
  Clock, 
  Calendar, 
  Activity,
  AlertTriangle,
  Award,
  Target,
  TrendingUp,
  Zap,
  BarChart3
} from 'lucide-react';
// Import de componentes específicos del Lead Project (estos los crearías después)
// import ProjectsOverview from '@/modules/dashboard/lead/ProjectsOverview';
// import TeamAssignments from '@/modules/dashboard/lead/TeamAssignments';
// import UpcomingDeadlines from '@/modules/dashboard/lead/UpcomingDeadlines';
// import TeamPerformance from '@/modules/dashboard/lead/TeamPerformance';

interface LeadDashboardData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTeamMembers: number;
  activeTeamMembers: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  upcomingDeadlines: number;
  thisMonthCompletions: number;
  teamProductivity: number;
}

export default function LeadProjectDashboard() {
  const [data, setData] = useState<LeadDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos específicos para Lead Project
    const loadDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        totalProjects: 8,
        activeProjects: 6,
        completedProjects: 2,
        totalTeamMembers: 24,
        activeTeamMembers: 22,
        totalTasks: 150,
        completedTasks: 98,
        overdueTasks: 8,
        upcomingDeadlines: 12,
        thisMonthCompletions: 23,
        teamProductivity: 87
      });
      
      setIsLoading(false);
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="loading-skeleton h-8 w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-6">
                <div className="loading-skeleton h-6 w-20 mb-2"></div>
                <div className="loading-skeleton h-8 w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard de Líder de Proyecto</h1>
          <p className="text-muted mt-1">Administra tus proyectos, equipos y cronogramas</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-muted">
            <Calendar className="w-4 h-4 inline mr-1" />
            Última actualización: {new Date().toLocaleString('es-ES')}
          </div>
          <button className="btn-living-outline px-4 py-2 text-sm">
            <Activity className="w-4 h-4 mr-2" />
            Actualizar
          </button>
        </div>
      </div>

      {/* Métricas principales para Lead Project */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Proyectos Activos</p>
              <p className="text-3xl font-bold text-slate-800">{data?.activeProjects}</p>
              <p className="text-sm text-emerald-600 font-medium">
                de {data?.totalProjects} total
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Miembros del Equipo</p>
              <p className="text-3xl font-bold text-slate-800">{data?.activeTeamMembers}</p>
              <p className="text-sm text-blue-600 font-medium">
                {data?.teamProductivity}% productividad
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Tareas Completadas</p>
              <p className="text-3xl font-bold text-slate-800">{data?.completedTasks}</p>
              <p className="text-sm text-green-600 font-medium">
                {Math.round((data?.completedTasks || 0) / (data?.totalTasks || 1) * 100)}% progreso general
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Deadlines Próximos</p>
              <p className="text-3xl font-bold text-slate-800">{data?.upcomingDeadlines}</p>
              <p className="text-sm text-orange-600 font-medium">
                <Clock className="w-3 h-3 inline mr-1" />
                {data?.overdueTasks} atrasadas
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Componentes principales del dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vista general de proyectos */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
              Resumen de Proyectos
            </h3>
            
            {/* Placeholder para ProjectsOverview component */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-lg border">
                  <h4 className="font-semibold text-emerald-800">EcoVerde</h4>
                  <p className="text-sm text-emerald-600 mb-2">Proyecto ambiental</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Progreso: 85%</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Activo</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-2 mt-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <h4 className="font-semibold text-blue-800">TechEdu</h4>
                  <p className="text-sm text-blue-600 mb-2">Educación tecnológica</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Progreso: 60%</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Activo</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Asignaciones de equipo */}
        <div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Equipo Asignado
            </h3>
            
            {/* Placeholder para TeamAssignments component */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    MG
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">María González</p>
                    <p className="text-xs text-slate-500">Frontend Developer</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Activa</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    CR
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Carlos Ruiz</p>
                    <p className="text-xs text-slate-500">UX Designer</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Activo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deadlines y performance del equipo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            Próximos Deadlines
          </h3>
          
          {/* Placeholder para UpcomingDeadlines component */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div>
                <p className="text-sm font-medium text-red-800">Entrega MVP EcoVerde</p>
                <p className="text-xs text-red-600">Vence en 2 días</p>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Urgente</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div>
                <p className="text-sm font-medium text-yellow-800">Revisión TechEdu</p>
                <p className="text-xs text-yellow-600">Vence en 5 días</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Próximo</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Performance del Equipo
          </h3>
          
          {/* Placeholder para TeamPerformance component */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Productividad General</span>
              <span className="text-sm font-semibold text-slate-800">{data?.teamProductivity}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${data?.teamProductivity}%` }}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{data?.thisMonthCompletions}</p>
                <p className="text-xs text-slate-600">Tareas Este Mes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{data?.activeTeamMembers}</p>
                <p className="text-xs text-slate-600">Miembros Activos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas específicas para Lead Project */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-slate-800">Alertas de Proyecto</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
            <div>
              <p className="text-sm font-medium text-red-800">
                3 tareas críticas bloqueadas en EcoVerde
              </p>
              <p className="text-xs text-red-600">Requieren intervención inmediata del líder</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Resolver
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div>
              <p className="text-sm font-medium text-yellow-800">
                2 miembros del equipo reportan sobrecarga de trabajo
              </p>
              <p className="text-xs text-yellow-600">María González y Carlos Ruiz necesitan reasignación</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Revisar Carga
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div>
              <p className="text-sm font-medium text-blue-800">
                Nuevo voluntario asignado al equipo TechEdu
              </p>
              <p className="text-xs text-blue-600">Ana Martínez se incorporó como Project Manager</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Ver Perfil
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <div>
              <p className="text-sm font-medium text-green-800">
                Productividad del equipo supera objetivos
              </p>
              <p className="text-xs text-green-600">{data?.teamProductivity}% de eficiencia, meta era 80%</p>
            </div>
            <Award className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>

      {/* Acciones rápidas para Lead Project */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones Rápidas de Proyecto</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">📋</div>
            <p className="text-sm font-medium text-slate-800">Crear Nueva Tarea</p>
            <p className="text-xs text-slate-500">Asignar al equipo</p>
          </button>

          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">👥</div>
            <p className="text-sm font-medium text-slate-800">Gestionar Equipo</p>
            <p className="text-xs text-slate-500">Asignaciones y roles</p>
          </button>

          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium text-slate-800">Reporte de Progreso</p>
            <p className="text-xs text-slate-500">Métricas del proyecto</p>
          </button>

          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">⏰</div>
            <p className="text-sm font-medium text-slate-800">Cronograma</p>
            <p className="text-xs text-slate-500">Deadlines y fechas</p>
          </button>
        </div>
      </div>
    </div>
  );
}