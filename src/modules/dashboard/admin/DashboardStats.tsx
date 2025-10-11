'use client';

import { BarChart3, PieChart, TrendingUp, Users, Calendar } from 'lucide-react';
import { mockAdminChartData } from '@/lib/data/dashboard';
import '../../../styles/dashboard-admin.css';

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

  const { usersByRole, projectStatus, monthlyActivity } = mockAdminChartData;

  return (
    <div className="admin-stats-card">
      <div className="admin-stats-header">
        <h3 className="admin-stats-title">
          <BarChart3 className="admin-stats-title-icon" />
          Estadísticas Detalladas
        </h3>
        <div className="admin-stats-realtime">
          <Calendar className="admin-stats-realtime-icon" />
          <span>Datos en tiempo real</span>
        </div>
      </div>

      {/* Distribución de usuarios por rol */}
      <div className="admin-stats-section">
        <h4 className="admin-stats-subtitle">
          <Users className="admin-stats-subtitle-icon" />
          Distribución de Usuarios por Rol
        </h4>
        <div className="admin-users-list">
          {usersByRole.map((item) => (
            <div key={item.role} className="admin-user-row">
              <div className="admin-user-info">
                <div className={`admin-user-dot ${item.color}`}></div>
                <span className="admin-user-label">{item.role}</span>
              </div>
              <div className="admin-user-stats">
                <div className="admin-progress-bar">
                  <div 
                    className={`admin-progress-fill ${item.color}`}
                    style={{ width: `${(item.count / data.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <span className="admin-user-count">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estado de proyectos */}
      <div className="admin-stats-section">
        <h4 className="admin-stats-subtitle">
          <PieChart className="admin-stats-subtitle-icon" />
          Estado de Proyectos
        </h4>
        <div className="admin-projects-grid">
          {projectStatus.map((item) => (
            <div key={item.status} className="admin-project-card">
              <div className={`admin-project-badge ${item.color}`}>
                {item.count}
              </div>
              <p className="admin-project-label">{item.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actividad mensual */}
      <div className="admin-stats-section">
        <h4 className="admin-stats-subtitle">
          <TrendingUp className="admin-stats-subtitle-icon" />
          Actividad de los Últimos 5 Meses
        </h4>
        <div className="admin-activity-wrapper">
          {/* Registros mensuales */}
          <div className="admin-activity-chart">
            <div className="admin-activity-header">
              <span className="admin-activity-label">Nuevos Registros</span>
              <span className="admin-activity-average">Promedio: 10/mes</span>
            </div>
            <div className="admin-chart-bars">
              {monthlyActivity.map((month) => (
                <div key={month.month} className="admin-chart-item">
                  <div 
                    className="admin-chart-bar admin-bar-emerald"
                    style={{ height: `${(month.registrations / 15) * 100}%` }}
                  ></div>
                  <span className="admin-chart-month">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos mensuales */}
          <div className="admin-activity-chart">
            <div className="admin-activity-header">
              <span className="admin-activity-label">Nuevos Proyectos</span>
              <span className="admin-activity-average">Total: 8 proyectos</span>
            </div>
            <div className="admin-chart-bars admin-chart-bars-sm">
              {monthlyActivity.map((month) => (
                <div key={month.month} className="admin-chart-item">
                  <div 
                    className="admin-chart-bar admin-bar-emerald"
                    style={{ height: `${month.projects === 0 ? 5 : (month.projects / 3) * 100}%` }}
                  ></div>
                  <span className="admin-chart-month">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}