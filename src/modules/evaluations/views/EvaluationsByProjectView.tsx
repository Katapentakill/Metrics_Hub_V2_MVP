// 📁 src/modules/evaluations/shared/views/EvaluationsByProjectView.tsx
// Vista compartida de evaluaciones agrupadas por proyecto

"use client";

import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Eye, 
  MapPin, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Award
} from 'lucide-react';
import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';
import type { ExtendedUserWithProfile } from '@/lib/types';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'planning' | 'on_hold' | 'cancelled';
  team_members: string[];
  lead_id: string;
  start_date: string;
  end_date: string;
  progress: number;
  location: string;
}

interface EvaluationsByProjectViewProps {
  evaluations: EvaluationView[];
  projects: Project[];
  users: ExtendedUserWithProfile[];
  searchTerm: string;
  onProjectView: (projectId: string) => void;
  onEvaluationView: (evaluation: EvaluationView) => void;
}

interface ProjectWithEvaluations {
  project: Project;
  evaluations: EvaluationView[];
  teamMembers: ExtendedUserWithProfile[];
  stats: {
    totalEvaluations: number;
    completedEvaluations: number;
    pendingEvaluations: number;
    overdueEvaluations: number;
    averageScore: number;
    teamCoverage: number;
  };
}

export default function EvaluationsByProjectView({
  evaluations,
  projects,
  users,
  searchTerm,
  onProjectView,
  onEvaluationView
}: EvaluationsByProjectViewProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'evaluations' | 'coverage' | 'score'>('name');

  // Procesar proyectos con sus evaluaciones
  const projectsWithEvaluations = useMemo(() => {
    const projectEvaluationMap: ProjectWithEvaluations[] = projects.map(project => {
      const projectEvals = evaluations.filter(evaluation => 
        project.team_members.includes(evaluation.evaluation.evaluated_user_id)
      );

      const teamMembers = users.filter(user => project.team_members.includes(user.id));

      const completedEvals = projectEvals.filter(evaluation => evaluation.evaluation.status === 'completed');
      const pendingEvals = projectEvals.filter(evaluation => evaluation.evaluation.status === 'pending');
      const overdueEvals = projectEvals.filter(evaluation => evaluation.evaluation.status === 'overdue');
      
      const scoresEvals = projectEvals.filter(evaluation => evaluation.evaluation.overall_score);
      const averageScore = scoresEvals.length > 0 
        ? scoresEvals.reduce((acc, evaluation) => acc + (evaluation.evaluation.overall_score || 0), 0) / scoresEvals.length
        : 0;

      const membersWithEvaluations = new Set(projectEvals.map(evaluation => evaluation.evaluation.evaluated_user_id));
      const teamCoverage = project.team_members.length > 0 
        ? (membersWithEvaluations.size / project.team_members.length) * 100 
        : 0;

      return {
        project,
        evaluations: projectEvals,
        teamMembers,
        stats: {
          totalEvaluations: projectEvals.length,
          completedEvaluations: completedEvals.length,
          pendingEvaluations: pendingEvals.length,
          overdueEvaluations: overdueEvals.length,
          averageScore,
          teamCoverage
        }
      };
    });

    const filtered = projectEvaluationMap.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.project.name.toLowerCase().includes(searchLower) ||
        item.project.description.toLowerCase().includes(searchLower) ||
        item.project.location.toLowerCase().includes(searchLower) ||
        item.project.status.toLowerCase().includes(searchLower)
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.project.name.localeCompare(b.project.name);
        case 'evaluations':
          return b.stats.totalEvaluations - a.stats.totalEvaluations;
        case 'coverage':
          return b.stats.teamCoverage - a.stats.teamCoverage;
        case 'score':
          return b.stats.averageScore - a.stats.averageScore;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, evaluations, users, searchTerm, sortBy]);

  const toggleProjectExpansion = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const getProjectStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-600 border-emerald-600';
      case 'completed': return 'bg-blue-50 text-blue-500 border-blue-500';
      case 'planning': return 'bg-yellow-50 text-yellow-500 border-yellow-500';
      case 'on_hold': return 'bg-gray-50 text-gray-600 border-slate-200';
      case 'cancelled': return 'bg-red-50 text-red-500 border-red-500';
      default: return 'bg-gray-50 text-gray-600 border-slate-200';
    }
  };

  const getProjectStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'completed': return 'Completado';
      case 'planning': return 'Planificación';
      case 'on_hold': return 'Pausado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-600';
      case 'in_progress': return 'text-blue-500 bg-blue-50 border-blue-500';
      case 'pending': return 'text-yellow-500 bg-yellow-50 border-yellow-500';
      case 'overdue': return 'text-red-500 bg-red-50 border-red-500';
      default: return 'text-gray-600 bg-gray-50 border-slate-200';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  if (projectsWithEvaluations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {searchTerm ? 'No se encontraron proyectos' : 'No hay proyectos'}
        </h3>
        <p className="text-gray-600">
          {searchTerm 
            ? `No hay proyectos que coincidan con "${searchTerm}"`
            : 'No hay proyectos registrados en el sistema'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">
          Por Proyecto ({projectsWithEvaluations.length} proyectos)
        </h3>
        
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
          >
            <option value="name">Nombre del proyecto</option>
            <option value="evaluations">Cantidad de evaluaciones</option>
            <option value="coverage">Cobertura del equipo</option>
            <option value="score">Promedio de puntuación</option>
          </select>
        </div>
      </div>

      {/* Lista de proyectos - Fondo green-50, bordes teal-500 */}
      <div className="space-y-4">
        {projectsWithEvaluations.map((projectWithEvals) => (
          <div key={projectWithEvals.project.id} className="bg-green-50 border-2 border-teal-500 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Header del proyecto */}
            <div 
              className="p-6 cursor-pointer hover:bg-white transition-colors"
              onClick={() => toggleProjectExpansion(projectWithEvals.project.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {expandedProjects.has(projectWithEvals.project.id) ? (
                      <ChevronDown className="w-5 h-5 text-slate-400 hover:text-green-800" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 hover:text-green-800" />
                    )}
                    <Briefcase className="w-5 h-5 text-green-800" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">{projectWithEvals.project.name}</h4>
                    <p className="text-sm text-gray-600">{projectWithEvals.project.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-gray-600">{projectWithEvals.project.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-gray-600">{projectWithEvals.project.team_members.length} miembros</span>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getProjectStatusColor(projectWithEvals.project.status)}`}>
                        {getProjectStatusLabel(projectWithEvals.project.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estadísticas del proyecto */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{projectWithEvals.stats.totalEvaluations}</div>
                    <div className="text-xs text-gray-600">Evaluaciones</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{projectWithEvals.stats.completedEvaluations}</div>
                    <div className="text-xs text-gray-600">Completadas</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-500">
                      {projectWithEvals.stats.teamCoverage.toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-600">Cobertura</div>
                  </div>

                  {projectWithEvals.stats.averageScore > 0 && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-500">
                        {projectWithEvals.stats.averageScore.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-600">Promedio</div>
                    </div>
                  )}

                  {projectWithEvals.stats.overdueEvaluations > 0 && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-500">{projectWithEvals.stats.overdueEvaluations}</div>
                      <div className="text-xs text-gray-600">Vencidas</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Barra de progreso de cobertura */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Cobertura del equipo</span>
                  <span className="font-semibold text-slate-800">
                    {projectWithEvals.stats.teamCoverage.toFixed(0)}% ({new Set(projectWithEvals.evaluations.map(e => e.evaluation.evaluated_user_id)).size}/{projectWithEvals.project.team_members.length} miembros)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-800 to-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${projectWithEvals.stats.teamCoverage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Contenido expandido */}
            {expandedProjects.has(projectWithEvals.project.id) && (
              <div className="border-t border-slate-200 bg-white">
                {projectWithEvals.evaluations.length === 0 ? (
                  <div className="p-8 text-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-3">Este proyecto aún no tiene evaluaciones</p>
                    <p className="text-sm text-gray-600">
                      Miembros del equipo: {projectWithEvals.teamMembers.map(member => member.name).join(', ')}
                    </p>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Miembros del equipo con sus evaluaciones */}
                    <div>
                      <h5 className="font-bold text-slate-800 mb-4">Evaluaciones por Miembro</h5>
                      <div className="space-y-4">
                        {projectWithEvals.teamMembers.map(member => {
                          const memberEvaluations = projectWithEvals.evaluations.filter(
                            evaluation => evaluation.evaluation.evaluated_user_id === member.id
                          );

                          return (
                            <div key={member.id} className="bg-green-50 border-2 border-slate-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-800 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                    {getInitials(member.name)}
                                  </div>
                                  <div>
                                    <h6 className="font-semibold text-slate-800">{member.name}</h6>
                                    <p className="text-sm text-gray-600">{member.email}</p>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {memberEvaluations.length} evaluación{memberEvaluations.length !== 1 ? 'es' : ''}
                                </div>
                              </div>

                              {memberEvaluations.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {memberEvaluations.map((evaluation) => (
                                    <div
                                      key={evaluation.evaluation.id}
                                      onClick={() => onEvaluationView(evaluation)}
                                      className="bg-white border-2 border-slate-200 rounded-lg p-3 hover:bg-green-50 hover:border-teal-500 transition-all cursor-pointer"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-slate-800">
                                          {evaluation.evaluation.type === 'performance' ? 'Desempeño' :
                                           evaluation.evaluation.type === 'peer_feedback' ? 'Pares' :
                                           evaluation.evaluation.type === 'self_evaluation' ? 'Auto-eval' :
                                           evaluation.evaluation.type === 'upward_feedback' ? 'Hacia Arriba' :
                                           '360°'}
                                        </span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(evaluation.evaluation.status)}`}>
                                          {evaluation.evaluation.status === 'completed' ? 'Completada' :
                                           evaluation.evaluation.status === 'in_progress' ? 'En Progreso' :
                                           evaluation.evaluation.status === 'pending' ? 'Pendiente' : 'Vencida'}
                                        </span>
                                      </div>

                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-3 h-3 text-yellow-500" />
                                          <span className="text-xs text-gray-600">
                                            {evaluation.evaluation.overall_score ? `${evaluation.evaluation.overall_score}/5.0` : 'Pendiente'}
                                          </span>
                                        </div>
                                        {evaluation.evaluation.due_date && (
                                          <span className="text-xs text-gray-600">
                                            {new Date(evaluation.evaluation.due_date).toLocaleDateString('es-ES')}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4 text-slate-400">
                                  <Clock className="w-6 h-6 mx-auto mb-2" />
                                  <p className="text-sm">Sin evaluaciones</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}