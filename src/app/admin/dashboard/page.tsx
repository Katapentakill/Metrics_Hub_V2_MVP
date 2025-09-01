// src/app/(admin)/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  FolderOpen, 
  CheckSquare, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Calendar
} from 'lucide-react';
import DashboardStats from '@/modules/dashboard/admin/DashboardStats';
import QuickActions from '@/modules/dashboard/admin/QuickActions';
import RecentActivity from '@/modules/dashboard/admin/RecentActivity';
import SystemHealth from '@/modules/dashboard/admin/SystemHealth';

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

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos (aquí irían las consultas reales a la DB)
    const loadDashboardData = async () => {
      // Simulación de datos basados en tu seeder
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        totalUsers: 30,
        activeUsers: 28,
        totalProjects: 8,
        activeProjects: 6,
        totalTasks: 100,
        completedTasks: 67,
        pendingApplications: 12,
        thisMonthRegistrations: 6
      });
      
      setIsLoading(false);
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
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Administrativo</h1>
          <p className="text-muted mt-1">Resumen general del sistema Living Stones</p>
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
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Usuarios</p>
              <p className="text-3xl font-bold text-slate-800">{data?.totalUsers}</p>
              <p className="text-sm text-green-600 font-medium">
                +{data?.thisMonthRegistrations} este mes
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
              <p className="text-sm font-medium text-muted">Proyectos Activos</p>
              <p className="text-3xl font-bold text-slate-800">{data?.activeProjects}</p>
              <p className="text-sm text-slate-500">
                de {data?.totalProjects} total
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Tareas Completadas</p>
              <p className="text-3xl font-bold text-slate-800">{data?.completedTasks}</p>
              <p className="text-sm text-green-600 font-medium">
                {Math.round((data?.completedTasks || 0) / (data?.totalTasks || 1) * 100)}% de progreso
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Aplicaciones Pendientes</p>
              <p className="text-3xl font-bold text-slate-800">{data?.pendingApplications}</p>
              <p className="text-sm text-yellow-600 font-medium">
                <Clock className="w-3 h-3 inline mr-1" />
                Requieren revisión
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y datos detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas detalladas */}
        <div className="lg:col-span-2">
          <DashboardStats data={data} />
        </div>
        
        {/* Acciones rápidas */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Actividad reciente y salud del sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <SystemHealth />
      </div>

      {/* Alertas y notificaciones importantes */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-slate-800">Alertas del Sistema</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div>
              <p className="text-sm font-medium text-yellow-800">
                3 proyectos tienen tareas bloqueadas por más de 5 días
              </p>
              <p className="text-xs text-yellow-600">EcoVerde, TechEdu, HealthConnect</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Revisar
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div>
              <p className="text-sm font-medium text-blue-800">
                12 aplicaciones pendientes de revisión inicial
              </p>
              <p className="text-xs text-blue-600">Algunas llevan más de 3 días en espera</p>
            </div>
            <button className="btn-secondary px-3 py-1 text-xs">
              Ver Lista
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
            <div>
              <p className="text-sm font-medium text-green-800">
                Sistema funcionando correctamente
              </p>
              <p className="text-xs text-green-600">Todas las métricas dentro de rangos normales</p>
            </div>
            <Award className="w-5 h-5 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}