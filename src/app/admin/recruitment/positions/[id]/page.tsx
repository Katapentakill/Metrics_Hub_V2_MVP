// src/app/admin/recruitment/positions/[id]/page.tsx
// Página de detalle de posición/vacante individual

import PositionDetailView from '@/modules/recruitment/admin/PositionDetailView';

interface PositionPageProps {
  params: {
    id: string;
  };
}

export default function PositionPage({ params }: PositionPageProps) {
  return <PositionDetailView positionId={params.id} />;
}