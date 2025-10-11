// src/modules/dashboard/UnifiedDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  Calendar, 
  Activity,
  AlertTriangle,
  Award,
  BarChart3
} from 'lucide-react';
import { getAuthSession } from '@/lib/auth';
import { 
  mockAdminDashboardData, 
  mockHRDashboardData, 
  mockLeadDashboardData, 
  mockVolunteerDashboardData,
  mockVolunteerRecentActivity,
  mockVolunteerUpcomingTasks
} from '@/lib/data/dashboard';
import { dashboardConfig } from './config/dashboardConfig';
import '@/styles/dashboard.css';

interface UnifiedDashboardProps {
  role: 'admin' | 'hr' | 'lead' | 'volunteer';
}

export default function UnifiedDashboard({ role }: UnifiedDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  const config = dashboardConfig[role];

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const sessionData = getAuthSession();
        if (!sessionData || sessionData.role !== role) {
          return;
        }
        setSession(sessionData);

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        let dashboardData;
        switch (role) {
          case 'admin':
            dashboardData = mockAdminDashboardData;
            break;
          case 'hr':
            dashboardData = mockHRDashboardData;
            break;
          case 'lead':
            dashboardData = mockLeadDashboardData;
            break;
          case 'volunteer':
            dashboardData = {
              ...mockVolunteerDashboardData,
              recentActivities: mockVolunteerRecentActivity,
              upcomingTasks: mockVolunteerUpcomingTasks
            };
            break;
          default:
            dashboardData = null;
        }
        
        setData(dashboardData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [role]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-skeleton" style={{ height: '2rem', width: '16rem' }}></div>
        <div className="metrics-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card" style={{ padding: '1.5rem' }}>
              <div className="loading-skeleton" style={{ height: '1.5rem', width: '5rem', marginBottom: '0.5rem' }}></div>
              <div className="loading-skeleton" style={{ height: '2rem', width: '4rem' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || !session) {
    return (
      <div className="unauthorized-container">
        <div className="unauthorized-content">
          <h2 className="unauthorized-title">Acceso no autorizado</h2>
          <p className="unauthorized-message">No tienes permisos para acceder a este dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container dashboard-spacing">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            <BarChart3 className="dashboard-title-icon" />
            {config.title}
          </h1>
          <p className="dashboard-subtitle">{config.subtitle}</p>
        </div>
        <div className="dashboard-header-actions">
          <div className="dashboard-last-update">
            <Calendar className="dashboard-last-update-icon" />
            Última actualización: {new Date().toLocaleString('es-ES')}
          </div>
          <button className="dashboard-refresh-button">
            <Activity className="w-4 h-4" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Métricas principales - KPI Cards */}
      <div className="metrics-grid">
        {config.metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-card-bg-effect"></div>
            
            <div className="metric-card-content">
              <div className="metric-card-info">
                <p className="metric-card-label">
                  {metric.label}
                </p>
                <p className="metric-card-value">
                  {metric.getValue(data)}
                </p>
                {metric.getSubtitle && (
                  <p className={`metric-card-subtitle ${metric.subtitleColor || 'text-[#4b5563]'}`}>
                    {metric.getSubtitle(data)}
                  </p>
                )}
              </div>
              
              <div className="metric-card-icon-wrapper">
                <metric.icon className="metric-card-icon" />
              </div>
            </div>

            <div className="metric-card-progress">
              <div 
                className="metric-card-progress-bar"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Componentes principales del dashboard */}
      <div className="content-grid">
        <div className="content-main">
          {config.mainComponent && (
            <config.mainComponent data={data} />
          )}
        </div>
        
        <div className="content-secondary">
          {config.secondaryComponent && (
            <config.secondaryComponent data={data} />
          )}
        </div>
      </div>

      {/* Componentes de la segunda fila */}
      {config.bottomComponents && config.bottomComponents.length > 0 && (
        <div className="bottom-grid">
          {config.bottomComponents.map((Component: any, index: number) => (
            <Component key={index} data={data} />
          ))}
        </div>
      )}

      {/* Alertas específicas del rol */}
      {config.alerts && (
        <div className="alerts-container">
          <div className="alerts-header">
            <AlertTriangle className="alerts-header-icon" />
            <h3 className="alerts-title">{config.alerts.title}</h3>
          </div>
          <div className="alerts-list">
            {config.alerts.items.map((alert, index) => (
              <div 
                key={index} 
                className={`alert-item ${alert.bgColor} ${alert.borderColor}`}
              >
                <div className="alert-item-content">
                  <p className={`alert-item-message ${alert.textColor}`}>
                    {alert.getMessage(data)}
                  </p>
                  <p className={`alert-item-subtitle ${alert.subtitleColor}`}>
                    {alert.getSubtitle(data)}
                  </p>
                </div>
                {alert.action ? (
                  <button className="alert-action-button">
                    {alert.action}
                  </button>
                ) : (
                  <Award className="alert-icon" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acciones rápidas específicas del rol */}
      {(config as any).quickActions && (
        <div className="quick-actions-container">
          <h3 className="quick-actions-title">
            {(config as any).quickActions.title}
          </h3>
          <div className="quick-actions-grid">
            {(config as any).quickActions.actions.map((action: any, index: number) => (
              <button 
                key={index} 
                className="quick-action-button"
              >
                <div className="quick-action-icon">
                  {action.icon}
                </div>
                <p className="quick-action-title">{action.title}</p>
                <p className="quick-action-subtitle">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}