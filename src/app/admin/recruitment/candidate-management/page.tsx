//src/app/admin/recruitment/candidate-management/page.tsx

// src/app/admin/recruitment/candidate-management/page.tsx
import Link from 'next/link';
import { Briefcase, UserPlus, Users, MessageCircle, BarChart, BookOpen, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const adminCandidateManagementSections = [
  {
    title: 'Seguimiento de Candidatos (Tracker)',
    description: 'Visualiza y gestiona el progreso de todos los candidatos activos a través del embudo de reclutamiento.',
    href: '/admin/recruitment/candidate-management/tracker',
    icon: BarChart,
    color: 'text-indigo-600',
  },
  {
    title: 'Base de Datos de Candidatos',
    description: 'Accede a un repositorio global con todos los perfiles de candidatos en la historia de la organización.',
    href: '/admin/recruitment/candidate-management/database',
    icon: Search,
    color: 'text-green-600',
  },
  {
    title: 'Comunicación de Reclutamiento',
    description: 'Supervisa todas las comunicaciones del equipo, incluyendo plantillas, correos enviados y notificaciones.',
    href: '/admin/recruitment/candidate-management/communication',
    icon: MessageCircle,
    color: 'text-purple-600',
  },
];

export default function AdminCandidateManagementPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Candidatos (Admin)</h1>
        <Button asChild>
          <Link href="/admin/recruitment/candidate-management/add-candidate">
            <UserPlus className="mr-2 h-4 w-4" />
            Agregar Candidato
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Bienvenido al panel de control de candidatos. Desde aquí puedes supervisar y gestionar a todos los candidatos a nivel de toda la organización.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCandidateManagementSections.map((section) => (
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