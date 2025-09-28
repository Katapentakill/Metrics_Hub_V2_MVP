// src/app/lead/documents/project-resources/page.tsx
'use client';

import Link from 'next/link';
import { FileText, Briefcase, Link as LinkIcon, Download, Folder } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados de los documentos de proyecto del equipo del líder
const mockProjectResources = [
  {
    id: 'res-1',
    name: 'Manual de Herramientas del Proyecto',
    description: 'Guía de uso para las principales herramientas de software del equipo.',
    link: 'https://docs.google.com/document/d/res1_tools',
  },
  {
    id: 'res-2',
    name: 'Guía de Estilo de la Marca',
    description: 'Lineamientos para el uso de la marca, colores y tipografía del proyecto.',
    link: 'https://docs.google.com/document/d/res2_styleguide',
  },
  {
    id: 'res-3',
    name: 'Procedimientos de Seguridad y Datos',
    description: 'Protocolos obligatorios para la gestión de datos sensibles del proyecto.',
    link: 'https://docs.google.com/document/d/res3_security',
  },
];

export default function LeadProjectResourcesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Guías y Recursos del Proyecto</h1>
      <p className="text-gray-600 mb-10">
        Accede a los documentos y manuales que te ayudarán a ti y a tu equipo a familiarizarse con las herramientas y procedimientos del proyecto.
      </p>

      {mockProjectResources.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <Folder className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>No hay recursos disponibles para tu proyecto en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjectResources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  <CardTitle className="text-lg font-medium">{resource.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-4">
                  <p>{resource.description}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <a
                    href={resource.link}
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