// src/app/admin/recruitment/approval-flows/page.tsx
// src/app/admin/recruitment/approval-flows/page.tsx
import Link from 'next/link';
import { ClipboardCheck, ArrowRightCircle, PlusCircle, PenTool, ListOrdered } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const approvalFlowsSections = [
  {
    title: 'Crear Nuevo Flujo de Aprobación',
    description: 'Define los pasos, roles y condiciones para un nuevo proceso de aprobación de vacantes.',
    href: '/admin/recruitment/approval-flows/new',
    icon: PlusCircle,
    color: 'text-blue-600',
  },
  {
    title: 'Gestionar Flujos Existentes',
    description: 'Edita, activa o desactiva los flujos de aprobación para adaptarlos a las necesidades de la organización.',
    href: '/admin/recruitment/approval-flows/manage',
    icon: PenTool,
    color: 'text-green-600',
  },
  {
    title: 'Monitor de Solicitudes',
    description: 'Supervisa el estado de todas las solicitudes de vacantes y detecta cuellos de botella en el proceso de aprobación.',
    href: '/admin/recruitment/approval-flows/monitor',
    icon: ListOrdered,
    color: 'text-orange-600',
  },
];

export default function AdminApprovalFlowsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Flujos de Aprobación de Vacantes (Admin)</h1>
      <p className="text-gray-600 mb-10">
        Personaliza y supervisa los procesos de aprobación de vacantes para garantizar que el reclutamiento esté alineado con la estructura y las políticas internas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvalFlowsSections.map((section) => (
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