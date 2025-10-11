// 📁 src/modules/evaluations/shared/views/EvaluationsListView.tsx
// Vista compartida de lista completa de todas las evaluaciones

"use client";

import React, { useState, useMemo } from 'react';
import { 
  Eye, 
  Edit, 
  MoreVertical, 
  Calendar, 
  User, 
  Star, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';

interface EvaluationsListViewProps {
  evaluations: EvaluationView[];
  searchTerm: string;
  onEvaluationView: (evaluation: EvaluationView) => void;
  onEvaluationEdit: (evaluation: EvaluationView) => void;
  onEvaluationDelete: (evaluation: EvaluationView) => void;
  role?: 'admin' | 'hr' | 'lead' | 'volunteer';
  currentUserId?: string;
}

type SortOption = 'name' | 'status' | 'score' | 'due_date' | 'type' | 'created_date';
type ViewMode = 'card' | 'table';

export default function EvaluationsListView({
  evaluations,
  searchTerm,
  onEvaluationView,
  onEvaluationEdit,
  onEvaluationDelete,
  role = 'admin',
  currentUserId
}: EvaluationsListViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>('created_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filtrar y ordenar evaluaciones
  const filteredAndSortedEvaluations = useMemo(() => {
    const filtered = evaluations.filter(evaluation => {
      const searchLower = searchTerm.toLowerCase();
      return (
        evaluation.evaluatedUser?.name.toLowerCase().includes(searchLower) ||
        evaluation.evaluator?.name.toLowerCase().includes(searchLower) ||
        evaluation.evaluation.type.toLowerCase().includes(searchLower) ||
        evaluation.evaluation.status.toLowerCase().includes(searchLower)
      );
    });

    // Ordenar
    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case 'name':
          compareValue = (a.evaluatedUser?.name || '').localeCompare(b.evaluatedUser?.name || '');
          break;
        case 'status':
          compareValue = a.evaluation.status.localeCompare(b.evaluation.status);
          break;
        case 'score':
          compareValue = (a.evaluation.overall_score || 0) - (b.evaluation.overall_score || 0);
          break;
        case 'due_date':
          const dateA = a.evaluation.due_date ? new Date(a.evaluation.due_date).getTime() : 0;
          const dateB = b.evaluation.due_date ? new Date(b.evaluation.due_date).getTime() : 0;
          compareValue = dateA - dateB;
          break;
        case 'type':
          compareValue = a.evaluation.type.localeCompare(b.evaluation.type);
          break;
        case 'created_date':
          const createdA = a.evaluation.created_at ? new Date(a.evaluation.created_at).getTime() : 0;
          const createdB = b.evaluation.created_at ? new Date(b.evaluation.created_at).getTime() : 0;
          compareValue = createdA - createdB;
          break;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filtered;
  }, [evaluations, searchTerm, sortBy, sortOrder]);

  // Colores de estado según la guía institucional
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-600'; // Éxito
      case 'in_progress': return 'text-blue-500 bg-blue-50 border-blue-500'; // Info/Ver
      case 'pending': return 'text-yellow-500 bg-yellow-50 border-yellow-500'; // Advertencia
      case 'overdue': return 'text-red-500 bg-red-50 border-red-500'; // Peligro
      default: return 'text-gray-600 bg-gray-50 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'in_progress': return 'En Progreso';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencida';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'performance': return 'Evaluación de Desempeño';
      case 'peer_feedback': return 'Feedback de Pares';
      case 'self_evaluation': return 'Auto-evaluación';
      case 'upward_feedback': return 'Feedback Hacia Arriba';
      case '360_feedback': return 'Feedback 360°';
      default: return type;
    }
  };

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('desc');
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Función para determinar si mostrar detalles confidenciales
  const shouldShowConfidentialDetails = (evaluation: EvaluationView) => {
    if (role === 'admin' || role === 'hr') return true;
    if (role === 'volunteer') return evaluation.evaluation.evaluated_user_id === currentUserId;
    if (role === 'lead') return evaluation.evaluation.evaluated_user_id === currentUserId;
    return false;
  };

  if (filteredAndSortedEvaluations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-50 border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {searchTerm ? 'No se encontraron evaluaciones' : 'No hay evaluaciones'}
        </h3>
        <p className="text-gray-600">
          {searchTerm 
            ? `No hay evaluaciones que coincidan con "${searchTerm}"`
            : 'Aún no se han creado evaluaciones en el sistema'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controles de vista */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Todas las Evaluaciones ({filteredAndSortedEvaluations.length})
          </h3>
          
          {/* Selector de ordenamiento */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as SortOption);
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
            >
              <option value="created_date-desc">Más recientes</option>
              <option value="created_date-asc">Más antiguas</option>
              <option value="name-asc">Por nombre (A-Z)</option>
              <option value="name-desc">Por nombre (Z-A)</option>
              <option value="status-asc">Por estado</option>
              <option value="score-desc">Mayor puntuación</option>
              <option value="score-asc">Menor puntuación</option>
              <option value="due_date-asc">Próximas a vencer</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Controles de vista */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'card' 
                ? 'bg-green-50 text-green-800' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'table' 
                ? 'bg-green-50 text-green-800' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="w-4 h-4 flex flex-col gap-0.5">
              <div className="bg-current h-0.5 rounded-sm"></div>
              <div className="bg-current h-0.5 rounded-sm"></div>
              <div className="bg-current h-0.5 rounded-sm"></div>
              <div className="bg-current h-0.5 rounded-sm"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Vista en tarjetas - Fondo green-50, bordes teal-500 */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedEvaluations.map((evaluation) => (
            <div
              key={evaluation.evaluation.id}
              className="bg-green-50 border-2 border-teal-500 rounded-xl p-6 hover:shadow-lg hover:border-green-800 transition-all cursor-pointer group"
              onClick={() => onEvaluationView(evaluation)}
            >
              {/* Header de la evaluación */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-800 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                    {getInitials(evaluation.evaluatedUser?.name || 'Usuario')}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-green-800 transition-colors">
                      {evaluation.evaluatedUser?.name || 'Usuario no encontrado'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getTypeLabel(evaluation.evaluation.type)}
                    </p>
                  </div>
                </div>
                
                {/* Menú de acciones */}
                {shouldShowConfidentialDetails(evaluation) && (
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setOpenMenuId(openMenuId === evaluation.evaluation.id ? null : evaluation.evaluation.id)}
                      className="p-2 text-slate-400 hover:text-green-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    {openMenuId === evaluation.evaluation.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-green-50 border border-teal-500 rounded-lg shadow-lg z-20">
                        <button
                          onClick={() => onEvaluationView(evaluation)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white text-sm rounded-t-lg"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600">Ver evaluación</span>
                        </button>
                        <button
                          onClick={() => onEvaluationEdit(evaluation)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white text-sm"
                        >
                          <Edit className="w-4 h-4 text-slate-600" />
                          <span className="text-gray-600">Editar evaluación</span>
                        </button>
                        <button
                          onClick={() => onEvaluationDelete(evaluation)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50 text-sm border-t border-slate-200 rounded-b-lg"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-red-500">Eliminar</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Estado y puntuación */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(evaluation.evaluation.status)}`}>
                  {getStatusLabel(evaluation.evaluation.status)}
                </span>
                <div className="text-right">
                  {shouldShowConfidentialDetails(evaluation) ? (
                    <>
                      <div className="text-lg font-bold text-slate-800">
                        {evaluation.evaluation.overall_score ? `${evaluation.evaluation.overall_score}/5.0` : 'Pendiente'}
                      </div>
                      <div className="text-xs text-gray-600">Puntuación</div>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-bold text-gray-600">
                        {evaluation.evaluation.status === 'completed' ? 'Completada' : 'En proceso'}
                      </div>
                      <div className="text-xs text-gray-600">Estado</div>
                    </>
                  )}
                </div>
              </div>

              {/* Evaluador */}
              {shouldShowConfidentialDetails(evaluation) && (
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-gray-600">
                    Evaluador: {evaluation.evaluator?.name || 'Sin asignar'}
                  </span>
                </div>
              )}

              {/* Fecha límite */}
              {evaluation.evaluation.due_date && shouldShowConfidentialDetails(evaluation) && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    Vence: {new Date(evaluation.evaluation.due_date).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Vista en tabla - Fondo green-50, bordes teal-500 */}
      {viewMode === 'table' && (
        <div className="bg-green-50 rounded-xl shadow-sm border border-teal-500 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-white">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('name')}
                  >
                    Usuario Evaluado
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('type')}
                  >
                    Tipo
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('status')}
                  >
                    Estado
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('score')}
                  >
                    Puntuación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Evaluador
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('due_date')}
                  >
                    Fecha Límite
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredAndSortedEvaluations.map((evaluation) => (
                  <tr 
                    key={evaluation.evaluation.id} 
                    className="hover:bg-green-50 cursor-pointer transition-colors"
                    onClick={() => onEvaluationView(evaluation)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {getInitials(evaluation.evaluatedUser?.name || 'Usuario')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-slate-800">
                            {evaluation.evaluatedUser?.name || 'Usuario no encontrado'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {evaluation.evaluatedUser?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {getTypeLabel(evaluation.evaluation.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(evaluation.evaluation.status)}`}>
                        {getStatusLabel(evaluation.evaluation.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">
                      {evaluation.evaluation.overall_score ? `${evaluation.evaluation.overall_score}/5.0` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {evaluation.evaluator?.name || 'Sin asignar'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {evaluation.evaluation.due_date 
                        ? new Date(evaluation.evaluation.due_date).toLocaleDateString('es-ES')
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onEvaluationView(evaluation)}
                          className="text-blue-500 hover:text-blue-600 p-1 rounded transition-colors"
                          title="Ver evaluación"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEvaluationEdit(evaluation)}
                          className="text-slate-600 hover:text-green-800 p-1 rounded transition-colors"
                          title="Editar evaluación"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}