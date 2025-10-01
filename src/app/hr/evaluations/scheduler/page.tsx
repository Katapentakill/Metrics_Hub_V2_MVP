import EvaluationScheduler from '@/modules/evaluations/hr/EvaluationScheduler';

export default function HREvaluationSchedulerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluationScheduler />
    </div>
  );
}

export const metadata = {
  title: 'Evaluation Scheduler - HR | Living Stones',
  description: 'Plan and manage evaluation cycles and schedules',
};