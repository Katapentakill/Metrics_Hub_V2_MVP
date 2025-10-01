import EvaluationOverview from '@/modules/evaluations/admin/EvaluationOverview';

export default function AdminEvaluationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluationOverview />
    </div>
  );
}

export const metadata = {
  title: 'Evaluations Overview - Admin | Living Stones',
  description: 'Monitor and manage the organization-wide evaluation process',
};