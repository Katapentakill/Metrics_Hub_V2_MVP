// src/modules/recruitment/shared/EmptyState.tsx
import { Users, Plus } from 'lucide-react';
import { User } from '@/lib/types';

interface EmptyStateProps {
  userRole: User['role'];
  onAddCandidate?: () => void;
  canAdd?: boolean;
}

const emptyMessages = {
  admin: {
    title: 'No candidates found',
    description: 'There are currently no candidates in the system. Check back later or adjust your filters.',
  },
  hr: {
    title: 'No candidates in pipeline',
    description: 'Start by adding new candidates to begin the recruitment process.',
  },
  lead_project: {
    title: 'No candidates assigned',
    description: 'No candidates have been assigned to your projects yet.',
  },
  volunteer: {
    title: 'Application not found',
    description: 'Your application status is not available at the moment.',
  },
  unassigned: {
    title: 'Access restricted',
    description: 'You do not have permission to view recruitment data.',
  }
};

export function EmptyState({ userRole, onAddCandidate, canAdd = false }: EmptyStateProps) {
  const message = emptyMessages[userRole === 'lead' ? 'lead_project' : userRole];

  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <Users className="h-16 w-16 text-slate-300 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{message.title}</h3>
      <p className="text-slate-600 mb-6 max-w-md">{message.description}</p>
      {canAdd && onAddCandidate && (
        <button
          onClick={onAddCandidate}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </button>
      )}
    </div>
  );
}