// Ubicación: src/features/admin/projects/components/AdvancedProjectFilters.tsx
// Este componente reemplaza ProjectFilters.tsx con funcionalidad avanzada

import React, { useState, useEffect } from 'react';
import { Filter, X, Calendar, Users, MapPin, Target, Clock } from 'lucide-react';
import type { Project } from '@/lib/types';

export interface AdvancedProjectFilterOptions {
  status?: Project['status'] | 'all';
  country?: string;
  city?: string;
  leadName?: string;
  progressRange?: [number, number];
  teamSizeRange?: [number, number];
  dateRange?: {
    start?: string;
    end?: string;
  };
  priority?: 'low' | 'medium' | 'high' | 'urgent' | 'all';
  riskLevel?: 'low' | 'medium' | 'high' | 'all';
}

interface AdvancedProjectFiltersProps {
  onFilterChange: (filters: AdvancedProjectFilterOptions) => void;
  availableCountries?: string[];
  availableCities?: string[];
  availableLeads?: Array<{ id: string; name: string }>;
}

export default function AdvancedProjectFilters({
  onFilterChange,
  availableCountries = [],
  availableCities = [],
  availableLeads = []
}: AdvancedProjectFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<AdvancedProjectFilterOptions>({
    status: 'all',
    progressRange: [0, 100],
    teamSizeRange: [1, 20],
    priority: 'all',
    riskLevel: 'all'
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    // Contar filtros activos
    let count = 0;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.country && filters.country !== '') count++;
    if (filters.city && filters.city !== '') count++;
    if (filters.leadName && filters.leadName !== '') count++;
    if (filters.progressRange && (filters.progressRange[0] > 0 || filters.progressRange[1] < 100)) count++;
    if (filters.teamSizeRange && (filters.teamSizeRange[0] > 1 || filters.teamSizeRange[1] < 20)) count++;
    if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) count++;
    if (filters.priority && filters.priority !== 'all') count++;
    if (filters.riskLevel && filters.riskLevel !== 'all') count++;
    
    setActiveFiltersCount(count);
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleFilterChange = (key: keyof AdvancedProjectFilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    const resetFilters: AdvancedProjectFilterOptions = {
      status: 'all',
      progressRange: [0, 100],
      teamSizeRange: [1, 20],
      priority: 'all',
      riskLevel: 'all'
    };
    setFilters(resetFilters);
  };

  const clearFilter = (key: keyof AdvancedProjectFilterOptions) => {
    const updates: Partial<AdvancedProjectFilterOptions> = {};
    
    switch (key) {
      case 'status':
        updates.status = 'all';
        break;
      case 'progressRange':
        updates.progressRange = [0, 100];
        break;
      case 'teamSizeRange':
        updates.teamSizeRange = [1, 20];
        break;
      case 'priority':
        updates.priority = 'all';
        break;
      case 'riskLevel':
        updates.riskLevel = 'all';
        break;
      case 'dateRange':
        updates.dateRange = {};
        break;
      default:
        updates[key] = undefined;
    }
    
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const getStatusBadgeColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'planning': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'planning': return 'Planificación';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header del panel de filtros */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filtros Avanzados</h3>
            {activeFiltersCount > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {activeFiltersCount} activo{activeFiltersCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
              >
                <X className="w-3 h-3" />
                <span>Limpiar todo</span>
              </button>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isExpanded 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isExpanded ? 'Contraer' : 'Expandir'}
            </button>
          </div>
        </div>
      </div>

      {/* Filtros básicos (siempre visibles) */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro de estado */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              <Target className="w-3 h-3 inline mr-1" />
              Estado del Proyecto
            </label>
            <select
              value={filters.status || 'all'}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="planning">En planificación</option>
              <option value="completed">Completado</option>
              <option value="paused">Pausado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          {/* Filtro de país */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              <MapPin className="w-3 h-3 inline mr-1" />
              País
            </label>
            <input
              type="text"
              value={filters.country || ''}
              onChange={(e) => handleFilterChange('country', e.target.value)}
              placeholder="ej: Chile, Perú, Colombia..."
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Filtro de líder */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              <Users className="w-3 h-3 inline mr-1" />
              Líder del Proyecto
            </label>
            <input
              type="text"
              value={filters.leadName || ''}
              onChange={(e) => handleFilterChange('leadName', e.target.value)}
              placeholder="Nombre del líder..."
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Filtro de prioridad */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              <Clock className="w-3 h-3 inline mr-1" />
              Prioridad
            </label>
            <select
              value={filters.priority || 'all'}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="all">Todas las prioridades</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filtros avanzados (expandibles) */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-6">
            {/* Rango de progreso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rango de Progreso: {filters.progressRange?.[0]}% - {filters.progressRange?.[1]}%
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.progressRange?.[0] || 0}
                  onChange={(e) => handleFilterChange('progressRange', [
                    parseInt(e.target.value),
                    filters.progressRange?.[1] || 100
                  ])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.progressRange?.[1] || 100}
                  onChange={(e) => handleFilterChange('progressRange', [
                    filters.progressRange?.[0] || 0,
                    parseInt(e.target.value)
                  ])}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Rango de tamaño de equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tamaño de Equipo: {filters.teamSizeRange?.[0]} - {filters.teamSizeRange?.[1]} miembros
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.teamSizeRange?.[0] || 1}
                  onChange={(e) => handleFilterChange('teamSizeRange', [
                    parseInt(e.target.value),
                    filters.teamSizeRange?.[1] || 20
                  ])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={filters.teamSizeRange?.[1] || 20}
                  onChange={(e) => handleFilterChange('teamSizeRange', [
                    filters.teamSizeRange?.[0] || 1,
                    parseInt(e.target.value)
                  ])}
                  className="flex-1"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <span>25</span>
                <span>50+</span>
              </div>
            </div>

            {/* Rango de fechas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Fecha de inicio (desde)
                </label>
                <input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...filters.dateRange,
                    start: e.target.value
                  })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Fecha límite (hasta)
                </label>
                <input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => handleFilterChange('dateRange', {
                    ...filters.dateRange,
                    end: e.target.value
                  })}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Nivel de Riesgo
                </label>
                <select
                  value={filters.riskLevel || 'all'}
                  onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="all">Todos los niveles</option>
                  <option value="high">Alto riesgo</option>
                  <option value="medium">Riesgo medio</option>
                  <option value="low">Bajo riesgo</option>
                </select>
              </div>
            </div>

            {/* Ciudad (si hay país seleccionado) */}
            {filters.country && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Ciudad específica
                </label>
                <input
                  type="text"
                  value={filters.city || ''}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Ciudad específica..."
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tags de filtros activos */}
      {activeFiltersCount > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {filters.status && filters.status !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                Estado: {getStatusLabel(filters.status as Project['status'])}
                <button
                  onClick={() => clearFilter('status')}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            
            {filters.country && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                País: {filters.country}
                <button
                  onClick={() => clearFilter('country')}
                  className="ml-2 hover:text-emerald-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.city && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                Ciudad: {filters.city}
                <button
                  onClick={() => clearFilter('city')}
                  className="ml-2 hover:text-emerald-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.leadName && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 border border-purple-200">
                Líder: {filters.leadName}
                <button
                  onClick={() => clearFilter('leadName')}
                  className="ml-2 hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.progressRange && (filters.progressRange[0] > 0 || filters.progressRange[1] < 100) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 border border-yellow-200">
                Progreso: {filters.progressRange[0]}%-{filters.progressRange[1]}%
                <button
                  onClick={() => clearFilter('progressRange')}
                  className="ml-2 hover:text-yellow-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.teamSizeRange && (filters.teamSizeRange[0] > 1 || filters.teamSizeRange[1] < 20) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800 border border-indigo-200">
                Equipo: {filters.teamSizeRange[0]}-{filters.teamSizeRange[1]}
                <button
                  onClick={() => clearFilter('teamSizeRange')}
                  className="ml-2 hover:text-indigo-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.priority && filters.priority !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-800 border border-orange-200">
                Prioridad: {filters.priority === 'urgent' ? 'Urgente' : 
                           filters.priority === 'high' ? 'Alta' : 
                           filters.priority === 'medium' ? 'Media' : 'Baja'}
                <button
                  onClick={() => clearFilter('priority')}
                  className="ml-2 hover:text-orange-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.riskLevel && filters.riskLevel !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 border border-red-200">
                Riesgo: {filters.riskLevel === 'high' ? 'Alto' : 
                        filters.riskLevel === 'medium' ? 'Medio' : 'Bajo'}
                <button
                  onClick={() => clearFilter('riskLevel')}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.dateRange && (filters.dateRange.start || filters.dateRange.end) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200">
                Fechas: {filters.dateRange.start || '∞'} - {filters.dateRange.end || '∞'}
                <button
                  onClick={() => clearFilter('dateRange')}
                  className="ml-2 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}