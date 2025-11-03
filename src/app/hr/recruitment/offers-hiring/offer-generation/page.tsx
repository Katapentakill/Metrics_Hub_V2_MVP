// src/app/hr/recruitment/offers-hiring/offer-generation/page.tsx
'use client';

import React, { useState } from 'react';
import { Mail, User, Briefcase, Calendar, CheckCircle, Clock, AlertCircle, Send, ArrowRight, UserPlus, FileCheck } from 'lucide-react';

// --- Shared Components for Auto-Containment ---

// Reemplazo simplificado para '@/components/ui/button'
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

// Reemplazo simplificado para '@/modules/recruitment/hr/components/AdminPageLayout'
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

// Reemplazo simplificado para las Cards
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);
const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-5 pb-2">{children}</div>;
const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h3 className={`text-xl font-bold text-slate-800 ${className}`}>{children}</h3>
);
const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-5 pt-0">{children}</div>;


// --- Types and Mock Data ---

type OfferStatus = 'Pendiente' | 'Enviada' | 'Aceptada' | 'Rechazada' | 'Expirada';

interface OfferCandidate {
  id: number;
  name: string;
  job: string;
  department: string;
  offerDate: string;
  status: OfferStatus;
  salary: string;
  expiryDate: string;
}

const mockCandidates: OfferCandidate[] = [
  {
    id: 1,
    name: 'Sofía Reyes',
    job: 'Desarrollador Full Stack',
    department: 'Tecnología',
    offerDate: '2025-10-01',
    status: 'Pendiente',
    salary: '$65,000',
    expiryDate: '2025-10-08',
  },
  {
    id: 2,
    name: 'Javier Mendoza',
    job: 'Diseñador UX/UI',
    department: 'Diseño',
    offerDate: '2025-09-25',
    status: 'Aceptada',
    salary: '$58,000',
    expiryDate: '2025-10-02',
  },
  {
    id: 3,
    name: 'Martín Torres',
    job: 'Coordinador de Proyectos',
    department: 'Gestión de Proyectos',
    offerDate: '2025-10-02',
    status: 'Enviada',
    salary: '$50,000',
    expiryDate: '2025-10-09',
  },
  {
    id: 4,
    name: 'Laura Jiménez',
    job: 'Voluntario de Campo',
    department: 'Operaciones',
    offerDate: '2025-09-01',
    status: 'Rechazada',
    salary: 'N/A',
    expiryDate: '2025-09-07',
  },
];

// --- Status Helpers ---
const getStatusColor = (status: OfferStatus): string => {
  const colors: Record<OfferStatus, string> = {
    'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Enviada': 'bg-blue-100 text-blue-800 border-blue-300',
    'Aceptada': 'bg-green-100 text-green-800 border-green-300',
    'Rechazada': 'bg-red-100 text-red-800 border-red-300',
    'Expirada': 'bg-gray-100 text-gray-700 border-gray-300',
  };
  return colors[status];
};

// --- Page Component ---

export default function AdminOfferGenerationPage() {
  const [candidates, setCandidates] = useState<OfferCandidate[]>(mockCandidates);

  const handleSendOffer = (id: number) => {
    setCandidates(prev => prev.map(c => 
      c.id === id && c.status === 'Pendiente' ? { ...c, status: 'Enviada' as OfferStatus } : c
    ));
    console.log(`Oferta enviada al candidato ${id}`);
  };

  const handleAcceptOffer = (id: number) => {
    setCandidates(prev => prev.map(c => 
      c.id === id && (c.status === 'Enviada' || c.status === 'Pendiente') ? { ...c, status: 'Aceptada' as OfferStatus } : c
    ));
    console.log(`Oferta aceptada por el candidato ${id}`);
  };

  const pendingOffers = candidates.filter(c => c.status === 'Pendiente').length;
  const acceptedOffers = candidates.filter(c => c.status === 'Aceptada').length;

  return (
    <AdminPageLayout
      title="Generación y Seguimiento de Ofertas"
      subtitle="Módulo de Contratación"
      description="Supervisa el estado de todas las ofertas de empleo. Genera nuevas cartas de oferta y da seguimiento a las respuestas de los candidatos seleccionados."
      icon={Mail}
      headerActions={
        <div className="flex gap-3">
          <Button variant="default" size="md">
            <Send className="w-5 h-5 mr-2" />
            Generar Oferta Manual
          </Button>
          <a href="/hr/recruitment/offers-hiring/onboarding-management">
            <Button variant="outline" size="md">
                <UserPlus className="w-5 h-5 mr-2" />
                Ir a Onboarding
            </Button>
          </a>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Ofertas Pendientes</p>
              <p className="text-3xl font-bold text-slate-800">{pendingOffers}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Ofertas Enviadas</p>
              <p className="text-3xl font-bold text-slate-800">{candidates.filter(c => c.status === 'Enviada').length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600">Ofertas Aceptadas</p>
              <p className="text-3xl font-bold text-slate-800">{acceptedOffers}</p>
            </div>
            <div className="bg-emerald-600 p-3 rounded-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Rechazadas / Expiradas</p>
              <p className="text-3xl font-bold text-slate-800">{candidates.filter(c => c.status === 'Rechazada' || c.status === 'Expirada').length}</p>
            </div>
            <div className="bg-red-500 p-3 rounded-lg">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Offers Table/List */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Seguimiento de Ofertas</h2>
        
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="p-5 border border-slate-200 rounded-lg hover:shadow-md transition-shadow flex items-center justify-between bg-gray-50">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-800 p-1.5 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-slate-800 truncate">{candidate.name}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{candidate.job} ({candidate.department})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Oferta: {candidate.offerDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Vence: {candidate.expiryDate}</span>
                  </div>
                  <div className="font-semibold text-green-800">
                    {candidate.salary}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4 flex-shrink-0">
                {candidate.status === 'Pendiente' && (
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handleSendOffer(candidate.id)}
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Enviar Oferta
                  </Button>
                )}
                
                {(candidate.status === 'Enviada' || candidate.status === 'Pendiente') && (
                  <Button 
                    size="sm" 
                    variant="success"
                    onClick={() => handleAcceptOffer(candidate.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Marcar como Aceptada
                  </Button>
                )}
                
                {candidate.status === 'Aceptada' && (
                  <a href={`/hr/recruitment/offers-hiring/onboarding-management?candidate=${candidate.id}`}>
                    <Button 
                      size="sm" 
                      variant="default"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Iniciar Onboarding
                    </Button>
                  </a>
                )}
                
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-gray-500 hover:text-slate-800"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageLayout>
  );
}