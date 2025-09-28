// modules/users/lead/filters/LeadUserFilters.tsx
'use client';

import { useState } from 'react';
import { MapPin, Clock, Star, GraduationCap, X, Languages, Globe } from 'lucide-react';

export type FilterOptions = {
  country?: string;
  timezone?: string;
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  university?: string;
  languageLevel?: string;
  hasLinkedIn?: boolean;
  hasGitHub?: boolean;
  hasPortfolio?: boolean;
};

interface LeadUserFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function LeadUserFilters({ onFilterChange }: LeadUserFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  const countries = [
    'España', 'México', 'Colombia', 'Argentina', 'Perú', 'Chile',
    'Venezuela', 'Ecuador', 'Estados Unidos', 'Guatemala', 'Cuba', 'Bolivia'
  ];

  const timezones = [
    'EST', 'PST', 'MST', 'CST', 'GMT-5', 'GMT-3', 'GMT+1', 'GMT-6'
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
    { value: 'expert', label: 'Experto' }
  ];

  const languageLevels = [
    'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([, v]) => v !== undefined && v !== '' && v !== false
  );

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Filtros para Selección de Voluntarios</h4>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-slate-500 hover:text-slate-700 flex items-center space-x-1"
          >
            <X className="w-3 h-3" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* País */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <MapPin className="w-3 h-3 inline mr-1" />
            País
          </label>
          <select
            value={filters.country || ''}
            onChange={(e) => handleFilterChange('country', e.target.value || undefined)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Todos los países</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Zona Horaria */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <Clock className="w-3 h-3 inline mr-1" />
            Zona Horaria
          </label>
          <select
            value={filters.timezone || ''}
            onChange={(e) => handleFilterChange('timezone', e.target.value || undefined)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Todas las zonas</option>
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        {/* Nivel de Habilidad */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <Star className="w-3 h-3 inline mr-1" />
            Nivel Mínimo de Skills
          </label>
          <select
            value={filters.skillLevel || ''}
            onChange={(e) => handleFilterChange('skillLevel', e.target.value as FilterOptions['skillLevel'] || undefined)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Cualquier nivel</option>
            {skillLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>

        {/* Universidad */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <GraduationCap className="w-3 h-3 inline mr-1" />
            Universidad
          </label>
          <input
            type="text"
            value={filters.university || ''}
            onChange={(e) => handleFilterChange('university', e.target.value || undefined)}
            placeholder="Buscar por universidad..."
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Nivel de Idioma */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <Languages className="w-3 h-3 inline mr-1" />
            Nivel Mínimo de Idioma
          </label>
          <select
            value={filters.languageLevel || ''}
            onChange={(e) => handleFilterChange('languageLevel', e.target.value || undefined)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Cualquier nivel</option>
            {languageLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Enlaces Profesionales */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <Globe className="w-3 h-3 inline mr-1" />
            Enlaces Profesionales
          </label>
          <div className="space-y-2">
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={filters.hasLinkedIn || false}
                onChange={(e) => handleFilterChange('hasLinkedIn', e.target.checked || undefined)}
                className="mr-2"
              />
              Tiene LinkedIn
            </label>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={filters.hasGitHub || false}
                onChange={(e) => handleFilterChange('hasGitHub', e.target.checked || undefined)}
                className="mr-2"
              />
              Tiene GitHub
            </label>
            <label className="flex items-center text-xs">
              <input
                type="checkbox"
                checked={filters.hasPortfolio || false}
                onChange={(e) => handleFilterChange('hasPortfolio', e.target.checked || undefined)}
                className="mr-2"
              />
              Tiene Portfolio
            </label>
          </div>
        </div>
      </div>

      {/* Pills de filtros activos */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-slate-600">Filtros activos:</span>

          {filters.country && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
              País: {filters.country}
              <button
                onClick={() => handleFilterChange('country', undefined)}
                className="ml-1 hover:text-emerald-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.timezone && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Zona: {filters.timezone}
              <button
                onClick={() => handleFilterChange('timezone', undefined)}
                className="ml-1 hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.skillLevel && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              Nivel: {skillLevels.find(s => s.value === filters.skillLevel)?.label}
              <button
                onClick={() => handleFilterChange('skillLevel', undefined)}
                className="ml-1 hover:text-purple-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.university && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
              Universidad: {filters.university}
              <button
                onClick={() => handleFilterChange('university', undefined)}
                className="ml-1 hover:text-orange-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.languageLevel && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Idioma: {filters.languageLevel}+
              <button
                onClick={() => handleFilterChange('languageLevel', undefined)}
                className="ml-1 hover:text-green-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.hasLinkedIn && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Con LinkedIn
              <button
                onClick={() => handleFilterChange('hasLinkedIn', undefined)}
                className="ml-1 hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.hasGitHub && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
              Con GitHub
              <button
                onClick={() => handleFilterChange('hasGitHub', undefined)}
                className="ml-1 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.hasPortfolio && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">
              Con Portfolio
              <button
                onClick={() => handleFilterChange('hasPortfolio', undefined)}
                className="ml-1 hover:text-indigo-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}