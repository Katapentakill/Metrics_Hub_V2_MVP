// src/modules/dashboard/hr/RecruitmentAlerts.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getMockRecruitmentData, MockCandidate, CandidateStatus } from '@/lib/data/mockRecruitmentData';
import { Bell } from 'lucide-react';

const initialMockData = getMockRecruitmentData(15);

// Notificaciones por estado de aplicación (reutiliza el objeto original)
const statusNotifications: Record<CandidateStatus, string> = {
    'Application Received': 'Notificación: “HR Review, Schedule Interview”',
    'Accepted by HR': 'Notificación: “PM Schedule Interview”',
    'Rejected by HR': 'Notificación: “Rejected”',
    'Accepted by PM': 'Notificación: “PM Sent form and HR Send Offer Letter”',
    'Rejected by PM': 'Notificación: “Rejected”',
    'Rejected by Candidate': 'Notificación: “Rejected”',
    'Accepted by Candidate':
      'Notificación: “HR Agreement, Request Docs, Welcome Letter, Records & Access”',
    'Onboard': 'Notificación: “Done”',
    'HR Review': 'Notificación: “HR Review in progress”',
    'Interview Scheduled': 'Notificación: “Interview Scheduled”',
    'Interview Completed': 'Notificación: “Interview Completed”',
    'Offer Sent': 'Notificación: “Offer Sent”',
};

export default function RecruitmentAlerts() {
  const [candidates, setCandidates] = useState<MockCandidate[]>([]);

  useEffect(() => {
    // Aquí puedes filtrar candidatos según el tipo de alerta que necesites mostrar.
    // Por ejemplo, solo los que necesitan una acción de HR.
    const candidatesWithAlerts = initialMockData.filter(c => 
        c.applicationStatus === 'HR Review' || 
        c.applicationStatus === 'Interview Scheduled' ||
        c.applicationStatus === 'Accepted by PM' ||
        c.applicationStatus === 'Accepted by Candidate'
    );
    setCandidates(candidatesWithAlerts);
  }, []);

  if (candidates.length === 0) {
    return (
      <div className="p-4 bg-slate-50 text-slate-500 rounded-lg border border-slate-200 flex items-center">
        <Bell className="w-5 h-5 mr-3" />
        <span>No hay notificaciones de reclutamiento pendientes.</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200 flex items-center">
          <Bell className="w-5 h-5 mr-3" />
          <div className="flex-grow">
            <p className="font-semibold">{candidate.name}</p>
            <p className="text-sm">
              {statusNotifications[candidate.applicationStatus]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}