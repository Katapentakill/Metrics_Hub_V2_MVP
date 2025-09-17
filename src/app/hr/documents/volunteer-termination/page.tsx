// src/app/hr/documents/volunteer-termination/page.tsx
// src/app/hr/documents/termination/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function HRTerminationPage() {
  return (
    <DocumentList
      title="🛑 Termination"
      description="Documentos necesarios para el proceso de salida de un empleado. Aseguran un proceso formal y legal para todas las partes."
      allowedTypes={['termination']}
      cardColor="text-red-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}