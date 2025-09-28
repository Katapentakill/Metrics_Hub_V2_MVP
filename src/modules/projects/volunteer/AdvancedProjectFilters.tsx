// UBICACIÓN: src/modules/projects/volunteer/AdvancedProjectFilters.tsx
// Filtros avanzados para Voluntarios - Vista limitada pero funcional

'use client';

import React, { useState } from 'react';
import { Search, Filter, X, Calendar, Users, Target, Clock } from 'lucide-react';

interface FilterOptions {
  search: string;
  status: string[];
  priority: string[];
  dateRange: {
    start: string;
    end: string;
  };
  teamSize: {
    min: number;
    max: number;
  };
  progress: {
    min: number;
    max: number;
  };
}

interface AdvancedProjectFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function AdvancedProjectFilters({ 
  onFiltersChange, 
  onClearFilters 
}: AdvancedProjectFiltersProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: [],
    priority: [],
    dateRange: {
      start: '',
      end: ''
    },
    teamSize: {
      min: 0,
      max: 50
    },
    progress: {
      min: 0,
      max: 100
    }
  });

  const statusOptions = [
    { value: 'active', label: 'Activo', color: 'text-green-600 bg-green-50' },
    { value: 'planning', label: 'Planificación', color: 'text-blue-600 bg-blue-50' },
    { value: 'completed', label: 'Completado', color: 'text-purple-600 bg-purple-50' },
    { value: 'paused', label: 'Pausado', color: 'text-yellow-600 bg-yellow-50' }
  ];

  const priorityOptions = [
    { value: 'urgent', label: 'Urgente', color: 'text-red-600 bg-red-50' },
    { value: 'high', label: 'Alta', color: 'text-orange-600 bg-orange-50' },
    { value: 'medium', label: 'Media', color: 'text-yellow-600 bg-yellow-50' },
    { value: 'low', label: 'Baja', color: 'text-green-600 bg-green-50' }
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'status' | 'priority', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterOptions = {
      search: '',
      status: [],
      priority: [],
      dateRange: { start: '', end: '' },
      teamSize: { min: 0, max: 50 },
      progress: { min: 0, max: 100 }
    };
    setFilters(emptyFilters);
    onClearFilters();
  };

  const hasActiveFilters = () => {
    return filters.search !== '' ||
           filters.status.length > 0 ||
           filters.priority.length > 0 ||
           filters.dateRange.start !== '' ||
           filters.dateRange.end !== '' ||
           filters.teamSize.min > 0 ||
           filters.teamSize.max < 50 ||
           filters.progress.min > 0 ||
           filters.progress.max < 100;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-800">Filtros Avanzados</span>
          {hasActiveFilters() && (
            <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
              {filters.status.length + filters.priority.length} activos
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-slate-500 hover:text-slate-700 flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Limpiar</span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {isOpen ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {/* Quick Search */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Advanced Filters */}
      {isOpen && (
        <div className="p-4 space-y-6">
          
          {/* Status Filters */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Estado del Proyecto
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter('status', option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.status.includes(option.value)
                      ? option.color
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Prioridad
            </label>
            <div className="flex flex-wrap gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter('priority', option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    filters.priority.includes(option.value)
                      ? option.color
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Rango de Fechas
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Desde</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Hasta</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Team Size Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Tamaño del Equipo
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Mínimo</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.teamSize.min}
                  onChange={(e) => updateFilter('teamSize', { ...filters.teamSize, min: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Máximo</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.teamSize.max}
                  onChange={(e) => updateFilter('teamSize', { ...filters.teamSize, max: parseInt(e.target.value) || 50 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Progress Range */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Progreso del Proyecto
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Mínimo (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.progress.min}
                  onChange={(e) => updateFilter('progress', { ...filters.progress, min: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Máximo (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.progress.max}
                  onChange={(e) => updateFilter('progress', { ...filters.progress, max: parseInt(e.target.value) || 100 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
