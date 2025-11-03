// src/modules/recruitment/admin/components/AdminBreadcrumb.tsx
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminBreadcrumbProps {
  items?: BreadcrumbItem[]; // Hacer items opcional
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  // Si no hay items, no renderizar nada
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link 
        href="/admin/recruitment" 
        className="flex items-center hover:text-green-600 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        Admin
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-green-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-800 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}