// src/app/admin/recruitment/positions/[id]/page.tsx
// Página de detalle de posición/vacante individual

import PositionDetailView from '@/modules/recruitment/admin/PositionDetailView';

interface PositionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PositionPage({ params }: PositionPageProps) {
  const { id } = await params;
  return <PositionDetailView positionId={id} />;
}