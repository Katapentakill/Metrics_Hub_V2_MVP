import SystemMetrics from '@/modules/evaluations/admin/SystemMetrics';

export default function AdminEvaluationMetricsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SystemMetrics />
    </div>
  );
}

export const metadata = {
  title: 'System Metrics - Evaluations | Living Stones',
  description: 'Deep insights into evaluation system performance and trends',
};