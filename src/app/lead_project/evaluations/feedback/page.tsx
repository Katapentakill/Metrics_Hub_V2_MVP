import FeedbackManager from '@/modules/evaluations/lead/FeedbackManager';

export default function LeadFeedbackManagerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FeedbackManager />
    </div>
  );
}

export const metadata = {
  title: 'Feedback Manager - Lead | Living Stones',
  description: 'Manage bidirectional feedback and team communication',
};