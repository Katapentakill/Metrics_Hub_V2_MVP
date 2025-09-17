//  src/modules/recruitment/admin/Talent-Management.tsx// src/modules/recruitment/admin/Talent-Management.tsx
import Link from 'next/link';
import {
  Users,
  Briefcase,
  Sliders,
  BarChart,
  ClipboardCheck,
  CheckCircle,
  FileText,
  Lock,
  MessageSquare,
  Cog,
  Shield,
  Handshake,
  UserCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const sections = [
  {
    category: 'Adquisición de Talento',
    items: [
      {
        title: 'Gestión de Vacantes',
        description: 'Supervisa todas las solicitudes de vacantes, desde las que están en borrador hasta las publicadas.',
        href: '/admin/recruitment/job-openings',
        icon: Briefcase,
        color: 'text-blue-600',
      },
      {
        title: 'Gestión de Candidatos',
        description: 'Visualiza el pipeline completo, la base de datos de candidatos y la comunicación de todo el equipo.',
        href: '/admin/recruitment/candidate-management',
        icon: Users,
        color: 'text-purple-600',
      },
      {
        title: 'Evaluación y Selección',
        description: 'Accede a las herramientas de evaluación, flujos de entrevistas y comentarios de los entrevistadores.',
        href: '/admin/recruitment/evaluation',
        icon: UserCheck,
        color: 'text-green-600',
      },
      {
        title: 'Ofertas y Contratación',
        description: 'Monitorea el estado de las ofertas de empleo y el proceso de formalización de la contratación.',
        href: '/admin/recruitment/offers-hiring',
        icon: Handshake,
        color: 'text-orange-600',
      },
    ],
  },
  {
    category: 'Análisis y Control',
    items: [
      {
        title: 'Reportes y Analíticas',
        description: 'Obtén una visión estratégica con métricas clave y datos sobre la efectividad de los canales de reclutamiento.',
        href: '/admin/recruitment/analytics',
        icon: BarChart,
        color: 'text-red-600',
      },
      {
        title: 'Auditoría y Seguridad',
        description: 'Revisa un historial detallado de todas las actividades para asegurar la transparencia y el cumplimiento.',
        href: '/admin/recruitment/audits',
        icon: Shield,
        color: 'text-slate-600',
      },
    ],
  },
  {
    category: 'Configuración del Sistema',
    items: [
      {
        title: 'Usuarios y Permisos',
        description: 'Crea, edita y gestiona las cuentas de usuario y define los roles de acceso para todo el equipo.',
        href: '/admin/recruitment/users-permissions',
        icon: Cog,
        color: 'text-indigo-600',
      },
      {
        title: 'Flujos de Aprobación',
        description: 'Personaliza los pasos de aprobación de vacantes para alinear los procesos de reclutamiento.',
        href: '/admin/recruitment/approval-flows',
        icon: ClipboardCheck,
        color: 'text-cyan-600',
      },
      {
        title: 'Plantillas y Contenido',
        description: 'Crea y administra plantillas reutilizables para correos electrónicos, ofertas y descripciones de puestos.',
        href: '/admin/recruitment/templates',
        icon: FileText,
        color: 'text-lime-600',
      },
    ],
  },
];

export default function TalentManagementAdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración de Talent Management</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido al centro de control. Utiliza estas herramientas para supervisar, analizar y personalizar el sistema de gestión de talento para toda la organización.
      </p>

      {sections.map((section) => (
        <div key={section.category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{section.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`flex items-center gap-3 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}