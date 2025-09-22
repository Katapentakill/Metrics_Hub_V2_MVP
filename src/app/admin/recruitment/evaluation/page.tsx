// src/app/admin/recruitment/evaluation/page.tsx
// src/app/admin/recruitment/evaluation/page.tsx
import Link from 'next/link';
import { UserCheck, Sliders, CalendarCheck, FileText, MessageSquare, PieChart, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const evaluationSections = [
  {
    title: 'Filtrado Automático y Puntuación',
    description: 'Configura reglas para clasificar automáticamente a los candidatos y audita los resultados para garantizar la equidad en el proceso.',
    href: '/admin/recruitment/evaluation/auto-filter',
    icon: Sliders,
    color: 'text-purple-600',
  },
  {
    title: 'Gestión de Entrevistas',
    description: 'Supervisa todas las entrevistas programadas por el equipo. Accede a los calendarios y edita los detalles si es necesario.',
    href: '/admin/recruitment/evaluation/interview-management',
    icon: CalendarCheck,
    color: 'text-green-600',
  },
  {
    title: 'Reportes de Evaluación',
    description: 'Analiza los resultados de todas las pruebas y evaluaciones. Identifica tendencias y toma decisiones basadas en datos.',
    href: '/admin/recruitment/evaluation/assessment-reports',
    icon: PieChart,
    color: 'text-orange-600',
  },
  {
    title: 'Feedback del Equipo',
    description: 'Revisa las calificaciones y los comentarios de todos los entrevistadores para obtener una visión completa del rendimiento de los candidatos.',
    href: '/admin/recruitment/evaluation/feedback-review',
    icon: MessageSquare,
    color: 'text-blue-600',
  },
];

export default function AdminEvaluationAndSelectionPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluación y Selección (Admin)</h1>
      <p className="text-gray-600 mb-10">
        Desde este panel de control, puedes supervisar y gestionar el proceso de evaluación en toda la organización. Asegura que los procesos sean justos y eficientes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {evaluationSections.map((section) => (
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