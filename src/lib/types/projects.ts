// 📁 src/lib/types/projects.ts
// Tipos relacionados con proyectos y gestión de equipos

export interface Project {
  id: string;
  name: string;
  description: string;
  lead_id: string;
  status: 'planning' | 'active' | 'completed' | 'paused' | 'cancelled';
  max_team_size: number;
  current_team_size: number;
  deadline?: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project_id: string;
  assigned_to?: string;
  created_by: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'review' | 'testing' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_hours: number;
  actual_hours?: number;
  due_date?: string;
  created_at: string;
  tags?: string;
}

export interface Team {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  lead_id: string;
  max_size: number;
  current_size: number;
  timezone: string;
  working_hours: string;
  primary_language: string;
  status: 'forming' | 'active' | 'completed' | 'disbanded';
  created_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  joined_at: string;
  role: 'lead' | 'member' | 'mentor';
  status: 'active' | 'inactive' | 'left';
}

export interface TeamSkillRequirement {
  id: string;
  team_id: string;
  skill_id: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  is_required: number;
  priority: number;
}

// Tipos combinados
export interface TaskWithProject extends Task {
  project_name?: string;
}

export interface ProjectWithLead extends Project {
  lead_name?: string;
}

export interface TeamWithMembers extends Team {
  members?: (TeamMember & { user_name?: string })[];
}

export interface ProjectWithTeam extends Project {
  team?: Team;
  lead_name?: string;
}

// Tipos para Kanban
export interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  limit?: number;
  order: number;
  isDefault: boolean;
}

export interface NewTaskForm {
  title: string;
  description: string;
  assigned_to?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_hours: number;
  due_date?: string;
  tags?: string;
}
