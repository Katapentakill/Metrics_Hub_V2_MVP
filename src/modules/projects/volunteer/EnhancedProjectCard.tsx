// UBICACIÓN: src/modules/projects/volunteer/EnhancedProjectCard.tsx
// Tarjeta mejorada de proyecto para Voluntarios

import React from 'react';
import { 
  Calendar, 
  Users, 
  Target, 
  Clock, 
  Eye, 
  ArrowRight, 
  AlertTriangle,
  CheckCircle2,
  Star,
  Award
} from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface EnhancedProjectCardProps {
  project: ProjectView;
  onView: (project: ProjectView) => void;
  onEdit?: (project: ProjectView) => void;
}

export default function EnhancedProjectCard({ 
  project, 
  onView, 
  onEdit 
}: EnhancedProjectCardProps) {
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'planning': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'paused': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'En Progreso';
      case 'planning': return 'Planificación';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (deadline: string) => {
    return getDaysUntilDeadline(deadline) < 0;
  };

  const isUrgent = (deadline: string) => {
    const daysLeft = getDaysUntilDeadline(deadline);
    return daysLeft <= 7 && daysLeft >= 0;
  };

  const getDeadlineStatus = () => {
    if (!project.project.deadline) return null;
    
    const daysLeft = getDaysUntilDeadline(project.project.deadline);
    
    if (isOverdue(project.project.deadline)) {
      return {
        text: `${Math.abs(daysLeft)} días vencido`,
        color: 'text-red-600',
        icon: AlertTriangle
      };
    }
    
    if (isUrgent(project.project.deadline)) {
      return {
        text: `${daysLeft} días restantes`,
        color: 'text-orange-600',
        icon: Clock
      };
    }
    
    return {
      text: `${daysLeft} días restantes`,
      color: 'text-green-600',
      icon: CheckCircle2
    };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                {project.project.name}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.project.status)}`}>
                {getStatusText(project.project.status)}
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {project.project.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onView(project)}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Ver detalles"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Progreso</span>
            <span className="text-sm font-medium text-slate-700">{project.progressPct}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-slate-700">
                {project.project.current_team_size} / {project.project.max_team_size}
              </div>
              <div className="text-xs text-slate-500">Miembros</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-sm font-medium text-slate-700">{project.progressPct}%</div>
              <div className="text-xs text-slate-500">Completado</div>
            </div>
          </div>
        </div>

        {/* Deadline Info */}
        {project.project.deadline && (
          <div className="mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-700">
                  Fecha límite: {formatDate(project.project.deadline)}
                </div>
                {deadlineStatus && (
                  <div className={`text-xs flex items-center space-x-1 ${deadlineStatus.color}`}>
                    <deadlineStatus.icon className="w-3 h-3" />
                    <span>{deadlineStatus.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Team Members Preview */}
        {project.members && project.members.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-700">Equipo</span>
            </div>
            <div className="flex items-center space-x-2">
              {project.members.slice(0, 3).map((member, index) => (
                <div key={index} className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              ))}
              {project.members.length > 3 && (
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-slate-600">
                    +{project.members.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Your Role */}
        <div className="flex items-center space-x-2 mb-4 p-3 bg-blue-50 rounded-lg">
          <Award className="w-4 h-4 text-blue-600" />
          <div>
            <div className="text-sm font-medium text-blue-800">Tu Rol</div>
            <div className="text-xs text-blue-600">Voluntario Activo</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-slate-600">Proyecto activo</span>
          </div>
          
          <button
            onClick={() => onView(project)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <span>Ver proyecto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
