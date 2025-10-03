// src/modules/recruitment/admin/CandidateDetailView.tsx
// Vista detallada de candidato con navegación similar a ProjectDetailModal

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  Edit,
  Send,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  TrendingUp
} from 'lucide-react';
import AdminBreadcrumb from './components/AdminBreadcrumb';

interface CandidateDetailProps {
  candidateId: string;
}

// Mock data - en producción vendría de la API
const mockCandidate = {
  id: 'c1',
  name: 'Ana García Martínez',
  email: 'ana.garcia@email.com',
  phone: '+34 612 345 678',
  location: 'Madrid, España',
  position: 'Senior Frontend Developer',
  appliedDate: '2024-01-15',
  stage: 'interview',
  score: 92,
  priority: 'high',
  status: 'active',
  avatar: '/avatars/ana-garcia.jpg',
  resume: '/resumes/ana-garcia-cv.pdf',
  portfolio: 'https://anagarcia.dev',
  linkedin: 'https://linkedin.com/in/anagarcia',
  experience: '5 años',
  expectedSalary: '€55,000 - €65,000',
  availability: '2 semanas',
  skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'AWS'],
  education: [
    {
      degree: 'Ingeniería Informática',
      institution: 'Universidad Politécnica de Madrid',
      year: '2019',
      grade: 'Cum Laude'
    }
  ],
  workExperience: [
    {
      company: 'TechCorp Solutions',
      position: 'Frontend Developer',
      period: '2021 - Presente',
      description: 'Desarrollo de aplicaciones web con React y TypeScript. Liderazgo de equipo de 3 desarrolladores.'
    },
    {
      company: 'StartupXYZ',
      position: 'Junior Developer',
      period: '2019 - 2021',
      description: 'Desarrollo full-stack con MERN stack. Participación en arquitectura de microservicios.'
    }
  ],
  interviews: [
    {
      id: 'i1',
      type: 'HR Screening',
      date: '2024-01-18',
      interviewer: 'María López',
      status: 'completed',
      score: 85,
      notes: 'Excelente comunicación y motivación. Experiencia técnica sólida.'
    },
    {
      id: 'i2',
      type: 'Technical Interview',
      date: '2024-01-22',
      interviewer: 'Carlos Mendoza',
      status: 'scheduled',
      score: null,
      notes: null
    }
  ],
  notes: [
    {
      id: 'n1',
      author: 'María López',
      date: '2024-01-18',
      content: 'Candidata muy prometedora. Experiencia técnica sólida y excelente fit cultural.',
      type: 'interview'
    },
    {
      id: 'n2',
      author: 'Sistema',
      date: '2024-01-15',
      content: 'Candidata aplicó a la posición de Senior Frontend Developer.',
      type: 'system'
    }
  ]
};

export default function CandidateDetailView({ candidateId }: CandidateDetailProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'documents' | 'notes'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'screening': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interview': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'evaluation': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'offer': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Breadcrumb y navegación */}
        <div className="flex items-center justify-between mb-6">
          <AdminBreadcrumb
            items={[
              { label: 'Recruitment', href: '/admin/recruitment' },
              { label: 'Candidate Management', href: '/admin/recruitment/candidate-management' },
              { label: mockCandidate.name }
            ]}
          />
          
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </button>
        </div>

        {/* Header del candidato */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {mockCandidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{mockCandidate.name}</h1>
                <p className="text-lg text-gray-600">{mockCandidate.position}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockCandidate.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Aplicó el {new Date(mockCandidate.appliedDate).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(mockCandidate.priority)}`}>
                Prioridad {mockCandidate.priority === 'high' ? 'Alta' : mockCandidate.priority === 'medium' ? 'Media' : 'Baja'}
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStageColor(mockCandidate.stage)}`}>
                {getStageLabel(mockCandidate.stage)}
              </div>
              <div className="flex items-center space-x-1">
                <Star className={`w-5 h-5 ${getScoreColor(mockCandidate.score)}`} />
                <span className={`font-bold ${getScoreColor(mockCandidate.score)}`}>
                  {mockCandidate.score}%
                </span>
              </div>
            </div>
          </div>

          {/* Información de contacto rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${mockCandidate.email}`} className="hover:text-blue-600 transition-colors">
                {mockCandidate.email}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <a href={`tel:${mockCandidate.phone}`} className="hover:text-blue-600 transition-colors">
                {mockCandidate.phone}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{mockCandidate.experience} de experiencia</span>
            </div>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Puntuación</p>
                <p className={`text-2xl font-bold ${getScoreColor(mockCandidate.score)}`}>
                  {mockCandidate.score}%
                </p>
              </div>
              <Star className={`w-8 h-8 ${getScoreColor(mockCandidate.score)}`} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Entrevistas</p>
                <p className="text-2xl font-bold text-gray-800">
                  {mockCandidate.interviews.filter(i => i.status === 'completed').length}/{mockCandidate.interviews.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Disponibilidad</p>
                <p className="text-2xl font-bold text-gray-800">{mockCandidate.availability}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Salario Esperado</p>
                <p className="text-lg font-bold text-gray-800">{mockCandidate.expectedSalary}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Resumen', icon: User },
                { key: 'interviews', label: 'Entrevistas', icon: Users },
                { key: 'documents', label: 'Documentos', icon: FileText },
                { key: 'notes', label: 'Notas', icon: MessageSquare }
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información personal */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{mockCandidate.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Teléfono:</span>
                        <span className="font-medium">{mockCandidate.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ubicación:</span>
                        <span className="font-medium">{mockCandidate.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experiencia:</span>
                        <span className="font-medium">{mockCandidate.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Disponibilidad:</span>
                        <span className="font-medium">{mockCandidate.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Habilidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockCandidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Educación</h3>
                    <div className="space-y-3">
                      {mockCandidate.education.map((edu, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year} • {edu.grade}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experiencia laboral */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Experiencia Laboral</h3>
                    <div className="space-y-4">
                      {mockCandidate.workExperience.map((exp, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4">
                          <h4 className="font-medium text-gray-800">{exp.position}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                          <p className="text-sm text-gray-700">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces</h3>
                    <div className="space-y-2">
                      <a
                        href={mockCandidate.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Portfolio</span>
                      </a>
                      <a
                        href={mockCandidate.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Historial de Entrevistas</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Programar Entrevista</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {mockCandidate.interviews.map((interview) => (
                    <div key={interview.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            interview.status === 'completed' ? 'bg-green-500' :
                            interview.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}></div>
                          <h4 className="font-medium text-gray-800">{interview.type}</h4>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">
                            {new Date(interview.date).toLocaleDateString('es-ES')}
                          </span>
                          {interview.score && (
                            <span className={`font-bold ${getScoreColor(interview.score)}`}>
                              {interview.score}%
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Entrevistador:</span> {interview.interviewer}
                      </div>
                      
                      {interview.notes && (
                        <div className="text-sm text-gray-700 bg-white rounded p-3">
                          {interview.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Documentos</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-red-600" />
                        <div>
                          <h4 className="font-medium text-gray-800">CV / Resume</h4>
                          <p className="text-sm text-gray-600">PDF • 2.3 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Award className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-800">Certificaciones</h4>
                          <p className="text-sm text-gray-600">PDF • 1.8 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Notas y Comentarios</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Añadir Nota</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {mockCandidate.notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-800">{note.author}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            note.type === 'interview' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {note.type === 'interview' ? 'Entrevista' : 'Sistema'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(note.date).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <p className="text-gray-700">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Avanzar Etapa</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Enviar Email</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Editar</span>
            </button>
          </div>
          
          <button className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Rechazar</span>
          </button>
        </div>
      </div>
    </div>
  );
}