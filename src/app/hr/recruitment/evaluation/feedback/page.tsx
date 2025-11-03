// src/app/hr/recruitment/evaluation/feedback/page.tsx
'use client';

import { useState } from 'react';
import { 
  MessageSquare, Star, Clock, Users, Briefcase, 
  CheckCircle, Filter, Eye, PlusCircle,
  AlertCircle 
} from 'lucide-react';

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

// --- Mock Data ---

interface FeedbackItem {
  id: number;
  candidate: string;
  jobTitle: string;
  interviewer: string;
  date: string;
  rating: number; // 1-5
  status: 'Pendiente' | 'Revisado' | 'Necesita Ajuste';
}

const mockFeedback: FeedbackItem[] = [
  { id: 1, candidate: 'Elena Ramírez', jobTitle: 'Desarrollador Full Stack', interviewer: 'Javier Solís', date: '2025-10-02', rating: 4, status: 'Pendiente' },
  { id: 2, candidate: 'Roberto Vega', jobTitle: 'Diseñador UX/UI', interviewer: 'Sofía Cruz', date: '2025-10-01', rating: 5, status: 'Pendiente' },
  { id: 3, candidate: 'Laura Montes', jobTitle: 'Coordinador de Voluntarios', interviewer: 'Ana García', date: '2025-09-30', rating: 3, status: 'Revisado' },
  { id: 4, candidate: 'Mario López', jobTitle: 'Especialista en Comunicaciones', interviewer: 'Carlos Méndez', date: '2025-09-29', rating: 2, status: 'Necesita Ajuste' },
];

const getStatusColor = (status: FeedbackItem['status']) => {
  switch (status) {
    case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Revisado': return 'bg-green-100 text-green-800 border-green-300';
    case 'Necesita Ajuste': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const FeedbackStars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 text-yellow-500">
    {[1, 2, 3, 4, 5].map(i => (
      <Star 
        key={i} 
        className={`w-4 h-4 fill-current ${i <= rating ? 'opacity-100' : 'opacity-30'}`} 
      />
    ))}
  </div>
);

export default function AdminFeedbackPage() {
  const [filterStatus, setFilterStatus] = useState<FeedbackItem['status'] | 'Todos'>('Pendiente');
  
  const filteredFeedback = mockFeedback.filter(item => 
    filterStatus === 'Todos' || item.status === filterStatus
  );

  // Cálculo de la Puntuación Promedio para las estadísticas
  const totalRating = mockFeedback.reduce((sum, item) => sum + item.rating, 0);
  const averageRating = mockFeedback.length > 0 ? (totalRating / mockFeedback.length).toFixed(1) : '0.0';

  return (
    <AdminPageLayout
      title="Feedback del Equipo"
      subtitle="Revisión y Auditoría de Calificaciones"
      description="Centraliza las calificaciones y comentarios de los entrevistadores. Asegura la objetividad y calidad en la fase de selección."
      icon={MessageSquare}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="md">
            <Users className="w-5 h-5 mr-2" />
            Gestionar Entrevistadores
          </Button>
        </div>
      }
    >
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Feedback Pendiente</p>
              <p className="text-3xl font-bold text-slate-800">{mockFeedback.filter(f => f.status === 'Pendiente').length}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Feedback Revisado</p>
              <p className="text-3xl font-bold text-slate-800">{mockFeedback.filter(f => f.status === 'Revisado').length}</p>
            </div>
            <div className="bg-emerald-600 p-3 rounded-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Puntuación Promedio</p>
              <p className="text-3xl font-bold text-slate-800">{averageRating} <Star className="w-5 h-5 inline-block text-yellow-500 fill-current" /></p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Star className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content: Filter and List */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Items de Feedback Recientes</h2>
          <div className="flex gap-4 items-center">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FeedbackItem['status'] | 'Todos')}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Pendiente">Pendiente de Revisión</option>
              <option value="Revisado">Revisado</option>
              <option value="Necesita Ajuste">Necesita Ajuste</option>
              <option value="Todos">Todos</option>
            </select>
            <Button size="sm" variant="outline">
                Auditar Todos
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFeedback.map(item => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-full border ${getStatusColor(item.status)}`}>
                  {item.status === 'Pendiente' ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.candidate}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {item.jobTitle}
                  </p>
                </div>
              </div>

              <div className="text-center w-40">
                <p className="text-sm font-medium text-gray-500">Evaluador</p>
                <p className="font-medium text-slate-800">{item.interviewer}</p>
              </div>

              <div className="text-center w-28">
                <p className="text-sm font-medium text-gray-500">Fecha</p>
                <p className="font-medium text-slate-800">{item.date}</p>
              </div>
              
              <div className="text-center w-36">
                <p className="text-sm font-medium text-gray-500 mb-1">Puntuación</p>
                <FeedbackStars rating={item.rating} />
              </div>

              <div className="w-40 flex justify-end">
                <Button size="sm" variant="secondary" className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  Revisar
                </Button>
              </div>
            </div>
          ))}
          {filteredFeedback.length === 0 && (
            <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
              <AlertCircle className="w-8 h-8 mx-auto mb-2" />
              <p>No hay feedback con el estado: {filterStatus}.</p>
            </div>
          )}
        </div>
      </div>
    </AdminPageLayout>
  );
}