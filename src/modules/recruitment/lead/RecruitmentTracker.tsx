// src/modules/recruitment/lead/RecruitmentTracker.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  getMockRecruitmentData,
  MockCandidate,
} from '@/lib/data/mockRecruitmentData';
import {
  ROLE_PERMISSIONS,
  DEFAULT_TEXTS,
  TABLE_CONFIG,
  AVAILABLE_ROLES,
  RecruitmentRolePermissions,
  CANDIDATE_STATUSES,
} from '@/modules/recruitment/shared/constants';
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { CandidateRow } from '@/modules/recruitment/shared/CandidateRow';

const initialMockData = getMockRecruitmentData(25);

// Simulating a Project Lead user for this component
const currentUserRole = 'lead_project';
const leadSpecificTeam = 'Vitalink'; // The team this project lead manages

export default function RecruitmentTracker() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
  });

  const permissions: RecruitmentRolePermissions = ROLE_PERMISSIONS[currentUserRole];
  const config = TABLE_CONFIG[currentUserRole];

  const handleUpdate = (candidateId: string, field: keyof MockCandidate, value: any) => {
    setCandidates(prev =>
      prev.map(c => {
        if (c.id === candidateId) {
          return { ...c, [field]: value };
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
    let result = candidates.filter(c => c.team === leadSpecificTeam);

    if (filters.search) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status !== 'all') {
      result = result.filter(c => c.applicationStatus === filters.status);
    }

    if (filters.role !== 'all') {
      result = result.filter(c => c.appliedRole === filters.role);
    }

    return result;
  }, [candidates, filters]);

  if (filteredCandidates.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          {DEFAULT_TEXTS.noData.lead_project}
        </p>
      </div>
    );
  }

  return (
    <div>
      {config.showFilters && (
        <div className="flex flex-wrap gap-4 mb-6 items-center">
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
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                {config.showActions && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
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
                  onDelete={() => {}}
                  showActions={config.showActions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}