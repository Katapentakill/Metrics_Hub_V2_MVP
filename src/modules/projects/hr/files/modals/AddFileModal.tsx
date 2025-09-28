// UBICACIÓN: src/modules/projects/hr/files/modals/AddFileModal.tsx
// Modal para añadir nuevos archivos al proyecto

import React, { useState } from 'react';
import { X, Upload, File } from 'lucide-react';

interface AddFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileData: {
    name: string;
    type: 'document' | 'image' | 'video' | 'other';
    category: 'project_docs' | 'multimedia' | 'legal';
    description: string;
    size?: string;
  }) => void;
}

export default function AddFileModal({
  isOpen,
  onClose,
  onSubmit
}: AddFileModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'document' as 'document' | 'image' | 'video' | 'other',
    category: 'project_docs' as 'project_docs' | 'multimedia' | 'legal',
    description: '',
    file: null as File | null
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('El nombre del archivo es obligatorio');
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      type: formData.type,
      category: formData.category,
      description: formData.description.trim(),
      size: formData.file ? `${(formData.file.size / 1024 / 1024).toFixed(2)} MB` : '0 KB'
    });

    // Reset form
    setFormData({
      name: '',
      type: 'document',
      category: 'project_docs',
      description: '',
      file: null
    });
    
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file,
        name: prev.name || file.name,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document'
      }));
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Subir Archivo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subida de archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar archivo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.mp4,.mov,.avi"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <File className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Haz clic para seleccionar un archivo
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, XLSX, imágenes, videos (max 50MB)
                </p>
              </label>
            </div>
            {formData.file && (
              <p className="text-sm text-green-600 mt-2">
                Archivo seleccionado: {formData.file.name}
              </p>
            )}
          </div>

          {/* Nombre del archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del archivo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Ej: Plan de trabajo Q4 2024"
              required
            />
          </div>

          {/* Tipo de archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de archivo
            </label>
            <select
              value={formData.type}
              onChange={(e) => updateField('type', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="document">Documento</option>
              <option value="image">Imagen</option>
              <option value="video">Video</option>
              <option value="other">Otro</option>
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="project_docs">Documentos del Proyecto</option>
              <option value="multimedia">Multimedia</option>
              <option value="legal">Documentos Legales</option>
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Describe el contenido del archivo..."
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Subir Archivo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}