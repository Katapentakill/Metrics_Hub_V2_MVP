// UBICACIÓN: src/modules/projects/admin/EnhancedProjectCard.tsx
// Este archivo reemplaza la tarjeta básica de proyecto con una versión más completa
// NOTA: Este código está diseñado para Next.js con lucide-react instalado

import React from 'react';

// En tu proyecto real, importa desde lucide-react:
// import { Calendar, Clock, Target, TrendingUp, Users, AlertTriangle, CheckCircle, MapPin, MoreVertical, Eye, Edit } from 'lucide-react';
// import type { ProjectView } from '@/lib/map/projects/projectView';

// Tipos simulados para el artifact
type ProjectView = {
  project: {
    id: string;
    name: string;
    description?: string;
    status: 'active' | 'planning' | 'completed' | 'paused' | 'cancelled';
    deadline?: string;
    current_team_size: number;
    max_team_size: number;
  };
  lead?: { name: string };
  members?: Array<{ id: string; name: string }>;
  country?: string;
  city?: string;
  progressPct: number;
};

interface EnhancedProjectCardProps {
  project: ProjectView;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showMenu?: boolean;
  onMenuToggle?: () => void;
  menuId?: string;
}

// Iconos SVG simples para demostración
const Icons = {
  Calendar: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Clock: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Users: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  MapPin: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Target: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  MoreVertical: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  )
};

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
  
  const calculateDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };
  
  const daysUntilDeadline = calculateDaysUntilDeadline(proj.deadline);
  const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7 && daysUntilDeadline >= 0;
  const isOverdue = daysUntilDeadline !== null && daysUntilDeadline < 0;
  const teamUtilization = (proj.current_team_size / proj.max_team_size) * 100;
  const velocity = Math.round(progressPct * 0.8 + Math.random() * 20);
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-emerald-50 text-emerald-800 border-emerald-600',
          label: 'Activo',
          Icon: Icons.CheckCircle
        };
      case 'planning': 
        return { 
          color: 'bg-blue-50 text-blue-800 border-blue-500',
          label: 'Planificación',
          Icon: Icons.Target
        };
      case 'completed': 
        return { 
          color: 'bg-green-50 text-[#166534] border-[#166534]',
          label: 'Completado',
          Icon: Icons.CheckCircle
        };
      case 'paused': 
        return { 
          color: 'bg-yellow-50 text-yellow-800 border-yellow-500',
          label: 'Pausado',
          Icon: Icons.Clock
        };
      case 'cancelled': 
        return { 
          color: 'bg-red-50 text-red-800 border-red-500',
          label: 'Cancelado',
          Icon: Icons.AlertTriangle
        };
      default: 
        return { 
          color: 'bg-gray-50 text-gray-800 border-slate-200',
          label: status,
          Icon: Icons.Target
        };
    }
  };

  const getPriorityIndicator = () => {
    if (isOverdue) return { color: 'text-red-500', Icon: Icons.AlertTriangle, label: 'Vencido' };
    if (isUrgent) return { color: 'text-yellow-600', Icon: Icons.Clock, label: 'Urgente' };
    if (progressPct >= 90) return { color: 'text-emerald-600', Icon: Icons.CheckCircle, label: 'Casi listo' };
    if (proj.status === 'active') return { color: 'text-blue-500', Icon: Icons.TrendingUp, label: 'En progreso' };
    return { color: 'text-gray-600', Icon: Icons.Target, label: 'En espera' };
  };

  const statusConfig = getStatusConfig(proj.status);
  const priority = getPriorityIndicator();
  const PriorityIcon = priority.Icon;
  const StatusIcon = statusConfig.Icon;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 hover:border-[#059669] overflow-hidden">
      {/* Header del proyecto */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {getInitials(proj.name)}
            </div>
            <div className="flex-1">
              <h3 
                className="text-xl font-bold text-slate-800 mb-1 group-hover:text-[#166534] transition-colors line-clamp-1 cursor-pointer"
                onClick={onView}
              >
                {proj.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                  <span className="mr-1"><StatusIcon /></span>
                  {statusConfig.label}
                </span>
                <div className="flex items-center text-gray-600 text-xs">
                  <span className={`mr-1 ${priority.color}`}><PriorityIcon /></span>
                  <span>{priority.label}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onView}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 hover:bg-blue-100 text-[#3b82f6] p-2 rounded-lg flex items-center space-x-1"
              title="Ir al proyecto (Kanban)"
            >
              <Icons.Eye />
            </button>
            
            <div className="relative">
              <button 
                onClick={onMenuToggle}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-50 hover:bg-gray-100 text-gray-600 p-2 rounded-lg"
                title="Más opciones"
              >
                <Icons.MoreVertical />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
                  <button 
                    onClick={() => { onView(); onMenuToggle?.(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50 text-sm"
                  >
                    <span className="text-[#3b82f6]"><Icons.Eye /></span>
                    <span>Ir al proyecto</span>
                  </button>
                  <button 
                    onClick={() => { onEdit(); onMenuToggle?.(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-sm"
                  >
                    <span className="text-slate-600"><Icons.Edit /></span>
                    <span>Editar proyecto</span>
                  </button>
                  <button 
                    onClick={() => { onDelete(); onMenuToggle?.(); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50 text-sm border-t border-slate-200"
                  >
                    <span className="text-red-500"><Icons.AlertTriangle /></span>
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
          <div className="bg-gradient-to-r from-gray-50 to-white border border-slate-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600 font-medium">Progreso</span>
              <span className="text-sm font-bold text-slate-800">{progressPct}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  progressPct >= 90 ? 'bg-gradient-to-r from-green-300 to-emerald-300' :
                  progressPct >= 70 ? 'bg-gradient-to-r from-emerald-300 to-teal-300' :
                  progressPct >= 40 ? 'bg-gradient-to-r from-yellow-300 to-lime-300' :
                  'bg-gradient-to-r from-red-300 to-orange-300'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          
          {/* Utilización del equipo */}
          <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-300 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-blue-600 font-medium">Equipo</span>
              <span className="text-sm font-bold text-blue-700">
                {proj.current_team_size}/{proj.max_team_size}
              </span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  teamUtilization >= 90 ? 'bg-gradient-to-r from-red-300 to-red-400' :
                  teamUtilization >= 75 ? 'bg-gradient-to-r from-yellow-300 to-orange-300' :
                  'bg-gradient-to-r from-blue-300 to-sky-300'
                }`}
                style={{ width: `${Math.min(teamUtilization, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Métricas adicionales */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center py-2">
            <div className="text-lg font-bold text-slate-800">{velocity}%</div>
            <div className="text-xs text-gray-600">Velocidad</div>
          </div>
          <div className="text-center py-2 border-x border-slate-200">
            <div className="text-lg font-bold text-slate-800">{members?.length || 0}</div>
            <div className="text-xs text-gray-600">Miembros</div>
          </div>
          <div className="text-center py-2">
            <div className={`text-lg font-bold ${isOverdue ? 'text-red-500' : isUrgent ? 'text-yellow-600' : 'text-slate-800'}`}>
              {daysUntilDeadline !== null ? Math.abs(daysUntilDeadline) : '--'}
            </div>
            <div className="text-xs text-gray-600">
              {daysUntilDeadline !== null ? (daysUntilDeadline < 0 ? 'Vencido' : 'Días rest.') : 'Sin fecha'}
            </div>
          </div>
        </div>
      </div>

      {/* Sección del equipo */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icons.Users />
            <span className="text-sm font-medium text-slate-700">Líder del Proyecto</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {lead?.name ? getInitials(lead.name) : '??'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800">{lead?.name || 'Sin asignar'}</p>
            <div className="flex items-center text-xs text-gray-600">
              <span className="mr-1"><Icons.MapPin /></span>
              <span>{city && country ? `${city}, ${country}` : country || 'Sin ubicación'}</span>
            </div>
          </div>
        </div>

        {/* Avatares del equipo */}
        {members && members.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Equipo Activo</span>
              <span className="text-xs text-gray-600">{members.length} miembros</span>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
              {members.slice(0, 6).map((member) => (
                <div
                  key={member.id}
                  className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white transition-transform hover:scale-110 hover:z-10 relative shadow-sm"
                  title={member.name}
                >
                  {getInitials(member.name)}
                </div>
              ))}
              {members.length > 6 && (
                <div className="w-7 h-7 bg-slate-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  +{members.length - 6}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer con información adicional */}
      <div className="px-6 py-3 bg-white border-t border-slate-200">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4 text-gray-600">
            {proj.deadline && (
              <div className="flex items-center space-x-1">
                <Icons.Calendar />
                <span className={isOverdue ? 'text-red-500 font-medium' : isUrgent ? 'text-yellow-600 font-medium' : ''}>
                  {proj.deadline}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Icons.TrendingUp />
              <span>Vel. {velocity}%</span>
            </div>
          </div>
          
          <button
            onClick={onView}
            className="text-[#22c55e] hover:text-[#059669] text-xs font-medium flex items-center space-x-1 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
          >
            <Icons.Eye />
            <span>Ver proyecto</span>
          </button>
        </div>
      </div>

      {/* Indicadores de estado urgente */}
      {isOverdue && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
      )}
      {isUrgent && !isOverdue && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg" />
      )}
    </div>
  );
}