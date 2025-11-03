// src/modules/recruitment/admin/components/AdminPageLayout.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import AdminBreadcrumb from './AdminBreadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminPageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  headerActions?: React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[]; // Opcional
  children: React.ReactNode;
}

export default function AdminPageLayout({
  title,
  subtitle,
  description,
  icon: Icon,
  headerActions,
  breadcrumbItems,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb - Solo renderizar si hay items */}
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <AdminBreadcrumb items={breadcrumbItems} />
          )}

          {/* Título con Icono */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {/* ✅ ICONO SIN FONDO - COLOR GREEN-800 según guía */}
              {Icon && (
                <Icon className="w-8 h-8 text-green-800" />
              )}
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                )}
              </div>
            </div>

            {/* Header Actions */}
            {headerActions && (
              <div className="flex items-center gap-3">
                {headerActions}
              </div>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-gray-600 mt-2 max-w-3xl">{description}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        {children}
      </div>
    </div>
  );
}