// src/modules/recruitment/admin/AdminRecruitmentView.tsx
'use client';

import { ROLE_PERMISSIONS } from '@/modules/recruitment/shared/constants';
import RecruitmentTracker from './RecruitmentTracker'; // Tu componente admin existente

export function AdminRecruitmentView() {
  const permissions = ROLE_PERMISSIONS.admin;
  
  const handleExport = () => {
    console.log('Exporting recruitment data...');
    // Implementar lógica de exportación
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Reclutamiento Tracker
      </h1>
      <RecruitmentTracker />
    </div>
  );
}