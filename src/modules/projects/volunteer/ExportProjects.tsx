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
      case 'active': return 'text-emerald-600 bg-emerald-50 border border-emerald-600';
      case 'planning': return 'text-blue-500 bg-blue-50 border border-blue-500';
      case 'completed': return 'text-teal-500 bg-teal-50 border border-teal-500';
      case 'paused': return 'text-yellow-500 bg-yellow-50 border border-yellow-500';
      default: return 'text-gray-600 bg-gray-50 border border-slate-200';
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
          <p className="text-gray-600 mt-1">Descarga un reporte de tus proyectos</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600 font-medium">
            {views.length} proyecto{views.length !== 1 ? 's' : ''} disponible{views.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Export Options - Fondo green-50, bordes teal-500 */}
      <div className="bg-green-50 border-2 border-teal-500 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Opciones de Exportación</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDF Export */}
          <div className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-red-500 transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Reporte PDF</h4>
                <p className="text-sm text-gray-600">Documento detallado con gráficos</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Información completa del proyecto</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Estadísticas y métricas</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Gráficos de progreso</span>
              </li>
            </ul>
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium shadow-sm"
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
          <div className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-emerald-600 transition-all hover:shadow-md">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Hoja de Cálculo</h4>
                <p className="text-sm text-gray-600">Datos tabulares para análisis</p>
              </div>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 mb-4">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Datos en formato tabla</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Filtrable y ordenable</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Compatible con Excel</span>
              </li>
            </ul>
            <button
              onClick={() => handleExport('excel')}
              disabled={isExporting}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium shadow-sm"
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

      {/* Project Preview - Fondo green-50, bordes teal-500 */}
      <div className="bg-green-50 border-2 border-teal-500 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Vista Previa</h3>
        
        {views.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg border border-slate-200">
            <Target className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-semibold text-slate-800">No hay proyectos</h3>
            <p className="mt-1 text-sm text-gray-600">
              No tienes proyectos asignados para exportar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {views.map((view) => (
              <div key={view.project.id} className="bg-white border-2 border-slate-200 rounded-lg p-4 hover:border-teal-500 transition-all hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-slate-800">{view.project.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(view.project.status)}`}>
                        {getStatusText(view.project.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{view.project.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-gray-600">
                          {view.project.deadline ? formatDate(view.project.deadline) : 'Sin fecha límite'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-gray-600">
                          {view.project.current_team_size} / {view.project.max_team_size} miembros
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-gray-600 font-medium">{view.progressPct}% completado</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        <span className="text-gray-600">
                          {view.project.created_at ? formatDate(view.project.created_at) : 'Fecha no disponible'}
                        </span>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="mt-3">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-800 to-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${view.progressPct}%` }}
                        />
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