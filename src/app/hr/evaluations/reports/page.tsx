import PerformanceReports from '@/modules/evaluations/hr/PerformanceReports';

export default function HREvaluationReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PerformanceReports />
    </div>
  );
}

export const metadata = {
  title: 'Performance Reports - HR | Living Stones',
  description: 'Comprehensive performance analysis and insights',
};