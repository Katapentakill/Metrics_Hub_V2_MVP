// UBICACIÓN: src/modules/projects/volunteer/modals/ProjectDetailModal.tsx
// Modal de detalles para Voluntario - Vista limitada pero informativa

import React from 'react';
import { X, MapPin, Calendar, Users, Target, Clock, Activity, Star, Award, CheckCircle2 } from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ProjectDetailModalProps {
  view: ProjectView;
  onClose: () => void;
}

export default function ProjectDetailModal({ view, onClose }: ProjectDetailModalProps) {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'planning': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-purple-600 bg-purple-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{view.project.name}</h2>
              <p className="text-slate-600">Detalles del proyecto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Información Principal */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Descripción */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Descripción</h3>
                <p className="text-slate-600 leading-relaxed">{view.project.description}</p>
              </div>

              {/* Estado y Progreso */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Estado</span>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(view.project.status)}`}>
                    {getStatusText(view.project.status)}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Progreso</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${view.progressPct}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{view.progressPct}%</span>
                  </div>
                </div>
              </div>

              {/* Fechas Importantes */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Fechas Importantes</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="text-sm font-medium text-slate-700">Inicio del Proyecto</span>
                      <p className="text-sm text-slate-600">{formatDate(view.project.created_at)}</p>
                    </div>
                  </div>
                  {view.project.deadline && (
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <div>
                        <span className="text-sm font-medium text-slate-700">Fecha Límite</span>
                        <p className="text-sm text-slate-600">{formatDate(view.project.deadline)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Equipo */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Equipo</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Miembros del Equipo</span>
                    </div>
                    <span className="text-sm text-slate-600">
                      {view.project.current_team_size} / {view.project.max_team_size}
                    </span>
                  </div>
                  
                  {view.members && view.members.length > 0 ? (
                    <div className="space-y-2">
                      {view.members.slice(0, 5).map((member, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-700">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.role}</p>
                          </div>
                        </div>
                      ))}
                      {view.members.length > 5 && (
                        <p className="text-xs text-slate-500 mt-2">
                          +{view.members.length - 5} miembros más
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No hay miembros asignados aún</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Tu Rol */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Tu Rol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">Voluntario Activo</span>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Participas activamente en este proyecto como miembro del equipo
                </p>
              </div>

              {/* Estadísticas Rápidas */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Estadísticas</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Días activo</span>
                    <span className="text-sm font-medium text-slate-800">
                      {Math.ceil((new Date().getTime() - new Date(view.project.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Tareas completadas</span>
                    <span className="text-sm font-medium text-slate-800">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Horas contribuidas</span>
                    <span className="text-sm font-medium text-slate-800">48h</span>
                  </div>
                </div>
              </div>

              {/* Acciones Rápidas */}
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Acciones</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-800 rounded-md transition-colors">
                    Ver tareas asignadas
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-800 rounded-md transition-colors">
                    Ver archivos del proyecto
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-slate-800 rounded-md transition-colors">
                    Contactar al equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cerrar
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            Ver Proyecto Completo
          </button>
        </div>
      </div>
    </div>
  );
}
