// src/app/hr/documents/company-library/page.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  Users,
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
  User,
  TrendingUp,
  ChevronDown,
  Plus,
  X,
  CheckCircle,
  AlertTriangle,
  Eye,
  Calendar,
  Files,
  FileCheck,
  IdCard,
  ShieldCheck,
  FileSignature
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface VolunteerDocument {
  id: string;
  volunteerName: string;
  volunteerEmail: string;
  documentName: string;
  documentType: 'application' | 'certification' | 'identification' | 'background-check' | 'agreement' | 'other';
  category: 'Applications' | 'Certifications' | 'ID Documents' | 'Background Checks' | 'Agreements' | 'Other';
  status: 'pending-review' | 'approved' | 'rejected' | 'expired';
  submittedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  expirationDate?: Date;
  isFavorite: boolean;
  notes?: string;
  size: number;
  tags: string[];
}

type ViewMode = 'grid' | 'list';
type SortBy = 'submittedDate' | 'volunteerName' | 'status';
type SortOrder = 'asc' | 'desc';
type DocumentTypeFilter = 'all' | 'application' | 'certification' | 'identification' | 'background-check' | 'agreement' | 'other';

interface FilterState {
  search: string;
  category: string;
  status: string;
  showFavorites: boolean;
  dateRange: string;
  tags: string[];
}

interface TabConfig {
  id: DocumentTypeFilter;
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
    id: 'application', 
    label: 'Applications', 
    icon: FileText, 
    color: 'text-[#166534]',
    bgColor: 'bg-green-50'
  },
  { 
    id: 'certification', 
    label: 'Certifications', 
    icon: FileCheck, 
    color: 'text-[#059669]',
    bgColor: 'bg-emerald-50'
  },
  { 
    id: 'identification', 
    label: 'ID Documents', 
    icon: IdCard, 
    color: 'text-[#14b8a6]',
    bgColor: 'bg-teal-50'
  },
  { 
    id: 'background-check', 
    label: 'Background Checks', 
    icon: ShieldCheck, 
    color: 'text-[#84cc16]',
    bgColor: 'bg-lime-50'
  },
  { 
    id: 'agreement', 
    label: 'Agreements', 
    icon: FileSignature, 
    color: 'text-[#22c55e]',
    bgColor: 'bg-green-100'
  },
];

const categories = ['All Categories', 'Applications', 'Certifications', 'ID Documents', 'Background Checks', 'Agreements', 'Other'];
const statusOptions = ['All Status', 'pending-review', 'approved', 'rejected', 'expired'];
const availableTags = ['urgent', 'verified', 'new', 'expiring-soon', 'renewal', 'initial', 'updated', 'complete', 'incomplete', 'follow-up', 'training', 'compliance'];

// ============================================================================
// MOCK DATA
// ============================================================================

const mockDocuments: VolunteerDocument[] = [
  {
    id: '1',
    volunteerName: 'María González',
    volunteerEmail: 'maria.gonzalez@email.com',
    documentName: 'Volunteer Application Form',
    documentType: 'application',
    category: 'Applications',
    status: 'pending-review',
    submittedAt: new Date('2025-10-01'),
    isFavorite: false,
    size: 234567,
    tags: ['new', 'urgent']
  },
  {
    id: '2',
    volunteerName: 'Carlos Rodríguez',
    volunteerEmail: 'carlos.r@email.com',
    documentName: 'First Aid Certification',
    documentType: 'certification',
    category: 'Certifications',
    status: 'approved',
    submittedAt: new Date('2025-09-15'),
    reviewedBy: 'Sarah Johnson',
    reviewedAt: new Date('2025-09-16'),
    expirationDate: new Date('2026-09-15'),
    isFavorite: true,
    notes: 'Valid certification from Red Cross',
    size: 456789,
    tags: ['verified', 'training']
  },
  {
    id: '3',
    volunteerName: 'Ana Martínez',
    volunteerEmail: 'ana.m@email.com',
    documentName: 'Government ID - Driver License',
    documentType: 'identification',
    category: 'ID Documents',
    status: 'approved',
    submittedAt: new Date('2025-09-28'),
    reviewedBy: 'Mike Chen',
    reviewedAt: new Date('2025-09-28'),
    isFavorite: false,
    size: 345678,
    tags: ['verified', 'complete']
  },
  {
    id: '4',
    volunteerName: 'Luis Hernández',
    volunteerEmail: 'luis.h@email.com',
    documentName: 'Background Check Report',
    documentType: 'background-check',
    category: 'Background Checks',
    status: 'approved',
    submittedAt: new Date('2025-09-20'),
    reviewedBy: 'Sarah Johnson',
    reviewedAt: new Date('2025-09-21'),
    isFavorite: true,
    notes: 'Clean background check',
    size: 567890,
    tags: ['verified', 'compliance']
  },
  {
    id: '5',
    volunteerName: 'Elena Torres',
    volunteerEmail: 'elena.t@email.com',
    documentName: 'Volunteer Service Agreement',
    documentType: 'agreement',
    category: 'Agreements',
    status: 'approved',
    submittedAt: new Date('2025-09-25'),
    reviewedBy: 'David Martinez',
    reviewedAt: new Date('2025-09-25'),
    isFavorite: false,
    size: 123456,
    tags: ['complete', 'initial']
  },
  {
    id: '6',
    volunteerName: 'Roberto Silva',
    volunteerEmail: 'roberto.s@email.com',
    documentName: 'CPR Certification',
    documentType: 'certification',
    category: 'Certifications',
    status: 'expired',
    submittedAt: new Date('2024-01-10'),
    reviewedBy: 'Sarah Johnson',
    reviewedAt: new Date('2024-01-11'),
    expirationDate: new Date('2025-01-10'),
    isFavorite: false,
    notes: 'Certification has expired - needs renewal',
    size: 234567,
    tags: ['expiring-soon', 'renewal', 'follow-up']
  },
  {
    id: '7',
    volunteerName: 'Patricia Ramírez',
    volunteerEmail: 'patricia.r@email.com',
    documentName: 'Volunteer Application - Youth Program',
    documentType: 'application',
    category: 'Applications',
    status: 'rejected',
    submittedAt: new Date('2025-09-18'),
    reviewedBy: 'Mike Chen',
    reviewedAt: new Date('2025-09-19'),
    notes: 'Does not meet minimum age requirement',
    isFavorite: false,
    size: 198765,
    tags: ['incomplete']
  },
  {
    id: '8',
    volunteerName: 'Fernando López',
    volunteerEmail: 'fernando.l@email.com',
    documentName: 'Teaching Certification',
    documentType: 'certification',
    category: 'Certifications',
    status: 'approved',
    submittedAt: new Date('2025-09-30'),
    reviewedBy: 'Lisa Wang',
    reviewedAt: new Date('2025-10-01'),
    expirationDate: new Date('2027-09-30'),
    isFavorite: true,
    notes: 'Licensed educator - approved for tutoring program',
    size: 678901,
    tags: ['verified', 'training', 'complete']
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

// Iconos con FONDO de escala de verdes e ICONO BLANCO (según guía)
const getDocumentIcon = (type: VolunteerDocument['documentType']) => {
  const iconClass = "w-6 h-6 text-white";
  const containerClass = "w-12 h-12 rounded-lg flex items-center justify-center";
  
  switch (type) {
    case 'application':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#166534] to-[#14532d]`}>
          <FileText className={iconClass} />
        </div>
      );
    case 'certification':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#059669] to-[#047857]`}>
          <FileCheck className={iconClass} />
        </div>
      );
    case 'identification':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#14b8a6] to-[#0f766e]`}>
          <IdCard className={iconClass} />
        </div>
      );
    case 'background-check':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#84cc16] to-[#65a30d]`}>
          <ShieldCheck className={iconClass} />
        </div>
      );
    case 'agreement':
      return (
        <div className={`${containerClass} bg-gradient-to-br from-[#22c55e] to-[#16a34a]`}>
          <FileSignature className={iconClass} />
        </div>
      );
    default:
      return (
        <div className={`${containerClass} bg-gradient-to-br from-gray-500 to-gray-600`}>
          <FileText className={iconClass} />
        </div>
      );
  }
};

const getStatusBadge = (status: VolunteerDocument['status']) => {
  switch (status) {
    case 'approved':
      return (
        <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium">
          <CheckCircle className="w-3 h-3" /> Approved
        </span>
      );
    case 'pending-review':
      return (
        <span className="flex items-center gap-1 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full font-medium">
          <Clock className="w-3 h-3" /> Pending Review
        </span>
      );
    case 'rejected':
      return (
        <span className="flex items-center gap-1 text-xs text-red-700 bg-red-50 px-2 py-1 rounded-full font-medium">
          <X className="w-3 h-3" /> Rejected
        </span>
      );
    case 'expired':
      return (
        <span className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full font-medium">
          <AlertTriangle className="w-3 h-3" /> Expired
        </span>
      );
  }
};

// ============================================================================
// COMPONENTS
// ============================================================================

interface StatsCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
}

const StatsCard = ({ icon: Icon, label, value, color }: StatsCardProps) => {
  const colorClasses = {
    green: 'from-[#166534] to-[#14532d]',
    yellow: 'from-yellow-500 to-yellow-600',
    emerald: 'from-[#059669] to-[#047857]',
    blue: 'from-blue-500 to-blue-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

interface DocumentCardProps {
  doc: VolunteerDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
}

const DocumentCard = ({ doc, onToggleFavorite, onView }: DocumentCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all p-6 group">
      <div className="flex items-start justify-between mb-4">
        {getDocumentIcon(doc.documentType)}
        <button
          onClick={() => onToggleFavorite(doc.id)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Star
            className={`w-5 h-5 ${
              doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <h3 className="font-semibold text-slate-800 mb-1 line-clamp-1">{doc.documentName}</h3>
      <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
        <User className="w-3 h-3" />
        {doc.volunteerName}
      </p>

      <div className="flex items-center gap-2 mb-3">
        {getStatusBadge(doc.status)}
        <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
      </div>

      {doc.tags && doc.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {doc.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {formatDate(doc.submittedAt)}
        </div>
        <button
          onClick={() => onView(doc.id)}
          className="px-3 py-1.5 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg text-sm hover:shadow-lg transition-all flex items-center gap-1"
        >
          <Eye className="w-3 h-3" />
          View
        </button>
      </div>

      {doc.notes && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-gray-600 italic line-clamp-2">{doc.notes}</p>
        </div>
      )}
    </div>
  );
};

const DocumentListItem = ({ doc, onToggleFavorite, onView }: DocumentCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all p-4 group">
      <div className="flex items-center gap-4">
        {getDocumentIcon(doc.documentType)}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 line-clamp-1">{doc.documentName}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <User className="w-3 h-3" />
                {doc.volunteerName}
              </p>
            </div>
            <button
              onClick={() => onToggleFavorite(doc.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
            >
              <Star
                className={`w-5 h-5 ${
                  doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {getStatusBadge(doc.status)}
            <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(doc.submittedAt)}
            </span>
            {doc.tags && doc.tags.length > 0 && (
              <div className="flex gap-1">
                {doc.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onView(doc.id)}
          className="px-4 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg text-sm hover:shadow-lg transition-all flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VolunteerDocuments() {
  const [documents] = useState<VolunteerDocument[]>(mockDocuments);
  const [activeTab, setActiveTab] = useState<DocumentTypeFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('submittedDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    showFavorites: false,
    dateRange: 'all',
    tags: []
  });

  // Filter by active tab
  const tabFilteredDocuments = useMemo(() => {
    if (activeTab === 'all') return documents;
    return documents.filter(doc => doc.documentType === activeTab);
  }, [documents, activeTab]);

  // Apply additional filters
  const filteredDocuments = useMemo(() => {
    return tabFilteredDocuments.filter(doc => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !doc.documentName.toLowerCase().includes(searchLower) &&
          !doc.volunteerName.toLowerCase().includes(searchLower) &&
          !doc.volunteerEmail.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'All Categories' && doc.category !== filters.category) {
        return false;
      }

      // Status filter
      if (filters.status !== 'All Status' && doc.status !== filters.status) {
        return false;
      }

      // Favorites filter
      if (filters.showFavorites && !doc.isFavorite) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasAllTags = filters.tags.every(tag => doc.tags.includes(tag));
        if (!hasAllTags) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const now = new Date();
        const docDate = new Date(doc.submittedAt);
        const diffTime = Math.abs(now.getTime() - docDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (filters.dateRange) {
          case 'today':
            if (diffDays > 1) return false;
            break;
          case 'week':
            if (diffDays > 7) return false;
            break;
          case 'month':
            if (diffDays > 30) return false;
            break;
          case 'quarter':
            if (diffDays > 90) return false;
            break;
        }
      }

      return true;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'volunteerName':
          comparison = a.volunteerName.localeCompare(b.volunteerName);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'submittedDate':
        default:
          comparison = new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [tabFilteredDocuments, filters, sortBy, sortOrder]);

  // Document counts by type
  const documentCounts = useMemo(() => {
    const counts: Record<DocumentTypeFilter, number> = {
      all: documents.length,
      application: 0,
      certification: 0,
      identification: 0,
      'background-check': 0,
      agreement: 0,
      other: 0
    };
    
    documents.forEach(doc => {
      counts[doc.documentType]++;
    });
    
    return counts;
  }, [documents]);

  const handleToggleFavorite = (id: string) => {
    console.log('Toggling favorite for:', id);
  };

  const handleView = (id: string) => {
    console.log('Viewing document:', id);
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
      status: 'All Status',
      showFavorites: false,
      dateRange: 'all',
      tags: []
    });
  };

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === 'pending-review').length,
    approved: documents.filter(d => d.status === 'approved').length,
    favorites: documents.filter(d => d.isFavorite).length
  };

  const isFilterActive = 
    filters.search || 
    filters.category !== 'All Categories' || 
    filters.status !== 'All Status' || 
    filters.showFavorites ||
    filters.tags.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-xl shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Documentos de Voluntarios</h1>
              <p className="text-gray-600 mt-1">
                Gestiona y accede a todos los documentos enviados por los voluntarios, como formularios de solicitud y certificaciones.
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard icon={FileText} label="Total Documents" value={stats.total} color="green" />
            <StatsCard icon={Clock} label="Pending Review" value={stats.pending} color="yellow" />
            <StatsCard icon={CheckCircle} label="Approved" value={stats.approved} color="emerald" />
            <StatsCard icon={Star} label="Favorites" value={stats.favorites} color="blue" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const count = documentCounts[tab.id];
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap font-medium ${
                    isActive
                      ? `${tab.bgColor} ${tab.color} shadow-sm border-2 border-${tab.color.replace('text-', '')}`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white bg-opacity-80' : 'bg-gray-100'
                  }`}>
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
                  placeholder="Search by volunteer name, email, or document..."
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
              Add Document
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
                      <option value="submittedDate">Submitted Date</option>
                      <option value="volunteerName">Volunteer Name</option>
                      <option value="status">Status</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534] mb-4"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                </select>
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
            <span className="font-semibold">{documentCounts[activeTab]}</span> documents
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
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

        {/* Documents Grid/List */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {isFilterActive
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'documents'} available yet`
                }
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
                onView={handleView}
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
                onView={handleView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
