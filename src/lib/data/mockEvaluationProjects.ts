// 📁 src/lib/data/mockEvaluationProjects.ts
// Datos mock centralizados para proyectos en módulo de evaluaciones

export interface EvaluationProject {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'planning' | 'cancelled';
  team_members: string[];
  lead_id: string;
  start_date: string;
  end_date: string;
  progress: number;
  location: string;
}

export const mockEvaluationProjects: EvaluationProject[] = [
  {
    id: 'proj-bc',
    name: 'Biblioteca Comunitaria CDMX',
    description: 'Espacio de lectura y talleres para niños.',
    status: 'completed',
    team_members: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    lead_id: 'user-1',
    start_date: '2024-01-15',
    end_date: '2024-06-30',
    progress: 100,
    location: 'Ciudad de México, México'
  },
  {
    id: 'proj-cc',
    name: 'Centro Comunitario Santiago',
    description: 'Remodelación y habilitación de espacios para talleres.',
    status: 'active',
    team_members: ['user-2', 'user-6', 'user-7'],
    lead_id: 'user-2',
    start_date: '2024-03-01',
    end_date: '2024-12-31',
    progress: 58,
    location: 'Santiago, Chile'
  },
  {
    id: 'proj-cm',
    name: 'Clínica Móvil Arequipa',
    description: 'Jornadas médicas itinerantes.',
    status: 'completed',
    team_members: ['user-8', 'user-9'],
    lead_id: 'user-8',
    start_date: '2024-02-01',
    end_date: '2024-08-31',
    progress: 100,
    location: 'Arequipa, Perú'
  },
  {
    id: 'proj-hu',
    name: 'Huertos Urbanos Medellín',
    description: 'Implementación de huertos en barrios vulnerables.',
    status: 'active',
    team_members: ['user-10', 'user-11', 'user-12'],
    lead_id: 'user-10',
    start_date: '2024-04-01',
    end_date: '2025-03-31',
    progress: 60,
    location: 'Medellín, Colombia'
  },
  {
    id: 'proj-alf',
    name: 'Programa de Alfabetización Lima',
    description: 'Capacitaciones y materiales educativos para adultos.',
    status: 'planning',
    team_members: ['user-13', 'user-14'],
    lead_id: 'user-13',
    start_date: '2024-10-01',
    end_date: '2025-06-30',
    progress: 25,
    location: 'Lima, Perú'
  },
  {
    id: 'proj-tech',
    name: 'Centro de Capacitación Tecnológica',
    description: 'Formación en habilidades digitales para jóvenes.',
    status: 'active',
    team_members: ['user-15', 'user-16', 'user-17', 'user-18'],
    lead_id: 'user-15',
    start_date: '2024-05-15',
    end_date: '2025-05-15',
    progress: 45,
    location: 'Buenos Aires, Argentina'
  }
];

// Función para obtener proyectos por estado
export function getProjectsByStatus(projects: EvaluationProject[], status: string): EvaluationProject[] {
  if (status === 'all') return projects;
  return projects.filter(project => project.status === status);
}

// Función para buscar proyectos
export function searchProjects(projects: EvaluationProject[], searchTerm: string): EvaluationProject[] {
  if (!searchTerm) return projects;
  
  const searchLower = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.name.toLowerCase().includes(searchLower) ||
    project.description.toLowerCase().includes(searchLower) ||
    project.location.toLowerCase().includes(searchLower)
  );
}

// Función para obtener proyectos por líder
export function getProjectsByLead(projects: EvaluationProject[], leadId: string): EvaluationProject[] {
  if (!leadId) return projects;
  return projects.filter(project => project.lead_id === leadId);
}

// Función para calcular estadísticas de proyectos
export function calculateProjectStats(projects: EvaluationProject[]) {
  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    active: projects.filter(p => p.status === 'active').length,
    planning: projects.filter(p => p.status === 'planning').length,
    cancelled: projects.filter(p => p.status === 'cancelled').length,
    averageProgress: projects.reduce((acc, p) => acc + p.progress, 0) / projects.length,
    totalTeamMembers: projects.reduce((acc, p) => acc + p.team_members.length, 0)
  };

  return stats;
}
