// src/app/hr/recruitment/candidate-management/page.tsx
import Link from 'next/link';
import { Briefcase, FileText, UserPlus, Users, Clock, Handshake, Search, BookOpen, UserCheck, BarChart, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const candidateManagementSections = [

  {
    title: 'Seguimiento de Candidatos',
    description: 'Visualiza el estado de cada candidato en las diferentes etapas del proceso de selección.',
    href: '/hr/recruitment/candidate-management/RecruitmentTracker',
    icon: Clock,
    color: 'text-blue-600',
  },
    {
    title: 'Base de Datos de Candidatos',
    description: 'Accede, busca y gestiona el repositorio centralizado de todos los currículums y perfiles de aspirantes.',
    href: '/hr/recruitment/candidate-management/database',
    icon: Search,
    color: 'text-purple-600',
  },
  {
    title: 'Comunicación',
    description: 'Envía correos electrónicos automatizados, notificaciones y programa entrevistas con los candidatos.',
    href: '/hr/recruitment/candidate-management/communication',
    icon: Bell,
    color: 'text-orange-600',
  },
];

export default function CandidateManagementPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Candidatos</h1>
      <p className="text-gray-600 mb-10">
        Esta sección te permite manejar y organizar todas las postulaciones. Utiliza las herramientas para optimizar la revisión de perfiles, el seguimiento y la comunicación con cada aspirante.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {candidateManagementSections.map((section) => (
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