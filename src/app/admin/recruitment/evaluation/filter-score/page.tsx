// src/app/admin/recruitment/evaluation/filter-score/page.tsx
'use client';

import React from 'react';
import { Sliders, Settings, CheckCircle, Clock, AlertCircle, TrendingUp, Users, PlusCircle, Trash2, Edit2 } from 'lucide-react';

// --- Shared Components for Auto-Containment ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'success' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-150';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    default: 'bg-gradient-to-br from-green-700 to-green-900 text-white hover:from-green-800 hover:to-green-950 shadow-md',
    secondary: 'bg-gradient-to-br from-green-400 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-700 shadow-md',
    success: 'bg-gradient-to-br from-emerald-600 to-green-700 text-white hover:from-emerald-700 hover:to-green-800 shadow-md',
    outline: 'bg-white text-gray-700 border border-slate-200 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-md',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  headerActions,
  children,
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <Icon className="w-10 h-10 text-green-800" />
          <div>
            <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
            <p className="text-xl text-gray-600">{subtitle}</p>
          </div>
        </div>
        {headerActions}
      </div>
      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl">{description}</p>
      {children}
    </div>
  </div>
);

// --- Page Logic and Mock Data ---

interface ScoringRule {
  id: number;
  name: string;
  trigger: string;
  weight: number;
  status: 'Activa' | 'Pausada';
  lastUpdated: string;
}

const mockRules: ScoringRule[] = [
  {
    id: 1,
    name: 'Filtro de Experiencia Mínima (Tech)',
    trigger: 'Si el candidato tiene > 3 años en desarrollo.',
    weight: 30,
    status: 'Activa',
    lastUpdated: '2025-09-30',
  },
  {
    id: 2,
    name: 'Puntuación por Habilidades Clave (Marketing)',
    trigger: 'Ponderación alta a habilidades de SEO/SEM.',
    weight: 25,
    status: 'Activa',
    lastUpdated: '2025-09-28',
  },
  {
    id: 3,
    name: 'Requisito de Título Universitario',
    trigger: 'Descalificación si no posee título universitario.',
    weight: 0, // Regla de descarte
    status: 'Pausada',
    lastUpdated: '2025-09-20',
  },
  {
    id: 4,
    name: 'Puntuación por Idioma (Inglés C1+)',
    trigger: 'Añade 15 puntos por nivel avanzado de Inglés.',
    weight: 15,
    status: 'Activa',
    lastUpdated: '2025-09-15',
  },
];

const mockStats = {
  totalRules: 12,
  activeRules: 9,
  candidatesProcessed: 156,
  averageScore: 78.5,
};

const getRuleColor = (status: ScoringRule['status']): string => {
  return status === 'Activa' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300';
};

export default function AdminFilterScorePage() {
  const [rules, setRules] = React.useState<ScoringRule[]>(mockRules);

  const handleDeleteRule = (id: number) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    console.log(`Regla ${id} eliminada.`);
  };
  
  const handleToggleRuleStatus = (id: number) => {
    setRules(prev => prev.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'Activa' ? 'Pausada' : 'Activa' }
        : rule
    ));
    console.log(`Estado de regla ${id} cambiado.`);
  };

  return (
    <AdminPageLayout
      title="Filtrado y Puntuación Automática"
      subtitle="Configuración y Auditoría"
      description="Configura el motor de puntuación de candidatos para clasificar las solicitudes basándose en reglas predefinidas de experiencia, habilidades y requisitos. Audita los resultados para garantizar la equidad."
      icon={Sliders}
      headerActions={
        <Button size="lg" variant="default">
          <PlusCircle className="w-5 h-5 mr-2" />
          Crear Nueva Regla
        </Button>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Reglas Activas</p>
              <p className="text-3xl font-bold text-slate-800">{mockStats.activeRules}</p>
            </div>
            <div className="bg-emerald-600 p-3 rounded-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total de Reglas</p>
              <p className="text-3xl font-bold text-slate-800">{mockStats.totalRules}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Sliders className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">Candidatos Procesados</p>
              <p className="text-3xl font-bold text-slate-800">{mockStats.candidatesProcessed}</p>
            </div>
            <div className="bg-teal-600 p-3 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Puntuación Promedio</p>
              <p className="text-3xl font-bold text-slate-800">{mockStats.averageScore}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Rules Management Section */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-green-800" />
          Reglas de Puntuación ({rules.length})
        </h2>
        
        {/* Table Header */}
        <div className="grid grid-cols-12 font-semibold text-gray-600 border-b border-slate-200 pb-3 mb-4 text-sm">
          <span className="col-span-4">Nombre y Disparador</span>
          <span className="col-span-2 text-center">Ponderación</span>
          <span className="col-span-2 text-center">Estado</span>
          <span className="col-span-2 text-center">Actualización</span>
          <span className="col-span-2 text-right">Acciones</span>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="grid grid-cols-12 items-center border border-slate-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              
              {/* Name and Trigger */}
              <div className="col-span-4">
                <p className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="bg-green-800 p-1 rounded inline-flex">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </span>
                    {rule.name}
                </p>
                <p className="text-sm text-gray-600 mt-1 pl-7">{rule.trigger}</p>
              </div>
              
              {/* Weight */}
              <div className="col-span-2 text-center">
                <span className={`text-lg font-bold ${rule.weight > 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {rule.weight}%
                </span>
              </div>
              
              {/* Status */}
              <div className="col-span-2 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRuleColor(rule.status)}`}>
                  {rule.status}
                </span>
              </div>
              
              {/* Last Updated */}
              <div className="col-span-2 text-center text-sm text-gray-600">
                {rule.lastUpdated}
              </div>
              
              {/* Actions */}
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleToggleRuleStatus(rule.id)}
                  title={rule.status === 'Activa' ? 'Pausar' : 'Activar'}
                >
                  {rule.status === 'Activa' ? (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-green-600" />
                  )}
                </Button>
                <Button variant="ghost" size="sm" title="Editar">
                  <Edit2 className="w-5 h-5 text-blue-500" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteRule(rule.id)} title="Eliminar">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          
          {rules.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Settings className="w-8 h-8 mx-auto mb-2" />
              <p>No hay reglas de puntuación configuradas. Crea una para empezar a clasificar candidatos automáticamente.</p>
            </div>
          )}
        </div>
      </div>

      {/* Audit and Testing Quick Access */}
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-800" />
              Auditoría de Puntuación
            </h3>
            <p className="text-gray-600">Revisa el historial de puntuaciones aplicadas y simula el impacto de las reglas antes de activarlas.</p>
          </div>
          <a href="/admin/recruitment/evaluation/audit">
            <Button size="lg" variant="default">
              <TrendingUp className="w-5 h-5 mr-2" />
              Realizar Auditoría
            </Button>
          </a>
        </div>
      </div>

    </AdminPageLayout>
  );
}