// 📁 src/modules/evaluations/shared/HybridEvaluationsDashboard.tsx
// Dashboard compartido con sistema de tabs para evaluaciones - Paleta Institucional

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
  role?: 'admin' | 'hr' | 'lead' | 'volunteer';
  theme?: 'green' | 'blue' | 'purple' | 'emerald' | 'orange';
  basePath?: string;
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
  theme = 'emerald',
  basePath = '/admin'
}: HybridEvaluationsDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabView>('all');
  const [showNewEvaluationModal, setShowNewEvaluationModal] = useState(false);
  const [showEvaluationDetails, setShowEvaluationDetails] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationView | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
        <div className="bg-gray-200 h-32 rounded-xl animate-pulse"></div>
        <div className="bg-gray-200 h-12 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-24 rounded-xl animate-pulse"></div>
          ))}
        </div>
        <div className="bg-gray-200 h-96 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Principal - PALETA INSTITUCIONAL */}
      <div className="bg-transparent ">
        <div className="flex items-center justify-between">
          <div>
            {/* Icono green-800 (#166534) - Color principal de marca */}
            <h1 className="text-3xl font-bold text-slate-800 flex items-center">
              <Award className="w-10 h-10 text-emerald-600" />
              Centro de Evaluaciones
            </h1>
            <p className="text-gray-600 mt-1">
              Gestión integral del desempeño y desarrollo del talento
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNewEvaluationModal(true)}
              className="bg-gradient-to-r from-[#15803d] to-[#14532d] hover:from-[#166534] hover:to-[#15803d] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-sm flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Evaluación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales - KPIs con diferentes fondos de verde */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Evaluaciones - green-800 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-lg flex items-center justify-center shadow-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">{realtimeStats.total}</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Total Evaluaciones</h3>
          <p className="text-sm text-gray-600">En todos los proyectos</p>
        </div>

        {/* Completadas - emerald */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-600">{realtimeStats.completed}</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Completadas</h3>
          <p className="text-sm text-gray-600">
            {realtimeStats.completionRate.toFixed(1)}% de completitud
          </p>
        </div>

        {/* Promedio General - teal */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">
              {realtimeStats.averageScore.toFixed(1)}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Promedio General</h3>
          <p className="text-sm text-gray-600">Puntuación sobre 5.0</p>
        </div>

        {/* Vencidas - red (peligro) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-yellow-400 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-red-600">{realtimeStats.overdue}</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-1">Vencidas</h3>
          <p className="text-sm text-gray-600">Requieren atención</p>
        </div>
      </div>

      {/* Sistema de Tabs - PALETA INSTITUCIONAL */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header de Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#166534] bg-green-50 text-[#166534]'
                      : 'border-transparent text-gray-600 hover:text-slate-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#166534]' : 'text-slate-400'}`} />
                    <div className="text-left">
                      <div className="font-medium text-slate-800">{tab.label}</div>
                      <div className="text-xs text-gray-600">
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
        <div className="p-4 border-b border-slate-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Búsqueda */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'all' ? 'Buscar evaluaciones...' :
                    activeTab === 'by-user' ? 'Buscar usuarios...' :
                    'Buscar proyectos...'
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] text-slate-800"
                />
              </div>

              {/* Filtros */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-gray-50 transition-colors text-slate-800 shadow-sm">
                <Filter className="w-4 h-4 text-slate-400" />
                <span>Filtros</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <ExportEvaluations views={evaluations} />
            </div>
          </div>
        </div>

        {/* Contenido del Tab Activo */}
        <div className="p-6 bg-white">
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