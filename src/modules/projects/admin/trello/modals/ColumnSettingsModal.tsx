// UBICACIÓN: src/modules/projects/admin/trello/modals/ColumnSettingsModal.tsx
// Modal para configurar columnas existentes

import React from 'react';
import { X, Save, GripVertical, Trash2 } from 'lucide-react';
import { KanbanColumn } from '../types';

interface ColumnSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: KanbanColumn[];
  getTasksByStatus: (status: string) => any[];
  onDeleteColumn: (columnId: string) => void;
  onUpdateColumnLimit: (columnId: string, limit?: number) => void;
}

export default function ColumnSettingsModal({
  isOpen,
  onClose,
  columns,
  getTasksByStatus,
  onDeleteColumn,
  onUpdateColumnLimit
}: ColumnSettingsModalProps) {
  if (!isOpen) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Configurar Columnas</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {columns.map((column) => (
            <div key={column.id} className={`p-4 rounded-lg border-2 ${column.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <h4 className="font-medium text-gray-800">{column.title}</h4>
                  {column.isDefault && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      Por defecto
                    </span>
                  )}
                </div>
                
                {!column.isDefault && (
                  <button
                    onClick={() => onDeleteColumn(column.id)}
                    className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                    title="Eliminar columna"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Tareas actuales:</span>
                  <span className="ml-2 font-medium">{getTasksByStatus(column.id).length}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-gray-600">Límite:</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={column.limit || ''}
                    placeholder="∞"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm"
                    onChange={(e) => {
                      const newLimit = e.target.value ? parseInt(e.target.value) : undefined;
                      onUpdateColumnLimit(column.id, newLimit);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </div>
    </div>
  );
}