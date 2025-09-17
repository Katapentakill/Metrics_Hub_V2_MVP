// src/app/hr/documents/volunteer-and-administrative-management/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function HRVolunteerAdminManagementPage() {
  return (
    <DocumentList
      title="🧑‍💼 Volunteer & Administrative Management"
      description="Documentos para gestionar la relación y las tareas administrativas de los voluntarios actuales."
      allowedTypes={['volunteer-management']}
      cardColor="text-purple-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}