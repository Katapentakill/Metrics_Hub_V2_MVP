// src/modules/dashboard/hr/VolunteerManagement.tsx
'use client';

import { getMockVolunteers } from '@/lib/data/mockVolunteerData';
import { Users, FileText, TrendingUp, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MockVolunteer } from '@/lib/data/mockVolunteerData';

// Card para mostrar las métricas de gestión de voluntarios
type MetricCardProps = {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ElementType;
  colorClass?: string;
};

const MetricCard = ({ title, value, unit, icon: Icon, colorClass }: MetricCardProps) => (
  <div className={`p-4 rounded-lg border flex flex-col justify-center items-center text-center space-y-2 ${colorClass}`}>
    <Icon className="w-6 h-6" />
    <p className="text-xl font-bold">{value}{unit}</p>
    <p className="text-sm text-slate-600">{title}</p>
  </div>
);

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState<MockVolunteer[]>([]);
  
  useEffect(() => {
    // Simulamos la carga de datos del mock
    const allVolunteers = getMockVolunteers();
    setVolunteers(allVolunteers);
  }, []);
  
  const totalVolunteers = volunteers.length;
  
  // Como el mock data no tiene 'hasPromotionRequest' y 'evaluationStatus', se simulan aquí
  // Estos valores son aleatorios para el propósito de demostración
  const pendingPromotions = Math.floor(Math.random() * (totalVolunteers / 5)); 
  const pendingEvaluations = Math.floor(Math.random() * (totalVolunteers / 3));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard 
        title="Voluntarios Totales"
        value={totalVolunteers}
        unit=""
        icon={Users}
        colorClass="bg-blue-50 text-blue-600 border-blue-200"
      />
      <MetricCard
        title="Evaluaciones Pendientes"
        value={pendingEvaluations}
        unit=""
        icon={FileText}
        colorClass="bg-yellow-50 text-yellow-600 border-yellow-200"
      />
      <MetricCard
        title="Candidatos a Promoción"
        value={pendingPromotions}
        unit=""
        icon={TrendingUp}
        colorClass="bg-emerald-50 text-emerald-600 border-emerald-200"
      />
      <MetricCard
        title="Nuevos Voluntarios (30d)"
        value={Math.floor(Math.random() * 5) + 1}
        unit=""
        icon={Award}
        colorClass="bg-slate-50 text-slate-600 border-slate-200"
      />
    </div>
  );
}