// UBICACIÓN: src/features/admin/projects/detail/ProjectKanbanBoard.tsx
// Tablero Kanban para gestión de tareas del proyecto

import React, { useState } from 'react';
import { Plus, MoreVertical, Clock, User, Flag, Calendar, MessageSquare } from 'lucide-react';
import type { Task, ExtendedUserWithProfile } from '@/lib/types';

interface ProjectKanbanBoardProps {
  projectId: string;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  projectMembers: ExtendedUserWithProfile[];
}

interface KanbanColumn {
  id: Task['status'];
  title: string;
  color: string;
  limit?: number;
}

export default function ProjectKanbanBoard({
  projectId,
  tasks,
  setTasks,
  projectMembers
}: ProjectKanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState<string | null>(null);

  const columns: KanbanColumn[] = [
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-100 border-gray-300', limit: undefined },
    { id: 'todo', title: 'Por Hacer', color: 'bg-blue-100 border-blue-300', limit: 8 },
    { id: 'in_progress', title: 'En Progreso', color: 'bg-yellow-100 border-yellow-300', limit: 5 },
    { id: 'review', title: 'En Revisión', color: 'bg-purple-100 border-purple-300', limit: 3 },
    { id: 'testing', title: 'Testing', color: 'bg-orange-100 border-orange-300', limit: 4 },
    { id: 'done', title: 'Completado', color: 'bg-green-100 border-green-300' },
    { id: 'blocked', title: 'Bloqueado', color: 'bg-red-100 border-red-300' }
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    const colors = {
      urgent: 'text-red-600',
      high: 'text-orange-600',
      medium: 'text-yellow-600',
      low: 'text-green-600'
    };
    return <Flag className={`w-3 h-3 ${colors[priority]}`} />;
  };

  const getAssignedUser = (userId?: string) => {
    return projectMembers.find(member => member.id === userId);
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate?: string) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStatus: Task['status']) => {
    e.preventDefault();
    
    if (!draggedTask) return;
    
    // Verificar límites de columna
    const targetColumn = columns.find(col => col.id === targetStatus);
    if (targetColumn?.limit) {
      const tasksInTarget = getTasksByStatus(targetStatus);
      if (tasksInTarget.length >= targetColumn.limit && draggedTask.status !== targetStatus) {
        alert(`Esta columna tiene un límite de ${targetColumn.limit} tareas`);
        return;
      }
    }

    // Actualizar estado de la tarea
    const updatedTasks = tasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, status: targetStatus }
        : task
    );
    
    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr.replace(' ', 'T')).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const assignedUser = getAssignedUser(task.assigned_to);
    const daysUntilDue = getDaysUntilDue(task.due_date);
    const overdue = isOverdue(task.due_date);

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, task)}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-shadow mb-3"
      >
        {/* Header de la tarea */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getPriorityIcon(task.priority)}
            <span className="text-xs font-medium text-gray-500 uppercase">
              {task.priority}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Título y descripción */}
        <h4 className="font-medium text-gray-800 mb-2 line-clamp-2">
          {task.title}
        </h4>
        
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.split(',').slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tag.trim()}
              </span>
            ))}
            {task.tags.split(',').length > 3 && (
              <span className="text-xs text-gray-500">
                +{task.tags.split(',').length - 3} más
              </span>
            )}
          </div>
        )}

        {/* Información inferior */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            {/* Usuario asignado */}
            {assignedUser && (
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {assignedUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <span className="truncate max-w-20">{assignedUser.name.split(' ')[0]}</span>
              </div>
            )}

            {/* Tiempo estimado */}
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{task.estimated_hours}h</span>
              {task.actual_hours && (
                <span className="text-gray-400">({task.actual_hours}h)</span>
              )}
            </div>
          </div>

          {/* Fecha límite */}
          {task.due_date && (
            <div className={`flex items-center space-x-1 ${overdue ? 'text-red-600' : daysUntilDue !== null && daysUntilDue <= 3 ? 'text-orange-600' : ''}`}>
              <Calendar className="w-3 h-3" />
              <span>
                {daysUntilDue !== null ? (
                  daysUntilDue === 0 ? 'Hoy' :
                  daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d vencido` :
                  `${daysUntilDue}d`
                ) : formatDate(task.due_date)}
              </span>
            </div>
          )}
        </div>

        {/* Indicador de comentarios */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MessageSquare className="w-3 h-3" />
              <span>0 comentarios</span>
            </div>
            
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header del Kanban */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Tablero de Tareas</h2>
          <p className="text-gray-600">Gestiona las tareas del proyecto con el sistema Kanban</p>
        </div>
        
        <button className="btn-living flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nueva Tarea</span>
        </button>
      </div>

      {/* Tablero Kanban */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max pb-4">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            const isOverLimit = column.limit && columnTasks.length >= column.limit;
            
            return (
              <div
                key={column.id}
                className={`flex-shrink-0 w-80 rounded-lg border-2 border-dashed ${column.color} ${isOverLimit ? 'border-red-300 bg-red-50' : ''}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Header de la columna */}
                <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-800">{column.title}</h3>
                      <span className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                        isOverLimit ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {columnTasks.length}
                      </span>
                      {column.limit && (
                        <span className="text-xs text-gray-500">/ {column.limit}</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => setShowNewTaskModal(column.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Añadir tarea"
                    >
                      <Plus className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Tareas de la columna */}
                <div className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                  {columnTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">No hay tareas</p>
                      <p className="text-xs text-gray-400 mt-1">Arrastra tareas aquí</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estadísticas del tablero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas del Tablero</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{getTasksByStatus('todo').length}</div>
            <div className="text-sm text-gray-600">Por hacer</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{getTasksByStatus('in_progress').length}</div>
            <div className="text-sm text-gray-600">En progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{getTasksByStatus('done').length}</div>
            <div className="text-sm text-gray-600">Completadas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{getTasksByStatus('blocked').length}</div>
            <div className="text-sm text-gray-600">Bloqueadas</div>
          </div>
        </div>
      </div>
    </div>
  );
}