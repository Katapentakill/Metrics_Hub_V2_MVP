import EvaluationResults from '@/modules/evaluations/lead/EvaluationResults';

export default function LeadEvaluationResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluationResults />
    </div>
  );
}

export const metadata = {
  title: 'Evaluation Results - Lead | Living Stones',
  description: 'Review team performance results and analytics',
};