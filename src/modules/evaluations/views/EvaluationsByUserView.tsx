// 📁 src/modules/evaluations/shared/views/EvaluationsByUserView.tsx
// Vista compartida de evaluaciones agrupadas por usuario

"use client";

import React, { useState, useMemo } from 'react';
import { 
  User, 
  Eye, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  BarChart3
} from 'lucide-react';
import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';
import type { ExtendedUserWithProfile } from '@/lib/types';

interface EvaluationsByUserViewProps {
  evaluations: EvaluationView[];
  users: ExtendedUserWithProfile[];
  searchTerm: string;
  onUserView: (userId: string) => void;
  onEvaluationView: (evaluation: EvaluationView) => void;
}

interface UserWithEvaluations {
  user: ExtendedUserWithProfile;
  evaluations: EvaluationView[];
  stats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    averageScore: number;
    lastEvaluationDate?: string;
    trend: 'improving' | 'declining' | 'stable';
  };
}

export default function EvaluationsByUserView({
  evaluations,
  users,
  searchTerm,
  onUserView,
  onEvaluationView
}: EvaluationsByUserViewProps) {
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'evaluations' | 'score' | 'recent'>('name');

  // Procesar usuarios con sus evaluaciones
  const usersWithEvaluations = useMemo(() => {
    const userEvaluationMap: UserWithEvaluations[] = users.map(user => {
      const userEvals = evaluations.filter(evaluation => evaluation.evaluation.evaluated_user_id === user.id);
      const completedEvals = userEvals.filter(evaluation => evaluation.evaluation.status === 'completed');
      const pendingEvals = userEvals.filter(evaluation => evaluation.evaluation.status === 'pending');
      const overdueEvals = userEvals.filter(evaluation => evaluation.evaluation.status === 'overdue');
      
      const scoresEvals = userEvals.filter(evaluation => evaluation.evaluation.overall_score);
      const averageScore = scoresEvals.length > 0 
        ? scoresEvals.reduce((acc, evaluation) => acc + (evaluation.evaluation.overall_score || 0), 0) / scoresEvals.length
        : 0;

      // Calcular tendencia básica
      let trend: 'improving' | 'declining' | 'stable' = 'stable';
      if (scoresEvals.length >= 2) {
        const recent = scoresEvals.slice(-2);
        const scoreDiff = (recent[1].evaluation.overall_score || 0) - (recent[0].evaluation.overall_score || 0);
        if (scoreDiff > 0.2) trend = 'improving';
        else if (scoreDiff < -0.2) trend = 'declining';
      }

      const lastEval = userEvals
        .filter(evaluation => evaluation.evaluation.completed_date)
        .sort((a, b) => new Date(b.evaluation.completed_date!).getTime() - new Date(a.evaluation.completed_date!).getTime())[0];

      return {
        user,
        evaluations: userEvals,
        stats: {
          total: userEvals.length,
          completed: completedEvals.length,
          pending: pendingEvals.length,
          overdue: overdueEvals.length,
          averageScore,
          lastEvaluationDate: lastEval?.evaluation.completed_date,
          trend
        }
      };
    });

    // Filtrar por búsqueda
    const filtered = userEvaluationMap.filter(item => {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.user.name.toLowerCase().includes(searchLower) ||
        item.user.email.toLowerCase().includes(searchLower) ||
        item.user.role.toLowerCase().includes(searchLower)
      );
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.user.name.localeCompare(b.user.name);
        case 'evaluations':
          return b.stats.total - a.stats.total;
        case 'score':
          return b.stats.averageScore - a.stats.averageScore;
        case 'recent':
          const dateA = a.stats.lastEvaluationDate ? new Date(a.stats.lastEvaluationDate).getTime() : 0;
          const dateB = b.stats.lastEvaluationDate ? new Date(b.stats.lastEvaluationDate).getTime() : 0;
          return dateB - dateA;
        default:
          return 0;
      }
    });

    return filtered;
  }, [users, evaluations, searchTerm, sortBy]);

  const toggleUserExpansion = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Administrador',
      hr: 'Recursos Humanos',
      lead: 'Líder de Proyecto',
      member: 'Miembro',
      volunteer: 'Voluntario'
    };
    return labels[role] || role;
  };

  const getTrendIcon = (trend: 'improving' | 'declining' | 'stable') => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-teal-500" />;
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'performance': return 'Desempeño';
      case 'peer_feedback': return 'Pares';
      case 'self_evaluation': return 'Auto-eval';
      case 'upward_feedback': return 'Hacia Arriba';
      case '360_feedback': return '360°';
      default: return type;
    }
  };

  if (usersWithEvaluations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios'}
        </h3>
        <p className="text-gray-600">
          {searchTerm 
            ? `No hay usuarios que coincidan con "${searchTerm}"`
            : 'No hay usuarios registrados en el sistema'
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
          Por Usuario ({usersWithEvaluations.length} usuarios)
        </h3>
        
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600">Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-gray-600 bg-white focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 outline-none"
          >
            <option value="name">Nombre</option>
            <option value="evaluations">Cantidad de evaluaciones</option>
            <option value="score">Promedio de puntuación</option>
            <option value="recent">Más recientes</option>
          </select>
        </div>
      </div>

      {/* Lista de usuarios - Fondo green-50, bordes teal-500 */}
      <div className="space-y-4">
        {usersWithEvaluations.map((userWithEvals) => (
          <div key={userWithEvals.user.id} className="bg-green-50 border-2 border-teal-500 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Header del usuario */}
            <div 
              className="p-6 cursor-pointer hover:bg-white transition-colors"
              onClick={() => toggleUserExpansion(userWithEvals.user.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Botón expandir/contraer */}
                  <button className="text-slate-400 hover:text-green-800 transition-colors">
                    {expandedUsers.has(userWithEvals.user.id) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>

                  {/* Avatar y info del usuario - Gradiente institucional */}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-800 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                    {getInitials(userWithEvals.user.name)}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-800 flex items-center space-x-2">
                      <span>{userWithEvals.user.name}</span>
                      {getTrendIcon(userWithEvals.stats.trend)}
                    </h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{userWithEvals.user.email}</span>
                      <span>•</span>
                      <span>{getRoleLabel(userWithEvals.user.role)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUserView(userWithEvals.user.id);
                        }}
                        className="text-blue-500 hover:text-blue-600 flex items-center space-x-1 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Ver perfil</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Estadísticas del usuario */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-800">{userWithEvals.stats.total}</div>
                    <div className="text-xs text-gray-600">Evaluaciones</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600">{userWithEvals.stats.completed}</div>
                    <div className="text-xs text-gray-600">Completadas</div>
                  </div>
                  
                  {userWithEvals.stats.averageScore > 0 && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-teal-500">
                        {userWithEvals.stats.averageScore.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-600">Promedio</div>
                    </div>
                  )}

                  {userWithEvals.stats.overdue > 0 && (
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-500">{userWithEvals.stats.overdue}</div>
                      <div className="text-xs text-gray-600">Vencidas</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lista de evaluaciones expandida */}
            {expandedUsers.has(userWithEvals.user.id) && (
              <div className="border-t border-slate-200 bg-white">
                {userWithEvals.evaluations.length === 0 ? (
                  <div className="p-8 text-center">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-gray-600">Este usuario aún no tiene evaluaciones</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userWithEvals.evaluations.map((evaluation) => (
                        <div
                          key={evaluation.evaluation.id}
                          onClick={() => onEvaluationView(evaluation)}
                          className="bg-green-50 border-2 border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-teal-500 transition-all cursor-pointer"
                        >
                          {/* Tipo y estado */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-slate-800">
                              {getTypeLabel(evaluation.evaluation.type)}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(evaluation.evaluation.status)}`}>
                              {evaluation.evaluation.status === 'completed' ? 'Completada' :
                               evaluation.evaluation.status === 'in_progress' ? 'En Progreso' :
                               evaluation.evaluation.status === 'pending' ? 'Pendiente' : 'Vencida'}
                            </span>
                          </div>

                          {/* Puntuación */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-600">Puntuación</span>
                            </div>
                            <span className="font-semibold text-slate-800">
                              {evaluation.evaluation.overall_score ? `${evaluation.evaluation.overall_score}/5.0` : 'Pendiente'}
                            </span>
                          </div>

                          {/* Evaluador */}
                          <div className="flex items-center space-x-2 mb-3">
                            <User className="w-4 h-4 text-slate-400" />
                            <span className="text-xs text-gray-600">
                              {evaluation.evaluator?.name || 'Sin evaluador'}
                            </span>
                          </div>

                          {/* Fecha */}
                          {evaluation.evaluation.due_date && (
                            <div className="text-xs text-gray-600">
                              Vence: {new Date(evaluation.evaluation.due_date).toLocaleDateString('es-ES')}
                            </div>
                          )}
                        </div>
                      ))}
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