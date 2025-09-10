//src/modules/dashboard/hr/RecruitmentPipeline.tsx
'use client';

import { getMockRecruitmentData } from '@/lib/data/mockRecruitmentData';
import { Briefcase, CalendarCheck, UserRoundCheck, Hourglass } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MockCandidate } from '@/lib/data/mockRecruitmentData';

// Card para mostrar las métricas del pipeline
type StatCardProps = {
  title: string;
  value: number;
  icon: React.ElementType;
  colorClass: string;
};

const StatCard = ({ title, value, icon: Icon, colorClass }: StatCardProps) => (
  <div className={`p-5 rounded-lg border flex items-center space-x-4 ${colorClass}`}>
    <Icon className="w-8 h-8" />
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default function RecruitmentPipeline() {
  const [candidates, setCandidates] = useState<MockCandidate[]>([]);

  useEffect(() => {
    // Simulamos la carga de datos del mock
    const allCandidates = getMockRecruitmentData(20);
    setCandidates(allCandidates);
  }, []);

  const totalApplications = candidates.length;
  const inReview = candidates.filter(c => c.applicationStatus === 'HR Review').length;
  const upcomingInterviews = candidates.filter(c => c.applicationStatus === 'Interview Scheduled').length;
  const newApplications = candidates.filter(c => c.applicationStatus === 'Application Received').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard 
        title="Nuevas Aplicaciones"
        value={newApplications}
        icon={UserRoundCheck}
        colorClass="bg-blue-50 text-blue-600 border-blue-200"
      />
      <StatCard 
        title="En Revisión"
        value={inReview}
        icon={Hourglass}
        colorClass="bg-yellow-50 text-yellow-600 border-yellow-200"
      />
      <StatCard 
        title="Entrevistas Agendadas"
        value={upcomingInterviews}
        icon={CalendarCheck}
        colorClass="bg-emerald-50 text-emerald-600 border-emerald-200"
      />
      <StatCard 
        title="Total de Candidatos"
        value={totalApplications}
        icon={Briefcase}
        colorClass="bg-slate-50 text-slate-600 border-slate-200"
      />
    </div>
  );
}
