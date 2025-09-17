// src/modules/documents/hr/documenthub.tsx
import Link from 'next/link';
import { FileText, Users, BookOpen, UserPlus, Clock, Briefcase, Handshake } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const sections = [
  {
    title: 'Hiring and Onboarding',
    description: 'Documentos esenciales para el proceso de contratación e incorporación de nuevos empleados y voluntarios.',
    href: '/hr/documents/hiring-and-onboarding',
    icon: UserPlus,
    color: 'text-orange-600',
  },
  {
    title: 'Volunteers and Administrative Management',
    description: 'Documentos para gestionar la relación y las tareas administrativas de los voluntarios actuales.',
    href: '/hr/documents/volunteers-and-administrative-management',
    icon: Briefcase,
    color: 'text-purple-600',
  },
  {
    title: 'Policies & Guides',
    description: 'Normativas, procedimientos y directrices obligatorias para toda la organización.',
    href: '/hr/documents/policies-guides',
    icon: FileText,
    color: 'text-green-600',
  },
  {
    title: 'Volunteer Termination',
    description: 'Documentos necesarios para el proceso de salida de un empleado.',
    href: '/hr/documents/volunteer-termination',
    icon: Handshake,
    color: 'text-red-600',
  },
  {
    title: 'Company Library',
    description: 'Documentos de referencia generales y de uso común, como informes y actas.',
    href: '/hr/documents/company-library',
    icon: BookOpen,
    color: 'text-blue-600',
  },
];

export default function DocumentHub() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">HR Document Center</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido al centro de documentos de Recursos Humanos. Elige una sección para explorar y gestionar la información.
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