'use client';
import { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Handshake,
  ExternalLink,
  Sparkles,
  Shield,
  Calendar,
  Download,
  Eye,
  Lock,
  Clock,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface SignedDocument {
  id: string;
  name: string;
  type: 'agreement' | 'nda' | 'policy' | 'contract';
  dateSigned: Date;
  link: string;
  expiryDate?: Date;
  status: 'active' | 'expired' | 'pending';
  description: string;
}

const mockDocuments: SignedDocument[] = [
  {
    id: '1',
    name: 'Acuerdo de Voluntariado',
    type: 'agreement',
    dateSigned: new Date('2025-09-20'),
    link: 'https://docs.google.com/document/d/abcdef12345',
    expiryDate: new Date('2026-09-20'),
    status: 'active',
    description: 'Acuerdo general de términos y condiciones del programa de voluntariado'
  },
  {
    id: '2',
    name: 'Acuerdo de Confidencialidad (NDA)',
    type: 'nda',
    dateSigned: new Date('2025-09-21'),
    link: 'https://docs.google.com/document/d/xyz987654',
    status: 'active',
    description: 'Compromiso de confidencialidad sobre información sensible de la organización'
  },
  {
    id: '3',
    name: 'Código de Conducta',
    type: 'policy',
    dateSigned: new Date('2025-09-22'),
    link: 'https://docs.google.com/document/d/conduct123',
    status: 'active',
    description: 'Normas de comportamiento y ética profesional en el entorno de trabajo'
  },
];

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const getTypeInfo = (type: string) => {
  switch (type) {
    case 'agreement':
      return {
        label: 'Acuerdo',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: Handshake
      };
    case 'nda':
      return {
        label: 'NDA',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Lock
      };
    case 'policy':
      return {
        label: 'Política',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: Shield
      };
    case 'contract':
      return {
        label: 'Contrato',
        color: 'bg-orange-100 text-orange-700 border-orange-200',
        icon: FileCheck
      };
    default:
      return {
        label: 'Documento',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: FileText
      };
  }
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'active':
      return {
        label: 'Activo',
        color: 'bg-green-100 text-green-700',
        icon: CheckCircle
      };
    case 'expired':
      return {
        label: 'Expirado',
        color: 'bg-red-100 text-red-700',
        icon: AlertCircle
      };
    case 'pending':
      return {
        label: 'Pendiente',
        color: 'bg-yellow-100 text-yellow-700',
        icon: Clock
      };
    default:
      return {
        label: 'Desconocido',
        color: 'bg-gray-100 text-gray-700',
        icon: FileText
      };
  }
};

const StatsCard = ({ icon: Icon, label, value, color = 'green' }: any) => (
  <div className="group relative bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-xl hover:border-green-200 transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2.5 rounded-lg bg-gradient-to-br from-${color}-50 to-${color}-100`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm font-medium text-gray-600">{label}</p>
  </div>
);

const DocumentCard = ({ doc }: any) => {
  const typeInfo = getTypeInfo(doc.type);
  const statusInfo = getStatusInfo(doc.status);
  const TypeIcon = typeInfo.icon;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative p-5 border-b border-gray-100 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-transparent rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-50 transition-opacity" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
              <TypeIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate text-base mb-1 group-hover:text-green-600 transition-colors">
                {doc.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeInfo.color}`}>
                  {typeInfo.label}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {doc.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Firmado:</span>
            <span>{formatDate(doc.dateSigned)}</span>
          </div>
          {doc.expiryDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Válido hasta:</span>
              <span>{formatDate(doc.expiryDate)}</span>
            </div>
          )}
        </div>

        {doc.status === 'active' && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Este documento está activo y en vigor
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 flex gap-2">
        <a
          href={doc.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Ver Documento
        </a>
        <button className="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-green-300">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function VolunteerSignedDocuments() {
  const [documents] = useState(mockDocuments);

  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    expiring: documents.filter(d => d.expiryDate && d.expiryDate < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <FileCheck className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">Acuerdos Firmados</h1>
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-gray-600 text-lg">Documentos oficiales y acuerdos que has firmado con la organización</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard icon={FileText} label="Total Documentos" value={stats.total} color="green" />
            <StatsCard icon={CheckCircle} label="Activos" value={stats.active} color="green" />
            <StatsCard icon={Clock} label="Por Renovar" value={stats.expiring} color="yellow" />
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Información Legal</h3>
              <p className="text-sm text-blue-700">Estos documentos son legalmente vinculantes. Guárdalos de forma segura y asegúrate de entender completamente su contenido. Si tienes dudas, contacta al equipo de HR.</p>
            </div>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No tienes acuerdos firmados</h3>
              <p className="text-gray-600">Cuando firmes documentos oficiales con la organización, aparecerán aquí</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(doc => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}