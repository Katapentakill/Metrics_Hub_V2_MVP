// src/modules/recruitment/admin/components/AdminPageLayout.tsx
import { LucideIcon } from 'lucide-react';
import AdminBreadcrumb from './AdminBreadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  breadcrumbItems: BreadcrumbItem[];
  children: React.ReactNode;
  headerActions?: React.ReactNode;
}

export default function AdminPageLayout({
  title,
  subtitle,
  description,
  icon: Icon,
  breadcrumbItems,
  children,
  headerActions
}: AdminPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-7xl mx-auto">
        <AdminBreadcrumb items={breadcrumbItems} />
        
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-lg">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">{title}</h1>
              {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
            </div>
          </div>
          {headerActions && (
            <div className="flex gap-3">
              {headerActions}
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-4xl">
          {description}
        </p>

        {children}
      </div>
    </div>
  );
}