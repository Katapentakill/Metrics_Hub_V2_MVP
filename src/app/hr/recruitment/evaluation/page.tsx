// src/app/hr/recruitment/evaluation/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  UserCheck, 
  Sliders, 
  CalendarCheck, 
  MessageSquare, 
  PieChart, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const evaluationSections = [
  {
    title: 'Gestión de Entrevistas',
    description: 'Supervisa todas las entrevistas programadas por el equipo. Accede a los calendarios y edita los detalles si es necesario.',
    href: '/hr/recruitment/evaluation/interview-management',
    icon: CalendarCheck,
    gradient: 'from-emerald-500 to-emerald-600',
    bgHover: 'hover:bg-emerald-50',
    priority: 'high',
    stats: { 
      label: 'Programadas',
      value: 23, 
      subValue: '8 pendientes de confirmar'
    }
  },
  {
    title: 'Filtrado Automático y Puntuación',
    description: 'Configura reglas para clasificar automáticamente a los candidatos y audita los resultados para garantizar la equidad en el proceso.',
    href: '/hr/recruitment/evaluation/filter-score',
    icon: Sliders,
    gradient: 'from-teal-500 to-teal-600',
    bgHover: 'hover:bg-teal-50',
    priority: 'medium',
    stats: { 
      label: 'Reglas Activas',
      value: 12, 
      subValue: '156 candidatos procesados'
    }
  },
  {
    title: 'Reportes de Evaluación',
    description: 'Analiza los resultados de todas las pruebas y evaluaciones. Identifica tendencias y toma decisiones basadas en datos.',
    href: '/hr/recruitment/evaluation/reports',
    icon: PieChart,
    gradient: 'from-green-500 to-green-600',
    bgHover: 'hover:bg-green-50',
    priority: 'medium',
    stats: { 
      label: 'Reportes',
      value: 15, 
      subValue: 'Actualizado hace 2h'
    }
  },
  {
    title: 'Feedback del Equipo',
    description: 'Revisa las calificaciones y los comentarios de todos los entrevistadores para obtener una visión completa del rendimiento de los candidatos.',
    href: '/hr/recruitment/evaluation/feedback',
    icon: MessageSquare,
    gradient: 'from-lime-500 to-lime-600',
    bgHover: 'hover:bg-lime-50',
    priority: 'medium',
    stats: { 
      label: 'Feedback',
      value: 42, 
      subValue: '12 pendientes por revisar'
    }
  },
];

const evaluationStats = [
  {
    title: 'Entrevistas Hoy',
    value: '8',
    trend: '+12%',
    icon: CalendarCheck,
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  {
    title: 'Feedback Pendiente',
    value: 12,
    trend: '-5%',
    icon: MessageSquare,
    color: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
  {
    title: 'Candidatos Filtrados',
    value: 156,
    trend: '+18%',
    icon: Sliders,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
  },
  {
    title: 'Reportes Nuevos',
    value: 5,
    trend: '+25%',
    icon: PieChart,
    color: 'bg-gradient-to-br from-lime-500 to-lime-600',
  },
];

// Component for Section Cards
const SectionCard = ({ section }: { section: typeof evaluationSections[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={section.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden bg-white rounded-xl border-2 border-gray-200 block
        hover:shadow-2xl hover:-translate-y-2 
        transition-all duration-300 cursor-pointer
        ${section.bgHover}
      `}
    >
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${section.gradient}`} />
      
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`
              p-3 rounded-xl bg-gradient-to-br ${section.gradient} 
              shadow-sm transition-transform duration-300 flex-shrink-0
              ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
            `}>
              <section.icon className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                  {section.title}
                </h3>
                {section.priority === 'high' && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Alta
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold
                  bg-gradient-to-r ${section.gradient} text-white shadow-sm
                `}>
                  {section.stats.value}
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {section.stats.label}
                </span>
              </div>
            </div>
          </div>
          
          <ArrowRight className={`
            w-6 h-6 text-gray-400 transition-all duration-300
            ${isHovered ? 'text-gray-700 translate-x-1' : ''}
          `} />
        </div>

        {section.stats.subValue && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 ml-16">
            <Activity className="w-3 h-3" />
            <span>{section.stats.subValue}</span>
          </div>
        )}
      </div>
      
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {section.description}
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

export default function AdminEvaluationAndSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <UserCheck className="w-10 h-10 text-emerald-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Evaluación y Selección</h1>
                <p className="text-gray-600 mt-1">Panel de Administración</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-2 border-slate-200 text-gray-800 hover:bg-gray-50">
                <Clock className="w-4 h-4 mr-2" />
                Ver Calendario
              </Button>
              <Button size="sm" className="bg-green-800 hover:bg-green-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                Gestionar Entrevistas
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {evaluationStats.map((stat) => {
              const isUp = stat.trend && stat.trend.includes('+');
              const trendColor = isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50';
              
              return (
                <div key={stat.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    {stat.trend && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendColor}`}>
                        <TrendingUp className={`w-3 h-3 ${isUp ? 'text-emerald-700' : 'text-red-700 rotate-180'}`} />
                        <span className="text-xs font-medium">{stat.trend}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Herramientas de Evaluación</h2>
          <p className="text-gray-600">
            Desde este panel de control, puedes supervisar y gestionar el proceso de evaluación en toda la organización. Gestiona entrevistas, configura filtros automáticos y analiza resultados para asegurar procesos justos y eficientes.
          </p>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {evaluationSections.map((section) => (
            <SectionCard key={section.title} section={section} />
          ))}
        </div>

        {/* Quick Access to Interview Management */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Acceso Rápido: Gestión de Entrevistas
              </h3>
              <p className="text-gray-600">La herramienta más utilizada para supervisar y coordinar todas las entrevistas del equipo.</p>
            </div>
            <Link href="/hr/recruitment/evaluation/interview-management">
              <Button size="lg" className="bg-green-800 hover:bg-green-700 text-white shadow-md">
                <CalendarCheck className="w-5 h-5 mr-2" />
                Ir a Entrevistas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}