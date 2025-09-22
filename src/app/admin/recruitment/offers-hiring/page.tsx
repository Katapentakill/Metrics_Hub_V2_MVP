//src/app/admin/recruitment/offers-hiring/page.tsx
// src/app/admin/recruitment/offers-hiring/page.tsx
import Link from 'next/link';
import { Mail, Briefcase, UserPlus, FileCheck, Handshake, BookOpen, Clock, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const offersHiringSections = [
  {
    title: 'Generación de Ofertas de Empleo',
    description: 'Gestiona la creación y el estado de todas las cartas de oferta. Visualiza quién ha aceptado y quién está pendiente de respuesta.',
    href: '/admin/recruitment/offers-hiring/offer-generation',
    icon: Mail,
    color: 'text-blue-600',
  },
  {
    title: 'Gestión de Contratación (Onboarding)',
    description: 'Supervisa el proceso de onboarding para todos los nuevos miembros del equipo, asegurando que se cumplan todos los pasos.',
    href: '/admin/recruitment/offers-hiring/onboarding-management',
    icon: UserPlus,
    color: 'text-purple-600',
  },
  {
    title: 'Documentación de Contratación',
    description: 'Accede a todos los documentos de contratación de los nuevos empleados y voluntarios, incluyendo contratos y formularios firmados.',
    href: '/admin/recruitment/offers-hiring/hiring-documents',
    icon: FileCheck,
    color: 'text-green-600',
  },
];

export default function AdminOffersHiringPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Oferta y Contratación (Admin)</h1>
      <p className="text-gray-600 mb-10">
        Desde este panel, puedes supervisar y gestionar la etapa final del proceso de reclutamiento para toda la organización, desde la oferta hasta la formalización de la contratación.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offersHiringSections.map((section) => (
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