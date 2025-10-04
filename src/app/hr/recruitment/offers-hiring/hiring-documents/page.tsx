// src/app/hr/recruitment/offers-hiring/hiring-documents/page.tsx
'use client';

import React, { useState } from 'react';
import { Mail, User, Briefcase, Calendar, CheckCircle, Clock, FileText, Upload, Download, Eye, XCircle, FilePlus, FileCheck } from 'lucide-react';

// --- Shared Components for Auto-Containment ---

// Reemplazo simplificado para '@/components/ui/button'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
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
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
    outline: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
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
  iconGradient: string;
  breadcrumbItems: { label: string; href?: string }[];
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  iconGradient,
  breadcrumbItems,
  headerActions,
  children,
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="p-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <a href={item.href} className="hover:text-indigo-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
            {index < breadcrumbItems.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
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
      <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl">{description}</p>
      {children}
    </div>
  </div>
);

// Reemplazo simplificado para las Cards
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);
const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-5 pb-2">{children}</div>;
const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>
);
const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="p-5 pt-0">{children}</div>;


// --- Types and Mock Data ---

type DocumentStatus = 'Pendiente' | 'Firmado' | 'Cargado' | 'Rechazado';

interface DocumentRecord {
  id: number;
  name: string;
  candidate: string;
  type: string;
  uploadDate: string;
  status: DocumentStatus;
}

const mockDocuments: DocumentRecord[] = [
  {
    id: 1,
    name: 'Contrato Full Stack (Sofía R.)',
    candidate: 'Sofía Reyes',
    type: 'Contrato de Empleo',
    uploadDate: '2025-10-02',
    status: 'Firmado',
  },
  {
    id: 2,
    name: 'Acuerdo de Confidencialidad (Javier M.)',
    candidate: 'Javier Mendoza',
    type: 'NDA',
    uploadDate: '2025-09-28',
    status: 'Cargado',
  },
  {
    id: 3,
    name: 'Formulario de Onboarding (Martín T.)',
    candidate: 'Martín Torres',
    type: 'Formulario HR',
    uploadDate: '2025-10-03',
    status: 'Pendiente',
  },
  {
    id: 4,
    name: 'Copia ID - Laura J.',
    candidate: 'Laura Jiménez',
    type: 'Identificación',
    uploadDate: '2025-09-01',
    status: 'Rechazado',
  },
];

// --- Status Helper ---
const getStatusColor = (status: DocumentStatus): string => {
  const colors: Record<DocumentStatus, string> = {
    'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Firmado': 'bg-green-100 text-green-800 border-green-300',
    'Cargado': 'bg-blue-100 text-blue-800 border-blue-300',
    'Rechazado': 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[status];
};

// --- Page Component ---

export default function AdminHiringDocumentsPage() {
  const totalDocuments = mockDocuments.length;
  const pendingSignature = mockDocuments.filter(d => d.status === 'Pendiente').length;
  const signedDocuments = mockDocuments.filter(d => d.status === 'Firmado').length;

  return (
    <AdminPageLayout
      title="Documentación de Contratación"
      subtitle="Módulo de Cumplimiento"
      description="Supervisa y gestiona todos los documentos legales y de recursos humanos de los nuevos contratados y voluntarios. Asegura que todos los archivos estén cargados y firmados."
      icon={FileCheck}
      iconGradient="bg-gradient-to-br from-green-500 to-teal-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/hr/recruitment' },
        { label: 'Oferta y Contratación', href: '/hr/recruitment/offers-hiring' },
        { label: 'Documentación' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="default" size="md" className="bg-green-600 hover:bg-green-700">
            <Upload className="w-5 h-5 mr-2" />
            Subir Documento
          </Button>
          <Button variant="outline" size="md">
            <FilePlus className="w-5 h-5 mr-2" />
            Crear Plantilla
          </Button>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Documentos</p>
              <p className="text-3xl font-bold text-gray-900">{totalDocuments}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white border border-yellow-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pendientes de Firma</p>
              <p className="text-3xl font-bold text-gray-900">{pendingSignature}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white border border-green-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Documentos Firmados</p>
              <p className="text-3xl font-bold text-gray-900">{signedDocuments}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Archivos Rechazados</p>
              <p className="text-3xl font-bold text-gray-900">{mockDocuments.filter(d => d.status === 'Rechazado').length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Archivos Recientes</h2>
        
        <div className="space-y-4">
          {mockDocuments.map((doc) => (
            <div key={doc.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow flex items-center justify-between bg-gray-50">
              <div className="flex-1 min-w-0 flex items-center gap-4">
                <FileText className="w-6 h-6 text-indigo-500 flex-shrink-0" />
                <div>
                  <div className="text-lg font-semibold text-gray-900 truncate">{doc.name}</div>
                  <div className="text-sm text-gray-600">
                    {doc.type} | Candidato: <span className="font-medium text-gray-800">{doc.candidate}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-sm text-gray-500">
                  Cargado el: {doc.uploadDate}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-blue-600 hover:bg-blue-50"
                    title="Ver/Previsualizar Documento"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-600 hover:bg-gray-100"
                    title="Descargar Archivo"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageLayout>
  );
}
