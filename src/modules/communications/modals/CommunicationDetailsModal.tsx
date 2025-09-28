// 📁 src/components/communications/modals/CommunicationDetailsModal.tsx
// Modal para ver detalles de una comunicación

"use client";

import React, { useState } from 'react';
import {
  X,
  Eye,
  Calendar,
  User,
  Clock,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Download,
  Edit3,
  Trash2,
  MapPin,
  Bell,
  FileText,
  Megaphone,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Communication } from '@/lib/types/communications';

interface CommunicationDetailsModalProps {
  communication: Communication | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (communication: Communication) => void;
  onDelete?: (communication: Communication) => void;
  userRole: string;
}

interface Comment {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  created_at: string;
  likes_count: number;
}

export default function CommunicationDetailsModal({
  communication,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  userRole
}: CommunicationDetailsModalProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user_id: 'user1',
      user_name: 'María González',
      content: 'Excelente información, gracias por compartirla. ¿Habrá alguna sesión de preguntas y respuestas?',
      created_at: '2024-09-18T10:30:00Z',
      likes_count: 3
    },
    {
      id: '2',
      user_id: 'user2',
      user_name: 'Carlos Ruiz',
      content: 'Muy útil para el equipo. ¿Podemos programar una reunión para discutir los detalles?',
      created_at: '2024-09-18T14:15:00Z',
      likes_count: 1
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  if (!isOpen || !communication) return null;

  const canEdit = ['admin', 'hr'].includes(userRole);
  const canDelete = ['admin'].includes(userRole);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return Megaphone;
      case 'news': return FileText;
      case 'event': return Calendar;
      case 'reminder': return Bell;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Ayer';
    return formatDate(dateString);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 500));

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      user_id: 'current_user',
      user_name: 'Usuario Actual',
      content: newComment.trim(),
      created_at: new Date().toISOString(),
      likes_count: 0
    };

    setComments([...comments, comment]);
    setNewComment('');
    setIsSubmittingComment(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const TypeIcon = getTypeIcon(communication.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TypeIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{communication.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span>Por {communication.author_name}</span>
                <span>•</span>
                <span>{formatDate(communication.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {canEdit && (
              <button
                onClick={() => onEdit?.(communication)}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Editar"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
            {canDelete && (
              <button
                onClick={() => onDelete?.(communication)}
                className="p-2 text-gray-400 hover:text-red-600"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Content */}
          <div className="p-6">
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(communication.type)}`}>
                {communication.type}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(communication.priority)}`}>
                {communication.priority === 'high' ? 'Alta prioridad' : 
                 communication.priority === 'medium' ? 'Prioridad media' : 'Baja prioridad'}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(communication.status)}`}>
                {communication.status}
              </span>
              {communication.featured && (
                <span className="flex items-center space-x-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Destacada</span>
                </span>
              )}
            </div>

            {/* Event/Reminder specific info */}
            {communication.type === 'event' && communication.event_date && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-blue-900">Información del Evento</h3>
                    <p className="text-sm text-blue-700">
                      Fecha: {formatDate(communication.event_date)}
                      {communication.location && ` • Ubicación: ${communication.location}`}
                      {communication.registration_required && (
                        <span className="ml-2 inline-flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Requiere registro</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {communication.type === 'reminder' && communication.deadline && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-orange-900">Recordatorio</h3>
                    <p className="text-sm text-orange-700">
                      Fecha límite: {formatDate(communication.deadline)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose max-w-none mb-6">
              <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {communication.content}
              </div>
            </div>

            {/* Tags */}
            {communication.tags && communication.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {communication.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between py-4 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{communication.read_count} vistas</span>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{communication.likes_count + (isLiked ? 1 : 0)} likes</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{comments.length} comentarios</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600" title="Compartir">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600" title="Descargar">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comentarios</h3>
            
            {/* Add Comment */}
            <div className="mb-6">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    placeholder="Escribe tu comentario..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Presiona Ctrl+Enter para enviar
                  </p>
                </div>
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || isSubmittingComment}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  {isSubmittingComment ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{comment.user_name}</span>
                        <span className="text-xs text-gray-500">{formatRelativeTime(comment.created_at)}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 ml-3">
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Me gusta ({comment.likes_count})
                      </button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
