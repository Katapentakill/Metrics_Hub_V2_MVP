// src/app/hr/recruitment/reports-analytics/page.tsx
import { Briefcase, Clock, Users, BarChart, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Datos simulados para métricas clave de reclutamiento
const mockKpis = [
  {
    title: 'Tiempo Promedio de Contratación',
    value: '25 días',
    icon: Clock,
    color: 'text-blue-600',
    description: 'Tiempo promedio desde la aplicación hasta la oferta.',
  },
  {
    title: 'Candidatos Activos',
    value: '145',
    icon: Users,
    color: 'text-purple-600',
    description: 'Candidatos en procesos de selección abiertos.',
  },
  {
    title: 'Vacantes Abiertas',
    value: '8',
    icon: Briefcase,
    color: 'text-green-600',
    description: 'Número total de puestos vacantes en la organización.',
  },
];

// Datos simulados para un gráfico de fuentes de candidatos
const mockSourceData = [
  { source: 'LinkedIn', count: 65 },
  { source: 'Sitio Web', count: 40 },
  { source: 'Recomendaciones', count: 30 },
  { source: 'Universidades', count: 10 },
];

export default function RecruitmentAnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reportes y Analíticas de Reclutamiento</h1>
      <p className="text-gray-600 mb-10">
        Accede a una visión estratégica del proceso de contratación con métricas en tiempo real, tendencias y la efectividad de las fuentes de candidatos.
      </p>

      {/* Sección de KPI's */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockKpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sección de Reportes y Visualizaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Fuentes de Candidatos</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenedor simulado para un gráfico de barras */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center p-4">
              <ul className="w-full space-y-2">
                {mockSourceData.map((data, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{data.source}</span>
                    <span className="bg-gray-200 rounded-full px-3 py-1">{data.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Distribución de candidatos por plataforma de origen.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Estado de Vacantes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Contenedor simulado para un gráfico de pastel */}
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center p-4">
              <ul className="w-full space-y-2">
                <li className="flex justify-between items-center text-sm">
                  <span className="font-medium">Abiertas</span>
                  <span className="bg-green-200 rounded-full px-3 py-1">5</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="font-medium">En proceso de oferta</span>
                  <span className="bg-blue-200 rounded-full px-3 py-1">2</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="font-medium">Cerradas</span>
                  <span className="bg-gray-200 rounded-full px-3 py-1">1</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Distribución de vacantes según su estado actual.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
