// 📁 src/lib/utils/dataUtils.ts
// Funciones utilitarias para filtrado y procesamiento de datos

import { ExtendedUserWithProfile } from '@/lib/types';
import { Project } from '@/lib/types';
import { Task } from '@/lib/types';
import { Evaluation } from '@/lib/types/evaluations';

// ===== FUNCIONES DE FILTRADO DE USUARIOS =====

export interface UserFilters {
  searchTerm?: string;
  role?: string;
  status?: string;
  country?: string;
  skillCategory?: string;
  availability?: string;
}

export function filterUsers(users: ExtendedUserWithProfile[], filters: UserFilters): ExtendedUserWithProfile[] {
  return users.filter(user => {
    // Filtro por término de búsqueda
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.profile?.first_name?.toLowerCase().includes(searchLower) ||
        user.profile?.last_name?.toLowerCase().includes(searchLower) ||
        user.profile?.city?.toLowerCase().includes(searchLower) ||
        user.profile?.country?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtro por rol
    if (filters.role && filters.role !== 'all') {
      if (user.role !== filters.role) return false;
    }

    // Filtro por estado
    if (filters.status && filters.status !== 'all') {
      if (user.status !== filters.status) return false;
    }

    // Filtro por país
    if (filters.country && filters.country !== 'all') {
      if (user.profile?.country !== filters.country) return false;
    }

    // Filtro por categoría de habilidad
    if (filters.skillCategory && filters.skillCategory !== 'all') {
      const hasSkillCategory = user.profile?.skills?.some(skill => 
        skill.category === filters.skillCategory
      );
      if (!hasSkillCategory) return false;
    }

    // Filtro por disponibilidad
    if (filters.availability && filters.availability !== 'all') {
      if (user.profile?.preferred_hours !== filters.availability) return false;
    }

    return true;
  });
}

// ===== FUNCIONES DE FILTRADO DE PROYECTOS =====

export interface ProjectFilters {
  searchTerm?: string;
  status?: string;
  leadId?: string;
  teamMemberId?: string;
}

export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter(project => {
    // Filtro por término de búsqueda
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        project.name.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtro por estado
    if (filters.status && filters.status !== 'all') {
      if (project.status !== filters.status) return false;
    }

    // Filtro por líder
    if (filters.leadId) {
      if (project.lead_id !== filters.leadId) return false;
    }

    return true;
  });
}

// ===== FUNCIONES DE FILTRADO DE TAREAS =====

export interface TaskFilters {
  searchTerm?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  projectId?: string;
  tags?: string[];
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter(task => {
    // Filtro por término de búsqueda
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.tags?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtro por estado
    if (filters.status && filters.status !== 'all') {
      if (task.status !== filters.status) return false;
    }

    // Filtro por prioridad
    if (filters.priority && filters.priority !== 'all') {
      if (task.priority !== filters.priority) return false;
    }

    // Filtro por asignado
    if (filters.assignedTo) {
      if (task.assigned_to !== filters.assignedTo) return false;
    }

    // Filtro por proyecto
    if (filters.projectId) {
      if (task.project_id !== filters.projectId) return false;
    }

    // Filtro por tags
    if (filters.tags && filters.tags.length > 0) {
      const taskTags = task.tags?.split(',').map(tag => tag.trim()) || [];
      const hasMatchingTag = filters.tags.some(tag => taskTags.includes(tag));
      if (!hasMatchingTag) return false;
    }

    return true;
  });
}

// ===== FUNCIONES DE FILTRADO DE EVALUACIONES =====

export interface EvaluationFilters {
  searchTerm?: string;
  status?: string;
  type?: string;
  periodId?: string;
  evaluatedUserId?: string;
  evaluatorId?: string;
}

export function filterEvaluations(evaluations: Evaluation[], filters: EvaluationFilters): Evaluation[] {
  return evaluations.filter(evaluation => {
    // Filtro por término de búsqueda (buscar por IDs de usuario)
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        evaluation.evaluated_user_id.toLowerCase().includes(searchLower) ||
        evaluation.evaluator_id.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Filtro por estado
    if (filters.status && filters.status !== 'all') {
      if (evaluation.status !== filters.status) return false;
    }

    // Filtro por tipo
    if (filters.type && filters.type !== 'all') {
      if (evaluation.type !== filters.type) return false;
    }

    // Filtro por período
    if (filters.periodId) {
      if (evaluation.period_id !== filters.periodId) return false;
    }

    // Filtro por usuario evaluado
    if (filters.evaluatedUserId) {
      if (evaluation.evaluated_user_id !== filters.evaluatedUserId) return false;
    }

    // Filtro por evaluador
    if (filters.evaluatorId) {
      if (evaluation.evaluator_id !== filters.evaluatorId) return false;
    }

    return true;
  });
}

// ===== FUNCIONES DE PROCESAMIENTO DE DATOS =====

export function calculateUserStats(users: ExtendedUserWithProfile[]) {
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    deleted: users.filter(u => u.status === 'deleted').length,
    byRole: {
      admin: users.filter(u => u.role === 'admin').length,
      hr: users.filter(u => u.role === 'hr').length,
      lead: users.filter(u => u.role === 'lead').length,
      volunteer: users.filter(u => u.role === 'volunteer').length,
      unassigned: users.filter(u => u.role === 'unassigned').length,
    },
    byCountry: users.reduce((acc, user) => {
      const country = user.profile?.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    bySkillCategory: users.reduce((acc, user) => {
      user.profile?.skills?.forEach(skill => {
        acc[skill.category] = (acc[skill.category] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>)
  };

  return stats;
}

export function calculateProjectStats(projects: Project[]) {
  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    planning: projects.filter(p => p.status === 'planning').length,
    completed: projects.filter(p => p.status === 'completed').length,
    cancelled: projects.filter(p => p.status === 'cancelled').length,
    averageTeamSize: projects.reduce((acc, p) => acc + p.current_team_size, 0) / projects.length,
    totalTeamMembers: projects.reduce((acc, p) => acc + p.current_team_size, 0)
  };

  return stats;
}

export function calculateTaskStats(tasks: Task[]) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
    blocked: tasks.filter(t => t.status === 'blocked').length,
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
    urgent: tasks.filter(t => t.priority === 'urgent').length,
    totalEstimatedHours: tasks.reduce((acc, t) => acc + (t.estimated_hours || 0), 0),
    totalActualHours: tasks.reduce((acc, t) => acc + (t.actual_hours || 0), 0)
  };

  return stats;
}

export function calculateEvaluationStats(evaluations: Evaluation[]) {
  const stats = {
    total: evaluations.length,
    completed: evaluations.filter(e => e.status === 'completed').length,
    pending: evaluations.filter(e => e.status === 'pending').length,
    in_progress: evaluations.filter(e => e.status === 'in_progress').length,
    overdue: evaluations.filter(e => e.status === 'overdue').length,
    performance: evaluations.filter(e => e.type === 'performance').length,
    peer_feedback: evaluations.filter(e => e.type === 'peer_feedback').length,
    self_evaluation: evaluations.filter(e => e.type === 'self_evaluation').length,
    upward_feedback: evaluations.filter(e => e.type === 'upward_feedback').length,
    averageScore: 0,
    completionRate: 0
  };

  const completedEvals = evaluations.filter(e => typeof e.overall_score === 'number');
  if (completedEvals.length > 0) {
    stats.averageScore = completedEvals.reduce((acc, e) => acc + (e.overall_score ?? 0), 0) / completedEvals.length;
  }

  if (stats.total > 0) {
    stats.completionRate = (stats.completed / stats.total) * 100;
  }

  return stats;
}

// ===== FUNCIONES DE BÚSQUEDA Y SORTING =====

export function sortUsers(users: ExtendedUserWithProfile[], sortBy: string, order: 'asc' | 'desc' = 'asc'): ExtendedUserWithProfile[] {
  const sorted = [...users].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'email':
        comparison = a.email.localeCompare(b.email);
        break;
      case 'role':
        comparison = a.role.localeCompare(b.role);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'last_login':
        comparison = new Date(a.last_login || 0).getTime() - new Date(b.last_login || 0).getTime();
        break;
      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

export function sortProjects(projects: Project[], sortBy: string, order: 'asc' | 'desc' = 'asc'): Project[] {
  const sorted = [...projects].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'deadline':
        comparison = new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime();
        break;
      case 'team_size':
        comparison = a.current_team_size - b.current_team_size;
        break;
      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

export function sortTasks(tasks: Task[], sortBy: string, order: 'asc' | 'desc' = 'asc'): Task[] {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        comparison = (priorityOrder[a.priority as keyof typeof priorityOrder] || 0) - 
                    (priorityOrder[b.priority as keyof typeof priorityOrder] || 0);
        break;
      case 'due_date':
        comparison = new Date(a.due_date || 0).getTime() - new Date(b.due_date || 0).getTime();
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'estimated_hours':
        comparison = (a.estimated_hours || 0) - (b.estimated_hours || 0);
        break;
      default:
        comparison = 0;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  return sorted;
}

// ===== FUNCIONES DE AGRUPACIÓN =====

export function groupUsersByRole(users: ExtendedUserWithProfile[]): Record<string, ExtendedUserWithProfile[]> {
  return users.reduce((groups, user) => {
    const role = user.role;
    if (!groups[role]) {
      groups[role] = [];
    }
    groups[role].push(user);
    return groups;
  }, {} as Record<string, ExtendedUserWithProfile[]>);
}

export function groupUsersByCountry(users: ExtendedUserWithProfile[]): Record<string, ExtendedUserWithProfile[]> {
  return users.reduce((groups, user) => {
    const country = user.profile?.country || 'Unknown';
    if (!groups[country]) {
      groups[country] = [];
    }
    groups[country].push(user);
    return groups;
  }, {} as Record<string, ExtendedUserWithProfile[]>);
}

export function groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce((groups, task) => {
    const status = task.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(task);
    return groups;
  }, {} as Record<string, Task[]>);
}

export function groupTasksByPriority(tasks: Task[]): Record<string, Task[]> {
  return tasks.reduce((groups, task) => {
    const priority = task.priority;
    if (!groups[priority]) {
      groups[priority] = [];
    }
    groups[priority].push(task);
    return groups;
  }, {} as Record<string, Task[]>);
}

// ===== FUNCIONES DE VALIDACIÓN =====

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
}

export function validateRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim() !== '';
}

// ===== FUNCIONES DE FORMATEO =====

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'hace un momento';
  if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`;
  if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`;
  if (diffInSeconds < 2592000) return `hace ${Math.floor(diffInSeconds / 86400)} días`;
  if (diffInSeconds < 31536000) return `hace ${Math.floor(diffInSeconds / 2592000)} meses`;
  
  return `hace ${Math.floor(diffInSeconds / 31536000)} años`;
}

// ===== FUNCIONES DE PAGINACIÓN =====

export function paginateData<T>(data: T[], page: number, pageSize: number): {
  data: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    data: data.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    totalItems,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
}

// ===== FUNCIONES DE EXPORTACIÓN =====

export function exportToCSV<T extends Record<string, any>>(data: T[], filename: string): void {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON<T>(data: T[], filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
