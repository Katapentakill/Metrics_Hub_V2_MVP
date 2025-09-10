// src/components/layout/volunteer/HeaderHR.tsx
// src/components/layout/volunteer/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ClipboardList,
  MessageSquare,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Shield,
  LayoutGrid,
  FileText,
} from 'lucide-react';

interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

const volunteerModules = [
  { name: 'Dashboard', href: '/volunteer/dashboard', icon: LayoutGrid },
  { name: 'Profile', href: '/volunteer/profile', icon: User },
  { name: 'Documents', href: '/volunteer/documents', icon: FileText },
];

export default function HeaderVolunteer() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount] = useState(1); // Simulado

  useEffect(() => {
    // Simula la obtención de la sesión desde localStorage
    const sessionData = localStorage.getItem('auth_session');
    if (sessionData) {
      setSession(JSON.parse(sessionData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_session');
    window.location.href = '/login';
  };

  return (
    <header className="nav-header fixed top-0 left-0 right-0 z-50 px-6 py-3 h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        {/* Logo y título */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient">Living Stones</h1>
              <p className="text-xs text-muted -mt-1">Volunteer Panel</p>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="hidden lg:flex items-center space-x-4">
            {volunteerModules.map((module) => (
              <Link
                key={module.name}
                href={module.href}
                className={`nav-link px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname.startsWith(module.href)
                    ? 'bg-green-100 text-green-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <module.icon className="w-4 h-4 inline mr-2" />
                {module.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center space-x-4">
          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-11 w-80 card p-4 space-y-3 z-50">
                <h3 className="font-semibold text-sm text-slate-700">Notifications</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800">Your interview is scheduled for tomorrow.</p>
                    <p className="text-xs text-blue-600">Please check your email for details.</p>
                  </div>
                </div>
                <button className="w-full text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* Menú de usuario */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-700">{session?.name || 'Volunteer'}</p>
                <p className="text-xs text-muted -mt-0.5">Volunteer</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-11 w-56 card p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-200">
                  <p className="text-sm font-medium text-slate-700">{session?.name}</p>
                  <p className="text-xs text-muted">{session?.email}</p>
                </div>
                <div className="py-1 space-y-1">
                  <Link href="/volunteer/profile" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link href="/volunteer/settings" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <ClipboardList className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-1 border-slate-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}