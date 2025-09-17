//src/app/hr/recruitment/offers-hiring/page.tsx
// src/app/hr/recruitment/offers-hiring/page.tsx
import Link from 'next/link';
import { Mail, Briefcase, UserPlus, FileCheck, Handshake, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const offersHiringSections = [
  {
    title: 'Generación y Envío de Ofertas',
    description: 'Crea y personaliza cartas de oferta, envíalas a los candidatos seleccionados y realiza un seguimiento de su estado.',
    href: '/hr/recruitment/offers-hiring/offer-letters',
    icon: Mail,
    color: 'text-blue-600',
  },
  {
    title: 'Gestión de Documentos de Contratación',
    description: 'Recopila y organiza la documentación esencial de los candidatos, como identificaciones, visas y acuerdos firmados.',
    href: '/hr/recruitment/offers-hiring/documentation',
    icon: FileCheck,
    color: 'text-green-600',
  },
  {
    title: 'Integración (Onboarding)',
    description: 'Inicia el proceso de bienvenida. Coordina la capacitación inicial, asigna mentores y asegura una transición fluida.',
    href: '/hr/recruitment/offers-hiring/onboarding',
    icon: UserPlus,
    color: 'text-purple-600',
  },
];

export default function OffersHiringPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Oferta y Contratación</h1>
      <p className="text-gray-600 mb-10">
        Esta es la etapa final del reclutamiento. Usa estas herramientas para formalizar la incorporación de nuevos miembros al equipo, gestionar su documentación y darles una cálida bienvenida.
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