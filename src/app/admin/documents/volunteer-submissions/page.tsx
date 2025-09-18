// src/app/admin/documents/volunteer-submissions/page.tsx
'use client';

import DocumentList from '@/modules/documents/admin/documentlist';

export default function VolunteerSubmissions() {
  return (
    <DocumentList
      title="Volunteer Submissions"
      description="Revisa y gestiona todos los documentos cargados por los voluntarios."
      allowedTypes={['volunteer-submissions']}
      cardColor="text-purple-600"
      canAdd={false}
      canEdit={false}
      canDelete={true}
    />
  );
}