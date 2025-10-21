// src/app/hr/recruitment/offers-hiring/onboarding-management/page.tsx
'use client';

import React, { useState } from 'react';
import { UserCheck, Clock, CheckCircle2, User, Briefcase, FileText, TrendingUp, Calendar, ArrowRight, UserPlus, Users } from 'lucide-react'; // Added UserPlus and Users

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
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
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


// --- Types and Mock Data ---

interface OnboardingCandidate {
  id: string;
  name: string;
  role: string;
  onboardingStep: string;
  progressPercent: number;
  startDate: string;
  status: 'Completado' | 'En Progreso' | 'Pendiente';
}

// Datos simulados para la gestión de onboarding
const mockOnboardingCandidates: OnboardingCandidate[] = [
  {
    id: 'onb-1',
    name: 'Juan Pérez',
    role: 'Desarrollador de Software',
    onboardingStep: 'Documentación Firmada',
    progressPercent: 75,
    startDate: '2025-11-01',
    status: 'En Progreso',
  },
  {
    id: 'onb-2',
    name: 'María Rodríguez',
    role: 'Asistente de Marketing',
    onboardingStep: 'Capacitación Inicial',
    progressPercent: 50,
    startDate: '2025-10-20',
    status: 'En Progreso',
  },
  {
    id: 'onb-3',
    name: 'Carlos Sánchez',
    role: 'Diseñador Gráfico',
    onboardingStep: 'Asignación de Mentor',
    progressPercent: 25,
    startDate: '2025-11-15',
    status: 'Pendiente',
  },
  {
    id: 'onb-4',
    name: 'Laura Jiménez',
    role: 'Coordinador de Voluntarios',
    onboardingStep: 'Fin de Período de Prueba',
    progressPercent: 100,
    startDate: '2025-09-01',
    status: 'Completado',
  },
];

const getStatusBadge = (status: OnboardingCandidate['status']) => {
  switch (status) {
    case 'Completado':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Completado
        </span>
      );
    case 'En Progreso':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
          <Clock className="mr-1 h-3 w-3" /> En Progreso
        </span>
      );
    case 'Pendiente':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700">
          <Clock className="mr-1 h-3 w-3" /> Pendiente
        </span>
      );
  }
};

export default function AdminOnboardingManagementPage() {
  const totalCandidates = mockOnboardingCandidates.length;
  const completed = mockOnboardingCandidates.filter(c => c.status === 'Completado').length;
  const inProgress = mockOnboardingCandidates.filter(c => c.status === 'En Progreso').length;
  const pending = totalCandidates - completed - inProgress;

  return (
    <AdminPageLayout
      title="Gestión de Contratación (Onboarding)"
      subtitle="Supervisión de Nuevos Miembros"
      description="Supervisa el proceso de incorporación de todos los nuevos miembros del equipo, desde la firma de documentos hasta la asignación de roles. Asegura una transición fluida."
      icon={UserCheck}
      iconGradient="bg-gradient-to-br from-purple-500 to-indigo-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/hr/recruitment' },
        { label: 'Oferta y Contratación', href: '/hr/recruitment/offers-hiring' },
        { label: 'Onboarding' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="default" size="md" className="bg-purple-600 hover:bg-purple-700">
            <UserPlus className="w-5 h-5 mr-2" />
            Añadir Nuevo Contratado
          </Button>
          <Button variant="outline" size="md">
            <Calendar className="w-5 h-5 mr-2" />
            Configurar Flujo
          </Button>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total en Onboarding</p>
              <p className="text-3xl font-bold text-gray-900">{totalCandidates}</p>
            </div>
            <Users className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completados</p>
              <p className="text-3xl font-bold text-gray-900">{completed}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">En Progreso</p>
              <p className="text-3xl font-bold text-gray-900">{inProgress}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white border border-yellow-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pendientes de Inicio</p>
              <p className="text-3xl font-bold text-gray-900">{pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOnboardingCandidates.map((candidate) => (
          <Card 
            key={candidate.id} 
            className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg font-medium">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Briefcase className='w-3 h-3' />
                        {candidate.role}
                    </p>
                  </div>
                </div>
                {getStatusBadge(candidate.status)}
              </div>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>Paso Actual: <span className='font-medium text-gray-800'>{candidate.onboardingStep}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Inicio de Rol: <span className='font-medium text-gray-800'>{candidate.startDate}</span></span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-gray-600">
                            <span>Progreso</span>
                            <span>{candidate.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="h-2.5 rounded-full bg-purple-600 transition-all duration-500" 
                                style={{ width: `${candidate.progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
                
                {/* Actions */}
                <div className='flex gap-2 pt-4 border-t border-gray-100 mt-4'>
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className='flex-1'
                        onClick={() => console.log(`Ver perfil de ${candidate.name}`)}
                    >
                        Ver Perfil
                    </Button>
                    {candidate.status !== 'Completado' && (
                        <Button 
                            size="sm" 
                            variant="default" 
                            className='flex-1 bg-purple-600 hover:bg-purple-700'
                            onClick={() => console.log(`Avanzar paso para ${candidate.name}`)}
                        >
                            <ArrowRight className='w-4 h-4 mr-1' />
                            Avanzar Paso
                        </Button>
                    )}
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminPageLayout>
  );
}
