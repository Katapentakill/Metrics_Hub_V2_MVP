// src/modules/dashboard/admin/DashboardStats.tsx
'use client';

import { BarChart3, PieChart, TrendingUp, Users, Calendar } from 'lucide-react';
import { mockAdminChartData } from '@/lib/data/dashboard';

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

  // Usar datos centralizados para gráficos
  const { usersByRole, projectStatus, monthlyActivity } = mockAdminChartData;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-[#166534]" />
          Estadísticas Detalladas
        </h3>
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Datos en tiempo real</span>
        </div>
      </div>

      {/* Distribución de usuarios por rol */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <Users className="w-4 h-4 mr-2 text-slate-400" />
          Distribución de Usuarios por Rol
        </h4>
        <div className="space-y-3">
          {usersByRole.map((item) => (
            <div key={item.role} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <span className="text-sm text-gray-600">{item.role}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-100 rounded-full h-2">
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
          <PieChart className="w-4 h-4 mr-2 text-slate-400" />
          Estado de Proyectos
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {projectStatus.map((item) => (
            <div key={item.status} className="text-center p-3 bg-gray-50 border border-slate-200 rounded-lg hover:bg-gray-100 hover:border-[#059669] transition-all">
              <div className={`w-8 h-8 ${item.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold text-sm`}>
                {item.count}
              </div>
              <p className="text-xs text-gray-600">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actividad mensual */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-slate-400" />
          Actividad de los Últimos 5 Meses
        </h4>
        <div className="space-y-4">
          {/* Registros mensuales */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600">Nuevos Registros</span>
              <span className="text-xs font-medium text-emerald-600">Promedio: 10/mes</span>
            </div>
            <div className="flex items-end space-x-2 h-16">
              {monthlyActivity.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-emerald-300 rounded-t transition-all duration-500 hover:bg-emerald-400"
                    style={{ height: `${(month.registrations / 15) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos mensuales */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600">Nuevos Proyectos</span>
              <span className="text-xs font-medium text-emerald-600">Total: 8 proyectos</span>
            </div>
            <div className="flex items-end space-x-2 h-12">
              {monthlyActivity.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-teal-300 rounded-t transition-all duration-500 hover:bg-teal-400"
                    style={{ height: `${month.projects === 0 ? 5 : (month.projects / 3) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-1">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}