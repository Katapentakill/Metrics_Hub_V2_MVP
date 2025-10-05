'use client';

import { useState, useMemo } from 'react';
import {
  Award,
  Search,
  Filter,
  Download,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  FileText,
  User,
  Star,
  Clock,
  Calendar,
  TrendingUp,
  ChevronDown,
  Plus,
  X,
  CheckCircle,
  Send,
  Minimize2,
  Mail
} from 'lucide-react';

interface TerminationCertificate {
  id: string;
  volunteerName: string;
  volunteerEmail: string;
  position: string;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  department: string;
  reason: 'completed' | 'resignation' | 'relocation' | 'other';
  certificateIssued: boolean;
  issuedDate?: Date;
  issuedBy?: string;
  isFavorite: boolean;
  notes?: string;
  achievements?: string[];
}

type ViewMode = 'grid' | 'list' | 'minimalist';
type SortBy = 'endDate' | 'volunteerName' | 'totalHours';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  department: string;
  reason: string;
  certificateStatus: string;
  showFavorites: boolean;
}

const departments = ['All Departments', 'Community Outreach', 'Education', 'Events', 'Fundraising', 'Administrative', 'Other'];
const reasonOptions = ['All Reasons', 'completed', 'resignation', 'relocation', 'other'];
const certificateStatusOptions = ['All Status', 'issued', 'pending'];

const mockCertificates: TerminationCertificate[] = [
  {
    id: '1',
    volunteerName: 'María González',
    volunteerEmail: 'maria.gonzalez@email.com',
    position: 'Community Event Coordinator',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-09-30'),
    totalHours: 450,
    department: 'Events',
    reason: 'completed',
    certificateIssued: true,
    issuedDate: new Date('2025-10-02'),
    issuedBy: 'Sarah Johnson',
    isFavorite: true,
    notes: 'Exceptional service organizing 15 major community events',
    achievements: ['Event Planning Excellence', 'Community Leadership', 'Team Collaboration']
  },
  {
    id: '2',
    volunteerName: 'Carlos Rodríguez',
    volunteerEmail: 'carlos.r@email.com',
    position: 'Education Program Assistant',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2025-08-31'),
    totalHours: 620,
    department: 'Education',
    reason: 'relocation',
    certificateIssued: true,
    issuedDate: new Date('2025-09-05'),
    issuedBy: 'Mike Chen',
    isFavorite: true,
    notes: 'Moving to another state for family reasons. Outstanding contribution to youth education programs.',
    achievements: ['Mentorship Excellence', 'Curriculum Development', 'Student Impact']
  },
  {
    id: '3',
    volunteerName: 'Ana Martínez',
    volunteerEmail: 'ana.m@email.com',
    position: 'Fundraising Volunteer',
    startDate: new Date('2024-03-10'),
    endDate: new Date('2025-09-15'),
    totalHours: 280,
    department: 'Fundraising',
    reason: 'completed',
    certificateIssued: false,
    isFavorite: false,
    notes: 'Completed volunteer commitment period',
    achievements: ['Campaign Success', 'Donor Relations']
  },
  {
    id: '4',
    volunteerName: 'Luis Hernández',
    volunteerEmail: 'luis.h@email.com',
    position: 'Administrative Support',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2025-10-01'),
    totalHours: 540,
    department: 'Administrative',
    reason: 'resignation',
    certificateIssued: false,
    isFavorite: false,
    notes: 'Pursuing full-time employment opportunity',
    achievements: ['Administrative Excellence', 'Process Improvement']
  },
  {
    id: '5',
    volunteerName: 'Elena Torres',
    volunteerEmail: 'elena.t@email.com',
    position: 'Community Outreach Coordinator',
    startDate: new Date('2022-11-15'),
    endDate: new Date('2025-08-20'),
    totalHours: 890,
    department: 'Community Outreach',
    reason: 'completed',
    certificateIssued: true,
    issuedDate: new Date('2025-08-25'),
    issuedBy: 'David Martinez',
    isFavorite: true,
    notes: 'Nearly 3 years of exceptional service to the community',
    achievements: ['Community Impact', 'Partnership Development', 'Leadership', 'Innovation']
  },
  {
    id: '6',
    volunteerName: 'Roberto Silva',
    volunteerEmail: 'roberto.s@email.com',
    position: 'Event Photographer',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2025-09-30'),
    totalHours: 180,
    department: 'Events',
    reason: 'other',
    certificateIssued: false,
    isFavorite: false,
    notes: 'Personal health reasons',
    achievements: ['Creative Excellence', 'Visual Storytelling']
  }
];

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const calculateServiceDuration = (startDate: Date, endDate: Date): string => {
  const months = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years > 0) {
    return remainingMonths > 0 
      ? `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
      : `${years} year${years > 1 ? 's' : ''}`;
  }
  return `${months} month${months > 1 ? 's' : ''}`;
};

const getReasonBadge = (reason: TerminationCertificate['reason']) => {
  switch (reason) {
    case 'completed':
      return <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
        Program Completed
      </span>;
    case 'resignation':
      return <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
        Resignation
      </span>;
    case 'relocation':
      return <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
        Relocation
      </span>;
    case 'other':
      return <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
        Other
      </span>;
  }
};

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

const CertificateCard = ({ cert, onToggleFavorite, onIssueCertificate }: {
  cert: TerminationCertificate;
  onToggleFavorite: (id: string) => void;
  onIssueCertificate: (id: string) => void;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-transparent">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{cert.volunteerName}</h3>
            <p className="text-xs text-gray-500 truncate">{cert.position}</p>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(cert.id)} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Star className={`w-5 h-5 ${cert.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {cert.certificateIssued ? (
          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" /> Certificate Issued
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" /> Pending
          </span>
        )}
        {getReasonBadge(cert.reason)}
      </div>
    </div>

    <div className="p-4">
      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-gray-500">Department</p>
          <p className="font-medium text-gray-900">{cert.department}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Total Hours</p>
          <p className="font-medium text-green-600">{cert.totalHours} hrs</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Service Period</p>
          <p className="font-medium text-gray-900">{calculateServiceDuration(cert.startDate, cert.endDate)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">End Date</p>
          <p className="font-medium text-gray-900">{formatDate(cert.endDate)}</p>
        </div>
      </div>

      {cert.achievements && cert.achievements.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Achievements</p>
          <div className="flex flex-wrap gap-1">
            {cert.achievements.slice(0, 2).map(achievement => (
              <span key={achievement} className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                {achievement}
              </span>
            ))}
            {cert.achievements.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                +{cert.achievements.length - 2}
              </span>
            )}
          </div>
        </div>
      )}

      {cert.notes && (
        <p className="text-sm text-gray-600 italic mb-3 line-clamp-2">"{cert.notes}"</p>
      )}

      {cert.certificateIssued && cert.issuedBy && (
        <div className="text-xs text-gray-500 pt-3 border-t border-gray-100">
          Issued by {cert.issuedBy} on {formatDate(cert.issuedDate!)}
        </div>
      )}
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      {cert.certificateIssued ? (
        <>
          <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </>
      ) : (
        <button
          onClick={() => onIssueCertificate(cert.id)}
          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Award className="w-4 h-4" />
          Issue Certificate
        </button>
      )}
    </div>
  </div>
);

const CertificateListItem = ({ cert, onToggleFavorite, onIssueCertificate }: {
  cert: TerminationCertificate;
  onToggleFavorite: (id: string) => void;
  onIssueCertificate: (id: string) => void;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-6 h-6 text-green-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{cert.volunteerName}</h3>
              {cert.certificateIssued ? (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Issued
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" /> Pending
                </span>
              )}
              {getReasonBadge(cert.reason)}
            </div>
            <p className="text-sm text-gray-600 mb-2">{cert.position} • {cert.department}</p>

            {cert.achievements && cert.achievements.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {cert.achievements.map(achievement => (
                  <span key={achievement} className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                    {achievement}
                  </span>
                ))}
              </div>
            )}

            {cert.notes && (
              <p className="text-sm text-gray-600 italic mb-2">"{cert.notes}"</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(cert.startDate)} - {formatDate(cert.endDate)}
              </span>
              <span className="flex items-center gap-1 text-green-600">
                <Clock className="w-3 h-3" />
                {cert.totalHours} hours
              </span>
              <span>{calculateServiceDuration(cert.startDate, cert.endDate)}</span>
              {cert.certificateIssued && cert.issuedBy && (
                <span className="text-green-600">
                  Issued by {cert.issuedBy}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => onToggleFavorite(cert.id)} className="p-2 hover:bg-gray-100 rounded transition-colors">
              <Star className={`w-5 h-5 ${cert.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </button>
            {cert.certificateIssued ? (
              <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            ) : (
              <button
                onClick={() => onIssueCertificate(cert.id)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                Issue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CertificateMinimalistItem = ({ cert, onToggleFavorite, onIssueCertificate }: {
  cert: TerminationCertificate;
  onToggleFavorite: (id: string) => void;
  onIssueCertificate: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:border-green-400 hover:shadow-sm transition-all duration-150 p-3">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <User className="w-4 h-4 text-green-600 flex-shrink-0" />
        <span className="font-medium text-gray-800 text-sm truncate">{cert.volunteerName}</span>
        <span className="text-xs text-gray-500 truncate hidden md:inline">• {cert.position}</span>
        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap hidden lg:inline-flex">
          {cert.totalHours} hrs
        </span>
        {cert.certificateIssued ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <Clock className="w-4 h-4 text-yellow-600" />
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button onClick={() => onToggleFavorite(cert.id)} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Star className={`w-4 h-4 ${cert.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
        {cert.certificateIssued ? (
          <button className="p-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onIssueCertificate(cert.id)}
            className="p-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
          >
            <Award className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default function VolunteerTerminationPage() {
  const [certificates, setCertificates] = useState<TerminationCertificate[]>(mockCertificates);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('endDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    department: 'All Departments',
    reason: 'All Reasons',
    certificateStatus: 'All Status',
    showFavorites: false
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredCertificates = useMemo(() => {
    let filtered = [...certificates];

    if (filters.search) {
      filtered = filtered.filter(cert =>
        cert.volunteerName.toLowerCase().includes(filters.search.toLowerCase()) ||
        cert.position.toLowerCase().includes(filters.search.toLowerCase()) ||
        cert.volunteerEmail.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.department !== 'All Departments') {
      filtered = filtered.filter(cert => cert.department === filters.department);
    }

    if (filters.reason !== 'All Reasons') {
      filtered = filtered.filter(cert => cert.reason === filters.reason);
    }

    if (filters.certificateStatus !== 'All Status') {
      const isIssued = filters.certificateStatus === 'issued';
      filtered = filtered.filter(cert => cert.certificateIssued === isIssued);
    }

    if (filters.showFavorites) {
      filtered = filtered.filter(cert => cert.isFavorite);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'volunteerName':
          comparison = a.volunteerName.localeCompare(b.volunteerName);
          break;
        case 'endDate':
          comparison = a.endDate.getTime() - b.endDate.getTime();
          break;
        case 'totalHours':
          comparison = a.totalHours - b.totalHours;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [certificates, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setCertificates(certs => certs.map(cert => cert.id === id ? { ...cert, isFavorite: !cert.isFavorite } : cert));
  };

  const handleIssueCertificate = (id: string) => {
    setCertificates(certs => certs.map(cert => 
      cert.id === id ? {
        ...cert,
        certificateIssued: true,
        issuedDate: new Date(),
        issuedBy: 'Current User'
      } : cert
    ));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      department: 'All Departments',
      reason: 'All Reasons',
      certificateStatus: 'All Status',
      showFavorites: false
    });
  };

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.certificateIssued).length,
    pending: certificates.filter(c => !c.certificateIssued).length,
    totalHours: certificates.reduce((sum, c) => sum + c.totalHours, 0)
  };

  const isFilterActive = filters.search || filters.department !== 'All Departments' || filters.reason !== 'All Reasons' || filters.certificateStatus !== 'All Status' || filters.showFavorites;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Certificados de Terminación</h1>
              <p className="text-gray-600 mt-1">
                Administra y emite los certificados de finalización para los voluntarios, reconociendo su servicio y contribución.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard icon={Award} label="Total Certificates" value={stats.total} color="green" />
            <StatsCard icon={CheckCircle} label="Issued" value={stats.issued} color="blue" />
            <StatsCard icon={Clock} label="Pending" value={stats.pending} color="yellow" />
            <StatsCard icon={TrendingUp} label="Total Hours" value={`${stats.totalHours.toLocaleString()}`} color="purple" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by volunteer name, position, or email..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <List className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('minimalist')} className={`p-2 rounded-lg transition-colors ${viewMode === 'minimalist' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Certificate
            </button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <select
                    value={filters.reason}
                    onChange={(e) => setFilters(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {reasonOptions.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Status</label>
                  <select
                    value={filters.certificateStatus}
                    onChange={(e) => setFilters(prev => ({ ...prev, certificateStatus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {certificateStatusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="endDate">End Date</option>
                      <option value="volunteerName">Name</option>
                      <option value="totalHours">Hours</option>
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
                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Show Favorites Only</span>
                </label>
                <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredCertificates.length}</span> of <span className="font-semibold">{certificates.length}</span> certificates
          </p>
          {isFilterActive && (
            <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {filteredCertificates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <Award className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Clear Filters
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map(cert => (
              <CertificateCard key={cert.id} cert={cert} onToggleFavorite={handleToggleFavorite} onIssueCertificate={handleIssueCertificate} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredCertificates.map(cert => (
              <CertificateListItem key={cert.id} cert={cert} onToggleFavorite={handleToggleFavorite} onIssueCertificate={handleIssueCertificate} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCertificates.map(cert => (
              <CertificateMinimalistItem key={cert.id} cert={cert} onToggleFavorite={handleToggleFavorite} onIssueCertificate={handleIssueCertificate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}