// src/app/admin/documents/management/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { 
  Settings,
  FileText,
  Users,
  Shield,
  BookOpen,
  Search,
  Filter,
  Download,
  Trash2,
  Archive,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Calendar,
  FolderOpen,
  Eye,
  Edit,
  MoreVertical,
  RefreshCw,
  Share2,
  ChevronDown,
  X
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface ManagedDocument {
  id: string;
  name: string;
  type: 'company-library' | 'policies-guides' | 'volunteer-submissions';
  category: string;
  status: 'active' | 'pending' | 'archived' | 'needs-review';
  owner: string;
  department: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  views: number;
  downloads: number;
  permissions: string[];
  tags: string[];
}

type ViewMode = 'all' | 'pending' | 'archived' | 'needs-review';
type SortBy = 'name' | 'date' | 'views' | 'size';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  type: string;
  status: string;
  department: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockDocuments: ManagedDocument[] = [
  {
    id: '1',
    name: 'Employee Handbook 2025.pdf',
    type: 'company-library',
    category: 'HR Resources',
    status: 'active',
    owner: 'Sarah Johnson',
    department: 'HR',
    size: 2456789,
    createdAt: new Date('2025-01-15'),
    modifiedAt: new Date('2025-09-20'),
    views: 456,
    downloads: 234,
    permissions: ['all-staff', 'public'],
    tags: ['handbook', 'hr', 'essential']
  },
  {
    id: '2',
    name: 'Data Privacy Policy v2.1',
    type: 'policies-guides',
    category: 'Compliance',
    status: 'needs-review',
    owner: 'Mike Chen',
    department: 'IT',
    size: 3456789,
    createdAt: new Date('2024-06-01'),
    modifiedAt: new Date('2025-08-15'),
    views: 389,
    downloads: 198,
    permissions: ['all-staff', 'mandatory'],
    tags: ['privacy', 'gdpr', 'compliance']
  },
  {
    id: '3',
    name: 'John_Doe_CV_2025.pdf',
    type: 'volunteer-submissions',
    category: 'Applications',
    status: 'pending',
    owner: 'John Doe',
    department: 'Volunteers',
    size: 245678,
    createdAt: new Date('2025-10-01'),
    modifiedAt: new Date('2025-10-01'),
    views: 3,
    downloads: 0,
    permissions: ['hr-only'],
    tags: ['cv', 'application', 'new']
  },
  {
    id: '4',
    name: 'Q3 Financial Report.xlsx',
    type: 'company-library',
    category: 'Finance',
    status: 'active',
    owner: 'Emily Brown',
    department: 'Finance',
    size: 789012,
    createdAt: new Date('2025-09-05'),
    modifiedAt: new Date('2025-09-28'),
    views: 287,
    downloads: 145,
    permissions: ['finance-team', 'management'],
    tags: ['financial', 'quarterly', 'report']
  },
  {
    id: '5',
    name: 'Safety Protocol 2024 (Old)',
    type: 'policies-guides',
    category: 'Safety',
    status: 'archived',
    owner: 'David Martinez',
    department: 'Operations',
    size: 1234567,
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2025-01-01'),
    views: 523,
    downloads: 289,
    permissions: ['archived'],
    tags: ['safety', 'archived', 'superseded']
  }
];

const types = ['All Types', 'company-library', 'policies-guides', 'volunteer-submissions'];
const statuses = ['All Status', 'active', 'pending', 'archived', 'needs-review'];
const departments = ['All Departments', 'HR', 'IT', 'Finance', 'Operations', 'Volunteers', 'Marketing'];

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

const getTypeIcon = (type: ManagedDocument['type']) => {
  switch (type) {
    case 'company-library':
      return <BookOpen className="w-5 h-5 text-white" />;
    case 'policies-guides':
      return <Shield className="w-5 h-5 text-white" />;
    case 'volunteer-submissions':
      return <Users className="w-5 h-5 text-white" />;
  }
};

const getTypeBackground = (type: ManagedDocument['type']): string => {
  switch (type) {
    case 'company-library':
      return 'bg-[#166534]'; // green-800
    case 'policies-guides':
      return 'bg-[#059669]'; // emerald
    case 'volunteer-submissions':
      return 'bg-[#14b8a6]'; // teal
  }
};

const getStatusBadge = (status: ManagedDocument['status']) => {
  const config = {
    active: { color: 'bg-green-50 text-[#166534] border-green-200', icon: CheckCircle, label: 'Active' },
    pending: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock, label: 'Pending' },
    archived: { color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Archive, label: 'Archived' },
    'needs-review': { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertCircle, label: 'Needs Review' }
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

const DocumentRow = ({ doc, onView, onEdit, onArchive, onDelete }: {
  doc: ManagedDocument;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50/30 to-transparent">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            {/* ICONO: Fondo verde de la escala, icono blanco */}
            <div className={`p-2 ${getTypeBackground(doc.type)} rounded-lg`}>
              {getTypeIcon(doc.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 truncate group-hover:text-[#166534] transition-colors">
                {doc.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(doc.status)}
                <span className="text-xs text-gray-500">• {doc.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
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

        <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
          <div className="flex items-center gap-1 text-gray-600">
            <Users className="w-3 h-3" />
            <span>{doc.owner}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FolderOpen className="w-3 h-3" />
            <span>{doc.department}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(doc.modifiedAt)}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <FileText className="w-3 h-3" />
            <span>{formatFileSize(doc.size)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{doc.views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            <span>{doc.downloads} downloads</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
        <button
          onClick={() => onView(doc.id)}
          className="flex-1 px-3 py-2 bg-white border border-slate-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={() => onEdit(doc.id)}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="px-3 py-2 bg-white border border-slate-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
              <button
                onClick={() => { onArchive(doc.id); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Archive className="w-4 h-4" />
                Archive
              </button>
              <button
                onClick={() => { setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => { onDelete(doc.id); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<ManagedDocument[]>(mockDocuments);
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'All Types',
    status: 'All Status',
    department: 'All Departments'
  });

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    if (viewMode !== 'all') {
      filtered = filtered.filter(doc => doc.status === viewMode);
    }

    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.owner.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.type !== 'All Types') {
      filtered = filtered.filter(doc => doc.type === filters.type);
    }

    if (filters.status !== 'All Status') {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    if (filters.department !== 'All Departments') {
      filtered = filtered.filter(doc => doc.department === filters.department);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = a.modifiedAt.getTime() - b.modifiedAt.getTime();
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [documents, viewMode, filters, sortBy, sortOrder]);

  const handleView = (id: string) => console.log('View:', id);
  const handleEdit = (id: string) => console.log('Edit:', id);
  const handleArchive = (id: string) => {
    setDocuments(docs => docs.map(doc =>
      doc.id === id ? { ...doc, status: 'archived' as const } : doc
    ));
  };
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(docs => docs.filter(doc => doc.id !== id));
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'All Types',
      status: 'All Status',
      department: 'All Departments'
    });
  };

  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    pending: documents.filter(d => d.status === 'pending').length,
    needsReview: documents.filter(d => d.status === 'needs-review').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-10 h-10 text-[#166534]" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Document Management</h1>
              <p className="text-gray-600 mt-1">
                Centro de control administrativo para el ciclo de vida de documentos
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatsCard
              icon={FileText}
              label="Total Documents"
              value={stats.total}
              trend="+8%"
              iconBg="bg-gradient-to-br from-[#166534] to-[#14532d]"
            />
            <StatsCard
              icon={CheckCircle}
              label="Active"
              value={stats.active}
              iconBg="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatsCard
              icon={Clock}
              label="Pending"
              value={stats.pending}
              iconBg="bg-gradient-to-br from-yellow-400 to-yellow-500"
            />
            <StatsCard
              icon={AlertCircle}
              label="Needs Review"
              value={stats.needsReview}
              iconBg="bg-gradient-to-br from-orange-400 to-orange-500"
            />
          </div>
        </div>

        {/* Tabs - Escala de Verdes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {(['all', 'pending', 'needs-review', 'archived'] as ViewMode[]).map((mode) => {
              const isActive = viewMode === mode;
              const count = mode === 'all' ? stats.total :
                           mode === 'pending' ? stats.pending :
                           mode === 'needs-review' ? stats.needsReview :
                           documents.filter(d => d.status === 'archived').length;
              
              const colors = {
                all: { text: 'text-gray-600', bg: 'bg-gray-50' },
                pending: { text: 'text-[#84cc16]', bg: 'bg-lime-50' },
                'needs-review': { text: 'text-[#f59e0b]', bg: 'bg-orange-50' },
                archived: { text: 'text-gray-500', bg: 'bg-gray-50' }
              };
              
              return (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`
                    flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap
                    border-b-2 flex-shrink-0
                    ${isActive 
                      ? `${colors[mode].text} border-current ${colors[mode].bg}` 
                      : 'text-gray-600 border-transparent hover:text-slate-800 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className="capitalize">{mode.replace('-', ' ')}</span>
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
                  placeholder="Search documents or owners..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                />
              </div>
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
              <RefreshCw className="w-4 h-4" />
              Bulk Actions
            </button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
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
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Sort by:
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="ml-2 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  >
                    <option value="date">Date Modified</option>
                    <option value="name">Name</option>
                    <option value="views">Views</option>
                    <option value="size">Size</option>
                  </select>
                </div>
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
          {(filters.search || filters.type !== 'All Types' || filters.status !== 'All Status' || filters.department !== 'All Departments') && (
            <button
              onClick={clearFilters}
              className="text-sm text-[#22c55e] hover:text-[#059669] font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              {(filters.search || filters.type !== 'All Types' || filters.status !== 'All Status') && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-[#166534] text-white rounded-lg hover:bg-[#14532d] transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                onView={handleView}
                onEdit={handleEdit}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}