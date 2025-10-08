// src/modules/recruitment/admin/components/AdminSectionCard.tsx
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AdminStatusBadge from './AdminStatusBadge';

interface AdminSectionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  color: string;
  badge?: {
    status: 'active' | 'pending' | 'completed' | 'draft' | 'published' | 'closed' | 'warning' | 'success' | 'info';
    text: string;
  };
  stats?: {
    label: string;
    value: string | number;
  }[];
  priority?: 'high' | 'medium' | 'low';
  quickActions?: {
    label: string;
    href: string;
  }[];
}

export default function AdminSectionCard({
  title,
  description,
  href,
  icon: Icon,
  color,
  badge,
  stats,
  priority,
  quickActions
}: AdminSectionCardProps) {
  const priorityStyles = {
    high: 'ring-2 ring-emerald-200 shadow-lg',
    medium: 'ring-1 ring-slate-200',
    low: 'ring-1 ring-gray-200'
  };

  return (
    <Link href={href}>
      <Card className={`
        hover:shadow-xl transition-all duration-300 cursor-pointer group
        hover:-translate-y-1 border border-slate-200 bg-white
        hover:border-emerald-500
        ${priority ? priorityStyles[priority] : 'hover:shadow-lg'}
      `}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className={`flex items-center gap-3 ${color}`}>
              <div className="p-2 rounded-lg bg-gray-50 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {title}
                </CardTitle>
                {badge && (
                  <div className="mt-2">
                    <AdminStatusBadge status={badge.status} size="sm">
                      {badge.text}
                    </AdminStatusBadge>
                  </div>
                )}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>
          
          {stats && stats.length > 0 && (
            <div className="flex gap-4 pt-3 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {quickActions && quickActions.length > 0 && (
            <div className="flex gap-2 pt-3 border-t border-slate-200 mt-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-3 py-2 text-xs font-medium text-center bg-emerald-50 text-emerald-700 rounded-md hover:bg-emerald-100 transition-colors"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}