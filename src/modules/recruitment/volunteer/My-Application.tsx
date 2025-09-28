// src/modules/recruitment/volunteer/My-Application.tsx
'use client';

import Link from 'next/link';
import { 
  Briefcase, 
  UserCheck, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
    <div className="space-y-6">
      {/* Header simplificado */}
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Portal del Voluntario</h1>
        <p className="text-blue-100 mb-4">
          Bienvenido a tu panel personal de reclutamiento y oportunidades.
        </p>
        
        {/* Progreso simple */}
        <div className="bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${applicationData.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-2 text-blue-200">
          <span>Progreso de solicitud</span>
          <span>{applicationData.progress}%</span>
        </div>
      </div>

      {/* Estado actual */}
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

      {/* Acciones principales */}
      <div>
        <h2 className="text-xl font-bold mb-4">Acciones Disponibles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className={`flex items-center gap-3 ${section.color}`}>
                    <section.icon className="w-6 h-6" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Acceder
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold">Estado Activo</h3>
          <p className="text-sm text-gray-600">Solicitud en proceso</p>
        </Card>
        
        <Card className="text-center p-4">
          <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold">Próxima Entrevista</h3>
          <p className="text-sm text-gray-600">25 Sep 2025</p>
        </Card>
        
        <Card className="text-center p-4">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-sm font-bold">{applicationData.progress}%</span>
          </div>
          <h3 className="font-semibold">Progreso</h3>
          <p className="text-sm text-gray-600">Completado</p>
        </Card>
      </div>
    </div>
  );
};

export default MyApplicationPage;