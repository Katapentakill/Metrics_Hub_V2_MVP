//src/app/hr/dashboard/page.tsx
import React from 'react';
import RecruitmentPipeline from '@/modules/dashboard/hr/RecruitmentPipeline';
import VolunteerManagement from '@/modules/dashboard/hr/VolunteerManagement';
import ComplianceDocumentation from '@/modules/dashboard/hr/ComplianceDocumentation';

export default function HRDashboardPage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Panel de Recursos Humanos</h1>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Pipeline de Reclutamiento</h2>
        <RecruitmentPipeline />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Gestión de Voluntarios</h2>
        <VolunteerManagement />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Compliance y Documentación</h2>
        <ComplianceDocumentation />
      </section>
    </div>
  );
}