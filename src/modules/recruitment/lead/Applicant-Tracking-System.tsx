// src/modules/recruitment/lead/ATS.tsx

import Link from 'next/link';
import {
  Users,
  Briefcase,
  BarChart,
  UserCheck,
  Clock,
  Handshake,
  PlusCircle
} from 'lucide-react';
import AdminBreadcrumb from '../admin/components/AdminBreadcrumb';
import AdminSectionCard from '../admin/components/AdminSectionCard';
import AdminDashboardStats from '../admin/components/AdminDashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: 'Vacantes Activas',
    value: 8,
    change: { value: 2, type: 'increase' as const, period: 'mes anterior' },
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Candidatos en Proceso',
    value: 45,
    change: { value: 3, type: 'increase' as const, period: 'semana anterior' },
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Contrataciones del Mes',
    value: 2,
    change: { value: -1, type: 'decrease' as const, period: 'mes anterior' },
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Tiempo Promedio de Contratación',
    value: '25 días',
    change: { value: -5, type: 'decrease' as const, period: 'trimestre anterior' },
    icon: Clock,
    color: 'text-orange-600',
  },
];

const sections = [
  {
    title: 'Mis Vacantes',
    description: 'Solicita nuevas vacantes para tu equipo y monitorea el estado de aprobación y publicación.',
    href: '/lead/recruitment/job-openings',
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'Mis Candidatos',
    description: 'Revisa y evalúa a los candidatos que han aplicado a los puestos de tu equipo. Deja comentarios y programa entrevistas.',
    href: '/lead/recruitment/candidate-management',
    icon: Users,
    color: 'text-purple-600',
  },
];

export default function LeadATSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBreadcrumb
          items={[
            { label: 'Recruitment', href: '/lead/recruitment' },
            { label: 'Applicant Tracking System' },
          ]}
        />

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Sistema de Reclutamiento (Panel de Líder)</h1>
                <p className="text-xl text-gray-600">Recruitment</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/recruitment/lead/job-openings/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Solicitar Nueva Vacante
              </Link>
            </Button>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Bienvenido a tu panel de control de reclutamiento. Gestiona las vacantes de tu equipo y evalúa a los candidatos de manera eficiente.
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