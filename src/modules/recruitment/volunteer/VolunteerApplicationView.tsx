// src/modules/recruitment/volunteer/VolunteerApplicationView.tsx
'use client';

import { useState, useEffect } from 'react';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { ROLE_PERMISSIONS, STATUS_COLORS, CPT_OPT_COLORS, DEFAULT_TEXTS } from '@/modules/recruitment/shared/constants';
import { CheckCircle, Circle, Upload, FileText, Calendar, Clock } from 'lucide-react';

// Simulamos usuario actual - en tu app real vendrá del contexto
const currentUser = { email: 'john.doe@example.com', role: 'volunteer' as const };

export function VolunteerApplicationView() {
  const [candidates] = useState<MockCandidate[]>(getMockRecruitmentData(15));
  const permissions = ROLE_PERMISSIONS.volunteer;
  
  // Busca la aplicación del usuario actual
  const ownApplication = candidates.find(c => c.email === currentUser.email);

  if (!ownApplication) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-xl text-slate-500">
            {DEFAULT_TEXTS.noData.volunteer}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Please contact HR if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        {DEFAULT_TEXTS.pageTitle.volunteer}
      </h1>

      <ApplicationProgress candidate={ownApplication} />
      
      {permissions.canUploadDocuments && (
        <DocumentUpload candidate={ownApplication} />
      )}
      
      <TaskChecklist candidate={ownApplication} />
    </div>
  );
}

// Componente de progreso de la aplicación
function ApplicationProgress({ candidate }: { candidate: MockCandidate }) {
  const stages = [
    'Application Received',
    'HR Review', 
    'Interview Scheduled',
    'Interview Completed',
    'Offer Sent',
    'Accepted by Candidate',
    'Onboard'
  ];

  const currentStageIndex = stages.indexOf(candidate.applicationStatus);
  const isRejected = candidate.applicationStatus.includes('Rejected');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Application Progress</h2>
      
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center space-x-3">
            {index <= currentStageIndex && !isRejected ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
            <span className={`text-sm ${
              index <= currentStageIndex && !isRejected 
                ? 'text-green-700 font-medium' 
                : 'text-gray-600'
            }`}>
              {stage}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
        <p className="text-sm text-slate-600">Current Status:</p>
        <span className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${STATUS_COLORS[candidate.applicationStatus]}`}>
          {candidate.applicationStatus}
        </span>
      </div>
    </div>
  );
}

// Componente de carga de documentos
function DocumentUpload({ candidate }: { candidate: MockCandidate }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Documents</h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-700">CV/Resume</span>
          </div>
          {candidate.cvLink ? (
            <a 
              href={candidate.cvLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View
            </a>
          ) : (
            <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
          )}
        </div>
        
        {(candidate.volunteerType === 'CPT' || candidate.volunteerType === 'OPT') && (
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-700">{candidate.volunteerType} Documentation</span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${CPT_OPT_COLORS[candidate.cptOptStatus] || 'bg-gray-100 text-gray-700'}`}>
              {candidate.cptOptStatus}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente de lista de tareas
function TaskChecklist({ candidate }: { candidate: MockCandidate }) {
  const tasks = candidate.toDo || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Pending Tasks</h2>
      
      {tasks.length === 0 ? (
        <p className="text-sm text-slate-500">No pending tasks at this time.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-slate-700">{task}</span>
            </div>
          ))}
        </div>
      )}
      
      {candidate.pmInterviewDate && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-700">
              Interview Scheduled: {candidate.pmInterviewDate}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}