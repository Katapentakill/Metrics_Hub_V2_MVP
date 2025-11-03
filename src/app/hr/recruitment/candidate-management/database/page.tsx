// src/app/hr/recruitment/candidate-management/database/page.tsx
'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Download,
  Eye,
  Edit,
  UserPlus,
  BarChart3,
  TrendingUp,
  Award,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminPageLayout from '@/modules/recruitment/hr/components/AdminPageLayout';
import AdminStatusBadge from '@/modules/recruitment/hr/components/AdminStatusBadge';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { CANDIDATE_STATUSES, AVAILABLE_ROLES, VOLUNTEER_TYPES } from '@/modules/recruitment/shared/constants';

// ============================================================================
// KPI CARD COMPONENT (mismo diseño que Tracker/Document Hub)
// ============================================================================

const StatCard = ({ 
  label, 
  value, 
  trend, 
  icon: Icon, 
  color 
}: {
  label: string;
  value: string | number;
  trend?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) => {
  const isUp = trend && trend.includes('+');
  const trendColor = isUp ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50';

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendColor}`}>
            <TrendingUp className={`w-3 h-3 ${isUp ? 'text-emerald-700' : 'text-red-700 rotate-180'}`} />
            <span className="text-xs font-medium">{trend}</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

// ============================================================================
// DATOS
// ============================================================================

// Generar datos más ricos para la base de datos
const generateEnhancedCandidateData = (baseData: MockCandidate[]) => {
  return baseData.map((candidate, index) => ({
    ...candidate,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA'][index % 10],
    experience: Math.floor(Math.random() * 10) + 1,
    education: ['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Associate Degree', 'High School'][Math.floor(Math.random() * 5)],
    skills: [
      ['JavaScript', 'React', 'Node.js'],
      ['Python', 'Data Analysis', 'SQL'],
      ['Design', 'Figma', 'Adobe Creative Suite'],
      ['Project Management', 'Agile', 'Scrum'],
      ['Marketing', 'SEO', 'Content Creation']
    ][Math.floor(Math.random() * 5)],
    salary: Math.floor(Math.random() * 50000) + 40000,
    availability: ['Immediate', 'Two Weeks', 'One Month', 'Flexible'][Math.floor(Math.random() * 4)],
    source: ['LinkedIn', 'Company Website', 'Referral', 'Job Board', 'Recruiter'][Math.floor(Math.random() * 5)],
    rating: Math.floor(Math.random() * 5) + 1,
    notes: Math.floor(Math.random() * 10) + 1,
    interviews: Math.floor(Math.random() * 3),
    lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

const initialMockData = generateEnhancedCandidateData(getMockRecruitmentData(150));

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AdminCandidateDatabasePage() {
  const [candidates] = useState(initialMockData);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
    location: 'all',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      role: 'all',
      volunteerType: 'all',
      location: 'all',
    });
  };

  // Filtrar candidatos
  const filteredCandidates = useMemo(() => {
    let result = candidates;

    // Búsqueda por texto
    if (filters.search) {
      result = result.filter(candidate =>
        candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.appliedRole.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(c => c.applicationStatus === filters.status);
    }

    if (filters.role !== 'all') {
      result = result.filter(c => c.appliedRole === filters.role);
    }

    if (filters.volunteerType !== 'all') {
      result = result.filter(c => c.volunteerType === filters.volunteerType);
    }

    if (filters.location !== 'all') {
      result = result.filter(c => c.location === filters.location);
    }

    return result;
  }, [candidates, filters]);

  const handleExport = () => {
    console.log('Exportando base de datos de candidatos...');
  };

  const getStatusBadgeProps = (status: string) => {
    if (status.includes('Rejected')) return { status: 'closed' as const, text: 'Rechazado' };
    if (status.includes('Accepted') || status === 'Onboard') return { status: 'success' as const, text: 'Aprobado' };
    if (status.includes('Interview')) return { status: 'warning' as const, text: 'Entrevista' };
    if (status.includes('Review')) return { status: 'info' as const, text: 'Revisión' };
    return { status: 'pending' as const, text: status };
  };

  const headerActions = (
    <>
      <Button variant="outline" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button 
        size="lg" 
        className="bg-gradient-to-br from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white shadow-md"
      >
        <UserPlus className="mr-2 h-5 w-5" />
        Agregar Candidato
      </Button>
    </>
  );

  const locations = [...new Set(candidates.map(c => c.location))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/20 to-gray-100">
      <AdminPageLayout
        title="Base de Datos de Candidatos"
        subtitle="Panel de Administración"
        description="Accede a un repositorio completo con todos los perfiles de candidatos en la historia de la organización. Busca, filtra y gestiona información detallada de cada candidato."
        icon={Search}
        headerActions={headerActions}
      >
        {/* KPI Cards - Mismo diseño que Tracker/Document Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Users}
            label="Total Candidatos"
            value={candidates.length}
            trend="+12%"
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={TrendingUp}
            label="Candidatos Activos"
            value={candidates.filter(c => !['Rejected by HR', 'Rejected by PM', 'Rejected by Candidate'].includes(c.applicationStatus)).length}
            trend="+8%"
            color="bg-gradient-to-br from-teal-500 to-teal-600"
          />
          <StatCard
            icon={Award}
            label="Promedio Experiencia"
            value={`${Math.round(candidates.reduce((sum, c) => sum + c.experience, 0) / candidates.length)} años`}
            trend="+5%"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            icon={BarChart3}
            label="Fuentes Activas"
            value={new Set(candidates.map(c => c.source)).size}
            trend="+15%"
            color="bg-gradient-to-br from-lime-500 to-lime-600"
          />
        </div>

        {/* Filters Section - Mismo diseño que Tracker */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Filtros de Búsqueda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Field */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
                Buscar Candidato
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Nombre, email, rol, ubicación o habilidades..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="pl-10 border-slate-200 focus:border-emerald-600 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-2">
                Estado
              </label>
              <select
                name="status"
                id="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full rounded-md border-slate-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 focus:border-emerald-600 focus:ring-emerald-600"
              >
                <option value="all">Todos los Estados</option>
                {CANDIDATE_STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                Rol
              </label>
              <select
                name="role"
                id="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="w-full rounded-md border-slate-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 focus:border-emerald-600 focus:ring-emerald-600"
              >
                <option value="all">Todos los Roles</option>
                {AVAILABLE_ROLES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Volunteer Type Filter */}
            <div>
              <label htmlFor="volunteerType" className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Voluntario
              </label>
              <select
                name="volunteerType"
                id="volunteerType"
                value={filters.volunteerType}
                onChange={handleFilterChange}
                className="w-full rounded-md border-slate-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 focus:border-emerald-600 focus:ring-emerald-600"
              >
                <option value="all">Todos los Tipos</option>
                {VOLUNTEER_TYPES.map(vt => (
                  <option key={vt} value={vt}>{vt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Segunda fila de filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            {/* Location Filter */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                Ubicación
              </label>
              <select
                name="location"
                id="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full rounded-md border-slate-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 focus:border-emerald-600 focus:ring-emerald-600"
              >
                <option value="all">Todas las Ubicaciones</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="lg:col-span-4 flex items-end">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="w-full md:w-auto"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-medium text-slate-800">{filteredCandidates.length}</span> de <span className="font-medium text-slate-800">{candidates.length}</span> candidatos
            </p>
          </div>
        </div>

        {/* Vista de Tabla */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <FileText className="w-5 h-5 text-green-800" />
              Lista de Candidatos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rol & Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experiencia & Educación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Habilidades
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Última Actividad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredCandidates.map((candidate) => {
                    const statusProps = getStatusBadgeProps(candidate.applicationStatus);
                    return (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-slate-800">{candidate.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {candidate.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                          <div className="flex items-center gap-1 mb-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {candidate.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-slate-800 mb-1">{candidate.appliedRole}</div>
                          <AdminStatusBadge status={statusProps.status} size="sm">
                            {statusProps.text}
                          </AdminStatusBadge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">
                          <div className="flex items-center gap-1 mb-1">
                            <Briefcase className="w-3 h-3 text-gray-400" />
                            {candidate.experience} años exp.
                          </div>
                          <div className="text-gray-500">{candidate.education}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill, idx) => (
                              <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200">
                                {skill}
                              </span>
                            ))}
                            {candidate.skills.length > 3 && (
                              <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-200">
                                +{candidate.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {candidate.lastActivity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" title="Ver detalles">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" title="Editar">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredCandidates.length === 0 && (
          <Card className="border-slate-200 mt-6">
            <CardContent className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">No se encontraron candidatos</h3>
              <p className="text-gray-500">
                Intenta ajustar los filtros de búsqueda o términos para encontrar candidatos.
              </p>
              <Button variant="outline" onClick={handleClearFilters} className="mt-4">
                Limpiar Filtros
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Resumen de Estadísticas */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-teal-600">{new Set(candidates.map(c => c.appliedRole)).size}</div>
              <div className="text-sm text-gray-600">Roles Únicos</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-emerald-600">{new Set(candidates.map(c => c.location)).size}</div>
              <div className="text-sm text-gray-600">Ubicaciones</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">
                ${Math.round(candidates.reduce((sum, c) => sum + c.salary, 0) / candidates.length / 1000)}K
              </div>
              <div className="text-sm text-gray-600">Salario Promedio</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600">{new Set(candidates.map(c => c.source)).size}</div>
              <div className="text-sm text-gray-600">Fuentes de Reclutamiento</div>
            </CardContent>
          </Card>
        </div>
      </AdminPageLayout>
    </div>
  );
}