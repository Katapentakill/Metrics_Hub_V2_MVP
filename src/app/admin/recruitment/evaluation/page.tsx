// src/app/admin/recruitment/evaluation/page.tsx
import Link from 'next/link';
import { UserCheck, Sliders, CalendarCheck, FileText, MessageSquare, PieChart, Star, Clock, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/modules/recruitment/admin/components/AdminPageLayout';

const evaluationSections = [
  {
    title: '🎯 Gestión de Entrevistas',
    description: 'Supervisa todas las entrevistas programadas por el equipo. Accede a los calendarios y edita los detalles si es necesario.',
    href: '/admin/recruitment/evaluation/interview-management',
    icon: CalendarCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-50 hover:bg-green-100',
    borderColor: 'border-green-200',
    priority: 'high',
    stats: { interviews: '23 programadas', pending: '8 pendientes' }
  },
  {
    title: 'Filtrado Automático y Puntuación',
    description: 'Configura reglas para clasificar automáticamente a los candidatos y audita los resultados para garantizar la equidad en el proceso.',
    href: '/admin/recruitment/evaluation/filter-score',
    icon: Sliders,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 hover:bg-purple-100',
    borderColor: 'border-purple-200',
    priority: 'medium',
    stats: { rules: '12 activas', processed: '156 candidatos' }
  },
  {
    title: 'Reportes de Evaluación',
    description: 'Analiza los resultados de todas las pruebas y evaluaciones. Identifica tendencias y toma decisiones basadas en datos.',
    href: '/admin/recruitment/evaluation/reports',
    icon: PieChart,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 hover:bg-orange-100',
    borderColor: 'border-orange-200',
    priority: 'medium',
    stats: { reports: '15 disponibles', updated: 'Hace 2h' }
  },
  {
    title: 'Feedback del Equipo',
    description: 'Revisa las calificaciones y los comentarios de todos los entrevistadores para obtener una visión completa del rendimiento de los candidatos.',
    href: '/admin/recruitment/evaluation/feedback',
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 hover:bg-blue-100',
    borderColor: 'border-blue-200',
    priority: 'medium',
    stats: { feedback: '42 nuevos', pending: '12 por revisar' }
  },
];

export default function AdminEvaluationAndSelectionPage() {
  return (
    <AdminPageLayout
      title="Evaluación y Selección"
      subtitle="Panel de Administración"
      description="Desde este panel de control, puedes supervisar y gestionar el proceso de evaluación en toda la organización. Gestiona entrevistas, configura filtros automáticos y analiza resultados para asegurar procesos justos y eficientes."
      icon={UserCheck}
      iconGradient="bg-gradient-to-br from-green-500 to-blue-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/admin/recruitment' },
        { label: 'Evaluación y Selección' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Ver Calendario
          </Button>
          <Button size="sm">
            <Users className="w-4 h-4 mr-2" />
            Gestionar Entrevistas
          </Button>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Entrevistas Hoy</p>
              <p className="text-2xl font-bold text-green-900">8</p>
            </div>
            <CalendarCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Feedback Pendiente</p>
              <p className="text-2xl font-bold text-blue-900">12</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Candidatos Filtrados</p>
              <p className="text-2xl font-bold text-purple-900">156</p>
            </div>
            <Sliders className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Reportes Nuevos</p>
              <p className="text-2xl font-bold text-orange-900">5</p>
            </div>
            <PieChart className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evaluationSections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className={`${section.bgColor} border-2 ${section.borderColor} hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:scale-105`}>
              <CardHeader>
                <div className={`flex items-center gap-3 ${section.color}`}>
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    {section.priority === 'high' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                        Alta Prioridad
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{Object.values(section.stats)[0]}</span>
                  <span>{Object.values(section.stats)[1]}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Access to Interview Management */}
      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Acceso Rápido: Gestión de Entrevistas</h3>
            <p className="text-gray-600">La herramienta más utilizada para supervisar y coordinar todas las entrevistas del equipo.</p>
          </div>
          <Link href="/admin/recruitment/evaluation/interview-management">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              <CalendarCheck className="w-5 h-5 mr-2" />
              Ir a Entrevistas
            </Button>
          </Link>
        </div>
      </div>
    </AdminPageLayout>
  );
}