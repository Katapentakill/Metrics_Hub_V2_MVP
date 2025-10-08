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

const tabs = [
  { id: 'all' as SubmissionType, label: 'All Submissions', icon: FileText, color: 'text-gray-600', bgColor: 'bg-gray-50' },
  { id: 'cv' as SubmissionType, label: 'CVs/Resumes', icon: Briefcase, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  { id: 'certificate' as SubmissionType, label: 'Certificates', icon: Award, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { id: 'id-document' as SubmissionType, label: 'ID Documents', icon: Shield, color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 'reference' as SubmissionType, label: 'References', icon: FileCheck, color: 'text-lime-600', bgColor: 'bg-lime-50' },
];

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
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getStatusBadge = (status: string) => {
  const configs: Record<string, any> = {
    pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, label: 'Pending Review' },
    approved: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle, label: 'Approved' },
    rejected: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Rejected' },
    'needs-review': { color: 'bg-orange-100 text-orange-700 border-orange-200', icon: AlertCircle, label: 'Needs Review' }
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
    case 'cv': return <Briefcase className="w-5 h-5 text-emerald-600" />;
    case 'certificate': return <Award className="w-5 h-5 text-teal-600" />;
    case 'id-document': return <Shield className="w-5 h-5 text-green-600" />;
    case 'reference': return <FileCheck className="w-5 h-5 text-lime-600" />;
    default: return <File className="w-5 h-5 text-gray-500" />;
  }
};

const SubmissionCard = ({ submission, onView, onApprove, onReject }: any) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50/30 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-white rounded-lg border border-emerald-100">
            {getTypeIcon(submission.fileType)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
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
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
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
        {submission.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
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
          <span className="font-medium">{submission.category}</span>
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
          <button onClick={() => onApprove(submission.id)} className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approve
          </button>
          <button onClick={() => onReject(submission.id)} className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2">
            <XCircle className="w-4 h-4" />
            Reject
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => onView(submission.id)} className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            View
          </button>
          <button className="px-3 py-2 bg-white border border-gray-200 text-red-600 text-sm rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  </div>
);

export default function VolunteerSubmissions() {
  const [submissions, setSubmissions] = useState<VolunteerSubmission[]>(mockSubmissions);
  const [activeTab, setActiveTab] = useState<SubmissionType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const submissionCounts = useMemo(() => {
    return {
      all: submissions.length,
      cv: submissions.filter(s => s.fileType === 'cv').length,
      certificate: submissions.filter(s => s.fileType === 'certificate').length,
      'id-document': submissions.filter(s => s.fileType === 'id-document').length,
      reference: submissions.filter(s => s.fileType === 'reference').length,
      other: submissions.filter(s => s.fileType === 'other').length,
    };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    let filtered = [...submissions];
    if (activeTab !== 'all') {
      filtered = filtered.filter(s => s.fileType === activeTab);
    }
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.volunteerId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [submissions, activeTab, searchTerm]);

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

  const stats = {
    totalSubmissions: filteredSubmissions.length,
    pendingReview: submissions.filter(s => s.status === 'pending' || s.status === 'needs-review').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    urgent: submissions.filter(s => s.urgent).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10 text-emerald-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Volunteer Submissions</h1>
              <p className="text-gray-600 mt-1">
                Revisa y gestiona todos los documentos cargados por los voluntarios
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions}</p>
              <p className="text-sm text-gray-600">Total Submissions</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingReview}</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
              <p className="text-sm text-gray-600">Urgent</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const count = submissionCounts[tab.id];
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
                  placeholder="Search by name, volunteer, or ID..."
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
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredSubmissions.length}</span> of{' '}
            <span className="font-semibold">{submissionCounts[activeTab]}</span> submissions
          </p>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No submissions found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
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