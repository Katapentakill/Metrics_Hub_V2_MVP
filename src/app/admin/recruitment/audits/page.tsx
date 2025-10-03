// src/app/admin/recruitment/audits/page.tsx
'use client';

import React, { useState } from 'react';
import { Shield, Clock, Search, FileText, AlertTriangle, CheckCircle, Eye, TrendingUp, DollarSign, Target, Users, Calendar, ArrowRight, BarChart2, PieChart } from 'lucide-react';

// --- Shared Components for Auto-Containment ---

// Reemplazo simplificado para '@/components/ui/button'
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
    default: 'bg-slate-600 text-white hover:bg-slate-700 shadow-md',
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

// Reemplazo simplificado para '@/modules/recruitment/admin/components/AdminPageLayout'
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
  <div className="min-h-screen bg-gray-50">
    <div className="p-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <a href={item.href} className="hover:text-indigo-600 transition-colors">
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

// Reemplazo simplificado para las Cards
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);
const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-5 pb-2">{children}</div>;
const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>
);
const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-5 pt-0">{children}</div>;


// Componente para estadísticas rápidas (AdminDashboardStats)
interface StatProps {
  title: string;
  value: string | number;
  change: { value: number; type: 'increase' | 'decrease' | 'neutral'; period: string };
  icon: React.ElementType;
  color: string;
}

const AdminDashboardStats: React.FC<{ stats: StatProps[] }> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    {stats.map((stat) => {
      const Icon = stat.icon;
      
      let changeColor = 'text-gray-600';
      let changeBg = 'bg-gray-50';
      let isIncreasing = false;

      if (stat.change.type === 'increase') {
        changeColor = 'text-green-600';
        changeBg = 'bg-green-50';
        isIncreasing = true;
      } else if (stat.change.type === 'decrease') {
        changeColor = 'text-red-600';
        changeBg = 'bg-red-50';
      }

      return (
        <Card key={stat.title} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${changeBg}`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}>
                {stat.change.type !== 'neutral' && (
                    <TrendingUp className={`w-4 h-4 ${!isIncreasing ? 'rotate-180' : ''}`} />
                )}
                {stat.change.type !== 'neutral' ? `${Math.abs(stat.change.value)}%` : 'Estable'}
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


// Componente para la Tarjeta de Contenido del Tab (AdminSectionCard)
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
      return 'bg-green-100 text-green-800 border-green-200';
    case 'info':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'active':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'warning':
      return 'bg-orange-100 text-orange-800 border-orange-200';
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
  <Card className={`${isActive ? 'border-slate-400 border-2' : 'border-gray-200'} p-6 transition-all duration-300`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg bg-gray-50 shadow-sm border ${color}`}>
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
            <Button size="sm" variant="default" className="bg-slate-600 hover:bg-slate-700">
                <ArrowRight className="w-4 h-4" />
            </Button>
        </a>
    </div>
  </Card>
);


// Mock data for audit stats (Updated to match StatProps)
const auditStats: StatProps[] = [
  {
    title: 'Eventos de Auditoría',
    value: 1247,
    change: { value: 5, type: 'increase', period: 'semana anterior' },
    icon: Eye,
    color: 'text-blue-600',
  },
  {
    title: 'Accesos a Datos',
    value: 89,
    change: { value: 12, type: 'decrease', period: 'día anterior' },
    icon: Search,
    color: 'text-green-600',
  },
  {
    title: 'Alertas de Seguridad',
    value: 0,
    change: { value: 0, type: 'neutral', period: 'mes actual' },
    icon: AlertTriangle,
    color: 'text-orange-600',
  },
  {
    title: 'Estado de Cumplimiento',
    value: '100%',
    change: { value: 0, type: 'neutral', period: 'trimestre actual' },
    icon: CheckCircle,
    color: 'text-green-600',
  },
];

const auditSections: Omit<SectionProps, 'isActive'>[] = [
  {
    title: 'Registro de Actividad',
    description: 'Visualiza un registro detallado de todas las acciones y cambios realizados por los usuarios en el sistema de reclutamiento.',
    href: '/admin/recruitment/audits/activity-log',
    icon: Clock,
    color: 'text-purple-600',
    badge: { status: 'active', text: '1,247 Eventos' },
    stats: [
      { label: 'Hoy', value: '23' },
      { label: 'Esta Semana', value: '156' },
    ],
    priority: 'medium',
  },
  {
    title: 'Auditoría de Acceso a Datos',
    description: 'Revisa quién ha accedido a la información confidencial de los candidatos para garantizar la seguridad y privacidad.',
    href: '/admin/recruitment/audits/data-access',
    icon: Search,
    color: 'text-orange-600',
    badge: { status: 'success', text: '89 Accesos' },
    stats: [
      { label: 'Autorizados', value: '89' },
      { label: 'Bloqueados', value: '0' },
    ],
    priority: 'high',
  },
  {
    title: 'Reportes de Cumplimiento',
    description: 'Genera reportes para asegurar que los procesos de reclutamiento cumplen con las normativas internas y legales.',
    href: '/admin/recruitment/audits/compliance-reports',
    icon: FileText,
    color: 'text-green-600',
    badge: { status: 'success', text: '100% Compliant' },
    stats: [
      { label: 'Reportes', value: '12' },
      { label: 'Políticas', value: '8' },
    ],
    priority: 'low',
  },
];

const tabSections = [
    { label: 'Actividad', icon: Clock, id: 0 },
    { label: 'Acceso a Datos', icon: Search, id: 1 },
    { label: 'Cumplimiento', icon: FileText, id: 2 },
];


export default function AdminAuditsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const currentSectionData = auditSections[activeTab];

  return (
    <AdminPageLayout
      title="Auditoría y Seguridad"
      subtitle="Panel de Administración"
      description="Este panel te ayuda a garantizar la transparencia y seguridad del proceso de reclutamiento. Revisa la actividad del sistema y audita el acceso a los datos para mantener el cumplimiento normativo."
      icon={Shield}
      iconGradient="bg-gradient-to-br from-slate-600 to-gray-700"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/admin/recruitment' },
        { label: 'Auditoría y Seguridad' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="md">
            <Search className="w-5 h-5 mr-2" />
            Búsqueda Avanzada
          </Button>
          <Button variant="default" size="md" className="bg-slate-600 hover:bg-slate-700">
            <FileText className="w-5 h-5 mr-2" />
            Generar Reporte
          </Button>
        </div>
      }
    >
      <AdminDashboardStats stats={auditStats} />

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
                    ? 'bg-slate-50 text-slate-700 border border-slate-300'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content (Card View) */}
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
                isActive={true} // Siempre activo en la vista de tab
            />
            {/* Aquí se podría renderizar el contenido detallado del registro/reporte */}
            <div className='mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-500'>
                <p>Visualización detallada del registro de **{currentSectionData.title}**</p>
                <p className='text-sm mt-1'> (Simulación de tabla de logs o reporte de acceso)</p>
            </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
