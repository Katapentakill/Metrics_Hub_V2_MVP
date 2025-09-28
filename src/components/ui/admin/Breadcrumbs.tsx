// UBICACIÓN: src/components/ui/Breadcrumbs.tsx
// Componente de breadcrumbs para navegación

'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isCurrentPage?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const router = useRouter();

  const handleClick = (item: BreadcrumbItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          
          {item.isCurrentPage ? (
            <span className="font-medium text-gray-800">{item.label}</span>
          ) : (
            <button
              onClick={() => handleClick(item)}
              className="hover:text-emerald-600 transition-colors"
              disabled={!item.href && !item.onClick}
            >
              {index === 0 ? (
                <div className="flex items-center space-x-1">
                  <Home className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              ) : (
                item.label
              )}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}