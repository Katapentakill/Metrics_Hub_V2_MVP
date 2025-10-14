// src/app/admin/documents/company-library/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  FileText,
  ImageIcon,
  File,
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
  Files
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image' | 'other';
  category: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  downloads: number;
  isFavorite: boolean;
  tags: string[];
  description?: string;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'downloads' | 'size';
type SortOrder = 'asc' | 'desc';
type DocumentType = 'all' | 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image' | 'other';

interface FilterState {
  search: string;
  category: string;
  dateRange: string;
  tags: string[];
  showFavorites: boolean;
}

interface TabConfig {
  id: DocumentType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

// ============================================================================
// TABS CONFIGURATION - Escala de Verdes Institucional
// ============================================================================

const tabs: TabConfig[] = [
  { 
    id: 'all', 
    label: 'All Documents', 
    icon: Files, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  { 
    id: 'pdf', 
    label: 'PDFs', 
    icon: FileText, 
    color: 'text-[#166534]', // green-800
    bgColor: 'bg-green-50'
  },
  { 
    id: 'docx', 
    label: 'Word Docs', 
    icon: FileText, 
    color: 'text-[#059669]', // emerald
    bgColor: 'bg-emerald-50'
  },
  { 
    id: 'xlsx', 
    label: 'Spreadsheets', 
    icon: FileSpreadsheet, 
    color: 'text-[#14b8a6]', // teal
    bgColor: 'bg-teal-50'
  },
  { 
    id: 'pptx', 
    label: 'Presentations', 
    icon: Presentation, 
    color: 'text-[#84cc16]', // lime
    bgColor: 'bg-lime-50'
  },
  { 
    id: 'image', 
    label: 'Images', 
    icon: ImageIcon, 
    color: 'text-[#14b8a6]', // teal
    bgColor: 'bg-teal-50'
  },
];

// ============================================================================
// MOCK DATA
// ============================================================================

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Employee Handbook 2025.pdf',
    type: 'pdf',
    category: 'HR Resources',
    size: 2456789,
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2025-09-15'),
    downloads: 234,
    isFavorite: true,
    tags: ['handbook', 'hr', 'policies'],
    description: 'Complete employee handbook with updated policies and procedures'
  },
  {
    id: '2',
    name: 'Brand Guidelines.pdf',
    type: 'pdf',
    category: 'Marketing',
    size: 5678901,
    uploadedBy: 'Mike Chen',
    uploadedAt: new Date('2025-08-22'),
    downloads: 189,
    isFavorite: true,
    tags: ['brand', 'marketing', 'design'],
    description: 'Official brand guidelines including logos, colors, and typography'
  },
  {
    id: '3',
    name: 'Project Management Template.xlsx',
    type: 'xlsx',
    category: 'Templates',
    size: 345678,
    uploadedBy: 'Lisa Wang',
    uploadedAt: new Date('2025-09-01'),
    downloads: 156,
    isFavorite: false,
    tags: ['template', 'project', 'management'],
    description: 'Standardized project management tracking template'
  },
  {
    id: '4',
    name: 'Organization Chart 2025.pptx',
    type: 'pptx',
    category: 'Administrative',
    size: 1234567,
    uploadedBy: 'David Martinez',
    uploadedAt: new Date('2025-09-10'),
    downloads: 98,
    isFavorite: false,
    tags: ['org-chart', 'structure'],
    description: 'Current organizational structure and reporting lines'
  },
  {
    id: '5',
    name: 'Training Materials - Onboarding.pdf',
    type: 'pdf',
    category: 'Training',
    size: 3456789,
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2025-09-20'),
    downloads: 167,
    isFavorite: true,
    tags: ['training', 'onboarding', 'hr'],
    description: 'Comprehensive onboarding materials for new volunteers'
  },
  {
    id: '6',
    name: 'Safety Protocols.docx',
    type: 'docx',
    category: 'Safety',
    size: 456789,
    uploadedBy: 'John Smith',
    uploadedAt: new Date('2025-08-30'),
    downloads: 145,
    isFavorite: false,
    tags: ['safety', 'protocols', 'compliance'],
    description: 'Standard safety protocols and emergency procedures'
  },
];

const categories = ['All Categories', 'HR Resources', 'Marketing', 'Templates', 'Administrative', 'Training', 'Safety', 'Finance', 'Events', 'Photos', 'Branding', 'Legal', 'Reports'];
const availableTags = ['handbook', 'hr', 'policies', 'brand', 'marketing', 'design', 'template', 'project', 'management', 'org-chart', 'training', 'onboarding', 'safety', 'compliance'];

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

// Iconos con FONDO de escala de verdes e ICONO BLANCO (según guía)
const getFileIcon = (type: Document['type'], size: 'sm' | 'md' = 'md') => {
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
    case 'image':
      return <ImageIcon className={`${iconClass} text-white`} />;
    default:
      return <File className={`${iconClass} text-white`} />;
  }
};

// Función para obtener el fondo del icono según tipo de documento
const getIconBackground = (type: Document['type']): string => {
  switch (type) {
    case 'pdf':
      return 'bg-[#166534]'; // green-800
    case 'docx':
      return 'bg-[#059669]'; // emerald
    case 'xlsx':
      return 'bg-[#14b8a6]'; // teal
    case 'pptx':
      return 'bg-[#84cc16]'; // lime
    case 'image':
      return 'bg-[#14b8a6]'; // teal
    default:
      return 'bg-gray-500';
  }
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
            <span className="text-gray-600 ml-1">vs período anterior</span>
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
  doc: Document;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50/30 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* ICONO: Fondo verde de la escala, icono blanco */}
          <div className={`p-2 ${getIconBackground(doc.type)} rounded-lg`}>
            {getFileIcon(doc.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate group-hover:text-[#166534] transition-colors">
              {doc.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{doc.category}</p>
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
      {doc.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
      )}
      
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
          <File className="w-3 h-3" />
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
  doc: Document;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      {/* ICONO: Fondo verde de la escala, icono blanco */}
      <div className={`p-3 ${getIconBackground(doc.type)} rounded-lg`}>
        {getFileIcon(doc.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 mb-1 hover:text-[#166534] transition-colors cursor-pointer">
              {doc.name}
            </h3>
            {doc.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">{doc.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
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
              className="px-4 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center gap-2"
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CompanyLibrary() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [activeTab, setActiveTab] = useState<DocumentType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    dateRange: 'all',
    tags: [],
    showFavorites: false
  });
  const [showFilters, setShowFilters] = useState(false);

  const documentCounts = useMemo(() => {
    const counts: Record<DocumentType, number> = {
      all: documents.length,
      pdf: documents.filter(d => d.type === 'pdf').length,
      docx: documents.filter(d => d.type === 'docx').length,
      xlsx: documents.filter(d => d.type === 'xlsx').length,
      pptx: documents.filter(d => d.type === 'pptx').length,
      image: documents.filter(d => d.type === 'image').length,
      other: documents.filter(d => d.type === 'other').length,
    };
    return counts;
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (activeTab !== 'all') {
      filtered = filtered.filter(doc => doc.type === activeTab);
    }

    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(doc => doc.category === filters.category);
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
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [documents, activeTab, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  const handleDownload = (id: string) => {
    console.log('Downloading document:', id);
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      dateRange: 'all',
      tags: [],
      showFavorites: false
    });
  };

  const stats = {
    totalDocuments: filteredDocuments.length,
    favorites: documents.filter(d => d.isFavorite).length,
    totalDownloads: documents.reduce((sum, d) => sum + d.downloads, 0),
    totalSize: documents.reduce((sum, d) => sum + d.size, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-[#166534]" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Company Library</h1>
              <p className="text-gray-600 mt-1">
                Documentos de referencia generales y recursos compartidos de la organización
              </p>
            </div>
          </div>

          {/* Stats Cards - cada una con diferente fondo de verde */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatsCard
              icon={FileText}
              label="Documents Found"
              value={stats.totalDocuments}
              iconBg="bg-gradient-to-br from-[#166534] to-[#14532d]"
            />
            <StatsCard
              icon={Star}
              label="Favorites"
              value={stats.favorites}
              iconBg="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatsCard
              icon={Download}
              label="Total Downloads"
              value={stats.totalDownloads}
              trend="+12%"
              iconBg="bg-gradient-to-br from-teal-500 to-teal-600"
            />
            <StatsCard
              icon={Folder}
              label="Storage Used"
              value={formatFileSize(stats.totalSize)}
              iconBg="bg-gradient-to-br from-emerald-400 to-emerald-500"
            />
          </div>
        </div>

        {/* Tabs - Escala de Verdes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const count = documentCounts[tab.id];
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap
                    border-b-2 flex-shrink-0
                    ${isActive 
                      ? `${tab.color} border-current ${tab.bgColor}` 
                      : 'text-gray-600 border-transparent hover:text-slate-800 hover:bg-gray-50'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-semibold
                    ${isActive 
                      ? 'bg-white shadow-sm' 
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
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
                      <option value="size">Size</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.slice(0, 12).map(tag => (
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

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredDocuments.length}</span> of{' '}
            <span className="font-semibold">{documentCounts[activeTab]}</span> documents
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
          </p>
          {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0 || filters.showFavorites) && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#22c55e] hover:text-[#059669] font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.category !== 'All Categories' || filters.tags.length > 0
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'documents'} available yet`
                }
              </p>
              {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0) && (
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
        ) : (
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
        )}
      </div>
    </div>
  );
}