// src/modules/recruitment/shared/CandidateManagement.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  getMockRecruitmentData,
  MockCandidate,
  teams as allTeams,
} from '@/lib/data/mockRecruitmentData';
import {
  ROLE_PERMISSIONS,
  DEFAULT_TEXTS,
  TABLE_CONFIG,
  CANDIDATE_STATUSES,
  AVAILABLE_ROLES,
  VOLUNTEER_TYPES,
} from './constants';
import { User } from '@/lib/types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { CandidateRow } from './CandidateRow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';

interface CandidateManagementProps {
  userRole: User['role'];
  teamFilter?: string;
  title?: string;
  description?: string;
  dataSize?: number;
}

export default function CandidateManagement({
  userRole,
  teamFilter,
  title,
  description,
  dataSize = 25
}: CandidateManagementProps) {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
  });

  const permissions = ROLE_PERMISSIONS[userRole];
  const config = TABLE_CONFIG[userRole];
  const texts = DEFAULT_TEXTS;

  // Generar datos según el rol
  const initialData = useMemo(() => {
    const baseData = getMockRecruitmentData(dataSize);
    
    // Filtrar por equipo si es necesario (para leads)
    if (teamFilter) {
      return baseData.filter(candidate => candidate.team === teamFilter);
    }
    
    return baseData;
  }, [dataSize, teamFilter]);

  const [candidates, setCandidates] = useState<MockCandidate[]>(initialData);

  const handleDelete = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    console.log(`Candidate with ID ${id} deleted.`);
  };

  const handleUpdate = (candidateId: string, field: keyof MockCandidate, value: any) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          const updatedCandidate = { ...c, [field]: value };
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

  if (candidates.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          {texts.noData[userRole]}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header dinámico */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {title || texts.pageTitle[userRole]}
        </h1>
        {permissions.canCreate && (
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            {texts.addButton}
          </Button>
        )}
      </div>
      
      {description && (
        <p className="text-gray-600 mb-10">
          {description}
        </p>
      )}

      {/* Filtros condicionales */}
      {config.showFilters && (
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="relative flex-grow min-w-[200px]">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
            </div>
            <Input
              type="text"
              name="search"
              id="search"
              placeholder={texts.searchPlaceholder}
              value={filters.search}
              onChange={handleFilterChange}
              className="pl-10"
            />
          </div>

          <select
            name="status"
            onChange={handleFilterChange}
            className="rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            {CANDIDATE_STATUSES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            name="role"
            onChange={handleFilterChange}
            className="rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Roles</option>
            {AVAILABLE_ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            name="volunteerType"
            onChange={handleFilterChange}
            className="rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            {VOLUNTEER_TYPES.map(vt => (
              <option key={vt} value={vt}>{vt}</option>
            ))}
          </select>
        </div>
      )}

      {/* Tabla unificada */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                {config.showActions && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Actions
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

      {/* Analytics condicionales */}
      {config.showAnalytics && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">Total Candidates</h3>
            <p className="text-2xl font-bold text-blue-600">{candidates.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">Active Applications</h3>
            <p className="text-2xl font-bold text-green-600">
              {candidates.filter(c => !c.applicationStatus.includes('Rejected')).length}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800">Onboarded</h3>
            <p className="text-2xl font-bold text-purple-600">
              {candidates.filter(c => c.applicationStatus === 'Onboard').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}