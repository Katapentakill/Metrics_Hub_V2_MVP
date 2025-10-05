'use client';
import { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  UploadCloud, 
  Trash2, 
  ExternalLink,
  CheckCircle,
  Clock,
  Sparkles,
  AlertCircle,
  File,
  Download,
  Eye,
  Edit,
  Calendar,
  Folder
} from 'lucide-react';

interface ApplicationFile {
  id: string;
  name: string;
  type: 'CV' | 'Portafolio' | 'Certificado' | 'Carta';
  link: string;
  uploadDate: Date;
  size: number;
  status: 'approved' | 'pending' | 'revision';
}

const mockFiles: ApplicationFile[] = [
  {
    id: '1',
    name: 'Curriculum_Juan_Perez.pdf',
    type: 'CV',
    link: 'https://docs.google.com/document/d/123456789',
    uploadDate: new Date('2025-09-15'),
    size: 245678,
    status: 'approved'
  },
  {
    id: '2',
    name: 'Portfolio-online.link',
    type: 'Portafolio',
    link: 'https://www.mi-portafolio.com',
    uploadDate: new Date('2025-09-15'),
    size: 0,
    status: 'approved'
  },
  {
    id: '3',
    name: 'Certificado_Voluntariado.pdf',
    type: 'Certificado',
    link: 'https://docs.google.com/document/d/cert123',
    uploadDate: new Date('2025-09-20'),
    size: 567890,
    status: 'pending'
  },
];

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return 'Link externo';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'approved':
      return {
        label: 'Aprobado',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle
      };
    case 'pending':
      return {
        label: 'Pendiente',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: Clock
      };
    case 'revision':
      return {
        label: 'En Revisión',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: AlertCircle
      };
    default:
      return {
        label: 'Desconocido',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: File
      };
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'CV':
      return <Briefcase className="w-5 h-5 text-blue-500" />;
    case 'Portafolio':
      return <Folder className="w-5 h-5 text-purple-500" />;
    case 'Certificado':
      return <FileText className="w-5 h-5 text-green-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
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

const FileCard = ({ file, onDelete }: any) => {
  const statusInfo = getStatusInfo(file.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="relative p-5 border-b border-gray-100 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100 to-transparent rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-50 transition-opacity" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all">
              {getTypeIcon(file.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate text-base mb-1 group-hover:text-green-600 transition-colors">
                {file.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                  {file.type}
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{formatDate(file.uploadDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <File className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{formatFileSize(file.size)}</span>
          </div>
        </div>

        {file.status === 'approved' && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
            <p className="text-xs text-green-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Tu documento ha sido aprobado por el equipo de HR
            </p>
          </div>
        )}

        {file.status === 'pending' && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <p className="text-xs text-yellow-700 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              En espera de revisión por el equipo
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 flex gap-2">
        <a
          href={file.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Ver Documento
        </a>
        <button className="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-green-300">
          <Edit className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(file.id)}
          className="px-4 py-2.5 bg-white border-2 border-gray-200 text-red-600 rounded-lg hover:border-red-300"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function VolunteerApplicationFiles() {
  const [files, setFiles] = useState(mockFiles);

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este documento?')) {
      setFiles(files.filter(f => f.id !== id));
    }
  };

  const handleUpload = () => {
    console.log('Upload new file');
  };

  const stats = {
    total: files.length,
    approved: files.filter(f => f.status === 'approved').length,
    pending: files.filter(f => f.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">Mis Documentos de Postulación</h1>
                  <Sparkles className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-gray-600 text-lg">Gestiona los documentos de tu proceso de aplicación</p>
              </div>
            </div>
            <button
              onClick={handleUpload}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-xl transition-all flex items-center gap-2"
            >
              <UploadCloud className="w-5 h-5" />
              Subir Documento
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard icon={FileText} label="Total Documentos" value={stats.total} color="green" />
            <StatsCard icon={CheckCircle} label="Aprobados" value={stats.approved} color="green" />
            <StatsCard icon={Clock} label="Pendientes" value={stats.pending} color="yellow" />
          </div>
        </div>

        {files.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No tienes documentos</h3>
              <p className="text-gray-600 mb-6">Comienza subiendo tu CV o portafolio para iniciar tu proceso de aplicación</p>
              <button
                onClick={handleUpload}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all inline-flex items-center gap-2"
              >
                <UploadCloud className="w-5 h-5" />
                Subir Primer Documento
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Consejo</h3>
                  <p className="text-sm text-blue-700">Mantén tus documentos actualizados. Los documentos aprobados pueden ser vistos por los líderes de equipo durante el proceso de selección.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map(file => (
                <FileCard
                  key={file.id}
                  file={file}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}