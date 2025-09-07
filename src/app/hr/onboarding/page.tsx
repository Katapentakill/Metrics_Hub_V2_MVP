// src/app/hr/onboarding/page.tsx
import OnboardingTracker from '@/modules/recruitment/hr/OnboardingTracker';
import React from 'react';

export default function OnboardingPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Rastreador de Onboarding</h1>
      <OnboardingTracker />
    </div>
  );
}