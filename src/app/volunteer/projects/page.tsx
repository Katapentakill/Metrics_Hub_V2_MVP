// UBICACIÓN: src/app/volunteer/projects/page.tsx
// Página de proyectos para Voluntario - Solo ve sus propios proyectos

'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Folder, Search, BarChart3, Grid } from 'lucide-react';

import type {
  Project,
  ExtendedUserWithProfile,
} from '@/lib/types';

import { extendedMockUsers } from '@/lib/data/extendedUsers';
import { mockProjects, mockTeams, mockTeamMembers } from '@/lib/data/mockProjects';
import { buildProjectViews, ProjectView } from '@/lib/map/projects/projectView';
import VolunteerProjectsDashboard from '@/modules/projects/volunteer/VolunteerProjectsDashboard';
import VolunteerProjectsGridView from '@/modules/projects/volunteer/VolunteerProjectsGridView';
import { useAuth } from '@/lib/auth';

type ViewMode = 'dashboard' | 'projects';

export default function VolunteerProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<ExtendedUserWithProfile[]>([]);
  const [views, setViews] = useState<ProjectView[]>([]);
  const [filtered, setFiltered] = useState<ProjectView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de vista
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar datos
  useEffect(() => {
    (async () => {
      await new Promise((r) => setTimeout(r, 300));
      setUsers(extendedMockUsers);
      setProjects(mockProjects);
      setIsLoading(false);
    })();
  }, []);

  // Construir vistas cuando cambien los datos - FILTRADO POR VOLUNTEER_ID
  useEffect(() => {
    if (!isLoading && user?.userId) {
      // Filtrar proyectos donde el usuario actual es voluntario
      const volunteerProjects = projects.filter(p => {
        // Buscar en los miembros del equipo si el usuario actual está incluido
        const projectTeam = mockTeams.find(t => t.project_id === p.id);
        const teamMembers = projectTeam ? mockTeamMembers.filter(tm => tm.team_id === projectTeam.id) : [];
        return teamMembers.some(tm => tm.user_id === user.userId);
      });
      const v = buildProjectViews(volunteerProjects, users, mockTeams, mockTeamMembers);
      setViews(v);
    }
  }, [isLoading, projects, users, user?.userId]);

  const applyFilters = useCallback(() => {
    let data = [...views];

    // Búsqueda por texto
    const q = searchTerm.trim().toLowerCase();
    if (q) {
      data = data.filter(v =>
        v.project.name.toLowerCase().includes(q) ||
        v.project.description?.toLowerCase().includes(q) ||
        v.lead?.name.toLowerCase().includes(q) ||
        v.lead?.email.toLowerCase().includes(q) ||
        v.country?.toLowerCase().includes(q) ||
        v.city?.toLowerCase().includes(q)
      );
    }

    setFiltered(data);
  }, [views, searchTerm]);

  // Aplicar filtros cuando cambien
  useEffect(() => { 
    applyFilters(); 
  }, [applyFilters]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="loading-skeleton h-8 w-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6">
              <div className="loading-skeleton h-6 w-20 mb-2"></div>
              <div className="loading-skeleton h-8 w-16"></div>
            </div>
          ))}
        </div>
        <div className="card p-6"><div className="loading-skeleton h-96 w-full"></div></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header principal */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Folder className="w-8 h-8 mr-3 text-emerald-600" />
            Mis Proyectos
          </h1>
          <p className="text-muted mt-1">
            Proyectos en los que participo como voluntario
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Selector de vista */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'dashboard' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setViewMode('projects')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'projects' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Proyectos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            Mostrando <span className="font-medium text-gray-800">{filtered.length}</span> de{' '}
            <span className="font-medium text-gray-800">{views.length}</span> proyectos
          </div>
        </div>
      </div>

      {/* Contenido principal basado en la vista seleccionada */}
      {viewMode === 'dashboard' ? (
        <VolunteerProjectsDashboard projects={filtered} />
      ) : (
        <VolunteerProjectsGridView
          projects={filtered}
          loading={isLoading}
        />
      )}
    </div>
  );
}
