// src/app/hr/recruitment/job-openings/requested/page.tsx
import Link from 'next/link';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados para vacantes solicitadas (no publicadas)
const mockRequestedJobs = [
  {
    id: 'req-1',
    title: 'Analista de Datos',
    team: 'Investigación',
    requestedBy: 'Laura Morales (PM)',
    requestDate: '2025-09-15',
    approvalStatus: 'Pendiente de Aprobación de HR',
  },
  {
    id: 'req-2',
    title: 'Redactor de Contenido',
    team: 'Marketing',
    requestedBy: 'Sofía Castro (Líder)',
    requestDate: '2025-09-14',
    approvalStatus: 'Pendiente de Aprobación del PM',
  },
];

const getRequestStatusColor = (status: string) => {
  switch (status) {
    case 'Pendiente de Aprobación de HR':
      return 'bg-blue-100 text-blue-700';
    case 'Pendiente de Aprobación del PM':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function RequestedJobsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vacantes Solicitadas</h1>
        <Button asChild>
          <Link href="/hr/recruitment/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Aquí se administran las solicitudes de vacantes pendientes de aprobación y colaboración interna.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRequestedJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{job.title}</CardTitle>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRequestStatusColor(job.approvalStatus)}`}
              >
                {job.approvalStatus}
              </span>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-gray-500 mb-2">
                <p><strong>Equipo:</strong> {job.team}</p>
                <p><strong>Solicitado por:</strong> {job.requestedBy}</p>
                <p><strong>Fecha de Solicitud:</strong> {job.requestDate}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/hr/recruitment/job-openings/${job.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Ver Detalles
                  </Link>
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}