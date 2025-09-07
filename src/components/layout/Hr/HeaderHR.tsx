// src/components/layout/HR/HeaderHR.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UserPlus, MessageSquare, Search, FileText,ClipboardList,LayoutGrid } from 'lucide-react';
const hrModules = [
  { name: 'Dashboard', href: '/hr/dashboard', icon: LayoutDashboard },
  { name: 'Kanban', href: '/hr/recruitment', icon: LayoutGrid },
  { name: 'Onboarding', href: '/hr/onboarding', icon: ClipboardList },
 // Enlace a la nueva página de Onboarding
  { name: 'Comunicaciones', href: '/hr/communications', icon: MessageSquare }, // Comunicación general
  { name: 'Asignación Proyectos', href: '/hr/projects', icon: Search },
];

export default function HeaderHR() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm p-4 border-b border-slate-200">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-xl font-bold text-emerald-600">Living Stones</span>
          <span className="ml-2 text-sm text-slate-500">Panel de RRHH</span>
        </div>
        <ul className="flex items-center space-x-6">
          {hrModules.map((module) => (
            <li key={module.name}>
              <Link
                href={module.href}
                className={`flex items-center text-sm font-medium p-2 rounded-lg transition-colors ${
                  pathname === module.href
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <module.icon className="w-4 h-4 mr-2" />
                {module.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}