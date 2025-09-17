// src/app/hr/documents/company-library/page.tsx
// src/app/hr/documents/company-library/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function HRCompanyLibraryPage() {
  return (
    <DocumentList
      title="📘 Company Library"
      description="Aquí puedes encontrar documentos de referencia generales y de uso común, como informes y actas. Estos documentos son informativos y no suelen ser de naturaleza obligatoria."
      allowedTypes={['company-library']}
      cardColor="text-blue-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}