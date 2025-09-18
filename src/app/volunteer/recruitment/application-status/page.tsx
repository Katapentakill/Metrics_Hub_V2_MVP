// src/app/volunteer/recruitment/application-status/page.tsx

'use client';

import { useState } from 'react';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  Globe,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Download,
  Upload,
  MessageCircle,
  Briefcase
} from 'lucide-react';

// Simula al único candidato del voluntario
const mockVolunteerData = getMockRecruitmentData(1)[0];

export default function VolunteerApplicationStatusPage() {
  const [candidate] = useState<MockCandidate>(mockVolunteerData);

  const getInterviewStatus = (date: Date | null) => {
    if (date) {
      return `${new Date(date).toLocaleDateString('es-ES')} a las ${new Date(date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return 'Por programar';
  };

  // Pasos simplificados
  const processSteps = [
    { title: 'Aplicación Enviada', status: 'completed', date: '10/09/2025' },
    { title: 'Revisión de Documentos', status: 'completed', date: '12/09/2025' },
    { title: 'Entrevista Inicial', status: 'current', date: '18/09/2025' },
    { title: 'Entrevista Técnica', status: 'pending', date: '25/09/2025' },
    { title: 'Decisión Final', status: 'pending', date: '30/09/2025' }
  ];

  // Documentos simplificados
  const documents = [
    { name: 'Curriculum Vitae', status: 'completed', file: 'CV_Maria_Gonzalez.pdf' },
    { name: 'Estado CPT/OPT', status: 'pending', file: null },
    { name: 'Referencias', status: 'under_review', file: 'Referencias.pdf' }
  ];

  const progress = 60;

  return (
    <div className="space-y-6">
      {/* Header simplificado */}
      <div className="bg-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Estado de mi Solicitud</h1>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4" />
              <span>{candidate.appliedRole}</span>
            </div>
            <p className="text-purple-200">Equipo {candidate.team}</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold">{progress}%</div>
            <p className="text-sm text-purple-200">Completado</p>
          </div>
        </div>
        
        <div className="mt-4">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            {candidate.applicationStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información personal */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Mi Información
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center pb-4 border-b">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white text-lg font-bold">MG</span>
                </div>
                <h3 className="font-semibold">María González</h3>
                <p className="text-sm text-gray-600">{candidate.volunteerType}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <span>{candidate.timezone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {doc.status === 'completed' ? 
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                      doc.status === 'under_review' ?
                      <Clock className="w-4 h-4 text-blue-500" /> :
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    }
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      {doc.file && <p className="text-xs text-gray-600">{doc.file}</p>}
                    </div>
                  </div>
                  
                  {doc.file ? (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Progreso y entrevistas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline simplificado */}
          <Card>
            <CardHeader>
              <CardTitle>Progreso del Proceso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100 text-green-600' :
                      step.status === 'current' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? 
                        <CheckCircle2 className="w-4 h-4" /> :
                        step.status === 'current' ?
                        <Clock className="w-4 h-4" /> :
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      }
                    </div>
                    
                    <div className="flex-1">
                      <p className={`font-medium ${step.status === 'current' ? 'text-blue-600' : ''}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Entrevistas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entrevista RR.HH.</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {candidate.hrInterviewDate ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-sm">
                      {candidate.hrInterviewDate ? 'Completada' : 'Pendiente'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {getInterviewStatus(candidate.hrInterviewDate)}
                  </p>
                  
                  <Button size="sm" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    {candidate.hrInterviewDate ? 'Ver Detalles' : 'Programar'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entrevista Técnica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {candidate.pmInterviewDate ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-sm">
                      {candidate.pmInterviewDate ? 'Programada' : 'Por programar'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    {getInterviewStatus(candidate.pmInterviewDate)}
                  </p>
                  
                  {candidate.interviewAssigned && (
                    <p className="text-xs text-gray-500">
                      Entrevistador: {candidate.interviewAssigned}
                    </p>
                  )}
                  
                  <Button size="sm" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Programar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comunicaciones simplificadas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comunicaciones Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium">Confirmación de postulación</p>
                  <p className="text-xs text-gray-600">15/09/2025 - Correo enviado</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium">CV aprobado</p>
                  <p className="text-xs text-gray-600">16/09/2025 - Documento revisado</p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium">Programación de entrevista</p>
                  <p className="text-xs text-gray-600">17/09/2025 - Pendiente de respuesta</p>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contactar Equipo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}