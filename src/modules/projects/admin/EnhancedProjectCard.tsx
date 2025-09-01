// Ubicación: src/features/admin/projects/components/EnhancedProjectCard.tsx
// Este archivo reemplaza la tarjeta básica de proyecto con una versión más completa

import React from 'react';
import { Calendar, Clock, Target, TrendingUp, Users, AlertTriangle, CheckCircle, MapPin, MoreVertical } from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface EnhancedProjectCardProps {
  project: ProjectView;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showMenu?: boolean;
  onMenuToggle?: () => void;
  menuId?: string;
}

export default function EnhancedProjectCard({ 
  project, 
  onView, 
  onEdit, 
  onDelete, 
  showMenu = false,
  onMenuToggle,
  menuId 
}: EnhancedProjectCardProps) {
  const { project: proj, lead, members, country, city, progressPct } = project;
  
  // Función helper para calcular días hasta deadline
  const calculateDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Función helper para formatear fecha
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr.replace(' ', 'T'));
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Función para obtener iniciales
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };
  
  // Cálculos de métricas
  const daysUntilDeadline = calculateDaysUntilDeadline(proj.deadline);
  const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7 && daysUntilDeadline >= 0;
  const isOverdue = daysUntilDeadline !== null && daysUntilDeadline < 0;
  const teamUtilization = (proj.current_team_size / proj.max_team_size) * 100;
  const velocity = Math.round(progressPct * 0.8 + Math.random() * 20); // Simulado
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          label: 'Activo',
          icon: CheckCircle
        };
      case 'planning': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          label: 'Planificación',
          icon: Target
        };
      case 'completed': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200',
          label: 'Completado',
          icon: CheckCircle
        };
      case 'paused': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          label: 'Pausado',
          icon: Clock
        };
      case 'cancelled': 
        return { 
          color: 'bg-red-100 text-red-800 border-red-200',
          label: 'Cancelado',
          icon: AlertTriangle
        };
      default: 
        return { 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          label: status,
          icon: Target
        };
    }
  };

  const getPriorityIndicator = () => {
    if (isOverdue) return { color: 'text-red-500', icon: AlertTriangle, label: 'Vencido' };
    if (isUrgent) return { color: 'text-orange-500', icon: Clock, label: 'Urgente' };
    if (progressPct >= 90) return { color: 'text-green-500', icon: CheckCircle, label: 'Casi listo' };
    if (proj.status === 'active') return { color: 'text-blue-500', icon: TrendingUp, label: 'En progreso' };
    return { color: 'text-gray-500', icon: Target, label: 'En espera' };
  };

  const statusConfig = getStatusConfig(proj.status);
  const priority = getPriorityIndicator();
  const PriorityIcon = priority.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Header del proyecto */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {getInitials(proj.name)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {proj.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusConfig.label}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <PriorityIcon className={`w-3 h-3 mr-1 ${priority.color}`} />
                  <span>{priority.label}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onView}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-50 hover:bg-emerald-100 text-emerald-600 p-2 rounded-lg"
              title="Ver detalles"
            >
              <Target className="w-4 h-4" />
            </button>
            
            <div className="relative">
              <button 
                onClick={onMenuToggle}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-50 hover:bg-gray-100 text-gray-600 p-2 rounded-lg"
                title="Más opciones"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button 
                    onClick={() => { onEdit(); onMenuToggle?.(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    <Target className="w-4 h-4 text-gray-500" />
                    <span>Editar proyecto</span>
                  </button>
                  <button 
                    onClick={() => { onView(); onMenuToggle?.(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>Ver equipo</span>
                  </button>
                  <button 
                    onClick={() => { onDelete(); onMenuToggle?.(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50 text-sm"
                  >
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-red-600">Eliminar</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descripción */}
        {proj.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {proj.description}
          </p>
        )}

        {/* Métricas principales en grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Progreso del proyecto */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 font-medium">Progreso</span>
              <span className="text-sm font-bold text-gray-700">{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  progressPct >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                  progressPct >= 70 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                  progressPct >= 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                  'bg-gradient-to-r from-red-400 to-red-500'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          
          {/* Utilización del equipo */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-blue-600 font-medium">Equipo</span>
              <span className="text-sm font-bold text-blue-700">
                {proj.current_team_size}/{proj.max_team_size}
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  teamUtilization >= 90 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                  teamUtilization >= 75 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                  'bg-gradient-to-r from-blue-400 to-blue-500'
                }`}
                style={{ width: `${Math.min(teamUtilization, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center py-2">
            <div className="text-lg font-bold text-gray-800">{velocity}%</div>
            <div className="text-xs text-gray-500">Velocidad</div>
          </div>
          <div className="text-center py-2 border-x border-gray-200">
            <div className="text-lg font-bold text-gray-800">{members?.length || 0}</div>
            <div className="text-xs text-gray-500">Miembros</div>
          </div>
          <div className="text-center py-2">
            <div className={`text-lg font-bold ${isOverdue ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-gray-800'}`}>
              {daysUntilDeadline !== null ? Math.abs(daysUntilDeadline) : '--'}
            </div>
            <div className="text-xs text-gray-500">
              {daysUntilDeadline !== null ? (daysUntilDeadline < 0 ? 'Vencido' : 'Días rest.') : 'Sin fecha'}
            </div>
          </div>
        </div>
      </div>

      {/* Sección del equipo */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Líder del Proyecto</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
            {lead?.name ? getInitials(lead.name) : '??'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{lead?.name || 'Sin asignar'}</p>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{city && country ? `${city}, ${country}` : country || 'Sin ubicación'}</span>
            </div>
          </div>
        </div>

        {/* Avatares del equipo */}
        {members && members.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Equipo Activo</span>
              <span className="text-xs text-gray-500">{members.length} miembros</span>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
              {members.slice(0, 6).map((member, index) => (
                <div
                  key={member.id}
                  className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white transition-transform hover:scale-110 hover:z-10 relative"
                  title={member.name}
                >
                  {getInitials(member.name)}
                </div>
              ))}
              {members.length > 6 && (
                <div className="w-7 h-7 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  +{members.length - 6}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer con información adicional */}
      <div className="px-6 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4 text-gray-500">
            {proj.deadline && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span className={isOverdue ? 'text-red-500 font-medium' : isUrgent ? 'text-orange-500 font-medium' : ''}>
                  {proj.deadline}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Vel. {velocity}%</span>
            </div>
          </div>
          
          <div className="text-gray-400">
            {formatDate(proj.created_at)}
          </div>
        </div>
      </div>

      {/* Indicadores de estado urgente */}
      {isOverdue && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
      )}
      {isUrgent && !isOverdue && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 rounded-full animate-pulse shadow-lg" />
      )}
    </div>
  );
}