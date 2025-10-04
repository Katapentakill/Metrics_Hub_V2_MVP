// src/modules/recruitment/volunteer/My-Application.tsx
'use client';

import Link from 'next/link';
import {
  Users,
  Briefcase,
  BarChart,
  UserCheck,
  Clock,
  Handshake,
  ChevronRight
} from 'lucide-react';
import AdminBreadcrumb from '../admin/components/AdminBreadcrumb';
import AdminSectionCard from '../admin/components/AdminSectionCard';
import AdminDashboardStats from '../admin/components/AdminDashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Mock data for dashboard stats
const dashboardStats = [
  {
    title: 'Solicitudes Enviadas',
    value: 1,
    change: { value: 0, type: 'neutral' as const, period: 'mes anterior' },
    icon: Briefcase,
    color: 'text-blue-600',
  },
  {
    title: 'En Proceso',
    value: 1,
    change: { value: 0, type: 'neutral' as const, period: 'semana anterior' },
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Entrevistas Programadas',
    value: 0,
    change: { value: 0, type: 'neutral' as const, period: 'mes anterior' },
    icon: UserCheck,
    color: 'text-green-600',
  },
  {
    title: 'Tiempo Promedio de Respuesta',
    value: '3 días',
    change: { value: 1, type: 'increase' as const, period: 'trimestre anterior' },
    icon: Clock,
    color: 'text-orange-600',
  },
];

const MyApplicationPage = () => {
  const applicationData = {
    status: "En Revisión",
    progress: 65,
    role: "Asistente de Marketing Digital",
    team: "Marketing"
  };

  const sections = [
    {
      title: 'Estado de mi Solicitud',
      description: 'Revisa el progreso de tu postulación, accede a la información de tus entrevistas y gestiona tus documentos.',
      href: '/volunteer/recruitment/application-status',
      icon: UserCheck,
      color: 'text-blue-600'
    },
    {
      title: 'Vacantes Abiertas',
      description: 'Explora otras oportunidades de voluntariado y roles de empleo disponibles en la organización.',
      href: '/volunteer/recruitment/job-openings',
      icon: Briefcase,
      color: 'text-green-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBreadcrumb
          items={[
            { label: 'Recruitment', href: '/volunteer/recruitment' },
            { label: 'My Application' },
          ]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Mi Solicitud</h1>
              <p className="text-xl text-gray-600">Volunteer Recruitment</p>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
            Bienvenido a tu panel personal de reclutamiento y oportunidades.
          </p>
        </div>

        <AdminDashboardStats stats={dashboardStats} />

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Mi Aplicación Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{applicationData.role}</h3>
                  <p className="text-gray-600">Equipo: {applicationData.team}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    {applicationData.status}
                  </span>
                </div>

                <Link href="/volunteer/recruitment/application-status">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Ver Detalles
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Disponibles</h2>
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
};

export default MyApplicationPage;