// src/app/hr/documents/hiring-onboarding/page.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  UserPlus,
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
  Plus,
  X,
  FileSpreadsheet,
  Presentation,
  Files,
  CheckCircle,
  AlertCircle,
  Minimize2
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface HiringDocument {
  id: string;
  name: string;
  description: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'template';
  category: 'Job Descriptions' | 'Interview Guides' | 'Onboarding' | 'Legal Forms' | 'Training' | 'Other';
  uploadedBy: string;
  uploadedAt: Date;
  downloads: number;
  isFavorite: boolean;
  status: 'active' | 'archived' | 'draft';
  tags: string[];
  size: number;
}

type ViewMode = 'grid' | 'list' | 'minimalist';
type SortBy = 'name' | 'date' | 'downloads';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  category: string;
  status: string;
  showFavorites: boolean;
  tags: string[];
}

// ============================================================================
// MOCK DATA & CONSTANTS
// ============================================================================

const categories = ['All Categories', 'Job Descriptions', 'Interview Guides', 'Onboarding', 'Legal Forms', 'Training', 'Other'];
const statusOptions = ['All Status', 'active', 'archived', 'draft'];
const availableTags = ['template', 'required', 'legal', 'checklist', 'guide', 'form', 'contract', 'orientation', 'training', 'evaluation'];

const mockDocuments: HiringDocument[] = [
  {
    id: '1',
    name: 'Volunteer Position Template',
    description: 'Plantilla estándar para crear descripciones de posiciones de voluntariado.',
    type: 'docx',
    category: 'Job Descriptions',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2025-09-15'),
    downloads: 89,
    isFavorite: true,
    status: 'active',
    tags: ['template', 'required'],
    size: 245678
  },
  {
    id: '2',
    name: 'Interview Questions - Leadership Roles',
    description: 'Guía de preguntas para entrevistas de roles de liderazgo en la organización.',
    type: 'pdf',
    category: 'Interview Guides',
    uploadedBy: 'Mike Chen',
    uploadedAt: new Date('2025-08-22'),
    downloads: 134,
    isFavorite: true,
    status: 'active',
    tags: ['guide', 'checklist'],
    size: 567890
  },
  {
    id: '3',
    name: 'Onboarding Checklist - New Volunteers',
    description: 'Lista de verificación completa para la incorporación de nuevos voluntarios.',
    type: 'xlsx',
    category: 'Onboarding',
    uploadedBy: 'Lisa Wang',
    uploadedAt: new Date('2025-09-01'),
    downloads: 178,
    isFavorite: true,
    status: 'active',
    tags: ['checklist', 'required', 'orientation'],
    size: 123456
  },
  {
    id: '4',
    name: 'Volunteer Agreement Form',
    description: 'Formulario legal de acuerdo de servicio voluntario.',
    type: 'pdf',
    category: 'Legal Forms',
    uploadedBy: 'David Martinez',
    uploadedAt: new Date('2025-09-10'),
    downloads: 267,
    isFavorite: true,
    status: 'active',
    tags: ['legal', 'required', 'form', 'contract'],
    size: 345678
  },
  {
    id: '5',
    name: 'First Week Orientation Guide',
    description: 'Guía detallada para la primera semana de nuevos miembros del equipo.',
    type: 'pptx',
    category: 'Onboarding',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2025-09-20'),
    downloads: 145,
    isFavorite: false,
    status: 'active',
    tags: ['orientation', 'guide', 'training'],
    size: 2345678
  },
  {
    id: '6',
    name: 'Background Check Policy',
    description: 'Política y procedimientos para verificación de antecedentes.',
    type: 'pdf',
    category: 'Legal Forms',
    uploadedBy: 'John Smith',
    uploadedAt: new Date('2025-08-30'),
    downloads: 98,
    isFavorite: false,
    status: 'active',
    tags: ['legal', 'required'],
    size: 456789
  },
  {
    id: '7',
    name: 'Training Schedule Template',
    description: 'Plantilla para programar sesiones de capacitación inicial.',
    type: 'xlsx',
    category: 'Training',
    uploadedBy: 'Emily Brown',
    uploadedAt: new Date('2025-09-05'),
    downloads: 67,
    isFavorite: false,
    status: 'active',
    tags: ['template', 'training'],
    size: 234567
  },
  {
    id: '8',
    name: 'Job Description - Event Coordinator (DRAFT)',
    description: 'Descripción de puesto en borrador para coordinador de eventos.',
    type: 'docx',
    category: 'Job Descriptions',
    uploadedBy: 'Robert Taylor',
    uploadedAt: new Date('2025-10-01'),
    downloads: 12,
    isFavorite: false,
    status: 'draft',
    tags: ['template'],
    size: 198765
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// Iconos con FONDO de escala de verdes e ICONO BLANCO
const getFileIcon = (type: HiringDocument['type'], size: 'sm' | 'md' = 'md') => {
  const iconClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  switch (type) {
    case 'pdf':
      return <FileText className={`${iconClass} text-white`} />;
    case 'docx':
      return <FileText className={`${iconClass} text-white`} />;
    case 'xlsx':
      return <FileSpreadsheet className={`${iconClass} text-white`} />;
    case 'pptx':
      return <Presentation className={`${iconClass} text-white`} />;
    case 'template':
      return <Files className={`${iconClass} text-white`} />;
    default:
      return <FileText className={`${iconClass} text-white`} />;
  }
};

const getIconBackground = (type: HiringDocument['type']): string => {
  switch (type) {
    case 'pdf':
      return 'bg-[#166534]'; // green-800
    case 'docx':
      return 'bg-[#059669]'; // emerald
    case 'xlsx':
      return 'bg-[#14b8a6]'; // teal
    case 'pptx':
      return 'bg-[#84cc16]'; // lime
    case 'template':
      return 'bg-[#22c55e]'; // green-500
    default:
      return 'bg-gray-500';
  }
};

const getStatusBadge = (status: HiringDocument['status']) => {
  const config = {
    active: { color: 'bg-green-50 text-[#166534] border-green-200', icon: CheckCircle, label: 'Active' },
    draft: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertCircle, label: 'Draft' },
    archived: { color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Folder, label: 'Archived' }
  };
  
  const { color, icon: Icon, label } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatsCard = ({ icon: Icon, label, value, trend, iconBg }: { 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: string;
  iconBg: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-[#059669] transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {trend && (
          <div className="flex items-center mt-2 text-sm">
            <TrendingUp className="w-4 h-4 mr-1 text-emerald-600" />
            <span className="text-emerald-600">{trend}</span>
            <span className="text-gray-600 ml-1">vs last month</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center shadow-sm`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const DocumentCard = ({ doc, onToggleFavorite, onDownload }: {
  doc: HiringDocument;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50/30 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-2 ${getIconBackground(doc.type)} rounded-lg`}>
            {getFileIcon(doc.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate group-hover:text-[#166534] transition-colors">
              {doc.name}
            </h3>
            <p className="text-xs text-[#059669] mt-1">{doc.category}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(doc.id)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Star 
            className={`w-5 h-5 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </div>

    <div className="p-4">
      <div className="mb-3">
        {getStatusBadge(doc.status)}
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {doc.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-green-50 text-[#166534] text-xs rounded-full border border-green-200"
          >
            {tag}
          </span>
        ))}
        {doc.tags.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{doc.tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{doc.uploadedBy}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(doc.uploadedAt)}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          <span>{doc.downloads}</span>
        </div>
        <div className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          <span>{formatFileSize(doc.size)}</span>
        </div>
      </div>
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <button
        onClick={() => onDownload(doc.id)}
        className="flex-1 px-3 py-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
      <button className="px-3 py-2 bg-white border border-slate-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
        View
      </button>
    </div>
  </div>
);

const DocumentListItem = ({ doc, onToggleFavorite, onDownload }: {
  doc: HiringDocument;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      <div className={`p-3 ${getIconBackground(doc.type)} rounded-lg`}>
        {getFileIcon(doc.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-800 hover:text-[#166534] transition-colors cursor-pointer">
                {doc.name}
              </h3>
              {getStatusBadge(doc.status)}
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{doc.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {doc.tags.slice(0, 5).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-green-50 text-[#166534] text-xs rounded-full border border-green-200">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 text-[#059669]">
                <Folder className="w-3 h-3" />
                {doc.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {doc.uploadedBy}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(doc.uploadedAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {doc.downloads}
              </span>
              <span>•</span>
              <span>{formatFileSize(doc.size)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(doc.id)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Star 
                className={`w-5 h-5 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
              />
            </button>
            <button
              onClick={() => onDownload(doc.id)}
              className="px-4 py-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DocumentMinimalistItem = ({ doc, onToggleFavorite, onDownload }: {
  doc: HiringDocument;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:border-[#059669] hover:shadow-sm transition-all duration-150 p-3">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`p-1.5 ${getIconBackground(doc.type)} rounded`}>
          {getFileIcon(doc.type, 'sm')}
        </div>
        <h3 className="font-medium text-gray-800 text-sm truncate hover:text-[#166534] transition-colors cursor-pointer">
          {doc.name}
        </h3>
        <span className="text-xs text-[#166534] bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-flex border border-green-200">
          {doc.category}
        </span>
        {getStatusBadge(doc.status)}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 text-xs text-gray-500 hidden lg:flex">
          <Download className="w-3 h-3" />
          <span>{doc.downloads}</span>
        </div>
        <button
          onClick={() => onToggleFavorite(doc.id)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
        <button
          onClick={() => onDownload(doc.id)}
          className="p-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HRHiringOnboardingPage() {
  const [documents, setDocuments] = useState<HiringDocument[]>(mockDocuments);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    showFavorites: false,
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(doc => doc.category === filters.category);
    }

    if (filters.status !== 'All Status') {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    if (filters.showFavorites) {
      filtered = filtered.filter(doc => doc.isFavorite);
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(doc =>
        filters.tags.some(tag => doc.tags.includes(tag))
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = a.uploadedAt.getTime() - b.uploadedAt.getTime();
          break;
        case 'downloads':
          comparison = a.downloads - b.downloads;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [documents, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc));
  };

  const handleDownload = (id: string) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, downloads: doc.downloads + 1 } : doc));
    console.log('Downloading document:', id);
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      status: 'All Status',
      showFavorites: false,
      tags: []
    });
  };

  const stats = {
    total: documents.length,
    favorites: documents.filter(d => d.isFavorite).length,
    totalDownloads: documents.reduce((sum, d) => sum + d.downloads, 0),
    active: documents.filter(d => d.status === 'active').length
  };

  const isFilterActive = filters.search || filters.category !== 'All Categories' || filters.status !== 'All Status' || filters.showFavorites || filters.tags.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <UserPlus className="w-10 h-10 text-[#166534]" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Hiring & Onboarding</h1>
              <p className="text-gray-600 mt-1">
                Documentos esenciales para el proceso de contratación e incorporación de nuevos empleados y voluntarios
              </p>
            </div>
          </div>
          
          {/* Stats Cards - tonos verdes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatsCard
              icon={Files}
              label="Total Documents"
              value={stats.total}
              iconBg="bg-gradient-to-br from-[#166534] to-[#14532d]"
            />
            <StatsCard
              icon={Star}
              label="Favorites"
              value={stats.favorites}
              iconBg="bg-gradient-to-br from-lime-400 to-lime-500"
            />
            <StatsCard
              icon={Download}
              label="Total Downloads"
              value={stats.totalDownloads}
              trend="+18%"
              iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600"
            />
            <StatsCard
              icon={CheckCircle}
              label="Active Docs"
              value={stats.active}
              iconBg="bg-gradient-to-br from-teal-500 to-teal-600"
            />
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-50 text-[#166534]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-50 text-[#166534]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('minimalist')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'minimalist'
                    ? 'bg-green-50 text-[#166534]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Upload
            </button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    >
                      <option value="name">Name</option>
                      <option value="date">Date</option>
                      <option value="downloads">Downloads</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        filters.tags.includes(tag)
                          ? 'bg-green-50 text-[#166534] border-2 border-[#166534]'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                      {filters.tags.includes(tag) && <X className="inline w-3 h-3 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showFavorites}
                    onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                    className="w-4 h-4 text-[#166534] rounded focus:ring-2 focus:ring-[#166534]"
                  />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Show Favorites Only</span>
                </label>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#22c55e] hover:text-[#059669] font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredDocuments.length}</span> of{' '}
            <span className="font-semibold">{documents.length}</span> documents
          </p>
          {isFilterActive && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#22c55e] hover:text-[#059669] font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Documents Display */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              {isFilterActive && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#14532d] transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onToggleFavorite={handleToggleFavorite}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredDocuments.map(doc => (
              <DocumentListItem
                key={doc.id}
                doc={doc}
                onToggleFavorite={handleToggleFavorite}
                onDownload={handleDownload}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map(doc => (
              <DocumentMinimalistItem
                key={doc.id}
                doc={doc}
                onToggleFavorite={handleToggleFavorite}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}