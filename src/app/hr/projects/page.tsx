// UBICACIÓN: src/app/hr/projects/page.tsx
// Este archivo REEMPLAZA tu page.tsx actual con las nuevas mejoras

'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { Folder, Search, Plus, BarChart3, Grid } from 'lucide-react';

import type {
  Project,
  ExtendedUserWithProfile,
} from '@/lib/types';

import { extendedMockUsers } from '@/lib/data/extendedUsers';
import { mockProjects, mockTeams, mockTeamMembers } from '@/lib/data/mockProjects';
import ExportProjects from '@/modules/projects/hr/ExportProjects';
import { buildProjectViews, ProjectView } from '@/lib/map/projects/projectView';
import AdvancedProjectFilters, { AdvancedProjectFilterOptions } from '@/modules/projects/hr/AdvancedProjectFilters';
import ProjectsDashboard from '@/modules/projects/hr/ProjectsDashboard';
import ProjectsGridView from '@/modules/projects/hr/ProjectsGridView';
import ProjectModalEdit from '@/modules/projects/hr/modals/ProjectModalEdit';
import ProjectDetailModal from '@/modules/projects/hr/modals/ProjectDetailModal';



type ViewMode = 'dashboard' | 'projects';

export default function HrProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<ExtendedUserWithProfile[]>([]);
  const [views, setViews] = useState<ProjectView[]>([]);
  const [filtered, setFiltered] = useState<ProjectView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados de vista
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedProjectFilterOptions>({
    status: 'all',
    progressRange: [0, 100],
    teamSizeRange: [1, 20],
    priority: 'all',
    riskLevel: 'all'
  });

  // Estados de modales
  const [selected, setSelected] = useState<ProjectView | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const leadCandidates = useMemo(
    () => extendedMockUsers.filter((u) => u.role === 'lead'),
    []
  );

  // Cargar datos
  useEffect(() => {
    (async () => {
      await new Promise((r) => setTimeout(r, 300));
      setUsers(extendedMockUsers);
      setProjects(mockProjects);
      setIsLoading(false);
    })();
  }, []);

  // Construir vistas cuando cambien los datos
  useEffect(() => {
    if (!isLoading) {
      const v = buildProjectViews(projects, users, mockTeams, mockTeamMembers);
      setViews(v);
    }
  }, [isLoading, projects, users]);

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

    // Filtros avanzados
    if (advancedFilters.status && advancedFilters.status !== 'all') {
      data = data.filter(v => v.project.status === advancedFilters.status);
    }

    if (advancedFilters.country) {
      const country = advancedFilters.country.toLowerCase();
      data = data.filter(v => (v.country || '').toLowerCase().includes(country));
    }

    if (advancedFilters.city) {
      const city = advancedFilters.city.toLowerCase();
      data = data.filter(v => (v.city || '').toLowerCase().includes(city));
    }

    if (advancedFilters.leadName) {
      const leadName = advancedFilters.leadName.toLowerCase();
      data = data.filter(v => (v.lead?.name || '').toLowerCase().includes(leadName));
    }

    if (advancedFilters.progressRange) {
      const [min, max] = advancedFilters.progressRange;
      data = data.filter(v => v.progressPct >= min && v.progressPct <= max);
    }

    if (advancedFilters.teamSizeRange) {
      const [min, max] = advancedFilters.teamSizeRange;
      data = data.filter(v => 
        v.project.current_team_size >= min && 
        v.project.current_team_size <= max
      );
    }

    if (advancedFilters.dateRange?.start) {
      data = data.filter(v => {
        if (!v.project.deadline) return false;
        return new Date(v.project.deadline) >= new Date(advancedFilters.dateRange!.start!);
      });
    }

    if (advancedFilters.dateRange?.end) {
      data = data.filter(v => {
        if (!v.project.deadline) return false;
        return new Date(v.project.deadline) <= new Date(advancedFilters.dateRange!.end!);
      });
    }

    // Filtro de prioridad (basado en deadline y progreso)
    if (advancedFilters.priority && advancedFilters.priority !== 'all') {
      data = data.filter(v => {
        const daysUntilDeadline = v.project.deadline ? 
          Math.ceil((new Date(v.project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 
          null;
        
        const isOverdue = daysUntilDeadline !== null && daysUntilDeadline < 0;
        const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 7 && daysUntilDeadline >= 0;
        
        switch (advancedFilters.priority) {
          case 'urgent':
            return isOverdue || isUrgent;
          case 'high':
            return daysUntilDeadline !== null && daysUntilDeadline <= 14 && !isOverdue && !isUrgent;
          case 'medium':
            return daysUntilDeadline !== null && daysUntilDeadline > 14 && daysUntilDeadline <= 30;
          case 'low':
            return daysUntilDeadline === null || daysUntilDeadline > 30;
          default:
            return true;
        }
      });
    }

    // Filtro de nivel de riesgo
    if (advancedFilters.riskLevel && advancedFilters.riskLevel !== 'all') {
      data = data.filter(v => {
        const daysUntilDeadline = v.project.deadline ? 
          Math.ceil((new Date(v.project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 
          null;
        
        const isHighRisk = (daysUntilDeadline !== null && daysUntilDeadline <= 14 && v.progressPct < 70) ||
                          (daysUntilDeadline !== null && daysUntilDeadline < 0);
        const isMediumRisk = (daysUntilDeadline !== null && daysUntilDeadline <= 30 && v.progressPct < 50) ||
                            (v.project.current_team_size < v.project.max_team_size * 0.5);
        
        switch (advancedFilters.riskLevel) {
          case 'high':
            return isHighRisk;
          case 'medium':
            return isMediumRisk && !isHighRisk;
          case 'low':
            return !isHighRisk && !isMediumRisk;
          default:
            return true;
        }
      });
    }

    setFiltered(data);
  }, [views, searchTerm, advancedFilters]);

  // Aplicar filtros cuando cambien
  useEffect(() => { 
    applyFilters(); 
  }, [views, searchTerm, advancedFilters, applyFilters]);

  // Handlers de acciones
  const onEdit = (v: ProjectView) => { setSelected(v); setShowEdit(true); };
  const onView = (v: ProjectView) => { setSelected(v); setShowDetail(true); };
  const onDelete = (v: ProjectView) => {
    if (confirm(`¿Eliminar proyecto "${v.project.name}"?`)) {
      setProjects(prev => prev.filter(p => p.id !== v.project.id));
    }
  };

  const onSave = (patch: Partial<Project>) => {
    if (!selected) return;
    setProjects(prev =>
      prev.map(p => p.id === selected.project.id ? { ...p, ...patch } : p)
    );
    setShowEdit(false);
    setSelected(null);
  };

  const createNewProject = () => {
    setSelected(null);
    setShowEdit(true);
  };

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
            Gestión de Proyectos
          </h1>
          <p className="text-muted mt-1">
            Panel completo de administración y seguimiento de proyectos
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

          <button 
            onClick={createNewProject}
            className="btn-living flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Proyecto</span>
          </button>
          
          <ExportProjects views={filtered} />
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
                placeholder="Buscar proyectos, líderes, ubicación..."
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
        <ProjectsDashboard projects={filtered} />
      ) : (
        <div className="space-y-6">
          {/* Filtros avanzados */}
          <AdvancedProjectFilters 
            onFilterChange={setAdvancedFilters}
            availableLeads={Array.from(new Set(views.map(v => v.lead).filter(Boolean))).map(lead => ({
              id: lead!.id,
              name: lead!.name
            }))}
          />
          
          {/* Vista de proyectos */}
          <ProjectsGridView
            projects={filtered}
            onProjectView={onView}
            onProjectEdit={onEdit}
            onProjectDelete={onDelete}
            loading={isLoading}
          />
        </div>
      )}

      {/* Modales */}
      {showEdit && (
        <ProjectModalEdit
          project={selected?.project || null}
          leads={leadCandidates}
          onSave={onSave}
          onClose={() => { setShowEdit(false); setSelected(null); }}
        />
      )}

      {showDetail && selected && (
        <ProjectDetailModal
          view={selected}
          onEdit={() => { setShowDetail(false); onEdit(selected); }}
          onClose={() => { setShowDetail(false); setSelected(null); }}
        />
      )}
    </div>
  );
}