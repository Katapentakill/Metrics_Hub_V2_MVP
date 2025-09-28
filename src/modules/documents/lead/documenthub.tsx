// src/modules/documents/lead/documenthub.tsx
import Link from 'next/link';
import { FileText, Briefcase, BookOpen, UserPlus, Folder, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const sections = [
  {
    title: 'Documentos de Candidatos',
    description: 'Accede a los currículums, portafolios y otros archivos que han subido los candidatos de tu equipo.',
    href: '/lead/documents/candidate-files',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Guías y Recursos del Proyecto',
    description: 'Accede a manuales de herramientas, procedimientos y otros recursos relevantes para tu trabajo.',
    href: '/lead/documents/project-resources',
    icon: Folder,
    color: 'text-green-600',
  },
  {
    title: 'Biblioteca del Equipo',
    description: 'Documentos de referencia de uso común para tu equipo, como actas de reuniones y reportes internos.',
    href: '/lead/documents/team-library',
    icon: BookOpen,
    color: 'text-blue-600',
  },
];

export default function LeadDocumentHub() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Centro de Documentos de Mi Equipo</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido a tu centro de documentos. Desde aquí, puedes gestionar y acceder a los archivos relevantes para tu equipo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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