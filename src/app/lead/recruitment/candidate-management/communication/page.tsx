// src/app/lead/recruitment/candidate-management/communication/page.tsx
import Link from 'next/link';
import { Mail, Calendar, Bell, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const communicationSections = [
  {
    title: 'Plantillas de Correo',
    description: 'Utiliza las plantillas de correo para comunicarte rápidamente con los candidatos de tu equipo.',
    href: '/lead/recruitment/candidate-management/communication/templates',
    icon: Mail,
    color: 'text-blue-600',
  },
  {
    title: 'Programador de Entrevistas',
    description: 'Coordina y agenda entrevistas con los candidatos de tu equipo y otros entrevistadores de manera eficiente.',
    href: '/lead/recruitment/candidate-management/communication/scheduler',
    icon: Calendar,
    color: 'text-purple-600',
  },
  {
    title: 'Notificaciones y Recordatorios',
    description: 'Configura notificaciones para el seguimiento de tus candidatos y reuniones de equipo.',
    href: '/lead/recruitment/candidate-management/communication/notifications',
    icon: Bell,
    color: 'text-yellow-600',
  },
];

export default function LeadCommunicationPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Comunicación con Candidatos</h1>
      <p className="text-gray-600 mb-10">
        Gestione la comunicación con los candidatos a lo largo del proceso de reclutamiento de tu equipo. Envía mensajes personalizados, programa entrevistas y mantén a todos informados.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {communicationSections.map((section) => (
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

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/lead/recruitment/candidate-management/communication/new-message">
            <PlusCircle className="mr-2 h-4 w-4" />
            Enviar Mensaje a un Candidato
          </Link>
        </Button>
      </div>
    </div>
  );
}