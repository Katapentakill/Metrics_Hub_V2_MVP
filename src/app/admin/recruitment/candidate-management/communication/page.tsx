// src/app/admin/recruitment/candidate-management/communication/page.tsx
// src/app/admin/recruitment/candidate-management/communication/page.tsx
import Link from 'next/link';
import { Mail, Calendar, Bell, PlusCircle, PenTool, ClipboardList } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const communicationSections = [
  {
    title: 'Gestión de Plantillas',
    description: 'Crea y edita plantillas para correos electrónicos, cartas de oferta y otros documentos de comunicación.',
    href: '/admin/recruitment/candidate-management/communication/templates',
    icon: PenTool,
    color: 'text-blue-600',
  },
  {
    title: 'Programador de Entrevistas Global',
    description: 'Supervisa y gestiona todas las entrevistas programadas por el equipo de reclutamiento.',
    href: '/admin/recruitment/candidate-management/communication/scheduler',
    icon: Calendar,
    color: 'text-purple-600',
  },
  {
    title: 'Log de Comunicación',
    description: 'Revisa un registro completo de todos los correos electrónicos y notificaciones enviados por el sistema.',
    href: '/admin/recruitment/candidate-management/communication/log',
    icon: ClipboardList,
    color: 'text-green-600',
  },
];

export default function AdminCommunicationPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Comunicación con Candidatos (Admin)</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido al centro de comunicaciones. Desde aquí puedes supervisar y gestionar las herramientas y plantillas que utiliza todo el equipo de reclutamiento.
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
          <Link href="/admin/recruitment/candidate-management/communication/new-message">
            <PlusCircle className="mr-2 h-4 w-4" />
            Enviar Mensaje a un Candidato
          </Link>
        </Button>
      </div>
    </div>
  );
}