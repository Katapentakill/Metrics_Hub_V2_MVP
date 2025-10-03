// src/app/admin/recruitment/job-openings/requested/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit2, 
  Save, 
  CheckCircle, 
  XCircle, 
  FileText, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Briefcase,
  AlertCircle,
  X,
  // 💡 Add PlusCircle here to resolve the error
  PlusCircle 
} from 'lucide-react';
import AdminBreadcrumb from '@/modules/recruitment/admin/components/AdminBreadcrumb';

// Types
type JobStatus = 'Pendiente' | 'En Revisión' | 'Nuevo' | 'Activa' | 'Por Vencer';
type Priority = 'Alta' | 'Media' | 'Baja';

interface RequestedJob {
  id: number;
  title: string;
  department: string;
  requester: string;
  requestDate: string;
  status: JobStatus;
  priority: Priority;
  positions: number;
  description: string;
  requirements: string[];
  location: string;
  schedule: string;
  duration: string;
  benefits: string[];
}

// Mock data - En producción esto vendría de tu API/base de datos
const mockJobs: RequestedJob[] = [
  {
    id: 1,
    title: 'Coordinador de Proyectos',
    department: 'Gestión de Proyectos',
    requester: 'Ana García',
    requestDate: '2025-09-28',
    status: 'En Revisión',
    priority: 'Alta',
    positions: 2,
    description: 'Buscamos un coordinador experimentado para liderar múltiples proyectos de impacto social en comunidades vulnerables.',
    requirements: [
      'Experiencia mínima de 3 años en gestión de proyectos',
      'Conocimientos en metodologías ágiles',
      'Habilidades de liderazgo y trabajo en equipo',
      'Disponibilidad para viajar ocasionalmente'
    ],
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
    description: 'Profesional creativo para gestionar nuestras comunicaciones internas y externas, redes sociales y contenido digital.',
    requirements: [
      'Título en Comunicación Social o afines',
      'Experiencia en manejo de redes sociales',
      'Excelentes habilidades de redacción',
      'Conocimientos en diseño gráfico (deseable)'
    ],
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
    description: 'Voluntarios comprometidos para trabajar directamente con las comunidades en actividades de desarrollo sostenible.',
    requirements: [
      'Disponibilidad de tiempo completo',
      'Pasión por el trabajo social',
      'Capacidad de adaptación',
      'Trabajo en equipo'
    ],
    location: 'Zonas rurales',
    schedule: 'Tiempo completo',
    duration: '6 meses',
    benefits: ['Experiencia en campo', 'Alojamiento y alimentación', 'Certificación']
  },
];

export default function JobOpeningDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = Number(params.id);
  
  const [job, setJob] = useState<RequestedJob | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<RequestedJob | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    // Simular fetch de datos
    const foundJob = mockJobs.find(j => j.id === jobId);
    if (foundJob) {
      setJob(foundJob);
      setEditedJob(foundJob);
    }
  }, [jobId]);

  const getStatusColor = (status: JobStatus): string => {
    const colors: Record<JobStatus, string> = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'En Revisión': 'bg-blue-100 text-blue-800',
      'Nuevo': 'bg-purple-100 text-purple-800',
      'Activa': 'bg-green-100 text-green-800',
      'Por Vencer': 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Priority): string => {
    const colors: Record<Priority, string> = {
      'Alta': 'bg-red-100 text-red-800',
      'Media': 'bg-yellow-100 text-yellow-800',
      'Baja': 'bg-green-100 text-green-800',
    };
    return colors[priority];
  };

  const updateField = (field: keyof RequestedJob, value: any) => {
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
    console.log('Guardando cambios (solo edición):', editedJob);
    setJob(editedJob);
    setIsEditing(false);
    // Aquí llamarías a tu API para guardar
  };

  const handleRequestApproval = () => {
    console.log('Guardando cambios y solicitando aprobación:', editedJob);
    setJob(editedJob);
    setIsEditing(false);
    setShowApprovalModal(true);
  };

  const handleApprove = () => {
    console.log('Aprobando vacante y preparándose para publicar:', job);
    // En un entorno real, aquí se actualizaría el estado a 'Activa' y se redirigiría
    setShowApprovalModal(false);
    router.push('/admin/recruitment/job-openings');
  };

  const handleReject = () => {
    console.log('Rechazando vacante:', job);
    // En un entorno real, aquí se actualizaría el estado a 'Rechazada'
    setShowRejectModal(false);
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
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(job.priority)}`}>
                    {job.priority} Prioridad
                  </span>
                </div>
                <p className="text-gray-600">
                  Solicitud #{job.id} | Solicitado por {job.requester} el {job.requestDate}
                </p>
              </div>
            </div>

            {/* --- Action Buttons (Visualización) --- */}
            {!isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-md hover:bg-red-700 transition-all flex items-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Rechazar
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <Edit2 className="w-5 h-5" />
                  Editar
                </button>
                <button
                  onClick={() => setShowApprovalModal(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Aprobar
                </button>
              </div>
            )}

            {/* --- Action Buttons (Edición) - MEJORADOS --- */}
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
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar
                </button>
                <button
                  onClick={handleRequestApproval}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Guardar y Aprobar
                </button>
              </div>
            )}
          </div>
        </div>
        {/* --- End Header --- */}

        {/* Content */}
        <div className="space-y-6">
          {/* Información Básica (Sin cambios de estilo en botones) */}
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
                  <Users className="w-4 h-4 inline mr-1" />
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
                  Prioridad
                </label>
                {isEditing ? (
                  <select
                    value={editedJob?.priority || 'Media'}
                    onChange={(e) => updateField('priority', e.target.value as Priority)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(job.priority)}`}>
                    {job.priority}
                  </span>
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

          {/* Requisitos - Botón y lista MEJORADA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Requisitos</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('requirements')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-4 h-4" /> {/* Añadir PlusCircle para mejor visual */}
                  Agregar Requisito
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {isEditing ? (
                editedJob?.requirements?.map((req, index) => (
                  <li key={index} className="flex gap-3 items-center"> {/* items-center para alineación */}
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeArrayItem('requirements', index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" // Usar p-2 para ícono centrado
                      title="Eliminar Requisito"
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

          {/* Beneficios - Botón y lista MEJORADA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Beneficios</h2>
              {isEditing && (
                <button
                  onClick={() => addArrayItem('benefits')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-4 h-4" />
                  Agregar Beneficio
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {isEditing ? (
                editedJob?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex gap-3 items-center"> {/* items-center para alineación */}
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => updateArrayField('benefits', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => removeArrayItem('benefits', index)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" // Usar p-2 para ícono centrado
                      title="Eliminar Beneficio"
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

        {/* Modal de Aprobación */}
        {showApprovalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Confirmar Aprobación</h3>
              </div>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas aprobar esta vacante? Una vez aprobada, será publicada y estará disponible para recibir candidatos.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Aprobar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Rechazo */}
        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Confirmar Rechazo</h3>
              </div>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que deseas rechazar esta vacante? El solicitante será notificado y la vacante será archivada.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}