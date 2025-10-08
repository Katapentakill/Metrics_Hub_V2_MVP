// src/app/admin/recruitment/page.tsx
import RecruitmentTracker from '@/modules/recruitment/admin/Talent-Management';
import React from 'react';

export default function TalentManagementAdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6"></h1>
      <RecruitmentTracker />
    </div>
  );
}

