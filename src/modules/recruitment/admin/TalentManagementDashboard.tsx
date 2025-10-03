// src/modules/recruitment/admin/TalentManagementDashboard.tsx
// Dashboard principal de Talent Management con navegación similar al panel de proyectos

'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Target, 
  Clock,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  Eye,
  ArrowRight,
  Briefcase,
  UserCheck,
  FileText,
  Shield,
  Award,
  Building2,
  GraduationCap,
  Star
} from 'lucide-react';
import AdminBreadcrumb from './components/AdminBreadcrumb';

interface TalentMetrics {
  totalCandidates: number;
  activePositions: number;
  hiresThisMonth: number;
  avgTimeToHire: number;
  candidatesInPipeline: number;
  interviewsScheduled: number;
  offersExtended: number;
  acceptanceRate: number;
}

interface TalentDashboardProps {
  timeframe?: '7d' | '30d' | '90d' | '1y';
}

// Mock data - en producción vendría de la API
const mockMetrics: TalentMetrics = {
  totalCandidates: 1247,
  activePositions: 24,
  hiresThisMonth: 8,
  avgTimeToHire: 18,
  candidatesInPipeline: 156,
  interviewsScheduled: 23,
  offersExtended: 5,
  acceptanceRate: 85
};

const mockCandidates = [
  {
    id: 'c1',
    name: 'Ana García',
    position: 'Frontend Developer',
    stage: 'interview',
    score: 92,
    appliedDate: '2024-01-15',
    nextStep: 'Technical Interview',
    priority: 'high'
  },
  {
    id: 'c2',
    name: 'Carlos Mendoza',
    position: 'UX Designer',
    stage: 'offer',
    score: 88,
    appliedDate: '2024-01-10',
    nextStep: 'Offer Review',
    priority: 'high'
  },
  {
    id: 'c3',
    name: 'María López',
    position: 'Backend Developer',
    stage: 'screening',
    score: 85,
    appliedDate: '2024-01-20',
    nextStep: 'HR Screening',
    priority: 'medium'
  },
  {
    id: 'c4',
    name: 'David Chen',
    position: 'Product Manager',
    stage: 'evaluation',
    score: 90,
    appliedDate: '2024-01-12',
    nextStep: 'Final Review',
    priority: 'high'
  }
];

export default function TalentManagementDashboard({ 
  timeframe = '30d' 
}: TalentDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'pipeline' | 'positions' | 'analytics'>('overview');

  // Función para navegar a candidato específico
  const navigateToCandidate = (candidateId: string) => {
    router.push(`/admin/recruitment/candidates/${candidateId}`);
  };

  // Función para navegar a posición específica
  const navigateToPosition = (positionId: string) => {
    router.push(`/admin/recruitment/positions/${positionId}`);
  };

  // Calcular métricas derivadas
  const derivedMetrics = useMemo(() => {
    const pipelineDistribution = {
      screening: mockCandidates.filter(c => c.stage === 'screening').length,
      interview: mockCandidates.filter(c => c.stage === 'interview').length,
      evaluation: mockCandidates.filter(c => c.stage === 'evaluation').length,
      offer: mockCandidates.filter(c => c.stage === 'offer').length
    };

    const priorityCandidates = mockCandidates.filter(c => c.priority === 'high').length;
    const avgScore = Math.round(mockCandidates.reduce((acc, c) => acc + c.score, 0) / mockCandidates.length);

    return {
      pipelineDistribution,
      priorityCandidates,
      avgScore,
      conversionRate: Math.round((mockMetrics.hiresThisMonth / mockMetrics.candidatesInPipeline) * 100)
    };
  }, []);

  const getMetricCard = (title: string, value: string | number, change: string, icon: React.ElementType, trend: 'up' | 'down' | 'neutral' = 'neutral') => {
    const Icon = icon;
    const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Target;
    const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <div className="flex items-center mt-2 text-sm">
              <TrendIcon className={`w-4 h-4 mr-1 ${trendColor}`} />
              <span className={trendColor}>{change}</span>
              <span className="text-gray-500 ml-1">vs período anterior</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    );
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interview': return 'bg-blue-100 text-blue-800';
      case 'evaluation': return 'bg-purple-100 text-purple-800';
      case 'offer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'screening': return 'Screening';
      case 'interview': return 'Entrevista';
      case 'evaluation': return 'Evaluación';
      case 'offer': return 'Oferta';
      default: return stage;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <AdminBreadcrumb
        items={[
          { label: 'Recruitment', href: '/admin/recruitment' },
          { label: 'Talent Management Dashboard' }
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Panel de Talent Management</h2>
          <p className="text-gray-600">Resumen y métricas de adquisición de talento</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={timeframe} 
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
            <option value="1y">Último año</option>
          </select>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricCard("Candidatos Activos", mockMetrics.candidatesInPipeline, "+15%", Users, 'up')}
        {getMetricCard("Posiciones Abiertas", mockMetrics.activePositions, "+8%", Briefcase, 'up')}
        {getMetricCard("Contrataciones", mockMetrics.hiresThisMonth, "+12%", UserCheck, 'up')}
        {getMetricCard("Tiempo Promedio", `${mockMetrics.avgTimeToHire} días`, "-5%", Clock, 'down')}
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'overview', label: 'Resumen', icon: BarChart3 },
              { key: 'pipeline', label: 'Pipeline', icon: Users },
              { key: 'positions', label: 'Posiciones', icon: Briefcase },
              { key: 'analytics', label: 'Analíticas', icon: TrendingUp }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Distribución del pipeline */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Distribución del Pipeline</h3>
                  <div className="space-y-3">
                    {Object.entries(derivedMetrics.pipelineDistribution).map(([stage, count]) => (
                      <div key={stage} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            stage === 'screening' ? 'bg-yellow-500' :
                            stage === 'interview' ? 'bg-blue-500' :
                            stage === 'evaluation' ? 'bg-purple-500' : 'bg-green-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-700">{getStageLabel(stage)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold ${
                            stage === 'screening' ? 'text-yellow-600' :
                            stage === 'interview' ? 'text-blue-600' :
                            stage === 'evaluation' ? 'text-purple-600' : 'text-green-600'
                          }`}>
                            {count}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({Math.round((count / mockCandidates.length) * 100)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Métricas de rendimiento */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Métricas de Rendimiento</h3>
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{derivedMetrics.avgScore}%</div>
                      <div className="text-sm text-blue-700">Puntuación Promedio</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">{mockMetrics.acceptanceRate}%</div>
                      <div className="text-sm text-green-700">Tasa de Aceptación</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">{derivedMetrics.conversionRate}%</div>
                      <div className="text-sm text-purple-700">Tasa de Conversión</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidatos destacados con navegación */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Candidatos Prioritarios</h3>
                  <button 
                    onClick={() => router.push('/admin/recruitment/candidate-management')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Ver todos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockCandidates.filter(c => c.priority === 'high').map((candidate) => (
                    <div 
                      key={candidate.id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      onClick={() => navigateToCandidate(candidate.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                          {candidate.name}
                        </h4>
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="font-medium">{candidate.position}</span>
                        <div className={`px-2 py-1 rounded-full text-xs ${getStageColor(candidate.stage)}`}>
                          {getStageLabel(candidate.stage)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Puntuación: </span>
                          <span className={`font-bold ${candidate.score >= 90 ? 'text-green-600' : candidate.score >= 80 ? 'text-blue-600' : 'text-yellow-600'}`}>
                            {candidate.score}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {candidate.nextStep}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Pipeline de Candidatos</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(derivedMetrics.pipelineDistribution).map(([stage, count]) => (
                  <div key={stage} className={`rounded-lg p-4 ${
                    stage === 'screening' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' :
                    stage === 'interview' ? 'bg-gradient-to-br from-blue-50 to-blue-100' :
                    stage === 'evaluation' ? 'bg-gradient-to-br from-purple-50 to-purple-100' : 
                    'bg-gradient-to-br from-green-50 to-green-100'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      stage === 'screening' ? 'text-yellow-600' :
                      stage === 'interview' ? 'text-blue-600' :
                      stage === 'evaluation' ? 'text-purple-600' : 'text-green-600'
                    }`}>{count}</div>
                    <div className={`text-sm ${
                      stage === 'screening' ? 'text-yellow-700' :
                      stage === 'interview' ? 'text-blue-700' :
                      stage === 'evaluation' ? 'text-purple-700' : 'text-green-700'
                    }`}>{getStageLabel(stage)}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-800 mb-4">Candidatos por Etapa</h4>
                <div className="space-y-3">
                  {mockCandidates.map((candidate) => (
                    <div 
                      key={candidate.id}
                      className="flex items-center justify-between hover:bg-white rounded-lg p-3 cursor-pointer transition-colors group"
                      onClick={() => navigateToCandidate(candidate.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          candidate.stage === 'screening' ? 'bg-yellow-500' :
                          candidate.stage === 'interview' ? 'bg-blue-500' :
                          candidate.stage === 'evaluation' ? 'bg-purple-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {candidate.name}
                          </span>
                          <div className="text-xs text-gray-500">{candidate.position}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className={`px-2 py-1 rounded-full text-xs ${getStageColor(candidate.stage)}`}>
                          {getStageLabel(candidate.stage)}
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          {candidate.score}%
                        </div>
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'positions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Posiciones Abiertas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{mockMetrics.activePositions}</div>
                  <div className="text-sm text-blue-700">Posiciones Activas</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{mockMetrics.interviewsScheduled}</div>
                  <div className="text-sm text-green-700">Entrevistas Programadas</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{mockMetrics.offersExtended}</div>
                  <div className="text-sm text-purple-700">Ofertas Extendidas</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-800 mb-4">Posiciones por Urgencia</h4>
                <div className="space-y-3">
                  {[
                    { id: 'p1', title: 'Senior Frontend Developer', department: 'Engineering', candidates: 12, priority: 'high', daysOpen: 15 },
                    { id: 'p2', title: 'UX Designer', department: 'Design', candidates: 8, priority: 'high', daysOpen: 22 },
                    { id: 'p3', title: 'Product Manager', department: 'Product', candidates: 15, priority: 'medium', daysOpen: 8 },
                    { id: 'p4', title: 'Backend Developer', department: 'Engineering', candidates: 10, priority: 'medium', daysOpen: 12 }
                  ].map((position) => (
                    <div 
                      key={position.id}
                      className="flex items-center justify-between hover:bg-white rounded-lg p-3 cursor-pointer transition-colors group"
                      onClick={() => navigateToPosition(position.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          position.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                            {position.title}
                          </span>
                          <div className="text-xs text-gray-500">{position.department}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">{position.candidates}</div>
                          <div className="text-xs text-gray-500">candidatos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-800">{position.daysOpen}</div>
                          <div className="text-xs text-gray-500">días abierta</div>
                        </div>
                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Tendencias de Contratación</h3>
                <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Gráfico de tendencias</p>
                    <p className="text-xs text-gray-400">Implementar con librería de gráficos</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">KPIs Clave</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{mockMetrics.acceptanceRate}%</div>
                    <div className="text-sm text-blue-700">Tasa de Aceptación</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{derivedMetrics.conversionRate}%</div>
                    <div className="text-sm text-green-700">Tasa de Conversión</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">{mockMetrics.avgTimeToHire}</div>
                    <div className="text-sm text-purple-700">Días Promedio</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}