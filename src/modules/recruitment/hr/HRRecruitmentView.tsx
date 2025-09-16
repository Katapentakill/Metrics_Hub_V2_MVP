// src/modules/recruitment/hr/HRRecruitmentView.tsx
'use client';

import { useState, useMemo } from 'react';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { ROLE_PERMISSIONS, CANDIDATE_STATUSES, VOLUNTEER_TYPES, AVAILABLE_ROLES, DEFAULT_TEXTS } from '@/modules/recruitment/shared/constants';
import { StatusBadge } from '@/modules/recruitment/shared/StatusBadge';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline';

export function HRRecruitmentView() {
  const permissions = ROLE_PERMISSIONS.hr;
  const [candidates, setCandidates] = useState<MockCandidate[]>(getMockRecruitmentData(20));
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all'
  });

  // Filtrado de candidatos
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.email.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || c.applicationStatus === filters.status;
      const matchesRole = filters.role === 'all' || c.appliedRole === filters.role;
      const matchesType = filters.volunteerType === 'all' || c.volunteerType === filters.volunteerType;
      return matchesSearch && matchesStatus && matchesRole && matchesType;
    });
  }, [candidates, filters]);

  // Handlers
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (id: string, field: keyof MockCandidate, value: any) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Desea eliminar este candidato?')) {
      setCandidates(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleScheduleInterview = (id: string) => {
    const date = prompt('Ingrese la fecha de la entrevista (YYYY-MM-DD):');
    if (date) handleUpdate(id, 'interviewDate', new Date(date));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Rastreador de Reclutamiento - HR
      </h1>

      {/* Filtros */}
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

        <select name="status" onChange={handleFilterChange} className="rounded-md border-slate-300 text-sm">
          <option value="all">All Statuses</option>
          {CANDIDATE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select name="role" onChange={handleFilterChange} className="rounded-md border-slate-300 text-sm">
          <option value="all">All Roles</option>
          {AVAILABLE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>

        <select name="volunteerType" onChange={handleFilterChange} className="rounded-md border-slate-300 text-sm">
          <option value="all">All Types</option>
          {VOLUNTEER_TYPES.map(vt => <option key={vt} value={vt}>{vt}</option>)}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Volunteer Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCandidates.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{c.appliedRole}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <StatusBadge status={c.applicationStatus} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{c.volunteerType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 flex gap-2">
                    <button onClick={() => handleScheduleInterview(c.id)} title="Schedule Interview">
                      <CalendarIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-900" />
                    </button>
                    <button onClick={() => handleUpdate(c.id, 'notes', prompt('Editar notas:', c.notes) || c.notes)} title="Edit Notes">
                      <PencilIcon className="h-5 w-5 text-green-600 hover:text-green-900" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} title="Delete Candidate">
                      <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-slate-500">{DEFAULT_TEXTS.noData.hr}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
