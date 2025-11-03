// src/app/admin/recruitment/candidate-management/tracker/page.tsx
'use client';
import React, { useState, useMemo } from 'react';
import {
  getMockRecruitmentData,
  MockCandidate,
  CandidateStatus,
  CptOptStatus,
  teams as allTeams,
} from '@/lib/data/mockRecruitmentData';
import {
  ROLE_PERMISSIONS,
  DEFAULT_TEXTS,
  TABLE_CONFIG,
  CANDIDATE_STATUSES,
  AVAILABLE_ROLES,
  VOLUNTEER_TYPES,
} from '@/modules/recruitment/shared/constants';
import { 
  BarChart, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Download,
  RefreshCw,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminPageLayout from '@/modules/recruitment/admin/components/AdminPageLayout';
import AdminDashboardStats from '@/modules/recruitment/admin/components/AdminDashboardStats';
import { CandidateRow } from '@/modules/recruitment/shared/CandidateRow';

const initialMockData = getMockRecruitmentData(30);

export default function AdminRecruitmentTrackerPage() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
  });

  // Admin permissions - full access
  const permissions = ROLE_PERMISSIONS.admin;
  const config = TABLE_CONFIG.admin;

  const handleDelete = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    console.log(`Candidate with ID ${id} deleted.`);
  };

  const handleUpdate = (candidateId: string, field: keyof MockCandidate, value: any) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          const updatedCandidate = { ...c, [field]: value };
          // Auto-set CPT/OPT status for Regular volunteers
          if (field === 'volunteerType' && value === 'Regular') {
            updatedCandidate.cptOptStatus = 'No Required';
          }
          return updatedCandidate;
        }
        return c;
      })
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredCandidates = useMemo(() => {
    let result = candidates;

    if (filters.search) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.email.toLowerCase().includes(filters.search.toLowerCase())
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

    return result;
  }, [candidates, filters]);

  // Calculate statistics for dashboard - Aplicando guía de diseño
  const trackerStats = [
    {
      title: 'Total Candidatos',
      value: candidates.length,
      change: { value: 15, type: 'increase' as const, period: 'mes anterior' },
      icon: Users,
      color: 'text-teal-600',
      iconBg: 'bg-teal-600',
      iconColor: 'text-white',
    },
    {
      title: 'En Proceso',
      value: candidates.filter(c => ['HR Review', 'HR Interview Scheduled', 'HR Interview Completed', 'PM Interview Scheduled', 'PM Interview Completed'].includes(c.applicationStatus)).length,
      change: { value: 8, type: 'increase' as const, period: 'semana anterior' },
      icon: Clock,
      color: 'text-blue-600',
      iconBg: 'bg-blue-500',
      iconColor: 'text-white',
    },
    {
      title: 'Aprobados',
      value: candidates.filter(c => ['Accepted by HR', 'Accepted by PM', 'Accepted by Candidate', 'Onboard'].includes(c.applicationStatus)).length,
      change: { value: 25, type: 'increase' as const, period: 'mes anterior' },
      icon: CheckCircle,
      color: 'text-emerald-600',
      iconBg: 'bg-emerald-600',
      iconColor: 'text-white',
    },
    {
      title: 'Requieren Atención',
      value: candidates.filter(c => ['Application Received', 'Offer Sent'].includes(c.applicationStatus)).length,
      change: { value: -10, type: 'decrease' as const, period: 'semana anterior' },
      icon: AlertTriangle,
      color: 'text-yellow-600',
      iconBg: 'bg-yellow-500',
      iconColor: 'text-white',
    },
  ];

  const handleRefresh = () => {
    console.log('Refreshing tracker data...');
  };

  const handleExport = () => {
    console.log('Exporting tracker data...');
  };

  const headerActions = (
    <>
      <Button variant="outline" onClick={handleRefresh}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Actualizar
      </Button>
      <Button variant="outline" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button 
        size="lg" 
        className="bg-gradient-to-br from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white shadow-md"
      >
        <Plus className="mr-2 h-5 w-5" />
        Agregar Candidato
      </Button>
    </>
  );

  if (candidates.length === 0) {
    return (
      <AdminPageLayout
        title="Seguimiento de Candidatos"
        subtitle="Panel de Administración"
        description="Visualiza y gestiona el progreso detallado de todos los candidatos en el sistema de reclutamiento."
        icon={BarChart}
        headerActions={headerActions}
      >
        <div className=" flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">
            {DEFAULT_TEXTS.noData.admin}
          </p>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title="Seguimiento de Candidatos"
      subtitle="Panel de Administración"
      description="Visualiza y gestiona el progreso detallado de todos los candidatos. Edita estados, actualiza información y realiza seguimiento paso a paso del proceso de reclutamiento."
      icon={BarChart}
      headerActions={headerActions}
    >
      <AdminDashboardStats stats={trackerStats} />

      {/* Filters Section */}
      {config.showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Filtros de Búsqueda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Field */}
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
                Buscar Candidato
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  name="search"
                  id="search"
                  placeholder={DEFAULT_TEXTS.searchPlaceholder}
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
          
          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-medium text-slate-800">{filteredCandidates.length}</span> de <span className="font-medium text-slate-800">{candidates.length}</span> candidatos
            </p>
          </div>
        </div>
      )}

      {/* Candidates Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Lista de Candidatos</h3>
          <p className="text-sm text-gray-600 mt-1">
            Gestiona el estado y progreso de cada candidato en el proceso de reclutamiento
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol Aplicado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                {config.showActions && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCandidates.map((candidate) => (
                <CandidateRow
                  key={candidate.id}
                  candidate={candidate}
                  permissions={permissions}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  showActions={config.showActions}
                  allTeams={allTeams}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Estados Activos */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-600 rounded-lg">
              <BarChart className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800">Estados Activos</h3>
          </div>
          <div className="space-y-2 text-sm">
            {CANDIDATE_STATUSES.slice(0, 4).map(status => (
              <div key={status} className="flex justify-between text-gray-600">
                <span>{status}:</span>
                <span className="font-medium text-slate-800">
                  {candidates.filter(c => c.applicationStatus === status).length}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Card 2: Tipos de Voluntario */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-600 rounded-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800">Tipos de Voluntario</h3>
          </div>
          <div className="space-y-2 text-sm">
            {VOLUNTEER_TYPES.map(type => (
              <div key={type} className="flex justify-between text-gray-600">
                <span>{type}:</span>
                <span className="font-medium text-slate-800">
                  {candidates.filter(c => c.volunteerType === type).length}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Card 3: Roles Más Solicitados */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-slate-800">Roles Más Solicitados</h3>
          </div>
          <div className="space-y-2 text-sm">
            {AVAILABLE_ROLES.slice(0, 4).map(role => (
              <div key={role} className="flex justify-between text-gray-600">
                <span>{role}:</span>
                <span className="font-medium text-slate-800">
                  {candidates.filter(c => c.appliedRole === role).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}