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
    return (
      <div className="max-w-7xl mx-auto space-y-6">
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
    );
  }

  if (!data || !session) {
    return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Acceso no autorizado</h2>
          <p className="text-slate-600">No tienes permisos para acceder a este dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-emerald-600" />
            {config.title}
          </h1>
          <p className="text-gray-600 mt-1">{config.subtitle}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-1 text-slate-400" />
            Última actualización: {new Date().toLocaleString('es-ES')}
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
            <Activity className="w-4 h-4" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Métricas principales - KPI Cards mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.metrics.map((metric, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group"
          >
            {/* Efecto de fondo gradiente sutil */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {metric.label}
                </p>
                <p className="text-3xl font-bold text-slate-800 mb-1">
                  {metric.getValue(data)}
                </p>
                {metric.getSubtitle && (
                  <p className={`text-sm font-medium ${metric.subtitleColor || 'text-gray-600'}`}>
                    {metric.getSubtitle(data)}
                  </p>
                )}
              </div>
              
              {/* Icono con efecto hover */}
              <div className={`w-14 h-14 ${metric.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Barra de progreso inferior opcional */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000 ease-out"
                style={{ width: '0%' }}
              ></div>
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

      {/* Alertas específicas del rol - PALETA EMERALD */}
      {config.alerts && (
        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-emerald-600" />
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
                  <button className="px-3 py-1 text-xs border border-slate-200 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors">
                    {alert.action}
                  </button>
                ) : (
                  <Award className="w-5 h-5 text-emerald-600" />
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
              <button key={index} className={`p-4 ${action.bgColor} hover:${action.hoverColor} rounded-lg transition-all text-center hover:shadow-lg`}>
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="text-sm font-medium text-slate-800">{action.title}</p>
                <p className="text-xs text-gray-600">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}