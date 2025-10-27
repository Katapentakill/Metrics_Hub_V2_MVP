'use client';

import { useState, useMemo } from 'react';
import { getMockJobOpenings } from '@/lib/data/jobOpenings';
import { JobOpening } from '@/lib/types/jobOpenings';
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

const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    'Entry Level': 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'Intermediate': 'bg-blue-100 text-blue-700 border-blue-300',
    'Advanced': 'bg-purple-100 text-purple-700 border-purple-300',
    'Expert': 'bg-red-100 text-red-700 border-red-300',
    'Principiante': 'bg-emerald-100 text-emerald-700 border-emerald-300',
    'Intermedio': 'bg-gray-100 text-gray-700 border-slate-300',
    'Avanzado': 'bg-slate-100 text-slate-700 border-slate-300'
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-700';
};

const getTimeAgo = (date: Date | string) => {
  const actualDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - actualDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Hace 1 día';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
  return `Hace ${Math.ceil(diffDays / 30)} meses`;
};

// Application Form Modal Component
function ApplicationModal({ job, onClose, onSubmit }: { job: JobOpening; onClose: () => void; onSubmit: (data: any) => void }) {
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
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="sticky top-0 bg-emerald-600 p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Aplicar a {job.title}</h2>
            <p className="text-emerald-200">{job.department} • {job.location}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-slate-800 mb-2">Sobre esta posición</h3>
            <p className="text-sm text-gray-700 mb-3">{job.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{job.hoursPerWeek}h/semana</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Zona Horaria *
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="EST (UTC-5)">EST (UTC-5)</option>
                  <option value="PST (UTC-8)">PST (UTC-8)</option>
                  <option value="CST (UTC-6)">CST (UTC-6)</option>
                  <option value="MST (UTC-7)">MST (UTC-7)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Curriculum Vitae *
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-emerald-600 font-semibold">Haz clic para subir</span> o arrastra tu CV
                </p>
                <p className="text-xs text-gray-600">PDF, DOC, DOCX (máx. 5MB)</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Carta de Presentación
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                placeholder="Cuéntanos por qué estás interesado en esta posición y qué puedes aportar..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors shadow-lg"
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
function JobDetailsModal({ job, onClose, onApply }: { job: JobOpening; onClose: () => void; onApply: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="sticky top-0 bg-emerald-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex gap-2 mb-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(job.experienceLevel).split(' ')[0]} ${getDifficultyColor(job.experienceLevel).split(' ')[1]}`}>
                  {job.experienceLevel}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
              <p className="text-emerald-200">{job.department} • {job.jobType}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <Clock className="w-4 h-4 text-emerald-500 " />
              <p className="text-xs font-semibold text-gray-500 items-center">{job.hoursPerWeek}h/semana</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <p className="text-xs font-semibold text-gray-500 items-center">{job.location}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
              <Users className="w-4 h-4 text-emerald-500" />
              <p className="text-xs font-semibold text-gray-500 items-center">{job.applicantsCount} postulantes</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-bold text-lg text-slate-800 mb-3">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-slate-800 mb-3">Responsabilidades</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="font-bold text-lg text-slate-800 mb-3">Requisitos</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg text-slate-800 mb-3">Habilidades Requeridas</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={onApply}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-colors shadow-lg"
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
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [userApplication, setUserApplication] = useState<Application | null>(null);

  // Obtener ofertas reales publicadas
  const allJobs = useMemo(() => {
    const jobs = getMockJobOpenings(50);
    return jobs.filter(job => job.status === 'published');
  }, []);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesFilter = true;
      if (selectedFilter === 'remote') matchesFilter = job.locationType === 'Remote';
      else if (selectedFilter === 'hybrid') matchesFilter = job.locationType === 'Hybrid';

      let matchesTeam = true;
      if (selectedTeam !== 'all') matchesTeam = job.department === selectedTeam;

      return matchesSearch && matchesFilter && matchesTeam;
    });
  }, [allJobs, searchTerm, selectedFilter, selectedTeam]);

  const teams = useMemo(() => {
    return [...new Set(allJobs.map(job => job.department))];
  }, [allJobs]);

  const stats = useMemo(() => ({
    total: allJobs.length,
    urgent: 0, // Las ofertas reales no tienen flag urgent
    applications: allJobs.reduce((acc, job) => acc + job.applicantsCount, 0)
  }), [allJobs]);

  const handleJobClick = (job: JobOpening) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleApplyClick = () => {
    setShowJobDetails(false);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (data: any) => {
    const job = allJobs.find(j => j.id === data.jobId);
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
    const job = allJobs.find(j => j.id === userApplication.jobId);
    
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <button
            onClick={() => setView('jobs')}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a vacantes
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h1 className="text-3xl font-bold text-slate-800">Estado de mi Solicitud</h1>
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                  <span className="text-xl font-semibold text-slate-800">{job?.title}</span>
                </div>
                <p className="text-gray-600">Equipo {job?.department}</p>
              </div>
              
              <div className="text-center bg-gray-50 rounded-xl p-6 border border-slate-200">
                <div className="text-4xl font-bold text-slate-800 mb-1">{userApplication.progress}%</div>
                <p className="text-sm text-gray-600">Completado</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200">
                {userApplication.status}
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-emerald-600 h-3 rounded-full transition-all"
                  style={{ width: `${userApplication.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-600" />
                    Mi Información
                  </h3>
                </div>
                <div className="p-6">
                  <div className="text-center pb-6 border-b border-slate-200 mb-4">
                    <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <span className="text-white text-2xl font-bold">
                        {userApplication.candidateName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">{userApplication.candidateName}</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700">{userApplication.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700">{userApplication.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700">{userApplication.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Documentos
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {userApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-emerald-500 transition-colors">
                      <div className="flex items-center gap-3">
                        {doc.status === 'completed' ? 
                          <CheckCircle className="w-5 h-5 text-emerald-600" /> :
                          doc.status === 'under_review' ?
                          <Clock className="w-5 h-5 text-gray-600" /> :
                          <AlertCircle className="w-5 h-5 text-slate-400" />
                        }
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{doc.name}</p>
                          {doc.file && <p className="text-xs text-gray-600">{doc.file}</p>}
                        </div>
                      </div>
                      
                      {doc.file ? (
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600" />
                        </button>
                      ) : (
                        <button className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
                          <Upload className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Progreso del Proceso</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100 text-emerald-600">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">Aplicación Enviada</p>
                        <p className="text-sm text-gray-600">{new Date(userApplication.appliedDate).toLocaleDateString('es-ES')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100 text-gray-800">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">Revisión de Documentos</p>
                        <p className="text-sm text-gray-600">En progreso</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full border border-slate-200">
                        En Progreso
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">Entrevista Inicial</p>
                        <p className="text-sm text-gray-600">Pendiente</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">Entrevista Técnica</p>
                        <p className="text-sm text-gray-600">Pendiente</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100 text-slate-400">
                        <div className="w-3 h-3 rounded-full bg-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800">Decisión Final</p>
                        <p className="text-sm text-gray-600">Pendiente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    Próximos Pasos
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-sm font-semibold text-slate-800">✅ Aplicación recibida</p>
                      <p className="text-xs text-gray-600 mt-1">Tu solicitud ha sido enviada exitosamente</p>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-sm font-semibold text-slate-800">📋 Revisión en curso</p>
                      <p className="text-xs text-gray-600 mt-1">Nuestro equipo está revisando tus documentos</p>
                    </div>
                    
                    <div className="p-4 bg-gray-100 border border-slate-200 rounded-lg">
                      <p className="text-sm font-semibold text-slate-800">⏳ Pendiente</p>
                      <p className="text-xs text-gray-600 mt-1">Te contactaremos pronto para programar entrevista</p>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-3 bg-gray-100 text-slate-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-slate-200">
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-16 -translate-x-16" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Briefcase className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Vacantes Disponibles
                  
                </h1>
              </div>
            </div>
            <p className="text-xl font-semibold text-slate-800">
              Descubre oportunidades para contribuir y crecer con nosotros
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-gray-200 border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-2xl">{stats.total}</span>
                </div>
                <p className="text-sm text-gray-500">Vacantes Activas</p>
              </div>
              
              <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-gray-200 border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-2xl">{stats.urgent}</span>
                </div>
                <p className="text-sm text-gray-500">Urgentes</p>
              </div>
              
              <div className="bg-emerald-50 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-gray-200 border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-2xl">{stats.applications}</span>
                </div>
                <p className="text-sm text-gray-500">Aplicaciones</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por rol, equipo o habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="all">Todas</option>
                <option value="remote">Remoto</option>
                <option value="hybrid">Híbrido</option>
              </select>
              
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
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
              Mostrando <span className="text-emerald-600 font-bold">{filteredJobs.length}</span> de {stats.total} vacantes
            </span>
            {(selectedFilter !== 'all' || selectedTeam !== 'all') && (
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSelectedTeam('all');
                  setSearchTerm('');
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                <Filter className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No se encontraron vacantes</h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda o explora otras categorías
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
                setSelectedTeam('all');
              }}
              className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-500 transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                {job.applicantsCount > 20 && (
                  <div className="flex gap-2 p-4 pb-0">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-slate-800 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{job.department}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(job.experienceLevel)}`}>
                      {job.experienceLevel}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700 font-medium">{job.hoursPerWeek}h/semana</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700 font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700 font-medium">{job.applicantsCount} postulantes</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
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
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-auto">
                    <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(job.publishedDate || new Date())}
                    </span>
                    
                    <button 
                      onClick={() => handleJobClick(job)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-500 transition-all hover:shadow-lg group"
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