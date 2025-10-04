// src/app/admin/documents/company-library/page.tsx
'use client';

import DocumentList from '@/modules/documents/admin/documentlist';

export default function CompanyLibrary() {
  return (
    <DocumentList
      title="Company Library"
      description="Aquí puedes encontrar documentos de referencia generales y de uso común. Estos documentos son informativos y no suelen ser de naturaleza obligatoria. A menudo se utilizan para la colaboración interna, la gestión de proyectos y para mantener registros generales de la organización."
      allowedTypes={['company-library']}
      cardColor="text-blue-600"
      canAdd={true}
      canEdit={false}
      canDelete={true}
    />
  );
}