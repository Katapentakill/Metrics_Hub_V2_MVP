// src/features/admin/users/UserFilters.tsx
'use client';

import { useState } from 'react';
import { MapPin, X } from 'lucide-react';

export type FilterOptions = {
  country?: string;
  hoursPerWeek?: '10' | '20';
};

interface UserFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function UserFilters({ onFilterChange }: UserFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  const countries = [
    'España', 'México', 'Colombia', 'Argentina', 'Perú', 'Chile',
    'Venezuela', 'Ecuador', 'Estados Unidos', 'Otros'
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
    ([, v]) => v !== undefined && v !== ''
  );

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Filtros Avanzados</h4>
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

        {/* Horas por semana */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Horas por Semana
          </label>
          <select
            value={filters.hoursPerWeek || ''}
            onChange={(e) =>
              handleFilterChange(
                'hoursPerWeek',
                (e.target.value || undefined) as FilterOptions['hoursPerWeek']
              )
            }
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Cualquier cantidad</option>
            <option value="10">10 horas</option>
            <option value="20">20 horas</option>
          </select>
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

          {filters.hoursPerWeek && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
              Horas/sem: {filters.hoursPerWeek}
              <button
                onClick={() => handleFilterChange('hoursPerWeek', undefined)}
                className="ml-1 hover:text-amber-600"
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
