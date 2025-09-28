// 📁 src/components/communications/modals/CreateCommunicationModal.tsx
// Modal para crear nuevas comunicaciones

"use client";

import React, { useState } from 'react';
import {
  X,
  Save,
  Eye,
  Calendar,
  Users,
  Star,
  AlertCircle,
  FileText,
  Megaphone,
  Bell,
  MapPin
} from 'lucide-react';
import { Communication } from '@/lib/types/communications';

interface CreateCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (communication: Partial<Communication>) => void;
  userRole: string;
}

interface FormData {
  title: string;
  content: string;
  type: 'news' | 'announcement' | 'update' | 'reminder' | 'event';
  priority: 'low' | 'medium' | 'high';
  target_audience: 'all' | 'volunteers' | 'coordinators' | 'donors' | 'leads' | 'hr' | 'admin';
  featured: boolean;
  location?: string;
  event_date?: string;
  deadline?: string;
  registration_required?: boolean;
  tags: string[];
  image_url?: string;
}

export default function CreateCommunicationModal({
  isOpen,
  onClose,
  onSubmit,
  userRole
}: CreateCommunicationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    type: 'announcement',
    priority: 'medium',
    target_audience: 'all',
    featured: false,
    location: '',
    event_date: '',
    deadline: '',
    registration_required: false,
    tags: [],
    image_url: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    }

    if (formData.type === 'event' && !formData.event_date) {
      newErrors.event_date = 'La fecha del evento es requerida';
    }

    if (formData.type === 'reminder' && !formData.deadline) {
      newErrors.deadline = 'La fecha límite es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCommunication: Partial<Communication> = {
      title: formData.title,
      content: formData.content,
      type: formData.type,
      priority: formData.priority,
      status: 'draft',
      target_audience: formData.target_audience,
      featured: formData.featured,
      location: formData.location || undefined,
      event_date: formData.event_date || undefined,
      deadline: formData.deadline || undefined,
      registration_required: formData.registration_required,
      tags: formData.tags,
      image_url: formData.image_url || undefined,
      excerpt: formData.content.substring(0, 150) + '...',
      read_count: 0,
      likes_count: 0,
      comments_count: 0
    };

    onSubmit(newCommunication);
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      type: 'announcement',
      priority: 'medium',
      target_audience: 'all',
      featured: false,
      location: '',
      event_date: '',
      deadline: '',
      registration_required: false,
      tags: [],
      image_url: ''
    });
    
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleTagAdd = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return Megaphone;
      case 'news': return FileText;
      case 'event': return Calendar;
      case 'reminder': return Bell;
      default: return FileText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Nueva Comunicación</h2>
              <p className="text-sm text-gray-600">Crea una nueva comunicación para tu audiencia</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              <span>{previewMode ? 'Editar' : 'Vista Previa'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {previewMode ? (
              /* Vista Previa */
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {React.createElement(getTypeIcon(formData.type), { className: "w-5 h-5 text-gray-500" })}
                    <h3 className="text-lg font-semibold text-gray-900">{formData.title || 'Título de la comunicación'}</h3>
                    {formData.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className={`font-medium ${getPriorityColor(formData.priority)}`}>
                      {formData.priority === 'high' ? 'Alta prioridad' : 
                       formData.priority === 'medium' ? 'Prioridad media' : 'Baja prioridad'}
                    </span>
                    <span>•</span>
                    <span>Para: {formData.target_audience === 'all' ? 'Todos' : formData.target_audience}</span>
                    {formData.type === 'event' && formData.event_date && (
                      <>
                        <span>•</span>
                        <span>Evento: {new Date(formData.event_date).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {formData.content || 'Contenido de la comunicación...'}
                    </p>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Formulario de Edición */
              <div className="space-y-6">
                {/* Información Básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.title ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Título de la comunicación"
                    />
                    {errors.title && (
                      <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="announcement">Anuncio</option>
                      <option value="news">Noticia</option>
                      <option value="event">Evento</option>
                      <option value="reminder">Recordatorio</option>
                      <option value="update">Actualización</option>
                    </select>
                  </div>
                </div>

                {/* Contenido */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={8}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.content ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Escribe el contenido de la comunicación..."
                  />
                  {errors.content && (
                    <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                  )}
                </div>

                {/* Configuración */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audiencia Objetivo
                    </label>
                    <select
                      value={formData.target_audience}
                      onChange={(e) => setFormData(prev => ({ ...prev, target_audience: e.target.value as any }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="all">Todos</option>
                      <option value="volunteers">Voluntarios</option>
                      <option value="coordinators">Coordinadores</option>
                      <option value="leads">Líderes</option>
                      <option value="hr">Recursos Humanos</option>
                      <option value="admin">Administradores</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Destacada</span>
                    </label>
                  </div>
                </div>

                {/* Campos específicos por tipo */}
                {formData.type === 'event' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha del Evento *
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.event_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.event_date ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.event_date && (
                        <p className="text-red-600 text-sm mt-1">{errors.event_date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ubicación
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Ubicación del evento"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.registration_required}
                        onChange={(e) => setFormData(prev => ({ ...prev, registration_required: e.target.checked }))}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Requiere registro</span>
                    </div>
                  </div>
                )}

                {formData.type === 'reminder' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha Límite *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.deadline ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.deadline && (
                      <p className="text-red-600 text-sm mt-1">{errors.deadline}</p>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiquetas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center space-x-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="text-emerald-600 hover:text-emerald-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Agregar etiqueta (presiona Enter)"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleTagAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              {previewMode ? 'Vista previa de la comunicación' : 'Completa todos los campos requeridos'}
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Guardando...' : 'Guardar como Borrador'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
