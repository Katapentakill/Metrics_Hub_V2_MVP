// src/app/admin/recruitment/job-openings/published/page.tsx
// src/app/admin/recruitment/job-openings/published/page.tsx
import Link from 'next/link';
import { Briefcase, PlusCircle, Trash2, Edit, PauseCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// This is mock data. In a real application, you would fetch this from an API.
const mockPublishedJobs = [
  {
    id: 'pub-1',
    title: 'Desarrollador de Software',
    team: 'Tecnología',
    type: 'Empleado',
    status: 'Abierto',
    applicants: 45,
    datePosted: '2025-09-10',
  },
  {
    id: 'pub-2',
    title: 'Asistente de Marketing',
    team: 'Marketing',
    type: 'Voluntario',
    status: 'Abierto',
    applicants: 21,
    datePosted: '2025-09-05',
  },
  {
    id: 'pub-3',
    title: 'Diseñador Gráfico',
    team: 'Diseño',
    type: 'Empleado',
    status: 'Cerrado',
    applicants: 68,
    datePosted: '2025-08-20',
  },
  {
    id: 'pub-4',
    title: 'Coordinador de Eventos',
    team: 'Operaciones',
    type: 'Voluntario',
    status: 'Pausado',
    applicants: 12,
    datePosted: '2025-09-12',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Abierto':
      return 'bg-green-100 text-green-700';
    case 'Cerrado':
      return 'bg-red-100 text-red-700';
    case 'Pausado':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function AdminPublishedJobsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vacantes Publicadas y Activas (Admin)</h1>
        <Button asChild>
          <Link href="/admin/recruitment/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Supervisa todas las vacantes que están actualmente abiertas para recibir candidatos. Como administrador, puedes ver el estado, editar detalles o gestionar los candidatos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPublishedJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{job.title}</CardTitle>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(job.status)}`}
              >
                {job.status}
              </span>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-gray-500 mb-2">
                <p><strong>Equipo:</strong> {job.team}</p>
                <p><strong>Tipo:</strong> {job.type}</p>
                <p><strong>Publicado:</strong> {job.datePosted}</p>
                <p><strong>Candidatos:</strong> {job.applicants}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/recruitment/job-openings/${job.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Ver y Editar
                  </Link>
                </Button>
                {job.status === 'Abierto' && (
                  <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Pausar
                  </Button>
                )}
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