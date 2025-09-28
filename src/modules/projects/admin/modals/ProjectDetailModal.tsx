// UBICACIÓN: src/modules/projects/admin/modals/ProjectDetailModal.tsx
// Modal para mostrar detalles completos del proyecto

import React from 'react';
import { X, MapPin, Calendar, Users, Target, Clock, Activity } from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ProjectDetailModalProps {
  view: ProjectView;
  onEdit: () => void;
  onClose: () => void;
}

export default function ProjectDetailModal({ view, onEdit, onClose }: ProjectDetailModalProps) {
  const { project, lead, members, country, city, progressPct } = view;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'planning': return 'En Planificación';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = () => {
    if (!project.deadline) return null;
    const today = new Date();
    const deadline = new Date(project.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntilDeadline = getDaysUntilDeadline();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">{project.name}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
              </span>
            </div>
            {project.description && (
              <p className="text-gray-600">{project.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Información principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Información del proyecto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Información del Proyecto</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Progreso:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-800">{progressPct}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Capacidad del equipo:</span>
                  <span className="ml-2 text-gray-600">{project.current_team_size}/{project.max_team_size} miembros</span>
                </div>
              </div>

              {(country || city) && (
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Ubicación:</span>
                    <span className="ml-2 text-gray-600">{city ? `${city}, ` : ''}{country}</span>
                  </div>
                </div>
              )}

              {project.deadline && (
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Fecha límite:</span>
                    <span className="ml-2 text-gray-600">{formatDate(project.deadline)}</span>
                    {daysUntilDeadline !== null && (
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        daysUntilDeadline < 0 ? 'bg-red-100 text-red-700' :
                        daysUntilDeadline <= 7 ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {daysUntilDeadline < 0 ? `${Math.abs(daysUntilDeadline)} días vencido` :
                         daysUntilDeadline === 0 ? 'Vence hoy' :
                         `${daysUntilDeadline} días restantes`}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Creado:</span>
                  <span className="ml-2 text-gray-600">{formatDate(project.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Líder del proyecto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Líder del Proyecto</h3>
            
            {lead ? (
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{lead.name}</h4>
                    <p className="text-sm text-emerald-700 font-medium">Líder del Proyecto</p>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                    {lead.profile?.country && (
                      <div className="flex items-center mt-1">
                        <MapPin className="w-3 h-3 text-gray-500 mr-1" />
                        <span className="text-xs text-gray-500">{lead.profile.country}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-500">Sin líder asignado</p>
              </div>
            )}
          </div>
        </div>

        {/* Equipo del proyecto */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Equipo del Proyecto ({members?.length || 0} miembros)
            </h3>
          </div>
          
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((member) => (
                <div key={member.id} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">{member.name}</h4>
                      <p className="text-xs text-blue-600">{member.role}</p>
                      {member.profile?.country && (
                        <p className="text-xs text-gray-500">{member.profile.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No hay miembros asignados al equipo</p>
            </div>
          )}
        </div>

        {/* Métricas adicionales */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Métricas del Proyecto</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progressPct}%</div>
              <div className="text-sm text-gray-600">Progreso</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{project.current_team_size}</div>
              <div className="text-sm text-gray-600">Miembros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((project.current_team_size / project.max_team_size) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Capacidad</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {daysUntilDeadline !== null ? Math.abs(daysUntilDeadline) : '--'}
              </div>
              <div className="text-sm text-gray-600">
                {daysUntilDeadline !== null ? (daysUntilDeadline < 0 ? 'Días vencido' : 'Días restantes') : 'Sin fecha'}
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Información del Sistema</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <span className="font-medium">ID del proyecto:</span>
              <span className="ml-2 font-mono text-xs">{project.id}</span>
            </div>
            <div>
              <span className="font-medium">Última actualización:</span>
              <span className="ml-2">{formatDate(project.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Activity className="w-4 h-4" />
            <span>Editar Proyecto</span>
          </button>
        </div>
      </div>
    </div>
  );
}