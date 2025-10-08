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
  theme?:  'green' | 'blue' | 'purple' | 'emerald' | 'orange'; // Se permite 'emerald'
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
  theme = 'emerald', // CAMBIO: Default a 'emerald' para reflejar la marca
  basePath = '/admin'
}: HybridEvaluationsDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabView>('all');
  const [showNewEvaluationModal, setShowNewEvaluationModal] = useState(false);
  const [showEvaluationDetails, setShowEvaluationDetails] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationView | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Configuración de tema (Ajustado para la paleta Verde Esmeralda/Gris)
  const getThemeConfig = (currentTheme: string) => {
    if (currentTheme === 'emerald') {
      return {
        // Títulos principales: slate-800
        headerText: 'text-slate-800', 
        // Color principal de la marca: emerald-600 (Iconos y elementos destacados)
        buttonBg: 'bg-emerald-600 text-white hover:bg-emerald-700', 
        // Bordes y acentos en focus: emerald-500/20 (Rings con transparencia)
        focusRing: 'focus:ring-emerald-500/20 focus:ring-4 focus:border-emerald-500', 
        // Tab activo: emerald-500/10 (Usando 10% para fondo suave) y emerald-600 (Texto/Borde)
        tabActive: 'border-emerald-600 bg-emerald-500/10 text-emerald-600',
        // Íconos secundarios: slate-400
        iconSecondary: 'text-slate-400', 
      };
    }

    // Fallback/Otros temas (usando 'green' original)
    return {
      headerText: 'text-gray-900',
      buttonBg: 'bg-green-600 text-white hover:bg-green-700',
      focusRing: 'focus:ring-green-500 focus:ring-4 focus:border-green-500',
      tabActive: 'border-green-500 bg-green-50 text-green-600',
      iconSecondary: 'text-gray-600',
    };
  };

  const themeConfig = getThemeConfig(theme);

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
    // Usando Grises Neutros para el esqueleto
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
      {/* Header Principal */}
      {/* Fondo de cards: white. Texto principal: slate-800 */}
      <div className={`bg-white rounded-2xl shadow-sm p-8 ${themeConfig.headerText} mb-6`}> 
        <div className="flex items-center justify-between">
          <div>
            {/* Títulos principales: text-slate-800. Ícono de marca: emerald-600 */}
            <h1 className="text-3xl font-bold text-slate-800 flex items-center">
              <Award className="w-6 h-6 mr-2 text-emerald-600" /> 
              Centro de Evaluaciones
            </h1>
            {/* Texto secundario: gray-600 */}
            <p className="text-gray-600 mt-1"> 
              Gestión integral del desempeño y desarrollo del talento
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNewEvaluationModal(true)}
              // Botón CTA: usa themeConfig.buttonBg (bg-emerald-600)
              className={`${themeConfig.buttonBg} px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2`}
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Evaluación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Evaluaciones */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            {/* Ícono secundario: bg-gray-100 y slate-400 */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-slate-400" /> 
            </div>
            {/* Texto con énfasis medio: gray-800 */}
            <span className="text-2xl font-bold text-gray-800">{realtimeStats.total}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Total Evaluaciones</h3>
          <p className="text-sm text-gray-600">En todos los proyectos</p>
        </div>

        {/* Completadas - Destacar con emerald-600 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            {/* Ícono de marca: bg-emerald-100 y text-emerald-600 */}
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-emerald-600">{realtimeStats.completed}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Completadas</h3>
          <p className="text-sm text-gray-600">
            {realtimeStats.completionRate.toFixed(1)}% de completitud
          </p>
        </div>

        {/* Promedio General - Usar color neutral */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            {/* Ícono neutral: bg-gray-100 y slate-400 */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-slate-400" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {realtimeStats.averageScore.toFixed(1)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Promedio General</h3>
          <p className="text-sm text-gray-600">Puntuación sobre 5.0</p>
        </div>

        {/* Vencidas - Usar color de riesgo (rojo) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-red-600">{realtimeStats.overdue}</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Vencidas</h3>
          <p className="text-sm text-gray-600">Requieren atención</p>
        </div>
      </div>

      {/* Sistema de Tabs */}
      {/* Bordes: slate-200 */}
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
                      ? // Tab activo: usa themeConfig.tabActive (emerald-600 / bg-emerald-500/10)
                        themeConfig.tabActive 
                      : // Tab inactivo: texto gray-600 (Texto secundario) y hover bg-gray-50
                        'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {/* Ícono: usa el color del tab, si está activo usa emerald-600, si no slate-400 */}
                    <IconComponent className={`w-5 h-5 ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{tab.label}</div>
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
        {/* Fondo de contenedores: bg-gray-100 */}
        <div className="p-4 border-b border-slate-200 bg-gray-100"> 
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Búsqueda */}
              <div className="relative">
                {/* Ícono: slate-400 */}
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
                  // Bordes: slate-200. Focus: usa themeConfig.focusRing (Anillos con transparencia)
                  className={`pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-64 ${themeConfig.focusRing} focus:border-transparent outline-none text-gray-800`}
                />
              </div>

              {/* Filtros específicos por tab */}
              {/* Bordes: slate-200. Hover: bg-emerald-50 (fondo suave del color de marca) */}
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-emerald-50 transition-colors text-gray-800">
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