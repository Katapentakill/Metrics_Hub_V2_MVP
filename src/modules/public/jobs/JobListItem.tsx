// src/modules/public/jobs/JobListItem.tsx
'use client';

import { JobOpening } from '@/lib/types/jobOpenings';
import { MapPin, Clock, Briefcase, TrendingUp } from 'lucide-react';

interface JobListItemProps {
  job: JobOpening;
  isSelected: boolean;
  onClick: () => void;
}

export default function JobListItem({ job, isSelected, onClick }: JobListItemProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: 'bg-blue-100 text-blue-700 border-blue-200',
      Design: 'bg-purple-100 text-purple-700 border-purple-200',
      Marketing: 'bg-pink-100 text-pink-700 border-pink-200',
      Operations: 'bg-orange-100 text-orange-700 border-orange-200',
      'Human Resources': 'bg-teal-100 text-teal-700 border-teal-200',
      Finance: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Legal: 'bg-slate-100 text-slate-700 border-slate-200',
      Other: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const daysAgo = job.publishedDate
    ? Math.floor((Date.now() - job.publishedDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div
      onClick={onClick}
      className={`
        border-b border-gray-200 p-4 cursor-pointer transition-all hover:bg-green-50
        ${isSelected ? 'bg-green-50 border-l-4 border-l-green-600' : 'border-l-4 border-l-transparent'}
      `}
    >
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className={`font-bold text-base line-clamp-2 ${isSelected ? 'text-green-700' : 'text-gray-900'}`}>
            {job.title}
          </h3>
          {daysAgo <= 7 && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded flex-shrink-0">
              Nuevo
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium mb-2">{job.department}</p>
      </div>

      {/* Category Badge */}
      <div className="mb-3">
        <span className={`px-2 py-1 rounded text-xs font-semibold border inline-block ${getCategoryColor(job.category)}`}>
          {job.category}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <span>{job.hoursPerWeek}h/sem • {job.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Briefcase className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <span>{job.jobType}</span>
        </div>
      </div>

      {/* Skills preview */}
      <div className="flex flex-wrap gap-1 mb-2">
        {job.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
            +{job.skills.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">
          {daysAgo === 0 ? 'Hoy' : `Hace ${daysAgo} día${daysAgo > 1 ? 's' : ''}`}
        </span>
        <div className="flex items-center gap-1 text-gray-500">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{job.applicantsCount} postulantes</span>
        </div>
      </div>
    </div>
  );
}
