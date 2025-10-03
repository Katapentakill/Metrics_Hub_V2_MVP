// src/app/admin/documents/policies-guides/page.tsx
// src/app/admin/documents/policies-guides/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  Shield,
  BookOpen,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  ChevronDown,
  Plus,
  X,
  Star,
  Eye,
  Edit,
  Trash2,
  Calendar
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface PolicyDocument {
  id: string;
  name: string;
  type: 'policy' | 'procedure' | 'guideline' | 'compliance';
  category: string;
  version: string;
  status: 'active' | 'draft' | 'review' | 'archived';
  effectiveDate: Date;
  lastReviewed: Date;
  nextReview: Date;
  owner: string;
  department: string;
  mandatory: boolean;
  acknowledgmentRequired: boolean;
  viewCount: number;
  downloadCount: number;
  isFavorite: boolean;
  tags: string[];
  description: string;
  size: number;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'views' | 'status';
type SortOrder = 'asc' | 'desc';
type PolicyType = 'all' | 'policy' | 'procedure' | 'guideline' | 'compliance';

interface FilterState {
  search: string;
  category: string;
  status: string;
  department: string;
  tags: string[];
  showMandatory: boolean;
  showFavorites: boolean;
}

interface TabConfig {
  id: PolicyType;
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
    icon: FileText, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  },
  { 
    id: 'policy', 
    label: 'Policies', 
    icon: Shield, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  { 
    id: 'procedure', 
    label: 'Procedures', 
    icon: ClipboardList, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    id: 'guideline', 
    label: 'Guidelines', 
    icon: BookOpen, 
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  { 
    id: 'compliance', 
    label: 'Compliance', 
    icon: AlertCircle, 
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
];

// ============================================================================
// MOCK DATA
// ============================================================================

const mockPolicies: PolicyDocument[] = [
  {
    id: '1',
    name: 'Code of Conduct and Ethics Policy',
    type: 'policy',
    category: 'Ethics & Compliance',
    version: '3.2',
    status: 'active',
    effectiveDate: new Date('2025-01-01'),
    lastReviewed: new Date('2025-09-15'),
    nextReview: new Date('2026-01-01'),
    owner: 'Sarah Johnson',
    department: 'HR',
    mandatory: true,
    acknowledgmentRequired: true,
    viewCount: 456,
    downloadCount: 234,
    isFavorite: true,
    tags: ['ethics', 'conduct', 'mandatory', 'annual-review'],
    description: 'Establece los estándares éticos y de conducta para todos los miembros de la organización.',
    size: 2456789
  },
  {
    id: '2',
    name: 'Data Privacy and Protection Policy',
    type: 'policy',
    category: 'Information Security',
    version: '2.1',
    status: 'active',
    effectiveDate: new Date('2024-06-01'),
    lastReviewed: new Date('2025-08-20'),
    nextReview: new Date('2025-12-01'),
    owner: 'Mike Chen',
    department: 'IT',
    mandatory: true,
    acknowledgmentRequired: true,
    viewCount: 389,
    downloadCount: 198,
    isFavorite: true,
    tags: ['privacy', 'gdpr', 'data-protection', 'mandatory'],
    description: 'Directrices para el manejo y protección de datos personales y confidenciales.',
    size: 3456789
  },
  {
    id: '3',
    name: 'Volunteer Onboarding Procedure',
    type: 'procedure',
    category: 'Human Resources',
    version: '1.5',
    status: 'active',
    effectiveDate: new Date('2025-03-01'),
    lastReviewed: new Date('2025-09-10'),
    nextReview: new Date('2026-03-01'),
    owner: 'Lisa Wang',
    department: 'HR',
    mandatory: false,
    acknowledgmentRequired: false,
    viewCount: 278,
    downloadCount: 156,
    isFavorite: false,
    tags: ['onboarding', 'volunteers', 'hr', 'procedures'],
    description: 'Procedimiento paso a paso para la integración de nuevos voluntarios.',
    size: 1234567
  },
  {
    id: '4',
    name: 'Financial Reporting Guidelines',
    type: 'guideline',
    category: 'Finance',
    version: '2.0',
    status: 'active',
    effectiveDate: new Date('2025-01-15'),
    lastReviewed: new Date('2025-07-30'),
    nextReview: new Date('2026-01-15'),
    owner: 'David Martinez',
    department: 'Finance',
    mandatory: true,
    acknowledgmentRequired: false,
    viewCount: 312,
    downloadCount: 187,
    isFavorite: true,
    tags: ['finance', 'reporting', 'guidelines', 'quarterly'],
    description: 'Guías para la preparación y presentación de informes financieros.',
    size: 2345678
  },
  {
    id: '5',
    name: 'Health and Safety Compliance Manual',
    type: 'compliance',
    category: 'Safety',
    version: '4.0',
    status: 'active',
    effectiveDate: new Date('2025-02-01'),
    lastReviewed: new Date('2025-09-01'),
    nextReview: new Date('2025-11-01'),
    owner: 'Emily Brown',
    department: 'Operations',
    mandatory: true,
    acknowledgmentRequired: true,
    viewCount: 445,
    downloadCount: 267,
    isFavorite: true,
    tags: ['safety', 'health', 'compliance', 'mandatory'],
    description: 'Manual completo de cumplimiento de normas de salud y seguridad.',
    size: 4567890
  },
  {
    id: '6',
    name: 'Document Retention Policy',
    type: 'policy',
    category: 'Records Management',
    version: '1.8',
    status: 'review',
    effectiveDate: new Date('2024-09-01'),
    lastReviewed: new Date('2025-09-20'),
    nextReview: new Date('2025-10-15'),
    owner: 'Robert Taylor',
    department: 'Legal',
    mandatory: true,
    acknowledgmentRequired: false,
    viewCount: 198,
    downloadCount: 123,
    isFavorite: false,
    tags: ['records', 'retention', 'legal', 'compliance'],
    description: 'Políticas para la retención y eliminación de documentos organizacionales.',
    size: 1456789
  },
  {
    id: '7',
    name: 'Expense Reimbursement Procedure',
    type: 'procedure',
    category: 'Finance',
    version: '2.3',
    status: 'active',
    effectiveDate: new Date('2025-04-01'),
    lastReviewed: new Date('2025-08-15'),
    nextReview: new Date('2026-04-01'),
    owner: 'Alice Green',
    department: 'Finance',
    mandatory: false,
    acknowledgmentRequired: false,
    viewCount: 342,
    downloadCount: 201,
    isFavorite: false,
    tags: ['expenses', 'reimbursement', 'finance', 'procedures'],
    description: 'Procedimiento para solicitar reembolsos de gastos autorizados.',
    size: 987654
  },
  {
    id: '8',
    name: 'Social Media Usage Guidelines',
    type: 'guideline',
    category: 'Communications',
    version: '1.2',
    status: 'active',
    effectiveDate: new Date('2025-05-01'),
    lastReviewed: new Date('2025-09-05'),
    nextReview: new Date('2026-05-01'),
    owner: 'Jennifer Wilson',
    department: 'Marketing',
    mandatory: false,
    acknowledgmentRequired: false,
    viewCount: 256,
    downloadCount: 145,
    isFavorite: false,
    tags: ['social-media', 'communications', 'marketing', 'guidelines'],
    description: 'Directrices para el uso apropiado de redes sociales en contexto profesional.',
    size: 876543
  },
  {
    id: '9',
    name: 'Anti-Discrimination and Harassment Policy',
    type: 'policy',
    category: 'Ethics & Compliance',
    version: '2.5',
    status: 'active',
    effectiveDate: new Date('2025-01-01'),
    lastReviewed: new Date('2025-09-10'),
    nextReview: new Date('2026-01-01'),
    owner: 'Sarah Johnson',
    department: 'HR',
    mandatory: true,
    acknowledgmentRequired: true,
    viewCount: 423,
    downloadCount: 289,
    isFavorite: true,
    tags: ['discrimination', 'harassment', 'ethics', 'mandatory'],
    description: 'Política de tolerancia cero contra discriminación y acoso en el lugar de trabajo.',
    size: 2234567
  },
  {
    id: '10',
    name: 'Emergency Response Procedures',
    type: 'procedure',
    category: 'Safety',
    version: '3.1',
    status: 'active',
    effectiveDate: new Date('2025-06-01'),
    lastReviewed: new Date('2025-09-25'),
    nextReview: new Date('2025-12-01'),
    owner: 'John Smith',
    department: 'Operations',
    mandatory: true,
    acknowledgmentRequired: true,
    viewCount: 389,
    downloadCount: 234,
    isFavorite: true,
    tags: ['emergency', 'safety', 'procedures', 'mandatory'],
    description: 'Procedimientos detallados para responder a situaciones de emergencia.',
    size: 3345678
  },
];

const categories = ['All Categories', 'Ethics & Compliance', 'Information Security', 'Human Resources', 'Finance', 'Safety', 'Records Management', 'Communications'];
const departments = ['All Departments', 'HR', 'IT', 'Finance', 'Operations', 'Legal', 'Marketing'];
const statuses = ['All Status', 'active', 'draft', 'review', 'archived'];
const availableTags = ['ethics', 'conduct', 'mandatory', 'annual-review', 'privacy', 'gdpr', 'data-protection', 'onboarding', 'volunteers', 'hr', 'procedures', 'finance', 'reporting', 'guidelines', 'quarterly', 'safety', 'health', 'compliance', 'records', 'retention', 'legal', 'expenses', 'reimbursement', 'social-media', 'communications', 'marketing', 'discrimination', 'harassment', 'emergency'];

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

const getStatusBadge = (status: PolicyDocument['status']) => {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Active' },
    draft: { color: 'bg-gray-100 text-gray-700', icon: Edit, label: 'Draft' },
    review: { color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle, label: 'Under Review' },
    archived: { color: 'bg-red-100 text-red-700', icon: Clock, label: 'Archived' }
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

const getTypeIcon = (type: PolicyDocument['type']) => {
  switch (type) {
    case 'policy':
      return <Shield className="w-5 h-5 text-green-500" />;
    case 'procedure':
      return <ClipboardList className="w-5 h-5 text-blue-500" />;
    case 'guideline':
      return <BookOpen className="w-5 h-5 text-purple-500" />;
    case 'compliance':
      return <AlertCircle className="w-5 h-5 text-orange-500" />;
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatsCard = ({ icon: Icon, label, value, trend, color = 'green' }: { 
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

const PolicyCard = ({ policy, onToggleFavorite, onView, onEdit, onDelete }: {
  policy: PolicyDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    {/* Card Header */}
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            {getTypeIcon(policy.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
              {policy.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-gray-500">{policy.category}</p>
              <span className="text-xs text-gray-400">•</span>
              <p className="text-xs text-gray-500">v{policy.version}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(policy.id)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Star 
            className={`w-5 h-5 ${policy.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-4">
      {/* Status and Mandatory Badge */}
      <div className="flex items-center gap-2 mb-3">
        {getStatusBadge(policy.status)}
        {policy.mandatory && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3" />
            Mandatory
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{policy.description}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {policy.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
        {policy.tags.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{policy.tags.length - 3}
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{policy.owner}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(policy.effectiveDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{policy.viewCount} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          <span>{policy.downloadCount} downloads</span>
        </div>
      </div>

      {/* Review Date Alert */}
      {new Date(policy.nextReview) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
        <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-700">
          <AlertCircle className="w-4 h-4" />
          <span>Review due: {formatDate(policy.nextReview)}</span>
        </div>
      )}
    </div>

    {/* Card Footer */}
    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <button
        onClick={() => onView(policy.id)}
        className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View
      </button>
      <button
        onClick={() => onEdit(policy.id)}
        className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(policy.id)}
        className="px-3 py-2 bg-white border border-gray-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const PolicyListItem = ({ policy, onToggleFavorite, onView, onEdit, onDelete }: {
  policy: PolicyDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      {/* Icon */}
      <div className="p-3 bg-gray-50 rounded-lg">
        {getTypeIcon(policy.type)}
      </div>

      {/* Policy Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 hover:text-green-600 transition-colors cursor-pointer">
                {policy.name}
              </h3>
              <span className="text-xs text-gray-500">v{policy.version}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{policy.description}</p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {getStatusBadge(policy.status)}
              {policy.mandatory && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  <AlertCircle className="w-3 h-3" />
                  Mandatory
                </span>
              )}
              <span>{policy.category}</span>
              <span>•</span>
              <span>{policy.department}</span>
              <span>•</span>
              <span>{policy.owner}</span>
              <span>•</span>
              <span>{formatDate(policy.effectiveDate)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(policy.id)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Star 
                className={`w-5 h-5 ${policy.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
              />
            </button>
            <button
              onClick={() => onView(policy.id)}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View
            </button>
            <button
              onClick={() => onEdit(policy.id)}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(policy.id)}
              className="p-2 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
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

export default function PoliciesGuides() {
  const [policies, setPolicies] = useState<PolicyDocument[]>(mockPolicies);
  const [activeTab, setActiveTab] = useState<PolicyType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    department: 'All Departments',
    tags: [],
    showMandatory: false,
    showFavorites: false
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get policies count by type
  const policyCounts = useMemo(() => {
    const counts: Record<PolicyType, number> = {
      all: policies.length,
      policy: policies.filter(p => p.type === 'policy').length,
      procedure: policies.filter(p => p.type === 'procedure').length,
      guideline: policies.filter(p => p.type === 'guideline').length,
      compliance: policies.filter(p => p.type === 'compliance').length,
    };
    return counts;
  }, [policies]);

  // Filter and sort policies
  const filteredPolicies = useMemo(() => {
    let filtered = [...policies];

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(policy => policy.type === activeTab);
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(policy =>
        policy.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        policy.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(policy => policy.category === filters.category);
    }

    // Status filter
    if (filters.status !== 'All Status') {
      filtered = filtered.filter(policy => policy.status === filters.status);
    }

    // Department filter
    if (filters.department !== 'All Departments') {
      filtered = filtered.filter(policy => policy.department === filters.department);
    }

    // Mandatory filter
    if (filters.showMandatory) {
      filtered = filtered.filter(policy => policy.mandatory);
    }

    // Favorites filter
    if (filters.showFavorites) {
      filtered = filtered.filter(policy => policy.isFavorite);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(policy =>
        filters.tags.some(tag => policy.tags.includes(tag))
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
          comparison = a.effectiveDate.getTime() - b.effectiveDate.getTime();
          break;
        case 'views':
          comparison = a.viewCount - b.viewCount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [policies, activeTab, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setPolicies(policies =>
      policies.map(policy =>
        policy.id === id ? { ...policy, isFavorite: !policy.isFavorite } : policy
      )
    );
  };

  const handleView = (id: string) => {
    console.log('Viewing policy:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Editing policy:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting policy:', id);
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
      department: 'All Departments',
      tags: [],
      showMandatory: false,
      showFavorites: false
    });
  };

  const stats = {
    totalPolicies: filteredPolicies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    mandatoryPolicies: policies.filter(p => p.mandatory).length,
    reviewNeeded: policies.filter(p => new Date(p.nextReview) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Policies & Guides</h1>
              <p className="text-gray-600 mt-1">
                Documentos formales que establecen reglas, procedimientos y directrices organizacionales
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard
              icon={FileText}
              label="Total Policies"
              value={stats.totalPolicies}
              color="green"
            />
            <StatsCard
              icon={CheckCircle}
              label="Active"
              value={stats.activePolicies}
              color="blue"
            />
            <StatsCard
              icon={AlertCircle}
              label="Mandatory"
              value={stats.mandatoryPolicies}
              color="red"
            />
            <StatsCard
              icon={Clock}
              label="Review Needed"
              value={stats.reviewNeeded}
              color="orange"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const count = policyCounts[tab.id];
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
                  placeholder="Search policies and guides..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-100 text-green-600'
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

            {/* Add New Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Policy
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Department Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="name">Name</option>
                      <option value="date">Date</option>
                      <option value="views">Views</option>
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
                          ? 'bg-green-100 text-green-700 border-2 border-green-500'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                      {filters.tags.includes(tag) && <X className="inline w-3 h-3 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.showMandatory}
                      onChange={(e) => setFilters(prev => ({ ...prev, showMandatory: e.target.checked }))}
                      className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">Mandatory Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.showFavorites}
                      onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                      className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Favorites Only</span>
                  </label>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
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
            Showing <span className="font-semibold">{filteredPolicies.length}</span> of{' '}
            <span className="font-semibold">{policyCounts[activeTab]}</span> documents
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
          </p>
          {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0 || filters.showMandatory || filters.showFavorites) && (
            <button
              onClick={clearFilters}
              className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Policies Display */}
        {filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No policies found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.category !== 'All Categories' || filters.tags.length > 0
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'policies'} available yet`
                }
              </p>
              {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map(policy => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onToggleFavorite={handleToggleFavorite}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPolicies.map(policy => (
              <PolicyListItem
                key={policy.id}
                policy={policy}
                onToggleFavorite={handleToggleFavorite}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}