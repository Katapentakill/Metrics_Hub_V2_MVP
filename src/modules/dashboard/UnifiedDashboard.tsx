// src/modules/dashboard/UnifiedDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarContext'; 
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
  const { isCollapsed: isSidebarCollapsed } = useSidebar();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  const config = dashboardConfig[role];

  // Padding dinámico basado en el estado del sidebar
//const containerPadding = isSidebarCollapsed ? 'pl-4 lg:pl-20' : 'pl-4 lg:pl-64';
const containerPadding = isSidebarCollapsed 
  ? 'px-4 sm:px-6 lg:pl-24 lg:pr-8'  // Colapsado: responsive como max-w-7xl
  : 'pl-72 pr-4 lg:pr-8';             // Expandido: compensar sidebar

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Verificar sesión
        const sessionData = getAuthSession();
        console.log('sessionData:', sessionData);
        if (!sessionData || sessionData.role !== role) {
          return;
        }
        setSession(sessionData);

        console.log('role:', role);
        console.log('dashboardConfig[role]:', dashboardConfig[role]);

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
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pr-6 transition-all duration-300`}>
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="h-6 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || !session) {
    return (
      <div className={`max-w-7xl mx-auto py-8 pr-6 transition-all duration-300`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Acceso no autorizado</h2>
          <p className="text-gray-600">No tienes permisos para acceder a este dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pr-6 transition-all duration-300`}>
      {/* Header - Icono con green-800 (#166534) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <BarChart3 className="w-10 h-10 text-emerald-600" />
            {config.title}
          </h1>
          <p className="text-gray-600 mt-1">{config.subtitle}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-1 text-slate-400" />
            Última actualización: {new Date().toLocaleString('es-ES')}
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-gray-600 hover:text-slate-800 hover:bg-gray-50 transition-colors shadow-sm">
            <Activity className="w-4 h-4" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Métricas principales - KPI Cards con paleta institucional */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.metrics.map((metric, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-[#059669] transition-all duration-300 group"
          >
            {/* Efecto de fondo gradiente sutil con emerald */}
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
              
              {/* Icono con fondo de escala de verdes y color blanco */}
              <div className={`w-14 h-14 ${metric.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Barra de progreso inferior con emerald */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
              <div 
                className="h-full bg-gradient-to-r from-[#059669] to-[#15803d] transition-all duration-1000 ease-out"
                style={{ width: '75%' }}
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

      {/* Alertas específicas del rol - Paleta institucional */}
      {config.alerts && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-[#059669]" />
            <h3 className="text-lg font-semibold text-slate-800">{config.alerts.title}</h3>
          </div>
          <div className="space-y-3">
            {config.alerts.items.map((alert, index) => (
              <div key={index} className={`flex items-center justify-between p-4 ${alert.bgColor} rounded-lg border-l-4 ${alert.borderColor}`}>
                <div>
                  <p className={`text-sm font-medium ${alert.textColor}`}>
                    {alert.getMessage(data)}
                  </p>
                  <p className={`text-xs mt-1 ${alert.subtitleColor}`}>
                    {alert.getSubtitle(data)}
                  </p>
                </div>
                {alert.action ? (
                  <button className="px-3 py-1 text-xs bg-white border border-slate-200 rounded-lg text-gray-600 hover:text-slate-800 hover:bg-gray-50 transition-colors shadow-sm">
                    {alert.action}
                  </button>
                ) : (
                  <Award className="w-5 h-5 text-[#059669]" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Acciones rápidas específicas del rol */}
      {(config as any).quickActions && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{(config as any).quickActions.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(config as any).quickActions.actions.map((action: any, index: number) => (
              <button key={index} className={`p-4 ${action.bgColor} hover:${action.hoverColor} border border-slate-200 rounded-lg transition-all text-center hover:shadow-md`}>
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="text-sm font-medium text-slate-800">{action.title}</p>
                <p className="text-xs text-gray-600 mt-1">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}