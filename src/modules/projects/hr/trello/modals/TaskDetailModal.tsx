// UBICACIÓN: src/modules/projects/hr/trello/modals/TaskDetailModal.tsx
// Modal para ver detalles de una tarea CON comentarios

import React, { useState } from 'react';
import { X, MessageSquare, Send, Clock, User } from 'lucide-react';
import type { Task, ExtendedUserWithProfile } from '@/lib/types';

interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  projectMembers: ExtendedUserWithProfile[];
}

export default function TaskDetailModal({
  task,
  isOpen,
  onClose,
  projectMembers
}: TaskDetailModalProps) {
  const [comments, setComments] = useState<TaskComment[]>([
    {
      id: '1',
      taskId: task?.id || '',
      userId: 'user1',
      userName: 'Patricia Jiménez',
      content: 'Ya empecé a trabajar en el diseño inicial. Necesito algunas aclaraciones sobre los colores a usar.',
      createdAt: '2024-09-18T10:30:00Z'
    },
    {
      id: '2',
      taskId: task?.id || '',
      userId: 'user2',
      userName: 'Ricardo Mendoza',
      content: 'Perfecto Patricia. Los colores principales son verde #10B981 y azul #3B82F6. También revisa el documento de brand guidelines que subí ayer.',
      createdAt: '2024-09-18T14:15:00Z'
    },
    {
      id: '3',
      taskId: task?.id || '',
      userId: 'user1',
      userName: 'Patricia Jiménez',
      content: 'Entendido! Ya vi el documento. ¿Prefieres que use el logo en versión horizontal o vertical para esta sección?',
      createdAt: '2024-09-18T16:45:00Z'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  if (!isOpen || !task) return null;

  const getAssignedUser = (userId?: string) => {
    return projectMembers.find(member => member.id === userId);
  };

  const assignedUser = getAssignedUser(task.assigned_to);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: TaskComment = {
      id: `comment_${Date.now()}`,
      taskId: task.id,
      userId: 'current_user',
      userName: 'Usuario Actual',
      content: newComment.trim(),
      createdAt: new Date().toISOString()
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const formatRelativeTime = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex">
        {/* Panel izquierdo - Detalles de la tarea */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            {task.description && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Descripción</h4>
                <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{task.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Estado:</span>
                  <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'done' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    task.status === 'blocked' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {task.status === 'done' ? 'Completado' :
                     task.status === 'in_progress' ? 'En Progreso' :
                     task.status === 'blocked' ? 'Bloqueado' :
                     task.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Prioridad:</span>
                  <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority === 'urgent' ? 'Urgente' :
                     task.priority === 'high' ? 'Alta' :
                     task.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Horas estimadas:</span>
                  <span className="ml-2 text-gray-600">{task.estimated_hours}h</span>
                </div>

                {task.actual_hours && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Horas reales:</span>
                    <span className="ml-2 text-gray-600">{task.actual_hours}h</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {assignedUser && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Asignado a:</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {getInitials(assignedUser.name)}
                      </div>
                      <span className="text-gray-600">{assignedUser.name}</span>
                    </div>
                  </div>
                )}

                {task.due_date && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Fecha límite:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(task.due_date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-sm font-medium text-gray-700">Creado por:</span>
                  <span className="ml-2 text-gray-600">Administrador</span>
                </div>
              </div>
            </div>

            {task.tags && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Etiquetas</h4>
                <div className="flex flex-wrap gap-2">
                  {task.tags.split(',').map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Información del sistema</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-500">
                <div>
                  <span className="font-medium">ID de tarea:</span>
                  <span className="ml-1 font-mono">{task.id}</span>
                </div>
                <div>
                  <span className="font-medium">Creado el:</span>
                  <span className="ml-1">
                    {new Date(task.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Comentarios */}
        <div className="w-96 border-l border-gray-200 flex flex-col">
          {/* Header de comentarios */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-800">
                Comentarios ({comments.length})
              </h4>
            </div>
          </div>

          {/* Lista de comentarios */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No hay comentarios aún</p>
                <p className="text-gray-400 text-xs">Sé el primero en comentar</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {getInitials(comment.userName)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-800">
                          {comment.userName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Formulario para nuevo comentario */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="space-y-3">
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                placeholder="Escribe un comentario..."
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Ctrl+Enter para enviar
                </p>
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  <Send className="w-3 h-3" />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}