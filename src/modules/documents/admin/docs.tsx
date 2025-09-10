//src/modules/documents/admin/docs.tsx
// src/modules/documents/admin/docs.tsx
'use client';

import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Trash,
  Pencil,
  Search,
  Plus,
  CircleCheck,
  CircleAlert,
} from 'lucide-react';

// Tipos para la gestión de documentos del Admin
type DocumentType = 'Legal' | 'Template' | 'General' | 'Volunteer';
type DocumentStatus = 'Draft' | 'Published' | 'Archived';

interface AdminDocument {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadDate: string;
  version: string;
}

// Datos simulados para el panel de documentos del Admin
const initialAdminDocuments: AdminDocument[] = [
  { id: '1', name: 'Volunteer Agreement v1.2', type: 'Legal', status: 'Published', uploadDate: '2025-08-15', version: '1.2' },
  { id: '2', name: 'Code of Conduct', type: 'General', status: 'Published', uploadDate: '2025-07-20', version: '1.0' },
  { id: '3', name: 'Onboarding Checklist', type: 'Template', status: 'Published', uploadDate: '2025-08-01', version: '2.0' },
  { id: '4', name: 'Annual Report 2024', type: 'General', status: 'Archived', uploadDate: '2025-01-10', version: '1.0' },
  { id: '5', name: 'New Volunteer Welcome Letter', type: 'Template', status: 'Draft', uploadDate: '2025-09-08', version: '1.1' },
  { id: '6', name: 'Volunteer Roster', type: 'Volunteer', status: 'Published', uploadDate: '2025-09-09', version: '1.0' },
];

const allDocTypes: DocumentType[] = ['Legal', 'Template', 'General', 'Volunteer'];
const allDocStatuses: DocumentStatus[] = ['Draft', 'Published', 'Archived'];

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'Published':
      return 'bg-green-100 text-green-700';
    case 'Draft':
      return 'bg-yellow-100 text-yellow-700';
    case 'Archived':
      return 'bg-slate-100 text-slate-700';
  }
};

const getStatusIcon = (status: DocumentStatus) => {
  switch (status) {
    case 'Published':
      return <CircleCheck size={16} />;
    case 'Draft':
      return <Pencil size={16} />;
    case 'Archived':
      return <CircleAlert size={16} />;
  }
};

export default function AdminDocumentManagement() {
  const [documents, setDocuments] = useState<AdminDocument[]>(initialAdminDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const handleEdit = (docId: string) => {
    console.log(`Editing document with ID: ${docId}`);
    alert(`Editing document with ID: ${docId}`);
  };

  const handleDelete = (docId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== docId));
      console.log(`Document with ID ${docId} deleted.`);
    }
  };

  const handleDownload = (docId: string) => {
    console.log(`Downloading document with ID: ${docId}`);
    alert(`Downloading document with ID: ${docId}`);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">Document Management</h1>

      {/* Barra de Herramientas */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-slate-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="flex w-full md:w-2/3 space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">All Types</option>
            {allDocTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">All Statuses</option>
            {allDocStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button
            onClick={() => alert('New document added!')}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shrink-0"
          >
            <Plus size={16} />
            <span>Add Doc</span>
          </button>
        </div>
      </div>

      {/* Tabla de Documentos */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Upload Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredDocuments.map(doc => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  <div className="flex items-center space-x-2">
                    <FileText size={18} className="text-slate-500" />
                    <span>{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                    {getStatusIcon(doc.status)}
                    <span>{doc.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.version}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{doc.uploadDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(doc.id)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      aria-label="Download Document"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(doc.id)}
                      className="text-amber-600 hover:text-amber-900 transition-colors"
                      aria-label="Edit Document"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      aria-label="Delete Document"
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}