// src/modules/recruitment/admin/OnboardingTracker.tsx
'use client';

import React, { useState } from 'react';
import {
  getMockRecruitmentData,
  MockCandidate,
  CandidateStatus,
  CptOptStatus,
} from '@/lib/data/mockRecruitmentData';

import {
  Mail,
  Phone,
  Globe,
  Calendar,
  Briefcase,
  FileText,
  Clock,
  Plus,
  Minus,
  Search,
  Filter,
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
  'Requested',
  'Received',
  'Approved',
  'Rejected',
];

// Colores para documentos CPT/OPT
const c_optStatusColors = {
  'No required': 'bg-slate-100 text-slate-700',
  'Requested': 'bg-blue-100 text-blue-700',
  'Received': 'bg-purple-100 text-purple-700',
  'Approved': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-700',
};

export default function OnboardingTracker() {
  const [candidates] = useState<MockCandidate[]>(initialMockData);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Lógica de filtrado y búsqueda combinada
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || candidate.applicationStatus === filterStatus;
    const matchesType =
      filterType === 'All' || candidate.volunteerType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  if (candidates.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          No candidates in the onboarding tracker.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Sección de Filtros y Búsqueda */}
      <div className="bg-slate-100 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2 text-slate-600 font-semibold">
          <Filter size={20} />
          <span>Filters</span>
        </div>

        {/* Barra de Búsqueda */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search candidates..."
            className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-slate-500 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Filtro de Estatus */}
        <div className="w-full md:w-1/3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full h-10 px-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">All Statuses</option>
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro de Tipo de Voluntario */}
        <div className="w-full md:w-1/3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full h-10 px-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">All Volunteer Types</option>
            {volunteerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Application Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Volunteer Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  CPT/OPT Docs
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCandidates.map((candidate) => (
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
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          candidate.applicationStatus
                        )}`}
                      >
                        {candidate.applicationStatus}
                      </span>
                    </td>
                    {/* Rol Aplicado */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="text-sm text-slate-700">
                        {candidate.role}
                      </span>
                    </td>
                    {/* Tipo Voluntario */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="text-sm text-slate-700">
                        {candidate.volunteerType}
                      </span>
                    </td>
                    {/* Documentos CPT/OPT */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          c_optStatusColors[
                            candidate.cptOptStatus as keyof typeof c_optStatusColors
                          ]
                        }`}
                      >
                        {candidate.cptOptStatus}
                      </span>
                    </td>
                  </tr>
                  {/* BLOQUE EXPANDIDO */}
                  {expanded.includes(candidate.id) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
                          {/* CONTACTO */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">
                              Contact
                            </p>
                            <div className="flex items-center space-x-2">
                              <Mail size={16} />
                              <span>{candidate.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone size={16} />
                              <span>{candidate.phone}</span>
                            </div>
                          </div>

                          {/* DOCUMENTOS DETALLADOS */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">
                              Documents
                            </p>

                            {/* CV */}
                            <div className="flex items-center space-x-2">
                              <FileText size={16} />
                              {candidate.cvLink ? (
                                <a
                                  href={candidate.cvLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline truncate"
                                >
                                  View CV
                                </a>
                              ) : (
                                <span className="text-slate-500">N/A</span>
                              )}
                            </div>

                            {/* Offer Letter */}
                            <div className="flex items-center space-x-2">
                              <Briefcase size={16} />
                              {candidate.offerLetterLink ? (
                                <a
                                  href={candidate.offerLetterLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline truncate"
                                >
                                  View Offer Letter
                                </a>
                              ) : (
                                <span className="text-slate-500">N/A</span>
                              )}
                            </div>
                          </div>

                          {/* HORARIOS Y ENTREVISTAS */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">
                              Schedule & Interviews
                            </p>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>
                                HR Interview: {candidate.hrInterviewDate ?? 'N/A'}{' '}
                                {candidate.interviewAssigned
                                  ? `(Assigned to: ${candidate.interviewAssigned})`
                                  : ''}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>
                                PM Interview: {candidate.pmInterviewDate ?? 'N/A'}{' '}
                                {candidate.supervisor
                                  ? `(Supervisor: ${candidate.supervisor})`
                                  : ''}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Globe size={16} />
                              <span>Timezone: {candidate.timezone ?? 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>{candidate.hrsWk ?? 'N/A'} hrs/week</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>Duration: {candidate.duration ?? 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>Start Date: {candidate.startDate ?? 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>End Date: {candidate.endDate ?? 'N/A'}</span>
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
    </div>
  );
}
