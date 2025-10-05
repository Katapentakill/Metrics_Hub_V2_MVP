// src/app/hr/recruitment/offers-hiring/page.tsx
'use client';

import React from 'react';
import { Mail, Briefcase, UserPlus, FileCheck, Handshake, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';

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
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
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

// Reemplazo simplificado para '@/modules/recruitment/hr/components/AdminPageLayout'
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
              <a href={item.href} className="hover:text-blue-600 transition-colors">
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

// Reemplazo simplificado para las Cards de shadcn/ui
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

// --- Mock Data and Page Definition ---

const offersHiringSections = [
  {
    title: 'Generación de Ofertas de Empleo',
    description: 'Gestiona la creación y el estado de todas las cartas de oferta. Visualiza quién ha aceptado y quién está pendiente de respuesta.',
    href: '/hr/recruitment/offers-hiring/offer-generation',
    icon: Mail,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    stats: { sent: 15, pending: 5 }
  },
  {
    title: 'Gestión de Contratación (Onboarding)',
    description: 'Supervisa el proceso de onboarding para todos los nuevos miembros del equipo, asegurando que se cumplan todos los pasos.',
    href: '/hr/recruitment/offers-hiring/onboarding-management',
    icon: UserPlus,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    stats: { started: 8, completed: 3 }
  },
  {
    title: 'Documentación de Contratación',
    description: 'Accede a todos los documentos de contratación de los nuevos empleados y voluntarios, incluyendo contratos y formularios firmados.',
    href: '/hr/recruitment/offers-hiring/hiring-documents',
    icon: FileCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    stats: { signed: 10, pending: 2 }
  },
];

const quickStats = {
    offersSent: 18,
    offersAccepted: 13,
    onboardingActive: 8,
    pendingContracts: 5,
};

export default function AdminOffersHiringPage() {
  return (
    <AdminPageLayout
      title="Oferta y Contratación"
      subtitle="Panel de Administración"
      description="Supervisa y gestiona la etapa final del proceso de reclutamiento, desde el envío de la oferta formal hasta la finalización del proceso de onboarding."
      icon={Handshake}
      iconGradient="bg-gradient-to-br from-indigo-500 to-teal-500"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/hr/recruitment' },
        { label: 'Oferta y Contratación' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <a href="/hr/recruitment/offers-hiring/offer-generation">
            <Button variant="default" size="md" className="bg-indigo-600 hover:bg-indigo-700">
                <Mail className="w-5 h-5 mr-2" />
                Generar Nueva Oferta
            </Button>
          </a>
          <a href="/hr/recruitment/offers-hiring/onboarding-management">
            <Button variant="outline" size="md">
                <UserPlus className="w-5 h-5 mr-2" />
                Iniciar Onboarding
            </Button>
          </a>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Ofertas Enviadas</p>
              <p className="text-3xl font-bold text-gray-900">{quickStats.offersSent}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Ofertas Aceptadas</p>
              <p className="text-3xl font-bold text-gray-900">{quickStats.offersAccepted}</p>
            </div>
            <Handshake className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white border border-purple-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Onboarding Activo</p>
              <p className="text-3xl font-bold text-gray-900">{quickStats.onboardingActive}</p>
            </div>
            <UserPlus className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Contratos Pendientes</p>
              <p className="text-3xl font-bold text-gray-900">{quickStats.pendingContracts}</p>
            </div>
            <FileCheck className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offersHiringSections.map((section) => {
            const Icon = section.icon;
            return (
                <a key={section.title} href={section.href}>
                    <Card className={`border-2 ${section.borderColor} hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-[1.02]`}>
                    <CardHeader>
                        <div className={`flex items-center gap-4`}>
                        <div className={`p-3 rounded-full bg-white shadow-md border ${section.borderColor}`}>
                            <Icon className={`w-7 h-7 ${section.color}`} />
                        </div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">{section.description}</p>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <span className="text-sm font-medium text-gray-500">
                                Estado: {section.stats.pending ? `${section.stats.pending} Pendiente(s)` : 'Al día'}
                            </span>
                            <div className="text-sm font-semibold flex items-center gap-1 text-indigo-600 hover:text-indigo-800">
                                Ir al Módulo
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </CardContent>
                    </Card>
                </a>
            )})}
      </div>

      {/* Quick Access to Documentation */}
      <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-teal-50 border border-indigo-200 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">📚 Revisión de Documentación</h3>
            <p className="text-gray-600">Accede directamente al repositorio de contratos y documentos de los nuevos ingresos.</p>
          </div>
          <a href="/hr/recruitment/offers-hiring/hiring-documents">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <BookOpen className="w-5 h-5 mr-2" />
              Ver Documentos
            </Button>
          </a>
        </div>
      </div>
    </AdminPageLayout>
  );
}
