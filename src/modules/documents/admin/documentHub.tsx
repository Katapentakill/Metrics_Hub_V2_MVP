// src/modules/documents/admin/documentHub.tsx
import Link from 'next/link';
import { FileText, Users, Settings, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const sections = [
  {
    title: 'Company Library',
    description: 'Aquí puedes encontrar documentos de referencia generales y de uso común.',
    href: '/admin/documents/company-library',
    icon: BookOpen,
    color: 'text-blue-600',
  },
  {
    title: 'Policies & Guides',
    description: 'Consulta políticas internas y guías de referencia.',
    href: '/admin/documents/policies-guides',
    icon: FileText,
    color: 'text-green-600',
  },
  {
    title: 'Volunteer Submissions',
    description: 'Revisa documentos cargados por los voluntarios.',
    href: '/admin/documents/volunteer-submissions',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Document Management',
    description: 'Administra, aprueba y organiza todos los documentos.',
    href: '/admin/documents/management',
    icon: Settings,
    color: 'text-orange-600',
  },
];

export default function DocumentHub() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Document Center</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido al centro de documentos. Elige una sección para explorar y gestionar la información.
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