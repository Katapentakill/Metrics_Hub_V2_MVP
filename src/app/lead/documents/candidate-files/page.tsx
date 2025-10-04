'use client';
import { useState, useMemo } from 'react';
import { 
  UserCheck, 
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
  Users,
  TrendingUp,
  ChevronDown,
  X,
  File,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Eye,
  Briefcase,
  Mail
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  appliedAt: Date;
  status: string;
  cvLink: string;
  team: string;
  downloads: number;
  isFavorite: boolean;
  tags: string[];
}

type ViewMode = 'grid' | 'list';
type SortBy = 'name' | 'date' | 'role';
type SortOrder = 'asc' | 'desc';

interface FilterState {
  search: string;
  role: string;
  status: string;
  showFavorites: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Ana García Pérez',
    role: 'Desarrollador Frontend',
    email: 'ana.garcia@email.com',
    appliedAt: new Date('2025-09-28'),
    status: 'En Proceso',
    cvLink: 'https://docs.google.com/document/d/cv_ana',
    team: 'Vitalink',
    downloads: 12,
    isFavorite: true,
    tags: ['frontend', 'react', 'senior']
  },
  {
    id: '2',
    name: 'Carlos Rodríguez López',
    role: 'UX Designer',
    email: 'carlos.rodriguez@email.com',
    appliedAt: new Date('2025-09-25'),
    status: 'Entrevista',
    cvLink: 'https://docs.google.com/document/d/cv_carlos',
    team: 'Vitalink',
    downloads: 8,
    isFavorite: false,
    tags: ['ux', 'diseño', 'figma']
  },
  {
    id: '3',
    name: 'María Fernández Silva',
    role: 'Project Manager',
    email: 'maria.fernandez@email.com',
    appliedAt: new Date('2025-09-20'),
    status: 'Aprobado',
    cvLink: 'https://docs.google.com/document/d/cv_maria',
    team: 'Vitalink',
    downloads: 15,
    isFavorite: true,
    tags: ['pm', 'agile', 'senior']
  },
  {
    id: '4',
    name: 'Juan Martínez Gómez',
    role: 'Backend Developer',
    email: 'juan.martinez@email.com',
    appliedAt: new Date('2025-09-18'),
    status: 'En Revisión',
    cvLink: 'https://docs.google.com/document/d/cv_juan',
    team: 'Vitalink',
    downloads: 5,
    isFavorite: false,
    tags: ['backend', 'nodejs', 'junior']
  },
];

const roles = ['Todos los Roles', 'Desarrollador Frontend', 'UX Designer', 'Project Manager', 'Backend Developer'];
const statuses = ['Todos', 'En Proceso', 'Entrevista', 'Aprobado', 'En Revisión'];

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aprobado':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Entrevista':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'En Proceso':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const StatsCard = ({ icon: Icon, label, value, trend }: any) => (
  <div className="group relative bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2.5 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      {trend && (
        <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-full">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm font-medium text-gray-600">{label}</p>
  </div>
);

const CandidateCard = ({ candidate, onToggleFavorite }: any) => (
  <div className="group bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
    <div className="relative p-5 border-b border-gray-100">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
            <UserCheck className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate text-base mb-1">
              {candidate.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {candidate.role}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </span>
            </div>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(candidate.id)} className="p-2 hover:bg-yellow-50 rounded-lg">
          <Star className={`w-5 h-5 ${candidate.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        </button>
      </div>
    </div>

    <div className="p-5">
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="truncate">{candidate.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>Aplicó: {formatDate(candidate.appliedAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Download className="w-4 h-4 text-gray-400" />
          <span>{candidate.downloads} vistas</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {candidate.tags.map((tag: string) => (
          <span key={tag} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <a href={candidate.cvLink} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2">
        <ExternalLink className="w-4 h-4" />
        Ver CV
        <ArrowRight className="w-4 h-4" />
      </a>
      <button className="px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-indigo-300">
        <Eye className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default function LeadCandidateFiles() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    role: 'Todos los Roles',
    status: 'Todos',
    showFavorites: false
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    if (filters.search) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.role !== 'Todos los Roles') {
      filtered = filtered.filter(c => c.role === filters.role);
    }

    if (filters.status !== 'Todos') {
      filtered = filtered.filter(c => c.status === filters.status);
    }

    if (filters.showFavorites) {
      filtered = filtered.filter(c => c.isFavorite);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = a.appliedAt.getTime() - b.appliedAt.getTime();
          break;
        case 'role':
          comparison = a.role.localeCompare(b.role);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [candidates, filters, sortBy, sortOrder]);

  const handleToggleFavorite = (id: string) => {
    setCandidates(cands => cands.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const stats = {
    total: candidates.length,
    inProcess: candidates.filter(c => c.status === 'En Proceso').length,
    interview: candidates.filter(c => c.status === 'Entrevista').length,
    favorites: candidates.filter(c => c.isFavorite).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">Documentos de Candidatos</h1>
                <Sparkles className="w-6 h-6 text-indigo-500" />
              </div>
              <p className="text-gray-600 text-lg">CVs y documentos de postulación de candidatos del equipo Vitalink</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard icon={Users} label="Total Candidatos" value={stats.total} />
            <StatsCard icon={Clock} label="En Proceso" value={stats.inProcess} trend="+3" />
            <StatsCard icon={FileText} label="En Entrevista" value={stats.interview} />
            <StatsCard icon={Star} label="Destacados" value={stats.favorites} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar candidatos..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600 shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-5 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtros
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="pt-6 border-t-2 border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Rol</label>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    {roles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Estado</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  >
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ordenar</label>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="name">Nombre</option>
                      <option value="date">Fecha</option>
                      <option value="role">Rol</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-3 bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.showFavorites}
                  onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                  className="w-4 h-4"
                />
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-gray-700">Solo Destacados</span>
              </label>
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">
            Mostrando <span className="font-bold text-gray-900">{filteredCandidates.length}</span> de{' '}
            <span className="font-bold text-gray-900">{candidates.length}</span> candidatos
          </p>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <FileText className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay candidatos</h3>
            <p className="text-gray-600">No se encontraron candidatos con los filtros seleccionados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}