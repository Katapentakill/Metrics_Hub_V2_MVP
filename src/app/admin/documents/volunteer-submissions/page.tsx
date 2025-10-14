// src/app/admin/documents/volunteer-submissions/page.tsx
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
  File,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  ChevronDown,
  X,
  Eye,
  Trash2,
  Calendar,
  Award,
  Briefcase,
  Shield,
  FileCheck,
  User
} from 'lucide-react';

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface VolunteerSubmission {
  id: string;
  fileName: string;
  fileType: 'cv' | 'certificate' | 'id-document' | 'reference' | 'other';
  category: string;
  submittedBy: string;
  volunteerId: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'needs-review';
  reviewedBy?: string;
  comments?: string;
  size: number;
  viewCount: number;
  urgent: boolean;
  tags: string[];
  description?: string;
}

type ViewMode = 'grid' | 'list';
type SubmissionType = 'all' | 'cv' | 'certificate' | 'id-document' | 'reference' | 'other';
type SortBy = 'name' | 'date' | 'status';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  status: string;
  showUrgent: boolean;
}

interface TabConfig {
  id: SubmissionType;
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
    label: 'All Submissions', 
    icon: FileText, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  { 
    id: 'cv', 
    label: 'CVs/Resumes', 
    icon: Briefcase, 
    color: 'text-[#166534]', // green-800
    bgColor: 'bg-green-50'
  },
  { 
    id: 'certificate', 
    label: 'Certificates', 
    icon: Award, 
    color: 'text-[#059669]', // emerald
    bgColor: 'bg-emerald-50'
  },
  { 
    id: 'id-document', 
    label: 'ID Documents', 
    icon: Shield, 
    color: 'text-[#14b8a6]', // teal
    bgColor: 'bg-teal-50'
  },
  { 
    id: 'reference', 
    label: 'References', 
    icon: FileCheck, 
    color: 'text-[#84cc16]', // lime
    bgColor: 'bg-lime-50'
  },
];

// ============================================================================
// MOCK DATA
// ============================================================================

const mockSubmissions: VolunteerSubmission[] = [
  {
    id: '1',
    fileName: 'John_Doe_CV_2025.pdf',
    fileType: 'cv',
    category: 'Application Documents',
    submittedBy: 'John Doe',
    volunteerId: 'V001',
    submittedAt: new Date('2025-10-01'),
    status: 'pending',
    size: 245678,
    viewCount: 3,
    urgent: true,
    tags: ['new-applicant', 'project-lead', 'urgent'],
    description: 'Updated CV for Project Lead position application'
  },
  {
    id: '2',
    fileName: 'Sarah_Johnson_Teaching_Certificate.pdf',
    fileType: 'certificate',
    category: 'Professional Certifications',
    submittedBy: 'Sarah Johnson',
    volunteerId: 'V023',
    submittedAt: new Date('2025-09-28'),
    status: 'approved',
    reviewedBy: 'Admin User',
    comments: 'Certificate verified and approved',
    size: 1234567,
    viewCount: 8,
    urgent: false,
    tags: ['teaching', 'education', 'verified'],
    description: 'Teaching certification from National Board'
  },
  {
    id: '3',
    fileName: 'Mike_Chen_ID_Card.jpg',
    fileType: 'id-document',
    category: 'Identity Verification',
    submittedBy: 'Mike Chen',
    volunteerId: 'V045',
    submittedAt: new Date('2025-10-02'),
    status: 'needs-review',
    size: 3456789,
    viewCount: 2,
    urgent: true,
    tags: ['id-verification', 'urgent', 'background-check'],
    description: 'National ID card for background verification'
  },
  {
    id: '4',
    fileName: 'Lisa_Wang_Reference_Letter.pdf',
    fileType: 'reference',
    category: 'Reference Documents',
    submittedBy: 'Lisa Wang',
    volunteerId: 'V078',
    submittedAt: new Date('2025-09-25'),
    status: 'approved',
    reviewedBy: 'Admin User',
    comments: 'Reference letter approved',
    size: 567890,
    viewCount: 5,
    urgent: false,
    tags: ['reference', 'verified', 'professional'],
    description: 'Professional reference letter from previous employer'
  },
];

const statuses = ['All Status', 'pending', 'approved', 'rejected', 'needs-review'];

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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getStatusBadge = (status: VolunteerSubmission['status']) => {
  const config = {
    pending: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock, label: 'Pending Review' },
    approved: { color: 'bg-green-50 text-[#166534] border-green-200', icon: CheckCircle, label: 'Approved' },
    rejected: { color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle, label: 'Rejected' },
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

// Iconos con FONDO de escala de verdes e ICONO BLANCO
const getTypeIcon = (type: VolunteerSubmission['fileType']) => {
  switch (type) {
    case 'cv':
      return <Briefcase className="w-5 h-5 text-white" />;
    case 'certificate':
      return <Award className="w-5 h-5 text-white" />;
    case 'id-document':
      return <Shield className="w-5 h-5 text-white" />;
    case 'reference':
      return <FileCheck className="w-5 h-5 text-white" />;
    default:
      return <File className="w-5 h-5 text-white" />;
  }
};

// Función para obtener el fondo del icono según tipo de documento
const getIconBackground = (type: VolunteerSubmission['fileType']): string => {
  switch (type) {
    case 'cv':
      return 'bg-[#166534]'; // green-800
    case 'certificate':
      return 'bg-[#059669]'; // emerald
    case 'id-document':
      return 'bg-[#14b8a6]'; // teal
    case 'reference':
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
            <span className="text-gray-600 ml-1">vs last week</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center shadow-sm`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const SubmissionCard = ({ submission, onView, onApprove, onReject }: {
  submission: VolunteerSubmission;
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50/30 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* ICONO: Fondo verde de la escala, icono blanco */}
          <div className={`p-2 ${getIconBackground(submission.fileType)} rounded-lg`}>
            {getTypeIcon(submission.fileType)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate group-hover:text-[#166534] transition-colors">
              {submission.fileName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <User className="w-3 h-3 text-gray-400" />
              <p className="text-xs text-gray-500">{submission.submittedBy}</p>
              <span className="text-xs text-gray-400">•</span>
              <p className="text-xs text-gray-500">ID: {submission.volunteerId}</p>
            </div>
          </div>
        </div>
        {submission.urgent && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3 h-3" />
            Urgent
          </span>
        )}
      </div>
    </div>

    <div className="p-4">
      <div className="mb-3">
        {getStatusBadge(submission.status)}
      </div>

      {submission.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{submission.description}</p>
      )}
      
      <div className="flex flex-wrap gap-1 mb-3">
        {submission.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-green-50 text-[#166534] text-xs rounded-full border border-green-200"
          >
            {tag}
          </span>
        ))}
        {submission.tags.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{submission.tags.length - 3}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(submission.submittedAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{submission.viewCount} views</span>
        </div>
        <div className="flex items-center gap-1">
          <File className="w-3 h-3" />
          <span>{formatFileSize(submission.size)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium truncate">{submission.category}</span>
        </div>
      </div>

      {submission.reviewedBy && (
        <div className="p-2 bg-gray-50 rounded-lg text-xs border border-gray-200">
          <p className="text-gray-600">
            <span className="font-medium">Reviewed by:</span> {submission.reviewedBy}
          </p>
          {submission.comments && (
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Comments:</span> {submission.comments}
            </p>
          )}
        </div>
      )}
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100">
      {submission.status === 'pending' || submission.status === 'needs-review' ? (
        <div className="flex gap-2">
          <button 
            onClick={() => onApprove(submission.id)} 
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button 
            onClick={() => onReject(submission.id)} 
            className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button 
            onClick={() => onView(submission.id)} 
            className="flex-1 px-3 py-2 bg-gradient-to-r from-[#22c55e] to-[#1dad52] text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button className="px-3 py-2 bg-white border border-slate-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function VolunteerSubmissions() {
  const [submissions, setSubmissions] = useState<VolunteerSubmission[]>(mockSubmissions);
  const [activeTab, setActiveTab] = useState<SubmissionType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'All Status',
    showUrgent: false
  });

  const submissionCounts = useMemo(() => {
    const counts: Record<SubmissionType, number> = {
      all: submissions.length,
      cv: submissions.filter(s => s.fileType === 'cv').length,
      certificate: submissions.filter(s => s.fileType === 'certificate').length,
      'id-document': submissions.filter(s => s.fileType === 'id-document').length,
      reference: submissions.filter(s => s.fileType === 'reference').length,
      other: submissions.filter(s => s.fileType === 'other').length,
    };
    return counts;
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    let filtered = [...submissions];

    if (activeTab !== 'all') {
      filtered = filtered.filter(s => s.fileType === activeTab);
    }

    if (filters.search) {
      filtered = filtered.filter(s =>
        s.fileName.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.submittedBy.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.volunteerId.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'All Status') {
      filtered = filtered.filter(s => s.status === filters.status);
    }

    if (filters.showUrgent) {
      filtered = filtered.filter(s => s.urgent);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.fileName.localeCompare(b.fileName);
          break;
        case 'date':
          comparison = a.submittedAt.getTime() - b.submittedAt.getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [submissions, activeTab, filters, sortBy, sortOrder]);

  const handleApprove = (id: string) => {
    setSubmissions(subs => subs.map(s => 
      s.id === id ? { ...s, status: 'approved' as const, reviewedBy: 'Admin User', comments: 'Document approved' } : s
    ));
  };

  const handleReject = (id: string) => {
    setSubmissions(subs => subs.map(s => 
      s.id === id ? { ...s, status: 'rejected' as const, reviewedBy: 'Admin User', comments: 'Document rejected' } : s
    ));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: 'All Status',
      showUrgent: false
    });
  };

  const stats = {
    totalSubmissions: filteredSubmissions.length,
    pendingReview: submissions.filter(s => s.status === 'pending' || s.status === 'needs-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    urgent: submissions.filter(s => s.urgent).length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10 text-[#166534]" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Volunteer Submissions</h1>
              <p className="text-gray-600 mt-1">
                Revisa y gestiona todos los documentos cargados por los voluntarios
              </p>
            </div>
          </div>

          {/* Stats Cards - cada una con diferente fondo de verde */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <StatsCard
              icon={FileText}
              label="Total Submissions"
              value={stats.totalSubmissions}
              iconBg="bg-gradient-to-br from-[#166534] to-[#14532d]"
            />
            <StatsCard
              icon={Clock}
              label="Pending Review"
              value={stats.pendingReview}
              trend="+3"
              iconBg="bg-gradient-to-br from-yellow-400 to-yellow-500"
            />
            <StatsCard
              icon={CheckCircle}
              label="Approved"
              value={stats.approved}
              iconBg="bg-gradient-to-br from-green-500 to-green-600"
            />
            <StatsCard
              icon={AlertCircle}
              label="Urgent"
              value={stats.urgent}
              iconBg="bg-gradient-to-br from-red-400 to-red-500"
            />
          </div>
        </div>

        {/* Tabs - Escala de Verdes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const count = submissionCounts[tab.id];
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
                  placeholder="Search by name, volunteer, or ID..."
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
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                      <option value="name">File Name</option>
                      <option value="date">Submission Date</option>
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
                    checked={filters.showUrgent}
                    onChange={(e) => setFilters(prev => ({ ...prev, showUrgent: e.target.checked }))}
                    className="w-4 h-4 text-[#166534] rounded focus:ring-2 focus:ring-[#166534]"
                  />
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium text-gray-700">Show Urgent Only</span>
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
            Showing <span className="font-semibold">{filteredSubmissions.length}</span> of{' '}
            <span className="font-semibold">{submissionCounts[activeTab]}</span> submissions
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
          </p>
          {(filters.search || filters.status !== 'All Status' || filters.showUrgent) && (
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
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No submissions found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.status !== 'All Status'
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'submissions'} available yet`
                }
              </p>
              {(filters.search || filters.status !== 'All Status') && (
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
            {filteredSubmissions.map(submission => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onView={(id: string) => console.log('View:', id)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}