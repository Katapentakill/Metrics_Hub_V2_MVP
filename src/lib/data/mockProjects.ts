// src/lib/data/mockProjects.ts
import { Project, Team, TeamMember } from '@/lib/types';

// Líderes existentes (ids de lead_project en tu extendedUsers): 7..11
// Voluntarios (varios ids): 12..29

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Centro Comunitario Santiago',
    description: 'Remodelación y habilitación de espacios para talleres.',
    lead_id: '8', // Andrea Castillo (lead_project)
    status: 'active',
    max_team_size: 12,
    current_team_size: 7,
    deadline: '2025-12-31',
    created_at: '2025-05-02 10:20:00',
  },
  {
    id: 'p2',
    name: 'Programa de Alfabetización Lima',
    description: 'Capacitaciones y materiales educativos.',
    lead_id: '7', // Miguel Rodríguez
    status: 'planning',
    max_team_size: 10,
    current_team_size: 3,
    created_at: '2025-04-12 09:05:00',
  },
  {
    id: 'p3',
    name: 'Huertos Urbanos Medellín',
    description: 'Implementación de huertos en barrios vulnerables.',
    lead_id: '10', // Gabriela Torres
    status: 'active',
    max_team_size: 15,
    current_team_size: 9,
    created_at: '2025-03-01 12:00:00',
  },
  {
    id: 'p4',
    name: 'Clínica Móvil Arequipa',
    description: 'Jornadas médicas itinerantes.',
    lead_id: '9', // Fernando Ruiz
    status: 'completed',
    max_team_size: 8,
    current_team_size: 8,
    created_at: '2025-01-22 08:10:00',
  },
  {
    id: 'p5',
    name: 'Biblioteca Comunitaria CDMX',
    description: 'Espacio de lectura y talleres para niños.',
    lead_id: '11', // Ricardo Mendoza
    status: 'paused',
    max_team_size: 10,
    current_team_size: 5,
    created_at: '2025-06-10 10:00:00',
  },
];

export const mockTeams: Team[] = [
  {
    id: 't1',
    project_id: 'p1',
    name: 'Equipo Santiago',
    description: 'Equipo de obra y logística',
    lead_id: '8',
    max_size: 12,
    current_size: 7,
    timezone: 'GMT-3',
    working_hours: 'Mañanas',
    primary_language: 'es',
    status: 'active',
    created_at: '2025-05-02 10:20:00',
  },
  {
    id: 't2',
    project_id: 'p2',
    name: 'Equipo Lima',
    lead_id: '7',
    max_size: 10,
    current_size: 3,
    timezone: 'GMT-5',
    working_hours: 'Tardes',
    primary_language: 'es',
    status: 'forming',
    created_at: '2025-04-12 09:05:00',
  },
  {
    id: 't3',
    project_id: 'p3',
    name: 'Equipo Medellín',
    lead_id: '10',
    max_size: 15,
    current_size: 9,
    timezone: 'GMT-5',
    working_hours: 'Flexible',
    primary_language: 'es',
    status: 'active',
    created_at: '2025-03-01 12:00:00',
  },
  {
    id: 't4',
    project_id: 'p4',
    name: 'Equipo Arequipa',
    lead_id: '9',
    max_size: 8,
    current_size: 8,
    timezone: 'GMT-5',
    working_hours: 'Mañanas',
    primary_language: 'es',
    status: 'completed',
    created_at: '2025-01-22 08:10:00',
  },
  {
    id: 't5',
    project_id: 'p5',
    name: 'Equipo CDMX',
    lead_id: '11',
    max_size: 10,
    current_size: 5,
    timezone: 'CST',
    working_hours: 'Noches',
    primary_language: 'es',
    status: 'active',
    created_at: '2025-06-10 10:00:00',
  },
];

export const mockTeamMembers: TeamMember[] = [
  // p1 / t1
  { id: 'm1', team_id: 't1', user_id: '17', joined_at: '2025-05-03', role: 'member', status: 'active' }, // Daniel Castro
  { id: 'm2', team_id: 't1', user_id: '12', joined_at: '2025-05-03', role: 'member', status: 'active' }, // Ana Martínez
  { id: 'm3', team_id: 't1', user_id: '23', joined_at: '2025-05-04', role: 'member', status: 'active' }, // Rodrigo Campos

  // p2 / t2
  { id: 'm4', team_id: 't2', user_id: '13', joined_at: '2025-04-13', role: 'member', status: 'active' }, // Pedro Sánchez
  { id: 'm5', team_id: 't2', user_id: '19', joined_at: '2025-04-13', role: 'member', status: 'active' }, // Alberto Vargas

  // p3 / t3
  { id: 'm6', team_id: 't3', user_id: '21', joined_at: '2025-03-02', role: 'member', status: 'active' }, // Sergio Delgado
  { id: 'm7', team_id: 't3', user_id: '26', joined_at: '2025-03-03', role: 'member', status: 'active' }, // Valeria Ortega
  { id: 'm8', team_id: 't3', user_id: '20', joined_at: '2025-03-05', role: 'member', status: 'active' }, // Elena Morales

  // p4 / t4
  { id: 'm9', team_id: 't4', user_id: '24', joined_at: '2025-01-23', role: 'member', status: 'active' }, // Cristina Vega
  { id: 'm10', team_id: 't4', user_id: '15', joined_at: '2025-01-25', role: 'member', status: 'active' }, // José Ramírez

  // p5 / t5
  { id: 'm11', team_id: 't5', user_id: '16', joined_at: '2025-06-11', role: 'member', status: 'active' }, // Lucía Fernández
  { id: 'm12', team_id: 't5', user_id: '18', joined_at: '2025-06-11', role: 'member', status: 'active' }, // Patricia Jiménez
];
