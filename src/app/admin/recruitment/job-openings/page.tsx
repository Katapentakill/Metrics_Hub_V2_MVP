// src/app/admin/recruitment/job-openings/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Briefcase, PlusCircle, Clock, CheckCircle, AlertCircle, TrendingUp, Users, Calendar, Eye, Filter, ArrowUpDown, X, Edit, Trash2, PauseCircle, PlayCircle, MoreVertical } from 'lucide-react';

// Colores de la guía de diseño
// green-800: #166534 (Principal de Marca, Títulos de Iconos, Crear/Add) [cite: 3, 8]
// Emerald: #059669 (Éxito, Focus States) [cite: 3, 21]
// gray-50: #f9fafb (Fondo Principal) [cite: 5]
// White: #fffff (Fondo de Tarjetas, Botón Neutral) [cite: 5]
// slate-800: #1e293b (Títulos de Texto) [cite: 5, 23]
// slate-600: #475569 (Configurar/Settings) [cite: 8]
// slate-200: #e2e8f0 (Bordes Separadores) [cite: 5, 25]
// blue-500: #3b82f6 (Ver/View Info) [cite: 7]
// red-500: #ef4444 (Eliminar/Delete Peligro) [cite: 7]
// yellow-500: #eab308 (Advertencia/Warning) [cite: 8]
// gradiente Principal: Linear Gradiente #15803d to #14532d (Botón Principal) [cite: 11]
// gradiente Éxito: Linear Gradiente #059669 to #15803d (Botón Éxito) [cite: 11]

// Types
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

// Mock data (Modified publishedJobs to include Pausada/Eliminada status for demonstration)
const jobOpeningsStats = [
  {
    title: 'Total Vacantes',
    value: 36,
    change: { value: 15, type: 'increase', period: 'mes anterior' },
    icon: Briefcase,
    // Uso del color de 'Ver/View (Info)' - blue-500
    color: 'text-white', 
    bgColor: 'bg-gradient-to-br from-[#166534] to-[#14532d]',
  },
  {
    title: 'Pendientes de Aprobación',
    value: 12,
    change: { value: 20, type: 'increase', period: 'semana anterior' },
    icon: Clock,
    // Uso del color de 'Advertencia/Warning' - yellow-500
    color: 'text-white', 
    bgColor: 'bg-gradient-to-br from-[#ecba20] to-[#eab308]',
  },
  {
    title: 'Publicadas y Activas',
    value: 24,
    change: { value: 8, type: 'increase', period: 'mes anterior' },
    icon: CheckCircle,
    // Uso del color de 'Éxito/Confirmaciones' - Emerald
    color: 'text-white', 
    bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
  {
    title: 'Próximas a Vencer',
    value: 3,
    change: { value: -25, type: 'decrease', period: 'semana anterior' },
    icon: AlertCircle,
    // Uso del color de 'Eliminar/Delete (Peligro)' - red-500
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-[#ef4444] to-[#f05656]',
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


  const tabs: Array<{ id: TabId; label: string; icon: any; count: number; color: string }> = [
    {
      id: 'requested',
      label: 'Vacantes Solicitadas',
      icon: Clock,
      count: requestedJobs.filter(j => j.status !== 'Activa').length,
      // Usando el color de Advertencia/Warning para Pendientes
      color: 'yellow',
    },
    {
      id: 'published',
      label: 'Vacantes Publicadas',
      icon: CheckCircle,
      count: publishedJobsList.filter(j => j.status === 'Activa' || j.status === 'Por Vencer' || j.status === 'Pausada').length,
      // Usando el color Principal de Marca para Publicadas
      color: 'green',
    },
  ];

  const getStatusColor = (status: JobStatus): string => {
    // Ajuste de colores según el uso de la guía (Emerald=Éxito, red-500=Peligro, yellow-500=Advertencia) [cite: 3, 7, 8]
    const colors: Record<JobStatus, string> = {
      'Pendiente': 'bg-yellow-100 text-[#eab308]', // yellow-500
      'En Revisión': 'bg-blue-100 text-[#3b82f6]', // blue-500
      'Nuevo': 'bg-green-100 text-[#166534]', // green-800
      'Activa': 'bg-emerald-100 text-[#059669]', // Emerald
      'Por Vencer': 'bg-orange-100 text-[#eab308]', // yellow-500
      'Pausada': 'bg-slate-100 text-[#475569]', // slate-600 (settings/neutral-ish)
      'Eliminada': 'bg-red-100 text-[#ef4444]', // red-500
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Priority): string => {
    // Uso de colores de acción para Prioridad: Alta=Peligro, Media=Advertencia, Baja=Éxito
    const colors: Record<Priority, string> = {
      'Alta': 'bg-red-100 text-[#ef4444]', // red-500
      'Media': 'bg-yellow-100 text-[#eab308]', // yellow-500
      'Baja': 'bg-emerald-100 text-[#059669]', // Emerald
    };
    return colors[priority];
  };

  // HANDLERS DE NAVEGACIÓN
  const handleViewRequestedJob = (jobId: number) => {
    // Redirecciona a la página de detalles de la solicitud
    window.location.href = `/admin/recruitment/job-openings/requested/${jobId}`;
  };

  const handleViewPublishedJob = (jobId: number) => {
    // Redirecciona a la página de detalles de la publicación (nueva ruta)
    window.location.href = `/admin/recruitment/job-openings/published/${jobId}`;
  };
  // FIN HANDLERS DE NAVEGACIÓN


  const handlePublishedJobAction = (jobId: number, action: 'edit' | 'delete' | 'pause' | 'activate') => {
    setPublishedJobsList(prev => prev.map(job => {
      if (job.id === jobId) {
        if (action === 'edit') {
            console.log(`Modificar/Editar postulación ${jobId}`);
            // En un caso real, podrías redirigir a handleViewPublishedJob(jobId) o a una ruta de edición
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
    // Fondo Principal: gray-50 (#f9fafb) [cite: 5, 24]
    <div className="min-h-screen bg-gray-50 p-8"> 
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            {/* Ícono de Título: green-800 (#166534) sin fondo (fondo blanco del contenedor padre, pero el contenedor tiene gradiente) [cite: 16] */}
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              {/* Títulos (Texto): slate-800 (#1e293b) [cite: 5, 23] */}
              <h1 className="text-4xl font-bold text-[#1e293b]">Gestión de Vacantes</h1> 
              {/* Texto Normal: gray-600 (#4b5563) [cite: 5] */}
              <p className="text-xl text-[#4b5563]">Panel de Administración</p>
            </div>
          </div>
          {/* Botón Principal: Linear Gradiente #15803d to #14532d, Letra Blanco [cite: 11] (Crear/Add es green-800, y este es el botón principal de acción) [cite: 8] */}
          <button className="px-6 py-3 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Crear Nueva Vacante
          </button>
        </div>

        {/* Texto Normal: gray-600 (#4b5563) [cite: 5] */}
        <p className="text-[#4b5563] text-lg leading-relaxed mb-8 max-w-4xl">
          Gestiona todas las vacantes de la organización. Revisa solicitudes pendientes y supervisa las vacantes publicadas activamente.
        </p>

        {/* Stats Cards ... (existing code) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {jobOpeningsStats.map((stat) => {
            const Icon = stat.icon;
            return (
              // Fondo de Tarjetas: White (#fffff) con borde slate-200 [cite: 5, 14]
              <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
                <div className="flex items-center justify-between mb-4">
                  {/* Iconos en Tarjetas: Fondo de la escala de verdes, color del icono blanco. Aquí usamos el color asociado a la métrica [cite: 15] */}
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.change.type === 'increase' ? 'text-[#059669]' : 'text-[#ef4444]' // Emerald (Éxito) / red-500 (Peligro)
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.change.type === 'decrease' ? 'rotate-180' : ''}`} />
                    {Math.abs(stat.change.value)}%
                  </div>
                </div>
                <div>
                  {/* Títulos (Texto): slate-800 (#1e293b) [cite: 5, 23] */}
                  <p className="text-3xl font-bold text-[#1e293b] mb-1">{stat.value}</p>
                  {/* Texto Normal: gray-600 (#4b5563) [cite: 5] */}
                  <p className="text-sm text-[#4b5563]">{stat.title}</p>
                  <p className="text-xs text-gray-500 mt-1">vs {stat.change.period}</p>
                </div>
              </div>
            );
          })}
        </div>


        {/* Tabs Navigation */}
        {/* Fondo de Tarjetas: White (#fffff) con borde slate-200 [cite: 5, 14] */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          {/* Borde Separador: slate-200 (#e2e8f0) [cite: 5, 25] */}
          <div className="flex border-b border-[#e2e8f0]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              // Tab Activo: text-green-800 + bg-green-50 + border-b-2 border-green-800 [cite: 13]
              // Tab Inactivo: text-gray-600 + hover:text-slate-900 + hover:bg-gray-50 [cite: 13]
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all ${
                    isActive
                      ? 'text-[#166534] bg-green-50 border-b-2 border-[#166534]' // green-800
                      : 'text-[#4b5563] hover:text-slate-900 hover:bg-gray-50' // gray-600
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isActive 
                      ? `bg-${tab.color}-100 text-${tab.color}-800`
                      : 'bg-gray-100 text-[#4b5563]' // gray-600
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
              // ... (Requested Jobs Filter/Sort/Display - Using handleViewRequestedJob)
              <div>
                {/* Títulos (Texto): slate-800 (#1e293b) [cite: 5, 23] */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1e293b]">Vacantes Solicitadas</h2> 
                  <div className="flex gap-2 relative">
                    {/* Filter Button */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowFilters(!showFilters);
                          setShowSort(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Filter className="w-4 h-4" />
                        Filtrar
                        {(selectedStatus !== 'all' || selectedPriority !== 'all' || selectedDepartment !== 'all') && (
                          <span className="w-2 h-2 bg-[#166534] rounded-full"></span> // green-800 (Principal)
                        )}
                      </button>
                      
                      {/* Filter Dropdown */}
                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-10 max-h-[500px] overflow-hidden flex flex-col">
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1e293b]">Filtros</h3> {/* slate-800 */}
                            <button 
                              onClick={() => setShowFilters(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="overflow-y-auto p-4 space-y-4 flex-1">
                            {/* Status Filter */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Estado
                              </label>
                              <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value as JobStatus | 'all')}
                                // Focus States: Emerald (#059669) [cite: 3]
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="En Revisión">En Revisión</option>
                              </select>
                            </div>

                            {/* Priority Filter */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Prioridad
                              </label>
                              <select
                                value={selectedPriority}
                                onChange={(e) => setSelectedPriority(e.target.value as Priority | 'all')}
                                // Focus States: Emerald (#059669) [cite: 3]
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todas</option>
                                <option value="Alta">Alta</option>
                                <option value="Media">Media</option>
                                <option value="Baja">Baja</option>
                              </select>
                            </div>

                            {/* Department Filter */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Departamento
                              </label>
                              <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                // Focus States: Emerald (#059669) [cite: 3]
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                {departments.map(dept => (
                                  <option key={dept} value={dept}>{dept}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-2 p-4 border-t border-gray-200 bg-gray-50">
                            {/* Botón Neutral: Blanco, Letra Negro [cite: 11] (Aquí usando gray-700 para contraste) */}
                            <button
                              onClick={clearRequestedFilters}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                              Limpiar
                            </button>
                            {/* Botón de Éxito: Linear Gradiente #059669 to #15803d, Letra Blanco [cite: 11] */}
                            <button
                              onClick={() => setShowFilters(false)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#059669] to-[#15803d] text-white rounded-lg font-medium hover:from-[#15803d] hover:to-[#059669] transition-colors"
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
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        Ordenar
                      </button>

                      {/* Sort Dropdown */}
                      {showSort && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-10 py-2">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1e293b] text-sm">Ordenar por</h3> {/* slate-800 */}
                          </div>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between text-[#4b5563]" // gray-600
                          >
                            <span>Fecha de solicitud</span>
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between text-[#4b5563]" // gray-600
                          >
                            <span>Prioridad</span>
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between text-[#4b5563]" // gray-600
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
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-[#3b82f6] rounded-full text-sm"> {/* blue-500 */}
                        Estado: {selectedStatus}
                        <button onClick={() => setSelectedStatus('all')} className="hover:bg-blue-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedPriority !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-[#eab308] rounded-full text-sm"> {/* yellow-500 */}
                        Prioridad: {selectedPriority}
                        <button onClick={() => setSelectedPriority('all')} className="hover:bg-orange-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedDepartment !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-[#166534] rounded-full text-sm"> {/* green-800 */}
                        Depto: {selectedDepartment}
                        <button onClick={() => setSelectedDepartment('all')} className="hover:bg-green-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {filteredRequestedJobs.map((job) => (
                    // Fondo de Tarjetas: White/gray-50 con borde slate-200. Se usó gray-50 con border-gray-200 [cite: 5, 14, 24]
                    <div key={job.id} className="bg-white rounded-lg p-6 border border-[#e2e8f0] hover:border-[#166534] hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">{job.title}</h3> {/* slate-800 */}
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(job.priority)}`}>
                              {job.priority} Prioridad
                            </span>
                          </div>
                          <p className="text-[#4b5563] mb-2">{job.department}</p> {/* gray-600 */}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
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
                        {/* Botón de Éxito: Linear Gradiente #059669 to #15803d, Letra Blanco [cite: 11] (Ver/View Info es blue-500, pero aquí es una acción principal de la tarjeta) [cite: 7] */}
                        <button 
                          onClick={() => handleViewRequestedJob(job.id)}
                          className="px-6 py-2 bg-gradient-to-r from-[#059669] to-[#15803d] text-white rounded-lg font-medium hover:from-[#15803d] hover:to-[#059669] transition-colors flex items-center gap-2"
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
                {/* Títulos (Texto): slate-800 (#1e293b) [cite: 5, 23] */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1e293b]">Vacantes Publicadas y Activas</h2>
                  <div className="flex gap-2 relative">
                    {/* Filter Button for Published (Modified) */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowFilters(!showFilters);
                          setShowSort(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Filter className="w-4 h-4" />
                        Filtrar
                        {(publishedFilterStatus !== 'all' || publishedFilterDepartment !== 'all' || publishedFilterCandidates !== 'all') && (
                          <span className="w-2 h-2 bg-[#166534] rounded-full"></span> // green-800
                        )}
                      </button>
                      
                      {/* Filter Dropdown for Published (Modified) */}
                      {showFilters && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-10 max-h-[500px] overflow-hidden flex flex-col">
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1e293b]">Filtros</h3> {/* slate-800 */}
                            <button 
                              onClick={() => setShowFilters(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="overflow-y-auto p-4 space-y-4 flex-1">
                            {/* Status Filter */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Estado
                              </label>
                              <select
                                value={publishedFilterStatus}
                                onChange={(e) => setPublishedFilterStatus(e.target.value as JobStatus | 'all')}
                                // Focus States: Emerald (#059669) [cite: 3]
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                <option value="Activa">Activa</option>
                                <option value="Por Vencer">Por Vencer</option>
                                <option value="Pausada">Pausada</option>
                              
                              </select>
                            </div>

                            {/* Department Filter */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Departamento
                              </label>
                              <select
                                value={publishedFilterDepartment}
                                onChange={(e) => setPublishedFilterDepartment(e.target.value)}
                                // Focus States: Emerald (#059669) [cite: 3]
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                {publishedDepartments.map(dept => (
                                  <option key={dept} value={dept}>{dept}</option>
                                ))}
                              </select>
                            </div>

                            {/* Candidates Range Filter */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Número de Candidatos
                              </label>
                              <select
                                value={publishedFilterCandidates}
                                onChange={(e) => setPublishedFilterCandidates(e.target.value)}
                                // Focus States: Emerald (#059669) [cite: 3]
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todos</option>
                                <option value="0-10">0-10 candidatos</option>
                                <option value="11-30">11-30 candidatos</option>
                                <option value="31-50">31-50 candidatos</option>
                                <option value="51+">51+ candidatos</option>
                              </select>
                            </div>

                            {/* Expiry Filter (Placeholder, logic would be complex for real date ranges) */}
                            <div>
                              <label className="block text-sm font-medium text-[#4b5563] mb-2"> {/* gray-600 */}
                                Fecha de Vencimiento
                              </label>
                              <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#059669] focus:border-transparent"
                              >
                                <option value="all">Todas</option>
                                <option value="next-7">Próximos 7 días</option>
                                <option value="next-15">Próximos 15 días</option>
                                <option value="next-30">Próximos 30 días</option>
                                <option value="expired">Vencidas (Realizada con filtro de estado 'Por Vencer')</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-2 p-4 border-t border-gray-200 bg-gray-50">
                            {/* Botón Neutral: Blanco, Letra Negro [cite: 11] (Aquí usando gray-700 para contraste) */}
                            <button
                              onClick={clearPublishedFilters}
                              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                              Limpiar
                            </button>
                            {/* Botón de Éxito: Linear Gradiente #059669 to #15803d, Letra Blanco [cite: 11] */}
                            <button
                              onClick={() => setShowFilters(false)}
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#059669] to-[#15803d] text-white rounded-lg font-medium hover:from-[#15803d] hover:to-[#059669] transition-colors"
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sort Button for Published (Modified) */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowSort(!showSort);
                          setShowFilters(false);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <ArrowUpDown className="w-4 h-4" />
                        Ordenar
                      </button>

                      {/* Sort Dropdown for Published (Modified) */}
                      {showSort && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-10 py-2">
                          <div className="px-4 py-2 border-b border-gray-200">
                            <h3 className="font-semibold text-[#1e293b] text-sm">Ordenar por</h3> {/* slate-800 */}
                          </div>
                          {/* Éxito/Focus States: Emerald (#059669) [cite: 3] */}
                          <button
                            onClick={() => applyPublishedSort('publishDate')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'publishDate' ? 'text-[#059669] font-medium' : 'text-[#4b5563]' // gray-600
                            }`}
                          >
                            <span>Fecha de publicación</span>
                            {publishedSortBy === 'publishDate' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                          <button
                            onClick={() => applyPublishedSort('expiryDate')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'expiryDate' ? 'text-[#059669] font-medium' : 'text-[#4b5563]'
                            }`}
                          >
                            <span>Fecha de vencimiento</span>
                            {publishedSortBy === 'expiryDate' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                          <button
                            onClick={() => applyPublishedSort('applications')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'applications' ? 'text-[#059669] font-medium' : 'text-[#4b5563]'
                            }`}
                          >
                            <span>Número de candidatos</span>
                            {publishedSortBy === 'applications' && (
                              <span className="text-xs">{publishedSortOrder === 'desc' ? '↓' : '↑'}</span>
                            )}
                          </button>
                          <button
                            onClick={() => applyPublishedSort('title')}
                            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              publishedSortBy === 'title' ? 'text-[#059669] font-medium' : 'text-[#4b5563]'
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
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-[#059669] rounded-full text-sm"> {/* Emerald */}
                        Estado: {publishedFilterStatus}
                        <button onClick={() => setPublishedFilterStatus('all')} className="hover:bg-emerald-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {publishedFilterDepartment !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-[#166534] rounded-full text-sm"> {/* green-800 */}
                        Depto: {publishedFilterDepartment}
                        <button onClick={() => setPublishedFilterDepartment('all')} className="hover:bg-green-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {publishedFilterCandidates !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-[#3b82f6] rounded-full text-sm"> {/* blue-500 */}
                        Candidatos: {publishedFilterCandidates}
                        <button onClick={() => setPublishedFilterCandidates('all')} className="hover:bg-blue-200 rounded-full p-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
                
                <div className="space-y-4">
                  {filteredAndSortedPublishedJobs.map((job) => (
                    // Fondo de Tarjetas: White con borde slate-200. [cite: 5, 14, 25]
                    <div key={job.id} className="bg-white rounded-lg p-6 border border-[#e2e8f0] hover:border-[#166534] hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-[#1e293b]">{job.title}</h3> {/* slate-800 */}
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                          </div>
                          <p className="text-[#4b5563] mb-2">{job.department}</p> {/* gray-600 */}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
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
                          { /* Botón Ver Candidatos (Principal): Linear Gradiente #059669 to #1eb154, Letra Blanco [cite: 11] */}
                          <button className="px-4 py-2 bg-gradient-to-r from-[#059669] to-[#04875e] text-white rounded-lg font-medium hover:from-[#047854] hover:to-[#036949] transition-colors flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Ver Candidatos
                          </button>
                          { /* Botón Ver Detalles (Secundario): Linear Gradiente #22c55e to #1eb154, Letra Blanco [cite: 11] */}
                          <button 
                            onClick={() => handleViewPublishedJob(job.id)} // <--- CAMBIO CLAVE
                            className="px-4 py-2 bg-gradient-to-r from-[#22c55e] to-[#1eb154] text-white rounded-lg font-medium hover:from-[#1b9f4b] hover:to-[#188d43] transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Detalles
                          </button>
                          
                          {/* --- Acciones/Edit Dropdown (NEW) --- */}
                          <div className="relative">
                            <button
                              onClick={() => setOpenActionMenuId(openActionMenuId === job.id ? null : job.id)}
                              className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            {openActionMenuId === job.id && (
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-1">
                                <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b">Acciones</div>
                                
                                {/* Modificar/Editar (Info): blue-500 (#3b82f6) [cite: 7] */}
                                <button
                                  onClick={() => handlePublishedJobAction(job.id, 'edit')}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                  <Edit className="w-4 h-4 text-[#3b82f6]" />
                                  Modificar Postulación
                                </button>
                                
                                {job.status === 'Activa' || job.status === 'Por Vencer' ? (
                                  // Pausar (Advertencia): yellow-500 (#eab308) [cite: 8]
                                  <button
                                    onClick={() => handlePublishedJobAction(job.id, 'pause')}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                  >
                                    <PauseCircle className="w-4 h-4 text-[#eab308]" />
                                    Pausar Postulación
                                  </button>
                                ) : (
                                  // Reactivar (Éxito): Emerald (#059669) [cite: 3]
                                  <button
                                    onClick={() => handlePublishedJobAction(job.id, 'activate')}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                  >
                                    <PlayCircle className="w-4 h-4 text-[#059669]" />
                                    Reactivar Postulación
                                  </button>
                                )}
                                
                                <div className="border-t my-1"></div>
                                
                                {/* Eliminar (Peligro): red-500 (#ef4444) [cite: 7] */}
                                <button
                                  onClick={() => handlePublishedJobAction(job.id, 'delete')}
                                  className="w-full px-4 py-2 text-left text-sm text-[#ef4444] hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Eliminar Postulación
                                </button>
                              </div>
                            )}
                          </div>
                          {/* --- END Acciones/Edit Dropdown --- */}

                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredAndSortedPublishedJobs.length === 0 && (
                      <div className="text-center py-12 text-[#4b5563]"> {/* gray-600 */}
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