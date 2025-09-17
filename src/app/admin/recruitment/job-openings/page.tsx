// src/app/admin/recruitment/job-openings/page.tsx
// src/app/admin/recruitment/job-openings/page.tsx
import Link from 'next/link';
import { Briefcase, PlusCircle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const jobOpeningSections = [
  {
    title: 'Vacantes Solicitadas',
    description: 'Revisa y gestiona las solicitudes de vacantes pendientes de aprobación de todos los equipos.',
    href: '/admin/recruitment/job-openings/requested',
    icon: Clock,
    color: 'text-blue-600',
  },
  {
    title: 'Vacantes Publicadas y Activas',
    description: 'Supervisa y gestiona todas las vacantes que están actualmente abiertas para recibir candidatos.',
    href: '/admin/recruitment/job-openings/published',
    icon: Briefcase,
    color: 'text-green-600',
  },
];

export default function AdminJobOpeningsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Vacantes (Admin)</h1>
        <Button asChild>
          <Link href="/admin/recruitment/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Elige una sección para supervisar el proceso de gestión de vacantes a nivel de toda la organización.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobOpeningSections.map((section) => (
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