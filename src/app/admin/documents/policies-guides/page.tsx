// src/app/admin/documents/policies-guides/page.tsx
'use client';

import DocumentList from '@/modules/documents/admin/documentlist';

export default function PoliciesGuides() {
  return (
    <DocumentList
      title="📄 Policies & Guides"
      description="Documentos formales que establecen las reglas, procedimientos y directrices que todos los miembros de la organización deben seguir."
      allowedTypes={['policies-guides']}
      cardColor="text-green-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}