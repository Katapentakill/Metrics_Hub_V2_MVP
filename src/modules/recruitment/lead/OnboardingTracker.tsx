// src/modules/recruitment/lead/OnboardingTracker.tsx
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
  Edit,
  Users, 
} from 'lucide-react';

// Genera los datos una sola vez fuera del componente
// Nota: En un entorno real, esto se cargaría dinámicamente según el supervisor.
const initialMockData = getMockRecruitmentData(15).filter(c => c.supervisor);

// Lista de estados de reclutamiento (solo los relevantes para el lead)
const leadStatuses = [
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Rejected by PM',
  'Onboard',
];

// Colores para estatus de aplicación
const getStatusColor = (status: CandidateStatus) => {
  switch (status) {
    case 'Interview Scheduled':
      return 'bg-yellow-100 text-yellow-700';
    case 'Interview Completed':
      return 'bg-orange-100 text-orange-700';
    case 'Offer Sent':
      return 'bg-sky-100 text-sky-700';
    case 'Onboard':
      return 'bg-green-100 text-green-700';
    case 'Rejected by PM':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function OnboardingTrackerLead() {
  const [candidates] = useState<MockCandidate[]>(initialMockData);
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendFeedback = (candidate: MockCandidate) => {
    console.log(`Sending interview feedback for ${candidate.name}`);
    // Lógica para enviar feedback al sistema, por ejemplo, una API call.
    alert(`Feedback for ${candidate.name} has been submitted.`);
  };

  if (candidates.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          No candidates assigned to your projects.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Onboarding Dashboard (Project Lead)</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Application Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Interview Actions
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.applicationStatus)}`}
                      >
                        {candidate.applicationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="text-sm text-slate-700">
                        {candidate.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                       {candidate.applicationStatus === 'Interview Completed' && (
                        <button
                          onClick={() => handleSendFeedback(candidate)}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 flex items-center"
                        >
                          <Edit size={16} className="mr-1" /> Send Feedback
                        </button>
                      )}
                    </td>
                  </tr>
                  {expanded.includes(candidate.id) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
                          {/* DOCUMENTOS Y CONTACTO */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Candidate Info</p>
                            <div className="flex items-center space-x-2">
                              <FileText size={16} />
                              <a href={candidate.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View CV</a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail size={16} />
                              <span>{candidate.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone size={16} />
                              <span>{candidate.phone}</span>
                            </div>
                          </div>
                          
                          {/* DETALLES DE LA ENTREVISTA */}
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Interview Details</p>
                            <div className="flex items-center space-x-2">
                              <Calendar size={16} />
                              <span>PM Interview Date: {candidate.pmInterviewDate ?? 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users size={16} />
                              <span>Interview Lead: {candidate.supervisor ?? 'N/A'}</span>
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