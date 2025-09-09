// src/modules/dashboard/lead/DashboardStats.tsx
'use client';

import { BarChart3, PieChart, TrendingUp, Users, Calendar, Target } from 'lucide-react';

interface LeadDashboardData {
  totalProjects: number;
  activeProjects: number;
  totalTeamMembers: number;
  activeTasks: number;
  completedTasks: number;
  overdueDeadlines: number;
  thisMonthDeliveries: number;
  teamPerformanceScore: number;
}

interface LeadDashboardStatsProps {
  data: LeadDashboardData | null;
}

export default function DashboardStats({ data }: LeadDashboardStatsProps) {
  if (!data) return null;

  // Datos específicos para Lead Project
  const projectsByStatus = [
    { status: 'Activos', count: 4, color: 'bg-green-500' },
    { status: 'En Planificación', count: 2, color: 'bg-blue-500' },
    { status: 'En Revisión', count: 1, color: 'bg-yellow-500' },
    { status: 'Pausados', count: 1, color: 'bg-gray-500' }
  ];

  const teamProductivity = [
    { team: 'EcoVerde', members: 5, completion: 87, color: 'bg-green-500' },
    { team: 'TechEdu', members: 4, completion: 73, color: 'bg-blue-500' },
    { team: 'HealthConnect', members: 6, completion: 91, color: 'bg-purple-500' },
    { team: 'CommunityAid', members: 3, completion: 65, color: 'bg-orange-500' }
  ];

  const weeklyProgress = [
    { week: 'Sem 1', tasks: 12, completed: 10 },
    { week: 'Sem 2', tasks: 15, completed: 13 },
    { week: 'Sem 3', tasks: 18, completed: 16 },
    { week: 'Sem 4', tasks: 14, completed: 12 },
    { week: 'Actual', tasks: 16, completed: 8 }
  ];

  const priorityTasks = [
    { priority: 'Alta', count: 8, color: 'bg-red-500' },
    { priority: 'Media', count: 15, color: 'bg-yellow-500' },
    { priority: 'Baja', count: 12, color: 'bg-green-500' }
  ];

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
          Métricas de Proyectos
        </h3>
        <div className="flex items-center space-x-2 text-xs text-muted">
          <Calendar className="w-4 h-4" />
          <span>Actualizado en tiempo real</span>
        </div>
      </div>

      {/* Estado de proyectos */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <Target className="w-4 h-4 mr-2" />
          Estado de Mis Proyectos
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {projectsByStatus.map((project) => (
            <div key={project.status} className="text-center p-3 bg-slate-50 rounded-lg">
              <div className={`w-10 h-10 ${project.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
                {project.count}
              </div>
              <p className="text-xs text-slate-600 font-medium">{project.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Productividad por equipo */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Productividad por Equipo
        </h4>
        <div className="space-y-3">
          {teamProductivity.map((team) => (
            <div key={team.team} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${team.color} rounded-full`}></div>
                <div>
                  <span className="text-sm font-medium text-slate-700">{team.team}</span>
                  <span className="text-xs text-slate-500 ml-2">({team.members} miembros)</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-20 bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 ${team.color} rounded-full transition-all duration-500`}
                    style={{ width: `${team.completion}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-800 w-10 text-right">{team.completion}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progreso semanal */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Progreso de las Últimas 5 Semanas
        </h4>
        <div className="space-y-3">
          {/* Tareas asignadas vs completadas */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-600">Tareas Completadas</span>
              <span className="text-xs text-green-600">Promedio: 85% completación</span>
            </div>
            <div className="flex items-end space-x-2 h-16">
              {weeklyProgress.map((week) => (
                <div key={week.week} className="flex-1 flex flex-col items-center space-y-1">
                  {/* Barra de tareas completadas */}
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-slate-200 rounded-t"
                      style={{ height: `${(week.tasks / 18) * 100 * 0.6}px` }}
                    ></div>
                    <div 
                      className="w-full bg-green-500 rounded-t absolute bottom-0 transition-all duration-500 hover:bg-green-600"
                      style={{ height: `${(week.completed / 18) * 100 * 0.6}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500">{week.week}</span>
                  <span className="text-xs text-green-600 font-medium">{week.completed}/{week.tasks}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Distribución de tareas por prioridad */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <PieChart className="w-4 h-4 mr-2" />
          Tareas por Prioridad
        </h4>
        <div className="flex justify-center space-x-4">
          {priorityTasks.map((task) => (
            <div key={task.priority} className="text-center">
              <div className={`w-12 h-12 ${task.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm`}>
                {task.count}
              </div>
              <p className="text-xs text-slate-600">{task.priority}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de rendimiento */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {Math.round((data.completedTasks / data.activeTasks) * 100)}%
          </p>
          <p className="text-xs text-slate-600">Tasa de Completación</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data.teamPerformanceScore}
          </p>
          <p className="text-xs text-slate-600">Score del Equipo</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">
            {data.thisMonthDeliveries}
          </p>
          <p className="text-xs text-slate-600">Entregas este Mes</p>
        </div>
      </div>
    </div>
  );
}