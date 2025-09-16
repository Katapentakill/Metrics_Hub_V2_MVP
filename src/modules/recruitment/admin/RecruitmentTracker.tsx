// src/modules/recruitment/admin/RecruitmentTracker.tsx
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
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { CandidateRow } from '@/modules/recruitment/shared/CandidateRow';

const initialMockData = getMockRecruitmentData(25); // Admin has a larger view

export default function RecruitmentTracker() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
  });

  const permissions = ROLE_PERMISSIONS.admin;
  const config = TABLE_CONFIG.admin;

  const handleDelete = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    console.log(`Candidate with ID ${id} deleted.`);
  };

  // The admin has full CRUD, so the update function is necessary.
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

  if (candidates.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          {DEFAULT_TEXTS.noData.admin}
        </p>
      </div>
    );
  }

  return (
    <div>
      {config.showFilters && (
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          {/* Campo de búsqueda mejorado */}
          <div className="relative flex-grow min-w-[200px]">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder={DEFAULT_TEXTS.searchPlaceholder}
              onChange={handleFilterChange}
              className="block w-full rounded-md border-slate-300 bg-white pl-10 py-2 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Filtro por estado mejorado */}
          <div className="min-w-[150px]">
            <label htmlFor="status" className="sr-only">Status</label>
            <select
              name="status"
              id="status"
              onChange={handleFilterChange}
              className="rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              {CANDIDATE_STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Filtro por rol mejorado */}
          <div className="min-w-[150px]">
            <label htmlFor="role" className="sr-only">Role</label>
            <select
              name="role"
              id="role"
              onChange={handleFilterChange}
              className="rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Roles</option>
              {AVAILABLE_ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Filtro por tipo de voluntario mejorado */}
          <div className="min-w-[150px]">
            <label htmlFor="volunteerType" className="sr-only">Volunteer Type</label>
            <select
              name="volunteerType"
              id="volunteerType"
              onChange={handleFilterChange}
              className="rounded-md border-slate-300 bg-white py-2 pl-3 pr-10 text-sm text-slate-700 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              {VOLUNTEER_TYPES.map(vt => (
                <option key={vt} value={vt}>{vt}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                {config.showActions && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
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
    </div>
  );
}