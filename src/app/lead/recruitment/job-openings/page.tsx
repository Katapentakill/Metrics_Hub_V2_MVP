// src/app/lead/recruitment/job-openings/page.tsx
import Link from 'next/link';
import { Briefcase, PlusCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sections = [
  {
    title: 'Mis Solicitudes de Vacantes',
    description: 'Revisa y monitorea el estado de las vacantes que has solicitado para tu equipo, antes de que sean publicadas.',
    href: '/lead/recruitment/job-openings/requested',
    icon: Clock,
    color: 'text-blue-600',
  },
  {
    title: 'Mis Vacantes Publicadas y Activas',
    description: 'Gestiona y monitorea las vacantes que han sido publicadas y están recibiendo candidatos para tu equipo.',
    href: '/lead/recruitment/job-openings/published',
    icon: Briefcase,
    color: 'text-green-600',
  },
];

export default function LeadJobOpeningsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Vacantes (Líder)</h1>
        <Button asChild>
          <Link href="/lead/recruitment/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Solicitar Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Gestiona las vacantes de tu equipo. Envía nuevas solicitudes y sigue el progreso de las vacantes ya publicadas.
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