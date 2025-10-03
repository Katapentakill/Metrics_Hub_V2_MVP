// src/modules/recruitment/admin/Talent-Management.tsx
import {
  Users,
  Briefcase,
  BarChart,
  ClipboardCheck,
  FileText,
  Cog,
  Shield,
  Handshake,
  UserCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import AdminBreadcrumb from './components/AdminBreadcrumb';
import AdminSectionCard from './components/AdminSectionCard';
import AdminDashboardStats from './components/AdminDashboardStats';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: 'Vacantes Activas',
    value: 24,
    change: { value: 12, type: 'increase' as const, period: 'mes anterior' },
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Candidatos en Proceso',
    value: 156,
    change: { value: 8, type: 'increase' as const, period: 'semana anterior' },
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Contrataciones del Mes',
    value: 8,
    change: { value: -5, type: 'decrease' as const, period: 'mes anterior' },
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Tiempo Promedio de Contratación',
    value: '18 días',
    change: { value: -12, type: 'decrease' as const, period: 'trimestre anterior' },
    icon: Clock,
    color: 'text-orange-600',
  },
];

const sections = [
  {
    category: 'Adquisición de Talento',
    priority: 'high' as const,
    items: [
      {
        title: 'Gestión de Vacantes',
        description: 'Supervisa todas las solicitudes de vacantes, desde las que están en borrador hasta las publicadas.',
        href: '/admin/recruitment/job-openings',
        icon: Briefcase,
        color: 'text-blue-600',
        badge: { status: 'active' as const, text: '24 Activas' },
        stats: [
          { label: 'Pendientes', value: '12' },
          { label: 'Publicadas', value: '24' },
        ],
        priority: 'high' as const,
      },
      {
        title: 'Gestión de Candidatos',
        description: 'Visualiza el pipeline completo, la base de datos de candidatos y la comunicación de todo el equipo.',
        href: '/admin/recruitment/candidate-management',
        icon: Users,
        color: 'text-purple-600',
        badge: { status: 'info' as const, text: '156 En Proceso' },
        stats: [
          { label: 'Nuevos', value: '42' },
          { label: 'En Revisión', value: '114' },
        ],
        priority: 'high' as const,
      },
      {
        title: 'Evaluación y Selección',
        description: 'Accede a las herramientas de evaluación, flujos de entrevistas y comentarios de los entrevistadores.',
        href: '/admin/recruitment/evaluation',
        icon: UserCheck,
        color: 'text-green-600',
        badge: { status: 'warning' as const, text: '8 Pendientes' },
        stats: [
          { label: 'Entrevistas', value: '23' },
          { label: 'Evaluaciones', value: '15' },
        ],
        priority: 'high' as const,
        quickActions: [
          { label: 'Gestionar Entrevistas', href: '/admin/recruitment/evaluation/interview-management' },
          { label: 'Ver Calendario', href: '/admin/recruitment/evaluation/interview-management?view=calendar' }
        ]
      },
      {
        title: 'Ofertas y Contratación',
        description: 'Monitorea el estado de las ofertas de empleo y el proceso de formalización de la contratación.',
        href: '/admin/recruitment/offers-hiring',
        icon: Handshake,
        color: 'text-orange-600',
        badge: { status: 'success' as const, text: '5 Ofertas Enviadas' },
        stats: [
          { label: 'Aceptadas', value: '3' },
          { label: 'Pendientes', value: '2' },
        ],
        priority: 'medium' as const,
      },
    ],
  },
  {
    category: 'Análisis y Control',
    priority: 'medium' as const,
    items: [
      {
        title: 'Reportes y Analíticas',
        description: 'Obtén una visión estratégica con métricas clave y datos sobre la efectividad de los canales de reclutamiento.',
        href: '/admin/recruitment/analytics',
        icon: BarChart,
        color: 'text-red-600',
        badge: { status: 'info' as const, text: 'Actualizado' },
        stats: [
          { label: 'Reportes', value: '12' },
          { label: 'Métricas', value: '45' },
        ],
        priority: 'low' as const,
      },
      {
        title: 'Auditoría y Seguridad',
        description: 'Revisa un historial detallado de todas las actividades para asegurar la transparencia y el cumplimiento.',
        href: '/admin/recruitment/audits',
        icon: Shield,
        color: 'text-slate-600',
        badge: { status: 'success' as const, text: 'Compliant' },
        stats: [
          { label: 'Logs', value: '1.2k' },
          { label: 'Alertas', value: '0' },
        ],
        priority: 'low' as const,
      },
    ],
  },
  
];

export default function TalentManagementAdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBreadcrumb
          items={[
            { label: 'Recruitment', href: '/admin/recruitment' },
            { label: 'Talent Management' }
          ]}
        />
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-xl text-gray-600">Talent Management</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Bienvenido al centro de control. Utiliza estas herramientas para supervisar, analizar y personalizar
            el sistema de gestión de talento para toda la organización.
          </p>
        </div>

        <AdminDashboardStats stats={dashboardStats} />

        {sections.map((section) => (
          <div key={section.category} className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{section.category}</h2>
              {section.priority === 'high' && (
                <div className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  <AlertTriangle className="w-4 h-4" />
                  Alta Prioridad
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <AdminSectionCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  icon={item.icon}
                  color={item.color}
                  badge={item.badge}
                  stats={item.stats}
                  priority={item.priority}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}