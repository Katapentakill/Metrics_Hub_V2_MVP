'use client';

import React, { useState, useMemo } from 'react';
import { Briefcase, PlusCircle, Clock, CheckCircle, AlertCircle, TrendingUp, Users, Calendar, Eye, Filter, ArrowUpDown, X, Edit, Trash2, PauseCircle, PlayCircle, MoreVertical } from 'lucide-react';

// Types (sin cambios)
type JobStatus = 'Pendiente' | 'En Revisión' | 'Nuevo' | 'Activa' | 'Por Vencer' | 'Pausada' | 'Eliminada';
type Priority = 'Alta' | 'Media' | 'Baja';
type TabId = 'requested' | 'published';
type PublishedSortBy = 'publishDate' | 'expiryDate' | 'applications' | 'title';

interface RequestedJob {
  id: number;
  title: string;
  department: string;
  requester: string;
  requestDate: string;
  status: JobStatus;
  priority: Priority;
  positions: number;
  description?: string;
  requirements?: string[];
  location?: string;
  schedule?: string;
  duration?: string;
  benefits?: string[];
}

interface PublishedJob {
  id: number;
  title: string;
  department: string;
  publishDate: string;
  expiryDate: string;
  applications: number;
  status: JobStatus;
  positions: number;
}

// Mock data actualizado con colores de la guía
const jobOpeningsStats = [
  {
    title: 'Total Vacantes',
    value: 36,
    change: { value: 15, type: 'increase', period: 'mes anterior' },
    icon: Briefcase,
    color: 'text-green-800',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Pendientes de Aprobación',
    value: 12,
    change: { value: 20, type: 'increase', period: 'semana anterior' },
    icon: Clock,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    title: 'Publicadas y Activas',
    value: 24,
    change: { value: 8, type: 'increase', period: 'mes anterior' },
    icon: CheckCircle,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Próximas a Vencer',
    value: 3,
    change: { value: -25, type: 'decrease', period: 'semana anterior' },
    icon: AlertCircle,
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
  },
];

const requestedJobs: RequestedJob[] = [
  {
    id: 1,
    title: 'Coordinador de Proyectos',
    department: 'Gestión de Proyectos',
    requester: 'Ana García',
    requestDate: '2025-09-28',
    status: 'En Revisión',
    priority: 'Alta',
    positions: 2,
    location: 'Remoto / Híbrido',
    schedule: 'Tiempo completo',
    duration: 'Indefinido',
    benefits: ['Capacitación continua', 'Horario flexible', 'Seguro médico']
  },
  {
    id: 2,
    title: 'Especialista en Comunicaciones',
    department: 'Marketing y Comunicaciones',
    requester: 'Carlos Méndez',
    requestDate: '2025-09-25',
    status: 'Pendiente',
    priority: 'Media',
    positions: 1,
    location: 'Oficina Central',
    schedule: 'Tiempo completo',
    duration: '1 año (renovable)',
    benefits: ['Trabajo en equipo dinámico', 'Proyectos variados', 'Desarrollo profesional']
  },
  {
    id: 3,
    title: 'Voluntario de Campo',
    department: 'Operaciones',
    requester: 'Laura Jiménez',
    requestDate: '2025-09-29',
    status: 'Nuevo',
    priority: 'Alta',
    positions: 3,
    location: 'Zonas rurales',
    schedule: 'Tiempo completo',
    duration: '6 meses',
    benefits: ['Experiencia en campo', 'Alojamiento y alimentación', 'Certificación']
  },
];

const initialPublishedJobs: PublishedJob[] = [
  {
    id: 1,
    title: 'Desarrollador Full Stack',
    department: 'Tecnología',
    publishDate: '2025-09-15',
    expiryDate: '2025-10-15',
    applications: 45,
    status: 'Activa' as JobStatus,
    positions: 2,
  },
  {
    id: 2,
    title: 'Diseñador UX/UI',
    department: 'Diseño',
    publishDate: '2025-09-20',
    expiryDate: '2025-10-20',
    applications: 28,
    status: 'Activa' as JobStatus,
    positions: 1,
  },
  {
    id: 3,
    title: 'Coordinador de Voluntarios',
    department: 'Recursos Humanos',
    publishDate: '2025-09-10',
    expiryDate: '2025-10-05',
    applications: 62,
    status: 'Por Vencer' as JobStatus,
    positions: 1,
  },
  {
    id: 4,
    title: 'Asistente Administrativo',
    department: 'Administración',
    publishDate: '2025-08-01',
    expiryDate: '2025-09-01',
    applications: 15,
    status: 'Pausada' as JobStatus,
    positions: 1,
  },
  {
    id: 5,
    title: 'Gerente de Operaciones',
    department: 'Operaciones',
    publishDate: '2025-07-01',
    expiryDate: '2025-07-31',
    applications: 90,
    status: 'Eliminada' as JobStatus,
    positions: 1,
  },
];

export default function AdminJobOpeningsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('published');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  
  // --- Requested Jobs State (existing) ---
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  
  // --- Published Jobs State (NEW) ---
  const [publishedJobsList, setPublishedJobsList] = useState<PublishedJob[]>(initialPublishedJobs);
  const [publishedSortBy, setPublishedSortBy] = useState<PublishedSortBy>('publishDate');
  const [publishedSortOrder, setPublishedSortOrder] = useState<'asc' | 'desc'>('desc');
  const [publishedFilterStatus, setPublishedFilterStatus] = useState<JobStatus | 'all'>('all');
  const [publishedFilterDepartment, setPublishedFilterDepartment] = useState<string>('all');
  const [publishedFilterCandidates, setPublishedFilterCandidates] = useState<string>('all');

  // --- Actions State ---
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);

  const tabs: Array<{ id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; count: number; color: string }> = [
    {
      id: 'requested',
      label: 'Mis Solicitudes de Vacantes',
      icon: Clock,
      count: requestedJobs.filter(j => j.status !== 'Activa').length,
      color: 'emerald',
    },
    {
      id: 'published',
      label: 'Vacantes Publicadas',
      icon: CheckCircle,
      count: publishedJobsList.filter(j => j.status === 'Activa' || j.status === 'Por Vencer' || j.status === 'Pausada').length,
      color: 'green',
    },
  ];

  const getStatusColor = (status: JobStatus): string => {
    const colors: Record<JobStatus, string> = {
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'En Revisión': 'bg-blue-100 text-blue-800 border-blue-200',
      'Nuevo': 'bg-purple-100 text-purple-800 border-purple-200',
      'Activa': 'bg-green-100 text-green-800 border-green-200',
      'Por Vencer': 'bg-orange-100 text-orange-800 border-orange-200',
      'Pausada': 'bg-gray-100 text-gray-800 border-gray-200',
      'Eliminada': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Priority): string => {
    const colors: Record<Priority, string> = {
      'Alta': 'bg-red-100 text-red-800 border-red-200',
      'Media': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Baja': 'bg-green-100 text-green-800 border-green-200',
    };
    return colors[priority];
  };

  // HANDLERS DE NAVEGACIÓN (sin cambios)
  const handleViewRequestedJob = (jobId: number) => {
    window.location.href = `/lead/recruitment/job-openings/requested/${jobId}`;
  };

  const handleViewPublishedJob = (jobId: number) => {
    window.location.href = `/lead/recruitment/job-openings/published/${jobId}`;
  };

  const handlePublishedJobAction = (jobId: number, action: 'edit' | 'delete' | 'pause' | 'activate') => {
    setPublishedJobsList(prev => prev.map(job => {
      if (job.id === jobId) {
        if (action === 'edit') {
            console.log(`Modificar/Editar postulación ${jobId}`);
            return job; 
        } else if (action === 'delete') {
            console.log(`Eliminar postulación ${jobId}`);
            return { ...job, status: 'Eliminada' as JobStatus };
        } else if (action === 'pause') {
            console.log(`Pausar postulación ${jobId}`);
            return { ...job, status: 'Pausada' as JobStatus };
        } else if (action === 'activate') {
            console.log(`Reactivar postulación ${jobId}`);
            return { ...job, status: 'Activa' as JobStatus }; 
        }
      }
      return job;
    }));
    setOpenActionMenuId(null);
  };

  // --- Requested Jobs Logic (existing) ---
  const clearRequestedFilters = () => {
    setSelectedStatus('all');
    setSelectedPriority('all');
    setSelectedDepartment('all');
  };

  const departments = Array.from(new Set(requestedJobs.map(job => job.department)));

  const filteredRequestedJobs = requestedJobs.filter(job => {
    if (selectedStatus !== 'all' && job.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && job.priority !== selectedPriority) return false;
    if (selectedDepartment !== 'all' && job.department !== selectedDepartment) return false;
    return true;
  });
  
  // --- Published Jobs Logic (NEW/Modified) ---
  const publishedDepartments = Array.from(new Set(initialPublishedJobs.map(job => job.department)));
  
  const clearPublishedFilters = () => {
    setPublishedFilterStatus('all');
    setPublishedFilterDepartment('all');
    setPublishedFilterCandidates('all');
  };

  const applyPublishedSort = (option: PublishedSortBy) => {
    if (publishedSortBy === option) {
      setPublishedSortOrder(publishedSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setPublishedSortBy(option);
      setPublishedSortOrder('desc');
    }
    setShowSort(false);
  };
  
  const filteredAndSortedPublishedJobs = useMemo(() => {
    const filteredList = publishedJobsList.filter(job => {
      if (publishedFilterStatus !== 'all' && job.status !== publishedFilterStatus) return false;
      if (publishedFilterDepartment !== 'all' && job.department !== publishedFilterDepartment) return false;
      
      if (publishedFilterCandidates !== 'all') {
        const [min, max] = publishedFilterCandidates.includes('+')
          ? [parseInt(publishedFilterCandidates.replace('+', '')), Infinity]
          : publishedFilterCandidates.split('-').map(Number);
        
        if (job.applications < min || job.applications > max) return false;
      }
      return true;
    });

    return filteredList.sort((a, b) => {
      let comparison = 0;
      
      if (publishedSortBy === 'publishDate' || publishedSortBy === 'expiryDate') {
        const dateA = new Date(a[publishedSortBy]).getTime();
        const dateB = new Date(b[publishedSortBy]).getTime();
        comparison = dateA - dateB;
      } else if (publishedSortBy === 'applications') {
        comparison = a.applications - b.applications;
      } else if (publishedSortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      
      return publishedSortOrder === 'asc' ? comparison : -comparison;
    });
  }, [publishedJobsList, publishedFilterStatus, publishedFilterDepartment, publishedFilterCandidates, publishedSortBy, publishedSortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <a href="/hr/recruitment" className="hover:text-green-800 transition-colors">
            Recruitment
          </a>
          <span>/</span>
          <a href="/hr/recruitment" className="hover:text-green-800 transition-colors">
            Talent Management
          </a>
          <span>/</span>
          <span className="text-slate-800 font-medium">Gestión de Vacantes</span>
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-800 to-emerald-600 text-white shadow-lg">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Gestión de Vacantes</h1>
              <p className="text-xl text-slate-600">Panel de Administración</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Solicitar Nueva Vacante
          </button>
        </div>

        <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-4xl">
          Gestiona todas las vacantes de la organización. Revisa solicitudes pendientes y supervisa las vacantes publicadas activamente.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {jobOpeningsStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="group relative bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-xl hover:border-green-200 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-800 to-emerald-600">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.change.type === 'increase' ? 'text-green-800' : 'text-red-500'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.change.type === 'decrease' ? 'rotate-180' : ''}`} />
                    {Math.abs(stat.change.value)}%
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-xs text-slate-500 mt-1">vs {stat.change.period}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="flex border-b border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all ${
                    isActive
                      ? 'text-green-800 bg-green-50 border-b-2 border-green-800'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isActive 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'requested' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Vacantes Solicitadas</h2>
                  <div className="flex gap-2 relative">
                    {/* Filter Button */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowFilters(!showFilters);
                          setShowSort(false);
                        }}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 hover:border-green-300"
                      >
                        <Filter className="w-4 h-4" />
                        Filtrar
                        {(selectedStatus !== 'all' || selectedPriority !== 'all' || selectedDepartment !== 'all') && (
                          <span className="w-2 h-2 bg-green-800 rounded-full"></span>
                        )}
                      </button>
                      
                      {/* Filter Dropdown */}
                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-10 max-h-[500px] overflow-hidden flex flex-col">
                          <div className="flex justify-between items-center p-4 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-800">Filtros</h3>
                            <button 
                              onClick={() => setShowFilters(false)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="overflow-y-auto p-4 space-y-4 flex-1">
                            {/* Status Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Estado
                              </label>
                              <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as JobStatus | 'all')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Revisión">En Revisión</option>
                              </select>
                            </div>

                            {/* Priority Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Prioridad
                              </label>
                              <select
                                value={selectedPriority}
                                onChange={(e) => setSelectedPriority(e.target.value as Priority | 'all')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todas</option>
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                              </select>
                            </div>

                            {/* Department Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Departamento
                              </label>
                              <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                {departments.map(dept => (
                                  <option key={dept} value={dept}>{dept}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-2 p-4 border-t border-slate-200 bg-slate-50">
                            <button
                              onClick={clearRequestedFilters}
                              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                            >
                              Limpiar
                            </button>
                            <button
                              onClick={() => setShowFilters(false)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-800 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-colors"
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sort Button */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowSort(!showSort);
                          setShowFilters(false);
                        }}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 hover:border-green-300"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        Ordenar
                      </button>

                      {/* Sort Dropdown */}
                      {showSort && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-10 py-2">
                          <div className="px-4 py-2 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-800 text-sm">Ordenar por</h3>
                          </div>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between text-slate-700"
                          >
                            <span>Fecha de solicitud</span>
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between text-slate-700"
                          >
                            <span>Prioridad</span>
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between text-slate-700"
                          >
                            <span>Título</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Filters Display */}
                {(selectedStatus !== 'all' || selectedPriority !== 'all' || selectedDepartment !== 'all') && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedStatus !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border border-blue-200">
                        Estado: {selectedStatus}
                        <button onClick={() => setSelectedStatus('all')} className="hover:bg-blue-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedPriority !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm border border-orange-200">
                        Prioridad: {selectedPriority}
                        <button onClick={() => setSelectedPriority('all')} className="hover:bg-orange-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedDepartment !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm border border-purple-200">
                        Depto: {selectedDepartment}
                        <button onClick={() => setSelectedDepartment('all')} className="hover:bg-purple-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {filteredRequestedJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(job.priority)}`}>
                              {job.priority} Prioridad
                            </span>
                          </div>
                          <p className="text-slate-600 mb-2">{job.department}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>Solicitado por: {job.requester}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{job.requestDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.positions} posición{job.positions > 1 ? 'es' : ''}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleViewRequestedJob(job.id)}
                          className="px-6 py-2 bg-gradient-to-r from-green-800 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-5 h-5" />
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'published' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Vacantes Publicadas y Activas</h2>
                  <div className="flex gap-2 relative">
                    {/* Filter Button for Published */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowFilters(!showFilters);
                          setShowSort(false);
                        }}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 hover:border-green-300"
                      >
                        <Filter className="w-4 h-4" />
                        Filtrar
                        {(publishedFilterStatus !== 'all' || publishedFilterDepartment !== 'all' || publishedFilterCandidates !== 'all') && (
                          <span className="w-2 h-2 bg-green-800 rounded-full"></span>
                        )}
                      </button>
                      
                      {/* Filter Dropdown for Published */}
                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 z-10 max-h-[500px] overflow-hidden flex flex-col">
                          <div className="flex justify-between items-center p-4 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-800">Filtros</h3>
                            <button 
                              onClick={() => setShowFilters(false)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="overflow-y-auto p-4 space-y-4 flex-1">
                            {/* Status Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Estado
                              </label>
                              <select
                                value={publishedFilterStatus}
                                onChange={(e) => setPublishedFilterStatus(e.target.value as JobStatus | 'all')}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                <option value="Activa">Activa</option>
                                <option value="Por Vencer">Por Vencer</option>
                                <option value="Pausada">Pausada</option>
                              </select>
                            </div>

                            {/* Department Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Departamento
                              </label>
                              <select
                                value={publishedFilterDepartment}
                                onChange={(e) => setPublishedFilterDepartment(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                {publishedDepartments.map(dept => (
                                  <option key={dept} value={dept}>{dept}</option>
                                ))}
                              </select>
                            </div>

                            {/* Candidates Range Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Número de Candidatos
                              </label>
                              <select
                                value={publishedFilterCandidates}
                                onChange={(e) => setPublishedFilterCandidates(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                <option value="0-10">0-10 candidatos</option>
                                <option value="11-30">11-30 candidatos</option>
                                <option value="31-50">31-50 candidatos</option>
                                <option value="51+">51+ candidatos</option>
                              </select>
                            </div>

                            {/* Expiry Filter */}
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Fecha de Vencimiento
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-800 focus:border-transparent"
                              >
                                <option value="all">Todas</option>
                                <option value="next-7">Próximos 7 días</option>
                                <option value="next-15">Próximos 15 días</option>
                                <option value="next-30">Próximos 30 días</option>
                                <option value="expired">Vencidas</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-2 p-4 border-t border-slate-200 bg-slate-50">
                            <button
                              onClick={clearPublishedFilters}
                              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                            >
                              Limpiar
                            </button>
                            <button
                              onClick={() => setShowFilters(false)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-800 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-colors"
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sort Button for Published */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowSort(!showSort);
                          setShowFilters(false);
                        }}
                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 hover:border-green-300"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        Ordenar
                      </button>

                      {/* Sort Dropdown for Published */}
                      {showSort && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-10 py-2">
                          <div className="px-4 py-2 border-b border-slate-200">
                            <h3 className="font-semibold text-slate-800 text-sm">Ordenar por</h3>
                          </div>
                          <button
                            onClick={() => applyPublishedSort('publishDate')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'publishDate' ? 'text-green-800 font-medium' : 'text-slate-700'
                            }`}
                          >
                            <span>Fecha de publicación</span>
                            {publishedSortBy === 'publishDate' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                          <button
                            onClick={() => applyPublishedSort('expiryDate')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'expiryDate' ? 'text-green-800 font-medium' : 'text-slate-700'
                            }`}
                          >
                            <span>Fecha de vencimiento</span>
                            {publishedSortBy === 'expiryDate' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                          <button
                            onClick={() => applyPublishedSort('applications')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'applications' ? 'text-green-800 font-medium' : 'text-slate-700'
                            }`}
                          >
                            <span>Número de candidatos</span>
                            {publishedSortBy === 'applications' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                          <button
                            onClick={() => applyPublishedSort('title')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'title' ? 'text-green-800 font-medium' : 'text-slate-700'
                            }`}
                          >
                            <span>Título</span>
                            {publishedSortBy === 'title' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Active Filters Display for Published */}
                {(publishedFilterStatus !== 'all' || publishedFilterDepartment !== 'all' || publishedFilterCandidates !== 'all') && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {publishedFilterStatus !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border border-blue-200">
                        Estado: {publishedFilterStatus}
                        <button onClick={() => setPublishedFilterStatus('all')} className="hover:bg-blue-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {publishedFilterDepartment !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm border border-purple-200">
                        Depto: {publishedFilterDepartment}
                        <button onClick={() => setPublishedFilterDepartment('all')} className="hover:bg-purple-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {publishedFilterCandidates !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm border border-orange-200">
                        Candidatos: {publishedFilterCandidates}
                        <button onClick={() => setPublishedFilterCandidates('all')} className="hover:bg-orange-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
                
                <div className="space-y-4">
                  {filteredAndSortedPublishedJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-800">{job.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-2">{job.department}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Publicada: {job.publishDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              <span>Vence: {job.expiryDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{job.applications} candidatos</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.positions} posición{job.positions > 1 ? 'es' : ''}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button className="px-4 py-2 bg-gradient-to-r from-[#059669] to-[#04875e] text-white rounded-lg font-medium hover:from-[#047854] hover:to-[#036949] transition-colors flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Ver Candidatos
                          </button>
                          <button 
                            onClick={() => handleViewPublishedJob(job.id)} // <--- CAMBIO CLAVE
                            className="px-4 py-2 bg-gradient-to-r from-[#22c55e] to-[#1eb154] text-white rounded-lg font-medium hover:from-[#1b9f4b] hover:to-[#188d43] transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Detalles
                          </button>
                          
                          {/* Acciones/Edit Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() => setOpenActionMenuId(openActionMenuId === job.id ? null : job.id)}
                              className="p-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors hover:border-green-300"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            {openActionMenuId === job.id && (
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-20 py-1">
                                <div className="px-3 py-2 text-xs font-semibold text-slate-500 border-b">Acciones</div>
                                
                                <button
                                  onClick={() => handlePublishedJobAction(job.id, 'edit')}
                                  className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                                >
                                  <Edit className="w-4 h-4 text-blue-500" />
                                  Modificar Postulación
                                </button>
                                
                                {job.status === 'Activa' || job.status === 'Por Vencer' ? (
                                  <button
                                    onClick={() => handlePublishedJobAction(job.id, 'pause')}
                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                                  >
                                    <PauseCircle className="w-4 h-4 text-yellow-600" />
                                    Pausar Postulación
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handlePublishedJobAction(job.id, 'activate')}
                                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                                  >
                                    <PlayCircle className="w-4 h-4 text-green-600" />
                                    Reactivar Postulación
                                  </button>
                                )}
                                
                                <div className="border-t my-1"></div>
                                
                                <button
                                  onClick={() => handlePublishedJobAction(job.id, 'delete')}
                                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Eliminar Postulación
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredAndSortedPublishedJobs.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                          <p>No se encontraron vacantes publicadas con los filtros y criterios de búsqueda actuales.</p>
                      </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}