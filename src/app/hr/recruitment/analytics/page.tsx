// src/app/hr/recruitment/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { PieChart, BarChart2, TrendingUp, Users, Clock, Target, DollarSign, CheckCircle, Calendar, FileText, ArrowRight, Eye } from 'lucide-react';

// Types
type TabId = 'pipeline' | 'hiring' | 'source' | 'trends';

interface StatProps {
  title: string;
  value: string | number;
  change: { value: number; type: 'increase' | 'decrease'; period: string };
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

interface SectionStat {
  label: string;
  value: string;
}

interface AnalyticSection {
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
const analyticsStats: StatProps[] = [
  {
    title: 'Tasa de Conversión',
    value: '24%',
    change: { value: 8, type: 'increase', period: 'trimestre anterior' },
    icon: Target,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  {
    title: 'Tiempo Promedio de Contratación',
    value: '18 días',
    change: { value: 12, type: 'decrease', period: 'mes anterior' },
    icon: Clock,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
  },
  {
    title: 'Costo por Contratación',
    value: '$2,450',
    change: { value: 15, type: 'decrease', period: 'trimestre anterior' },
    icon: DollarSign,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
  },
  {
    title: 'Fuentes Activas',
    value: 12,
    change: { value: 20, type: 'increase', period: 'mes anterior' },
    icon: Users,
    color: 'text-white',
    bgColor: 'bg-gradient-to-br from-lime-500 to-lime-600',
  },
];

const analyticsSections: AnalyticSection[] = [
  {
    id: 'pipeline',
    title: 'Análisis del Pipeline de Reclutamiento',
    description: 'Visualiza las tasas de conversión y el tiempo de permanencia de los candidatos en cada etapa del proceso.',
    href: '/hr/recruitment/analytics/pipeline',
    icon: PieChart,
    color: 'text-teal-600',
    badge: { status: 'info', text: '24% Conversión' },
    stats: [
      { label: 'Etapas', value: '6' },
      { label: 'Candidatos', value: '156' },
    ],
    priority: 'high',
  },
  {
    id: 'hiring',
    title: 'Métricas de Contratación',
    description: 'Analiza el tiempo promedio para contratar y el costo por contratación para optimizar el presupuesto y los recursos.',
    href: '/hr/recruitment/analytics/hiring-metrics',
    icon: BarChart2,
    color: 'text-emerald-600',
    badge: { status: 'success', text: '18 días promedio' },
    stats: [
      { label: 'Contrataciones', value: '8' },
      { label: 'Costo', value: '$2,450' },
    ],
    priority: 'high',
  },
  {
    id: 'source',
    title: 'Análisis de Fuente de Candidatos',
    description: 'Identifica las fuentes de reclutamiento más efectivas para atraer a los candidatos de mayor calidad.',
    href: '/hr/recruitment/analytics/source-analysis',
    icon: Users,
    color: 'text-green-600',
    badge: { status: 'active', text: '12 Fuentes' },
    stats: [
      { label: 'LinkedIn', value: '45%' },
      { label: 'Referidos', value: '32%' },
    ],
    priority: 'medium',
  },
  {
    id: 'trends',
    title: 'Tendencias Históricas',
    description: 'Compara el rendimiento del reclutamiento a lo largo del tiempo para detectar patrones y planificar a futuro.',
    href: '/hr/recruitment/analytics/historical-trends',
    icon: TrendingUp,
    color: 'text-lime-600',
    badge: { status: 'warning', text: '12 meses' },
    stats: [
      { label: 'Tendencia', value: '+8%' },
      { label: 'Proyección', value: '+12%' },
    ],
    priority: 'low',
  },
];

const tabs: Array<{ id: TabId; label: string; icon: React.ElementType; color: string }> = [
  { id: 'pipeline', label: 'Pipeline', icon: PieChart, color: 'teal' },
  { id: 'hiring', label: 'Contratación', icon: BarChart2, color: 'emerald' },
  { id: 'source', label: 'Fuentes', icon: Users, color: 'green' },
  { id: 'trends', label: 'Tendencias', icon: TrendingUp, color: 'lime' },
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

export default function AdminAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('pipeline');

  const currentSection = analyticsSections.find(s => s.id === activeTab) || analyticsSections[0];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-10 h-10 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1e293b]">Reportes y Analíticas</h1>
              <p className="text-xl text-[#4b5563]">Panel de Administración</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Exportar Rango
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Generar Reporte
            </button>
          </div>
        </div>

        <p className="text-[#4b5563] text-lg leading-relaxed mb-8 max-w-4xl">
          Obtén una visión estratégica del proceso de reclutamiento. Usa estos reportes para tomar decisiones basadas en datos y mejorar la eficiencia del equipo de talent management.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.change.type === 'increase' ? 'text-[#059669]' : 'text-[#ef4444]'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.change.type === 'decrease' ? 'rotate-180' : ''}`} />
                    {Math.abs(stat.change.value)}%
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

            {/* Chart Area Simulation */}
            <div className='mt-8 p-8 bg-gradient-to-br from-emerald-50/30 to-teal-50/20 border-2 border-emerald-100 rounded-xl text-center'>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-emerald-200">
                  {React.createElement(currentSection.icon, { className: `w-8 h-8 ${currentSection.color}` })}
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Contenido detallado del gráfico</p>
                  <p className="text-sm text-emerald-600 font-medium">{currentSection.title}</p>
                </div>
              </div>
              <p className='text-sm text-gray-500 mt-4'>(Simulación de área de visualización de datos complejos)</p>
              
              {/* Mock Chart Elements */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                  <p className="text-xs text-gray-600">Eficiencia</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-teal-100 shadow-sm">
                  <div className="w-12 h-12 bg-teal-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">+24%</p>
                  <p className="text-xs text-gray-600">Crecimiento</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}