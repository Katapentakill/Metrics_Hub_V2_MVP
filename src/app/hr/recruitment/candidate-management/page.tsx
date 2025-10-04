// src/app/hr/recruitment/candidate-management/page.tsx
import Link from 'next/link';
import { UserPlus, Users, BarChart, Search, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminBreadcrumb from '@/modules/recruitment/hr/components/AdminBreadcrumb';
import AdminSectionCard from '@/modules/recruitment/hr/components/AdminSectionCard';
import AdminDashboardStats from '@/modules/recruitment/hr/components/AdminDashboardStats';

// Mock data for candidate management stats
const candidateStats = [
  {
    title: 'Total Candidatos',
    value: 1247,
    change: { value: 18, type: 'increase' as const, period: 'mes anterior' },
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Candidatos Activos',
    value: 156,
    change: { value: 12, type: 'increase' as const, period: 'semana anterior' },
    icon: Clock,
    color: 'text-blue-600',
  },
  {
    title: 'En Proceso de Entrevista',
    value: 23,
    change: { value: 5, type: 'increase' as const, period: 'semana anterior' },
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    title: 'Requieren Atención',
    value: 8,
    change: { value: -20, type: 'decrease' as const, period: 'semana anterior' },
    icon: AlertTriangle,
    color: 'text-orange-600',
  },
];

const adminCandidateManagementSections = [
  {
    title: 'Seguimiento de Candidatos (Tracker)',
    description: 'Visualiza y gestiona el progreso de todos los candidatos activos a través del embudo de reclutamiento.',
    href: '/hr/recruitment/candidate-management/tracker',
    icon: BarChart,
    color: 'text-indigo-600',
    badge: { status: 'active' as const, text: '156 Activos' },
    stats: [
      { label: 'En Revisión', value: '89' },
      { label: 'Entrevistas', value: '67' },
    ],
    priority: 'high' as const,
  },
  {
    title: 'Base de Datos de Candidatos',
    description: 'Accede a un repositorio global con todos los perfiles de candidatos en la historia de la organización.',
    href: '/hr/recruitment/candidate-management/database',
    icon: Search,
    color: 'text-green-600',
    badge: { status: 'info' as const, text: '1,247 Total' },
    stats: [
      { label: 'Nuevos', value: '42' },
      { label: 'Históricos', value: '1,205' },
    ],
    priority: 'medium' as const,
  }
];

export default function AdminCandidateManagementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBreadcrumb
          items={[
            { label: 'Recruitment', href: '/hr/recruitment' },
            { label: 'Talent Management', href: '/hr/recruitment' },
            { label: 'Gestión de Candidatos' }
          ]}
        />
        
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Gestión de Candidatos</h1>
              <p className="text-xl text-gray-600">Panel de Administración</p>
            </div>
          </div>
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/hr/recruitment/candidate-management/add-candidate">
              <UserPlus className="mr-2 h-5 w-5" />
              Agregar Candidato
            </Link>
          </Button>
        </div>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl">
          Bienvenido al panel de control de candidatos. Desde aquí puedes supervisar y gestionar a todos los
          candidatos a nivel de toda la organización, monitorear su progreso y acceder a la base de datos completa.
        </p>

        <AdminDashboardStats stats={candidateStats} />

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Herramientas de Gestión</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {adminCandidateManagementSections.map((section) => (
              <AdminSectionCard
                key={section.title}
                title={section.title}
                description={section.description}
                href={section.href}
                icon={section.icon}
                color={section.color}
                badge={section.badge}
                stats={section.stats}
                priority={section.priority}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}