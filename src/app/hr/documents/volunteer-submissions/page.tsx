// src/app/hr/documents/volunteer-submissions/page.tsx
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
  Image as ImageIcon,
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
  GraduationCap,
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
  reviewedAt?: Date;
  comments?: string;
  size: number;
  viewCount: number;
  urgent: boolean;
  tags: string[];
  description?: string;
}

type ViewMode = 'grid' | 'list';
type SortBy = 'date' | 'name' | 'status' | 'volunteer';
type SortOrder = 'asc' | 'desc';
type SubmissionType = 'all' | 'cv' | 'certificate' | 'id-document' | 'reference' | 'other';

interface FilterState {
  search: string;
  category: string;
  status: string;
  tags: string[];
  showUrgent: boolean;
  showPending: boolean;
}

interface TabConfig {
  id: SubmissionType;
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
    label: 'All Submissions', 
    icon: FileText, 
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  },
  { 
    id: 'cv', 
    label: 'CVs/Resumes', 
    icon: Briefcase, 
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  { 
    id: 'certificate', 
    label: 'Certificates', 
    icon: Award, 
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  { 
    id: 'id-document', 
    label: 'ID Documents', 
    icon: Shield, 
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  { 
    id: 'reference', 
    label: 'References', 
    icon: FileCheck, 
    color: 'text-green-600',
    bgColor: 'bg-green-50'
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
    reviewedAt: new Date('2025-09-29'),
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
    fileName: 'Lisa_Wang_Reference_Letter_Manager.pdf',
    fileType: 'reference',
    category: 'Reference Letters',
    submittedBy: 'Lisa Wang',
    volunteerId: 'V012',
    submittedAt: new Date('2025-09-25'),
    status: 'approved',
    reviewedBy: 'HR Manager',
    reviewedAt: new Date('2025-09-26'),
    comments: 'Excellent reference from previous employer',
    size: 456789,
    viewCount: 5,
    urgent: false,
    tags: ['reference', 'management', 'approved'],
    description: 'Reference letter from former manager at ABC Corp'
  },
  {
    id: '5',
    fileName: 'David_Martinez_First_Aid_Certificate.pdf',
    fileType: 'certificate',
    category: 'Safety Certifications',
    submittedBy: 'David Martinez',
    volunteerId: 'V067',
    submittedAt: new Date('2025-09-30'),
    status: 'approved',
    reviewedBy: 'Safety Officer',
    reviewedAt: new Date('2025-10-01'),
    size: 987654,
    viewCount: 4,
    urgent: false,
    tags: ['first-aid', 'safety', 'medical'],
    description: 'Red Cross First Aid and CPR certification'
  },
  {
    id: '6',
    fileName: 'Emily_Brown_Portfolio.pdf',
    fileType: 'other',
    category: 'Additional Materials',
    submittedBy: 'Emily Brown',
    volunteerId: 'V089',
    submittedAt: new Date('2025-10-03'),
    status: 'pending',
    size: 5678901,
    viewCount: 1,
    urgent: false,
    tags: ['portfolio', 'design', 'creative'],
    description: 'Design portfolio for marketing team application'
  },
  {
    id: '7',
    fileName: 'Robert_Taylor_CV_Updated.pdf',
    fileType: 'cv',
    category: 'Application Documents',
    submittedBy: 'Robert Taylor',
    volunteerId: 'V034',
    submittedAt: new Date('2025-09-27'),
    status: 'rejected',
    reviewedBy: 'HR Manager',
    reviewedAt: new Date('2025-09-28'),
    comments: 'Incomplete information. Please resubmit with full work history.',
    size: 234567,
    viewCount: 6,
    urgent: false,
    tags: ['cv', 'incomplete', 'resubmission-needed'],
    description: 'Updated CV for volunteer coordinator role'
  },
  {
    id: '8',
    fileName: 'Alice_Green_Background_Check_Consent.pdf',
    fileType: 'id-document',
    category: 'Identity Verification',
    submittedBy: 'Alice Green',
    volunteerId: 'V056',
    submittedAt: new Date('2025-10-01'),
    status: 'pending',
    size: 123456,
    viewCount: 2,
    urgent: true,
    tags: ['consent', 'background-check', 'urgent'],
    description: 'Signed consent form for background verification'
  },
  {
    id: '9',
    fileName: 'Jennifer_Wilson_Academic_Transcript.pdf',
    fileType: 'certificate',
    category: 'Educational Documents',
    submittedBy: 'Jennifer Wilson',
    volunteerId: 'V078',
    submittedAt: new Date('2025-09-29'),
    status: 'approved',
    reviewedBy: 'Admin User',
    reviewedAt: new Date('2025-09-30'),
    size: 2345678,
    viewCount: 3,
    urgent: false,
    tags: ['education', 'transcript', 'verified'],
    description: 'Official university transcript'
  },
  {
    id: '10',
    fileName: 'Michael_Johnson_Professional_Reference.pdf',
    fileType: 'reference',
    category: 'Reference Letters',
    submittedBy: 'Michael Johnson',
    volunteerId: 'V091',
    submittedAt: new Date('2025-10-02'),
    status: 'needs-review',
    size: 345678,
    viewCount: 1,
    urgent: false,
    tags: ['reference', 'professional', 'pending'],
    description: 'Professional reference from colleague'
  },
];

const categories = ['All Categories', 'Application Documents', 'Professional Certifications', 'Identity Verification', 'Reference Letters', 'Safety Certifications', 'Additional Materials', 'Educational Documents'];
const statuses = ['All Status', 'pending', 'approved', 'rejected', 'needs-review'];
const availableTags = ['new-applicant', 'project-lead', 'urgent', 'teaching', 'education', 'verified', 'id-verification', 'background-check', 'reference', 'management', 'approved', 'first-aid', 'safety', 'medical', 'portfolio', 'design', 'creative', 'cv', 'incomplete', 'resubmission-needed', 'consent', 'transcript', 'professional', 'pending'];

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
  const statusConfig = {
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Pending Review' },
    approved: { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, label: 'Rejected' },
    'needs-review': { color: 'bg-orange-100 text-orange-700', icon: AlertCircle, label: 'Needs Review' }
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

const getTypeIcon = (type: VolunteerSubmission['fileType']) => {
  switch (type) {
    case 'cv':
      return <Briefcase className="w-5 h-5 text-purple-500" />;
    case 'certificate':
      return <Award className="w-5 h-5 text-blue-500" />;
    case 'id-document':
      return <Shield className="w-5 h-5 text-orange-500" />;
    case 'reference':
      return <FileCheck className="w-5 h-5 text-green-500" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatsCard = ({ icon: Icon, label, value, trend, color = 'purple' }: { 
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

const SubmissionCard = ({ submission, onView, onApprove, onReject, onDelete }: {
  submission: VolunteerSubmission;
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    {/* Card Header */}
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            {getTypeIcon(submission.fileType)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors">
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
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle className="w-3 h-3" />
            Urgent
          </span>
        )}
      </div>
    </div>

    {/* Card Body */}
    <div className="p-4">
      {/* Status Badge */}
      <div className="mb-3">
        {getStatusBadge(submission.status)}
      </div>

      {submission.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{submission.description}</p>
      )}
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {submission.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-full"
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

      {/* Metadata */}
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
          <span className="font-medium">{submission.category}</span>
        </div>
      </div>

      {/* Review Info */}
      {submission.reviewedBy && (
        <div className="p-2 bg-gray-50 rounded-lg text-xs">
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

    {/* Card Footer */}
    <div className="p-4 bg-gray-50 border-t border-gray-100">
      {submission.status === 'pending' || submission.status === 'needs-review' ? (
        <div className="flex gap-2">
          <button
            onClick={() => onApprove(submission.id)}
            className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button
            onClick={() => onReject(submission.id)}
            className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Reject
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => onView(submission.id)}
            className="flex-1 px-3 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onDelete(submission.id)}
            className="px-3 py-2 bg-white border border-gray-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  </div>
);

const SubmissionListItem = ({ submission, onView, onApprove, onReject, onDelete }: {
  submission: VolunteerSubmission;
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      {/* Icon */}
      <div className="p-3 bg-gray-50 rounded-lg">
        {getTypeIcon(submission.fileType)}
      </div>

      {/* Submission Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 hover:text-purple-600 transition-colors cursor-pointer">
                {submission.fileName}
              </h3>
              {submission.urgent && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  <AlertCircle className="w-3 h-3" />
                  Urgent
                </span>
              )}
            </div>
            {submission.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">{submission.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {getStatusBadge(submission.status)}
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {submission.submittedBy} (ID: {submission.volunteerId})
              </span>
              <span>•</span>
              <span>{submission.category}</span>
              <span>•</span>
              <span>{formatDate(submission.submittedAt)}</span>
              <span>•</span>
              <span>{formatFileSize(submission.size)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {submission.status === 'pending' || submission.status === 'needs-review' ? (
              <>
                <button
                  onClick={() => onApprove(submission.id)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => onReject(submission.id)}
                  className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            ) : (
              <button
                onClick={() => onView(submission.id)}
                className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
            )}
            <button
              onClick={() => onDelete(submission.id)}
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

export default function VolunteerSubmissions() {
  const [submissions, setSubmissions] = useState<VolunteerSubmission[]>(mockSubmissions);
  const [activeTab, setActiveTab] = useState<SubmissionType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'All Categories',
    status: 'All Status',
    tags: [],
    showUrgent: false,
    showPending: false
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get submissions count by type
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

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = [...submissions];

    // Tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(sub => sub.fileType === activeTab);
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(sub =>
        sub.fileName.toLowerCase().includes(filters.search.toLowerCase()) ||
        sub.submittedBy.toLowerCase().includes(filters.search.toLowerCase()) ||
        sub.volunteerId.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(sub => sub.category === filters.category);
    }

    // Status filter
    if (filters.status !== 'All Status') {
      filtered = filtered.filter(sub => sub.status === filters.status);
    }

    // Urgent filter
    if (filters.showUrgent) {
      filtered = filtered.filter(sub => sub.urgent);
    }

    // Pending filter
    if (filters.showPending) {
      filtered = filtered.filter(sub => sub.status === 'pending' || sub.status === 'needs-review');
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(sub =>
        filters.tags.some(tag => sub.tags.includes(tag))
      );
    }

    // Sort
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
        case 'volunteer':
          comparison = a.submittedBy.localeCompare(b.submittedBy);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [submissions, activeTab, filters, sortBy, sortOrder]);

  const handleView = (id: string) => {
    console.log('Viewing submission:', id);
  };

  const handleApprove = (id: string) => {
    setSubmissions(subs =>
      subs.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'approved' as const,
          reviewedBy: 'Admin User',
          reviewedAt: new Date(),
          comments: 'Document approved'
        } : sub
      )
    );
  };

  const handleReject = (id: string) => {
    setSubmissions(subs =>
      subs.map(sub =>
        sub.id === id ? {
          ...sub,
          status: 'rejected' as const,
          reviewedBy: 'Admin User',
          reviewedAt: new Date(),
          comments: 'Document rejected - please resubmit'
        } : sub
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      setSubmissions(subs => subs.filter(sub => sub.id !== id));
    }
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
      tags: [],
      showUrgent: false,
      showPending: false
    });
  };

  const stats = {
    totalSubmissions: filteredSubmissions.length,
    pendingReview: submissions.filter(s => s.status === 'pending' || s.status === 'needs-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    urgent: submissions.filter(s => s.urgent).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Volunteer Submissions for Approval</h1>
              <p className="text-gray-600 mt-1">
                Revisa y gestiona todos los documentos cargados por los voluntarios
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard
              icon={FileText}
              label="Total Submissions"
              value={stats.totalSubmissions}
              color="purple"
            />
            <StatsCard
              icon={Clock}
              label="Pending Review"
              value={stats.pendingReview}
              color="yellow"
            />
            <StatsCard
              icon={CheckCircle}
              label="Approved"
              value={stats.approved}
              color="green"
            />
            <StatsCard
              icon={AlertCircle}
              label="Urgent"
              value={stats.urgent}
              color="red"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
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
                  placeholder="Search by name, volunteer, or ID..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-100 text-purple-600'
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
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
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="date">Date</option>
                      <option value="name">File Name</option>
                      <option value="volunteer">Volunteer</option>
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
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
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
                      checked={filters.showUrgent}
                      onChange={(e) => setFilters(prev => ({ ...prev, showUrgent: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">Urgent Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.showPending}
                      onChange={(e) => setFilters(prev => ({ ...prev, showPending: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">Pending Review Only</span>
                  </label>
                </div>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
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
            Showing <span className="font-semibold">{filteredSubmissions.length}</span> of{' '}
            <span className="font-semibold">{submissionCounts[activeTab]}</span> submissions
            {activeTab !== 'all' && <span className="text-gray-400"> in {tabs.find(t => t.id === activeTab)?.label}</span>}
          </p>
          {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0 || filters.showUrgent || filters.showPending) && (
            <button
              onClick={clearFilters}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Submissions Display */}
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.category !== 'All Categories' || filters.tags.length > 0
                  ? 'Try adjusting your filters or search terms'
                  : `No ${activeTab !== 'all' ? tabs.find(t => t.id === activeTab)?.label.toLowerCase() : 'submissions'} available yet`
                }
              </p>
              {(filters.search || filters.category !== 'All Categories' || filters.tags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map(submission => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onView={handleView}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map(submission => (
              <SubmissionListItem
                key={submission.id}
                submission={submission}
                onView={handleView}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}