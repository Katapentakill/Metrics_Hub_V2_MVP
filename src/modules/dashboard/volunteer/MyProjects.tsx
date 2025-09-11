'use client';

import { FolderOpen, Users, Calendar, TrendingUp } from 'lucide-react';

/**
 * Representa un proyecto en el que participa un voluntario.
 */
interface VolunteerProject {
  /** Identificador único del proyecto */
  id: string;
  /** Nombre del proyecto */
  name: string;
  /** Descripción breve del proyecto */
  description: string;
  /** Avance del proyecto en porcentaje (0–100) */
  progress: number;
  /** Rol del voluntario dentro del proyecto */
  role: string;
  /** Cantidad de personas que conforman el equipo */
  team_size: number;
  /** Fecha límite de entrega (formato ISO: YYYY-MM-DD) */
  deadline: string;
  /** Estado actual del proyecto */
  status: 'active' | 'finishing';
  /** Nivel de prioridad asignado al proyecto */
  priority: 'high' | 'medium';
  /** Color representativo del proyecto */
  color: string;
}


/**
 * MyProjects Component
 *
 * Muestra la **lista de proyectos en los que participa un voluntario**.
 * Incluye progreso, rol dentro del proyecto, tamaño del equipo, deadline
 * y estado general. También proporciona estadísticas rápidas y accesos directos.
 *
 * @component
 * @example
 * <MyProjects />
 */
export default function MyProjects() {
  /** Datos ficticios de proyectos del voluntario */
  const projects: VolunteerProject[] = [
    {
      id: '1',
      name: 'EcoVerde',
      description: 'Proyecto de reforestación urbana',
      progress: 75,
      role: 'Coordinador de Campo',
      team_size: 8,
      deadline: '2025-10-15',
      status: 'active',
      priority: 'high',
      color: 'green'
    },
    {
      id: '2',
      name: 'TechEdu',
      description: 'Educación tecnológica para jóvenes',
      progress: 45,
      role: 'Mentor',
      team_size: 12,
      deadline: '2025-11-30',
      status: 'active',
      priority: 'medium',
      color: 'blue'
    },
    {
      id: '3',
      name: 'HealthConnect',
      description: 'Conectando comunidades con salud',
      progress: 90,
      role: 'Asistente de Datos',
      team_size: 6,
      deadline: '2025-09-20',
      status: 'finishing',
      priority: 'high',
      color: 'purple'
    }
  ];

  /**
   * Devuelve las clases de color para un estado de proyecto.
   *
   * @param status Estado del proyecto
   * @returns {string} Clases de Tailwind CSS
   */
  const getStatusColor = (status: 'active' | 'finishing') => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'finishing': return 'text-green-600 bg-green-100';
    }
  };

  /**
   * Devuelve el texto legible para un estado de proyecto.
   *
   * @param status Estado del proyecto
   * @returns {string} Texto descriptivo
   */
  const getStatusText = (status: 'active' | 'finishing') => {
    switch (status) {
      case 'active': return 'Activo';
      case 'finishing': return 'Finalizando';
    }
  };

  /**
   * Formatea una fecha en formato legible en español.
   *
   * @param dateString Fecha en formato ISO
   * @returns {string} Fecha formateada
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  /**
   * Retorna el gradiente de color correspondiente al progreso del proyecto.
   *
   * @param progress Número entre 0 y 100
   * @returns {string} Clases de Tailwind CSS
   */
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 50) return 'from-blue-500 to-blue-600';
    return 'from-yellow-500 to-yellow-600';
  };

  return (
    <div className="card p-6">
      {/* Header con contador de proyectos */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FolderOpen className="w-5 h-5 text-living-green-600" />
          <h3 className="text-lg font-semibold text-slate-800">Mis Proyectos</h3>
        </div>
        <span className="text-sm text-slate-500">{projects.length} proyectos activos</span>
      </div>

      {/* Resumen de progreso general */}
      <div className="bg-gradient-to-r from-living-green-50 to-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700">Progreso General</span>
          <span className="text-sm font-bold text-slate-800">
            {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
          </span>
        </div>
        <div className="w-full bg-white rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-living-green-500 to-living-green-600 h-2 rounded-full"
            style={{ 
              width: `${Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Lista de proyectos */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            {/* Encabezado del proyecto */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-semibold text-slate-800">{project.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {getStatusText(project.status)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{project.description}</p>
                <p className="text-xs font-medium text-slate-700">Mi rol: {project.role}</p>
              </div>
            </div>

            {/* Progreso */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-600">Progreso</span>
                <span className="text-xs font-medium text-slate-800">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${getProgressColor(project.progress)} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Info adicional */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{project.team_size} personas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(project.deadline)}</span>
                </div>
              </div>
              {project.status === 'finishing' && (
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">Casi terminado</span>
                </div>
              )}
            </div>

            {/* Acciones rápidas */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <button className="text-xs text-living-green-600 hover:text-living-green-700 font-medium">
                  Ver detalles →
                </button>
                <div className="flex space-x-2">
                  <button className="text-xs text-slate-600 hover:text-slate-700">
                    Tareas
                  </button>
                  <button className="text-xs text-slate-600 hover:text-slate-700">
                    Equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas rápidas */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-slate-800">
              {projects.reduce((sum, p) => sum + p.team_size, 0)}
            </div>
            <div className="text-xs text-slate-600">Compañeros de equipo</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-slate-800">
              {projects.filter(p => p.progress >= 90).length}
            </div>
            <div className="text-xs text-slate-600">Proyectos casi listos</div>
          </div>
        </div>
      </div>

      {/* Enlace a ver todos */}
      <div className="mt-4 text-center">
        <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
          Ver todos mis proyectos →
        </button>
      </div>
    </div>
  );
}