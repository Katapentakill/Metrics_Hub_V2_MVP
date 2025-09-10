// src/modules/dashboard/volunteer/PersonalStats.tsx
'use client';

import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';

interface PersonalStatsProps {
  data: {
    tasksCompleted?: number;
    totalTasks?: number;
    activeProjects?: number;
    totalVolunteerHours?: number;
    thisMonthHours?: number;
    weeklyGoal?: number;
    weeklyProgress?: number;
  } | null;
}

export default function PersonalStats({ data }: PersonalStatsProps) {
  // Datos ficticios para el gráfico de progreso mensual
  const monthlyProgress = [
    { month: 'Ene', hours: 8, tasks: 5 },
    { month: 'Feb', hours: 12, tasks: 7 },
    { month: 'Mar', hours: 15, tasks: 9 },
    { month: 'Abr', hours: 10, tasks: 6 },
    { month: 'May', hours: 18, tasks: 11 },
    { month: 'Jun', hours: 12, tasks: 8 },
  ];

  const maxHours = Math.max(...monthlyProgress.map(m => m.hours));

  return (
    <div className="card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-5 h-5 text-living-green-600" />
        <h3 className="text-lg font-semibold text-slate-800">Mi Rendimiento</h3>
      </div>

      {/* Gráfico de progreso mensual */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-600 mb-4">Horas de Voluntariado - Últimos 6 Meses</h4>
        <div className="flex items-end justify-between space-x-2 h-32">
          {monthlyProgress.map((month, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full bg-gray-200 rounded-t-md">
                <div 
                  className="bg-gradient-to-t from-living-green-500 to-living-green-400 rounded-t-md transition-all duration-300"
                  style={{ 
                    height: `${(month.hours / maxHours) * 100}px`,
                    minHeight: '4px'
                  }}
                ></div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600">
                  {month.hours}h
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-2">{month.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Promedio Semanal</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">
            {data ? Math.round((data.totalVolunteerHours || 0) / 12) : 0}h
          </div>
          <div className="text-xs text-blue-600">
            Últimas 12 semanas
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Eficiencia</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            {data ? Math.round(((data.tasksCompleted || 0) / (data.totalTasks || 1)) * 100) : 0}%
          </div>
          <div className="text-xs text-green-600">
            Tareas completadas
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Crecimiento</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            +{data?.thisMonthHours || 0}h
          </div>
          <div className="text-xs text-purple-600">
            vs. mes anterior
          </div>
        </div>
      </div>

      {/* Objetivos personales */}
      <div className="mt-6 p-4 bg-gradient-to-r from-living-green-50 to-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Mis Objetivos Este Mes</h4>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Completar 15 tareas</span>
            <span className="text-sm font-medium text-living-green-600">
              {data?.tasksCompleted || 0}/15
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-living-green-500 to-living-green-600 h-2 rounded-full"
              style={{ width: `${Math.min(((data?.tasksCompleted || 0) / 15) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}