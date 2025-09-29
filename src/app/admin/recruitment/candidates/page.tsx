// src/app/admin/recruitment/candidates/page.tsx
import CandidateManagement from '@/modules/recruitment/shared/CandidateManagement';

export default function AdminCandidatesPage() {
  return (
    <CandidateManagement
      userRole="admin"
      title="Candidate Management (Admin)"
      description="System-wide view of all candidates with full administrative privileges. Monitor, edit, and manage all recruitment activities across the organization."
      dataSize={100}
    />
  );
}
