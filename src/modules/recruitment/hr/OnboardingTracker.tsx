// src/modules/recruitment/hr/OnboardingTracker.tsx
'use client';

import React, { useState } from 'react';
import {
  getMockRecruitmentData,
  MockCandidate,
  CandidateStatus,
  CptOptStatus,
} from '@/lib/data/mockRecruitmentData';

import {
  Pencil,
  Mail,
  Phone,
  Globe,
  Calendar,
  Briefcase,
  FileText,
  Clock,
  Plus,
  Minus,
  Trash,
  PlusCircle,
} from 'lucide-react';

// Genera los datos una sola vez fuera del componente
const initialMockData = getMockRecruitmentData(15);

// Lista de estados de reclutamiento
const allStatuses: CandidateStatus[] = [
  'Application Received',
  'HR Review',
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Accepted by Candidate',
  'Rejected by HR',
  'Rejected by PM',
  'Rejected by Candidate',
  'Onboard',
];

// Lista de roles
const roles = [
  'Innovation Manager',
  'Senior Project Manager',
  'Data Analyst',
  'Graphic Designer',
  'Software Developer',
  'UX/UI Designer',
];

const volunteerTypes = ['Regular', 'CPT', 'OPT'];

// Colores para estatus de aplicación
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

// Opciones CPT/OPT
const cptOptOptions: CptOptStatus[] = [
  'No required',
  'requested',
  'received',
  'approved',
  'rejected',
];

// Colores para documentos CPT/OPT
const c_optStatusColors = {
  'No required': 'bg-slate-100 text-slate-700',
  requested: 'bg-blue-100 text-blue-700',
  received: 'bg-purple-100 text-purple-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function OnboardingTracker() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleFieldChange = (
    candidateId: string,
    field: keyof MockCandidate,
    value: any
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, [field]: value } : c))
    );
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    console.log(`Candidato con ID ${id} eliminado temporalmente.`);
  };

  const handleAdd = (candidate: MockCandidate) => {
    console.log(
      `Candidato ${candidate.name} añadido a la base de datos de voluntarios activos.`
    );
  };

  const statusNotifications: Record<CandidateStatus, string> = {
    'Application Received': 'Notificación: “HR Review, Schedule Interview”',
    'Accepted by HR': 'Notificación: “PM Schedule Interview”',
    'Rejected by HR': 'Notificación: “Rejected”',
    'Accepted by PM':
      'Notificación: “PM Sent form and HR Send Offer Letter”',
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
    <div>
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
                  CPT/OPT Documentos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {candidates.map((candidate) => (
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
                    {/* Estatus de Aplicación */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.applicationStatus}
                        onChange={(e) =>
                          handleFieldChange(
                            candidate.id,
                            'applicationStatus',
                            e.target.value as CandidateStatus
                          )
                        }
                        className={`block w-full px-2 py-1 border rounded-md text-xs font-semibold ${getStatusColor(
                          candidate.applicationStatus
                        )}`}
                      >
                        {allStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    {/* Rol Aplicado */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.role}
                        onChange={(e) =>
                          handleFieldChange(candidate.id, 'role', e.target.value)
                        }
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    {/* Tipo Voluntario */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.volunteerType}
                        onChange={(e) =>
                          handleFieldChange(
                            candidate.id,
                            'volunteerType',
                            e.target.value
                          )
                        }
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {volunteerTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </td>
                    {/* Documentos CPT/OPT */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.cptOptStatus || 'No required'}
                        onChange={(e) =>
                          handleFieldChange(
                            candidate.id,
                            'cptOptStatus',
                            e.target.value as CptOptStatus
                          )
                        }
                        className={`block w-full px-2 py-1 border rounded-md text-xs font-semibold ${
                          c_optStatusColors[candidate.cptOptStatus]
                        }`}
                        disabled={candidate.volunteerType === 'Regular'}
                      >
                        {cptOptOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    {/* Acciones */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                      {['Rejected by HR', 'Rejected by PM', 'Rejected by Candidate'].includes(
                        candidate.applicationStatus
                      ) && (
                        <button
                          onClick={() => handleDelete(candidate.id)}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 flex items-center"
                        >
                          <Trash size={16} className="mr-1" /> Eliminar
                        </button>
                      )}
                      {candidate.applicationStatus === 'Onboard' && (
                        <button
                          onClick={() => handleAdd(candidate)}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 flex items-center"
                        >
                          <PlusCircle size={16} className="mr-1" /> Añadir
                        </button>
                      )}
                    </td>
                  </tr>
                  {/* BLOQUE EXPANDIDO */}
                  {expanded.includes(candidate.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
                          {/* CONTACTO */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Contacto</p>
                            <div className="flex items-center space-x-2">
                              <Mail size={16} />
                              <input
                                type="email"
                                value={candidate.email}
                                onChange={(e) =>
                                  handleFieldChange(candidate.id, 'email', e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-full"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone size={16} />
                              <input
                                type="text"
                                value={candidate.phone}
                                onChange={(e) =>
                                  handleFieldChange(candidate.id, 'phone', e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-full"
                              />
                            </div>
                          </div>

                          {/* DOCUMENTOS DETALLADOS */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Documentos</p>
                            <div className="flex items-center space-x-2">
                              <FileText size={16} />
                              <input
                                type="url"
                                placeholder="Link al CV"
                                value={candidate.cvLink ?? ''}
                                onChange={(e) =>
                                  handleFieldChange(candidate.id, 'cvLink', e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-full"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase size={16} />
                              <input
                                type="url"
                                placeholder="Link al Contrato"
                                value={candidate.offerLetterLink ?? ''}
                                onChange={(e) =>
                                  handleFieldChange(
                                    candidate.id,
                                    'offerLetterLink',
                                    e.target.value
                                  )
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-full"
                              />
                            </div>
                          </div>

                          {/* HORARIOS Y ENTREVISTAS */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Horarios y Entrevistas</p>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>
                                Entrevista HR: {candidate.hrInterviewDate ?? 'N/A'}{' '}
                                {candidate.interviewAssigned
                                  ? `(Asignado a: ${candidate.interviewAssigned})`
                                  : ''}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>
                                Entrevista PM: {candidate.pmInterviewDate ?? 'N/A'}{' '}
                                {candidate.supervisor
                                  ? `(Supervisor: ${candidate.supervisor})`
                                  : ''}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe size={16} />
                              <input
                                type="text"
                                placeholder="Zona horaria"
                                value={candidate.timezone ?? ''}
                                onChange={(e) =>
                                  handleFieldChange(candidate.id, 'timezone', e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-full"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <input
                                type="number"
                                value={candidate.hrsWk ?? ''}
                                onChange={(e) =>
                                  handleFieldChange(candidate.id, 'hrsWk', Number(e.target.value))
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-24"
                              />
                              <span>hrs/semana</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <input
                                type="text"
                                placeholder="Duración"
                                value={candidate.duration ?? ''}
                                onChange={(e) =>
                                  handleFieldChange(candidate.id, 'duration', e.target.value)
                                }
                                className="border rounded px-2 py-1 text-sm text-slate-700 w-32"
                              />
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
      {/* BOTÓN AÑADIR CANDIDATO */}
      <div className="px-6 py-4 bg-slate-50 flex justify-end">
        <button
          onClick={() => {
            const randomCandidate =
              initialMockData[Math.floor(Math.random() * initialMockData.length)];
            const newCandidate = { ...randomCandidate, id: `new-${Date.now()}` };
            setCandidates((prev) => [...prev, newCandidate]);
            setExpanded((prev) => [...prev, newCandidate.id]); // auto-expand
          }}
          className="bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 flex items-center"
        >
          <Plus size={16} className="mr-1" /> Añadir Candidato
        </button>
      </div>
    </div>
  );
}