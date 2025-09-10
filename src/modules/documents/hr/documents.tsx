// src/modules/documents/hr/documents.tsx
// src/modules/documents/hr/documents.tsx
'use client';

import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Minus,
  Search,
  Filter,
} from 'lucide-react';

// Tipos para la gestión de documentos de RR.HH.
type DocumentStatus = 'Pending' | 'Uploaded' | 'Approved' | 'Rejected';
type CandidateStatus =
  | 'Application Received'
  | 'HR Review'
  | 'Interview Scheduled'
  | 'Interview Completed'
  | 'Offer Sent'
  | 'Accepted by Candidate'
  | 'Rejected by HR'
  | 'Rejected by PM'
  | 'Rejected by Candidate'
  | 'Onboard';

interface CandidateDocument {
  id: number;
  name: string;
  status: DocumentStatus;
}

interface CandidateWithDocs {
  id: string;
  name: string;
  applicationStatus: CandidateStatus;
  documents: CandidateDocument[];
}

// Datos simulados para el panel de RR.HH.
const initialCandidatesWithDocs: CandidateWithDocs[] = [
  {
    id: '1',
    name: 'John Doe',
    applicationStatus: 'Offer Sent',
    documents: [
      { id: 1, name: 'Resume', status: 'Approved' },
      { id: 2, name: 'Offer Letter', status: 'Pending' },
      { id: 3, name: 'OPT EAD Card', status: 'Pending' },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    applicationStatus: 'Interview Completed',
    documents: [
      { id: 1, name: 'Resume', status: 'Approved' },
      { id: 2, name: 'Portfolio', status: 'Approved' },
      { id: 3, name: 'Transcript', status: 'Uploaded' },
    ],
  },
  {
    id: '3',
    name: 'Peter Jones',
    applicationStatus: 'HR Review',
    documents: [
      { id: 1, name: 'Resume', status: 'Pending' },
      { id: 2, name: 'Cover Letter', status: 'Pending' },
    ],
  },
];

const allCandidateStatuses: CandidateStatus[] = [
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

const getDocumentStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'Uploaded':
      return 'bg-blue-100 text-blue-700';
    case 'Approved':
      return 'bg-green-100 text-green-700';
    case 'Rejected':
      return 'bg-red-100 text-red-700';
  }
};

const getDocumentStatusIcon = (status: DocumentStatus) => {
  switch (status) {
    case 'Pending':
      return <AlertCircle size={16} />;
    case 'Uploaded':
      return <Upload size={16} />;
    case 'Approved':
      return <CheckCircle size={16} />;
    case 'Rejected':
      return <XCircle size={16} />;
  }
};

export default function HrDocumentManagement() {
  const [candidates, setCandidates] = useState<CandidateWithDocs[]>(
    initialCandidatesWithDocs
  );
  const [expanded, setExpanded] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleDocumentAction = (
    candidateId: string,
    docId: number,
    action: DocumentStatus
  ) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId) {
        const updatedDocs = candidate.documents.map((doc) =>
          doc.id === docId ? { ...doc, status: action } : doc
        );
        return { ...candidate, documents: updatedDocs };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);
    alert(`Document status updated to "${action}"`);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || candidate.applicationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">HR Document Management</h1>

      {/* Barra de Herramientas y Filtros */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 placeholder:text-slate-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="w-full md:w-1/2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700"
          >
            <option value="All">All Application Statuses</option>
            {allCandidateStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de Candidatos y Documentos */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Application Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
                      {candidate.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {candidate.documents.filter((doc) => doc.status === 'Approved').length} / {candidate.documents.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {candidate.applicationStatus === 'Offer Sent' && (
                      <button
                        onClick={() => alert(`Sending offer letter for ${candidate.name}`)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full hover:bg-purple-200 transition-colors"
                      >
                        Send Offer Letter
                      </button>
                    )}
                  </td>
                </tr>
                {expanded.includes(candidate.id) && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 bg-slate-50">
                      <div className="space-y-4">
                        {candidate.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                          >
                            <div className="flex items-center space-x-3">
                              <FileText size={20} className="text-slate-500" />
                              <div>
                                <p className="font-medium text-slate-800">{doc.name}</p>
                                <div className="flex items-center space-x-1 text-sm">
                                  {getDocumentStatusIcon(doc.status)}
                                  <span className={getDocumentStatusColor(doc.status)}>
                                    {doc.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {doc.status === 'Uploaded' && (
                                <button
                                  onClick={() => handleDocumentAction(candidate.id, doc.id, 'Approved')}
                                  className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                                >
                                  Approve
                                </button>
                              )}
                              {doc.status === 'Uploaded' && (
                                <button
                                  onClick={() => handleDocumentAction(candidate.id, doc.id, 'Rejected')}
                                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                                >
                                  Reject
                                </button>
                              )}
                              <a href="#" className="flex items-center space-x-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors text-sm">
                                <Download size={16} />
                                <span>Download</span>
                              </a>
                            </div>
                          </div>
                        ))}
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