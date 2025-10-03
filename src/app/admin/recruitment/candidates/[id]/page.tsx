// src/app/admin/recruitment/candidates/[id]/page.tsx
// Página de detalle de candidato individual

import CandidateDetailView from '@/modules/recruitment/admin/CandidateDetailView';

interface CandidatePageProps {
  params: {
    id: string;
  };
}

export default function CandidatePage({ params }: CandidatePageProps) {
  return <CandidateDetailView candidateId={params.id} />;
}