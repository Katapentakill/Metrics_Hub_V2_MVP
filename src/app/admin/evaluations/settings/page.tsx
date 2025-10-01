import EvaluationSettings from '@/modules/evaluations/admin/EvaluationSettings';

export default function AdminEvaluationSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EvaluationSettings />
    </div>
  );
}

export const metadata = {
  title: 'Evaluation Settings - Admin | Living Stones',
  description: 'Configure system-wide evaluation parameters and policies',
};