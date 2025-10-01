import TeamEvaluations from '@/modules/evaluations/lead/TeamEvaluations';

export default function LeadEvaluationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeamEvaluations />
    </div>
  );
}

export const metadata = {
  title: 'Team Evaluations - Lead | Living Stones',
  description: 'Manage and track your team\'s performance evaluations',
};