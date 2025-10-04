// src/app/admin/recruitment/candidates/[id]/page.tsx
// Página de detalle de candidato individual

import CandidateDetailView from '@/modules/recruitment/admin/CandidateDetailView';

interface CandidatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CandidatePage({ params }: CandidatePageProps) {
  const { id } = await params;
  return <CandidateDetailView candidateId={id} />;
}