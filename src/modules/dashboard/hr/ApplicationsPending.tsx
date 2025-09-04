'use client';

import { 
  Clock, 
  UserCheck, 
  Mail, 
  Phone,
  Calendar,
  FileText,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useState } from 'react';

interface PendingApplication {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  position: string;
  appliedDate: string;
  stage: 'initial_review' | 'hr_filter' | 'interview_scheduled' | 'interview_completed';
  priority: 'high' | 'medium' | 'low';
  experience: string;
  skills: string[];
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  notes?: string;
  interviewDate?: string;
}

export default function ApplicationsPending() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const pendingApplications: PendingApplication[] = [
    {
      id: '1',
      candidateName: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+57 300 123 4567',
      position: 'Desarrolladora Frontend',
      appliedDate: '2024-02-15',
      stage: 'initial_review',
      priority: 'high',
      experience: '3 años',
      skills: ['React', 'TypeScript', 'Tailwind'],
      status: 'pending'
    },
    {
      id: '2',
      candidateName: 'Carlos Ruiz',
      email: 'carlos.ruiz@email.com',
      phone: '+57 301 987 6543',
      position: 'Diseñador UX/UI',
      appliedDate: '2024-02-14',
      stage: 'hr_filter',
      priority: 'medium',
      experience: '2 años',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      status: 'in_review',
      notes: 'Portfolio muy completo'
    },
    {
      id: '3',
      candidateName: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+57 302 456 7890',
      position: 'Project Manager',
      appliedDate: '2024-02-13',
      stage: 'interview_scheduled',
      priority: 'high',
      experience: '5 años',
      skills: ['Scrum', 'Agile', 'Leadership'],
      status: 'approved',
      interviewDate: '2024-02-20T10:00:00'
    },
    {
      id: '4',
      candidateName: 'Diego Morales',
      email: 'diego.morales@email.com',
      phone: '+57 303 789 0123',
      position: 'Marketing Digital',
      appliedDate: '2024-02-12',
      stage: 'interview_completed',
      priority: 'medium',
      experience: '1 año',
      skills: ['SEO', 'Google Ads', 'Analytics'],
      status: 'pending',
      notes: 'Entrevista muy positiva'
    },
    {
      id: '5',
      candidateName: 'Laura Pérez',
      email: 'laura.perez@email.com',
      phone: '+57 304 234 5678',
      position: 'Voluntaria General',
      appliedDate: '2024-02-11',
      stage: 'hr_filter',
      priority: 'low',
      experience: 'Sin experiencia',
      skills: ['Comunicación', 'Trabajo en equipo'],
      status: 'in_review'
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'initial_review':
        return 'bg-blue-100 text-blue-800';
      case 'hr_filter':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview_scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'interview_completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'initial_review':
        return 'Revisión Inicial';
      case 'hr_filter':
        return 'Filtro HR';
      case 'interview_scheduled':
        return 'Entrevista Programada';
      case 'interview_completed':
        return 'Entrevista Completada';
      default:
        return stage;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in_review':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleAction = (actionType: string, applicationId: string) => {
    console.log(`Executing ${actionType} for application ${applicationId}`);
    // Aquí iría la lógica real
  };

  const filteredApplications = pendingApplications.filter(app => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'urgent') return app.priority === 'high' || app.stage === 'initial_review';
    if (selectedFilter === 'interviews') return app.stage === 'interview_scheduled' || app.stage === 'interview_completed';
    return app.stage === selectedFilter;
  });

  const urgentCount = pendingApplications.filter(app => 
    app.priority === 'high' || app.stage === 'initial_review'
  ).length;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
          Aplicaciones Pendientes
          {urgentCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              {urgentCount} urgentes
            </span>
          )}
        </h3>
        <div className="flex space-x-2">
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded px-2 py-1"
          >
            <option value="all">Todas ({pendingApplications.length})</option>
            <option value="urgent">Urgentes ({urgentCount})</option>
            <option value="initial_review">Revisión Inicial</option>
            <option value="hr_filter">Filtro HR</option>
            <option value="interviews">Entrevistas</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
        {filteredApplications.map((application) => (
          <div key={application.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            {/* Header con información básica */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-slate-800">{application.candidateName}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(application.stage)}`}>
                    {getStageText(application.stage)}
                  </span>
                  <span className={`flex items-center ${getPriorityColor(application.priority)}`}>
                    <Star className="w-3 h-3 mr-1" />
                    <span className="text-xs capitalize">{application.priority}</span>
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{application.position}</p>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {application.email}
                  </span>
                  <span className="flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    {application.phone}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(application.status)}
                <span className="text-xs text-slate-500">
                  {new Date(application.appliedDate).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>

            {/* Información adicional */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-xs">
                <span className="text-slate-600">
                  <strong>Experiencia:</strong> {application.experience}
                </span>
                {application.interviewDate && (
                  <span className="flex items-center text-purple-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(application.interviewDate).toLocaleDateString('es-ES')}
                  </span>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {application.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Notas si existen */}
            {application.notes && (
              <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
                <span className="flex items-center text-blue-700">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {application.notes}
                </span>
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAction('view', application.id)}
                  className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                >
                  Ver Perfil
                </button>
                <button
                  onClick={() => handleAction('contact', application.id)}
                  className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
                >
                  Contactar
                </button>
                {application.stage === 'hr_filter' && (
                  <button
                    onClick={() => handleAction('interview', application.id)}
                    className="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors"
                  >
                    Programar Entrevista
                  </button>
                )}
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => handleAction('approve', application.id)}
                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                  title="Aprobar"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleAction('reject', application.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Rechazar"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <UserCheck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm">No hay aplicaciones que coincidan con el filtro</p>
        </div>
      )}

      {/* Resumen de acciones */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-blue-600">
              {pendingApplications.filter(a => a.stage === 'initial_review').length}
            </p>
            <p className="text-xs text-slate-600">Por Revisar</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-yellow-600">
              {pendingApplications.filter(a => a.stage === 'hr_filter').length}
            </p>
            <p className="text-xs text-slate-600">En Filtro</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-purple-600">
              {pendingApplications.filter(a => a.stage === 'interview_scheduled').length}
            </p>
            <p className="text-xs text-slate-600">Entrevistas</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              {pendingApplications.filter(a => a.stage === 'interview_completed').length}
            </p>
            <p className="text-xs text-slate-600">Completadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}