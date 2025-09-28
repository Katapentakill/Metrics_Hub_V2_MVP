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
      color: 'text-red-600 bg-red-50 hover:bg-red-100'
    },
    {
      id: 'excel' as const,
      label: 'Excel',
      description: 'Hoja de cálculo con datos',
      icon: Table,
      color: 'text-green-600 bg-green-50 hover:bg-green-100'
    },
    {
      id: 'csv' as const,
      label: 'CSV',
      description: 'Datos separados por comas',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        <span>{isExporting ? 'Exportando...' : 'Exportar'}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-800">Exportar Evaluaciones</h3>
              <p className="text-xs text-gray-500 mt-1">
                {views.length} evaluaciones disponibles
              </p>
            </div>
            
            <div className="p-2">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    disabled={isExporting}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${option.color} disabled:opacity-50`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs opacity-75">{option.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
