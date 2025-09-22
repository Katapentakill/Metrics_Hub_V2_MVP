// src/app/admin/recruitment/offers-hiring/hiring-documents/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function AdminOfferGenerationPage() {
  const allowedTypes = ['Oferta de Empleo', 'Acuerdo de Voluntariado', 'Carta de Bienvenida'];

  return (
    <DocumentList
      title="Generación de Ofertas de Empleo"
      description="Gestiona la creación, personalización y el estado de todas las cartas de oferta y acuerdos de voluntariado. Supervisa quién ha aceptado y quién está pendiente de respuesta."
      allowedTypes={allowedTypes}
      cardColor="text-blue-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}
