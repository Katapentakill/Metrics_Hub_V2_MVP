// src/app/hr/documents/onboarding/page.tsx
'use client';

import { useState } from 'react';
import {
  FileText,
  CheckCircle,
  XCircle,
  FilePlus,
  Users,
  Search,
  Download,
} from 'lucide-react';
import {
  getMockRecruitmentData,
  CandidateStatus,
} from '@/lib/data/mockRecruitmentData';
import { mockDocuments } from '@/lib/data/mockDocuments';
import { mockTemplates } from '@/lib/data/mockTemplates';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

// Datos mock para simular candidatos y documentos
const mockCandidates = getMockRecruitmentData(20);

// Función para obtener documentos específicos de un candidato
const getCandidateDocuments = (candidateId: string) => {
  const candidateDocs = mockDocuments.filter(
    (doc) => doc.uploadedBy === mockCandidates.find(c => c.id === candidateId)?.name
  );
  
  const specificDocs = [];
  const candidate = mockCandidates.find(c => c.id === candidateId);
  if (candidate) {
      if (candidate.offerLetterLink) specificDocs.push({
          id: candidate.id + '-ol',
          name: 'Offer Letter',
          link: candidate.offerLetterLink,
          status: candidate.offerLetterStatus,
          type: 'official',
          uploadedBy: 'HR',
          uploadDate: candidate.offerLetterStatus === 'Sent' ? candidate.startDate : 'N/A'
      });
      if (candidate.vaLink) specificDocs.push({
          id: candidate.id + '-va',
          name: 'Volunteer Agreement',
          link: candidate.vaLink,
          status: candidate.vaStatus,
          type: 'official',
          uploadedBy: 'HR',
          uploadDate: candidate.vaStatus === 'Signed' ? candidate.startDate : 'N/A'
      });
      if (candidate.cptOptStatus !== 'No required') specificDocs.push({
          id: candidate.id + '-cptopt',
          name: `${candidate.volunteerType} Document`,
          link: 'mock-link',
          status: candidate.cptOptStatus,
          type: candidate.volunteerType,
          uploadedBy: candidate.name,
          uploadDate: '2024-03-15'
      });
  }
  
  return [...candidateDocs, ...specificDocs];
};

export default function HrOnboardingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<CandidateStatus | 'all'>('all');

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || candidate.applicationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateDocumentStatus = (docId: string, newStatus: string) => {
    console.log(`Updating document ${docId} to status: ${newStatus}`);
    alert(`Estado del documento actualizado.`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Archivo seleccionado para subir:', file.name);
      alert(`Archivo "${file.name}" listo para ser subido.`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📝 Recruitment Documents</h1>
      <p className="text-gray-600 mb-6">
        Gestiona todos los documentos de los candidatos y accede a las plantillas clave de RR. HH.
      </p>

      {/* Control de filtrado y búsqueda */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Buscar por nombre de candidato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 placeholder:text-slate-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="status-filter" className="text-gray-500">
            Filtrar por estado:
          </label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as CandidateStatus | 'all')}
            className="rounded-lg border border-slate-300 p-2 text-slate-700"
          >
            <option value="all">Todos</option>
            <option value="Offer Sent">Oferta enviada</option>
            <option value="Onboard">En proceso de Onboarding</option>
            <option value="Rejected by HR">Rechazado por HR</option>
          </select>
        </div>
      </div>

      {/* Vista por candidato en formato de tabla */}
      <div className="space-y-8">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="bg-purple-50/50">
              <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-2 text-purple-600">
                        <Users className="w-5 h-5" />
                        {candidate.name}
                        <span className="text-sm font-normal text-purple-400 ml-2">
                        ({candidate.applicationStatus})
                        </span>
                    </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subido Por</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getCandidateDocuments(candidate.id).map((doc) => (
                        <tr key={doc.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                            <FileText size={16} className="text-gray-400" />
                            {doc.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadedBy}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.uploadDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex gap-2 items-center">
                              {(doc.type === 'CPT' || doc.type === 'OPT') && (
                                <>
                                  <button
                                    className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    onClick={() => updateDocumentStatus(doc.id, 'Approved')}
                                  >
                                    <CheckCircle size={14} />
                                  </button>
                                  <button
                                    className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    onClick={() => updateDocumentStatus(doc.id, 'Rejected')}
                                  >
                                    <XCircle size={14} />
                                  </button>
                                </>
                              )}
                              <button
                                className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={() => alert(`Descargando: ${doc.name}`)}
                              >
                                <Download size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="mt-4 flex items-center justify-center p-4 border-2 border-dashed border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100/50 transition-colors">
                      <div className="flex items-center gap-2 text-purple-400">
                        <FilePlus size={18} />
                        <span className="text-sm">Subir un nuevo documento</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Subir Nuevo Documento</DialogTitle>
                      <DialogDescription>
                        Selecciona un archivo para subir al perfil del candidato.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="file" className="text-right">
                          Tipo de documento
                        </label>
                        <select
                          id="document-type"
                          className="col-span-3 rounded-lg border border-slate-300 p-2 text-slate-700"
                        >
                          <option value="">Seleccionar...</option>
                          <option value="CV">CV</option>
                          <option value="OPT">OPT</option>
                          <option value="CPT">CPT</option>
                          <option value="other">Otro</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="file" className="text-right">
                          Archivo
                        </label>
                        <input id="file" type="file" onChange={handleFileUpload} className="col-span-3" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No se encontraron candidatos con esos criterios.</p>
        )}
      </div>
      
      <h2 className="text-2xl font-bold mt-10 mb-6">📋 Plantillas de RR. HH.</h2>
      <p className="text-gray-600 mb-6">
        Aquí puedes encontrar y gestionar plantillas de documentos internos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-600">
                <FileText size={16} />
                <h4 className="font-semibold">{template.name}</h4>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                <p>Tipo: {template.type}</p>
                <p>Última actualización: {template.uploadDate}</p>
              </div>
              <button
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center gap-1"
                onClick={() => alert(`Descargando plantilla: ${template.name}`)}
              >
                <Download size={16} /> Descargar
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}