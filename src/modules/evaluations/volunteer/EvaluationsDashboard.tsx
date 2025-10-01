'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  BarChart3,
  Target,
  Award,
  FileText
} from 'lucide-react';

interface Evaluation {
  id: string;
  title: string;
  type: 'self' | 'peer' | 'supervisor' | 'project';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  dueDate: string;
  completedDate?: string;
  score?: number;
  evaluator?: string;
  projectName?: string;
  category: string;
  feedback?: string;
}

interface PerformanceMetric {
  area: string;
  currentScore: number;
  previousScore?: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
}

const EvaluationsDashboard: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setEvaluations([
        {
          id: '1',
          title: 'Auto-evaluación Trimestral',
          type: 'self',
          status: 'pending',
          dueDate: '2025-10-15',
          category: 'Desarrollo Personal',
        },
        {
          id: '2',
          title: 'Evaluación de Proyecto - Ayuda Humanitaria',
          type: 'project',
          status: 'completed',
          dueDate: '2025-09-20',
          completedDate: '2025-09-18',
          score: 4.5,
          evaluator: 'María García',
          projectName: 'Ayuda Humanitaria Q3',
          category: 'Desempeño en Proyecto',
          feedback: 'Excelente trabajo en coordinación y liderazgo.'
        },
        {
          id: '3',
          title: 'Evaluación 360° - Trabajo en Equipo',
          type: 'peer',
          status: 'in_progress',
          dueDate: '2025-10-10',
          category: 'Habilidades Interpersonales',
        },
        {
          id: '4',
          title: 'Evaluación de Supervisor',
          type: 'supervisor',
          status: 'completed',
          dueDate: '2025-08-30',
          completedDate: '2025-08-25',
          score: 4.2,
          evaluator: 'Carlos López',
          category: 'Desempeño General',
          feedback: 'Muestra gran compromiso y iniciativa en sus tareas.'
        }
      ]);

      setPerformanceMetrics([
        { area: 'Liderazgo', currentScore: 4.2, previousScore: 3.8, target: 4.5, trend: 'up' },
        { area: 'Comunicación', currentScore: 4.5, previousScore: 4.3, target: 4.5, trend: 'up' },
        { area: 'Trabajo en Equipo', currentScore: 4.1, previousScore: 4.1, target: 4.3, trend: 'stable' },
        { area: 'Innovación', currentScore: 3.9, previousScore: 4.1, target: 4.2, trend: 'down' },
        { area: 'Compromiso', currentScore: 4.8, previousScore: 4.6, target: 4.7, trend: 'up' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const completedEvaluations = evaluations.filter(e => e.status === 'completed');
  const pendingEvaluations = evaluations.filter(e => e.status === 'pending' || e.status === 'in_progress');
  const averageScore = completedEvaluations.length > 0 
    ? (completedEvaluations.reduce((acc, e) => acc + (e.score || 0), 0) / completedEvaluations.length).toFixed(1)
    : '0';

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
          Mis Evaluaciones
        </h1>
        <p className="text-gray-600">
          Gestiona tus evaluaciones, revisa tu progreso y desarrolla tus habilidades.
        </p>
      </div>

      {/* Stats Cards */}
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
          <p className="text-sm text-gray-500 mt-2">
            Basado en {completedEvaluations.length} evaluaciones
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Evaluaciones Completadas</p>
              <p className="text-3xl font-bold text-blue-600">{completedEvaluations.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Este período
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingEvaluations.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Requieren atención
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Objetivos Alcanzados</p>
              <p className="text-3xl font-bold text-purple-600">
                {performanceMetrics.filter(m => m.currentScore >= m.target).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            De {performanceMetrics.length} áreas
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {[
          { id: 'overview', label: 'Resumen', icon: BarChart3 },
          { id: 'evaluations', label: 'Evaluaciones', icon: FileText },
          { id: 'performance', label: 'Desempeño', icon: TrendingUp },
          { id: 'achievements', label: 'Logros', icon: Award }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-var(--living-green-600) shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Métricas de Desempeño
            </h3>
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.area} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{metric.area}</span>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(metric.trend)}
                        <span className="text-sm text-gray-600">
                          {metric.currentScore}/5.0
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-var(--living-green-500) h-2 rounded-full relative"
                        style={{ width: `${(metric.currentScore / 5) * 100}%` }}
                      >
                        <div
                          className="absolute top-0 right-0 w-1 h-2 bg-gray-400 rounded-full"
                          style={{ 
                            right: `${100 - (metric.target / 5) * 100}%`,
                            transform: 'translateX(50%)'
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Objetivo: {metric.target}</span>
                      {metric.previousScore && (
                        <span>Anterior: {metric.previousScore}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Evaluations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Evaluaciones Recientes
            </h3>
            <div className="space-y-4">
              {evaluations.slice(0, 4).map((evaluation) => (
                <div key={evaluation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(evaluation.status)}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{evaluation.title}</p>
                      <p className="text-xs text-gray-500">{evaluation.category}</p>
                    </div>
                  </div>
                  {evaluation.score && (
                    <div className="text-right">
                      <p className="text-sm font-bold text-var(--living-green-600)">
                        {evaluation.score}/5.0
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(evaluation.completedDate!).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'evaluations' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Todas las Evaluaciones
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {evaluations.map((evaluation) => (
                <div key={evaluation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(evaluation.status)}
                        <h4 className="text-lg font-medium text-gray-900">{evaluation.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(evaluation.status)}`}>
                          {evaluation.status === 'completed' ? 'Completada' :
                           evaluation.status === 'in_progress' ? 'En Progreso' :
                           evaluation.status === 'overdue' ? 'Vencida' : 'Pendiente'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Tipo:</span> 
                          <span className="ml-1 capitalize">{evaluation.type}</span>
                        </div>
                        <div>
                          <span className="font-medium">Categoría:</span> 
                          <span className="ml-1">{evaluation.category}</span>
                        </div>
                        <div>
                          <span className="font-medium">Fecha límite:</span> 
                          <span className="ml-1">{new Date(evaluation.dueDate).toLocaleDateString()}</span>
                        </div>
                        {evaluation.evaluator && (
                          <div>
                            <span className="font-medium">Evaluador:</span> 
                            <span className="ml-1">{evaluation.evaluator}</span>
                          </div>
                        )}
                      </div>

                      {evaluation.feedback && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Comentarios:</span> {evaluation.feedback}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-4">
                      {evaluation.score ? (
                        <div className="mb-2">
                          <div className="text-2xl font-bold text-var(--living-green-600)">
                            {evaluation.score}
                          </div>
                          <div className="text-xs text-gray-500">/ 5.0</div>
                        </div>
                      ) : (
                        <button className="btn-living">
                          {evaluation.status === 'pending' ? 'Comenzar' : 'Continuar'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationsDashboard;