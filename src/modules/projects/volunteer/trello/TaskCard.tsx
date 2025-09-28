// UBICACIÓN: src/modules/projects/volunteer/trello/TaskCard.tsx
// Tarjeta de tarea para Voluntarios

import React from 'react';
import { Calendar, Clock, User, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'review': return 'text-yellow-600 bg-yellow-100';
      case 'todo': return 'text-gray-600 bg-gray-100';
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'done': return 'Completado';
      case 'in_progress': return 'En Progreso';
      case 'review': return 'En Revisión';
      case 'todo': return 'Por Hacer';
      default: return status;
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

  const getProgressPercentage = () => {
    if (!task.estimated_hours || task.estimated_hours === 0) return 0;
    return Math.min((task.actual_hours || 0) / task.estimated_hours * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-slate-800 line-clamp-2 mb-1">
            {task.title}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2">
            {task.description}
          </p>
        </div>
        <div className="flex flex-col space-y-1 ml-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {getPriorityText(task.priority)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {getStatusText(task.status)}
          </span>
        </div>
      </div>

      {/* Meta Information */}
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

        {/* Assigned User */}
        {task.assigned_to && (
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-500">
              Asignado a: {task.assigned_to}
            </span>
          </div>
        )}

        {/* Tags */}
        {task.tags && (
          <div className="flex flex-wrap gap-1">
            {task.tags.split(',').slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
            {task.tags.split(',').length > 3 && (
              <span className="text-xs text-slate-400">
                +{task.tags.split(',').length - 3} más
              </span>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1.5">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          {task.status === 'done' && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span className="text-xs">Completado</span>
            </div>
          )}
          {task.status === 'in_progress' && (
            <div className="flex items-center space-x-1 text-blue-600">
              <Clock className="w-3 h-3" />
              <span className="text-xs">En Progreso</span>
            </div>
          )}
          {task.status === 'review' && (
            <div className="flex items-center space-x-1 text-yellow-600">
              <AlertCircle className="w-3 h-3" />
              <span className="text-xs">En Revisión</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <span className="text-xs text-slate-500">
            {Math.round(getProgressPercentage())}% completado
          </span>
        </div>
      </div>
    </div>
  );
}
