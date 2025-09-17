// src/modules/recruitment/hr/Applicant-Tracking-System.tsx
import Link from 'next/link';
import { Briefcase, FileText, UserPlus, Users, Clock, Handshake, Search, BookOpen, UserCheck, BarChart, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const sections = [
  {
    title: 'Gestión de Vacantes',
    description: 'Crea, edita y publica nuevas ofertas de empleo y roles de voluntariado.',
    href: '/hr/recruitment/job-openings',
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Gestión de Candidatos',
    description: 'Revisa y gestiona a los candidatos, filtra perfiles y organiza los CV recibidos.',
    href: '/hr/recruitment/candidate-management',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Evaluación y Selección',
    description: 'Programa entrevistas, realiza un seguimiento de las evaluaciones y toma notas del proceso de selección.',
    href: '/hr/recruitment/evaluation',
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Ofertas y Contratación',
    description: 'Genera y envía cartas de oferta. Administra el proceso de aceptación y finalización de contratos.',
    href: '/hr/recruitment/offers-hiring',
    icon: Handshake,
    color: 'text-orange-600',
  },
  {
    title: 'Reportes y Analíticas',
    description: 'Visualiza métricas clave del reclutamiento como el tiempo de contratación y la fuente de candidatos.',
    href: '/hr/recruitment/reports-analytics',
    icon: BarChart,
    color: 'text-red-600',
  },
];

export default function ApplicantTrackingSystem() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sistema de Seguimiento de Candidatos (ATS)</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido al panel de reclutamiento. Usa estas secciones para gestionar todo el ciclo de vida de la contratación, desde la publicación de vacantes hasta la formalización de la oferta.
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