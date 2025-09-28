// UBICACIÓN: src/modules/projects/admin/trello/TaskCard.tsx
// Componente individual de tarjeta de tarea CON función de comentarios

import React, { useState } from 'react';
import { 
  MoreVertical, 
  Clock, 
  Flag, 
  Calendar, 
  MessageSquare,
  CheckCircle,
  Copy,
  Trash2,
  Plus
} from 'lucide-react';
import type { Task, ExtendedUserWithProfile } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  onDetail: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onDuplicate: (task: Task) => void;
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  onAddComment: (taskId: string) => void; // Esta línea faltaba
  projectMembers: ExtendedUserWithProfile[];
}

export default function TaskCard({
  task,
  onDetail,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragEnd,
  onAddComment,
  projectMembers
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [commentCount] = useState(Math.floor(Math.random() * 5)); // Simulado por ahora

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

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task);
    e.dataTransfer.effectAllowed = 'move';
    const target = e.target as HTMLElement;
    target.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    onDragEnd();
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
  };

  const assignedUser = getAssignedUser(task.assigned_to);
  const daysUntilDue = getDaysUntilDue(task.due_date);
  const overdue = isOverdue(task.due_date);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-all duration-200 mb-3 group relative"
    >
      {/* Header de la tarea */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getPriorityIcon(task.priority)}
          <span className="text-xs font-medium text-gray-500 uppercase">
            {task.priority}
          </span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-6 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
              <button
                onClick={() => {
                  onDetail(task);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-gray-500" />
                Ver Detalles
              </button>
              <button
                onClick={() => {
                  onAddComment(task.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-sm"
              >
                <Plus className="w-4 h-4 text-blue-500" />
                Añadir Comentario
              </button>
              <button
                onClick={() => {
                  onDuplicate(task);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-sm"
              >
                <Copy className="w-4 h-4 text-gray-500" />
                Duplicar
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50 text-sm border-t border-gray-100"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                <span className="text-red-600">Eliminar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Título y descripción */}
      <h4 
        className="font-medium text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-emerald-600 transition-colors"
        onClick={() => onDetail(task)}
      >
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
          <div className={`flex items-center space-x-1 ${
            overdue ? 'text-red-600' : 
            daysUntilDue !== null && daysUntilDue <= 3 ? 'text-orange-600' : ''
          }`}>
            <Calendar className="w-3 h-3" />
            <span>
              {daysUntilDue !== null ? (
                daysUntilDue === 0 ? 'Hoy' :
                daysUntilDue < 0 ? `${Math.abs(daysUntilDue)}d vencido` :
                `${daysUntilDue}d`
              ) : new Date(task.due_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        )}
      </div>

      {/* Indicador de comentarios y prioridad */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onAddComment(task.id)}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>{commentCount} comentarios</span>
          </button>
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
        </div>
      </div>
    </div>
  );
}