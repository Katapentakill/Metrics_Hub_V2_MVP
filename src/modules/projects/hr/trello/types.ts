// UBICACIÓN: src/modules/projects/hr/trello/types.ts
// Tipos específicos para el sistema Kanban

import type { Task } from '@/lib/types';

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
  priority: Task['priority'];
  assigned_to?: string;
  due_date?: string;
  estimated_hours: number;
  tags?: string;
}

export interface NewColumnForm {
  title: string;
  color: string;
  limit?: number;
}

export interface ColorOption {
  value: string;
  label: string;
  preview: string;
}

export const colorOptions: ColorOption[] = [
  { value: 'bg-gray-100 border-gray-300', label: 'Gris', preview: 'bg-gray-300' },
  { value: 'bg-blue-100 border-blue-300', label: 'Azul', preview: 'bg-blue-300' },
  { value: 'bg-yellow-100 border-yellow-300', label: 'Amarillo', preview: 'bg-yellow-300' },
  { value: 'bg-purple-100 border-purple-300', label: 'Morado', preview: 'bg-purple-300' },
  { value: 'bg-orange-100 border-orange-300', label: 'Naranja', preview: 'bg-orange-300' },
  { value: 'bg-green-100 border-green-300', label: 'Verde', preview: 'bg-green-300' },
  { value: 'bg-red-100 border-red-300', label: 'Rojo', preview: 'bg-red-300' },
  { value: 'bg-pink-100 border-pink-300', label: 'Rosa', preview: 'bg-pink-300' },
  { value: 'bg-indigo-100 border-indigo-300', label: 'Índigo', preview: 'bg-indigo-300' },
];