import { CheckCircle, BarChart3, Target, Calendar } from 'lucide-react';
import Link from 'next/link';

interface HREvaluationsLayoutProps {
  children: React.ReactNode;
}

const hrEvaluationNavItems = [
  {
    name: 'Processor',
    href: '/hr/evaluations',
    icon: CheckCircle,
    description: 'Review & process evaluations'
  },
  {
    name: 'Reports',
    href: '/hr/evaluations/reports',
    icon: BarChart3,
    description: 'Performance analytics'
  },
  {
    name: 'Plans',
    href: '/hr/evaluations/plans',
    icon: Target,
    description: 'Improvement plans'
  },
  {
    name: 'Scheduler',
    href: '/hr/evaluations/scheduler',
    icon: Calendar,
    description: 'Cycles & reminders'
  }
];

export default function HREvaluationsLayout({ children }: HREvaluationsLayoutProps) {
  // ... resto del código del layout
}