'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Download, 
  Filter, 
  Search,
  BarChart3,
  Target,
  Award,
  User,
  Users,
  Briefcase
} from 'lucide-react';

interface EvaluationRecord {
  id: string;
  title: string;
  type: 'self' | 'peer' | 'supervisor' | 'project';
  score: number;
  maxScore: number;
  completedDate: string;
  period: string;
  evaluator?: string;
  projectName?: string;
  category: string;
  feedback: string;
  areas: {
    name: string;
    score: number;
    previousScore?: number;
  }[];
  goals?: {
    title: string;
    status: 'completed' | 'in_progress' | 'not_started';
    progress: number;
  }[];
}

const EvaluationHistory: React.FC = () => {
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState<EvaluationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationRecord | null>(null);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEvaluations([
        {
          id: '1',
          title: 'Auto-evaluación Q3 2025',
          type: 'self',
          score: 4.2,
          maxScore: 5.0,
          completedDate: '2025-09-15',
          period: 'Q3 2025',
          category: 'Desarrollo Personal',
          feedback: 'He logrado mejorar significativamente en mi capacidad de liderazgo y trabajo en equipo.',
          areas: [
            { name: 'Liderazgo', score: 4.0, previousScore: 3.5 },
            { name: 'Comunicación', score: 4.5, previousScore: 4.2 },
            { name: 'Trabajo en Equipo', score: 4.2, previousScore: 4.0 },
            { name: 'Innovación', score: 4.0, previousScore: 3.8 }
          ],
          goals: [
            { title: 'Liderar un proyecto completo', status: 'in_progress', progress: 75 },
            { title: 'Obtener certificación en gestión', status: 'completed', progress: 100 },
            { title: 'Mentor de nuevos voluntarios', status: 'not_started', progress: 0 }
          ]
        },
        {
          id: '2',
          title: 'Evaluación de Supervisor - Q3',
          type: 'supervisor',
          score: 4.5,
          maxScore: 5.0,
          completedDate: '2025-09-20',
          period: 'Q3 2025',
          evaluator: 'Carlos López',
          category: 'Desempeño General',
          feedback: 'Excelente desempeño en el proyecto de ayuda humanitaria. Muestra gran iniciativa y capacidad de resolver problemas.',
          areas: [
            { name: 'Liderazgo', score: 4.5, previousScore: 4.0 },
            { name: 'Resolución de Problemas', score: 4.8, previousScore: 4.2 },
            { name: 'Compromiso', score: 4.9, previousScore: 4.7 },
            { name: 'Comunicación', score: 4.2, previousScore: 4.0 }
          ]
        },
        {
          id: '3',
          title: 'Evaluación 360° - Trabajo en Equipo',
          type: 'peer',
          score: 4.3,
          maxScore: 5.0,
          completedDate: '2025-08-30',
          period: 'Q3 2025',
          evaluator: 'Equipo de Proyecto',
          category: 'Habilidades Interpersonales',
          feedback: 'Es un excelente colaborador, siempre dispuesto a ayudar y con gran capacidad para motivar al equipo.',
          areas: [
            { name: 'Colaboración', score: 4.6, previousScore: 4.1 },
            { name: 'Empatía', score: 4.8, previousScore: 4.5 },
            { name: 'Comunicación', score: 4.0, previousScore: 3.9 },
            { name: 'Confiabilidad', score: 4.7, previousScore: 4.4 }
          ]
        },
        {
          id: '4',
          title: 'Evaluación de Proyecto - Ayuda Humanitaria',
          type: 'project',
          score: 4.4,
          maxScore: 5.0,
          completedDate: '2025-08-15',
          period: 'Q3 2025',
          evaluator: 'María García',
          projectName: 'Ayuda Humanitaria Q3',
          category: 'Desempeño en Proyecto',
          feedback: 'Lideró eficientemente el equipo de logística, cumpliendo todos los objetivos propuestos.',
          areas: [
            { name: 'Gestión de Recursos', score: 4.5, previousScore: 4.0 },
            { name: 'Coordinación', score: 4.6, previousScore: 4.2 },
            { name: 'Cumplimiento', score: 4.9, previousScore: 4.5 },
            { name: 'Innovación', score: 3.8, previousScore: 3.5 }
          ]
        },
        {
          id: '5',
          title: 'Auto-evaluación Q2 2025',
          type: 'self',
          score: 3.9,
          maxScore: 5.0,
          completedDate: '2025-06-15',
          period: 'Q2 2025',
          category: 'Desarrollo Personal',
          feedback: 'Período de crecimiento importante, identifiqué áreas de mejora en liderazgo.',
          areas: [
            { name: 'Liderazgo', score: 3.5, previousScore: 3.2 },
            { name: 'Comunicación', score: 4.2, previousScore: 4.0 },
            { name: 'Trabajo en Equipo', score: 4.0, previousScore: 3.8 },
            { name: 'Innovación', score: 3.8, previousScore: 3.6 }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = evaluations;

    if (searchTerm) {
      filtered = filtered.filter(evaluation =>
        evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.evaluator?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(evaluation => evaluation.type === selectedType);
    }

    if (selectedPeriod !== 'all') {
      filtered = filtered.filter(evaluation => evaluation.period === selectedPeriod);
    }

    setFilteredEvaluations(filtered);
  }, [evaluations, searchTerm, selectedType, selectedPeriod]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'self':
        return <User className="w-4 h-4" />;
      case 'peer':
        return <Users className="w-4 h-4" />;
      case 'supervisor':
        return <Award className="w-4 h-4" />;
      case 'project':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'self':
        return 'Auto-evaluación';
      case 'peer':
        return 'Evaluación 360°';
      case 'supervisor':
        return 'Supervisor';
      case 'project':
        return 'Proyecto';
      default:
        return type;
    }
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  const averageScore = evaluations.length > 0 
    ? (evaluations.reduce((acc, e) => acc + e.score, 0) / evaluations.length).toFixed(1)
    : '0';

  const periods = [...new Set(evaluations.map(e => e.period))];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Historial de Evaluaciones
        </h1>
        <p className="text-gray-600">
          Revisa tu progreso a lo largo del tiempo y analiza tu desarrollo profesional.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio General</p>
              <p className="text-3xl font-bold text-var(--living-green-600)">{averageScore}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Star className="w-6 h-6 text-var(--living-green-600)" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Evaluaciones</p>
              <p className="text-3xl font-bold text-blue-600">{evaluations.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mejor Puntuación</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.max(...evaluations.map(e => e.score)).toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Períodos Evaluados</p>
              <p className="text-3xl font-bold text-orange-600">{periods.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar Evaluaciones</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por título, evaluador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Evaluación
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="self">Auto-evaluación</option>
                <option value="supervisor">Supervisor</option>
                <option value="peer">Evaluación 360°</option>
                <option value="project">Proyecto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
              >
                <option value="all">Todos los períodos</option>
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full btn-living">
                <Filter className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluations List */}
      <div className="space-y-4">
        {filteredEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(evaluation.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{evaluation.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{getTypeLabel(evaluation.type)}</span>
                        {evaluation.evaluator && (
                          <>
                            <span>•</span>
                            <span>Por: {evaluation.evaluator}</span>
                          </>
                        )}
                        {evaluation.projectName && (
                          <>
                            <span>•</span>
                            <span>Proyecto: {evaluation.projectName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-medium">Fecha:</span>
                      <br />
                      {new Date(evaluation.completedDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Período:</span>
                      <br />
                      {evaluation.period}
                    </div>
                    <div>
                      <span className="font-medium">Categoría:</span>
                      <br />
                      {evaluation.category}
                    </div>
                    <div>
                      <span className="font-medium">Puntuación:</span>
                      <br />
                      <span className={`font-bold ${getScoreColor(evaluation.score, evaluation.maxScore)}`}>
                        {evaluation.score}/{evaluation.maxScore}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{evaluation.feedback}</p>

                  {/* Areas breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {evaluation.areas.map((area) => (
                      <div key={area.name} className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-1">{area.name}</p>
                        <div className="flex items-center justify-center space-x-1">
                          <span className={`font-bold ${getScoreColor(area.score, 5)}`}>
                            {area.score}
                          </span>
                          {getTrendIcon(area.score, area.previousScore)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(evaluation.score, evaluation.maxScore)}`}>
                      {evaluation.score}
                    </div>
                    <div className="text-sm text-gray-500">/{evaluation.maxScore}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedEvaluation(evaluation)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Descargar reporte"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvaluations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No se encontraron evaluaciones</p>
          <p className="text-gray-400">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Detailed Modal */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedEvaluation.title}
                  </h2>
                  <p className="text-gray-600">
                    {getTypeLabel(selectedEvaluation.type)} • {selectedEvaluation.period}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Detalles de la Evaluación</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Fecha:</strong> {new Date(selectedEvaluation.completedDate).toLocaleDateString()}</div>
                    {selectedEvaluation.evaluator && <div><strong>Evaluador:</strong> {selectedEvaluation.evaluator}</div>}
                    {selectedEvaluation.projectName && <div><strong>Proyecto:</strong> {selectedEvaluation.projectName}</div>}
                    <div><strong>Categoría:</strong> {selectedEvaluation.category}</div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-var(--living-green-600) mb-2">
                      {selectedEvaluation.score}
                    </div>
                    <div className="text-2xl text-gray-500">/ {selectedEvaluation.maxScore}</div>
                    <div className="mt-2 text-sm text-gray-600">Puntuación Total</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Retroalimentación</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{selectedEvaluation.feedback}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Evaluación por Áreas</h3>
                <div className="space-y-3">
                  {selectedEvaluation.areas.map((area) => (
                    <div key={area.name} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{area.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${getScoreColor(area.score, 5)}`}>
                            {area.score}/5.0
                          </span>
                          {area.previousScore && (
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              {getTrendIcon(area.score, area.previousScore)}
                              <span>({area.previousScore})</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-var(--living-green-500) h-2 rounded-full"
                          style={{ width: `${(area.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEvaluation.goals && selectedEvaluation.goals.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Objetivos Establecidos</h3>
                  <div className="space-y-3">
                    {selectedEvaluation.goals.map((goal, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{goal.title}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                            goal.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {goal.status === 'completed' ? 'Completado' :
                             goal.status === 'in_progress' ? 'En Progreso' : 'No Iniciado'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  goal.status === 'completed' ? 'bg-green-500' :
                                  goal.status === 'in_progress' ? 'bg-blue-500' :
                                  'bg-gray-400'
                                }`}
                                style={{ width: `${goal.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-600">{goal.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
                <button className="flex items-center space-x-2 btn-living">
                  <Download className="w-4 h-4" />
                  <span>Descargar Reporte</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationHistory;