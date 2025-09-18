
// src/app/hr/recruitment/evaluation/page.tsx
import Link from 'next/link';
import { UserCheck, Sliders, CalendarCheck, FileText, Star, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const evaluationSections = [
  {
    title: 'Filtrado Automático y Puntuación',
    description: 'Configura reglas para clasificar automáticamente a los candidatos y obtener una puntuación de compatibilidad con la vacante.',
    href: '/hr/recruitment/evaluation/auto-filter',
    icon: Sliders,
    color: 'text-purple-600',
  },
  {
    title: 'Herramientas de Evaluación',
    description: 'Integra y gestiona los resultados de pruebas psicométricas, evaluaciones técnicas o videoentrevistas.',
    href: '/hr/recruitment/evaluation/assessment-tools',
    icon: FileText,
    color: 'text-orange-600',
  },
  {
    title: 'Feedback de Entrevistadores',
    description: 'Centraliza las calificaciones, notas y comentarios del equipo sobre el desempeño de cada candidato.',
    href: '/hr/recruitment/evaluation/interviewer-feedback',
    icon: MessageSquare,
    color: 'text-blue-600',
  },
];

export default function EvaluationAndSelectionPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Evaluación y Selección</h1>
      <p className="text-gray-600 mb-10">
        Utiliza estas herramientas para calificar a los candidatos de forma objetiva, coordinar entrevistas y centralizar el feedback del equipo de reclutamiento.
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

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/hr/recruitment/evaluation/candidate-evaluation-report">
            <UserCheck className="mr-2 h-4 w-4" />
            Ver Reporte de Evaluación General
          </Link>
        </Button>
      </div>
    </div>
  );
}