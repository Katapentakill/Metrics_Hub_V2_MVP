// src/components/layout/HR/HeaderHR.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ClipboardList, 
  Users, 
  MessageSquare, 
  Bell,
  ChevronDown,
  LogOut,
  User,
  Shield,
  LayoutGrid,
  FileText,
  BarChart3,
  BookOpen,
  Kanban
} from 'lucide-react';

interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

const hrModules = [
  { name: 'Dashboard', href: '/hr/dashboard', icon: LayoutGrid },
  { name: 'Volunteers', href: '/hr/volunteers', icon: Users },
  { name: 'Onboarding', href: '/hr/recruitment', icon: ClipboardList },
  { name: 'Communications', href: '/hr/communications', icon: MessageSquare },
];

const hrManagementModules = [
  { name: 'Training', href: '/hr/training', icon: BookOpen },
  { name: 'Evaluation & Feedback', href: '/hr/feedback', icon: BarChart3 },
  { name: 'Documents', href: '/hr/documents', icon: FileText },
  { name: 'Task Board', href: '/hr/tasks', icon: Kanban },
];

export default function HeaderHR() {
  const pathname = usePathname();
  const [session, setSession] = useState<SessionData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showManagementMenu, setShowManagementMenu] = useState(false);
  const [notificationCount] = useState(2); // Simulado

  useEffect(() => {
    // Simulates fetching session from localStorage
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
        {/* Logo and title */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient">Living Stones</h1>
              <p className="text-xs text-muted -mt-1">HR Panel</p>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {hrModules.map((module) => (
              <Link
                key={module.name}
                href={module.href}
                className={`nav-link px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname.startsWith(module.href)
                    ? 'bg-purple-100 text-purple-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <module.icon className="w-4 h-4 inline mr-2" />
                {module.name}
              </Link>
            ))}
            
            {/* Dropdown menu for HR Management */}
            <div className="relative">
                <button
                    onClick={() => setShowManagementMenu(!showManagementMenu)}
                    className="nav-link px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors flex items-center"
                >
                    <ClipboardList className="w-4 h-4 inline mr-2" />
                    HR Management
                    <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showManagementMenu ? 'rotate-180' : ''}`} />
                </button>
                {showManagementMenu && (
                    <div className="absolute top-11 left-0 w-60 card p-2 space-y-1 z-50">
                        {hrManagementModules.map((module) => (
                            <Link
                                key={module.name}
                                href={module.href}
                                className={`flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors`}
                            >
                                <module.icon className="w-4 h-4" />
                                <span>{module.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
          </nav>
        </div>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
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
                    <p className="text-sm font-medium text-blue-800">New volunteer application</p>
                    <p className="text-xs text-blue-600">José Pérez has submitted their application</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-yellow-800">Pending announcement</p>
                    <p className="text-xs text-yellow-600">Review the welcome announcement</p>
                  </div>
                </div>
                <button className="w-full text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-700">{session?.name || 'Admin'}</p>
                <p className="text-xs text-muted -mt-0.5">HR</p>
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
                  <Link href="/hr/profile" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link href="/hr/settings" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
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