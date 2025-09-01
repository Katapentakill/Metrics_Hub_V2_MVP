// src/features/admin/projects/ProjectFilters.tsx
'use client';

import { useState } from 'react';
import { MapPin, Filter, X } from 'lucide-react';
import type { Project } from '@/lib/types';

export type ProjectFilterOptions = {
  status?: Project['status'] | 'all';
  country?: string; // del perfil del lead (o primer miembro)
};

interface Props {
  onFilterChange: (filters: ProjectFilterOptions) => void;
}

export default function ProjectFilters({ onFilterChange }: Props) {
  const [filters, setFilters] = useState<ProjectFilterOptions>({ status: 'all' });

  const handle = (k: keyof ProjectFilterOptions, v?: string) => {
    const next = { ...filters, [k]: (v as any) || undefined };
    setFilters(next);
    onFilterChange(next);
  };

  const clear = () => {
    const next: ProjectFilterOptions = { status: 'all' };
    setFilters(next);
    onFilterChange(next);
  };

  const has = !!(filters.country && filters.country !== '') || (filters.status && filters.status !== 'all');

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filtros Avanzados
        </h4>
        {has && (
          <button onClick={clear} className="text-sm text-slate-500 hover:text-slate-700 flex items-center space-x-1">
            <X className="w-3 h-3" /><span>Limpiar</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">Estado</label>
          <select
            value={filters.status || 'all'}
            onChange={(e) => handle('status', e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">Todos</option>
            <option value="planning">En planificación</option>
            <option value="active">Activo</option>
            <option value="completed">Completado</option>
            <option value="paused">Pausado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            <MapPin className="w-3 h-3 inline mr-1" /> País (líder o equipo)
          </label>
          <input
            value={filters.country || ''}
            onChange={(e) => handle('country', e.target.value)}
            placeholder="ej: Chile, Perú, Colombia…"
            className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {has && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.status && filters.status !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Estado: {filters.status}
              <button onClick={() => handle('status', 'all')} className="ml-1 hover:text-blue-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.country && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
              País: {filters.country}
              <button onClick={() => handle('country', '')} className="ml-1 hover:text-emerald-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
