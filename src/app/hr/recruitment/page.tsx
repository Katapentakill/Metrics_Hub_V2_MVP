// src/app/hr/recruitment/page.tsx
import RecruitmentTracker from '@/modules/recruitment/hr/Applicant-Tracking-System';
import React from 'react';

export default function ApplicantTrackingSystem() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Panel de reclutamiento</h1>
      <RecruitmentTracker />
    </div>
  );
}