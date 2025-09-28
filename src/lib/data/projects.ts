// 📁 src/lib/data/projects.ts
// Datos mock para proyectos y gestión de equipos

import { Project, Team, TeamMember, Task, KanbanColumn } from '@/lib/types/projects';

// Proyectos mock (mantener el archivo existente pero organizado)
export { mockProjects, mockTeams, mockTeamMembers } from './mockProjects';

// Tareas mock
export const mockTasks: Task[] = [
  {
    id: 'task_001',
    title: 'Diseñar mockups de la aplicación',
    description: 'Crear wireframes y mockups para la interfaz de usuario de la aplicación móvil',
    project_id: 'p1',
    assigned_to: '17', // Daniel Castro
    created_by: '8', // Miguel (Lead)
    status: 'in_progress',
    priority: 'high',
    estimated_hours: 16,
    actual_hours: 12,
    due_date: '2024-09-15',
    created_at: '2024-08-01T10:00:00Z',
    tags: 'design,ui,ux'
  },
  {
    id: 'task_002',
    title: 'Implementar autenticación',
    description: 'Desarrollar sistema de login y registro de usuarios',
    project_id: 'p1',
    assigned_to: '17', // Daniel Castro
    created_by: '8', // Miguel (Lead)
    status: 'todo',
    priority: 'urgent',
    estimated_hours: 24,
    due_date: '2024-09-20',
    created_at: '2024-08-02T14:30:00Z',
    tags: 'backend,security'
  },
  {
    id: 'task_003',
    title: 'Configurar base de datos',
    description: 'Crear esquema de base de datos y configurar conexiones',
    project_id: 'p1',
    assigned_to: '23', // Rodrigo Campos
    created_by: '8', // Miguel (Lead)
    status: 'done',
    priority: 'medium',
    estimated_hours: 8,
    actual_hours: 6,
    due_date: '2024-08-30',
    created_at: '2024-08-01T09:00:00Z',
    tags: 'database,backend'
  },
  {
    id: 'task_004',
    title: 'Crear documentación técnica',
    description: 'Documentar la arquitectura y APIs del proyecto',
    project_id: 'p1',
    assigned_to: '12', // Ana Martínez
    created_by: '8', // Miguel (Lead)
    status: 'review',
    priority: 'low',
    estimated_hours: 12,
    actual_hours: 10,
    due_date: '2024-09-10',
    created_at: '2024-08-03T11:15:00Z',
    tags: 'documentation'
  },
  {
    id: 'task_005',
    title: 'Implementar tests unitarios',
    description: 'Crear suite de pruebas para los componentes principales',
    project_id: 'p1',
    assigned_to: '17', // Daniel Castro
    created_by: '8', // Miguel (Lead)
    status: 'testing',
    priority: 'medium',
    estimated_hours: 20,
    actual_hours: 18,
    due_date: '2024-09-25',
    created_at: '2024-08-05T16:00:00Z',
    tags: 'testing,quality'
  }
];

// Columnas Kanban mock
export const mockKanbanColumns: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: '#6B7280',
    order: 1,
    isDefault: true
  },
  {
    id: 'todo',
    title: 'Por Hacer',
    color: '#3B82F6',
    order: 2,
    isDefault: true
  },
  {
    id: 'in_progress',
    title: 'En Progreso',
    color: '#F59E0B',
    order: 3,
    isDefault: true
  },
  {
    id: 'review',
    title: 'En Revisión',
    color: '#8B5CF6',
    order: 4,
    isDefault: true
  },
  {
    id: 'testing',
    title: 'Testing',
    color: '#EF4444',
    order: 5,
    isDefault: true
  },
  {
    id: 'done',
    title: 'Completado',
    color: '#10B981',
    order: 6,
    isDefault: true
  }
];
