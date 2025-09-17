// src/app/admin/recruitment/templates/page.tsx
// src/app/admin/recruitment/templates/page.tsx
import Link from 'next/link';
import { FileText, Mail, Handshake, PlusCircle, Trash2, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const templateSections = [
  {
    title: 'Plantillas de Correo',
    description: 'Gestiona plantillas para correos de confirmación, rechazo, y seguimiento de candidatos.',
    href: '/admin/recruitment/templates/email-templates',
    icon: Mail,
    color: 'text-blue-600',
  },
  {
    title: 'Plantillas de Documentos',
    description: 'Administra plantillas para cartas de oferta, acuerdos de voluntariado y otros documentos de contratación.',
    href: '/admin/recruitment/templates/document-templates',
    icon: Handshake,
    color: 'text-green-600',
  },
  {
    title: 'Plantillas de Vacantes',
    description: 'Crea plantillas para descripciones de puestos de uso común, como desarrollador o diseñador.',
    href: '/admin/recruitment/templates/job-templates',
    icon: FileText,
    color: 'text-orange-600',
  },
];

export default function AdminTemplatesPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Plantillas y Contenido (Admin)</h1>
        <Button asChild>
          <Link href="/admin/recruitment/templates/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Plantilla
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Controla el contenido de la comunicación y los documentos. Crea y gestiona plantillas reutilizables para todo el equipo de reclutamiento.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateSections.map((section) => (
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