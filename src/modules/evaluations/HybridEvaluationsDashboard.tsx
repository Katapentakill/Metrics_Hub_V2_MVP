// 📁 src/modules/evaluations/shared/HybridEvaluationsDashboard.tsx
// Dashboard compartido con sistema de tabs para evaluaciones

"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  List, 
  Users, 
  Briefcase, 
  Plus,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Award,
  Calendar
} from 'lucide-react';
import EvaluationsListView from './views/EvaluationsListView';
import EvaluationsByUserView from './views/EvaluationsByUserView';
import EvaluationsByProjectView from './views/EvaluationsByProjectView';
import NewEvaluationModal from './modals/NewEvaluationModal';
import EvaluationDetailsModal from './modals/EvaluationDetailsModal';
import ExportEvaluations from './ExportEvaluations';
import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';
import type { ExtendedUserWithProfile } from '@/lib/types';
import type { EvaluationMetrics, PerformanceInsight, EvaluationPeriod, EvaluationFormData } from '@/lib/types/evaluations';
import { getCurrentUserId } from '@/lib/utils/evaluationFilters';

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

interface HybridEvaluationsDashboardProps {
  evaluations: EvaluationView[];
  projects: Project[];
  metrics: EvaluationMetrics;
  performanceInsights: PerformanceInsight[];
  allUsers: ExtendedUserWithProfile[];
  allPeriods: EvaluationPeriod[];
  loading?: boolean;
  // Props para personalización por rol
  role?: 'admin' | 'hr' | 'lead' | 'volunteer';
  theme?: 'blue' | 'purple' | 'emerald' | 'orange';
  // Props para configuración de navegación
  basePath?: string; // ej: '/admin', '/hr', '/lead'
}

type TabView = 'all' | 'by-user' | 'by-project';

export default function HybridEvaluationsDashboard({
  evaluations,
  projects,
  metrics,
  performanceInsights,
  allUsers,
  allPeriods,
  loading = false,
  role = 'admin',
  theme = 'blue',
  basePath = '/admin'
}: HybridEvaluationsDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabView>('all');
  const [showNewEvaluationModal, setShowNewEvaluationModal] = useState(false);
  const [showEvaluationDetails, setShowEvaluationDetails] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationView | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Configuración de tema
  const getThemeConfig = () => {
    switch (theme) {
      case 'purple':
        return {
          header: 'from-purple-600 to-purple-700',
          button: 'bg-white text-purple-600 hover:bg-purple-50',
          tabActive: 'border-purple-500 bg-purple-50 text-purple-600',
          focus: 'focus:ring-purple-500 focus:border-purple-500'
        };
      case 'emerald':
        return {
          header: 'from-emerald-600 to-emerald-700',
          button: 'bg-white text-emerald-600 hover:bg-emerald-50',
          tabActive: 'border-emerald-500 bg-emerald-50 text-emerald-600',
          focus: 'focus:ring-emerald-500 focus:border-emerald-500'
        };
      case 'orange':
        return {
          header: 'from-orange-600 to-orange-700',
          button: 'bg-white text-orange-600 hover:bg-orange-50',
          tabActive: 'border-orange-500 bg-orange-50 text-orange-600',
          focus: 'focus:ring-orange-500 focus:border-orange-500'
        };
      default: // blue
        return {
          header: 'from-blue-600 to-blue-700',
          button: 'bg-white text-blue-600 hover:bg-blue-50',
          tabActive: 'border-blue-500 bg-blue-50 text-blue-600',
          focus: 'focus:ring-blue-500 focus:border-blue-500'
        };
    }
  };

  const themeConfig = getThemeConfig();

  // Sistema de tabs
  const tabs = [
    {
      id: 'all' as TabView,
      label: 'Todas las Evaluaciones',
      icon: List,
      description: 'Vista completa de evaluaciones',
      count: evaluations.length
    },
    {
      id: 'by-user' as TabView,
      label: 'Por Usuario',
      icon: Users,
      description: 'Evaluaciones organizadas por colaborador',
      count: allUsers.length
    },
    {
      id: 'by-project' as TabView,
      label: 'Por Proyecto',
      icon: Briefcase,
      description: 'Evaluaciones organizadas por proyecto',
      count: projects.length
    }
  ];

  // Estadísticas en tiempo real
  const realtimeStats = useMemo(() => {
    const total = evaluations.length;
    const completed = evaluations.filter(e => e.evaluation.status === 'completed').length;
    const pending = evaluations.filter(e => e.evaluation.status === 'pending').length;
    const overdue = evaluations.filter(e => e.evaluation.status === 'overdue').length;
    const inProgress = evaluations.filter(e => e.evaluation.status === 'in_progress').length;

    const completedEvals = evaluations.filter(e => e.evaluation.overall_score);
    const averageScore = completedEvals.length > 0 
      ? completedEvals.reduce((acc, e) => acc + (e.evaluation.overall_score || 0), 0) / completedEvals.length
      : 0;

    return {
      total,
      completed,
      pending,
      overdue,
      inProgress,
      averageScore,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  }, [evaluations]);

  // Manejar creación de evaluación
  const handleCreateEvaluation = (data: EvaluationFormData) => {
    console.log('Creating new evaluation:', data);
    alert('Evaluación creada exitosamente');
    setShowNewEvaluationModal(false);
  };

  // Navegación personalizada por rol
  const handleUserView = (userId: string) => {
    router.push(`${basePath}/users/${userId}`);
  };

  const handleProjectView = (projectId: string) => {
    router.push(`${basePath}/projects/${projectId}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="loading-skeleton h-32 rounded-xl"></div>
        <div className="loading-skeleton h-12 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-skeleton h-24 rounded-xl"></div>
          ))}
        </div>
        <div className="loading-skeleton h-96 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Principal */}
      <div className={`bg-gradient-to-r ${themeConfig.header} rounded-2xl p-8 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Centro de Evaluaciones</h1>
            <p className={`${themeConfig.header.includes('purple') ? 'text-purple-100' : themeConfig.header.includes('emerald') ? 'text-emerald-100' : themeConfig.header.includes('orange') ? 'text-orange-100' : 'text-blue-100'} text-lg`}>
              Gestión integral del desempeño y desarrollo del talento
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNewEvaluationModal(true)}
              className={`${themeConfig.button} px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2`}
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Evaluación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{realtimeStats.total}</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Total Evaluaciones</h3>
          <p className="text-sm text-gray-500">En todos los proyectos</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-green-600">{realtimeStats.completed}</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Completadas</h3>
          <p className="text-sm text-gray-500">
            {realtimeStats.completionRate.toFixed(1)}% de completitud
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {realtimeStats.averageScore.toFixed(1)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Promedio General</h3>
          <p className="text-sm text-gray-500">Puntuación sobre 5.0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-600">{realtimeStats.overdue}</span>
          </div>
          <h3 className="font-semibold text-gray-700 mb-1">Vencidas</h3>
          <p className="text-sm text-gray-500">Requieren atención</p>
        </div>
      </div>

      {/* Sistema de Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header de Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? themeConfig.tabActive
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-500">
                        {tab.description} • {tab.count} elementos
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Barra de herramientas */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'all' ? 'Buscar evaluaciones...' :
                    activeTab === 'by-user' ? 'Buscar usuarios...' :
                    'Buscar proyectos...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 ${themeConfig.focus} focus:border-transparent`}
                />
              </div>

              {/* Filtros específicos por tab */}
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <ExportEvaluations views={evaluations} />
            </div>
          </div>
        </div>

        {/* Contenido del Tab Activo */}
        <div className="p-6">
          {activeTab === 'all' && (
            <EvaluationsListView
              evaluations={evaluations}
              searchTerm={searchTerm}
              onEvaluationView={(evaluation) => {
                setSelectedEvaluation(evaluation);
                setShowEvaluationDetails(true);
              }}
              onEvaluationEdit={(evaluation) => {
                setSelectedEvaluation(evaluation);
                setShowEvaluationDetails(true);
              }}
              onEvaluationDelete={(evaluation) => {
                console.log('Eliminar evaluación:', evaluation.evaluation.id);
              }}
              role={role}
              currentUserId={getCurrentUserId() || undefined}
            />
          )}

          {activeTab === 'by-user' && (
            <EvaluationsByUserView
              evaluations={evaluations}
              users={allUsers}
              searchTerm={searchTerm}
              onUserView={handleUserView}
              onEvaluationView={(evaluation) => {
                setSelectedEvaluation(evaluation);
                setShowEvaluationDetails(true);
              }}
            />
          )}

          {activeTab === 'by-project' && (
            <EvaluationsByProjectView
              evaluations={evaluations}
              projects={projects}
              users={allUsers}
              searchTerm={searchTerm}
              onProjectView={handleProjectView}
              onEvaluationView={(evaluation) => {
                setSelectedEvaluation(evaluation);
                setShowEvaluationDetails(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Modal de Nueva Evaluación */}
      <NewEvaluationModal
        isOpen={showNewEvaluationModal}
        onClose={() => setShowNewEvaluationModal(false)}
        onSave={handleCreateEvaluation}
        allUsers={allUsers}
        allPeriods={allPeriods}
        projects={projects}
      />

      {/* Modal de Detalles de Evaluación */}
      {showEvaluationDetails && selectedEvaluation && (
        <EvaluationDetailsModal
          evaluation={selectedEvaluation}
          onClose={() => {
            setShowEvaluationDetails(false);
            setSelectedEvaluation(null);
          }}
          onEdit={(evaluation) => {
            setShowEvaluationDetails(false);
            // Aquí se podría abrir un modal de edición
            console.log('Editar evaluación:', evaluation.evaluation.id);
          }}
          onDelete={(evaluation) => {
            setShowEvaluationDetails(false);
            setSelectedEvaluation(null);
            console.log('Eliminar evaluación:', evaluation.evaluation.id);
          }}
          role={role}
          theme={theme}
        />
      )}
    </div>
  );
}
