// src/app/hr/recruitment/job-openings/page.tsx
import Link from 'next/link';
import { Briefcase, PlusCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sections = [
  {
    title: 'Vacantes Solicitadas',
    description: 'Administra las solicitudes internas de vacantes pendientes de aprobación y colaboración.',
    href: '/hr/recruitment/job-openings/requested',
    icon: Clock,
    color: 'text-blue-600',
  },
  {
    title: 'Vacantes Publicadas y Activas',
    description: 'Gestiona y monitorea las vacantes que están abiertas y listas para recibir candidatos.',
    href: '/hr/recruitment/job-openings/published',
    icon: Briefcase,
    color: 'text-green-600',
  },
];

export default function JobOpeningsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Vacantes</h1>
        <Button asChild>
          <Link href="/hr/recruitment/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Elige una sección para gestionar las vacantes de la organización, desde la solicitud inicial hasta la publicación.
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