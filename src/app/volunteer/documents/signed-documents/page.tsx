// src/app/volunteer/documents/signed-documents/page.tsx
'use client';

import Link from 'next/link';
import { FileText, CheckCircle, Handshake, Link as LinkIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados de los acuerdos firmados por el voluntario
const mockSignedAgreements = [
  {
    id: 'doc-1',
    name: 'Acuerdo de Voluntariado',
    dateSigned: '2025-09-20',
    link: 'https://docs.google.com/document/d/abcdef12345',
  },
  {
    id: 'doc-2',
    name: 'Acuerdo de Confidencialidad (NDA)',
    dateSigned: '2025-09-21',
    link: 'https://docs.google.com/document/d/xyz987654',
  },
];

export default function VolunteerSignedAgreementsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Acuerdos Firmados</h1>
      <p className="text-gray-600 mb-10">
        Aquí puedes encontrar los acuerdos y documentos oficiales que has firmado con nuestra organización.
      </p>

      {mockSignedAgreements.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>No tienes acuerdos firmados en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSignedAgreements.map((agreement) => (
            <Card key={agreement.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Handshake className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg font-medium">{agreement.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-2">
                  <p><strong>Fecha de Firma:</strong> {agreement.dateSigned}</p>
                </div>
                <div className="mt-4">
                  <a
                    href={agreement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Ver Documento
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}