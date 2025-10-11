// 📁 src/modules/evaluations/shared/ExportEvaluations.tsx
// Componente compartido para exportar evaluaciones

"use client";

import React, { useState } from 'react';
import { Download, FileText, Table, Calendar } from 'lucide-react';
import type { EvaluationView } from '@/lib/map/evaluations/evaluationView';

interface ExportEvaluationsProps {
  views: EvaluationView[];
  onExport?: (format: 'pdf' | 'excel' | 'csv', data: any) => void;
}

export default function ExportEvaluations({ views, onExport }: ExportEvaluationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true);
    
    try {
      // Simular proceso de exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onExport) {
        onExport(format, views);
      } else {
        // Comportamiento por defecto
        console.log(`Exportando ${views.length} evaluaciones en formato ${format}`);
        alert(`Exportación en formato ${format.toUpperCase()} completada`);
      }
    } catch (error) {
      console.error('Error en la exportación:', error);
      alert('Error al exportar las evaluaciones');
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportOptions = [
    {
      id: 'pdf' as const,
      label: 'PDF',
      description: 'Reporte completo con gráficos',
      icon: FileText,
      // PDF usa red-500 según la guía (Delete/Peligro - pero aquí es neutral)
      color: 'text-red-500 bg-red-50 hover:bg-red-100 border border-red-200'
    },
    {
      id: 'excel' as const,
      label: 'Excel',
      description: 'Hoja de cálculo con datos',
      icon: Table,
      // Excel usa emerald-600 (Éxito/Confirmaciones)
      color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
    },
    {
      id: 'csv' as const,
      label: 'CSV',
      description: 'Datos separados por comas',
      icon: Calendar,
      // CSV usa blue-500 (View/Info)
      color: 'text-blue-500 bg-blue-50 hover:bg-blue-100 border border-blue-200'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-green-50 hover:border-teal-500 transition-colors disabled:opacity-50 text-gray-600"
      >
        <Download className="w-4 h-4 text-teal-500" />
        <span className="font-medium">{isExporting ? 'Exportando...' : 'Exportar'}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown - Fondo green-50 con borde teal-500 */}
          <div className="absolute right-0 mt-2 w-64 bg-green-50 border border-teal-500 rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-800">Exportar Evaluaciones</h3>
              <p className="text-xs text-gray-600 mt-1">
                {views.length} evaluaciones disponibles
              </p>
            </div>
            
            <div className="p-2 space-y-2">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    disabled={isExporting}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${option.color} disabled:opacity-50 hover:shadow-sm`}
                  >
                    <div className="flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div className="text-xs opacity-80">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-200 bg-white rounded-b-lg">
              <p className="text-xs text-gray-600 text-center">
                Los datos se exportarán según los filtros actuales
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}