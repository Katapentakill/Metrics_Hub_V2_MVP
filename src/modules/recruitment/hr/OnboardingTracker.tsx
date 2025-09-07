// src/modules/recruitment/hr/OnboardingTracker.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  getMockRecruitmentData,
  MockCandidate,
  CandidateStatus,
} from '@/lib/data/mockRecruitmentData';

import {
  Pencil,
  Clock,
  FileText,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  Calendar,
  Briefcase,
  Plus,
  Minus,
} from 'lucide-react';

// Genera los datos una sola vez fuera del componente para evitar errores de hidratación
const initialMockData = getMockRecruitmentData(15);

// Notificaciones por estado de aplicación
const statusNotifications: Record<CandidateStatus, string> = {
  'Application Received': 'Notificación: “HR Review, Schedule Interview”',
  'Accepted by HR': 'Notificación: “PM Schedule Interview”',
  'Rejected by HR': 'Notificación: “Rejected”',
  'Accepted by PM': 'Notificación: “PM Sent form and HR Send Offer Letter”',
  'Rejected by PM': 'Notificación: “Rejected”',
  'Rejected by Candidate': 'Notificación: “Rejected”',
  'Accepted by Candidate':
    'Notificación: “HR Agreement, Request Docs, Welcome Letter, Records & Access”',
  'Onboard': 'Notificación: “Done”',
  'HR Review': 'Notificación: “HR Review in progress”',
  'Interview Scheduled': 'Notificación: “Interview Scheduled”',
  'Interview Completed': 'Notificación: “Interview Completed”',
  'Offer Sent': 'Notificación: “Offer Sent”',
};

// Notificaciones y colores para documentos CPT/OPT
const c_optNotifications = {
  'No required': 'No required',
  requested: 'Notificación: “Requested”',
  received: 'Notificación: “Received”',
  approved: 'Notificación: “Approved”',
  rejected: 'Notificación: “Rejected”',
};

const c_optStatusColors = {
  'No required': 'bg-slate-100 text-slate-700',
  requested: 'bg-blue-100 text-blue-700',
  received: 'bg-purple-100 text-purple-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function OnboardingTracker() {
  // Usa los datos pre-generados como el estado inicial
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [expanded, setExpanded] = useState<string[]>([]);

  // Ahora el useEffect no es necesario para cargar los datos
  useEffect(() => {
    // Si necesitas cargar datos dinámicamente, lo harías aquí.
    // Pero para los datos mock, esta función ya no es necesaria.
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const getStatusColor = (status: CandidateStatus) => {
    switch (status) {
      case 'Application Received':
        return 'bg-blue-100 text-blue-700';
      case 'HR Review':
        return 'bg-purple-100 text-purple-700';
      case 'Interview Scheduled':
        return 'bg-yellow-100 text-yellow-700';
      case 'Interview Completed':
        return 'bg-orange-100 text-orange-700';
      case 'Offer Sent':
        return 'bg-sky-100 text-sky-700';
      case 'Accepted by Candidate':
      case 'Accepted by HR':
      case 'Accepted by PM':
      case 'Onboard':
        return 'bg-green-100 text-green-700';
      case 'Rejected by HR':
      case 'Rejected by PM':
      case 'Rejected by Candidate':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (candidates.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          No hay candidatos en el rastreador de incorporación.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Candidato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Estatus de Aplicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Rol Aplicado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tipo Voluntario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Entrevista
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Documentos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {candidates.map(candidate => (
              <React.Fragment key={candidate.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleExpand(candidate.id)}
                        className="mr-2 text-slate-400 hover:text-slate-600"
                      >
                        {expanded.includes(candidate.id) ? (
                          <Minus size={16} />
                        ) : (
                          <Plus size={16} />
                        )}
                      </button>
                      <span>{candidate.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        candidate.applicationStatus,
                      )}`}
                    >
                      {candidate.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {candidate.role}
                  </td>
                  {/* Celda para el nuevo campo "Tipo Voluntario" */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {candidate.volunteerType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {candidate.hrInterviewDate ?? 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        c_optStatusColors[candidate.cptOptStatus]
                      }`}
                    >
                      {candidate.cptOptStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-900">
                      <Pencil size={18} />
                    </button>
                  </td>
                </tr>

                {expanded.includes(candidate.id) && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 bg-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
                        {/* SECCIÓN DE CONTACTO */}
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800">
                            Contacto y Rol
                          </p>
                          <div className="flex items-center space-x-2">
                            <Mail size={16} />
                            <span>{candidate.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone size={16} />
                            <span>{candidate.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase size={16} />
                            <span>
                              {candidate.role} en {candidate.team}
                            </span>
                          </div>
                        </div>

                        {/* SECCIÓN DE DOCUMENTOS Y PROGRESO */}
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800">Documentos y Progreso</p>
                          <div className="flex items-center space-x-2">
                            <FileText size={16} />
                            <span>CV: {candidate.cvLink ? <a href={candidate.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver</a> : 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>Última Actualización: {statusNotifications[candidate.applicationStatus]}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Briefcase size={16} />
                            <span>Contrato: {candidate.offerLetterStatus} - {candidate.offerLetterLink ? <a href={candidate.offerLetterLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver</a> : 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText size={16} />
                            <span>Acuerdo Voluntario: {candidate.vaStatus} - {candidate.vaLink ? <a href={candidate.vaLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver</a> : 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText size={16} />
                            <span>Carta Bienvenida: {candidate.wlStatus} - {candidate.wlLink ? <a href={candidate.wlLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ver</a> : 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 size={16} />
                            <span>Docs CPT/OPT: {c_optNotifications[candidate.cptOptStatus]}</span>
                          </div>
                        </div>

                        {/* SECCIÓN DE HORARIOS Y ENTREVISTAS */}
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-800">Horarios y Entrevistas</p>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Entrevista HR: {candidate.hrInterviewDate ?? 'N/A'} {candidate.interviewAssigned ? `(Asignado a: ${candidate.interviewAssigned})` : ''}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Entrevista PM: {candidate.pmInterviewDate ?? 'N/A'} {candidate.supervisor ? `(Supervisor: ${candidate.supervisor})` : ''}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe size={16} />
                            <span>{candidate.timezone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>{candidate.hrsWk} hrs/semana</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Duración: {candidate.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Inicio: {candidate.startDate ?? 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>Fin: {candidate.endDate ?? 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}