// src/app/hr/recruitment/page.tsx

import RecruitmentDashboard from '@/modules/recruitment/hr/RecruitmentDashboard';

export default function RecruitmentPage() {
  return (
    // Elimina cualquier clase que pueda restringir el ancho
    <div className="w-full"> 
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Pipeline de Reclutamiento</h1>
      <RecruitmentDashboard />
    </div>
  );
}