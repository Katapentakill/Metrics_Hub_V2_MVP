// src/components/layout/Lead/HeaderLead.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  MessageSquare, 
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  User,
  Calendar,
  Target,
  Clock
} from 'lucide-react';
import ActiveLink from '@/components/ActiveLink';

export default function HeaderLead() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const session = localStorage.getItem('auth_session');
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        setUserData(sessionData);
      } catch (error) {
        console.error('Error parsing session data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_session');
    window.location.href = '/login';
  };

  const leadModules = [
    { 
      name: 'Dashboard', 
      href: '/lead_project/dashboard', 
      icon: LayoutDashboard,
      description: 'Panel principal con métricas'
    },
    { 
      name: 'Proyectos', 
      href: '/lead_project/projects', 
      icon: FolderOpen,
      description: 'Administrar proyectos activos'
    },
    { 
      name: 'Mi Equipo', 
      href: '/lead_project/team', 
      icon: Users,
      description: 'Gestionar miembros del equipo'
    },
    { 
      name: 'Tareas', 
      href: '/lead_project/tasks', 
      icon: Target,
      description: 'Tablero Kanban de tareas'
    },
    { 
      name: 'Comunicación', 
      href: '/lead_project/communications', 
      icon: MessageSquare,
      description: 'Chat y coordinación'
    },
    { 
      name: 'Reportes', 
      href: '/lead_project/reports', 
      icon: BarChart3,
      description: 'Métricas y análisis'
    },
    { 
      name: 'Cronograma', 
      href: '/lead_project/schedule', 
      icon: Calendar,
      description: 'Deadlines y planificación'
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-emerald-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  Living Stones
                </h1>
                <p className="text-xs text-emerald-600 font-medium">Líder de Proyecto</p>
              </div>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {leadModules.slice(0, 5).map((module) => (
              <ActiveLink
                key={module.href}
                href={module.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 group relative"
                activeClassName="bg-emerald-100 text-emerald-800 shadow-sm"
              >
                <module.icon className="w-4 h-4" />
                <span>{module.name}</span>
                
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {module.description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                </div>
              </ActiveLink>
            ))}

            {/* Dropdown para más opciones */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700">
                <Settings className="w-4 h-4" />
                <span>Más</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
                {leadModules.slice(5).map((module) => (
                  <ActiveLink
                    key={module.href}
                    href={module.href}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <module.icon className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-xs text-slate-500">{module.description}</p>
                    </div>
                  </ActiveLink>
                ))}
                
                <hr className="border-slate-200 my-2" />
                
                <ActiveLink
                  href="/lead_project/settings"
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors rounded-b-lg"
                >
                  <Settings className="w-4 h-4" />
                  <span>Configuración</span>
                </ActiveLink>
              </div>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar proyectos, tareas..."
                  className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {notifications}
                  </span>
                )}
              </button>
            </div>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userData?.name ? userData.name.split(' ').map((n: string) => n[0]).join('') : 'LP'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-slate-800">
                    {userData?.name || 'Líder de Proyecto'}
                  </p>
                  <p className="text-xs text-slate-500">Project Lead</p>
                </div>
              </button>

              {/* User Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-20">
                <div className="p-4 border-b border-slate-200">
                  <p className="font-medium text-slate-800">{userData?.name || 'Líder de Proyecto'}</p>
                  <p className="text-sm text-slate-500">{userData?.email || 'lead@example.com'}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">Líder de Proyecto</p>
                </div>
                
                <div className="p-2">
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    <span>Mi Perfil</span>
                  </button>
                  
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Configuración</span>
                  </button>
                  
                  <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <Clock className="w-4 h-4" />
                    <span>Historial de Actividad</span>
                  </button>
                </div>
                
                <div className="p-2 border-t border-slate-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-emerald-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {leadModules.map((module) => (
              <div key={module.href}>
                <ActiveLink
                  href={module.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  activeClassName="bg-emerald-100 text-emerald-800"
                >
                  <div 
                    className="flex items-center space-x-3 w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <module.icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-xs text-slate-500">{module.description}</p>
                    </div>
                  </div>
                </ActiveLink>
              </div>
            ))}
            
            <hr className="border-slate-200 my-4" />
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}