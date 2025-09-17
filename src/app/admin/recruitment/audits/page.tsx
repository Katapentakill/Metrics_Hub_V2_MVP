// src/app/admin/recruitment/audits/page.tsx
// src/app/admin/recruitment/audits/page.tsx
import Link from 'next/link';
import { Shield, Clock, Search, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const auditSections = [
  {
    title: 'Registro de Actividad',
    description: 'Visualiza un registro detallado de todas las acciones y cambios realizados por los usuarios en el sistema de reclutamiento.',
    href: '/admin/recruitment/audits/activity-log',
    icon: Clock,
    color: 'text-purple-600',
  },
  {
    title: 'Auditoría de Acceso a Datos',
    description: 'Revisa quién ha accedido a la información confidencial de los candidatos para garantizar la seguridad y privacidad.',
    href: '/admin/recruitment/audits/data-access',
    icon: Search,
    color: 'text-orange-600',
  },
  {
    title: 'Reportes de Cumplimiento',
    description: 'Genera reportes para asegurar que los procesos de reclutamiento cumplen con las normativas internas y legales.',
    href: '/admin/recruitment/audits/compliance-reports',
    icon: FileText,
    color: 'text-green-600',
  },
];

export default function AdminAuditsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Auditoría y Seguridad (Admin)</h1>
      <p className="text-gray-600 mb-10">
        Este panel te ayuda a garantizar la transparencia y seguridad del proceso de reclutamiento. Revisa la actividad del sistema y audita el acceso a los datos para mantener el cumplimiento.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auditSections.map((section) => (
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