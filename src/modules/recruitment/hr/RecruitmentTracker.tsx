'use client';

import React, { useState, useMemo } from 'react';
import { 
  getMockRecruitmentData, 
  MockCandidate, 
  CandidateStatus, 
  CptOptStatus, 
  teams as allTeams, 
  vaStatuses, 
  wlStatuses,
  offerLetterStatuses,
  cptOptOptions as allCptOptOptions
} from '@/lib/data/mockRecruitmentData';
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
  PencilIcon,
  CheckIcon,
  PhoneIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { UserPlus, Clock } from 'lucide-react';

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const initialMockData = getMockRecruitmentData(15);
// Procesa los datos iniciales para asegurar la consistencia.
const processedInitialData = initialMockData.map(c => {
  if (c.volunteerType === 'Regular') {
    return { ...c, cptOptStatus: 'Not Required' as CptOptStatus };
  }
  return c;
});

const permissions = ROLE_PERMISSIONS.hr;
const config = TABLE_CONFIG.hr;

export default function RecruitmentTracker() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(processedInitialData);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
  });
  const [editingCandidateId, setEditingCandidateId] = useState<string | null>(null);
  const [tempCandidateData, setTempCandidateData] = useState<Partial<MockCandidate> | null>(null);

  const handleFieldChange = (
    candidateId: string,
    field: keyof MockCandidate,
    value: any
  ) => {
    // If the volunteer type is being changed
    if (field === 'volunteerType') {
      if (value === 'Regular') {
        // If the new type is 'Regular', automatically set CPT/OPT status to 'Not Required'
        if (editingCandidateId === candidateId) {
          setTempCandidateData(prev => ({
            ...prev,
            [field]: value,
            cptOptStatus: 'Not Required' as CptOptStatus,
          }));
        } else {
          setCandidates((prev) =>
            prev.map((c) => (c.id === candidateId ? {
              ...c,
              [field]: value,
              cptOptStatus: 'Not Required' as CptOptStatus,
            } : c))
          );
        }
      } else {
        // For other types, proceed with the normal change
        if (editingCandidateId === candidateId) {
          setTempCandidateData(prev => ({
            ...prev,
            [field]: value,
          }));
        } else {
          setCandidates((prev) =>
            prev.map((c) => (c.id === candidateId ? { ...c, [field]: value } : c))
          );
        }
      }
    } else {
      // General field change logic for all other fields
      if (editingCandidateId === candidateId) {
        setTempCandidateData(prev => ({
          ...prev,
          [field]: value
        }));
      } else {
        setCandidates((prev) =>
          prev.map((c) => (c.id === candidateId ? { ...c, [field]: value } : c))
        );
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    if (editingCandidateId === id) {
      setEditingCandidateId(null);
      setTempCandidateData(null);
    }
  };

  const handleDelete = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
    console.log(`Candidate with ID ${id} deleted.`);
  };

  const handleAdd = (candidate: MockCandidate) => {
    console.log(`Candidate ${candidate.name} added to the active volunteers database.`);
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

  const handleEditClick = (candidate: MockCandidate) => {
    setEditingCandidateId(candidate.id);
    setTempCandidateData({
      email: candidate.email,
      phone: candidate.phone,
      timezone: candidate.timezone,
      team: candidate.team,
      hrsWk: candidate.hrsWk,
      duration: candidate.duration,
      startDate: candidate.startDate,
      pmInterviewDate: candidate.pmInterviewDate,
      hrInterviewDate: candidate.hrInterviewDate,
      notes: candidate.notes,
    });
  };

  const handleSaveClick = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(c => 
        c.id === candidateId ? { ...c, ...tempCandidateData } : c
      )
    );
    setEditingCandidateId(null);
    setTempCandidateData(null);
  };

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
      {config.showFilters && (
        <div className="flex flex-wrap gap-4 mb-6 items-center">
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
                        {AVAILABLE_ROLES.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={candidate.volunteerType}
                        onChange={(e) => handleFieldChange(candidate.id, 'volunteerType', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {VOLUNTEER_TYPES.map(vt => (
                          <option key={vt} value={vt}>{vt}</option>
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
                        {CPT_OPT_OPTIONS.map(opt => (
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
                          {/* CONTACT DETAILS (EDITABLE) */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-semibold text-slate-800">Contact</p>
                              {editingCandidateId === candidate.id ? (
                                <button
                                  onClick={() => handleSaveClick(candidate.id)}
                                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center text-xs"
                                >
                                  <CheckIcon className="h-4 w-4 mr-1" /> Save
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleEditClick(candidate)}
                                  className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 flex items-center text-xs"
                                >
                                  <PencilIcon className="h-4 w-4 mr-1" /> Edit
                                </button>
                              )}
                            </div>

                            {editingCandidateId === candidate.id ? (
                              <>
                                <div className="flex items-center space-x-2">
                                  <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                                  <span>Email: </span>
                                  <input 
                                    type="text" 
                                    value={tempCandidateData?.email ?? candidate.email} 
                                    placeholder="Email" 
                                    onChange={(e) => handleFieldChange(candidate.id, 'email', e.target.value)} 
                                    className="border rounded px-2 py-1 w-full" 
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <PhoneIcon className="h-4 w-4 text-slate-500" />
                                  <span>Phone:</span>
                                  <input 
                                    type="text" 
                                    value={tempCandidateData?.phone ?? candidate.phone} 
                                    placeholder="Phone" 
                                    onChange={(e) => handleFieldChange(candidate.id, 'phone', e.target.value)} 
                                    className="border rounded px-2 py-1 w-full" 
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <GlobeAltIcon className="h-4 w-4 text-slate-500" />
                                    <span>Timezone:</span>
                                    <input 
                                      type="text" 
                                      value={tempCandidateData?.timezone ?? candidate.timezone} 
                                      placeholder="Timezone" 
                                      onChange={(e) => handleFieldChange(candidate.id, 'timezone', e.target.value)} 
                                      className="border rounded px-2 py-1 w-full" 
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <UserGroupIcon className="h-4 w-4 text-slate-500" />
                                    <span>Team:</span>
                                    <select
                                        value={tempCandidateData?.team ?? candidate.team}
                                        onChange={(e) => handleFieldChange(candidate.id, 'team', e.target.value)}
                                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700 mt-1"
                                    >
                                        {allTeams.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center space-x-2">
                                  <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                                  <span>Email: {candidate.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <PhoneIcon className="h-4 w-4 text-slate-500" />
                                  <span>Phone: {candidate.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <GlobeAltIcon className="h-4 w-4 text-slate-500" />
                                  <span>Timezone: {candidate.timezone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <UserGroupIcon className="h-4 w-4 text-slate-500" />
                                  <span>Team: {candidate.team}</span>
                                </div>
                              </>
                            )}
                          </div>

                          {/* DOCUMENT LINKS AND STATUS */}
                          <div className="space-y-2">
                            <p className="font-semibold text-slate-800">Documents</p>
                            
                            {/* CV Status */}
                            <div className="flex items-center space-x-2">
                              <DocumentTextIcon className="h-4 w-4 text-slate-500" />
                              <span>CV Status: {candidate.cvLink ? 'Submitted' : 'Pending'}</span>
                            </div>
                            
                            {/* Offer Letter Status */}
                            <div className="flex items-center space-x-2">
                              <ClipboardDocumentListIcon className="h-4 w-4 text-slate-500" />
                              <span>Offer Letter Status: {candidate.offerLetterStatus}</span>
                            </div>

                            {/* VA Status */}
                            <div className="flex items-center space-x-2">
                              <ClipboardDocumentListIcon className="h-4 w-4 text-slate-500" />
                              <span>VA Status: {candidate.vaStatus}</span>
                            </div>

                            {/* WL Status */}
                            <div className="flex items-center space-x-2">
                              <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                              <span>WL Status: {candidate.wlStatus}</span>
                            </div>
                            
                             {/* CPT/OPT Docs Status - Read-only */}
                            <div className="flex items-center space-x-2">
                              <DocumentTextIcon className="h-4 w-4 text-slate-500" />
                              <span>CPT/OPT Docs Status: {candidate.cptOptStatus}</span>
                            </div>
                          </div>

                          {/* SCHEDULE & NOTES */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold text-slate-800">Schedule & Notes</p>
                              {editingCandidateId === candidate.id ? (
                                <button
                                  onClick={() => handleSaveClick(candidate.id)}
                                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center text-xs"
                                >
                                  <CheckIcon className="h-4 w-4 mr-1" /> Save
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleEditClick(candidate)}
                                  className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 flex items-center text-xs"
                                >
                                  <PencilIcon className="h-4 w-4 mr-1" /> Edit
                                </button>
                              )}
                            </div>
                            
                            {editingCandidateId === candidate.id ? (
                              <>
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                                  <span>HR Interview:</span>
                                  <input 
                                    type="date"
                                    value={formatDate(tempCandidateData?.hrInterviewDate ?? candidate.hrInterviewDate)}
                                    onChange={(e) => handleFieldChange(candidate.id, 'hrInterviewDate', e.target.value ? new Date(e.target.value) : null)} 
                                    className="border rounded px-2 py-1 w-full text-sm"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                                  <span>PM Interview:</span>
                                  <input 
                                    type="date"
                                    value={formatDate(tempCandidateData?.pmInterviewDate ?? candidate.pmInterviewDate)}
                                    onChange={(e) => handleFieldChange(candidate.id, 'pmInterviewDate', e.target.value ? new Date(e.target.value) : null)} 
                                    className="border rounded px-2 py-1 w-full text-sm"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                                  <span>Start Date:</span>
                                  <input 
                                    type="date"
                                    value={formatDate(tempCandidateData?.startDate ?? candidate.startDate)}
                                    onChange={(e) => handleFieldChange(candidate.id, 'startDate', e.target.value ? new Date(e.target.value) : null)} 
                                    className="border rounded px-2 py-1 w-full text-sm"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-slate-500" />
                                  <span>Weekly Hours:</span>
                                  <input 
                                    type="number"
                                    value={tempCandidateData?.hrsWk ?? candidate.hrsWk}
                                    onChange={(e) => handleFieldChange(candidate.id, 'hrsWk', Number(e.target.value))} 
                                    className="border rounded px-2 py-1 w-full text-sm"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-slate-500" />
                                  <span>Duration:</span>
                                  <input 
                                    type="text"
                                    value={tempCandidateData?.duration ?? candidate.duration}
                                    onChange={(e) => handleFieldChange(candidate.id, 'duration', e.target.value)} 
                                    className="border rounded px-2 py-1 w-full text-sm"
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <PencilIcon className="h-4 w-4 text-slate-500" />
                                  <span>Notes:</span>
                                  <textarea 
                                    value={tempCandidateData?.notes || ''} 
                                    onChange={(e) => handleFieldChange(candidate.id, 'notes', e.target.value)}
                                    placeholder="Notes" 
                                    className="border rounded px-2 py-1 w-full h-16"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                                  <span>HR Interview: {candidate.hrInterviewDate ? candidate.hrInterviewDate.toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                                  <span>PM Interview: {candidate.pmInterviewDate ? candidate.pmInterviewDate.toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <CalendarIcon className="h-4 w-4 text-slate-500" />
                                  <span>Start Date: {candidate.startDate ? candidate.startDate.toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-slate-500" />
                                  <span>Weekly Hours: {candidate.hrsWk}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-slate-500" />
                                  <span>Duration: {candidate.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <PencilIcon className="h-4 w-4 text-slate-500" />
                                  <span>Notes: {candidate.notes}</span>
                                </div>
                              </>
                            )}
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