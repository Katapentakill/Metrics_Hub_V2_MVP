import { BarChart3, Activity, Settings, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface EvaluationsLayoutProps {
  children: React.ReactNode;
}

const evaluationNavItems = [
  {
    name: 'Overview',
    href: '/admin/evaluations',
    icon: BarChart3,
    description: 'General system overview'
  },
  {
    name: 'Metrics',
    href: '/admin/evaluations/metrics',
    icon: Activity,
    description: 'Performance analytics'
  },
  {
    name: 'Settings',
    href: '/admin/evaluations/settings',
    icon: Settings,
    description: 'System configuration'
  },
  {
    name: 'Reports',
    href: '/admin/evaluations/reports',
    icon: FileText,
    description: 'Generate reports'
  }
];

export default function EvaluationsLayout({ children }: EvaluationsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="lg:w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-living-green-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-living-green-600" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Evaluations</h1>
              <p className="text-sm text-gray-500">System Management</p>
            </div>
          </div>

          <nav className="space-y-2">
            {evaluationNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-living-green-600 transition-colors group"
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Stats in Sidebar */}
        <div className="p-6 border-t border-gray-100">
          <h3 className="font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Evaluations</span>
              <span className="font-semibold text-living-green-600">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="font-semibold text-emerald-600">86%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">22</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overdue</span>
              <span className="font-semibold text-red-600">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}