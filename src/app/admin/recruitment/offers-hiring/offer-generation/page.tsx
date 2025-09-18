// src/app/admin/recruitment/offers-hiring/offer-generation/page.tsx'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function AdminHiringDocumentsPage() {
  const allowedTypes = ['Contrato de Empleo', 'Formulario de Impuestos W-4', 'Identificación', 'Visa de Trabajo'];

  return (
    <DocumentList
      title="Documentación de Contratación"
      description="Accede a todos los documentos de contratación de los nuevos empleados y voluntarios. Revisa contratos, formularios y otros archivos firmados para asegurar el cumplimiento."
      allowedTypes={allowedTypes}
      cardColor="text-green-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}
