// UBICACIÓN: src/modules/projects/lead/ExportProjects.tsx
// Componente de exportación para Líder de Proyecto

import React, { useState } from 'react';
import { Download, FileText, Table, X } from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ExportProjectsProps {
  views: ProjectView[];
}

export default function ExportProjects({ views }: ExportProjectsProps) {
  const [showModal, setShowModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  const handleExport = () => {
    if (views.length === 0) {
      alert('No hay proyectos para exportar');
      return;
    }

    const data = views.map(view => ({
      'ID': view.project.id,
      'Nombre': view.project.name,
      'Descripción': view.project.description || '',
      'Estado': view.project.status,
      'Progreso (%)': view.progressPct,
      'Líder': view.lead?.name || 'Sin asignar',
      'Equipo Actual': view.project.current_team_size,
      'Equipo Máximo': view.project.max_team_size,
      'Fecha Límite': view.project.deadline || 'Sin fecha',
      'País': view.country || '',
      'Ciudad': view.city || '',
      'Creado': view.project.created_at
    }));

    if (exportFormat === 'csv') {
      const headers = Object.keys(data[0]);
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `mis-proyectos-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } else {
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `mis-proyectos-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    }

    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-secondary flex items-center space-x-2"
        disabled={views.length === 0}
      >
        <Download className="w-4 h-4" />
        <span>Exportar</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Exportar Mis Proyectos</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Se exportarán <span className="font-medium text-gray-800">{views.length}</span> proyectos
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Formato de exportación
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value as 'csv')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      exportFormat === 'csv'
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}>
                      {exportFormat === 'csv' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Table className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">CSV (Excel)</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value as 'json')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      exportFormat === 'json'
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}>
                      {exportFormat === 'json' && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-800">JSON</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

