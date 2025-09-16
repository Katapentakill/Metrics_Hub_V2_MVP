'use client';

import React, { useState } from 'react';
import { MockCandidate, CptOptStatus, teams } from '@/lib/data/mockRecruitmentData';
import { RecruitmentRolePermissions } from './constants';
import { StatusBadge } from './StatusBadge';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XCircleIcon,
  PhoneIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  PaperClipIcon,
  LinkIcon, 
  UserIcon,
} from '@heroicons/react/24/outline';
import { UserPlus, Clock } from 'lucide-react';
import {
  DELETABLE_STATUSES,
  ADDABLE_STATUSES,
  CPT_OPT_OPTIONS,
  CPT_OPT_COLORS,
  AVAILABLE_ROLES,
  VOLUNTEER_TYPES
} from './constants';

interface CandidateRowProps {
  candidate: MockCandidate;
  permissions: RecruitmentRolePermissions;
  onUpdate: (id: string, field: keyof MockCandidate, value: any) => void;
  onDelete: (id: string) => void;
  showActions: boolean;
  allTeams: string[];
}

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatInterviewDate = (date: Date | null): string => {
  if (!date) return 'N/A';
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function CandidateRow({ 
  candidate, 
  permissions, 
  onUpdate, 
  onDelete, 
  showActions, 
  allTeams = teams
}: CandidateRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<Partial<MockCandidate> | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isEditing) {
      setIsEditing(false);
      setTempData(null);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempData({
      email: candidate.email,
      phone: candidate.phone,
      timezone: candidate.timezone,
      team: candidate.team,
      hrsWk: candidate.hrsWk,
      duration: candidate.duration,
      startDate: candidate.startDate,
      pmInterviewDate: candidate.pmInterviewDate,
      hrInterviewDate: candidate.hrInterviewDate,
      notes: candidate.notes,
    });
  };

  const handleSaveClick = () => {
    if (tempData) {
      Object.entries(tempData).forEach(([key, value]) => {
        onUpdate(candidate.id, key as keyof MockCandidate, value);
      });
    }
    setIsEditing(false);
    setTempData(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempData(null);
  };

  const handleTempFieldChange = (field: keyof MockCandidate, value: any) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
          <div className="flex items-center">
            <button
              onClick={toggleExpand}
              className="mr-2 text-slate-400 hover:text-slate-600"
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
            <span>{candidate.name}</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
          <StatusBadge
            status={candidate.applicationStatus}
            editable={permissions.canEdit}
            onChange={(newStatus) => onUpdate(candidate.id, 'applicationStatus', newStatus)}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
          <select
            value={candidate.appliedRole}
            onChange={(e) => onUpdate(candidate.id, 'appliedRole', e.target.value)}
            className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
            disabled={!permissions.canEdit}
          >
            {AVAILABLE_ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
          <select
            value={candidate.volunteerType}
            onChange={(e) => onUpdate(candidate.id, 'volunteerType', e.target.value)}
            className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
            disabled={!permissions.canEdit}
          >
            {VOLUNTEER_TYPES.map(vt => (
              <option key={vt} value={vt}>{vt}</option>
            ))}
          </select>
        </td>
        {showActions && (
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
            {DELETABLE_STATUSES.includes(candidate.applicationStatus) && permissions.canDelete && (
              <button
                onClick={() => onDelete(candidate.id)}
                className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 flex items-center"
              >
                <TrashIcon className="h-4 w-4 mr-1" /> Delete
              </button>
            )}
            {ADDABLE_STATUSES.includes(candidate.applicationStatus) && permissions.canCreate && (
              <button
                onClick={() => console.log(`Adding candidate ${candidate.name} to active volunteers`)}
                className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-1" /> Add
              </button>
            )}
          </td>
        )}
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan={5} className="px-6 py-4 bg-slate-50 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
              {/* Contact Details */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-slate-800">Contact</p>
                  {isEditing ? (
                    <div className='flex space-x-2'>
                      <button
                        onClick={handleSaveClick}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center text-xs"
                      >
                        <CheckIcon className="h-4 w-4 mr-1" /> Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center text-xs"
                      >
                        <XCircleIcon className="h-4 w-4 mr-1" /> Cancel
                      </button>
                    </div>
                  ) : (
                    permissions.canEdit && (
                      <button
                        onClick={handleEditClick}
                        className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 flex items-center text-xs"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" /> Edit
                      </button>
                    )
                  )}
                </div>

                {isEditing && tempData ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                      <span>Email: </span>
                      <input
                        type="text"
                        value={tempData.email || ''}
                        onChange={(e) => handleTempFieldChange('email', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-slate-500" />
                      <span>Phone:</span>
                      <input
                        type="text"
                        value={tempData.phone || ''}
                        onChange={(e) => handleTempFieldChange('phone', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <GlobeAltIcon className="h-4 w-4 text-slate-500" />
                      <span>Timezone:</span>
                      <input
                        type="text"
                        value={tempData.timezone || ''}
                        onChange={(e) => handleTempFieldChange('timezone', e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="h-4 w-4 text-slate-500" />
                      <span>Team:</span>
                      <select
                        value={tempData.team || candidate.team}
                        onChange={(e) => handleTempFieldChange('team', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700 mt-1"
                      >
                        {allTeams.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                      <span>Email: {candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-slate-500" />
                      <span>Phone: {candidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GlobeAltIcon className="h-4 w-4 text-slate-500" />
                      <span>Timezone: {candidate.timezone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserGroupIcon className="h-4 w-4 text-slate-500" />
                      <span>Team: {candidate.team}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Documents */}
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">Documents</p>
                <div className="flex items-center space-x-2">
                  <DocumentTextIcon className="h-4 w-4 text-slate-500" />
                  <span>
                    CV: 
                    {candidate.cvLink ? (
                      <a 
                        href={candidate.cvLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="ml-2 inline-flex items-center text-indigo-600 hover:text-indigo-900"
                      >
                        View <LinkIcon className="h-4 w-4 ml-1" />
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClipboardDocumentListIcon className="h-4 w-4 text-slate-500" />
                  <span>
                    CPT/OPT Status: 
                    <span 
                      className={`ml-2 text-xs font-semibold px-2.5 py-0.5 rounded ${CPT_OPT_COLORS[candidate.cptOptStatus]}`}
                    >
                      {candidate.cptOptStatus}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClipboardDocumentListIcon className="h-4 w-4 text-slate-500" />
                  <span>Offer Letter: {candidate.offerLetterStatus}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClipboardDocumentListIcon className="h-4 w-4 text-slate-500" />
                  <span>VA Status: {candidate.vaStatus}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="h-4 w-4 text-slate-500" />
                  <span>WL Status: {candidate.wlStatus}</span>
                </div>
              </div>

              {/* Schedule & Notes */}
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">Schedule & Notes</p>
                {isEditing && tempData ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-slate-500" />
                      <span>HR Interview:</span>
                      <input
                        type="date"
                        value={formatDate(tempData.hrInterviewDate || candidate.hrInterviewDate)}
                        onChange={(e) => handleTempFieldChange('hrInterviewDate', e.target.value ? new Date(e.target.value) : null)}
                        className="border rounded px-2 py-1 w-full text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-slate-500" />
                      <span>PM Interview:</span>
                      <input
                        type="date"
                        value={formatDate(tempData.pmInterviewDate || candidate.pmInterviewDate)}
                        onChange={(e) => handleTempFieldChange('pmInterviewDate', e.target.value ? new Date(e.target.value) : null)}
                        className="border rounded px-2 py-1 w-full text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>Duration:</span>
                      <input
                        type="text"
                        value={tempData.duration || candidate.duration}
                        onChange={(e) => handleTempFieldChange('duration', e.target.value)}
                        className="border rounded px-2 py-1 w-full text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <PencilIcon className="h-4 w-4 text-slate-500" />
                      <span>Notes:</span>
                      <textarea
                        value={tempData.notes || ''}
                        onChange={(e) => handleTempFieldChange('notes', e.target.value)}
                        className="border rounded px-2 py-1 w-full h-16"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-slate-500" />
                      <span>HR Interview: {candidate.hrInterviewDate ? formatInterviewDate(candidate.hrInterviewDate) : 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-slate-500" />
                      <span>Assigned to: {candidate.interviewAssigned || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-slate-500" />
                      <span>PM Interview: {candidate.pmInterviewDate ? formatInterviewDate(candidate.pmInterviewDate) : 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-slate-500" />
                      <span>Assigned to: {candidate.interviewAssigned || 'N/A'}</span>
                    </div>                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-500" />
                      <span>Duration: {candidate.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PencilIcon className="h-4 w-4 text-slate-500" />
                      <span>Notes: {candidate.notes}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}