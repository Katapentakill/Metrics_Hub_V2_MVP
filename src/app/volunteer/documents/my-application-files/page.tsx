'use client';

import Link from 'next/link';
import { FileText, Briefcase, CheckCircle, UploadCloud, Trash2, Link as LinkIcon, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados de los documentos del voluntario
const mockVolunteerFiles = [
  {
    id: 'file-1',
    name: 'Curriculum_Juan_Perez.pdf',
    type: 'CV',
    link: 'https://docs.google.com/document/d/123456789',
    uploadDate: '2025-09-15',
  },
  {
    id: 'file-2',
    name: 'Portfolio-online.link',
    type: 'Portafolio',
    link: 'https://www.mi-portafolio.com',
    uploadDate: '2025-09-15',
  },
];

export default function VolunteerApplicationFilesPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis Documentos de Postulación</h1>
        <Button asChild>
          <Link href="/volunteer/documents/upload">
            <UploadCloud className="mr-2 h-4 w-4" />
            Subir Nuevo Documento
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Aquí puedes ver y gestionar los documentos que has subido como parte de tu proceso de postulación.
      </p>

      {mockVolunteerFiles.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>No has subido ningún documento todavía.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockVolunteerFiles.map((file) => (
            <Card key={file.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gray-500" />
                  <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-2">
                  <p><strong>Tipo:</strong> {file.type}</p>
                  <p><strong>Subido:</strong> {file.uploadDate}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href={file.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Ver
                  </a>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}