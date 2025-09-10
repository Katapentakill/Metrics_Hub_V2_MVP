// src/app/volunteer/documents/page.tsx
'use client';

import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

// Estado de simulación para cada documento
type DocumentStatus = 'Pending' | 'Uploaded' | 'Approved' | 'Rejected';

interface Document {
  id: number;
  name: string;
  status: DocumentStatus;
  type: 'required' | 'optional';
  downloadUrl?: string;
}

// Datos de documentos simulados para un candidato OPT
// Se ha agregado la conversión de tipo 'as Document[]' para resolver el error
const initialDocuments = [
  { id: 1, name: 'OPT EAD Card', status: 'Pending', type: 'required' },
  { id: 2, name: 'Form I-20', status: 'Pending', type: 'required' },
  { id: 3, name: 'OPT Volunteer Agreement', status: 'Pending', type: 'required' },
  { id: 4, name: 'Resume', status: 'Uploaded', type: 'optional', downloadUrl: '#' },
  { id: 5, name: 'Welcome Letter', status: 'Approved', type: 'optional', downloadUrl: '#' },
] as Document[];

// Mapeo de colores y íconos para cada estado
const statusMap = {
  Pending: { icon: AlertCircle, color: 'text-yellow-500' },
  Uploaded: { icon: Upload, color: 'text-blue-500' },
  Approved: { icon: CheckCircle, color: 'text-green-500' },
  Rejected: { icon: XCircle, color: 'text-red-500' },
};

export default function CandidateDocuments() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const handleUpload = (docId: number) => {
    // Simula la subida del documento
    const updatedDocuments = documents.map((doc) =>
      doc.id === docId ? { ...doc, status: 'Uploaded' } : doc
    );
    setDocuments(updatedDocuments);
    alert('Document uploaded successfully! It is now under review.');
  };

  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Your Documents</h1>
          <p className="text-lg text-slate-500 mt-1">
            Please upload the required documents for your OPT process.
          </p>
        </div>

        {/* Lista de documentos */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Required Documents</h2>
          <div className="space-y-4">
            {documents
              .filter((doc) => doc.type === 'required')
              .map((doc) => {
                const { icon: StatusIcon, color } = statusMap[doc.status];
                return (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <FileText size={24} className="text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-800">{doc.name}</p>
                        <div className="flex items-center space-x-1 text-sm">
                          <StatusIcon size={16} className={color} />
                          <span className={color}>{doc.status}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {doc.status === 'Pending' && (
                        <button
                          onClick={() => handleUpload(doc.id)}
                          className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <Upload size={16} />
                          <span>Upload</span>
                        </button>
                      )}
                      {doc.status === 'Uploaded' && (
                        <span className="text-sm text-slate-600">Under review</span>
                      )}
                      {doc.status === 'Approved' && (
                        <span className="text-sm text-green-600">Approved</span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          <h2 className="text-xl font-semibold text-slate-800 mt-8 mb-4">Optional & Provided Documents</h2>
          <div className="space-y-4">
            {documents
              .filter((doc) => doc.type === 'optional')
              .map((doc) => {
                const { icon: StatusIcon, color } = statusMap[doc.status];
                return (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <FileText size={24} className="text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-800">{doc.name}</p>
                        <div className="flex items-center space-x-1 text-sm">
                          <StatusIcon size={16} className={color} />
                          <span className={color}>{doc.status}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {doc.status === 'Uploaded' && (
                        <a
                          href={doc.downloadUrl}
                          className="flex items-center space-x-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
                        >
                          <Download size={16} />
                          <span>View/Download</span>
                        </a>
                      )}
                      {doc.status === 'Approved' && (
                        <a
                          href={doc.downloadUrl}
                          className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                        >
                          <Download size={16} />
                          <span>Download</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}