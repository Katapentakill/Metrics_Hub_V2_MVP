'use client';

import { useState } from 'react';
import {
  Briefcase,
  Search,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  Zap,
  Sparkles,
  X,
  Upload,
  Mail,
  Phone,
  Globe,
  FileText,
  User,
  CheckCircle,
  AlertCircle,
  Calendar,
  Download,
  MessageCircle,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';

// Shared Types
interface Job {
  id: string;
  title: string;
  team: string;
  type: string;
  description: string;
  datePosted: string;
  urgent: boolean;
  skills: string[];
  timeCommitment: string;
  location: string;
  difficulty: string;
  applicants: number;
  featured: boolean;
  requirements?: string[];
  responsibilities?: string[];
}

interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  email: string;
  phone: string;
  timezone: string;
  status: 'En Proceso' | 'Completado' | 'Pendiente' | 'Rechazado';
  progress: number;
  appliedDate: string;
  documents: {
    name: string;
    status: 'completed' | 'pending' | 'under_review';
    file: string | null;
  }[];
  interviews: {
    hr: { date: Date | null; completed: boolean };
    technical: { date: Date | null; completed: boolean; interviewer?: string };
  };
}

const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Asistente de Marketing Digital',
    team: 'Marketing',
    type: 'Voluntario',
    description: 'Apoya en la gestión de redes sociales y la creación de contenido para campañas. Colabora con el equipo creativo en el desarrollo de estrategias digitales.',
    datePosted: '2025-09-10',
    urgent: false,
    skills: ['Social Media', 'Diseño Gráfico', 'Canva', 'Analytics'],
    timeCommitment: '10-15 horas/semana',
    location: 'Remoto',
    difficulty: 'Intermedio',
    applicants: 12,
    featured: true,
    requirements: ['Experiencia previa en redes sociales', 'Conocimientos de diseño', 'Disponibilidad de 10-15 horas semanales'],
    responsibilities: ['Gestionar calendarios de contenido', 'Crear posts para redes sociales', 'Analizar métricas de engagement']
  },
  {
    id: 'job-2',
    title: 'Coordinador de Eventos',
    team: 'Operaciones',
    type: 'Voluntario',
    description: 'Colabora en la planificación y ejecución de eventos y talleres para nuestra comunidad. Gestiona logística y coordina con proveedores.',
    datePosted: '2025-09-12',
    urgent: true,
    skills: ['Organización', 'Comunicación', 'Gestión de Proyectos', 'Liderazgo'],
    timeCommitment: '15-20 horas/semana',
    location: 'Híbrido',
    difficulty: 'Avanzado',
    applicants: 8,
    featured: false,
    requirements: ['Experiencia en organización de eventos', 'Habilidades de comunicación excelentes', 'Capacidad de trabajo bajo presión'],
    responsibilities: ['Coordinar logística de eventos', 'Gestionar proveedores', 'Supervisar ejecución de talleres']
  },
  {
    id: 'job-3',
    title: 'Tutor de Programación',
    team: 'Educación',
    type: 'Voluntario',
    description: 'Enseña conceptos básicos de programación a estudiantes principiantes. Crea material educativo y proporciona mentoría personalizada.',
    datePosted: '2025-09-08',
    urgent: false,
    skills: ['JavaScript', 'Python', 'Enseñanza', 'Paciencia'],
    timeCommitment: '5-10 horas/semana',
    location: 'Remoto',
    difficulty: 'Principiante',
    applicants: 25,
    featured: false,
    requirements: ['Conocimientos de programación', 'Pasión por la enseñanza', 'Paciencia con principiantes'],
    responsibilities: ['Dar tutorías individuales', 'Crear material educativo', 'Evaluar progreso de estudiantes']
  },
  {
    id: 'job-4',
    title: 'Diseñador UX/UI',
    team: 'Tecnología',
    type: 'Voluntario',
    description: 'Diseña interfaces de usuario intuitivas y atractivas para nuestras plataformas digitales. Colabora estrechamente con desarrolladores.',
    datePosted: '2025-09-14',
    urgent: true,
    skills: ['Figma', 'Adobe XD', 'Prototipado', 'Research'],
    timeCommitment: '12-18 horas/semana',
    location: 'Remoto',
    difficulty: 'Avanzado',
    applicants: 5,
    featured: true,
    requirements: ['Portfolio de diseño UX/UI', 'Dominio de Figma', 'Experiencia con metodologías de diseño'],
    responsibilities: ['Diseñar interfaces', 'Realizar investigación de usuarios', 'Colaborar con desarrolladores']
  }
];

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    'Principiante': 'bg-green-100 text-green-700 border-green-300',
    'Intermedio': 'bg-blue-100 text-blue-700 border-blue-300',
    'Avanzado': 'bg-purple-100 text-purple-700 border-purple-300'
  };
  return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-700';
};

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Hace 1 día';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
  return `Hace ${Math.ceil(diffDays / 30)} meses`;
};

// Application Form Modal Component
function ApplicationModal({ job, onClose, onSubmit }: { job: Job; onClose: () => void; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    timezone: 'EST (UTC-5)',
    cv: null as File | null,
    coverLetter: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, jobId: job.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Aplicar a {job.title}</h2>
            <p className="text-green-100">{job.team} • {job.location}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Sobre esta posición</h3>
            <p className="text-sm text-gray-700 mb-3">{job.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{job.timeCommitment}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Zona Horaria *
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="EST (UTC-5)">EST (UTC-5)</option>
                  <option value="PST (UTC-8)">PST (UTC-8)</option>
                  <option value="CST (UTC-6)">CST (UTC-6)</option>
                  <option value="MST (UTC-7)">MST (UTC-7)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Curriculum Vitae *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-green-600 font-semibold">Haz clic para subir</span> o arrastra tu CV
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX (máx. 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Carta de Presentación
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Cuéntanos por qué estás interesado en esta posición y qué puedes aportar..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
              >
                Enviar Aplicación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Job Details Modal
function JobDetailsModal({ job, onClose, onApply }: { job: Job; onClose: () => void; onApply: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex gap-2 mb-3">
                {job.urgent && (
                  <span className="bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    URGENTE
                  </span>
                )}
                {job.featured && (
                  <span className="bg-white bg-opacity-20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    DESTACADA
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
              <p className="text-green-100">{job.team} • {job.type}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <Clock className="w-4 h-4 mb-1" />
              <p className="text-xs font-semibold">{job.timeCommitment}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <MapPin className="w-4 h-4 mb-1" />
              <p className="text-xs font-semibold">{job.location}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <Users className="w-4 h-4 mb-1" />
              <p className="text-xs font-semibold">{job.applicants} aplicantes</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-3">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {job.responsibilities && (
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">Responsabilidades</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-3">Requisitos</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-3">Habilidades Requeridas</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t-2 border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={onApply}
              className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors shadow-lg"
            >
              Aplicar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function VolunteerRecruitmentSystem() {
  const [view, setView] = useState<'jobs' | 'application'>('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [userApplication, setUserApplication] = useState<Application | null>(null);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    if (selectedFilter === 'urgent') matchesFilter = job.urgent;
    else if (selectedFilter === 'remote') matchesFilter = job.location === 'Remoto';
    else if (selectedFilter === 'featured') matchesFilter = job.featured;
    
    let matchesTeam = true;
    if (selectedTeam !== 'all') matchesTeam = job.team === selectedTeam;
    
    return matchesSearch && matchesFilter && matchesTeam;
  });

  const teams = [...new Set(mockJobs.map(job => job.team))];
  const stats = {
    total: mockJobs.length,
    urgent: mockJobs.filter(j => j.urgent).length,
    applications: mockJobs.reduce((acc, job) => acc + job.applicants, 0)
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleApplyClick = () => {
    setShowJobDetails(false);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (data: any) => {
    const job = mockJobs.find(j => j.id === data.jobId);
    if (!job) return;

    const newApplication: Application = {
      id: 'app-' + Date.now(),
      jobId: data.jobId,
      candidateName: data.name,
      email: data.email,
      phone: data.phone,
      timezone: data.timezone,
      status: 'En Proceso',
      progress: 20,
      appliedDate: new Date().toISOString(),
      documents: [
        { name: 'Curriculum Vitae', status: 'completed', file: data.cv?.name || 'CV.pdf' },
        { name: 'Estado CPT/OPT', status: 'pending', file: null },
        { name: 'Referencias', status: 'pending', file: null }
      ],
      interviews: {
        hr: { date: null, completed: false },
        technical: { date: null, completed: false }
      }
    };

    setUserApplication(newApplication);
    setShowApplicationForm(false);
    setView('application');
  };

  if (view === 'application' && userApplication) {
    const job = mockJobs.find(j => j.id === userApplication.jobId);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => setView('jobs')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a vacantes
          </button>

          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h1 className="text-3xl font-bold">Estado de mi Solicitud</h1>
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="text-xl font-semibold">{job?.title}</span>
                </div>
                <p className="text-green-200">Equipo {job?.team}</p>
              </div>
              
              <div className="text-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-30">
                <div className="text-4xl font-bold mb-1">{userApplication.progress}%</div>
                <p className="text-sm text-green-200">Completado</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                {userApplication.status}
              </span>
              <div className="flex-1 bg-white bg-opacity-20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all"
                  style={{ width: `${userApplication.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-600" />
                    Mi Información
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-center pb-6 border-b border-gray-200 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <span className="text-white text-2xl font-bold">
                        {userApplication.candidateName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{userApplication.candidateName}</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{userApplication.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{userApplication.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{userApplication.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Documentos
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {userApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                      <div className="flex items-center gap-3">
                        {doc.status === 'completed' ? 
                          <CheckCircle className="w-5 h-5 text-green-500" /> :
                          doc.status === 'under_review' ?
                          <Clock className="w-5 h-5 text-blue-500" /> :
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        }
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                          {doc.file && <p className="text-xs text-gray-500">{doc.file}</p>}
                        </div>
                      </div>
                      
                      {doc.file ? (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      ) : (
                        <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                          <Upload className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900">Progreso del Proceso</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Aplicación Enviada</p>
                        <p className="text-sm text-gray-600">{new Date(userApplication.appliedDate).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-blue-600">Revisión de Documentos</p>
                        <p className="text-sm text-gray-600">En progreso</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        En Progreso
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Entrevista Inicial</p>
                        <p className="text-sm text-gray-600">Pendiente</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Entrevista Técnica</p>
                        <p className="text-sm text-gray-600">Pendiente</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Decisión Final</p>
                        <p className="text-sm text-gray-600">Pendiente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    Próximos Pasos
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">✅ Aplicación recibida</p>
                      <p className="text-xs text-gray-600 mt-1">Tu solicitud ha sido enviada exitosamente</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">📋 Revisión en curso</p>
                      <p className="text-xs text-gray-600 mt-1">Nuestro equipo está revisando tus documentos</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-semibold text-gray-900">⏳ Pendiente</p>
                      <p className="text-xs text-gray-600 mt-1">Te contactaremos pronto para programar entrevista</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border-2 border-gray-200">
                    <MessageCircle className="w-4 h-4" />
                    Contactar Equipo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-16 -translate-x-16" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-2">
                  Vacantes Disponibles
                  <Sparkles className="w-7 h-7" />
                </h1>
              </div>
            </div>
            <p className="text-green-100 text-lg mb-6">
              Descubre oportunidades para contribuir y crecer con nosotros
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-green-600 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-bold text-2xl">{stats.total}</span>
                </div>
                <p className="text-sm text-green-200">Vacantes Activas</p>
              </div>
              
              <div className="bg-green-600 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold text-2xl">{stats.urgent}</span>
                </div>
                <p className="text-sm text-green-200">Urgentes</p>
              </div>
              
              <div className="bg-green-600 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="font-bold text-2xl">{stats.applications}</span>
                </div>
                <p className="text-sm text-green-200">Aplicaciones</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por rol, equipo o habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select 
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              >
                <option value="all">Todas</option>
                <option value="urgent">Urgentes</option>
                <option value="remote">Remotas</option>
                <option value="featured">Destacadas</option>
              </select>
              
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              >
                <option value="all">Todos los equipos</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">
              Mostrando <span className="text-green-600 font-bold">{filteredJobs.length}</span> de {stats.total} vacantes
            </span>
            {(selectedFilter !== 'all' || selectedTeam !== 'all') && (
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSelectedTeam('all');
                  setSearchTerm('');
                }}
                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
              >
                <Filter className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron vacantes</h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda o explora otras categorías
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
                setSelectedTeam('all');
              }}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="group bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                {(job.urgent || job.featured) && (
                  <div className="flex gap-2 p-4 pb-0">
                    {job.urgent && (
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        URGENTE
                      </span>
                    )}
                    {job.featured && (
                      <span className="bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                        DESTACADA
                      </span>
                    )}
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{job.team}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyColor(job.difficulty)}`}>
                      {job.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{job.timeCommitment}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{job.applicants} aplicaciones</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 mt-auto">
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(job.datePosted)}
                    </span>
                    
                    <button 
                      onClick={() => handleJobClick(job)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all hover:shadow-lg group"
                    >
                      Ver Detalles
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showJobDetails && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => {
            setShowJobDetails(false);
            setSelectedJob(null);
          }}
          onApply={handleApplyClick}
        />
      )}

      {showApplicationForm && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => {
            setShowApplicationForm(false);
            setSelectedJob(null);
          }}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
}