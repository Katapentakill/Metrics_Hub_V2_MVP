// src/modules/recruitment/hr/RecruitmentTracker.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { getMockRecruitmentData, MockCandidate, CandidateStatus, CptOptStatus } from '@/lib/data/mockRecruitmentData';
import { 
  ROLE_PERMISSIONS,
  DEFAULT_TEXTS,
  TABLE_CONFIG,
  CPT_OPT_COLORS,
  CANDIDATE_STATUSES,
  AVAILABLE_ROLES,
  VOLUNTEER_TYPES,
  DELETABLE_STATUSES,
  ADDABLE_STATUSES,
  CPT_OPT_OPTIONS,
} from '@/modules/recruitment/shared/constants';
import { StatusBadge } from '@/modules/recruitment/shared/StatusBadge';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { UserPlus, Clock } from 'lucide-react';

const initialMockData = getMockRecruitmentData(15);
const permissions = ROLE_PERMISSIONS.hr;
const config = TABLE_CONFIG.hr;

export default function RecruitmentTracker() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
  });

  const handleFieldChange = (
    candidateId: string,
    field: keyof MockCandidate,
    value: any
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, [field]: value } : c))
    );
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    console.log(`Candidate with ID ${id} deleted.`);
  };

  const handleAdd = (candidate: MockCandidate) => {
    console.log(`Candidate ${candidate.name} added to the active volunteers database.`);
    // Implement actual logic here
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
          {DEFAULT_TEXTS.noData.hr}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters & Add Button */}
      {config.showFilters && (
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

          {/* Add Candidate Button */}
          {permissions.canCreate && (
            <button
              onClick={() => {
                const newCandidate: MockCandidate = {
                  ...initialMockData[0], 
                  id: `new-${Date.now()}`,
                  name: 'New Candidate',
                  email: 'new@example.com',
                  applicationStatus: 'Application Received' as CandidateStatus,
                };
                setCandidates((prev) => [newCandidate, ...prev]);
                setExpanded([newCandidate.id]);
              }}
              className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" /> {DEFAULT_TEXTS.addButton}
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">CPT/OPT</th>
                {config.showActions && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCandidates.map((candidate) => (
                <React.Fragment key={candidate.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleExpand(candidate.id)}
                          className="mr-2 text-slate-400 hover:text-slate-600"
                        >
                          {expanded.includes(candidate.id) ? (
                            <ChevronUpIcon className="h-5 w-5" />
                          ) : (
                            <ChevronDownIcon className="h-5 w-5" />
                          )}
                        </button>
                        <span>{candidate.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <StatusBadge
                        status={candidate.applicationStatus}
                        editable={permissions.canEdit}
                        onChange={(newStatus) => handleFieldChange(candidate.id, 'applicationStatus', newStatus)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.appliedRole}
                        onChange={(e) => handleFieldChange(candidate.id, 'appliedRole', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {AVAILABLE_ROLES.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.volunteerType}
                        onChange={(e) => handleFieldChange(candidate.id, 'volunteerType', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {VOLUNTEER_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.cptOptStatus}
                        onChange={(e) => handleFieldChange(candidate.id, 'cptOptStatus', e.target.value as CptOptStatus)}
                        className={`block w-full px-2 py-1 border rounded-md text-xs font-semibold ${CPT_OPT_COLORS[candidate.cptOptStatus]}`}
                        disabled={candidate.volunteerType === 'Regular'}
                      >
                        {CPT_OPT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    {config.showActions && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                        {DELETABLE_STATUSES.includes(candidate.applicationStatus) && permissions.canDelete && (
                          <button
                            onClick={() => handleDelete(candidate.id)}
                            className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 flex items-center"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" /> Delete
                          </button>
                        )}
                        {ADDABLE_STATUSES.includes(candidate.applicationStatus) && permissions.canCreate && (
                          <button
                            onClick={() => handleAdd(candidate)}
                            className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 flex items-center"
                          >
                            <UserPlus className="h-4 w-4 mr-1" /> Add
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                  
                  {/* Expanded Block */}
                  {expanded.includes(candidate.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-slate-50 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
                          {/* CONTACT DETAILS */}
                          <div className="space-y-2">
                            <p className="font-semibold text-slate-800">Contact</p>
                            <input type="text" value={candidate.email} placeholder="Email" onChange={(e) => handleFieldChange(candidate.id, 'email', e.target.value)} className="border rounded px-2 py-1 w-full" />
                            <input type="text" value={candidate.phone} placeholder="Phone" onChange={(e) => handleFieldChange(candidate.id, 'phone', e.target.value)} className="border rounded px-2 py-1 w-full" />
                          </div>

                          {/* DOCUMENT LINKS */}
                          <div className="space-y-2">
                            <p className="font-semibold text-slate-800">Documents</p>
                            <input type="text" value={candidate.cvLink ?? ''} placeholder="CV Link" onChange={(e) => handleFieldChange(candidate.id, 'cvLink', e.target.value)} className="border rounded px-2 py-1 w-full" />
                            <input type="text" value={candidate.offerLetterLink ?? ''} placeholder="Offer Letter Link" onChange={(e) => handleFieldChange(candidate.id, 'offerLetterLink', e.target.value)} className="border rounded px-2 py-1 w-full" />
                          </div>

                          {/* SCHEDULE & NOTES */}
                          <div className="space-y-2">
                            <p className="font-semibold text-slate-800">Schedule & Notes</p>
                            <div>HR Interview: {candidate.hrInterviewDate ? new Date(candidate.hrInterviewDate).toLocaleDateString() : 'N/A'}</div>
                            <div>PM Interview: {candidate.pmInterviewDate ? new Date(candidate.pmInterviewDate).toLocaleDateString() : 'N/A'}</div>
                            <textarea value={candidate.notes} placeholder="Notes" onChange={(e) => handleFieldChange(candidate.id, 'notes', e.target.value)} className="border rounded px-2 py-1 w-full h-16" />
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