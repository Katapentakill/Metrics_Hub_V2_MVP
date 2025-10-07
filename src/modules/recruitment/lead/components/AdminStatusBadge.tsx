// src/modules/recruitment/admin/components/AdminStatusBadge.tsx
import { cn } from '@/lib/utils';

interface AdminStatusBadgeProps {
  status: 'active' | 'pending' | 'completed' | 'draft' | 'published' | 'closed' | 'warning' | 'success' | 'info';
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const statusStyles = {
  active: 'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
  draft: 'bg-gray-100 text-gray-800 border-gray-200',
  published: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  closed: 'bg-red-100 text-red-800 border-red-200',
  warning: 'bg-orange-100 text-orange-800 border-orange-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export default function AdminStatusBadge({ 
  status, 
  children, 
  size = 'md' 
}: AdminStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        statusStyles[status],
        sizeStyles[size]
      )}
    >
      {children}
    </span>
  );
}