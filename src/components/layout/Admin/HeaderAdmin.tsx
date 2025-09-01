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
  Shield
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
            <ActiveLink href="/admin/settings" className="nav-link px-3 py-2 rounded-lg text-sm">
              <Settings className="w-4 h-4 inline mr-2" />
              Configuración
            </ActiveLink>
          </nav>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center space-x-4">
          {/* Búsqueda */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Buscar usuarios, proyectos..."
              className="w-56 h-9 pl-9 pr-4 text-sm bg-white/90 border border-slate-200 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500
                         placeholder:text-slate-400 transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

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
                <h3 className="font-semibold text-sm text-slate-700">Notificaciones</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800">Nuevo usuario registrado</p>
                    <p className="text-xs text-blue-600">María González se registró como voluntaria</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm font-medium text-yellow-800">Proyecto requiere atención</p>
                    <p className="text-xs text-yellow-600">EcoVerde tiene tareas bloqueadas</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <p className="text-sm font-medium text-green-800">Evaluación completada</p>
                    <p className="text-xs text-green-600">15 evaluaciones de Q4 finalizadas</p>
                  </div>
                </div>
                <button className="w-full text-sm text-primary hover:underline">
                  Ver todas las notificaciones
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
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-slate-700">{session?.name || 'Admin'}</p>
                <p className="text-xs text-muted -mt-0.5">Administrador</p>
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
                  <a href="/admin/profile" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>Mi Perfil</span>
                  </a>
                  <a href="/admin/settings" className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Configuración</span>
                  </a>
                  <hr className="my-1 border-slate-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
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