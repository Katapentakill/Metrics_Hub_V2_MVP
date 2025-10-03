// src/app/admin/documents/company-library/page.tsx
// src/app/admin/documents/company-library/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Upload, 
  Download,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  FileText,
  Image as ImageIcon,
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
// TABS CONFIGURATION
// ============================================================================

const tabs: TabConfig[] = [
  { 
    id: 'all', 
    label: 'All Documents', 
    icon: Files, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  },
  { 
    id: 'pdf', 
    label: 'PDFs', 
    icon: FileText, 
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  { 
    id: 'docx', 
    label: 'Word Docs', 
    icon: FileText, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    id: 'xlsx', 
    label: 'Spreadsheets', 
    icon: FileSpreadsheet, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  { 
    id: 'pptx', 
    label: 'Presentations', 
    icon: Presentation, 
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  { 
    id: 'image', 
    label: 'Images', 
    icon: ImageIcon, 
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
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
  {
    id: '7',
    name: 'Budget Report Q3.xlsx',
    type: 'xlsx',
    category: 'Finance',
    size: 789012,
    uploadedBy: 'Emily Brown',
    uploadedAt: new Date('2025-09-05'),
    downloads: 87,
    isFavorite: false,
    tags: ['budget', 'finance', 'quarterly'],
    description: 'Third quarter budget analysis and forecasts'
  },
  {
    id: '8',
    name: 'Annual Meeting Presentation.pptx',
    type: 'pptx',
    category: 'Events',
    size: 2345678,
    uploadedBy: 'Robert Taylor',
    uploadedAt: new Date('2025-08-18'),
    downloads: 203,
    isFavorite: true,
    tags: ['presentation', 'annual', 'meeting'],
    description: 'Slides for the annual stakeholder meeting'
  },
  {
    id: '9',
    name: 'Team Photo 2025.jpg',
    type: 'image',
    category: 'Photos',
    size: 3456789,
    uploadedBy: 'Alice Green',
    uploadedAt: new Date('2025-09-12'),
    downloads: 56,
    isFavorite: false,
    tags: ['photo', 'team', 'event'],
    description: 'Official team photo from annual gathering'
  },
  {
    id: '10',
    name: 'Logo Collection.zip',
    type: 'other',
    category: 'Branding',
    size: 12345678,
    uploadedBy: 'Mike Chen',
    uploadedAt: new Date('2025-08-25'),
    downloads: 134,
    isFavorite: false,
    tags: ['logo', 'branding', 'assets'],
    description: 'Complete logo package in various formats'
  },
  {
    id: '11',
    name: 'Volunteer Agreement Template.docx',
    type: 'docx',
    category: 'Legal',
    size: 234567,
    uploadedBy: 'Sarah Johnson',
    uploadedAt: new Date('2025-09-08'),
    downloads: 178,
    isFavorite: true,
    tags: ['legal', 'template', 'agreement'],
    description: 'Standard volunteer service agreement template'
  },
  {
    id: '12',
    name: 'Impact Report 2024.pdf',
    type: 'pdf',
    category: 'Reports',
    size: 4567890,
    uploadedBy: 'David Martinez',
    uploadedAt: new Date('2025-09-03'),
    downloads: 267,
    isFavorite: true,
    tags: ['impact', 'report', 'annual'],
    description: 'Complete annual impact report with statistics and stories'
  },
];

const categories = ['All Categories', 'HR Resources', 'Marketing', 'Templates', 'Administrative', 'Training', 'Safety', 'Finance', 'Events', 'Photos', 'Branding', 'Legal', 'Reports'];
const availableTags = ['handbook', 'hr', 'policies', 'brand', 'marketing', 'design', 'template', 'project', 'management', 'org-chart', 'training', 'onboarding', 'safety', 'compliance', 'budget', 'finance', 'quarterly', 'presentation', 'annual', 'meeting', 'photo', 'team', 'event', 'logo', 'branding', 'assets', 'legal', 'agreement', 'impact', 'report'];

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

const getFileIcon = (type: Document['type'], size: 'sm' | 'md' = 'md') => {
  const iconClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  switch (type) {
    case 'pdf':
      return <FileText className={`${iconClass} text-red-500`} />;
    case 'docx':
      return <FileText className={`${iconClass} text-blue-500`} />;
    case 'xlsx':
      return <FileSpreadsheet className={`${iconClass} text-green-500`} />;
    case 'pptx':
      return <Presentation className={`${iconClass} text-orange-500`} />;
    case 'image':
      return <ImageIcon className={`${iconClass} text-purple-500`} />;
    default:
      return <File className={`${iconClass} text-gray-500`} />;
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatsCard = ({ icon: Icon, label, value, trend, color = 'blue' }: { 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: string;
  color?: string;
}) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <Icon className={`w-5 h-5 text-${color}-500`} />
      {trend && (
        <span className="text-xs font-medium text-green-600 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

const DocumentCard = ({ doc, onToggleFavorite, onDownload }: {
  doc: Document;
  onToggleFavorite: (id: string) => void;
  onDownload: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    {/* Card Header */}
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            {getFileIcon(doc.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
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

    {/* Card Body */}
    <div className="p-4">
      {doc.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {doc.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full"
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

      {/* Metadata */}
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

      {/* Stats */}
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

    {/* Card Footer */}
    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <button
        onClick={() => onDownload(doc.id)}
        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
      <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
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
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      {/* File Icon */}
      <div className="p-3 bg-gray-50 rounded-lg">
        {getFileIcon(doc.type)}
      </div>

      {/* Document Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
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
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {doc.uploadedBy}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(doc.uploadedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {doc.downloads}
              </span>
              <span>{formatFileSize(doc.size)}</span>
            </div>
          </div>

          {/* Actions */}
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
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
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

  // Get documents count by type
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

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(doc => doc.type === activeTab);
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(doc => doc.category === filters.category);
    }

    // Favorites filter
    if (filters.showFavorites) {
      filtered = filtered.filter(doc => doc.isFavorite);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(doc =>
        filters.tags.some(tag => doc.tags.includes(tag))
      );
    }

    // Sort
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Company Library</h1>
              <p className="text-gray-600 mt-1">
                Documentos de referencia generales y recursos compartidos de la organización
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard
              icon={FileText}
              label="Documents Found"
              value={stats.totalDocuments}
              color="blue"
            />
            <StatsCard
              icon={Star}
              label="Favorites"
              value={stats.favorites}
              color="yellow"
            />
            <StatsCard
              icon={Download}
              label="Total Downloads"
              value={stats.totalDownloads}
              trend="+12%"
              color="green"
            />
            <StatsCard
              icon={Folder}
              label="Storage Used"
              value={formatFileSize(stats.totalSize)}
              color="purple"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
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
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
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

        {/* Filters & Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Upload Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Upload
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </div>
              </div>

              {/* Tags Filter */}
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
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                      {filters.tags.includes(tag) && <X className="inline w-3 h-3 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorites Toggle & Clear */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showFavorites}
                    onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Show Favorites Only</span>
                </label>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredDocuments.length}</span> of{' '}
            <span className="font-semibold">{documentCounts[activeTab]}</span> documents
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
          </p>
          {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0 || filters.showFavorites) && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Documents Display */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.category !== 'All Categories' || filters.tags.length > 0
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'documents'} available yet`
                }
              </p>
              {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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