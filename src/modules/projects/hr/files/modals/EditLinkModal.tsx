// UBICACIÓN: src/modules/projects/hr/files/modals/EditLinkModal.tsx
// Modal para editar enlaces externos existentes

import React, { useState, useEffect } from 'react';
import { X, Edit, Save, Trash2, ExternalLink } from 'lucide-react';

interface ExternalResource {
  id: string;
  name: string;
  url: string;
  type: 'drive' | 'slack' | 'whatsapp' | 'figma' | 'github' | 'notion' | 'other';
  description: string;
  icon: React.ElementType;
  color: string;
}

interface EditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (linkData: Partial<ExternalResource>) => void;
  onDelete: (linkId: string) => void;
  link: ExternalResource | null;
}

export default function EditLinkModal({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  link
}: EditLinkModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'other' as 'drive' | 'slack' | 'whatsapp' | 'figma' | 'github' | 'notion' | 'other',
    description: ''
  });

  useEffect(() => {
    if (link) {
      setFormData({
        name: link.name,
        url: link.url,
        type: link.type,
        description: link.description
      });
    }
  }, [link]);

  if (!isOpen || !link) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('El nombre del enlace es obligatorio');
      return;
    }

    if (!formData.url.trim()) {
      alert('La URL es obligatoria');
      return;
    }

    // Validar URL básica
    try {
      new URL(formData.url);
    } catch {
      alert('Por favor ingresa una URL válida');
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      url: formData.url.trim(),
      type: formData.type,
      description: formData.description.trim()
    });
    
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar el enlace "${link.name}"?`)) {
      onDelete(link.id);
      onClose();
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Editar Enlace</h3>
              <p className="text-sm text-gray-600 truncate max-w-xs">{link.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del enlace */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del enlace *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              placeholder="Ej: Repositorio del proyecto"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => updateField('url', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              placeholder="https://ejemplo.com"
              required
            />
            {formData.url && (
              <a
                href={formData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700 mt-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Probar enlace</span>
              </a>
            )}
          </div>

          {/* Tipo de enlace */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de herramienta
            </label>
            <select
              value={formData.type}
              onChange={(e) => updateField('type', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            >
              <option value="other">Otro</option>
              <option value="drive">Google Drive</option>
              <option value="slack">Slack</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="figma">Figma</option>
              <option value="github">GitHub</option>
              <option value="notion">Notion</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              placeholder="Describe para qué se usa este enlace..."
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar Enlace</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!formData.name.trim() || !formData.url.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}