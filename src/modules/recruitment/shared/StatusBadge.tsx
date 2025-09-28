// src/modules/recruitment/shared/StatusBadge.tsx
import { CandidateStatus } from '@/lib/data/mockRecruitmentData';
import { STATUS_COLORS, CANDIDATE_STATUSES } from '@/modules/recruitment/shared/constants';

interface StatusBadgeProps {
  status: CandidateStatus;
  editable?: boolean;
  onChange?: (status: CandidateStatus) => void;
}

export function StatusBadge({ status, editable, onChange }: StatusBadgeProps) {
  if (editable) {
    return (
      <select 
        value={status}
        onChange={(e) => onChange?.(e.target.value as CandidateStatus)}
        className={`px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[status]}`}
      >
        {CANDIDATE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    );
  }
  
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${STATUS_COLORS[status]}`}>
      {status}
    </span>
  );
}