// src/modules/recruitment/admin/PositionDetailView.tsx
// Vista detallada de posición/vacante con navegación similar a ProjectDetailModal

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Star,
  Eye,
  Edit,
  Share2,
  Pause,
  Play,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  FileText,
  MessageSquare,
  Building2,
  Target,
  Award,
  Filter
} from 'lucide-react';
import AdminBreadcrumb from './components/AdminBreadcrumb';

interface PositionDetailProps {
  positionId: string;
}

// Mock data - en producción vendría de la API
const mockPosition = {
  id: 'p1',
  title: 'Senior Frontend Developer',
  department: 'Engineering',
  location: 'Madrid, España / Remoto',
  type: 'Full-time',
  level: 'Senior',
  salaryRange: '€55,000 - €70,000',
  postedDate: '2024-01-10',
  deadline: '2024-02-28',
  status: 'active',
  priority: 'high',
  description: 'Buscamos un Senior Frontend Developer para unirse a nuestro equipo de ingeniería. El candidato ideal tendrá experiencia sólida en React, TypeScript y arquitecturas modernas de frontend.',
  requirements: [
    '5+ años de experiencia en desarrollo frontend',
    'Experiencia avanzada con React y TypeScript',
    'Conocimiento de Next.js y herramientas modernas',
    'Experiencia con testing (Jest, Cypress)',
    'Conocimiento de arquitecturas escalables',
    'Inglés conversacional'
  ],
  responsibilities: [
    'Desarrollar y mantener aplicaciones web complejas',
    'Colaborar con equipos de diseño y backend',
    'Mentorizar desarrolladores junior',
    'Participar en revisiones de código',
    'Contribuir a la arquitectura técnica'
  ],
  benefits: [
    'Salario competitivo',
    'Trabajo remoto flexible',
    'Seguro médico privado',
    'Formación continua',
    'Equipamiento de trabajo',
    '25 días de vacaciones'
  ],
  skills: ['React', 'TypeScript', 'Next.js', 'Jest', 'Cypress', 'GraphQL', 'AWS'],
  hiringManager: {
    name: 'Carlos Mendoza',
    role: 'Engineering Manager',
    email: 'carlos.mendoza@company.com'
  },
  recruiter: {
    name: 'María López',
    role: 'Senior Recruiter',
    email: 'maria.lopez@company.com'
  },
  metrics: {
    totalApplications: 45,
    qualifiedCandidates: 12,
    interviewsScheduled: 8,
    inPipeline: 5,
    avgScore: 78,
    daysOpen: 18,
    viewCount: 1247,
    applicationRate: 3.6
  },
  candidates: [
    {
      id: 'c1',
      name: 'Ana García',
      stage: 'interview',
      score: 92,
      appliedDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: 'c2',
      name: 'David Chen',
      stage: 'evaluation',
      score: 88,
      appliedDate: '2024-01-12',
      priority: 'high'
    },
    {
      id: 'c3',
      name: 'Laura Martín',
      stage: 'screening',
      score: 85,
      appliedDate: '2024-01-20',
      priority: 'medium'
    },
    {
      id: 'c4',
      name: 'Roberto Silva',
      stage: 'offer',
      score: 90,
      appliedDate: '2024-01-08',
      priority: 'high'
    }
  ],
  activity: [
    {
      id: 'a1',
      type: 'application',
      description: 'Nueva aplicación de Ana García',
      date: '2024-01-15',
      user: 'Sistema'
    },
    {
      id: 'a2',
      type: 'interview',
      description: 'Entrevista programada con David Chen',
      date: '2024-01-14',
      user: 'María López'
    },
    {
      id: 'a3',
      type: 'status',
      description: 'Posición marcada como alta prioridad',
      date: '2024-01-12',
      user: 'Carlos Mendoza'
    }
  ]
};

export default function PositionDetailView({ positionId }: PositionDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'analytics' | 'activity'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'paused': return 'bg-gray-100 text-gray-800 border-slate-200';
      case 'closed': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-slate-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'paused': return 'Pausada';
      case 'closed': return 'Cerrada';
      case 'draft': return 'Borrador';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-gray-800 bg-gray-100 border-slate-200';
      case 'low': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-gray-600 bg-gray-50 border-slate-200';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'screening': return 'bg-gray-100 text-gray-800';
      case 'interview': return 'bg-emerald-100 text-emerald-800';
      case 'evaluation': return 'bg-slate-100 text-slate-800';
      case 'offer': return 'bg-emerald-100 text-emerald-800';
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

  const navigateToCandidate = (candidateId: string) => {
    router.push(`/admin/recruitment/candidates/${candidateId}`);
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(mockPosition.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Breadcrumb y navegación */}
        <div className="flex items-center justify-between mb-6">
          <AdminBreadcrumb
            items={[
              { label: 'Recruitment', href: '/admin/recruitment' },
              { label: 'Job Openings', href: '/admin/recruitment/job-openings' },
              { label: mockPosition.title }
            ]}
          />
          
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
        </div>

        {/* Header de la posición */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{mockPosition.title}</h1>
                <p className="text-lg text-gray-600">{mockPosition.department}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockPosition.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Publicado el {new Date(mockPosition.postedDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span className={daysUntilDeadline <= 7 ? 'text-emerald-600 font-medium' : ''}>
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} días restantes` : 'Vencida'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(mockPosition.priority)}`}>
                Prioridad {mockPosition.priority === 'high' ? 'Alta' : mockPosition.priority === 'medium' ? 'Media' : 'Baja'}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(mockPosition.status)}`}>
                {getStatusLabel(mockPosition.status)}
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-slate-800">{mockPosition.metrics.totalApplications}</span>
                <span className="text-sm text-gray-600">aplicaciones</span>
              </div>
            </div>
          </div>

          {/* Información clave */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{mockPosition.salaryRange}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{mockPosition.type} • {mockPosition.level}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Building2 className="w-4 h-4" />
              <span>Manager: {mockPosition.hiringManager.name}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="w-4 h-4" />
              <span>Recruiter: {mockPosition.recruiter.name}</span>
            </div>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Candidatos Calificados</p>
                <p className="text-2xl font-bold text-emerald-600">{mockPosition.metrics.qualifiedCandidates}</p>
              </div>
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En Pipeline</p>
                <p className="text-2xl font-bold text-slate-600">{mockPosition.metrics.inPipeline}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Puntuación Media</p>
                <p className="text-2xl font-bold text-emerald-600">{mockPosition.metrics.avgScore}%</p>
              </div>
              <Star className="w-8 h-8 text-emerald-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Días Abierta</p>
                <p className="text-2xl font-bold text-gray-800">{mockPosition.metrics.daysOpen}</p>
              </div>
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Descripción', icon: FileText },
                { key: 'candidates', label: 'Candidatos', icon: Users },
                { key: 'analytics', label: 'Analíticas', icon: BarChart3 },
                { key: 'activity', label: 'Actividad', icon: MessageSquare }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-600 hover:text-slate-800 hover:border-slate-300'
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Descripción principal */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Descripción del Puesto</h3>
                    <p className="text-gray-700 leading-relaxed">{mockPosition.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Responsabilidades</h3>
                    <ul className="space-y-2">
                      {mockPosition.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Requisitos</h3>
                    <ul className="space-y-2">
                      {mockPosition.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Información lateral */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Habilidades Requeridas</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockPosition.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Beneficios</h3>
                    <ul className="space-y-2">
                      {mockPosition.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Award className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Equipo</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{mockPosition.hiringManager.name}</p>
                          <p className="text-sm text-gray-600">{mockPosition.hiringManager.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Target className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{mockPosition.recruiter.name}</p>
                          <p className="text-sm text-gray-600">{mockPosition.recruiter.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'candidates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">Candidatos ({mockPosition.candidates.length})</h3>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-2 border border-slate-200 rounded-lg hover:border-emerald-500 transition-colors">
                      <Filter className="w-4 h-4" />
                      <span>Filtrar</span>
                    </button>
                    <button 
                      onClick={() => router.push('/admin/recruitment/candidate-management')}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Ver todos los candidatos
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockPosition.candidates.map((candidate) => (
                    <div 
                      key={candidate.id}
                      className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-emerald-500 transition-all duration-200 cursor-pointer group"
                      onClick={() => navigateToCandidate(candidate.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {candidate.name}
                        </h4>
                        <Eye className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className={`px-2 py-1 rounded-full text-xs ${getStageColor(candidate.stage)}`}>
                          {getStageLabel(candidate.stage)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className={`w-4 h-4 ${
                            candidate.score >= 90 ? 'text-emerald-600' : 
                            candidate.score >= 80 ? 'text-emerald-600' : 'text-gray-800'
                          }`} />
                          <span className={`font-bold text-sm ${
                            candidate.score >= 90 ? 'text-emerald-600' : 
                            candidate.score >= 80 ? 'text-emerald-600' : 'text-gray-800'
                          }`}>
                            {candidate.score}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 mt-2">
                        Aplicó el {new Date(candidate.appliedDate).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pipeline visual */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-slate-800 mb-4">Pipeline de Candidatos</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {['screening', 'interview', 'evaluation', 'offer'].map((stage) => {
                      const count = mockPosition.candidates.filter(c => c.stage === stage).length;
                      return (
                        <div key={stage} className="text-center">
                          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                            stage === 'screening' ? 'bg-gray-100 text-gray-800' :
                            stage === 'interview' ? 'bg-emerald-100 text-emerald-600' :
                            stage === 'evaluation' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            <span className="font-bold">{count}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-700">{getStageLabel(stage)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Analíticas de la Posición</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-600">{mockPosition.metrics.viewCount}</div>
                    <div className="text-sm text-emerald-700">Visualizaciones</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-800">{mockPosition.metrics.applicationRate}%</div>
                    <div className="text-sm text-gray-700">Tasa de Aplicación</div>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <div className="text-2xl font-bold text-slate-800">
                      {Math.round((mockPosition.metrics.qualifiedCandidates / mockPosition.metrics.totalApplications) * 100)}%
                    </div>
                    <div className="text-sm text-slate-700">Tasa de Calificación</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-slate-800 mb-4">Rendimiento vs Promedio</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aplicaciones</span>
                        <span>{mockPosition.metrics.totalApplications} vs 32 (promedio)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Calidad de Candidatos</span>
                        <span>{mockPosition.metrics.avgScore}% vs 72% (promedio)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">Actividad Reciente</h3>
                
                <div className="space-y-4">
                  {mockPosition.activity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'application' ? 'bg-emerald-100 text-emerald-600' :
                        activity.type === 'interview' ? 'bg-gray-100 text-gray-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {activity.type === 'application' ? <Users className="w-4 h-4" /> :
                         activity.type === 'interview' ? <Calendar className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-800">{activity.description}</p>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{new Date(activity.date).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-4">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition-colors flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Editar Posición</span>
            </button>
            <button className="bg-gray-100 text-slate-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Compartir</span>
            </button>
            <button className="border border-slate-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 hover:border-emerald-500 transition-colors flex items-center space-x-2">
              <Pause className="w-4 h-4" />
              <span>Pausar</span>
            </button>
          </div>
          
          <button className="text-slate-400 hover:text-slate-600 transition-colors flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Cerrar Posición</span>
          </button>
        </div>
      </div>
    </div>
  );
}