// src/app/hr/documents/policies-guides/page.tsx
// src/app/hr/documents/policies-guides/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function HRPoliciesGuidesPage() {
  return (
    <DocumentList
      title="📄 Policies & Guides"
      description="Normativas, procedimientos y directrices obligatorias para toda la organización. Estos documentos aseguran la consistencia y el cumplimiento legal."
      allowedTypes={['policies-guides']}
      cardColor="text-green-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}