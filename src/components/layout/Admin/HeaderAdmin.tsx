// src/components/layout/HeaderAdmin.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  Users, 
  FolderOpen, 
  BarChart3, 
  FileText, 
  Bell, 
  Search,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Handshake // <--- Importa el ícono de Onboarding
} from 'lucide-react';
import ActiveLink from '../../ActiveLink';

interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

export default function HeaderAdmin() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount] = useState(3); // Simulado

  useEffect(() => {
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
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient">Living Stones</h1>
              <p className="text-xs text-muted -mt-1">Panel de Administración</p>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="hidden lg:flex items-center space-x-1">
            <ActiveLink href="/admin/dashboard" className="nav-link px-3 py-2 rounded-lg text-sm">
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Dashboard
            </ActiveLink>
            <ActiveLink href="/admin/users" className="nav-link px-3 py-2 rounded-lg text-sm">
              <Users className="w-4 h-4 inline mr-2" />
              Usuarios
            </ActiveLink>
            <ActiveLink href="/admin/projects" className="nav-link px-3 py-2 rounded-lg text-sm">
              <FolderOpen className="w-4 h-4 inline mr-2" />
              Proyectos
            </ActiveLink>
            <ActiveLink href="/admin/reports" className="nav-link px-3 py-2 rounded-lg text-sm">
              <FileText className="w-4 h-4 inline mr-2" />
              Reportes
            </ActiveLink>
            {/* Nuevo enlace para Onboarding */}
            <ActiveLink href="/admin/onboarding" className="nav-link px-3 py-2 rounded-lg text-sm">
              <Handshake className="w-4 h-4 inline mr-2" />
              Onboarding
            </ActiveLink>
            <ActiveLink href="/admin/settings" className="nav-link px-3 py-2 rounded-lg text-sm">
              <Settings className="w-4 h-4 inline mr-2" />
              Configuración
            </ActiveLink>
          </nav>
        </div>

        {/* Acciones del usuario */}
        {/* ... (el resto del código se mantiene igual) */}
      </div>
    </header>
  );
}