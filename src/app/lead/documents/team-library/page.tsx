// src/app/lead/documents/team-library/page.tsx
'use client';

import Link from 'next/link';
import { FileText, BookOpen, Download, Link as LinkIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados de la biblioteca del equipo
const mockTeamLibrary = [
  {
    id: 'lib-1',
    name: 'Actas de la Reunión Semanal',
    description: 'Resumen de las decisiones y acciones acordadas en la última reunión del equipo.',
    link: 'https://docs.google.com/document/d/lib1_minutes',
  },
  {
    id: 'lib-2',
    name: 'Informe Trimestral de Progreso',
    description: 'Informe que detalla los logros y metas del equipo durante el último trimestre.',
    link: 'https://docs.google.com/document/d/lib2_report',
  },
];

export default function LeadTeamLibraryPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Biblioteca del Equipo</h1>
      <p className="text-gray-600 mb-10">
        Encuentra documentos de referencia, informes y otros archivos de uso común para tu equipo.
      </p>

      {mockTeamLibrary.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>La biblioteca de tu equipo está vacía en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTeamLibrary.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg font-medium">{doc.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-4">
                  <p>{doc.description}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Ver Documento
                  </a>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
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