// src/modules/documents/volunteer/documenthub.tsx
import Link from 'next/link';
import { FileText, Briefcase, CheckCircle, UploadCloud, Folder } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sections = [
  {
    title: 'Mis Documentos de Postulación',
    description: 'Accede a tu CV, portafolio y otros archivos que subiste durante el proceso de solicitud.',
    href: '/volunteer/documents/my-application-files',
    icon: FileText,
    color: 'text-blue-600',
  },
  {
    title: 'DocumentosFirmados',
    description: 'Revisa tus acuerdos de voluntariado, políticas de confidencialidad y otros documentos oficiales firmados con la organización.',
    href: '/volunteer/documents/signed-documents',
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    title: 'Guías y Recursos del Proyecto',
    description: 'Accede a manuales de herramientas, procedimientos, y otros recursos relevantes para tu trabajo.',
    href: '/volunteer/documents/project-resources',
    icon: Folder,
    color: 'text-purple-600',
  },
  {
    title: 'Subir Nuevos Documentos',
    description: 'Sube cualquier documento adicional que te haya sido solicitado por el equipo de RR.HH.',
    href: '/volunteer/documents/upload',
    icon: UploadCloud,
    color: 'text-orange-600',
  },
];

export default function VolunteerDocumentHub() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Centro de Documentos (Voluntario)</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido a tu centro de documentos. Desde aquí, puedes gestionar todos los archivos relacionados con tu postulación y tu rol en la organización.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`flex items-center gap-3 ${section.color}`}>
                  <section.icon className="w-6 h-6" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}