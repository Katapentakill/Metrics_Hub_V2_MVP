// src/modules/recruitment/shared/RecruitmentTable.tsx
import React from 'react';
import { MockCandidate } from '@/lib/data/mockRecruitmentData';
import { User } from '@/lib/types';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { CandidateRow } from './CandidateRow';
import { ROLE_PERMISSIONS, TABLE_CONFIG, TableConfig } from './constants';

interface RecruitmentTableProps {
  candidates: MockCandidate[];
  userRole: User['role'];
  loading?: boolean;
  error?: string | null;
  onUpdate: (id: string, field: keyof MockCandidate, value: any) => void;
  onDelete: (id: string) => void;
  onRetry?: () => void;
  onAddCandidate?: () => void;
  allTeams?: string[];
}

export function RecruitmentTable({
  candidates,
  userRole,
  loading = false,
  error = null,
  onUpdate,
  onDelete,
  onRetry,
  onAddCandidate,
  allTeams = []
}: RecruitmentTableProps) {
  const permissions = ROLE_PERMISSIONS[userRole];
  const config: TableConfig = TABLE_CONFIG[userRole];

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRetry} />;
  }

  if (candidates.length === 0) {
    return (
      <EmptyState 
        userRole={userRole} 
        onAddCandidate={onAddCandidate}
        canAdd={permissions.canCreate}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Type
              </th>
              {config.showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {candidates.map((candidate) => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                permissions={permissions}
                onUpdate={onUpdate}
                onDelete={onDelete}
                showActions={config.showActions}
                allTeams={allTeams}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}