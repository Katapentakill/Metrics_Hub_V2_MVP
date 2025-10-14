// src/app/hr/documents/policies-guides/page.tsx
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
  Calendar,
  Folder
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
  owner: string;
  mandatory: boolean;
  viewCount: number;
  downloadCount: number;
  isFavorite: boolean;
  tags: string[];
  description: string;
}

type ViewMode = 'grid' | 'list';
type PolicyType = 'all' | 'policy' | 'procedure' | 'guideline' | 'compliance';
type SortBy = 'name' | 'date' | 'views';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  category: string;
  status: string;
  showMandatory: boolean;
}

interface TabConfig {
  id: PolicyType;
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
    icon: FileText, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  { 
    id: 'policy', 
    label: 'Policies', 
    icon: Shield, 
    color: 'text-[#166534]', // green-800
    bgColor: 'bg-green-50'
  },
  { 
    id: 'procedure', 
    label: 'Procedures', 
    icon: ClipboardList, 
    color: 'text-[#059669]', // emerald
    bgColor: 'bg-emerald-50'
  },
  { 
    id: 'guideline', 
    label: 'Guidelines', 
    icon: BookOpen, 
    color: 'text-[#14b8a6]', // teal
    bgColor: 'bg-teal-50'
  },
  { 
    id: 'compliance', 
    label: 'Compliance', 
    icon: AlertCircle, 
    color: 'text-[#84cc16]', // lime
    bgColor: 'bg-lime-50'
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
    owner: 'Sarah Johnson',
    mandatory: true,
    viewCount: 456,
    downloadCount: 234,
    isFavorite: true,
    tags: ['ethics', 'conduct', 'mandatory'],
    description: 'Establece los estándares éticos y de conducta para todos los miembros de la organización.'
  },
  {
    id: '2',
    name: 'Data Privacy and Protection Policy',
    type: 'policy',
    category: 'Information Security',
    version: '2.1',
    status: 'active',
    effectiveDate: new Date('2024-06-01'),
    owner: 'Mike Chen',
    mandatory: true,
    viewCount: 389,
    downloadCount: 198,
    isFavorite: true,
    tags: ['privacy', 'gdpr', 'data-protection'],
    description: 'Directrices para el manejo y protección de datos personales y confidenciales.'
  },
  {
    id: '3',
    name: 'Volunteer Onboarding Procedure',
    type: 'procedure',
    category: 'Human Resources',
    version: '1.5',
    status: 'active',
    effectiveDate: new Date('2025-03-01'),
    owner: 'Lisa Wang',
    mandatory: false,
    viewCount: 278,
    downloadCount: 156,
    isFavorite: false,
    tags: ['onboarding', 'volunteers', 'hr'],
    description: 'Procedimiento paso a paso para la integración de nuevos voluntarios.'
  },
  {
    id: '4',
    name: 'Safety Guidelines for Events',
    type: 'guideline',
    category: 'Safety & Operations',
    version: '2.0',
    status: 'active',
    effectiveDate: new Date('2025-02-15'),
    owner: 'David Martinez',
    mandatory: true,
    viewCount: 312,
    downloadCount: 187,
    isFavorite: false,
    tags: ['safety', 'events', 'guidelines'],
    description: 'Guías de seguridad para la organización y ejecución de eventos.'
  },
  {
    id: '5',
    name: 'GDPR Compliance Checklist',
    type: 'compliance',
    category: 'Legal & Compliance',
    version: '1.0',
    status: 'review',
    effectiveDate: new Date('2025-04-01'),
    owner: 'Emily Brown',
    mandatory: true,
    viewCount: 145,
    downloadCount: 89,
    isFavorite: true,
    tags: ['gdpr', 'compliance', 'checklist'],
    description: 'Lista de verificación para cumplimiento de regulaciones GDPR.'
  },
];

const categories = ['All Categories', 'Ethics & Compliance', 'Information Security', 'Human Resources', 'Safety & Operations', 'Legal & Compliance', 'Finance', 'Administrative'];
const statuses = ['All Status', 'active', 'draft', 'review', 'archived'];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const getStatusBadge = (status: PolicyDocument['status']) => {
  const config = {
    active: { color: 'bg-green-50 text-[#166534] border-green-200', icon: CheckCircle, label: 'Active' },
    draft: { color: 'bg-gray-50 text-gray-700 border-gray-200', icon: Edit, label: 'Draft' },
    review: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: AlertCircle, label: 'Under Review' },
    archived: { color: 'bg-red-50 text-red-700 border-red-200', icon: Clock, label: 'Archived' }
  };
  
  const { color, icon: Icon, label } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
};

// Iconos con FONDO de escala de verdes e ICONO BLANCO
const getTypeIcon = (type: PolicyDocument['type']) => {
  switch (type) {
    case 'policy':
      return <Shield className="w-5 h-5 text-white" />;
    case 'procedure':
      return <ClipboardList className="w-5 h-5 text-white" />;
    case 'guideline':
      return <BookOpen className="w-5 h-5 text-white" />;
    case 'compliance':
      return <AlertCircle className="w-5 h-5 text-white" />;
    default:
      return <FileText className="w-5 h-5 text-white" />;
  }
};

// Función para obtener el fondo del icono según tipo de política
const getIconBackground = (type: PolicyDocument['type']): string => {
  switch (type) {
    case 'policy':
      return 'bg-[#166534]'; // green-800
    case 'procedure':
      return 'bg-[#059669]'; // emerald
    case 'guideline':
      return 'bg-[#14b8a6]'; // teal
    case 'compliance':
      return 'bg-[#84cc16]'; // lime
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

const PolicyCard = ({ policy, onToggleFavorite, onView }: {
  policy: PolicyDocument;
  onToggleFavorite: (id: string) => void;
  onView: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50/30 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* ICONO: Fondo verde de la escala, icono blanco */}
          <div className={`p-2 ${getIconBackground(policy.type)} rounded-lg`}>
            {getTypeIcon(policy.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate group-hover:text-[#166534] transition-colors">
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

    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        {getStatusBadge(policy.status)}
        {policy.mandatory && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3 h-3" />
            Mandatory
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{policy.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {policy.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-green-50 text-[#166534] text-xs rounded-full border border-green-200"
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
          <span>{policy.downloadCount}</span>
        </div>
      </div>
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <button
        onClick={() => onView(policy.id)}
        className="flex-1 px-3 py-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
      >
        <Eye className="w-4 h-4" />
        View
      </button>
      <button className="px-3 py-2 bg-white border border-slate-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
        <Edit className="w-4 h-4" />
      </button>
      <button className="px-3 py-2 bg-white border border-slate-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    showMandatory: false
  });

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

  const filteredPolicies = useMemo(() => {
    let filtered = [...policies];

    if (activeTab !== 'all') {
      filtered = filtered.filter(p => p.type === activeTab);
    }

    if (filters.search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.status !== 'All Status') {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    if (filters.showMandatory) {
      filtered = filtered.filter(p => p.mandatory);
    }

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
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [policies, activeTab, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setPolicies(pols =>
      pols.map(pol =>
        pol.id === id ? { ...pol, isFavorite: !pol.isFavorite } : pol
      )
    );
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      status: 'All Status',
      showMandatory: false
    });
  };

  const stats = {
    totalPolicies: filteredPolicies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    mandatoryPolicies: policies.filter(p => p.mandatory).length,
    totalViews: policies.reduce((sum, p) => sum + p.viewCount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-[#166534]" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Policies & Guides</h1>
              <p className="text-gray-600 mt-1">
                Documentos formales que establecen reglas, procedimientos y directrices organizacionales
              </p>
            </div>
          </div>

          {/* Stats Cards - cada una con diferente fondo de verde */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatsCard
              icon={FileText}
              label="Total Policies"
              value={stats.totalPolicies}
              iconBg="bg-gradient-to-br from-[#166534] to-[#14532d]"
            />
            <StatsCard
              icon={CheckCircle}
              label="Active"
              value={stats.activePolicies}
              iconBg="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatsCard
              icon={AlertCircle}
              label="Mandatory"
              value={stats.mandatoryPolicies}
              iconBg="bg-gradient-to-br from-red-400 to-red-500"
            />
            <StatsCard
              icon={Eye}
              label="Total Views"
              value={stats.totalViews}
              trend="+15%"
              iconBg="bg-gradient-to-br from-teal-500 to-teal-600"
            />
          </div>
        </div>

        {/* Tabs - Escala de Verdes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
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
                  placeholder="Search policies and guides..."
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
              Add Policy
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
                    {statuses.map(status => (
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
                      <option value="date">Effective Date</option>
                      <option value="views">Views</option>
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
                    checked={filters.showMandatory}
                    onChange={(e) => setFilters(prev => ({ ...prev, showMandatory: e.target.checked }))}
                    className="w-4 h-4 text-[#166534] rounded focus:ring-2 focus:ring-[#166534]"
                  />
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">Show Mandatory Only</span>
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
            Showing <span className="font-semibold">{filteredPolicies.length}</span> of{' '}
            <span className="font-semibold">{policyCounts[activeTab]}</span> documents
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
          </p>
          {(filters.search || filters.category !== 'All Categories' || filters.status !== 'All Status' || filters.showMandatory) && (
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
        {filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Shield className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No policies found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.category !== 'All Categories' || filters.status !== 'All Status'
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'policies'} available yet`
                }
              </p>
              {(filters.search || filters.category !== 'All Categories' || filters.status !== 'All Status') && (
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
            {filteredPolicies.map(policy => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onToggleFavorite={handleToggleFavorite}
                onView={(id: string) => console.log('View:', id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}