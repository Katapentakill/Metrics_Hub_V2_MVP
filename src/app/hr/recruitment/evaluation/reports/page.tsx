// src/app/hr/recruitment/evaluation/reports/page.tsx
'use client';

import { 
  PieChart, Download, FileText, BarChart3, Clock, Scale, CalendarCheck, Users, AlertCircle 
} from 'lucide-react';

// --- Shared Components for Auto-Containment ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'success' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-150';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    default: 'bg-gradient-to-br from-green-700 to-green-900 text-white hover:from-green-800 hover:to-green-950 shadow-md',
    secondary: 'bg-gradient-to-br from-green-400 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-700 shadow-md',
    success: 'bg-gradient-to-br from-emerald-600 to-green-700 text-white hover:from-emerald-700 hover:to-green-800 shadow-md',
    outline: 'bg-white text-gray-700 border border-slate-200 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  headerActions,
  children,
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <Icon className="w-10 h-10 text-green-800" />
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
        </div>
        {headerActions}
      </div>
      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl">{description}</p>
      {children}
    </div>
  </div>
);

// --- Mock Data ---

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
    color: 'text-yellow-600',
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
    color: 'text-emerald-600',
    path: '#',
    lastRun: 'Hace 7 días',
  },
  {
    title: 'Reporte de Eficiencia de Entrevistadores',
    description: 'Compara la productividad y la calidad del feedback entre los miembros del equipo de reclutamiento.',
    keyMetric: 'Mejor Evaluador',
    metricValue: 'Ana García',
    icon: Users,
    color: 'text-teal-600',
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
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="md">
            <CalendarCheck className="w-5 h-5 mr-2" />
            Configurar Calendario de Reportes
          </Button>
        </div>
      }
    >
      
      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {reports.slice(0, 4).map((report, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-600">{report.title}</p>
              <div className={`${report.color === 'text-yellow-600' ? 'bg-yellow-500' : report.color === 'text-blue-600' ? 'bg-blue-500' : report.color === 'text-emerald-600' ? 'bg-emerald-600' : 'bg-teal-600'} p-2 rounded-lg`}>
                <report.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">{report.metricValue}</p>
            <p className="text-xs text-gray-500 mt-1">Métrica: {report.keyMetric}</p>
          </div>
        ))}
      </div>
      
      {/* Report List */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-green-800" />
            Informes Disponibles
        </h2>

        <div className="space-y-4">
          {reports.map(report => (
            <div 
              key={report.title} 
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                <div className={`p-3 rounded-xl ${report.color === 'text-yellow-600' ? 'bg-yellow-500' : report.color === 'text-blue-600' ? 'bg-blue-500' : report.color === 'text-emerald-600' ? 'bg-emerald-600' : 'bg-teal-600'}`}>
                    <report.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{report.title}</p>
                  <p className="text-sm text-gray-600 truncate">{report.description}</p>
                </div>
              </div>

              <div className="text-center w-36">
                <p className="text-xs font-medium text-gray-500">Última Ejecución</p>
                <p className="text-sm font-medium text-slate-800">{report.lastRun}</p>
              </div>

              <div className="w-48 flex justify-end gap-2">
                <a href={report.path}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Ver Detalles
                    </Button>
                </a>
                <Button size="sm" variant="success" className="flex items-center gap-1">
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