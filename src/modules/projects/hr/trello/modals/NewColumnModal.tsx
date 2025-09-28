// UBICACIÓN: src/modules/projects/hr/trello/modals/NewColumnModal.tsx
// Modal para crear nuevas columnas

import React from 'react';
import { X } from 'lucide-react';
import { NewColumnForm, colorOptions } from '../types';

interface NewColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (columnData: NewColumnForm) => void;
  formData: NewColumnForm;
  setFormData: React.Dispatch<React.SetStateAction<NewColumnForm>>;
}

export default function NewColumnModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData
}: NewColumnModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      color: 'bg-gray-100 border-gray-300',
    });
    onClose();
  };

  const updateField = (field: keyof NewColumnForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Nueva Columna</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título de la columna *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Ej: En Desarrollo"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('color', option.value)}
                  className={`flex items-center space-x-2 p-2 rounded-lg border-2 transition-colors ${
                    formData.color === option.value 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded ${option.preview}`}></div>
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Límite de tareas (opcional)
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={formData.limit || ''}
              onChange={(e) => updateField('limit', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              placeholder="Sin límite"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Crear Columna
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}