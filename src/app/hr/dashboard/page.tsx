// app/hr/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Clock, 
  CheckCircle, 
  Calendar, 
  Activity,
  AlertTriangle,
  Award,
  Search,
  MessageSquare
} from 'lucide-react';
import DashboardStatsHR from '@/modules/dashboard/hr/DashboardStatsHR';
import ApplicationsPending from '@/modules/dashboard/hr/ApplicationsPending';
import RecruitmentPipeline from '@/modules/dashboard/hr/RecruitmentPipeline';
import RecentHires from '@/modules/dashboard/hr/RecentHires';

interface HRDashboardData {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  activeInterviews: number;
  scheduledInterviews: number;
  newHires: number;
  thisMonthApplications: number;
  conversionRate: number;
}

export default function HRDashboard() {
  const [dashboardData, setDashboardData] = useState<HRDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos (reemplazar con API real)
    const loadDashboardData = async () => {
      try {
        // Datos simulados para HR Dashboard
        const mockData: HRDashboardData = {
          totalApplications: 142,
          pendingApplications: 28,
          approvedApplications: 24,
          rejectedApplications: 18,
          activeInterviews: 12,
          scheduledInterviews: 15,
          newHires: 5,
          thisMonthApplications: 35,
          conversionRate: 17
        };

        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
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
          <h1 className="text-3xl font-bold text-slate-800">Dashboard de Recursos Humanos</h1>
          <p className="text-muted mt-1">Gestión integral del proceso de reclutamiento y talento</p>
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

      {/* Métricas principales de HR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Aplicaciones</p>
              <p className="text-3xl font-bold text-slate-800">{dashboardData?.totalApplications}</p>
              <p className="text-sm text-blue-600 font-medium">
                +{dashboardData?.thisMonthApplications} este mes
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
              <p className="text-sm font-medium text-muted">Pendientes Revisión</p>
              <p className="text-3xl font-bold text-slate-800">{dashboardData?.pendingApplications}</p>
              <p className="text-sm text-yellow-600 font-medium">
                <Clock className="w-3 h-3 inline mr-1" />
                Requieren atención
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Entrevistas Activas</p>
              <p className="text-3xl font-bold text-slate-800">{dashboardData?.activeInterviews}</p>
              <p className="text-sm text-purple-600 font-medium">
                {dashboardData?.scheduledInterviews} programadas
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Nuevas Contrataciones</p>
              <p className="text-3xl font-bold text-slate-800">{dashboardData?.newHires}</p>
              <p className="text-sm text-green-600 font-medium">
                {dashboardData?.conversionRate}% conversión
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y datos detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas detalladas de HR */}
        <div className="lg:col-span-2">
          <DashboardStatsHR data={dashboardData} />
        </div>
        
        {/* Aplicaciones pendientes */}
        <div>
          <ApplicationsPending />
        </div>
      </div>

      {/* Pipeline de reclutamiento y contrataciones recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecruitmentPipeline />
        <RecentHires />
      </div>

      {/* Alertas y notificaciones importantes para HR */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-slate-800">Alertas de Recursos Humanos</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
            <div>
              <p className="text-sm font-medium text-red-800">
                8 aplicaciones llevan más de 5 días sin revisión inicial
              </p>
              <p className="text-xs text-red-600">Algunas son candidatos de alta prioridad</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Revisar Urgentes
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div>
              <p className="text-sm font-medium text-yellow-800">
                3 entrevistas programadas para mañana necesitan confirmación
              </p>
              <p className="text-xs text-yellow-600">María González, Carlos Ruiz, Ana Martínez</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Confirmar
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div>
              <p className="text-sm font-medium text-blue-800">
                5 candidatos aprobados esperan proceso de onboarding
              </p>
              <p className="text-xs text-blue-600">Programar sesiones de integración</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Programar
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <div>
              <p className="text-sm font-medium text-green-800">
                Pipeline de reclutamiento funcionando óptimamente
              </p>
              <p className="text-xs text-green-600">Tasa de conversión del {dashboardData?.conversionRate}% supera objetivo del 15%</p>
            </div>
            <Award className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>

      {/* Acciones rápidas específicas de HR */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones Rápidas de HR</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium text-slate-800">Reporte de Reclutamiento</p>
            <p className="text-xs text-slate-500">Métricas del mes</p>
          </button>

          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">📞</div>
            <p className="text-sm font-medium text-slate-800">Programar Entrevistas</p>
            <p className="text-xs text-slate-500">Calendario disponible</p>
          </button>

          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">💌</div>
            <p className="text-sm font-medium text-slate-800">Enviar Invitaciones</p>
            <p className="text-xs text-slate-500">A candidatos seleccionados</p>
          </button>

          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-center hover-lift">
            <div className="text-2xl mb-2">⚙️</div>
            <p className="text-sm font-medium text-slate-800">Optimizar Pipeline</p>
            <p className="text-xs text-slate-500">Configurar proceso</p>
          </button>
        </div>
      </div>
    </div>
  );
}