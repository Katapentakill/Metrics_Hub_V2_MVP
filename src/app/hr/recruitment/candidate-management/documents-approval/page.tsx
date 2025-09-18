// src/app/hr/recruitment/candidate-management/documents-approval/page.tsx

import Link from 'next/link';
import { FileText, CheckCircle2, XCircle, Download, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados de documentos pendientes de aprobación
const mockDocumentsForApproval = [
  {
    id: 'doc-1',
    candidateName: 'Juan Pérez',
    documentType: 'Documento CPT/OPT',
    status: 'Pendiente de Revisión',
    uploadedDate: '2025-09-15',
  },
  {
    id: 'doc-2',
    candidateName: 'Ana García',
    documentType: 'Referencias',
    status: 'Aprobado',
    uploadedDate: '2025-09-14',
  },
  {
    id: 'doc-3',
    candidateName: 'Pedro López',
    documentType: 'Curriculum Vitae',
    status: 'Pendiente de Revisión',
    uploadedDate: '2025-09-15',
  },
  {
    id: 'doc-4',
    candidateName: 'Sofía Castro',
    documentType: 'Documento CPT/OPT',
    status: 'Rechazado',
    uploadedDate: '2025-09-13',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Pendiente de Revisión':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700">
          <Clock className="mr-1 h-3 w-3" /> Pendiente
        </span>
      );
    case 'Aprobado':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Aprobado
        </span>
      );
    case 'Rechazado':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-700">
          <XCircle className="mr-1 h-3 w-3" /> Rechazado
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
          {status}
        </span>
      );
  }
};

export default function DocumentsApprovalPage() {
  const pendingDocuments = mockDocumentsForApproval.filter(doc => doc.status === 'Pendiente de Revisión');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Aprobación de Documentos de Candidatos</h1>
      </div>
      <p className="text-gray-600 mb-10">
        Revisa y aprueba los documentos esenciales enviados por los candidatos para formalizar su proceso de reclutamiento.
      </p>

      {pendingDocuments.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">Documentos Pendientes ({pendingDocuments.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {pendingDocuments.map((doc) => (
              <Card key={doc.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-500" />
                      {doc.documentType}
                    </CardTitle>
                    {getStatusBadge(doc.status)}
                  </div>
                  <CardDescription>Para: {doc.candidateName}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-sm text-gray-500 mb-4">
                    <p><strong>Fecha de Subida:</strong> {doc.uploadedDate}</p>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Ver Documento
                    </Button>
                    <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
