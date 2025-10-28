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
  Minimize2,
  Calendar
} from 'lucide-react';

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
}

type ViewMode = 'grid' | 'list' | 'minimalist';
type SortBy = 'submittedDate' | 'volunteerName' | 'status';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  category: string;
  status: string;
  showFavorites: boolean;
  dateRange: string;
}

const categories = ['All Categories', 'Applications', 'Certifications', 'ID Documents', 'Background Checks', 'Agreements', 'Other'];
const statusOptions = ['All Status', 'pending-review', 'approved', 'rejected', 'expired'];

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
    size: 234567
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
    size: 456789
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
    size: 345678
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
    size: 567890
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
    size: 123456
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
    size: 234567
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
    size: 198765
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
    size: 678901
  }
];

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

// Estados con colores según guía
const getStatusBadge = (status: VolunteerDocument['status']) => {
  switch (status) {
    case 'approved':
      return <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium">
        <CheckCircle className="w-3 h-3" /> Approved
      </span>;
    case 'pending-review':
      return <span className="flex items-center gap-1 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full font-medium">
        <Clock className="w-3 h-3" /> Pending Review
      </span>;
    case 'rejected':
      return <span className="flex items-center gap-1 text-xs text-red-700 bg-red-50 px-2 py-1 rounded-full font-medium">
        <X className="w-3 h-3" /> Rejected
      </span>;
    case 'expired':
      return <span className="flex items-center gap-1 text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full font-medium">
        <AlertTriangle className="w-3 h-3" /> Expired
      </span>;
  }
};

// StatsCard con colores institucionales
const StatsCard = ({ icon: Icon, label, value, trend, color = 'green' }: { 
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    trend?: string;
    color?: string;
  }) => {
  const colorClasses = {
    green: 'from-[#166534] to-[#14532d]',
    emerald: 'from-[#059669] to-[#047857]',
    yellow: 'from-yellow-500 to-yellow-600',
    blue: 'from-blue-500 to-blue-600',
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-[#059669] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-[#1e293b]">{value}</p>
      <p className="text-sm text-[#4b5563]">{label}</p>
    </div>
  );
};

const DocumentCard = ({ doc, onToggleFavorite, onView }: {
  doc: VolunteerDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
}) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-[#e2e8f0] bg-gradient-to-r from-green-50 to-transparent">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-[#166534]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#1e293b] truncate">{doc.volunteerName}</h3>
            <p className="text-xs text-[#4b5563] truncate">{doc.volunteerEmail}</p>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(doc.id)} className="p-1 hover:bg-gray-50 rounded transition-colors">
          <Star className={`w-5 h-5 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="mt-2">
        {getStatusBadge(doc.status)}
      </div>
    </div>

    <div className="p-4">
      <div className="mb-3">
        <h4 className="font-medium text-[#1e293b] mb-1">{doc.documentName}</h4>
        <p className="text-xs text-[#059669]">{doc.category}</p>
      </div>
      
      {doc.notes && (
        <p className="text-sm text-[#4b5563] mb-3 line-clamp-2 italic">"{doc.notes}"</p>
      )}
      
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 pt-3 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(doc.submittedAt)}</span>
        </div>
        {doc.reviewedBy && (
          <div className="flex items-center gap-1 text-[#059669]">
            <CheckCircle className="w-3 h-3" />
            <span>{doc.reviewedBy}</span>
          </div>
        )}
        {doc.expirationDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Exp: {formatDate(doc.expirationDate)}</span>
          </div>
        )}
      </div>
    </div>

    <div className="p-4 bg-gray-50 border-t border-[#e2e8f0] flex gap-2">
      <button
        onClick={() => onView(doc.id)}
        className="flex-1 px-3 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white text-sm rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View
      </button>
      <button className="px-3 py-2 bg-white border border-slate-200 text-[#4b5563] text-sm rounded-lg hover:bg-gray-50 transition-colors">
        <Download className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const DocumentListItem = ({ doc, onToggleFavorite, onView }: {
  doc: VolunteerDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
}) => (
  <div className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-6 h-6 text-[#166534]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[#1e293b]">{doc.volunteerName}</h3>
              {getStatusBadge(doc.status)}
            </div>
            <p className="text-sm text-[#4b5563] mb-1">{doc.documentName}</p>
            <p className="text-xs text-gray-500 mb-2">{doc.volunteerEmail}</p>
            
            {doc.notes && (
              <p className="text-sm text-[#4b5563] mb-2 italic">"{doc.notes}"</p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 text-[#059669]">
                <Folder className="w-3 h-3" />
                {doc.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Submitted: {formatDate(doc.submittedAt)}
              </span>
              {doc.reviewedBy && (
                <span className="flex items-center gap-1 text-[#059669]">
                  <CheckCircle className="w-3 h-3" />
                  Reviewed by {doc.reviewedBy}
                </span>
              )}
              {doc.expirationDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Expires: {formatDate(doc.expirationDate)}
                </span>
              )}
              <span>{formatFileSize(doc.size)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => onToggleFavorite(doc.id)} className="p-2 hover:bg-gray-50 rounded transition-colors">
              <Star className={`w-5 h-5 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={() => onView(doc.id)}
              className="px-4 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white text-sm rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DocumentMinimalistItem = ({ doc, onToggleFavorite, onView }: {
  doc: VolunteerDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:border-[#059669] hover:shadow-sm transition-all duration-150 p-3">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <User className="w-4 h-4 text-[#166534] flex-shrink-0" />
        <span className="font-medium text-[#1e293b] text-sm truncate">{doc.volunteerName}</span>
        <span className="text-xs text-gray-500 truncate hidden md:inline">- {doc.documentName}</span>
        <span className="text-xs text-[#059669] bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap hidden lg:inline-flex">
          {doc.category}
        </span>
        {getStatusBadge(doc.status)}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button onClick={() => onToggleFavorite(doc.id)} className="p-1 hover:bg-gray-50 rounded transition-colors">
          <Star className={`w-4 h-4 ${doc.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
        <button
          onClick={() => onView(doc.id)}
          className="p-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white text-sm rounded-lg hover:shadow-lg transition-all"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default function VolunteerDocumentsPage() {
  const [documents, setDocuments] = useState<VolunteerDocument[]>(mockDocuments);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortBy, setSortBy] = useState<SortBy>('submittedDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    showFavorites: false,
    dateRange: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.volunteerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.volunteerEmail.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.documentName.toLowerCase().includes(filters.search.toLowerCase())
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

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'volunteerName':
          comparison = a.volunteerName.localeCompare(b.volunteerName);
          break;
        case 'submittedDate':
          comparison = a.submittedAt.getTime() - b.submittedAt.getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [documents, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setDocuments(docs => docs.map(doc => doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc));
  };

  const handleView = (id: string) => {
    console.log('Viewing document:', id);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      status: 'All Status',
      showFavorites: false,
      dateRange: 'all'
    });
  };

  const stats = {
    total: documents.length,
    pending: documents.filter(d => d.status === 'pending-review').length,
    approved: documents.filter(d => d.status === 'approved').length,
    favorites: documents.filter(d => d.isFavorite).length
  };

  const isFilterActive = filters.search || filters.category !== 'All Categories' || filters.status !== 'All Status' || filters.showFavorites;

  return (
    <div className="min-h-screen bg-[#f9fafb] p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con icono sin fondo, color green-800 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10 text-[#166534]" />
            <div>
              <h1 className="text-4xl font-bold text-[#1e293b]">Documentos de Voluntarios</h1>
              <p className="text-[#4b5563] mt-1">
                Gestiona y accede a todos los documentos enviados por los voluntarios, como formularios de solicitud y certificaciones.
              </p>
            </div>
          </div>
          
          {/* Stats Cards con colores institucionales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard icon={FileText} label="Total Documents" value={stats.total} color="green" />
            <StatsCard icon={Clock} label="Pending Review" value={stats.pending} color="yellow" />
            <StatsCard icon={CheckCircle} label="Approved" value={stats.approved} color="emerald" />
            <StatsCard icon={Star} label="Favorites" value={stats.favorites} color="emerald" />
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-50 text-[#166534]' : 'bg-gray-100 text-[#4b5563] hover:bg-gray-200'}`}>
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-50 text-[#166534]' : 'bg-gray-100 text-[#4b5563] hover:bg-gray-200'}`}>
                <List className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('minimalist')} className={`p-2 rounded-lg transition-colors ${viewMode === 'minimalist' ? 'bg-green-50 text-[#166534]' : 'bg-gray-100 text-[#4b5563] hover:bg-gray-200'}`}>
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-gray-100 text-[#4b5563] rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
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
            <div className="pt-4 border-t border-[#e2e8f0]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#4b5563] mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4b5563] mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4b5563] mb-2">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]"
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showFavorites}
                    onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                    className="w-4 h-4 text-[#166534] rounded focus:ring-2 focus:ring-[#059669]"
                  />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-[#4b5563]">Show Favorites Only</span>
                </label>
                <button onClick={clearFilters} className="text-sm text-[#22c55e] hover:text-[#059669] font-medium transition-colors">
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-[#4b5563]">
            Showing <span className="font-semibold">{filteredDocuments.length}</span> of <span className="font-semibold">{documents.length}</span> documents
          </p>
          {isFilterActive && (
            <button onClick={clearFilters} className="text-sm text-[#22c55e] hover:text-[#059669] font-medium flex items-center gap-1 transition-colors">
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
              <h3 className="text-xl font-semibold text-[#1e293b] mb-2">No documents found</h3>
              <p className="text-[#4b5563] mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="px-4 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] text-white rounded-lg hover:shadow-lg transition-all">
                Clear Filters
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <DocumentCard key={doc.id} doc={doc} onToggleFavorite={handleToggleFavorite} onView={handleView} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredDocuments.map(doc => (
              <DocumentListItem key={doc.id} doc={doc} onToggleFavorite={handleToggleFavorite} onView={handleView} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map(doc => (
              <DocumentMinimalistItem key={doc.id} doc={doc} onToggleFavorite={handleToggleFavorite} onView={handleView} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}