//src/app/admin/recruitment/analytics/page.tsx
// src/app/admin/recruitment/analytics/page.tsx
import Link from 'next/link';
import { PieChart, BarChart2, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const analyticsSections = [
  {
    title: 'Análisis del Pipeline de Reclutamiento',
    description: 'Visualiza las tasas de conversión y el tiempo de permanencia de los candidatos en cada etapa del proceso.',
    href: '/admin/recruitment/analytics/pipeline',
    icon: PieChart,
    color: 'text-blue-600',
  },
  {
    title: 'Métricas de Contratación',
    description: 'Analiza el tiempo promedio para contratar y el costo por contratación para optimizar el presupuesto y los recursos.',
    href: '/admin/recruitment/analytics/hiring-metrics',
    icon: BarChart2,
    color: 'text-green-600',
  },
  {
    title: 'Análisis de Fuente de Candidatos',
    description: 'Identifica las fuentes de reclutamiento más efectivas para atraer a los candidatos de mayor calidad.',
    href: '/admin/recruitment/analytics/source-analysis',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Tendencias Históricas',
    description: 'Compara el rendimiento del reclutamiento a lo largo del tiempo para detectar patrones y planificar a futuro.',
    href: '/admin/recruitment/analytics/historical-trends',
    icon: TrendingUp,
    color: 'text-orange-600',
  },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reportes y Analíticas (Admin)</h1>
      <p className="text-gray-600 mb-10">
        Obtén una visión estratégica del proceso de reclutamiento. Usa estos reportes para tomar decisiones basadas en datos y mejorar la eficiencia del equipo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {analyticsSections.map((section) => (
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