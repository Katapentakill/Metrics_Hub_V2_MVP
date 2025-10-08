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

const tabs = [
  { id: 'all' as PolicyType, label: 'All Documents', icon: FileText, color: 'text-gray-600', bgColor: 'bg-gray-50' },
  { id: 'policy' as PolicyType, label: 'Policies', icon: Shield, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { id: 'procedure' as PolicyType, label: 'Procedures', icon: ClipboardList, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { id: 'guideline' as PolicyType, label: 'Guidelines', icon: BookOpen, color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 'compliance' as PolicyType, label: 'Compliance', icon: AlertCircle, color: 'text-lime-600', bgColor: 'bg-lime-50' },
];

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
];

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

const getStatusBadge = (status: string) => {
  const configs: Record<string, any> = {
    active: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle, label: 'Active' },
    draft: { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Edit, label: 'Draft' },
    review: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertCircle, label: 'Under Review' },
    archived: { color: 'bg-red-100 text-red-700 border-red-200', icon: Clock, label: 'Archived' }
  };
  
  const config = configs[status];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'policy': return <Shield className="w-5 h-5 text-emerald-600" />;
    case 'procedure': return <ClipboardList className="w-5 h-5 text-teal-600" />;
    case 'guideline': return <BookOpen className="w-5 h-5 text-green-600" />;
    case 'compliance': return <AlertCircle className="w-5 h-5 text-lime-600" />;
    default: return <FileText className="w-5 h-5 text-gray-600" />;
  }
};

const PolicyCard = ({ policy, onToggleFavorite, onView }: any) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50/30 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-white rounded-lg border border-emerald-100">
            {getTypeIcon(policy.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
              {policy.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-gray-500">{policy.category}</p>
              <span className="text-xs text-gray-400">•</span>
              <p className="text-xs text-gray-500">v{policy.version}</p>
            </div>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(policy.id)} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Star className={`w-5 h-5 ${policy.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>

    <div className="p-4">
      <div className="flex items-center gap-2 mb-3">
        {getStatusBadge(policy.status)}
        {policy.mandatory && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            <AlertCircle className="w-3 h-3" />
            Mandatory
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{policy.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {policy.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
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
          <span>{policy.downloadCount} downloads</span>
        </div>
      </div>
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <button onClick={() => onView(policy.id)} className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2">
        <Eye className="w-4 h-4" />
        View
      </button>
      <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
        <Edit className="w-4 h-4" />
      </button>
      <button className="px-3 py-2 bg-white border border-gray-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function PoliciesGuides() {
  const [policies, setPolicies] = useState<PolicyDocument[]>(mockPolicies);
  const [activeTab, setActiveTab] = useState<PolicyType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const policyCounts = useMemo(() => {
    return {
      all: policies.length,
      policy: policies.filter(p => p.type === 'policy').length,
      procedure: policies.filter(p => p.type === 'procedure').length,
      guideline: policies.filter(p => p.type === 'guideline').length,
      compliance: policies.filter(p => p.type === 'compliance').length,
    };
  }, [policies]);

  const filteredPolicies = useMemo(() => {
    let filtered = [...policies];
    if (activeTab !== 'all') {
      filtered = filtered.filter(p => p.type === activeTab);
    }
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [policies, activeTab, searchTerm]);

  const handleToggleFavorite = (id: string) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const stats = {
    totalPolicies: filteredPolicies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    mandatoryPolicies: policies.filter(p => p.mandatory).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-emerald-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Policies & Guides</h1>
              <p className="text-gray-600 mt-1">
                Documentos formales que establecen reglas, procedimientos y directrices organizacionales
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPolicies}</p>
              <p className="text-sm text-gray-600">Total Policies</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.activePolicies}</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.mandatoryPolicies}</p>
              <p className="text-sm text-gray-600">Mandatory</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const count = policyCounts[tab.id];
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap border-b-2 flex-shrink-0 ${isActive ? `${tab.color} border-current ${tab.bgColor}` : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'}`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search policies and guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
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

            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Policy
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredPolicies.length}</span> of{' '}
            <span className="font-semibold">{policyCounts[activeTab]}</span> documents
          </p>
        </div>

        {filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No policies found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
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