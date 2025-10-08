// src/modules/recruitment/hr/Applicant-Tracking-System.tsx
import Link from 'next/link';
import {
  Users,
  Briefcase,
  BarChart,
  UserCheck,
  Clock,
  Handshake,
  UserPlus,
} from 'lucide-react';
import AdminBreadcrumb from '../hr/components/AdminBreadcrumb';
import AdminSectionCard from '../hr/components/AdminSectionCard';
import AdminDashboardStats from '../hr/components/AdminDashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: 'Vacantes Activas',
    value: 12,
    change: { value: 3, type: 'increase' as const, period: 'mes anterior' },
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Candidatos en Proceso',
    value: 78,
    change: { value: 5, type: 'increase' as const, period: 'semana anterior' },
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Contrataciones del Mes',
    value: 4,
    change: { value: -2, type: 'decrease' as const, period: 'mes anterior' },
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Tiempo Promedio de Contratación',
    value: '22 días',
    change: { value: -8, type: 'decrease' as const, period: 'trimestre anterior' },
    icon: Clock,
    color: 'text-orange-600',
  },
];

const sections = [
  {
    title: 'Gestión de Vacantes',
    description: 'Crea, edita y publica nuevas ofertas de empleo y roles de voluntariado.',
    href: '/hr/recruitment/job-openings',
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Gestión de Candidatos',
    description: 'Revisa y gestiona a los candidatos, filtra perfiles y organiza los CV recibidos.',
    href: '/hr/recruitment/candidate-management',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Evaluación y Selección',
    description: 'Programa entrevistas, realiza un seguimiento de las evaluaciones y toma notas del proceso de selección.',
    href: '/hr/recruitment/evaluation',
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Ofertas y Contratación',
    description: 'Genera y envía cartas de oferta. Administra el proceso de aceptación y finalización de contratos.',
    href: '/hr/recruitment/offers-hiring',
    icon: Handshake,
    color: 'text-orange-600',
  },
  {
    title: 'Reportes y Analíticas',
    description: 'Visualiza métricas clave del reclutamiento como el tiempo de contratación y la fuente de candidatos.',
    href: '/hr/recruitment/analytics',
    icon: BarChart,
    color: 'text-red-600',
  },
];

export default function ApplicantTrackingSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBreadcrumb
          items={[
            { label: 'Recruitment', href: '/hr/recruitment' },
            { label: 'Applicant Tracking System' },
          ]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl font-bold text-slate-800 flex items-center">
              <UserPlus className="w-8 h-8 mr-3 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center">Sistema de Seguimiento de Candidatos (ATS)</h1>
              <p className="text-muted mt-1">Recruitment</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Bienvenido al panel de reclutamiento. Usa estas secciones para gestionar todo el ciclo de vida de la contratación, desde la publicación de vacantes hasta la formalización de la oferta.
          </p>
        </div>

        <AdminDashboardStats stats={dashboardStats} />

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {sections.map((section) => (
              <AdminSectionCard
                key={section.title}
                title={section.title}
                description={section.description}
                href={section.href}
                icon={section.icon}
                color={section.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}