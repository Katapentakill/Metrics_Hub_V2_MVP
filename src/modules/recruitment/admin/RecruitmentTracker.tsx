// src/modules/recruitment/admin/RecruitmentTracker.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { 
  STATUS_COLORS, 
  CPT_OPT_COLORS, 
  CANDIDATE_STATUSES, 
  AVAILABLE_ROLES, 
  VOLUNTEER_TYPES,
  ROLE_PERMISSIONS,
  DEFAULT_TEXTS 
} from '@/modules/recruitment/shared/constants';
import { StatusBadge } from '@/modules/recruitment/shared/StatusBadge';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function RecruitmentTracker() {
  const [candidates] = useState<MockCandidate[]>(getMockRecruitmentData(15));
  const [expanded, setExpanded] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all'
  });
  const permissions = ROLE_PERMISSIONS.admin;

  const toggleExpand = (id: string) => {
    setExpanded(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredCandidates = useMemo(() => {
    let result = candidates;

    // Filter by search term
    if (filters.search) {
      result = result.filter(candidate =>
        candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.email.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(candidate => candidate.applicationStatus === filters.status);
    }

    // Filter by role
    if (filters.role !== 'all') {
      result = result.filter(candidate => candidate.appliedRole === filters.role);
    }

    // Filter by volunteer type
    if (filters.volunteerType !== 'all') {
      result = result.filter(candidate => candidate.volunteerType === filters.volunteerType);
    }
    
    return result;
  }, [candidates, filters]);

  if (filteredCandidates.length === 0) {
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
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Search */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            name="search"
            placeholder={DEFAULT_TEXTS.searchPlaceholder}
            onChange={handleFilterChange}
            className="block w-full rounded-md border-slate-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Status Filter */}
        <select
          name="status"
          onChange={handleFilterChange}
          className="rounded-md border-slate-300 text-sm"
        >
          <option value="all">All Statuses</option>
          {CANDIDATE_STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Role Filter */}
        <select
          name="role"
          onChange={handleFilterChange}
          className="rounded-md border-slate-300 text-sm"
        >
          <option value="all">All Roles</option>
          {AVAILABLE_ROLES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* Volunteer Type Filter */}
        <select
          name="volunteerType"
          onChange={handleFilterChange}
          className="rounded-md border-slate-300 text-sm"
        >
          <option value="all">All Types</option>
          {VOLUNTEER_TYPES.map(vt => (
            <option key={vt} value={vt}>{vt}</option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Volunteer Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  CPT/OPT
                </th>
                <th className="relative px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCandidates.map((candidate) => (
                <React.Fragment key={candidate.id}>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {candidate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {candidate.appliedRole}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <StatusBadge status={candidate.applicationStatus} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {candidate.volunteerType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${CPT_OPT_COLORS[candidate.cptOptStatus]}`}>
                        {candidate.cptOptStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => toggleExpand(candidate.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {expanded.includes(candidate.id) ? (
                          <ChevronUpIcon className="h-5 w-5" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded block - read-only for admin */}
                  {expanded.includes(candidate.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
                          <div>
                            <p><span className="font-semibold">Email:</span> {candidate.email}</p>
                            <p><span className="font-semibold">Phone:</span> {candidate.phone}</p>
                            <p><span className="font-semibold">LinkedIn:</span> <a href={candidate.linkedinUrl} className="text-blue-500 hover:underline">{candidate.linkedinUrl}</a></p>
                            <p><span className="font-semibold">Portfolio:</span> <a href={candidate.portfolioUrl} className="text-blue-500 hover:underline">{candidate.portfolioUrl}</a></p>
                          </div>
                          <div>
                            <p><span className="font-semibold">Project Preference:</span> {candidate.projectPreferences}</p>
                            <p><span className="font-semibold">Recruitment Stage:</span> {candidate.recruitmentStage}</p>
                            <p><span className="font-semibold">Last Contact:</span> {candidate.lastContact.toLocaleDateString()}</p>
                            <p><span className="font-semibold">Interview Date:</span> {candidate.interviewDate?.toLocaleDateString() || 'N/A'}</p>
                          </div>
                          <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <p><span className="font-semibold">Notes:</span></p>
                            <p className="mt-1 p-2 bg-white rounded-md border border-slate-200">{candidate.notes}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}