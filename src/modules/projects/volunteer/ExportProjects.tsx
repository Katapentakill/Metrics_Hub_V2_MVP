// UBICACIÓN: src/modules/projects/volunteer/ExportProjects.tsx
// Exportación de proyectos para Voluntarios - Vista limitada pero funcional

'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar, Users, Target, CheckCircle2 } from 'lucide-react';
import type { ProjectView } from '@/lib/map/projects/projectView';

interface ExportProjectsProps {
  views: ProjectView[];
}

export default function ExportProjects({ views }: ExportProjectsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf');

  const handleExport = async (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    
    try {
      // Simular proceso de exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (format === 'pdf') {
        // Simular descarga de PDF
        const blob = new Blob(['Contenido del PDF simulado'], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `proyectos-voluntario-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // Simular descarga de Excel
        const blob = new Blob(['Contenido del Excel simulado'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `proyectos-voluntario-${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error al exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'planning': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-purple-600 bg-purple-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'En Progreso';
      case 'planning': return 'Planificación';
      case 'completed': return 'Completado';
      case 'paused': return 'Pausado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Exportar Proyectos</h2>
          <p className="text-slate-600 mt-1">Descarga un reporte de tus proyectos</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-slate-600">
            {views.length} proyecto{views.length !== 1 ? 's' : ''} disponible{views.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Opciones de Exportación</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDF Export */}
          <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">Reporte PDF</h4>
                <p className="text-sm text-slate-600">Documento detallado con gráficos</p>
              </div>
            </div>
            <ul className="text-sm text-slate-600 space-y-1 mb-4">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Información completa del proyecto</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Estadísticas y métricas</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Gráficos de progreso</span>
              </li>
            </ul>
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Excel Export */}
          <div className="border border-slate-200 rounded-lg p-4 hover:border-green-300 transition-colors">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-slate-800">Hoja de Cálculo</h4>
                <p className="text-sm text-slate-600">Datos tabulares para análisis</p>
              </div>
            </div>
            <ul className="text-sm text-slate-600 space-y-1 mb-4">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Datos en formato tabla</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Filtrable y ordenable</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Compatible con Excel</span>
              </li>
            </ul>
            <button
              onClick={() => handleExport('excel')}
              disabled={isExporting}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar Excel</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Project Preview */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Vista Previa</h3>
        
        {views.length === 0 ? (
          <div className="text-center py-8">
            <Target className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900">No hay proyectos</h3>
            <p className="mt-1 text-sm text-slate-500">
              No tienes proyectos asignados para exportar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {views.map((view) => (
              <div key={view.project.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-medium text-slate-800">{view.project.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(view.project.status)}`}>
                        {getStatusText(view.project.status)}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-3">{view.project.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {view.project.deadline ? formatDate(view.project.deadline) : 'Sin fecha límite'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {view.project.current_team_size} / {view.project.max_team_size} miembros
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{view.progressPct}% completado</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {view.project.created_at ? formatDate(view.project.created_at) : 'Fecha no disponible'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
