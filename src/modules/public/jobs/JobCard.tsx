// src/modules/public/jobs/JobCard.tsx
'use client';

import { JobOpening } from '@/lib/types/jobOpenings';
import {
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  Users,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  job: JobOpening;
}

export default function JobCard({ job }: JobCardProps) {
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

  const getExperienceLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'Entry Level': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-orange-100 text-orange-700',
      'Expert': 'bg-red-100 text-red-700',
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const daysAgo = job.publishedDate
    ? Math.floor((Date.now() - job.publishedDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <Link href={`/ofertas/${job.id}`}>
      <div className="bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                  job.category
                )}`}
              >
                {job.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getExperienceLevelColor(
                  job.experienceLevel
                )}`}
              >
                {job.experienceLevel}
              </span>
              {daysAgo <= 7 && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                  ¡Nuevo!
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-1">
              {job.title}
            </h3>
            <p className="text-gray-600 font-medium">{job.department}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {job.description}
        </p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium border border-gray-200"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-medium">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-green-600" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="w-4 h-4 text-green-600" />
            <span>{job.hoursPerWeek}h/semana</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4 text-green-600" />
            <span>{job.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Briefcase className="w-4 h-4 text-green-600" />
            <span>{job.jobType}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{job.applicantsCount} postulantes</span>
            </div>
            {job.numberOfPositions > 1 && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{job.numberOfPositions} vacantes</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-green-700 font-semibold group-hover:gap-3 transition-all">
            <span>Ver más</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>

        {/* Time indicator */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Publicado hace {daysAgo === 0 ? 'hoy' : `${daysAgo} día${daysAgo > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
