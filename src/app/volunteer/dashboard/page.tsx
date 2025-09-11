'use client';

import { useEffect, useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  FolderOpen, 
  Target,
  TrendingUp, 
  Calendar,
  Award,
  Activity,
  Star,
  Users,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import PersonalStats from '@/modules/dashboard/volunteer/PersonalStats';
import MyTasks from '@/modules/dashboard/volunteer/MyTasks';
import MyProjects from '@/modules/dashboard/volunteer/MyProjects';
import UpcomingActivities from '@/modules/dashboard/volunteer/UpcomingActivities';

/**
 * Representa las métricas principales que se muestran
 * en el **dashboard del Voluntario**.
 */
interface VolunteerDashboardData {
  /** Número de tareas completadas por el voluntario. */
  tasksCompleted: number;
  /** Total de tareas asignadas al voluntario. */
  totalTasks: number;
  /** Cantidad de proyectos en los que participa actualmente. */
  activeProjects: number;
  /** Total de horas de voluntariado acumuladas. */
  totalVolunteerHours: number;
  /** Horas de voluntariado realizadas en el mes en curso. */
  thisMonthHours: number;
  /** Próximo deadline asignado al voluntario. */
  nextDeadline: string;
  /** Número de logros obtenidos. */
  achievements: number;
  /** Meta semanal de horas establecida. */
  weeklyGoal: number;
  /** Horas de voluntariado registradas en la semana actual. */
  weeklyProgress: number;
}


/**
 * Página principal del **Dashboard del Voluntario**.
 *
 * - Simula la carga de datos personales del voluntario.
 * - Muestra métricas de progreso, proyectos activos, horas registradas y próximos deadlines.
 * - Incluye componentes secundarios como estadísticas personales, tareas, proyectos y actividades próximas.
 *
 * @returns Vista interactiva del panel de control para voluntarios.
 */
export default function VolunteerDashboard() {
  const [data, setData] = useState<VolunteerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de datos personalizados para el voluntario
    const loadDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData({
        tasksCompleted: 23,
        totalTasks: 31,
        activeProjects: 3,
        totalVolunteerHours: 87,
        thisMonthHours: 12,
        nextDeadline: 'Mañana, 10:00 AM',
        achievements: 5,
        weeklyGoal: 8,
        weeklyProgress: 6
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

  const completionPercentage = Math.round(((data?.tasksCompleted || 0) / (data?.totalTasks || 1)) * 100);
  const weeklyPercentage = Math.round(((data?.weeklyProgress || 0) / (data?.weeklyGoal || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Personal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Mi Panel de Voluntario</h1>
          <p className="text-muted mt-1">¡Hola! Aquí tienes el resumen de tu actividad y próximas tareas</p>
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

      {/* Métricas personales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Tareas Completadas</p>
              <p className="text-3xl font-bold text-slate-800">{data?.tasksCompleted}</p>
              <p className="text-sm text-green-600 font-medium">
                {completionPercentage}% de progreso
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Proyectos Activos</p>
              <p className="text-3xl font-bold text-slate-800">{data?.activeProjects}</p>
              <p className="text-sm text-slate-500">
                En desarrollo
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Horas de Voluntariado</p>
              <p className="text-3xl font-bold text-slate-800">{data?.totalVolunteerHours}</p>
              <p className="text-sm text-purple-600 font-medium">
                +{data?.thisMonthHours} este mes
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Próximo Deadline</p>
              <p className="text-lg font-bold text-slate-800">{data?.nextDeadline}</p>
              <p className="text-sm text-yellow-600 font-medium">
                <AlertCircle className="w-3 h-3 inline mr-1" />
                Tarea pendiente
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Progreso semanal y logros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Progreso Semanal</h3>
            <div className="text-sm text-muted">{data?.weeklyProgress}/{data?.weeklyGoal} horas</div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-600">Meta Semanal</span>
              <span className="text-sm font-medium text-slate-800">{weeklyPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-living-green-500 to-living-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(weeklyPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            {weeklyPercentage >= 100 ? (
              <span className="text-green-600 font-medium">🎉 ¡Meta semanal completada!</span>
            ) : (
              <span>Te faltan {(data?.weeklyGoal || 0) - (data?.weeklyProgress || 0)} horas para completar tu meta</span>
            )}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-slate-800">Mis Logros</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Colaborador Estrella</p>
                  <p className="text-xs text-yellow-600">20+ tareas completadas</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-green-800">Trabajo en Equipo</p>
                  <p className="text-xs text-green-600">3 proyectos colaborativos</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-purple-800">Aprendizaje Continuo</p>
                  <p className="text-xs text-purple-600">5 cursos completados</p>
                </div>
              </div>
            </div>
            
            <div className="text-center pt-2">
              <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
                Ver todos los logros →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Secciones detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas personales */}
        <div className="lg:col-span-2">
          <PersonalStats data={data} />
        </div>
        
        {/* Próximas actividades */}
        <div>
          <UpcomingActivities />
        </div>
      </div>

      {/* Mis tareas y proyectos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyTasks />
        <MyProjects />
      </div>

      {/* Recordatorio motivacional */}
      <div className="card p-6 bg-gradient-to-r from-living-green-50 to-blue-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">¡Sigue así!</h3>
            <p className="text-sm text-slate-600">
              Tu dedicación está haciendo la diferencia. Has completado {data?.tasksCompleted} tareas y contribuido con {data?.totalVolunteerHours} horas de voluntariado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}