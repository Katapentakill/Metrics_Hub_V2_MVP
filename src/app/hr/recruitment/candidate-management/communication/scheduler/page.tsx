// src/app/hr/recruitment/candidate-management/communication/scheduler/page.tsx

'use client';

import Link from 'next/link';
import { Calendar, PlusCircle, CheckCircle2, Clock, Video, Phone,User,FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados de entrevistas programadas
const mockInterviews = [
  {
    id: 'int-1',
    candidate: 'Juan Pérez',
    role: 'Desarrollador de Software',
    interviewer: 'Ana Gómez (Líder de Tecnología)',
    date: '2025-09-20',
    time: '10:00 AM',
    type: 'Técnica',
    status: 'Confirmada',
  },
  {
    id: 'int-2',
    candidate: 'María Rodríguez',
    role: 'Asistente de Marketing',
    interviewer: 'David López (HR Generalista)',
    date: '2025-09-19',
    time: '02:30 PM',
    type: 'RR.HH.',
    status: 'Pendiente',
  },
  {
    id: 'int-3',
    candidate: 'Carlos Sánchez',
    role: 'Diseñador Gráfico',
    interviewer: 'Laura Morales (Líder de Diseño)',
    date: '2025-09-22',
    time: '11:00 AM',
    type: 'Portafolio',
    status: 'Confirmada',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Confirmada':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Confirmada
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

const getInterviewIcon = (type: string) => {
  switch (type) {
    case 'Técnica':
      return <Video className="w-5 h-5 text-purple-600" />;
    case 'RR.HH.':
      return <Phone className="w-5 h-5 text-blue-600" />;
    case 'Portafolio':
      return <FileText className="w-5 h-5 text-orange-600" />;
    default:
      return <Calendar className="w-5 h-5 text-gray-600" />;
  }
};

export default function InterviewSchedulerPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Programador de Entrevistas</h1>
        <Button asChild>
          <Link href="/hr/recruitment/candidate-management/communication/scheduler/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Programar Nueva Entrevista
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Gestiona todas las entrevistas programadas con los candidatos. Coordina fácilmente los horarios y mantén un seguimiento del estado de cada reunión.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockInterviews.map((interview) => (
          <Link key={interview.id} href={`/hr/recruitment/candidate-management/communication/scheduler/${interview.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getInterviewIcon(interview.type)}
                    <div>
                      <CardTitle className="text-lg font-medium">{interview.candidate}</CardTitle>
                      <p className="text-sm text-gray-500">{interview.role}</p>
                    </div>
                  </div>
                  {getStatusBadge(interview.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{interview.date} @ {interview.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{interview.interviewer}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Tipo:</span>
                  <span>{interview.type}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
