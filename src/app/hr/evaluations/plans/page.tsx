import ImprovementPlans from '@/modules/evaluations/hr/ImprovementPlans';

export default function HREvaluationPlansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ImprovementPlans />
    </div>
  );
}

export const metadata = {
  title: 'Improvement Plans - HR | Living Stones',
  description: 'Create and manage employee development plans',
};