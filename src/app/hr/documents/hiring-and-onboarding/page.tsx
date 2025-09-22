// src/app/hr/documents/hiring-and-onboarding/page.tsx
// src/app/hr/documents/hiring-and-onboarding/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';

export default function HRHiringOnboardingPage() {
  return (
    <DocumentList
      title=" Hiring & Onboarding"
      description="Documentos esenciales para el proceso de contratación e incorporación de nuevos empleados y voluntarios."
      allowedTypes={['hiring-onboarding']}
      cardColor="text-orange-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}