// src/app/admin/recruitment/audits/page.tsx
'use client';

import React, { useState } from 'react';
import { Shield, Clock, Search, FileText, AlertTriangle, CheckCircle, Eye, TrendingUp } from 'lucide-react';

// Types
type TabId = 'activity' | 'data-access' | 'compliance';

interface StatProps {
  title: string;
  value: string | number;
  change: { value: number; type: 'increase' | 'decrease' | 'neutral'; period: string };
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface SectionStat {
  label: string;
  value: string;
}

interface AuditSection {
  id: TabId;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
  badge: { status: 'info' | 'success' | 'active' | 'warning'; text: string };
  stats: SectionStat[];
  priority: 'high' | 'medium' | 'low';
}

// Mock data
const auditStats: StatProps[] = [
  {
    title: 'Eventos de Auditoría',
    value: 1247,
    change: { value: 5, type: 'increase', period: 'semana anterior' },
    icon: Eye,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  {
    title: 'Accesos a Datos',
    value: 89,
    change: { value: 12, type: 'decrease', period: 'día anterior' },
    icon: Search,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
  {
    title: 'Alertas de Seguridad',
    value: 0,
    change: { value: 0, type: 'neutral', period: 'mes actual' },
    icon: AlertTriangle,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
  },
  {
    title: 'Estado de Cumplimiento',
    value: '100%',
    change: { value: 0, type: 'neutral', period: 'trimestre actual' },
    icon: CheckCircle,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-lime-500 to-lime-600',
  },
];

const auditSections: AuditSection[] = [
  {
    id: 'activity',
    title: 'Registro de Actividad',
    description: 'Visualiza un registro detallado de todas las acciones y cambios realizados por los usuarios en el sistema de reclutamiento.',
    href: '/admin/recruitment/audits/activity-log',
    icon: Clock,
    color: 'text-green-600',
    badge: { status: 'active', text: '1,247 Eventos' },
    stats: [
      { label: 'Hoy', value: '23' },
      { label: 'Esta Semana', value: '156' },
    ],
    priority: 'medium',
  },
  {
    id: 'data-access',
    title: 'Auditoría de Acceso a Datos',
    description: 'Revisa quién ha accedido a la información confidencial de los candidatos para garantizar la seguridad y privacidad.',
    href: '/admin/recruitment/audits/data-access',
    icon: Search,
    color: 'text-lime-600',
    badge: { status: 'success', text: '89 Accesos' },
    stats: [
      { label: 'Autorizados', value: '89' },
      { label: 'Bloqueados', value: '0' },
    ],
    priority: 'high',
  },
  {
    id: 'compliance',
    title: 'Reportes de Cumplimiento',
    description: 'Genera reportes para asegurar que los procesos de reclutamiento cumplen con las normativas internas y legales.',
    href: '/admin/recruitment/audits/compliance-reports',
    icon: FileText,
    color: 'text-emerald-600',
    badge: { status: 'success', text: '100% Compliant' },
    stats: [
      { label: 'Reportes', value: '12' },
      { label: 'Políticas', value: '8' },
    ],
    priority: 'low',
  },
];

const tabs: Array<{ id: TabId; label: string; icon: React.ElementType; color: string }> = [
  { id: 'activity', label: 'Actividad', icon: Clock, color: 'green' },
  { id: 'data-access', label: 'Acceso a Datos', icon: Search, color: 'lime' },
  { id: 'compliance', label: 'Cumplimiento', icon: FileText, color: 'emerald' },
];

const getBadgeColor = (status: 'info' | 'success' | 'active' | 'warning') => {
  switch (status) {
    case 'success':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'info':
      return 'bg-teal-100 text-teal-700 border-teal-200';
    case 'active':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'warning':
      return 'bg-lime-100 text-lime-700 border-lime-200';
  }
};

export default function AdminAuditsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('activity');

  const currentSection = auditSections.find(s => s.id === activeTab) || auditSections[0];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1e293b]">Auditoría y Seguridad</h1>
              <p className="text-xl text-[#4b5563]">Panel de Administración</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Search className="w-5 h-5" />
              Búsqueda Avanzada
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Generar Reporte
            </button>
          </div>
        </div>

        <p className="text-[#4b5563] text-lg leading-relaxed mb-8 max-w-4xl">
          Este panel te ayuda a garantizar la transparencia y seguridad del proceso de reclutamiento. Revisa la actividad del sistema y audita el acceso a los datos para mantener el cumplimiento normativo.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {auditStats.map((stat) => {
            const Icon = stat.icon;
            const isIncrease = stat.change.type === 'increase';
            const changeColor = stat.change.type === 'neutral' ? 'text-gray-600' : (isIncrease ? 'text-[#059669]' : 'text-[#ef4444]');
            
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}>
                    {stat.change.type !== 'neutral' && (
                      <TrendingUp className={`w-4 h-4 ${!isIncrease ? 'rotate-180' : ''}`} />
                    )}
                    {stat.change.type !== 'neutral' ? `${Math.abs(stat.change.value)}%` : 'Estable'}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#1e293b] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#4b5563]">{stat.title}</p>
                  <p className="text-xs text-gray-500 mt-1">vs {stat.change.period}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          <div className="flex border-b border-[#e2e8f0]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all ${
                    isActive
                      ? 'text-[#166534] bg-green-50 border-b-2 border-[#166534]'
                      : 'text-[#4b5563] hover:text-slate-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="bg-white rounded-lg p-6 border border-[#e2e8f0] hover:border-[#166534] hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[#1e293b]">{currentSection.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(currentSection.badge.status)}`}>
                      {currentSection.badge.text}
                    </span>
                  </div>
                  <p className="text-[#4b5563] mb-2">{currentSection.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {currentSection.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <span className="font-medium">{stat.label}:</span>
                        <span className="font-bold text-[#1e293b]">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => window.location.href = currentSection.href}
                  className="px-6 py-2 bg-gradient-to-r from-[#059669] to-[#15803d] text-white rounded-lg font-medium hover:from-[#15803d] hover:to-[#059669] transition-colors flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Ver Detalles
                </button>
              </div>
            </div>

            {/* Audit Log Visualization */}
            <div className='mt-8 p-8 bg-gradient-to-br from-emerald-50/30 to-teal-50/20 border-2 border-emerald-100 rounded-xl'>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-emerald-200">
                    {React.createElement(currentSection.icon, { className: `w-8 h-8 ${currentSection.color}` })}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">Visualización detallada</p>
                    <p className="text-sm text-emerald-600 font-medium">{currentSection.title}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium">
                    <Search className="w-4 h-4 inline mr-2" />
                    Filtrar
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Exportar
                  </button>
                </div>
              </div>
              
              {/* Mock Log Entries */}
              <div className="space-y-3">
                {[
                  { user: 'María González', action: 'Visualizó perfil de candidato', time: 'Hace 5 minutos', status: 'success' },
                  { user: 'Carlos Ruiz', action: 'Actualizó estado de aplicación', time: 'Hace 15 minutos', status: 'success' },
                  { user: 'Ana Martínez', action: 'Descargó reporte de compliance', time: 'Hace 1 hora', status: 'info' },
                  { user: 'Juan López', action: 'Modificó configuración de permisos', time: 'Hace 2 horas', status: 'warning' },
                ].map((log, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-emerald-200 hover:shadow-sm transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          log.status === 'success' ? 'bg-emerald-500' :
                          log.status === 'warning' ? 'bg-lime-500' :
                          'bg-teal-500'
                        }`} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{log.user}</p>
                          <p className="text-sm text-gray-600">{log.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{log.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          log.status === 'success' ? 'bg-emerald-50 text-emerald-700' :
                          log.status === 'warning' ? 'bg-lime-50 text-lime-700' :
                          'bg-teal-50 text-teal-700'
                        }`}>
                          {log.status === 'success' ? 'Exitoso' : log.status === 'warning' ? 'Requiere revisión' : 'Informativo'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className='text-sm text-gray-500 text-center mt-6'>(Simulación de tabla de logs o reporte de acceso)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}