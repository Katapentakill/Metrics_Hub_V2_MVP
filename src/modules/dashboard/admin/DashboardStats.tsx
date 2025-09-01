// src/features/admin/DashboardStats.tsx
'use client';

import { BarChart3, PieChart, TrendingUp, Users, Calendar } from 'lucide-react';

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingApplications: number;
  thisMonthRegistrations: number;
}

interface DashboardStatsProps {
  data: DashboardData | null;
}

export default function DashboardStats({ data }: DashboardStatsProps) {
  if (!data) return null;

  // Datos para gráficos simulados (actualizados para 30 usuarios)
  const usersByRole = [
    { role: 'Volunteers', count: 19, color: 'bg-blue-500' },
    { role: 'Lead Projects', count: 5, color: 'bg-emerald-500' },
    { role: 'HR', count: 4, color: 'bg-purple-500' },
    { role: 'Admins', count: 2, color: 'bg-red-500' }
  ];

  const projectStatus = [
    { status: 'Activos', count: 6, color: 'bg-green-500' },
    { status: 'En Planificación', count: 1, color: 'bg-yellow-500' },
    { status: 'Completados', count: 1, color: 'bg-gray-500' }
  ];

  const monthlyActivity = [
    { month: 'Oct', registrations: 5, projects: 2 },
    { month: 'Nov', registrations: 12, projects: 3 },
    { month: 'Dic', registrations: 8, projects: 1 },
    { month: 'Ene', registrations: 15, projects: 2 },
    { month: 'Feb', registrations: 10, projects: 0 }
  ];

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
          Estadísticas Detalladas
        </h3>
        <div className="flex items-center space-x-2 text-xs text-muted">
          <Calendar className="w-4 h-4" />
          <span>Datos en tiempo real</span>
        </div>
      </div>

      {/* Distribución de usuarios por rol */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Distribución de Usuarios por Rol
        </h4>
        <div className="space-y-3">
          {usersByRole.map((item) => (
            <div key={item.role} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <span className="text-sm text-slate-600">{item.role}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(item.count / data.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-slate-800 w-8 text-right">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estado de proyectos */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <PieChart className="w-4 h-4 mr-2" />
          Estado de Proyectos
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {projectStatus.map((item) => (
            <div key={item.status} className="text-center p-3 bg-slate-50 rounded-lg">
              <div className={`w-8 h-8 ${item.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold text-sm`}>
                {item.count}
              </div>
              <p className="text-xs text-slate-600">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actividad mensual */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Actividad de los Últimos 5 Meses
        </h4>
        <div className="space-y-4">
          {/* Registros mensuales */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-600">Nuevos Registros</span>
              <span className="text-xs text-blue-600">Promedio: 10/mes</span>
            </div>
            <div className="flex items-end space-x-2 h-16">
              {monthlyActivity.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
                    style={{ height: `${(month.registrations / 15) * 100}%` }}
                  ></div>
                  <span className="text-xs text-slate-500 mt-1">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos mensuales */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-600">Nuevos Proyectos</span>
              <span className="text-xs text-emerald-600">Total: 8 proyectos</span>
            </div>
            <div className="flex items-end space-x-2 h-12">
              {monthlyActivity.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-emerald-500 rounded-t transition-all duration-500 hover:bg-emerald-600"
                    style={{ height: `${month.projects === 0 ? 5 : (month.projects / 3) * 100}%` }}
                  ></div>
                  <span className="text-xs text-slate-500 mt-1">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Métricas de rendimiento */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">
            {Math.round((data.completedTasks / data.totalTasks) * 100)}%
          </p>
          <p className="text-xs text-slate-600">Tasa de Completación</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {Math.round((data.activeUsers / data.totalUsers) * 100)}%
          </p>
          <p className="text-xs text-slate-600">Usuarios Activos</p>
        </div>
      </div>
    </div>
  );
}