// src/app/admin/recruitment/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { PieChart, BarChart2, TrendingUp, Users, Clock, Target, DollarSign, ChevronDown, CheckCircle, PlusCircle, Calendar, MessageSquare, Sliders, FileText, ArrowRight } from 'lucide-react';

// --- Shared Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
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
    default: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg shadow-md',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
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
  iconGradient: string;
  breadcrumbItems: { label: string; href?: string }[];
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  iconGradient,
  breadcrumbItems,
  headerActions,
  children,
}) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-100">
    <div className="p-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <a href={item.href} className="hover:text-emerald-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
            {index < breadcrumbItems.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
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
      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl">{description}</p>
      {children}
    </div>
  </div>
);

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>
);

interface StatProps {
  title: string;
  value: string | number;
  change: { value: number; type: 'increase' | 'decrease'; period: string };
  icon: React.ElementType;
  color: string;
}

const AdminDashboardStats: React.FC<{ stats: StatProps[] }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    {stats.map((stat) => {
      const Icon = stat.icon;
      const isIncrease = stat.change.type === 'increase';
      const changeColor = isIncrease ? 'text-emerald-600' : 'text-red-600';
      const changeBg = isIncrease ? 'bg-emerald-50' : 'bg-red-50';

      return (
        <Card key={stat.title} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${changeBg}`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}>
              <TrendingUp className={`w-4 h-4 ${!isIncrease ? 'rotate-180' : ''}`} />
              {Math.abs(stat.change.value)}%
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-xs text-gray-500 mt-1">vs {stat.change.period}</p>
          </div>
        </Card>
      );
    })}
  </div>
);

interface SectionStat {
  label: string;
  value: string;
}

interface SectionProps {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
  badge: { status: 'info' | 'success' | 'active' | 'warning'; text: string };
  stats: SectionStat[];
  priority: 'high' | 'medium' | 'low';
  isActive: boolean;
}

const getBadgeColor = (status: SectionProps['badge']['status']) => {
  switch (status) {
    case 'success':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'info':
      return 'bg-teal-100 text-teal-700 border-teal-200';
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'warning':
      return 'bg-lime-100 text-lime-700 border-lime-200';
  }
};

const AdminSectionCard: React.FC<SectionProps> = ({
  title,
  description,
  href,
  icon: Icon,
  color,
  badge,
  stats,
  isActive,
}) => (
  <Card className={`${isActive ? 'border-emerald-400 border-2 shadow-lg' : 'border-gray-200'} p-6 transition-all duration-300 hover:shadow-md`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg bg-emerald-50/30 shadow-sm border border-emerald-100 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
      </div>
      <div className={`px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeColor(badge.status)}`}>
        {badge.text}
      </div>
    </div>
    
    <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
        <div className="flex gap-6">
            {stats.map(stat => (
                <div key={stat.label}>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                </div>
            ))}
        </div>
        <a href={href}>
            <Button size="sm" variant="default">
                <ArrowRight className="w-4 h-4" />
            </Button>
        </a>
    </div>
  </Card>
);

// Mock data
const analyticsStats: StatProps[] = [
  {
    title: 'Tasa de Conversión',
    value: '24%',
    change: { value: 8, type: 'increase', period: 'trimestre anterior' },
    icon: Target,
    color: 'text-emerald-600',
  },
  {
    title: 'Tiempo Promedio de Contratación',
    value: '18 días',
    change: { value: 12, type: 'decrease', period: 'mes anterior' },
    icon: Clock,
    color: 'text-teal-600',
  },
  {
    title: 'Costo por Contratación',
    value: '$2,450',
    change: { value: 15, type: 'decrease', period: 'trimestre anterior' },
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Fuentes Activas',
    value: 12,
    change: { value: 20, type: 'increase', period: 'mes anterior' },
    icon: Users,
    color: 'text-lime-600',
  },
];

const analyticsSections: Omit<SectionProps, 'isActive'>[] = [
  {
    title: 'Análisis del Pipeline de Reclutamiento',
    description: 'Visualiza las tasas de conversión y el tiempo de permanencia de los candidatos en cada etapa del proceso.',
    href: '/admin/recruitment/analytics/pipeline',
    icon: PieChart,
    color: 'text-teal-600',
    badge: { status: 'info', text: '24% Conversión' },
    stats: [
      { label: 'Etapas', value: '6' },
      { label: 'Candidatos', value: '156' },
    ],
    priority: 'high',
  },
  {
    title: 'Métricas de Contratación',
    description: 'Analiza el tiempo promedio para contratar y el costo por contratación para optimizar el presupuesto y los recursos.',
    href: '/admin/recruitment/analytics/hiring-metrics',
    icon: BarChart2,
    color: 'text-emerald-600',
    badge: { status: 'success', text: '18 días promedio' },
    stats: [
      { label: 'Contrataciones', value: '8' },
      { label: 'Costo', value: '$2,450' },
    ],
    priority: 'high',
  },
  {
    title: 'Análisis de Fuente de Candidatos',
    description: 'Identifica las fuentes de reclutamiento más efectivas para atraer a los candidatos de mayor calidad.',
    href: '/admin/recruitment/analytics/source-analysis',
    icon: Users,
    color: 'text-green-600',
    badge: { status: 'active', text: '12 Fuentes' },
    stats: [
      { label: 'LinkedIn', value: '45%' },
      { label: 'Referidos', value: '32%' },
    ],
    priority: 'medium',
  },
  {
    title: 'Tendencias Históricas',
    description: 'Compara el rendimiento del reclutamiento a lo largo del tiempo para detectar patrones y planificar a futuro.',
    href: '/admin/recruitment/analytics/historical-trends',
    icon: TrendingUp,
    color: 'text-lime-600',
    badge: { status: 'warning', text: '12 meses' },
    stats: [
      { label: 'Tendencia', value: '+8%' },
      { label: 'Proyección', value: '+12%' },
    ],
    priority: 'low',
  },
];

const tabSections = [
    { label: 'Pipeline de Reclutamiento', icon: PieChart, id: 0 },
    { label: 'Métricas de Contratación', icon: BarChart2, id: 1 },
    { label: 'Fuente de Candidatos', icon: Users, id: 2 },
    { label: 'Tendencias Históricas', icon: TrendingUp, id: 3 },
];

export default function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const currentSectionData = analyticsSections[activeTab];

  return (
    <AdminPageLayout
      title="Reportes y Analíticas"
      subtitle="Panel de Administración"
      description="Obtén una visión estratégica del proceso de reclutamiento. Usa estos reportes para tomar decisiones basadas en datos y mejorar la eficiencia del equipo de talent management."
      icon={BarChart2}
      iconGradient="bg-gradient-to-br from-emerald-500 to-teal-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/admin/recruitment' },
        { label: 'Reportes y Analíticas' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="md">
            <Calendar className="w-5 h-5 mr-2" />
            Exportar Rango
          </Button>
          <Button variant="default" size="md">
            <FileText className="w-5 h-5 mr-2" />
            Generar Reporte
          </Button>
        </div>
      }
    >
      <AdminDashboardStats stats={analyticsStats} />

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-8">
        <div className="flex border-b border-gray-200 p-4 space-x-4 overflow-x-auto">
          {tabSections.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-2.5 font-semibold transition-all rounded-lg ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
            <AdminSectionCard
                title={currentSectionData.title}
                description={currentSectionData.description}
                href={currentSectionData.href}
                icon={currentSectionData.icon}
                color={currentSectionData.color}
                badge={currentSectionData.badge}
                stats={currentSectionData.stats}
                priority={currentSectionData.priority}
                isActive={true}
            />
            
            {/* Chart Area Simulation */}
            <div className='mt-8 p-8 bg-gradient-to-br from-emerald-50/30 to-teal-50/20 border-2 border-emerald-100 rounded-xl text-center'>
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-3 bg-white rounded-lg shadow-sm border border-emerald-200">
                        {React.createElement(currentSectionData.icon, { className: `w-8 h-8 ${currentSectionData.color}` })}
                    </div>
                    <div>
                        <p className="text-xl font-bold text-gray-900">Contenido detallado del gráfico</p>
                        <p className="text-sm text-emerald-600 font-medium">{currentSectionData.title}</p>
                    </div>
                </div>
                <p className='text-sm text-gray-500 mt-4'>(Simulación de área de visualización de datos complejos)</p>
                
                {/* Mock Chart Elements */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">87%</p>
                        <p className="text-xs text-gray-600">Eficiencia</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-teal-100 shadow-sm">
                        <div className="w-12 h-12 bg-teal-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-teal-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">+24%</p>
                        <p className="text-xs text-gray-600">Crecimiento</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Target className="w-6 h-6 text-green-600" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                        <p className="text-xs text-gray-600">Total</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}