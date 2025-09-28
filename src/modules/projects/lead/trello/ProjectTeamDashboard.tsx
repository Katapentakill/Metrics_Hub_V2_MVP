// UBICACIÓN: src/modules/projects/admin/trello/ProjectTeamDashboard.tsx
// Dashboard de miembros del proyecto dentro del Kanban

'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Eye, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  Award,
  TrendingUp,
  Activity
} from 'lucide-react';
import type { ExtendedUserWithProfile, Task } from '@/lib/types';

interface ProjectTeamDashboardProps {
  projectMembers: ExtendedUserWithProfile[];
  tasks: Task[];
  projectLead?: ExtendedUserWithProfile;
}

interface MemberStats {
  user: ExtendedUserWithProfile;
  tasksAssigned: number;
  tasksCompleted: number;
  tasksInProgress: number;
  totalHours: number;
  completionRate: number;
  avgHoursPerTask: number;
}

export default function ProjectTeamDashboard({ 
  projectMembers, 
  tasks, 
  projectLead 
}: ProjectTeamDashboardProps) {
  const router = useRouter();

  // Calcular estadísticas por miembro
  const memberStats = useMemo((): MemberStats[] => {
    const allMembers = projectLead ? [projectLead, ...projectMembers] : projectMembers;
    
    return allMembers.map(user => {
      const userTasks = tasks.filter(task => task.assigned_to === user.id);
      const completed = userTasks.filter(task => task.status === 'done').length;
      const inProgress = userTasks.filter(task => task.status === 'in_progress').length;
      const totalHours = userTasks.reduce((sum, task) => sum + (task.actual_hours || 0), 0);
      
      return {
        user,
        tasksAssigned: userTasks.length,
        tasksCompleted: completed,
        tasksInProgress: inProgress,
        totalHours,
        completionRate: userTasks.length > 0 ? Math.round((completed / userTasks.length) * 100) : 0,
        avgHoursPerTask: userTasks.length > 0 ? Math.round((totalHours / userTasks.length) * 10) / 10 : 0
      };
    });
  }, [projectMembers, projectLead, tasks]);

  // Estadísticas generales del equipo
  const teamStats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'done').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length;
    const totalHours = tasks.reduce((sum, task) => sum + (task.actual_hours || 0), 0);
    
    return {
      totalMembers: memberStats.length,
      totalTasks,
      completedTasks,
      inProgressTasks,
      totalHours,
      avgTasksPerMember: Math.round((totalTasks / memberStats.length) * 10) / 10 || 0,
      teamCompletionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  }, [memberStats, tasks]);

  // Navegar al perfil del usuario
  const handleViewUser = (userId: string) => {
    router.push(`/lead/users/${userId}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'hr': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lead': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'volunteer': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'hr': return 'HR';
      case 'lead': return 'Líder';
      case 'volunteer': return 'Voluntario';
      default: return role;
    }
  };

  const getPerformanceColor = (completionRate: number) => {
    if (completionRate >= 80) return 'text-green-600';
    if (completionRate >= 60) return 'text-yellow-600';
    if (completionRate >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Users className="w-5 h-5 mr-2 text-emerald-600" />
            Equipo del Proyecto
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Dashboard de rendimiento y actividad de los miembros
          </p>
        </div>
        
        <div className="text-sm text-gray-500">
          {teamStats.totalMembers} miembros • {teamStats.totalTasks} tareas totales
        </div>
      </div>

      {/* Estadísticas generales del equipo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Miembros Activos</p>
              <p className="text-2xl font-bold text-blue-800">{teamStats.totalMembers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-700">Tareas Completadas</p>
              <p className="text-2xl font-bold text-emerald-800">{teamStats.completedTasks}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-emerald-600 font-medium">{teamStats.teamCompletionRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700">En Progreso</p>
              <p className="text-2xl font-bold text-orange-800">{teamStats.inProgressTasks}</p>
            </div>
            <Activity className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700">Horas Trabajadas</p>
              <p className="text-2xl font-bold text-purple-800">{teamStats.totalHours}h</p>
            </div>
            <Clock className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Lista de miembros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800">Miembros del Equipo</h4>
        </div>

        <div className="divide-y divide-gray-100">
          {memberStats.map((memberStat) => {
            const { user } = memberStat;
            const isLead = user.id === projectLead?.id;
            
            return (
              <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  {/* Información del usuario */}
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      isLead ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      {getInitials(user.name)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h5 className="font-semibold text-gray-800">{user.name}</h5>
                        {isLead && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <Star className="w-3 h-3 mr-1" />
                            Líder
                          </span>
                        )}
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-48">{user.email}</span>
                        </div>
                        
                        {user.profile?.country && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{user.profile.city ? `${user.profile.city}, ` : ''}{user.profile.country}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{user.profile?.hours_per_week || 0}h/sem disponible</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estadísticas del miembro */}
                  <div className="flex items-center space-x-8">
                    {/* Tareas asignadas */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">{memberStat.tasksAssigned}</div>
                      <div className="text-xs text-gray-500">Asignadas</div>
                    </div>

                    {/* Tareas completadas */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-emerald-600">{memberStat.tasksCompleted}</div>
                      <div className="text-xs text-gray-500">Completadas</div>
                    </div>

                    {/* Tasa de completación */}
                    <div className="text-center min-w-[80px]">
                      <div className={`text-lg font-bold ${getPerformanceColor(memberStat.completionRate)}`}>
                        {memberStat.completionRate}%
                      </div>
                      <div className="text-xs text-gray-500">Eficiencia</div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            memberStat.completionRate >= 80 ? 'bg-green-500' :
                            memberStat.completionRate >= 60 ? 'bg-yellow-500' :
                            memberStat.completionRate >= 40 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${memberStat.completionRate}%` }}
                        />
                      </div>
                    </div>

                    {/* Horas trabajadas */}
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{memberStat.totalHours}h</div>
                      <div className="text-xs text-gray-500">Trabajadas</div>
                    </div>

                    {/* Habilidades principales */}
                    <div className="min-w-[120px]">
                      <div className="flex flex-wrap gap-1">
                        {user.profile?.skills?.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {(user.profile?.skills?.length || 0) > 2 && (
                          <span className="text-xs text-gray-500">
                            +{(user.profile?.skills?.length || 0) - 2} más
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Ver perfil completo"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Enviar mensaje"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progreso de tareas en curso */}
                {memberStat.tasksInProgress > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {memberStat.tasksInProgress} tarea{memberStat.tasksInProgress !== 1 ? 's' : ''} en progreso
                      </span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-blue-600 font-medium">Activo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer con resumen */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6 text-gray-600">
              <span>Promedio de tareas por miembro: <strong>{teamStats.avgTasksPerMember}</strong></span>
              <span>Tasa general de completación: <strong className="text-emerald-600">{teamStats.teamCompletionRate}%</strong></span>
            </div>
            
            <button 
              onClick={() => router.push('/admin/users')}
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1"
            >
              <span>Ver todos los usuarios</span>
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}