import ReportsGenerator from '@/modules/evaluations/admin/ReportsGenerator';

export default function AdminEvaluationReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ReportsGenerator />
    </div>
  );
}

export const metadata = {
  title: 'Reports Generator - Evaluations | Living Stones',
  description: 'Generate comprehensive evaluation reports and analytics',
};