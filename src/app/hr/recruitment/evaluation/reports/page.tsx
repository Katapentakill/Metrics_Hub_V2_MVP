// src/app/hr/recruitment/evaluation/reports/page.tsx
'use client';

import { 
  PieChart, Download, FileText, BarChart3, Clock, Scale, CalendarCheck, Users, AlertCircle 
} from 'lucide-react';

// --- DEFINICIONES DE COMPONENTES INTERNOS PARA RESOLVER ERRORES DE COMPILACIÓN ---

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  iconGradient: string;
  breadcrumbItems: { label: string; href?: string }[];
  headerActions: React.ReactNode;
  children: React.ReactNode;
}

// Minimal AdminPageLayout implementation (to satisfy the import)
const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({ title, subtitle, description, icon: Icon, iconGradient, breadcrumbItems, headerActions, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
        {/* Simplified Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 max-w-7xl mx-auto">
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center">
              {item.href ? (
                <a href={item.href} className="hover:text-green-600 transition-colors">{item.label}</a>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl text-white shadow-lg ${iconGradient}`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                        <p className="text-xl text-gray-600">{subtitle}</p>
                    </div>
                </div>
                {headerActions}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-4xl">{description}</p>
        </div>
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
    </div>
  );
};

// Minimal Button implementation (to satisfy the import)
const Button = ({ children, variant, size, onClick, className = '' }: any) => {
    let baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center';
    let variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md';
    if (variant === 'outline') {
        variantStyle = 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100';
    }
    if (size === 'sm') {
        baseStyle = 'px-3 py-2 text-sm rounded-lg font-semibold transition-all flex items-center justify-center';
    }
    
    return (
        <button className={`${baseStyle} ${variantStyle} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};
// --- FIN DEFINICIONES DE COMPONENTES INTERNOS ---

// Mock Data
interface Report {
  title: string;
  description: string;
  keyMetric: string;
  metricValue: string;
  icon: any;
  color: string;
  path: string;
  lastRun: string;
}

const reports: Report[] = [
  {
    title: 'Tiempo Promedio de Contratación',
    description: 'Mide la duración media desde que se inicia una vacante hasta que se contrata al candidato.',
    keyMetric: 'Días promedio',
    metricValue: '35',
    icon: Clock,
    color: 'text-orange-600',
    path: '#',
    lastRun: 'Ayer',
  },
  {
    title: 'Tasa de Conversión de Entrevistas',
    description: 'Porcentaje de candidatos que pasan de la Fase 1 a la Fase 2 de la entrevista.',
    keyMetric: 'Tasa de éxito',
    metricValue: '45%',
    icon: BarChart3,
    color: 'text-blue-600',
    path: '#',
    lastRun: 'Hace 4 horas',
  },
  {
    title: 'Análisis de Sesgo en Puntuación',
    description: 'Audita las calificaciones para detectar posibles sesgos inconscientes por entrevistador o departamento.',
    keyMetric: 'Nivel de Sesgo',
    metricValue: 'Bajo',
    icon: Scale,
    color: 'text-purple-600',
    path: '#',
    lastRun: 'Hace 7 días',
  },
  {
    title: 'Reporte de Eficiencia de Entrevistadores',
    description: 'Compara la productividad y la calidad del feedback entre los miembros del equipo de reclutamiento.',
    keyMetric: 'Mejor Evaluador',
    metricValue: 'Ana García',
    icon: Users,
    color: 'text-green-600',
    path: '#',
    lastRun: 'Hace 2 días',
  },
];

export default function AdminAssessmentReportsPage() {
  return (
    <AdminPageLayout
      title="Reportes de Evaluación"
      subtitle="Analítica y Auditoría del Proceso"
      description="Accede a informes detallados y visualiza métricas clave para optimizar la eficiencia, reducir el tiempo de contratación y asegurar la equidad en la evaluación de talentos."
      icon={PieChart}
      iconGradient="bg-gradient-to-br from-orange-500 to-yellow-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/hr/recruitment' },
        { label: 'Evaluación', href: '/hr/recruitment/evaluation' },
        { label: 'Reportes de Evaluación' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <CalendarCheck className="w-4 h-4 mr-2" />
            Configurar Calendario de Reportes
          </Button>
        </div>
      }
    >
      
      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {reports.slice(0, 4).map((report, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <report.icon className={`w-6 h-6 ${report.color}`} />
              <p className="text-sm font-medium text-gray-600">{report.title}</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{report.metricValue}</p>
            <p className="text-xs text-gray-500 mt-1">Métrica: {report.keyMetric}</p>
          </div>
        ))}
      </div>
      
      {/* Report List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-gray-600" />
            Informes Disponibles
        </h2>

        <div className="space-y-4">
          {reports.map(report => (
            <div 
              key={report.title} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                <div className={`p-3 rounded-xl bg-gray-50 border`}>
                    <report.icon className={`w-6 h-6 ${report.color}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{report.title}</p>
                  <p className="text-sm text-gray-600 truncate">{report.description}</p>
                </div>
              </div>

              <div className="text-center w-36">
                <p className="text-xs font-medium text-gray-500">Última Ejecución</p>
                <p className="text-sm font-medium text-gray-700">{report.lastRun}</p>
              </div>

              <div className="w-48 flex justify-end gap-2">
                <a href={report.path}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Ver Detalles
                    </Button>
                </a>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
              </div>
            </div>
          ))}
          {reports.length === 0 && (
            <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <p>No hay reportes disponibles en este momento.</p>
            </div>
          )}
        </div>
      </div>

    </AdminPageLayout>
  );
}
