// src/modules/recruitment/shared/CandidateRow.tsx
import { MockCandidate, CandidateStatus, getMockRecruitmentData } from '@/lib/data/mockRecruitmentData';
import { ROLE_PERMISSIONS, STATUS_COLORS } from '@/modules/recruitment/shared/constants';

const permissions = ROLE_PERMISSIONS.admin; // o hr, lead_project, volunteer
interface CandidateRowProps {
  candidate: MockCandidate;
  permissions: typeof ROLE_PERMISSIONS.admin;
  onUpdate?: (id: string, field: keyof MockCandidate, value: any) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export function CandidateRow({ candidate, permissions, onUpdate, onDelete, showActions }: CandidateRowProps) {
  // Unified row component that adapts based on permissions
  // This eliminates the duplicate table structures
}