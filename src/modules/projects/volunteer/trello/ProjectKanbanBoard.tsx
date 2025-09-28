// UBICACIÓN: src/modules/projects/volunteer/trello/ProjectKanbanBoard.tsx
// Tablero Kanban para Voluntarios - Vista limitada pero funcional

'use client';

import React, { useState } from 'react';
import { Plus, MoreHorizontal, Users, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import type { Task } from '@/lib/types';

interface ProjectKanbanBoardProps {
  projectId: string;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

interface Column {
  id: string;
  title: string;
  status: string;
  color: string;
  tasks: Task[];
}

export default function ProjectKanbanBoard({
  projectId,
  tasks,
  setTasks
}: ProjectKanbanBoardProps) {
  
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Columnas del Kanban
  const columns: Column[] = [
    {
      id: 'todo',
      title: 'Por Hacer',
      status: 'todo',
      color: 'bg-slate-100 border-slate-200',
      tasks: tasks.filter(task => task.status === 'todo')
    },
    {
      id: 'in_progress',
      title: 'En Progreso',
      status: 'in_progress',
      color: 'bg-blue-50 border-blue-200',
      tasks: tasks.filter(task => task.status === 'in_progress')
    },
    {
      id: 'review',
      title: 'En Revisión',
      status: 'review',
      color: 'bg-yellow-50 border-yellow-200',
      tasks: tasks.filter(task => task.status === 'review')
    },
    {
      id: 'done',
      title: 'Completado',
      status: 'done',
      color: 'bg-green-50 border-green-200',
      tasks: tasks.filter(task => task.status === 'done')
    }
  ];

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    const updatedTasks = tasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, status: targetStatus as any }
        : task
    );

    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Tablero de Tareas</h2>
          <p className="text-slate-600 mt-1">Gestiona las tareas del proyecto Centro Comunitario Santiago</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-slate-600">
            {tasks.length} tareas total
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`rounded-lg border-2 border-dashed p-4 min-h-[600px] ${column.color}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-slate-800">{column.title}</h3>
                <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
              <button className="p-1 hover:bg-white/50 rounded">
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-move"
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-slate-800 line-clamp-2">
                      {task.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {getPriorityText(task.priority)}
                    </span>
                  </div>

                  {/* Task Description */}
                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  {/* Task Meta */}
                  <div className="space-y-2">
                    {/* Due Date */}
                    {task.due_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className={`text-xs ${
                          isOverdue(task.due_date) ? 'text-red-600' : 'text-slate-500'
                        }`}>
                          {formatDate(task.due_date)}
                          {isOverdue(task.due_date) && ' (Vencida)'}
                        </span>
                      </div>
                    )}

                    {/* Hours */}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">
                        {task.actual_hours || 0}h / {task.estimated_hours}h
                      </span>
                    </div>

                    {/* Tags */}
                    {task.tags && (
                      <div className="flex flex-wrap gap-1">
                        {task.tags.split(',').slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                        {task.tags.split(',').length > 2 && (
                          <span className="text-xs text-slate-400">
                            +{task.tags.split(',').length - 2} más
                          </span>
                        )}
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${task.estimated_hours > 0 ? 
                            Math.min((task.actual_hours || 0) / task.estimated_hours * 100, 100) : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {column.tasks.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    {column.id === 'todo' && <Plus className="w-5 h-5 text-slate-400" />}
                    {column.id === 'in_progress' && <Clock className="w-5 h-5 text-slate-400" />}
                    {column.id === 'review' && <AlertCircle className="w-5 h-5 text-slate-400" />}
                    {column.id === 'done' && <CheckCircle2 className="w-5 h-5 text-slate-400" />}
                  </div>
                  <p className="text-sm text-slate-500">No hay tareas</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Resumen del Proyecto</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">{tasks.length}</div>
            <div className="text-xs text-slate-500">Total Tareas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-xs text-slate-500">En Progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'review').length}
            </div>
            <div className="text-xs text-slate-500">En Revisión</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-xs text-slate-500">Completadas</div>
          </div>
        </div>
      </div>
    </div>
  );
}
