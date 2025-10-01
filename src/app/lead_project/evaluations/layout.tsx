import { Users, Target, BarChart3, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface LeadEvaluationsLayoutProps {
  children: React.ReactNode;
}

const leadEvaluationNavItems = [
  {
    name: 'Team Overview',
    href: '/lead_project/evaluations',
    icon: Users,
    description: 'Manage team evaluations'
  },
  {
    name: 'Evaluate',
    href: '/lead_project/evaluations/evaluate',
    icon: Target,
    description: 'Evaluate team members'
  },
  {
    name: 'Results',
    href: '/lead_project/evaluations/results',
    icon: BarChart3,
    description: 'Review results & analytics'
  },
  {
    name: 'Feedback',
    href: '/lead_project/evaluations/feedback',
    icon: MessageSquare,
    description: 'Manage feedback & communication'
  }
];

export default function LeadEvaluationsLayout({ children }: LeadEvaluationsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 bg-white shadow-sm border-r border-gray-200">
        {/* ... resto del contenido del layout ... */}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}