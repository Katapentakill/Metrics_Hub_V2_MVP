// Ubicación: src/features/admin/projects/components/ProjectsGridView.tsx
// Este componente reemplaza la tabla tradicional con una vista de grid más visual

import React, { useState } from 'react';
import { Grid, List, Filter, SortDesc } from 'lucide-react';
import EnhancedProjectCard from './EnhancedProjectCard';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ProjectsGridViewProps {
  projects: ProjectView[];
  onProjectView: (project: ProjectView) => void;
  onProjectEdit: (project: ProjectView) => void;
  onProjectDelete: (project: ProjectView) => void;
  loading?: boolean;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'status' | 'progress' | 'deadline' | 'team_size';

export default function ProjectsGridView({
  projects,
  onProjectView,
  onProjectEdit,
  onProjectDelete,
  loading = false
}: ProjectsGridViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Función para ordenar proyectos
  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.project.name.localeCompare(b.project.name);
      case 'status':
        return a.project.status.localeCompare(b.project.status);
      case 'progress':
        return b.progressPct - a.progressPct;
      case 'deadline':
        if (!a.project.deadline) return 1;
        if (!b.project.deadline) return -1;
        return new Date(a.project.deadline).getTime() - new Date(b.project.deadline).getTime();
      case 'team_size':
        return b.project.current_team_size - a.project.current_team_size;
      default:
        return 0;
    }
  });

  const handleMenuToggle = (projectId: string) => {
    setOpenMenuId(openMenuId === projectId ? null : projectId);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="loading-skeleton h-8 w-48"></div>
          <div className="flex items-center space-x-2">
            <div className="loading-skeleton h-10 w-32"></div>
            <div className="loading-skeleton h-10 w-32"></div>
          </div>
        </div>
        
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="loading-skeleton h-80 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Proyectos ({projects.length})
          </h2>
          
          {/* Indicadores de estado */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-gray-600">
                {projects.filter(p => p.project.status === 'active').length} Activos
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">
                {projects.filter(p => p.project.status === 'planning').length} En planificación
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">
                {projects.filter(p => p.project.status === 'completed').length} Completados
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Ordenamiento */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="name">Ordenar por Nombre</option>
              <option value="status">Ordenar por Estado</option>
              <option value="progress">Ordenar por Progreso</option>
              <option value="deadline">Ordenar por Fecha límite</option>
              <option value="team_size">Ordenar por Tamaño equipo</option>
            </select>
            <SortDesc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          {/* Selector de vista */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Vista de tarjetas"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              title="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      {sortedProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay proyectos</h3>
          <p className="text-gray-500">No se encontraron proyectos que coincidan con los filtros aplicados.</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            /* Vista de Grid */
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {sortedProjects.map((project) => (
                <EnhancedProjectCard
                  key={project.project.id}
                  project={project}
                  onView={() => onProjectView(project)}
                  onEdit={() => onProjectEdit(project)}
                  onDelete={() => onProjectDelete(project)}
                  showMenu={openMenuId === project.project.id}
                  onMenuToggle={() => handleMenuToggle(project.project.id)}
                  menuId={project.project.id}
                />
              ))}
            </div>
          ) : (
            /* Vista de Lista Compacta */
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {sortedProjects.map((project) => (
                  <div
                    key={project.project.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {project.project.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{project.project.name}</h3>
                          <p className="text-sm text-gray-600">{project.lead?.name || 'Sin líder'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        {/* Estado */}
                        <div className="text-center">
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            project.project.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                            project.project.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                            project.project.status === 'completed' ? 'bg-green-100 text-green-800' :
                            project.project.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {project.project.status === 'active' ? 'Activo' : 
                             project.project.status === 'planning' ? 'Planificación' :
                             project.project.status === 'completed' ? 'Completado' :
                             project.project.status === 'paused' ? 'Pausado' : 'Cancelado'}
                          </div>
                        </div>
                        
                        {/* Progreso */}
                        <div className="text-center min-w-[100px]">
                          <div className="text-sm font-medium text-gray-800">{project.progressPct}%</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                              style={{ width: `${project.progressPct}%` }}
                            />
                          </div>
                        </div>
                        
                        {/* Equipo */}
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">
                            {project.project.current_team_size}/{project.project.max_team_size}
                          </div>
                          <div className="text-xs text-gray-500">Equipo</div>
                        </div>
                        
                        {/* Fecha límite */}
                        <div className="text-center min-w-[100px]">
                          {project.project.deadline ? (
                            <>
                              <div className="text-sm font-medium text-gray-800">
                                {new Date(project.project.deadline).toLocaleDateString('es-ES', { 
                                  day: '2-digit', 
                                  month: 'short' 
                                })}
                              </div>
                              <div className="text-xs text-gray-500">Fecha límite</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-400">Sin fecha</div>
                          )}
                        </div>
                        
                        {/* Acciones */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onProjectView(project)}
                            className="text-emerald-600 hover:text-emerald-700 p-1"
                            title="Ver detalles"
                          >
                            <Grid className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onProjectEdit(project)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                            title="Editar"
                          >
                            <Filter className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Estadísticas del footer */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {projects.length}
            </div>
            <div className="text-sm text-gray-600">Total Proyectos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {projects.filter(p => p.project.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Proyectos Activos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(projects.reduce((acc, p) => acc + p.progressPct, 0) / projects.length || 0)}%
            </div>
            <div className="text-sm text-gray-600">Progreso Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {projects.reduce((acc, p) => acc + (p.members?.length || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Miembros</div>
          </div>
        </div>
      </div>
    </div>
  );
}