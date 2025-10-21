// src/app/hr/recruitment/offers-hiring/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  UserPlus, 
  FileCheck, 
  Handshake, 
  BookOpen, 
  TrendingUp,
  Activity,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';

// --- Shared Components ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg',
    outline: 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-600',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
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

// Stat Card Component - Updated to match candidate management design
const StatCard: React.FC<{
  label: string;
  value: number;
  trend?: string;
  icon: React.ElementType;
  color: string;
}> = ({ label, value, icon: Icon, trend, color }) => {
  const isUp = trend && trend.includes('+');
  const trendColor = isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50';

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendColor}`}>
            <TrendingUp className={`w-3 h-3 ${isUp ? 'text-emerald-700' : 'text-red-700 rotate-180'}`} />
            <span className="text-xs font-medium">{trend}</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

// Section Card Component - Updated to match candidate management design
const SectionCard: React.FC<{
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  stats: { label: string; value: number | string; subValue?: string };
  gradient: string;
  bgHover: string;
  priority?: 'high' | 'medium' | 'low';
}> = ({ title, description, href, icon: Icon, stats, gradient, bgHover, priority }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden bg-white rounded-xl border-2 border-gray-200 block
        hover:shadow-2xl hover:-translate-y-2 
        transition-all duration-300 cursor-pointer
        ${bgHover}
      `}
    >
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient}`} />
      
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`
              p-3 rounded-xl bg-gradient-to-br ${gradient} 
              shadow-sm transition-transform duration-300 flex-shrink-0
              ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
            `}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {title}
                </h3>
                {priority === 'high' && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Alta
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold
                  bg-gradient-to-r ${gradient} text-white shadow-sm
                `}>
                  {stats.value}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {stats.label}
                </span>
              </div>
            </div>
          </div>
          
          <ArrowRight className={`
            w-6 h-6 text-gray-400 transition-all duration-300
            ${isHovered ? 'text-gray-700 translate-x-1' : ''}
          `} />
        </div>

        {stats.subValue && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 ml-16">
            <Activity className="w-3 h-3" />
            <span>{stats.subValue}</span>
          </div>
        )}
      </div>
      
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="pt-4 border-t border-gray-100">
          <span className={`
            text-sm font-medium transition-colors
            ${isHovered ? 'text-emerald-600' : 'text-gray-400'}
          `}>
            Explorar sección →
          </span>
        </div>
      </div>
    </Link>
  );
};

// --- Mock Data ---

const offersHiringSections = [
  {
    title: 'Generación de Ofertas de Empleo',
    description: 'Gestiona la creación y el estado de todas las cartas de oferta. Visualiza quién ha aceptado y quién está pendiente de respuesta.',
    href: '/hr/recruitment/offers-hiring/offer-generation',
    icon: Mail,
    gradient: 'from-emerald-500 to-emerald-600',
    bgHover: 'hover:bg-emerald-50',
    stats: { label: 'Pendientes', value: 5, subValue: '13 aceptadas, 18 enviadas' },
    priority: 'high' as const,
  },
  {
    title: 'Gestión de Contratación (Onboarding)',
    description: 'Supervisa el proceso de onboarding para todos los nuevos miembros del equipo, asegurando que se cumplan todos los pasos.',
    href: '/hr/recruitment/offers-hiring/onboarding-management',
    icon: UserPlus,
    gradient: 'from-teal-500 to-teal-600',
    bgHover: 'hover:bg-teal-50',
    stats: { label: 'En Proceso', value: 8, subValue: '3 completados esta semana' },
    priority: 'medium' as const,
  },
  {
    title: 'Documentación de Contratación',
    description: 'Accede a todos los documentos de contratación de los nuevos empleados y voluntarios, incluyendo contratos y formularios firmados.',
    href: '/hr/recruitment/offers-hiring/hiring-documents',
    icon: FileCheck,
    gradient: 'from-green-500 to-green-600',
    bgHover: 'hover:bg-green-50',
    stats: { label: 'Por Firmar', value: 2, subValue: '15 documentos firmados' },
    priority: 'medium' as const,
  },
];

const quickStats = [
  {
    title: 'Ofertas Enviadas',
    value: 18,
    trend: '+15%',
    icon: Mail,
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  {
    title: 'Ofertas Aceptadas',
    value: 13,
    trend: '+8%',
    icon: Handshake,
    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
  {
    title: 'Onboarding Activo',
    value: 8,
    trend: '+12%',
    icon: UserPlus,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
  },
  {
    title: 'Contratos Pendientes',
    value: 5,
    trend: '-20%',
    icon: FileCheck,
    color: 'bg-gradient-to-br from-lime-500 to-lime-600',
  },
];

// --- Main Page Component ---

export default function AdminOffersHiringPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Handshake className="w-10 h-10 text-emerald-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ofertas y Contratación</h1>
                <p className="text-gray-600 mt-1">Gestión de Ofertas y Onboarding</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/hr/recruitment/offers-hiring/offer-generation">
                <Button variant="default" size="md">
                  <Mail className="w-5 h-5 mr-2" />
                  Nueva Oferta
                </Button>
              </Link>
              <Link href="/hr/recruitment/offers-hiring/onboarding-management">
                <Button variant="outline" size="md">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Iniciar Onboarding
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat) => (
              <StatCard
                key={stat.title}
                label={stat.title}
                value={stat.value}
                trend={stat.trend}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Herramientas de Gestión</h2>
          <p className="text-gray-600">
            Supervisa y gestiona la etapa final del proceso de reclutamiento, desde el envío de la oferta formal hasta la finalización del proceso de onboarding.
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {offersHiringSections.map((section) => (
            <SectionCard
              key={section.title}
              title={section.title}
              description={section.description}
              href={section.href}
              icon={section.icon}
              stats={section.stats}
              gradient={section.gradient}
              bgHover={section.bgHover}
              priority={section.priority}
            />
          ))}
        </div>

        {/* Quick Access Banner */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <h3 className="text-xl font-bold text-slate-900">Revisión de Documentación</h3>
              </div>
              <p className="text-slate-600">
                Accede directamente al repositorio de contratos y documentos de los nuevos ingresos.
              </p>
            </div>
            <Link href="/hr/recruitment/offers-hiring/hiring-documents">
              <Button size="lg" className="whitespace-nowrap">
                <FileCheck className="w-5 h-5 mr-2" />
                Ver Documentos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}