//src/components/layout/Admin/page.tsx
import RecruitmentTracker from '@/modules/recruitment/admin/RecruitmentTracker';
import React from 'react';

export default function RecruitmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Reclutamiento Tracker</h1>
      <RecruitmentTracker />
    </div>
  );
}

