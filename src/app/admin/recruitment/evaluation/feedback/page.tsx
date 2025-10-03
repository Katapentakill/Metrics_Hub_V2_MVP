// src/app/admin/recruitment/evaluation/feedback/page.tsx
'use client';

import { useState } from 'react';
import { 
  MessageSquare, Star, Clock, Users, Briefcase, 
  CheckCircle, Filter, Eye, PlusCircle, // Incluyendo PlusCircle
  AlertCircle 
} from 'lucide-react';

// --- DEFINICIONES DE COMPONENTES INTERNOS PARA RESOLVER ERRORES DE COMPILACIÓN ---

interface AdminPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  iconGradient: string;
  breadcrumbItems: { label: string; href?: string }[];
  headerActions: React.ReactNode;
  children: React.ReactNode;
}

// Minimal AdminPageLayout implementation (to satisfy the import)
const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({ title, subtitle, description, icon: Icon, iconGradient, breadcrumbItems, headerActions, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
        {/* Simplified Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 max-w-7xl mx-auto">
          {breadcrumbItems.map((item, index) => (
            <span key={index} className="flex items-center">
              {item.href ? (
                <a href={item.href} className="hover:text-green-600 transition-colors">{item.label}</a> // Usando <a> en lugar de Link
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
              {index < breadcrumbItems.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl text-white shadow-lg ${iconGradient}`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                        <p className="text-xl text-gray-600">{subtitle}</p>
                    </div>
                </div>
                {headerActions}
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mt-4 max-w-4xl">{description}</p>
        </div>
        <div className="max-w-7xl mx-auto">
            {children}
        </div>
    </div>
  );
};

// Minimal Button implementation (to satisfy the import)
const Button = ({ children, variant, size, onClick, className = '' }: any) => {
    let baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center';
    let variantStyle = 'bg-blue-600 text-white hover:bg-blue-700 shadow-md';
    if (variant === 'outline') {
        variantStyle = 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100';
    }
    if (size === 'sm') {
        baseStyle = 'px-3 py-2 text-sm rounded-lg font-semibold transition-all flex items-center justify-center';
    }
    
    return (
        <button className={`${baseStyle} ${variantStyle} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};
// --- FIN DEFINICIONES DE COMPONENTES INTERNOS ---


// Mock Data
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
      iconGradient="bg-gradient-to-br from-blue-500 to-purple-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/admin/recruitment' },
        { label: 'Evaluación', href: '/admin/recruitment/evaluation' },
        { label: 'Feedback del Equipo' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Gestionar Entrevistadores
          </Button>
        </div>
      }
    >
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-yellow-700 mb-1">Feedback Pendiente</p>
          <p className="text-3xl font-bold text-yellow-900">{mockFeedback.filter(f => f.status === 'Pendiente').length}</p>
        </div>
        <div className="bg-green-50 border border-green-300 rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-green-700 mb-1">Feedback Revisado</p>
          <p className="text-3xl font-bold text-green-900">{mockFeedback.filter(f => f.status === 'Revisado').length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-300 rounded-xl p-5 shadow-sm">
          <p className="text-sm font-medium text-blue-700 mb-1">Puntuación Promedio</p>
          <p className="text-3xl font-bold text-blue-900">{averageRating} <Star className="w-5 h-5 inline-block text-yellow-500 fill-current" /></p>
        </div>
      </div>
      
      {/* Main Content: Filter and List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Items de Feedback Recientes</h2>
          <div className="flex gap-4 items-center">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FeedbackItem['status'] | 'Todos')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500"
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
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-full border ${getStatusColor(item.status)}`}>
                  {item.status === 'Pendiente' ? <Clock className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.candidate}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {item.jobTitle}
                  </p>
                </div>
              </div>

              <div className="text-center w-40">
                <p className="text-sm font-medium text-gray-500">Evaluador</p>
                <p className="font-medium text-gray-700">{item.interviewer}</p>
              </div>

              <div className="text-center w-28">
                <p className="text-sm font-medium text-gray-500">Fecha</p>
                <p className="font-medium text-gray-700">{item.date}</p>
              </div>
              
              <div className="text-center w-36">
                <p className="text-sm font-medium text-gray-500 mb-1">Puntuación</p>
                <FeedbackStars rating={item.rating} />
              </div>

              <div className="w-40 flex justify-end">
                <Button size="sm" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
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
