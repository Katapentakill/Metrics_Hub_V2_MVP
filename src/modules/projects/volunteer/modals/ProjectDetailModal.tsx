import React from 'react';
import {
  X, MapPin, Calendar, Users, Target, Clock, Activity,
  Star, Award, CheckCircle2
} from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';
import '@/styles/projects.css';

interface ProjectDetailModalProps {
  view: ProjectView;
  onClose: () => void;
}

export default function ProjectDetailModal({ view, onClose }: ProjectDetailModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'status-badge status-active';
      case 'planning': return 'status-badge status-planning';
      case 'completed': return 'status-badge status-completed';
      case 'paused': return 'status-badge status-paused';
      default: return 'status-badge';
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
    <div className="project-modal-overlay">
      <div className="project-modal">
        {/* Header */}
        <div className="project-modal-header">
          <div className="left">
            <div className="icon"><Target className="w-6 h-6 text-white" /></div>
            <div>
              <h2 className="text-xl font-bold">{view.project.name}</h2>
              <p className="text-green-100 text-sm">Detalles del proyecto</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="project-modal-content">
          <div className="space-y-6">
            {/* Descripción */}
            <div className="project-section">
              <h3 className="section-title">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{view.project.description}</p>
            </div>

            {/* Estado */}
            <div className="project-section">
              <h3 className="section-title">Estado</h3>
              <span className={getStatusClass(view.project.status)}>
                {getStatusText(view.project.status)}
              </span>
            </div>

            {/* Fechas */}
            <div className="project-section">
              <h3 className="section-title">Fechas Importantes</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <p className="text-sm">
                    <strong>Inicio:</strong> {formatDate(view.project.created_at)}
                  </p>
                </div>
                {view.project.deadline && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <p className="text-sm">
                      <strong>Fecha Límite:</strong> {formatDate(view.project.deadline)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="project-section">
              <h4 className="section-title">Tu Rol</h4>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-slate-800">Voluntario Activo</span>
              </div>
              <p className="text-xs text-gray-600">
                Participas activamente en este proyecto como miembro del equipo.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="project-modal-footer">
          <button onClick={onClose} className="btn-secondary">Cerrar</button>
          <button className="btn-primary">Ver Proyecto Completo</button>
        </div>
      </div>
    </div>
  );
}
