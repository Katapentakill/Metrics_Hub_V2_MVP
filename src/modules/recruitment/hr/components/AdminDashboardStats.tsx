// src/modules/recruitment/admin/components/AdminDashboardStats.tsx
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatItem {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon: LucideIcon;
  color: string;
}

interface AdminDashboardStatsProps {
  stats: StatItem[];
}

export default function AdminDashboardStats({ stats }: AdminDashboardStatsProps) {
  const getTrendIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </p>
                {stat.change && (
                  <div className="flex items-center gap-1">
                    {getTrendIcon(stat.change.type)}
                    <span className={`text-sm font-medium ${getTrendColor(stat.change.type)}`}>
                      {stat.change.value > 0 ? '+' : ''}{stat.change.value}%
                    </span>
                    <span className="text-sm text-gray-500">
                      vs {stat.change.period}
                    </span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}