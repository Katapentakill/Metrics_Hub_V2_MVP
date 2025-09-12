// src/modules/recruitment/lead/LeadRecruitmentView.tsx
'use client';

import { useState } from 'react';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { ROLE_PERMISSIONS } from '@/modules/recruitment/shared/constants';
import RecruitmentTrackerLead from './RecruitmentTracker'; // Tu componente existente

const currentUser = { name: 'John Smith', role: 'lead_project' as const };

export function LeadRecruitmentView() {
  const [allCandidates] = useState<MockCandidate[]>(getMockRecruitmentData(15));
  
  // Solo candidatos asignados al lead actual
  const assignedCandidates = allCandidates.filter(c => c.supervisor === currentUser.name);
  
  const permissions = ROLE_PERMISSIONS.lead_project;
  
  const handleFeedback = (candidateId: string, feedback: string) => {
    console.log(`Feedback for ${candidateId}: ${feedback}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Onboarding Dashboard (Project Lead)
      </h1>
      
      {assignedCandidates.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-slate-500">
            No candidates assigned to your projects.
          </p>
        </div>
      ) : (
        <RecruitmentTrackerLead />
      )}
    </div>
  );
}