// src/app/lead/recruitment/job-openings/published/page.tsx
import Link from 'next/link';
import { Briefcase, Trash2, Edit, PlusCircle, UserCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Datos simulados para vacantes publicadas y activas
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

const getPublishedStatusColor = (status: string) => {
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

// Simula el equipo del líder actual
const mockLeadTeam = 'Tecnología';

export default function LeadPublishedJobsPage() {
  const myTeamJobs = mockPublishedJobs.filter(job => job.team === mockLeadTeam);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Vacantes Publicadas de mi Equipo</h1>
        <Button asChild>
          <Link href="/lead/recruitment/job-openings/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Solicitar Nueva Vacante
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Monitorea el estado y el progreso de las vacantes que han sido aprobadas y publicadas para tu equipo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTeamJobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{job.title}</CardTitle>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPublishedStatusColor(job.status)}`}
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
                  <Link href={`/lead/recruitment/candidate-management?jobId=${job.id}`}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Ver Candidatos
                  </Link>
                </Button>
                {/* No hay botón de borrar para el líder, ya que es una acción de RR.HH. */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}