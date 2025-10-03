// src/app/admin/recruitment/job-openings/published/[id]/page.tsx
// src/app/admin/recruitment/job-openings/published/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit2, 
  Save, 
  Pause,
  Play,
  XCircle, 
  FileText, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Briefcase,
  AlertCircle,
  X,
  Eye,
  TrendingUp,
  // 💡 Ensure CheckCircle is here!
  CheckCircle 
} from 'lucide-react';
import AdminBreadcrumb from '@/modules/recruitment/admin/components/AdminBreadcrumb';

// Types
type JobStatus = 'Activa' | 'Pausada' | 'Por Vencer' | 'Cerrada';
type Priority = 'Alta' | 'Media' | 'Baja';

interface PublishedJob {
  id: number;
  title: string;
  department: string;
  publishDate: string;
  expiryDate: string;
  status: JobStatus;
  positions: number;
  applications: number;
  description: string;
  requirements: string[];
  location: string;
  schedule: string;
  duration: string;
  benefits: string[];
  salary?: string;
  views: number;
}

// Mock data
const mockJobs: PublishedJob[] = [
  {
    id: 1,
    title: 'Desarrollador Full Stack',
    department: 'Tecnología',
    publishDate: '2025-09-15',
    expiryDate: '2025-10-15',
    status: 'Activa',
    positions: 2,
    applications: 45,
    views: 234,
    description: 'Buscamos un desarrollador full stack experimentado para unirse a nuestro equipo de tecnología y trabajar en proyectos innovadores de impacto social.',
    requirements: [
      'Experiencia mínima de 3 años en desarrollo web',
      'Dominio de React, Node.js y bases de datos',
      'Conocimientos en metodologías ágiles',
      'Capacidad para trabajar en equipo',
      'Pasión por proyectos de impacto social'
    ],
    location: 'Remoto / Híbrido',
    schedule: 'Tiempo completo',
    duration: 'Indefinido',
    salary: '$50,000 - $70,000 anual',
    benefits: ['Seguro médico', 'Horario flexible', 'Capacitación continua', 'Días de voluntariado']
  },
  {
    id: 2,
    title: 'Diseñador UX/UI',
    department: 'Diseño',
    publishDate: '2025-09-20',
    expiryDate: '2025-10-20',
    status: 'Activa',
    positions: 1,
    applications: 28,
    views: 156,
    description: 'Diseñador creativo para crear experiencias de usuario excepcionales en nuestras plataformas digitales.',
    requirements: [
      'Portfolio con proyectos de UX/UI',
      'Experiencia en Figma y herramientas de diseño',
      'Conocimientos en diseño centrado en el usuario',
      'Habilidades de comunicación'
    ],
    location: 'Oficina Central',
    schedule: 'Tiempo completo',
    duration: '1 año (renovable)',
    salary: '$45,000 - $60,000 anual',
    benefits: ['Ambiente creativo', 'Proyectos variados', 'Desarrollo profesional']
  },
  {
    id: 3,
    title: 'Coordinador de Voluntarios',
    department: 'Recursos Humanos',
    publishDate: '2025-09-10',
    expiryDate: '2025-10-05',
    status: 'Por Vencer',
    positions: 1,
    applications: 62,
    views: 312,
    description: 'Profesional para coordinar y gestionar nuestro programa de voluntarios a nivel nacional.',
    requirements: [
      'Experiencia en gestión de personas',
      'Habilidades de organización',
      'Conocimientos en recursos humanos',
      'Excelente comunicación'
    ],
    location: 'Híbrido',
    schedule: 'Tiempo completo',
    duration: 'Indefinido',
    salary: '$40,000 - $55,000 anual',
    benefits: ['Impacto social directo', 'Red de contactos', 'Flexibilidad']
  },
];

export default function PublishedJobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  
  const [job, setJob] = useState<PublishedJob | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<PublishedJob | null>(null);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  useEffect(() => {
    const foundJob = mockJobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      setEditedJob(foundJob);
    }
  }, [jobId]);

  const getStatusColor = (status: JobStatus): string => {
    const colors: Record<JobStatus, string> = {
      'Activa': 'bg-green-100 text-green-800',
      'Pausada': 'bg-yellow-100 text-yellow-800',
      'Por Vencer': 'bg-red-100 text-red-800',
      'Cerrada': 'bg-gray-100 text-gray-800',
    };
    return colors[status];
  };

  const updateField = (field: keyof PublishedJob, value: any) => {
    if (editedJob) {
      setEditedJob({ ...editedJob, [field]: value });
    }
  };

  const updateArrayField = (field: 'requirements' | 'benefits', index: number, value: string) => {
    if (editedJob && editedJob[field]) {
      const newArray = [...editedJob[field]];
      newArray[index] = value;
      setEditedJob({ ...editedJob, [field]: newArray });
    }
  };

  const addArrayItem = (field: 'requirements' | 'benefits') => {
    if (editedJob) {
      const currentArray = editedJob[field] || [];
      setEditedJob({ ...editedJob, [field]: [...currentArray, ''] });
    }
  };

  const removeArrayItem = (field: 'requirements' | 'benefits', index: number) => {
    if (editedJob && editedJob[field]) {
      const newArray = editedJob[field].filter((_, i) => i !== index);
      setEditedJob({ ...editedJob, [field]: newArray });
    }
  };

  const handleSave = () => {
    console.log('Guardando cambios:', editedJob);
    setJob(editedJob);
    setIsEditing(false);
  };

  const handlePauseResume = () => {
    if (job) {
      const newStatus: JobStatus = job.status === 'Activa' ? 'Pausada' : 'Activa';
      const updatedJob = { ...job, status: newStatus };
      setJob(updatedJob);
      setEditedJob(updatedJob);
      setShowPauseModal(false);
      console.log(`Vacante ${newStatus}:`, job);
    }
  };

  const handleClose = () => {
    console.log('Cerrando vacante:', job);
    setShowCloseModal(false);
    router.push('/admin/recruitment/job-openings');
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vacante no encontrada</h2>
          <p className="text-gray-600 mb-6">La vacante solicitada no existe o ha sido eliminada.</p>
          <Link 
            href="/admin/recruitment/job-openings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a Vacantes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <AdminBreadcrumb
          items={[
            { label: 'Recruitment', href: '/admin/recruitment' },
            { label: 'Gestión de Vacantes', href: '/admin/recruitment/job-openings' },
            { label: job.title }
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin/recruitment/job-openings"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {isEditing ? editedJob?.title : job.title}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                <p className="text-gray-600">
                  Vacante #{job.id} | Publicada el {job.publishDate} | Vence el {job.expiryDate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {!isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPauseModal(true)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                    job.status === 'Activa' 
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {job.status === 'Activa' ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pausar
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Reanudar
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Editar
                </button>
                <button
                  onClick={() => setShowCloseModal(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Cerrar
                </button>
              </div>
            )}

            {isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedJob(job);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{job.applications}</p>
                <p className="text-sm text-gray-600">Candidatos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{job.views}</p>
                <p className="text-sm text-gray-600">Visualizaciones</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round((job.applications / job.views) * 100)}%
                </p>
                <p className="text-sm text-gray-600">Tasa de Conversión</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Información Básica */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Puesto
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedJob?.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900 font-medium text-lg">{job.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedJob?.department || ''}
                    onChange={(e) => updateField('department', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{job.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="w-4 h-4 inline mr-1" />
                  Número de Posiciones
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedJob?.positions || 1}
                    onChange={(e) => updateField('positions', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="1"
                  />
                ) : (
                  <p className="text-gray-900">{job.positions}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salario
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedJob?.salary || ''}
                    onChange={(e) => updateField('salary', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ej: $50,000 - $70,000"
                  />
                ) : (
                  <p className="text-gray-900">{job.salary || 'No especificado'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Ubicación
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedJob?.location || ''}
                    onChange={(e) => updateField('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{job.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Horario
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedJob?.schedule || ''}
                    onChange={(e) => updateField('schedule', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{job.schedule}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Duración
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedJob?.duration || ''}
                    onChange={(e) => updateField('duration', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{job.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Fecha de Vencimiento
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedJob?.expiryDate || ''}
                    onChange={(e) => updateField('expiryDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{job.expiryDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Descripción del Puesto
            </h2>
            {isEditing ? (
              <textarea
                value={editedJob?.description || ''}
                onChange={(e) => updateField('description', e.target.value)}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg">{job.description}</p>
            )}
          </div>

          {/* Requisitos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Requisitos</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('requirements')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  + Agregar Requisito
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {isEditing ? (
                editedJob?.requirements?.map((req, index) => (
                  <li key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeArrayItem('requirements', index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </li>
                ))
              ) : (
                job.requirements?.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{req}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Beneficios */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Beneficios</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('benefits')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  + Agregar Beneficio
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {isEditing ? (
                editedJob?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateArrayField('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeArrayItem('benefits', index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </li>
                ))
              ) : (
                job.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Modal de Pausar/Reanudar */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-full ${job.status === 'Activa' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  {job.status === 'Activa' ? (
                    <Pause className="w-6 h-6 text-yellow-600" />
                  ) : (
                    <Play className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {job.status === 'Activa' ? 'Pausar Vacante' : 'Reanudar Vacante'}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                {job.status === 'Activa' 
                  ? '¿Estás seguro de que deseas pausar esta vacante? No aparecerá en las búsquedas hasta que la reactives.'
                  : '¿Estás seguro de que deseas reanudar esta vacante? Volverá a estar visible para recibir candidatos.'
                }
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePauseResume}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    job.status === 'Activa'
                      ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {job.status === 'Activa' ? 'Pausar' : 'Reanudar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Cerrar */}
        {showCloseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cerrar Vacante</h3>
              </div>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas cerrar esta vacante? Esta acción no se puede deshacer y la vacante será archivada.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCloseModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Cerrar Vacante
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}