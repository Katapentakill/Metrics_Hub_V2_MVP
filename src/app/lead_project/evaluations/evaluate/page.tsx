import EvaluateTeamMembers from '@/modules/evaluations/lead/EvaluateTeamMembers';

export default function LeadEvaluateTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluateTeamMembers />
    </div>
  );
}

export const metadata = {
  title: 'Evaluate Team Members - Lead | Living Stones',
  description: 'Conduct comprehensive evaluations of your team members',
};