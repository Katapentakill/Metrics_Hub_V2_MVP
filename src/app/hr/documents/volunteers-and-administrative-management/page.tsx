'use client';
import { useState, useMemo } from 'react';
import { 
  FolderOpen, 
  Search, 
  Filter, 
  Download,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  FileText,
  Folder,
  Star,
  Clock,
  Users,
  TrendingUp,
  ChevronDown,
  X,
  FileSpreadsheet,
  Presentation,
  Files,
  File,
  ExternalLink,
  Image,
  Sparkles,
  Edit,
  Trash2,
  Upload
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image' | 'other';
  category: string;
  documentType: 'volunteer-submissions' | 'employee-management';
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  downloads: number;
  isFavorite: boolean;
  tags: string[];
  description?: string;
  link?: string;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'downloads' | 'size';
type SortOrder = 'asc' | 'desc';
type DocumentType = 'all' | 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image' | 'other';
type FilterType = 'all' | 'volunteer-submissions' | 'employee-management';

interface FilterState {
  search: string;
  category: string;
  filterType: FilterType;
  tags: string[];
  showFavorites: boolean;
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Contrato de Voluntariado - Juan Pérez.pdf',
    type: 'pdf' as const,
    category: 'Contratos',
    documentType: 'volunteer-submissions',
    size: 456789,
    uploadedBy: 'Juan Pérez',
    uploadedAt: new Date('2025-09-20'),
    downloads: 15,
    isFavorite: false,
    tags: ['contrato', 'voluntario'],
    description: 'Contrato de voluntariado firmado',
    link: 'https://docs.google.com/document/d/1',
  },
  {
    id: '2',
    name: 'Registro de Asistencia - Septiembre.xlsx',
    type: 'xlsx' as const,
    category: 'Control',
    documentType: 'employee-management',
    size: 234567,
    uploadedBy: 'HR Department',
    uploadedAt: new Date('2025-09-25'),
    downloads: 45,
    isFavorite: true,
    tags: ['asistencia', 'registro'],
    description: 'Registro mensual de asistencia',
    link: 'https://docs.google.com/spreadsheets/d/1',
  },
];

const categories = ['Todas', 'Contratos', 'Control', 'Evaluaciones'];
const availableTags = ['contrato', 'voluntario', 'asistencia', 'registro'];

const formatFileSize = (bytes: number): string => {
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

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-500" />;
    case 'docx':
      return <FileText className="w-5 h-5 text-blue-500" />;
    case 'xlsx':
      return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    case 'pptx':
      return <Presentation className="w-5 h-5 text-orange-500" />;
    case 'image':
      return <Image className="w-5 h-5 text-purple-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
};

const StatsCard = ({ icon: Icon, label, value, trend }: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string | number; 
  trend?: string; 
}) => (
  <div className="group relative bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      {trend && (
        <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm font-medium text-gray-600">{label}</p>
  </div>
);

const DocumentCard = ({ doc, onToggleFavorite, onEdit, onDelete }: {
  doc: Document;
  onToggleFavorite: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
    <div className="relative p-5 border-b border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            {getFileIcon(doc.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate text-base mb-1">
              {doc.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                {doc.category}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                doc.documentType === 'volunteer-submissions' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {doc.documentType === 'volunteer-submissions' ? 'Voluntario' : 'Gestión'}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(doc.id)} className="p-2 hover:bg-yellow-50 rounded-lg">
          <Star className={`w-5 h-5 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </button>
      </div>
    </div>

    <div className="p-5">
      <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {doc.tags.map((tag: string) => (
          <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-600 truncate">{doc.uploadedBy}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">{formatDate(doc.uploadedAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">{doc.downloads}</span>
        </div>
        <div className="flex items-center gap-2">
          <File className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-600">{formatFileSize(doc.size)}</span>
        </div>
      </div>
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <a href={doc.link} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2">
        <ExternalLink className="w-4 h-4" />
        Abrir
      </a>
      <button onClick={() => onEdit(doc.id)} className="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300">
        <Edit className="w-4 h-4" />
      </button>
      <button onClick={() => onDelete(doc.id)} className="px-4 py-2.5 bg-white border-2 border-gray-200 text-red-600 rounded-lg hover:border-red-300">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function HRVolunteersAdminDocs() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'Todas',
    filterType: 'all',
    tags: [],
    showFavorites: false
  });

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (filters.filterType !== 'all') {
      filtered = filtered.filter(doc => doc.documentType === filters.filterType);
    }

    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.showFavorites) {
      filtered = filtered.filter(doc => doc.isFavorite);
    }

    return filtered;
  }, [documents, filters]);

  const handleToggleFavorite = (id: string) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc));
  };

  const stats = {
    total: documents.length,
    volunteer: documents.filter(d => d.documentType === 'volunteer-submissions').length,
    management: documents.filter(d => d.documentType === 'employee-management').length,
    favorites: documents.filter(d => d.isFavorite).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                <FolderOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">Gestión Administrativa y Voluntariado</h1>
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-gray-600 text-lg">Documentos de gestión administrativa y archivos de voluntarios</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard icon={FileText} label="Total" value={stats.total} />
            <StatsCard icon={Users} label="Voluntarios" value={stats.volunteer} />
            <StatsCard icon={Folder} label="Gestión" value={stats.management} trend="+8%" />
            <StatsCard icon={Star} label="Favoritos" value={stats.favorites} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar documentos..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>

            <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Subir
            </button>
          </div>

          {showFilters && (
            <div className="pt-6 border-t-2 border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  value={filters.filterType}
                  onChange={(e) => setFilters(prev => ({ ...prev, filterType: e.target.value }))}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="volunteer-submissions">Voluntarios</option>
                  <option value="employee-management">Gestión</option>
                </select>

                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.showFavorites}
                  onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                  className="w-4 h-4"
                />
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700">Solo Favoritos</span>
              </label>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map(doc => (
            <DocumentCard
              key={doc.id}
              doc={doc}
              onToggleFavorite={handleToggleFavorite}
              onEdit={() => console.log('edit', doc.id)}
              onDelete={() => setDocuments(docs => docs.filter(d => d.id !== doc.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}