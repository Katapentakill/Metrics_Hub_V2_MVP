// src/modules/recruitment/hr/StatusDropdown.tsx
'use client';

import React, { useState } from 'react';
import { CandidateStatus, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { ChevronDown, Check } from 'lucide-react';

const allStatuses: CandidateStatus[] = [
  'Application Received',
  'HR Review',
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Accepted by Candidate',
  'Rejected by HR',
  'Rejected by PM',
  'Rejected by Candidate',
  'Onboard',
];

const getStatusColor = (status: CandidateStatus) => {
  switch (status) {
    case 'Application Received': return 'bg-blue-100 text-blue-700';
    case 'HR Review': return 'bg-purple-100 text-purple-700';
    case 'Interview Scheduled': return 'bg-yellow-100 text-yellow-700';
    case 'Interview Completed': return 'bg-orange-100 text-orange-700';
    case 'Offer Sent': return 'bg-sky-100 text-sky-700';
    case 'Accepted by Candidate':
    case 'Accepted by HR':
    case 'Accepted by PM':
    case 'Onboard':
      return 'bg-green-100 text-green-700';
    case 'Rejected by HR':
    case 'Rejected by PM':
    case 'Rejected by Candidate':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

type StatusDropdownProps = {
  candidate: MockCandidate;
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
};

export default function StatusDropdown({ candidate, onStatusChange }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (newStatus: CandidateStatus) => {
    onStatusChange(candidate.id, newStatus);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-2 py-1 text-xs font-semibold rounded-full w-fit transition-colors ${getStatusColor(candidate.applicationStatus)}`}
      >
        <span>{candidate.applicationStatus}</span>
        <ChevronDown size={14} className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {allStatuses.map((status) => (
              <div
                key={status}
                onClick={() => handleStatusChange(status)}
                className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {status === candidate.applicationStatus && (
                  <Check size={16} className="text-emerald-500 mr-2" />
                )}
                {status}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}