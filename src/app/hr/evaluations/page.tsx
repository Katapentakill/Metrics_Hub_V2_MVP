import EvaluationProcessor from '@/modules/evaluations/hr/EvaluationProcessor';

export default function HREvaluationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluationProcessor />
    </div>
  );
}

export const metadata = {
  title: 'Evaluation Processor - HR | Living Stones',
  description: 'Review, analyze and process submitted evaluations',
};