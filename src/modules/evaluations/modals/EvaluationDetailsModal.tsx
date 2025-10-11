// 📁 src/modules/evaluations/shared/modals/EvaluationDetailsModal.tsx
// Modal compartido para mostrar detalles de evaluaciones

'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Calendar, 
  User, 
  FileText, 
  TrendingUp,
  MessageSquare,
  Target,
  CheckCircle,
  Edit,
  Trash2,
  Mail,
  Eye,
  Download,
  AlertTriangle
} from 'lucide-react';
import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';

interface EvaluationDetailsModalProps {
  evaluation: EvaluationView;
  onClose: () => void;
  onEdit?: (evaluation: EvaluationView) => void;
  onDelete?: (evaluation: EvaluationView) => void;
  role?: 'admin' | 'hr' | 'lead' | 'volunteer';
  theme?: 'institutional';
}

interface EvaluationDetails {
  overall_score: number;
  completion_date: string;
  period: string;
  evaluator: string;
  evaluated_user: string;
  project_context: string;
  type: string;
  status: string;
  criteria_scores: Record<string, number>;
  summary_feedback: string;
  detailed_feedback: string;
  key_strengths: string[];
  areas_for_improvement: string[];
  goals_for_next_period: string[];
  recommended_training: string[];
  achievements: string;
  challenges: string;
  previous_period_comparison?: {
    score_difference: number;
    improvement_notes: string;
  };
}

export default function EvaluationDetailsModal({ 
  evaluation, 
  onClose, 
  onEdit, 
  onDelete,
  role = 'admin',
  theme = 'institutional'
}: EvaluationDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<EvaluationDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'criteria' | 'feedback' | 'history'>('overview');

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockDetails: EvaluationDetails = {
        overall_score: evaluation.evaluation.overall_score || 4.2,
        completion_date: evaluation.evaluation.completed_date || new Date().toISOString(),
        period: evaluation.period?.name || 'Q3 2024',
        evaluator: evaluation.evaluator?.name || 'Ana García',
        evaluated_user: evaluation.evaluatedUser?.name || 'Usuario',
        project_context: 'Evaluación general',
        type: evaluation.evaluation.type,
        status: evaluation.evaluation.status,
        criteria_scores: {
          'Liderazgo': 4.5,
          'Comunicación': 4.0,
          'Trabajo en equipo': 4.3,
          'Resolución de problemas': 4.1,
          'Gestión del tiempo': 3.8,
          'Adaptabilidad': 4.4
        },
        summary_feedback: "El desempeño general ha sido excepcional, demostrando consistencia en la calidad del trabajo y liderazgo efectivo del equipo de voluntarios.",
        detailed_feedback: "Durante este período de evaluación, se ha observado un desempeño sobresaliente en múltiples áreas. La capacidad de liderazgo se ha manifestado claramente en la gestión exitosa del proyecto, donde ha logrado mantener la motivación del equipo incluso en momentos desafiantes. La comunicación ha sido clara y efectiva, facilitando la coordinación entre diferentes grupos de trabajo. Se destaca especialmente la iniciativa proactiva para resolver conflictos y la adaptabilidad ante cambios inesperados en los recursos disponibles.",
        key_strengths: [
          "Excelente capacidad de liderazgo y motivación del equipo",
          "Comunicación clara y efectiva en todas las interacciones",
          "Gestión proactiva de recursos y resolución de problemas",
          "Alta adaptabilidad ante cambios y situaciones imprevistas",
          "Compromiso excepcional con los objetivos de la organización"
        ],
        areas_for_improvement: [
          "Mejorar la documentación de procesos y decisiones",
          "Desarrollar habilidades de delegación más estructurada",
          "Fortalecer el seguimiento de métricas de impacto a largo plazo",
          "Implementar sistemas de feedback más regulares con el equipo"
        ],
        goals_for_next_period: [
          "Implementar un sistema de documentación de procesos estándar",
          "Desarrollar un programa de mentoría para nuevos voluntarios",
          "Establecer métricas de impacto cuantificables para el proyecto",
          "Crear un protocolo de feedback continuo con el equipo"
        ],
        recommended_training: [
          "Taller de documentación de procesos organizacionales",
          "Curso de técnicas avanzadas de delegación",
          "Capacitación en análisis de datos de impacto social",
          "Seminario de liderazgo transformacional"
        ],
        achievements: "Completó exitosamente el proyecto de biblioteca comunitaria, superando las metas de participación en un 20%. Implementó un nuevo sistema de voluntariado que aumentó la retención en un 35%.",
        challenges: "Enfrentó limitaciones presupuestarias que requirieron una reestructuración del proyecto a mitad de período. Manejó la situación con creatividad y logró mantener los objetivos principales.",
        previous_period_comparison: {
          score_difference: 0.3,
          improvement_notes: "Mejora notable en comparación con el período anterior, especialmente en las áreas de liderazgo y gestión de proyectos."
        }
      };
      
      setDetails(mockDetails);
      setIsLoading(false);
    };
    
    loadDetails();
  }, [evaluation]);

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'pending': return 'Pendiente';
      case 'in_progress': return 'En Progreso';
      case 'overdue': return 'Vencida';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-600';
      case 'pending': return 'bg-yellow-50 text-yellow-500 border-yellow-500';
      case 'in_progress': return 'bg-blue-50 text-blue-500 border-blue-500';
      case 'overdue': return 'bg-red-50 text-red-500 border-red-500';
      default: return 'bg-gray-50 text-gray-600 border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 3.5) return 'text-teal-500';
    if (score >= 2.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return 'Excepcional';
    if (score >= 3.5) return 'Muy Bueno';
    if (score >= 2.5) return 'Satisfactorio';
    if (score >= 1.5) return 'Necesita Mejora';
    return 'Insatisfactorio';
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Eye },
    { id: 'criteria', label: 'Criterios', icon: Star },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'history', label: 'Historial', icon: Calendar }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header - Gradiente institucional */}
        <div className="bg-gradient-to-r from-green-800 to-emerald-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Detalles de Evaluación</h2>
              <p className="text-green-100 text-sm">
                {getTypeLabel(evaluation.evaluation.type)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(evaluation)}
                  className="p-2 hover:bg-green-700 rounded-lg transition-colors"
                  title="Editar evaluación"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <button
                className="p-2 hover:bg-green-700 rounded-lg transition-colors"
                title="Descargar reporte"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-green-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Información básica */}
        <div className="bg-green-50 border-b border-teal-500 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Evaluado</p>
              <p className="font-semibold text-slate-800">{evaluation.evaluatedUser?.name || 'Usuario'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Estado</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(evaluation.evaluation.status)}`}>
                {getStatusLabel(evaluation.evaluation.status)}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Puntuación</p>
              {details && (
                <div className="flex items-baseline space-x-1">
                  <span className={`text-lg font-bold ${getScoreColor(details.overall_score)}`}>
                    {details.overall_score.toFixed(1)}
                  </span>
                  <span className="text-gray-600 text-sm">/5.0</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide font-semibold">Fecha</p>
              <p className="font-semibold text-slate-800">
                {details ? formatDate(details.completion_date) : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-white">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-green-800 border-green-800 bg-green-50 border-b-2'
                    : 'text-gray-600 hover:text-slate-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-50 h-4 rounded animate-pulse" />
              ))}
            </div>
          ) : details ? (
            <div className="p-6">
              
              {/* Tab: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Información General */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-semibold text-gray-600">Período</span>
                        </div>
                        <p className="text-slate-800 font-semibold">{details.period}</p>
                      </div>

                      <div className="bg-green-50 border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-semibold text-gray-600">Evaluador</span>
                        </div>
                        <p className="text-slate-800 font-semibold">{details.evaluator}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-teal-500 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className="w-4 h-4 text-green-800" />
                          <span className="text-sm font-semibold text-green-800">Puntuación General</span>
                        </div>
                        <div className="flex items-baseline space-x-2">
                          <span className={`text-3xl font-bold ${getScoreColor(details.overall_score)}`}>
                            {details.overall_score.toFixed(1)}
                          </span>
                          <span className="text-gray-600">/5.0</span>
                          <span className={`text-sm font-semibold ${getScoreColor(details.overall_score)}`}>
                            ({getScoreLabel(details.overall_score)})
                          </span>
                        </div>
                        {details.previous_period_comparison && (
                          <div className="mt-2 text-xs text-green-800 font-medium">
                            {details.previous_period_comparison.score_difference > 0 ? '↗' : '↘'} 
                            {Math.abs(details.previous_period_comparison.score_difference)} vs período anterior
                          </div>
                        )}
                      </div>

                      <div className="bg-green-50 border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-semibold text-gray-600">Proyecto/Contexto</span>
                        </div>
                        <p className="text-slate-800 font-semibold">{details.project_context}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resumen General */}
                  <div className="bg-green-50 border-2 border-teal-500 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className="w-5 h-5 text-green-800" />
                      <h3 className="text-lg font-bold text-slate-800">Resumen Ejecutivo</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{details.summary_feedback}</p>
                  </div>

                  {/* Logros y Desafíos */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 border-2 border-emerald-600 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <h3 className="text-lg font-bold text-slate-800">Logros Destacados</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{details.achievements}</p>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <h3 className="text-lg font-bold text-slate-800">Desafíos Enfrentados</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{details.challenges}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Criteria */}
              {activeTab === 'criteria' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800">Puntuaciones por Criterio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(details.criteria_scores).map(([criterion, score]) => (
                      <div key={criterion} className="bg-green-50 border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-800">{criterion}</span>
                          <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              score >= 4.5 ? 'bg-emerald-600' : 
                              score >= 3.5 ? 'bg-teal-500' : 
                              score >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Feedback */}
              {activeTab === 'feedback' && (
                <div className="space-y-8">
                  {/* Feedback Detallado */}
                  <div className="bg-green-50 border-2 border-teal-500 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Feedback Detallado</h3>
                    <p className="text-gray-600 leading-relaxed">{details.detailed_feedback}</p>
                  </div>

                  {/* Fortalezas */}
                  <div className="bg-emerald-50 border-2 border-emerald-600 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-lg font-bold text-slate-800">Fortalezas Identificadas</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.key_strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Áreas de Mejora */}
                  <div className="bg-yellow-50 border-2 border-yellow-500 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-lg font-bold text-slate-800">Áreas de Oportunidad</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.areas_for_improvement.map((area, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Objetivos */}
                  <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-bold text-slate-800">Objetivos para el Próximo Período</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.goals_for_next_period.map((goal, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Capacitaciones Recomendadas */}
                  <div className="bg-teal-50 border-2 border-teal-500 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-teal-500" />
                      <h3 className="text-lg font-bold text-slate-800">Capacitaciones Recomendadas</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.recommended_training.map((training, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FileText className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{training}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab: History */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800">Historial de Evaluaciones</h3>
                  
                  {details.previous_period_comparison && (
                    <div className="bg-green-50 border-2 border-teal-500 rounded-lg p-6">
                      <h4 className="font-bold text-slate-800 mb-3">Comparación con Período Anterior</h4>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 font-medium">Cambio en puntuación:</span>
                          <span className={`font-bold ${
                            details.previous_period_comparison.score_difference > 0 ? 'text-emerald-600' : 'text-red-500'
                          }`}>
                            {details.previous_period_comparison.score_difference > 0 ? '+' : ''}
                            {details.previous_period_comparison.score_difference.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {details.previous_period_comparison.improvement_notes}
                      </p>
                    </div>
                  )}

                  <div className="text-center py-8 text-gray-600">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <p>Historial completo disponible próximamente</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">Error al cargar detalles</h3>
              <p className="text-gray-600">No se pudieron cargar los detalles de esta evaluación.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {onDelete && (
                <button
                  onClick={() => onDelete(evaluation)}
                  className="px-4 py-2 text-sm font-medium text-red-500 border border-red-500 bg-white rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              )}
              <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-slate-200 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Enviar por Email</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              {onEdit && (
                <button
                  onClick={() => onEdit(evaluation)}
                  className="px-4 py-2 text-sm font-medium bg-green-800 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-slate-200 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}