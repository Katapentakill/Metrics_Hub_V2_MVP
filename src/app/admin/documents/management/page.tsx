// src/app/admin/documents/management/page.tsx
'use client';

import DocumentList from '@/modules/documents/admin/documentlist';

export default function DocumentManagement() {
  return (
    <DocumentList
      title="📁 Document Management"
      description="Herramientas y el sistema para administrar el ciclo de vida de todos los documentos de la organización."
      allowedTypes={['company-library', 'policies-guides', 'volunteer-submissions']}
      cardColor="text-orange-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}