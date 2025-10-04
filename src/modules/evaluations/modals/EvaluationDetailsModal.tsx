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
  // Props para personalización por rol
  role?: 'admin' | 'hr' | 'lead' | 'volunteer';
  theme?: 'blue' | 'purple' | 'emerald' | 'orange';
}

// Datos completos que se pueden mostrar
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
  theme = 'blue'
}: EvaluationDetailsModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState<EvaluationDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'criteria' | 'feedback' | 'history'>('overview');

  // Simular carga de detalles
  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Datos simulados completos
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
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-emerald-600';
    if (score >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return 'Excepcional';
    if (score >= 3.5) return 'Muy Bueno';
    if (score >= 2.5) return 'Satisfactorio';
    if (score >= 1.5) return 'Necesita Mejora';
    return 'Insatisfactorio';
  };

  // Configuración de tema
  const getThemeConfig = () => {
    switch (theme) {
      case 'purple':
        return {
          header: 'from-purple-500 to-purple-600',
          headerHover: 'hover:bg-purple-600',
          tabActive: 'text-purple-600 border-purple-600 bg-purple-50',
          scoreBg: 'from-purple-50 to-purple-100',
          scoreText: 'text-purple-600',
          summaryBg: 'bg-purple-50 border-purple-200',
          summaryText: 'text-purple-900',
          summaryContent: 'text-purple-800'
        };
      case 'emerald':
        return {
          header: 'from-emerald-500 to-emerald-600',
          headerHover: 'hover:bg-emerald-600',
          tabActive: 'text-emerald-600 border-emerald-600 bg-emerald-50',
          scoreBg: 'from-emerald-50 to-emerald-100',
          scoreText: 'text-emerald-600',
          summaryBg: 'bg-emerald-50 border-emerald-200',
          summaryText: 'text-emerald-900',
          summaryContent: 'text-emerald-800'
        };
      case 'orange':
        return {
          header: 'from-orange-500 to-orange-600',
          headerHover: 'hover:bg-orange-600',
          tabActive: 'text-orange-600 border-orange-600 bg-orange-50',
          scoreBg: 'from-orange-50 to-orange-100',
          scoreText: 'text-orange-600',
          summaryBg: 'bg-orange-50 border-orange-200',
          summaryText: 'text-orange-900',
          summaryContent: 'text-orange-800'
        };
      default: // blue
        return {
          header: 'from-blue-500 to-blue-600',
          headerHover: 'hover:bg-blue-600',
          tabActive: 'text-blue-600 border-blue-600 bg-blue-50',
          scoreBg: 'from-blue-50 to-blue-100',
          scoreText: 'text-blue-600',
          summaryBg: 'bg-blue-50 border-blue-200',
          summaryText: 'text-blue-900',
          summaryContent: 'text-blue-800'
        };
    }
  };

  const themeConfig = getThemeConfig();

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Eye },
    { id: 'criteria', label: 'Criterios', icon: Star },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'history', label: 'Historial', icon: Calendar }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeConfig.header} px-6 py-4 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Detalles de Evaluación</h2>
              <p className={`${themeConfig.header.includes('purple') ? 'text-purple-100' : themeConfig.header.includes('emerald') ? 'text-emerald-100' : themeConfig.header.includes('orange') ? 'text-orange-100' : 'text-blue-100'} text-sm`}>
                {getTypeLabel(evaluation.evaluation.type)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(evaluation)}
                  className={`p-2 ${themeConfig.headerHover} rounded-lg transition-colors`}
                  title="Editar evaluación"
                >
                  <Edit className="w-4 h-4" />
                </button>
              )}
              <button
                className={`p-2 ${themeConfig.headerHover} rounded-lg transition-colors`}
                title="Descargar reporte"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className={`p-2 ${themeConfig.headerHover} rounded-lg transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Información básica */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Evaluado</p>
              <p className="font-medium text-slate-800">{evaluation.evaluatedUser?.name || 'Usuario'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Estado</p>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(evaluation.evaluation.status)}`}>
                {getStatusLabel(evaluation.evaluation.status)}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Puntuación</p>
              {details && (
                <div className="flex items-baseline space-x-1">
                  <span className={`text-lg font-bold ${getScoreColor(details.overall_score)}`}>
                    {details.overall_score.toFixed(1)}
                  </span>
                  <span className="text-slate-600 text-sm">/5.0</span>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Fecha</p>
              <p className="font-medium text-slate-800">
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
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? `${themeConfig.tabActive} border-b-2`
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
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
                <div key={i} className="loading-skeleton h-4 rounded" />
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
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          <span className="text-sm font-medium text-slate-600">Período</span>
                        </div>
                        <p className="text-slate-800 font-medium">{details.period}</p>
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-4 h-4 text-slate-600" />
                          <span className="text-sm font-medium text-slate-600">Evaluador</span>
                        </div>
                        <p className="text-slate-800 font-medium">{details.evaluator}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className={`bg-gradient-to-br ${themeConfig.scoreBg} rounded-lg p-4`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Star className={`w-4 h-4 ${themeConfig.scoreText}`} />
                          <span className={`text-sm font-medium ${themeConfig.scoreText}`}>Puntuación General</span>
                        </div>
                        <div className="flex items-baseline space-x-2">
                          <span className={`text-3xl font-bold ${getScoreColor(details.overall_score)}`}>
                            {details.overall_score.toFixed(1)}
                          </span>
                          <span className="text-slate-600">/5.0</span>
                          <span className={`text-sm font-medium ${getScoreColor(details.overall_score)}`}>
                            ({getScoreLabel(details.overall_score)})
                          </span>
                        </div>
                        {details.previous_period_comparison && (
                          <div className={`mt-2 text-xs ${themeConfig.scoreText}`}>
                            {details.previous_period_comparison.score_difference > 0 ? '↗' : '↘'} 
                            {Math.abs(details.previous_period_comparison.score_difference)} vs período anterior
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <FileText className="w-4 h-4 text-slate-600" />
                          <span className="text-sm font-medium text-slate-600">Proyecto/Contexto</span>
                        </div>
                        <p className="text-slate-800 font-medium">{details.project_context}</p>
                      </div>
                    </div>
                  </div>

                  {/* Resumen General */}
                  <div className={`${themeConfig.summaryBg} border rounded-lg p-6`}>
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageSquare className={`w-5 h-5 ${themeConfig.scoreText}`} />
                      <h3 className={`text-lg font-semibold ${themeConfig.summaryText}`}>Resumen Ejecutivo</h3>
                    </div>
                    <p className={`${themeConfig.summaryContent} leading-relaxed`}>{details.summary_feedback}</p>
                  </div>

                  {/* Logros y Desafíos */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-900">Logros Destacados</h3>
                      </div>
                      <p className="text-green-800 text-sm leading-relaxed">{details.achievements}</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-semibold text-yellow-900">Desafíos Enfrentados</h3>
                      </div>
                      <p className="text-yellow-800 text-sm leading-relaxed">{details.challenges}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Criteria */}
              {activeTab === 'criteria' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800">Puntuaciones por Criterio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(details.criteria_scores).map(([criterion, score]) => (
                      <div key={criterion} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-800">{criterion}</span>
                          <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              score >= 4.5 ? 'bg-green-500' : 
                              score >= 3.5 ? 'bg-emerald-500' : 
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
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Feedback Detallado</h3>
                    <p className="text-slate-700 leading-relaxed">{details.detailed_feedback}</p>
                  </div>

                  {/* Fortalezas */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-900">Fortalezas Identificadas</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.key_strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-green-800">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Áreas de Mejora */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                      <h3 className="text-lg font-semibold text-yellow-900">Áreas de Oportunidad</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.areas_for_improvement.map((area, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <TrendingUp className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span className="text-yellow-800">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Objetivos */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-purple-900">Objetivos para el Próximo Período</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.goals_for_next_period.map((goal, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-purple-800">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Capacitaciones Recomendadas */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-semibold text-indigo-900">Capacitaciones Recomendadas</h3>
                    </div>
                    <ul className="space-y-2">
                      {details.recommended_training.map((training, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FileText className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-indigo-800">{training}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab: History */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-800">Historial de Evaluaciones</h3>
                  
                  {details.previous_period_comparison && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                      <h4 className="font-medium text-slate-800 mb-3">Comparación con Período Anterior</h4>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-600">Cambio en puntuación:</span>
                          <span className={`font-medium ${
                            details.previous_period_comparison.score_difference > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {details.previous_period_comparison.score_difference > 0 ? '+' : ''}
                            {details.previous_period_comparison.score_difference.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-700 text-sm">
                        {details.previous_period_comparison.improvement_notes}
                      </p>
                    </div>
                  )}

                  <div className="text-center py-8 text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Historial completo disponible próximamente</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">Error al cargar detalles</h3>
              <p className="text-slate-500">No se pudieron cargar los detalles de esta evaluación.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {onDelete && (
                <button
                  onClick={() => onDelete(evaluation)}
                  className="btn-danger-outline text-sm flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar</span>
                </button>
              )}
              <button className="btn-living-outline text-sm flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Enviar por Email</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              {onEdit && (
                <button
                  onClick={() => onEdit(evaluation)}
                  className="btn-living text-sm flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="btn-living-outline"
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
