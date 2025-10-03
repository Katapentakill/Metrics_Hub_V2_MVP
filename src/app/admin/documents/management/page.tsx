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
  Share2
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
      return <BookOpen className="w-4 h-4 text-blue-500" />;
    case 'policies-guides':
      return <Shield className="w-4 h-4 text-green-500" />;
    case 'volunteer-submissions':
      return <Users className="w-4 h-4 text-purple-500" />;
  }
};

const getStatusBadge = (status: ManagedDocument['status']) => {
  const config = {
    active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Active' },
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Pending' },
    archived: { color: 'bg-gray-100 text-gray-700', icon: Archive, label: 'Archived' },
    'needs-review': { color: 'bg-orange-100 text-orange-700', icon: AlertCircle, label: 'Needs Review' }
  };
  
  const { color, icon: Icon, label } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatCard = ({ icon: Icon, label, value, change, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  change?: string;
  color: string;
}) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
      </div>
      {change && (
        <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-xs font-medium text-green-600">{change}</span>
        </div>
      )}
    </div>
    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
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
    <div className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200 rounded-lg">
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Type Icon */}
          <div className="p-3 bg-gray-50 rounded-lg">
            {getTypeIcon(doc.type)}
          </div>

          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate hover:text-orange-600 transition-colors cursor-pointer">
                  {doc.name}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  {getStatusBadge(doc.status)}
                  <span className="flex items-center gap-1">
                    <FolderOpen className="w-3 h-3" />
                    {doc.category}
                  </span>
                  <span>•</span>
                  <span>{doc.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {doc.owner}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{doc.views}</p>
                  <p className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Views
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{doc.downloads}</p>
                  <p className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Downloads
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{formatFileSize(doc.size)}</p>
                  <p>Size</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">{formatDate(doc.modifiedAt)}</p>
                  <p className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Modified
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onView(doc.id)}
                  className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
                  title="View"
                >
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onEdit(doc.id)}
                  className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      <button
                        onClick={() => { onArchive(doc.id); setShowMenu(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Archive className="w-4 h-4" />
                        Archive
                      </button>
                      <button
                        onClick={() => { /* Share logic */; setShowMenu(false); }}
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
          </div>
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
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: 'All Types',
    status: 'All Status',
    department: 'All Departments'
  });

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    // View mode filter
    if (viewMode !== 'all') {
      filtered = filtered.filter(doc => doc.status === viewMode);
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        doc.owner.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Type filter
    if (filters.type !== 'All Types') {
      filtered = filtered.filter(doc => doc.type === filters.type);
    }

    // Status filter
    if (filters.status !== 'All Status') {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    // Department filter
    if (filters.department !== 'All Departments') {
      filtered = filtered.filter(doc => doc.department === filters.department);
    }

    // Sort
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

  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    pending: documents.filter(d => d.status === 'pending').length,
    needsReview: documents.filter(d => d.status === 'needs-review').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Document Management</h1>
              <p className="text-gray-600 mt-1">
                Centro de control administrativo para el ciclo de vida de documentos
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard
              icon={FileText}
              label="Total Documents"
              value={stats.total}
              change="+8%"
              color="bg-orange-500"
            />
            <StatCard
              icon={CheckCircle}
              label="Active"
              value={stats.active}
              color="bg-green-500"
            />
            <StatCard
              icon={Clock}
              label="Pending"
              value={stats.pending}
              color="bg-yellow-500"
            />
            <StatCard
              icon={AlertCircle}
              label="Needs Review"
              value={stats.needsReview}
              color="bg-red-500"
            />
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {(['all', 'pending', 'needs-review', 'archived'] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  px-6 py-4 font-medium transition-all whitespace-nowrap border-b-2 flex-shrink-0
                  ${viewMode === mode
                    ? 'text-orange-600 border-orange-600 bg-orange-50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1).replace('-', ' ')}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  viewMode === mode ? 'bg-white shadow-sm' : 'bg-gray-100'
                }`}>
                  {mode === 'all' ? stats.total :
                   mode === 'pending' ? stats.pending :
                   mode === 'needs-review' ? stats.needsReview :
                   documents.filter(d => d.status === 'archived').length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents or owners..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Department Filter */}
            <select
              value={filters.department}
              onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Bulk Actions */}
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Bulk Actions
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredDocuments.length}</span> of{' '}
            <span className="font-semibold">{documents.length}</span> documents
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="date">Date Modified</option>
              <option value="name">Name</option>
              <option value="views">Views</option>
              <option value="size">Size</option>
            </select>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
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

        {filteredDocuments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}