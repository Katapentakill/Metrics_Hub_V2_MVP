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
        // Verificar sesión
        const sessionData = getAuthSession();
        if (!sessionData || sessionData.role !== role) {
          return;
        }
        setSession(sessionData);

        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Cargar datos según el rol
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
    // Mantener la carga con ancho máximo y padding para centrar
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

  if (!data || !session) {
    // Eliminar el estilo fijo para que ocupe todo el ancho disponible
    return (
      <div className="py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Acceso no autorizado</h2>
          <p className="text-slate-600">No tienes permisos para acceder a este dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    // Aplicar las clases 'max-w-7xl mx-auto px-6' para replicar el ancho de carga 
    // y darle un contenedor claro, similar a como se manejaría el padre del ProjectsDashboard.
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center"><BarChart3 className="w-8 h-8 mr-3 text-emerald-600" />{config.title}</h1>
          <p className="text-muted mt-1">{config.subtitle}</p>
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

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.metrics.map((metric, index) => (
          <div key={index} className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">{metric.label}</p>
                <p className="text-3xl font-bold text-slate-800">
                  {metric.getValue(data)}
                </p>
                {metric.getSubtitle && (
                  <p className={`text-sm font-medium ${metric.subtitleColor || 'text-slate-500'}`}>
                    {metric.getSubtitle(data)}
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Componentes principales del dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Componente principal (2 columnas) */}
        <div className="lg:col-span-2">
          {config.mainComponent && (
            <config.mainComponent data={data} />
          )}
        </div>
        
        {/* Componente secundario (1 columna) */}
        <div>
          {config.secondaryComponent && (
            <config.secondaryComponent data={data} />
          )}
        </div>
      </div>

      {/* Componentes de la segunda fila */}
      {config.bottomComponents && config.bottomComponents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {config.bottomComponents.map((Component: any, index: number) => (
            <Component key={index} data={data} />
          ))}
        </div>
      )}

      {/* Alertas específicas del rol */}
      {config.alerts && (
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-slate-800">{config.alerts.title}</h3>
          </div>
          <div className="space-y-3">
            {config.alerts.items.map((alert, index) => (
              <div key={index} className={`flex items-center justify-between p-3 ${alert.bgColor} rounded-lg border-l-4 ${alert.borderColor}`}>
                <div>
                  <p className={`text-sm font-medium ${alert.textColor}`}>
                    {alert.getMessage(data)}
                  </p>
                  <p className={`text-xs ${alert.subtitleColor}`}>
                    {alert.getSubtitle(data)}
                  </p>
                </div>
                {alert.action ? (
                  <button className="btn-secondary px-3 py-1 text-xs">
                    {alert.action}
                  </button>
                ) : (
                  <Award className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acciones rápidas específicas del rol */}
      {(config as any).quickActions && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{(config as any).quickActions.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(config as any).quickActions.actions.map((action: any, index: number) => (
              <button key={index} className={`p-4 ${action.bgColor} hover:${action.hoverColor} rounded-lg transition-colors text-center hover-lift`}>
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="text-sm font-medium text-slate-800">{action.title}</p>
                <p className="text-xs text-slate-500">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}