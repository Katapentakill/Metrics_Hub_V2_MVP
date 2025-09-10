//src/components/layout/Admin/page.tsx
import OnboardingTracker from '@/modules/recruitment/admin/OnboardingTracker';
import React from 'react';

export default function RecruitmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Rastreador de Reclutamiento</h1>
      <OnboardingTracker />
    </div>
  );
}

