// src/app/volunteer/recruitment/application-status/page.tsx

'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  Globe,
  FileText,
  User,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Download,
  Upload,
  MessageCircle,
  Briefcase,
  Sparkles
} from 'lucide-react';

const mockCandidate = {
  name: 'María González',
  email: 'maria.gonzalez@email.com',
  phone: '+1 (555) 123-4567',
  timezone: 'EST (UTC-5)',
  appliedRole: 'Asistente de Marketing Digital',
  team: 'Marketing',
  volunteerType: 'Tiempo Parcial',
  applicationStatus: 'En Proceso',
  hrInterviewDate: new Date('2025-09-18'),
  pmInterviewDate: null,
  interviewAssigned: 'Juan Pérez'
};

const processSteps = [
  { title: 'Aplicación Enviada', status: 'completed', date: '10/09/2025' },
  { title: 'Revisión de Documentos', status: 'completed', date: '12/09/2025' },
  { title: 'Entrevista Inicial', status: 'current', date: '18/09/2025' },
  { title: 'Entrevista Técnica', status: 'pending', date: '25/09/2025' },
  { title: 'Decisión Final', status: 'pending', date: '30/09/2025' }
];

const documents = [
  { name: 'Curriculum Vitae', status: 'completed', file: 'CV_Maria_Gonzalez.pdf' },
  { name: 'Estado CPT/OPT', status: 'pending', file: null },
  { name: 'Referencias', status: 'under_review', file: 'Referencias.pdf' }
];

const getInterviewStatus = (date: Date | null) => {
  if (date) {
    return `${date.toLocaleDateString('es-ES')} a las ${date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  }
  return 'Por programar';
};

export default function VolunteerApplicationStatus() {
  const [candidate] = useState(mockCandidate);
  const progress = 60;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h1 className="text-3xl font-bold text-slate-800">Estado de mi Solicitud</h1>
                <Sparkles className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <span className="text-xl font-semibold text-slate-800">{candidate.appliedRole}</span>
              </div>
              <p className="text-gray-600">Equipo {candidate.team}</p>
            </div>

            <div className="text-center bg-gray-50 rounded-xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-slate-800 mb-1">{progress}%</div>
              <p className="text-sm text-gray-600">Completado</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold border border-slate-200">
              {candidate.applicationStatus}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Personal */}
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
                    <span className="text-white text-2xl font-bold">MG</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">{candidate.name}</h3>
                  <p className="text-sm text-gray-600">{candidate.volunteerType}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-gray-700">{candidate.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-gray-700">{candidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <span className="text-gray-700">{candidate.timezone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Documentos
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {documents.map((doc, index) => (
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

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Timeline */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">Progreso del Proceso</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                        step.status === 'current' ? 'bg-gray-100 text-gray-800' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {step.status === 'completed' ? 
                          <CheckCircle className="w-5 h-5" /> :
                          step.status === 'current' ?
                          <Clock className="w-5 h-5" /> :
                          <div className="w-3 h-3 rounded-full bg-slate-400" />
                        }
                      </div>
                      
                      <div className="flex-1">
                        <p className={`font-semibold ${step.status === 'current' ? 'text-slate-800' : 'text-slate-800'}`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-gray-600">{step.date}</p>
                      </div>

                      {step.status === 'current' && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full border border-slate-200">
                          En Progreso
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Entrevistas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Entrevista RR.HH.</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {candidate.hrInterviewDate ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-sm font-semibold">
                        {candidate.hrInterviewDate ? 'Completada' : 'Pendiente'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {getInterviewStatus(candidate.hrInterviewDate)}
                    </p>
                    
                    <button className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {candidate.hrInterviewDate ? 'Ver Detalles' : 'Programar'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Entrevista Técnica</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {candidate.pmInterviewDate ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-sm font-semibold">
                        {candidate.pmInterviewDate ? 'Programada' : 'Por programar'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {getInterviewStatus(candidate.pmInterviewDate)}
                    </p>
                    
                    {candidate.interviewAssigned && (
                      <p className="text-xs text-gray-600 p-2 bg-gray-50 rounded border border-slate-200">
                        Entrevistador: <span className="font-semibold">{candidate.interviewAssigned}</span>
                      </p>
                    )}
                    
                    <button className="w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Programar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comunicaciones */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  Comunicaciones Recientes
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm font-semibold text-slate-800">Confirmación de postulación</p>
                    <p className="text-xs text-gray-600 mt-1">15/09/2025 - Correo enviado</p>
                  </div>
                  
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-sm font-semibold text-slate-800">CV aprobado</p>
                    <p className="text-xs text-gray-600 mt-1">16/09/2025 - Documento revisado</p>
                  </div>
                  
                  <div className="p-4 bg-gray-100 border border-slate-200 rounded-lg">
                    <p className="text-sm font-semibold text-slate-800">Programación de entrevista</p>
                    <p className="text-xs text-gray-600 mt-1">17/09/2025 - Pendiente de respuesta</p>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 bg-gray-100 text-slate-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border border-slate-200">
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