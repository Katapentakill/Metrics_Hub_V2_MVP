// src/components/layout/HR/HeaderHR.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Importa useRouter
import { LayoutDashboard, UserPlus, MessageSquare, Search, FileText,ClipboardList,LayoutGrid, LogOut } from 'lucide-react'; // Importa el ícono de LogOut
import { useState } from 'react'; // Importa useState si lo necesitas para la sesión

const hrModules = [
  { name: 'Dashboard', href: '/hr/dashboard', icon: ClipboardList },
  { name: 'Volunteers', href: '/hr/volunteers', icon: ClipboardList },
  { name: 'Management', href: '/hr/management', icon: ClipboardList },
  { name: 'Onboarding', href: '/hr/recruitment', icon: ClipboardList },
  { name: 'Comunicaciones', href: '/hr/communications', icon: MessageSquare },
];

export default function HeaderHR() {
  const pathname = usePathname();
  const router = useRouter(); // Inicializa el router

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Elimina el token o la información de la sesión del localStorage
    localStorage.removeItem('auth_session'); 
    // Redirige al usuario a la página de inicio de sesión
    router.push('/login');
  };

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
          {/* Añade el botón de Cerrar Sesión */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm font-medium p-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}