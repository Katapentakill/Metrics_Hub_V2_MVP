// src/app/admin/recruitment/offers-hiring/onboarding-management/page.tsx
'use client';

import Link from 'next/link';
import { UserCheck, Clock, CheckCircle2, User, Briefcase, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados para la gestión de onboarding
const mockOnboardingCandidates = [
  {
    id: 'onb-1',
    name: 'Juan Pérez',
    role: 'Desarrollador de Software',
    onboardingStep: 'Documentación Firmada',
    status: 'Completado',
  },
  {
    id: 'onb-2',
    name: 'María Rodríguez',
    role: 'Asistente de Marketing',
    onboardingStep: 'Capacitación Inicial',
    status: 'En Progreso',
  },
  {
    id: 'onb-3',
    name: 'Carlos Sánchez',
    role: 'Diseñador Gráfico',
    onboardingStep: 'Asignación de Mentor',
    status: 'Pendiente',
  },
];

const getStatusBadge = (status: string) => {
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
    default:
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
          {status}
        </span>
      );
  }
};

export default function AdminOnboardingManagementPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gestión de Contratación (Onboarding)</h1>
      <p className="text-gray-600 mb-10">
        Supervisa el proceso de incorporación de todos los nuevos miembros del equipo. Asegura que cada paso, desde la firma de documentos hasta la asignación de roles, se complete a tiempo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOnboardingCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg font-medium">{candidate.name}</CardTitle>
                    <p className="text-sm text-gray-500">{candidate.role}</p>
                  </div>
                </div>
                {getStatusBadge(candidate.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4 text-gray-500" />
                <span>Paso Actual: {candidate.onboardingStep}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
