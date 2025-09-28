// src/modules/recruitment/lead/ATS.tsx

import Link from 'next/link';
import { Briefcase, Users, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const sections = [
  {
    title: 'Mis Vacantes',
    description: 'Solicita nuevas vacantes para tu equipo y monitorea el estado de aprobación y publicación.',
    href: '/lead/recruitment/job-openings',
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Mis Candidatos',
    description: 'Revisa y evalúa a los candidatos que han aplicado a los puestos de tu equipo. Deja comentarios y programa entrevistas.',
    href: '/lead/recruitment/candidate-management',
    icon: Users,
    color: 'text-purple-600',
  },
];

export default function LeadATSPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sistema de Reclutamiento (Panel de Líder)</h1>
        <Button asChild>
          <Link href="/recruitment/lead/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Solicitar Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Bienvenido a tu panel de control de reclutamiento. Gestiona las vacantes de tu equipo y evalúa a los candidatos de manera eficiente.
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