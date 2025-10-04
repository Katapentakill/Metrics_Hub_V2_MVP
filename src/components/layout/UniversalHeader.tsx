// src/components/layout/UniversalHeader.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  Bell, 
  Search, // Se mantiene importado por si se añade la búsqueda en otro lugar
  ChevronDown,
  LogOut,
  User,
  Shield,
  UserCheck,
  Star,
  Heart,
  MessageSquare,
  UserPlus,
  ClipboardList,
  Calendar,
  Award,
  FolderOpen,
  Menu, 
  X
} from 'lucide-react';
import ActiveLink from '../ActiveLink'; 

// --- Tipos y Configuración ---

type UserRole = 'admin' | 'hr' | 'lead' | 'volunteer';
type NotificationType = 'blue' | 'yellow' | 'green' | 'emerald';

interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Notification {
    type: NotificationType;
    title: string;
    description: string;
    time?: string;
}

interface RoleConfig {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  focusRing: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  navigation: NavigationItem[];
  notifications: Notification[];
}

const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: {
    icon: Shield,
    gradient: 'from-emerald-500 to-emerald-600',
    focusRing: 'focus:ring-emerald-500/20 focus:border-emerald-500',
    title: 'Living Stones',
    subtitle: 'Panel de Administración',
    searchPlaceholder: 'Buscar usuarios, proyectos...',
    navigation: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
      { href: '/admin/users', label: 'Usuarios', icon: Users },
      { href: '/admin/projects', label: 'Proyectos', icon: FolderOpen },
      { href: '/admin/communications', label: 'Comunicaciones', icon: MessageSquare },
      { href: '/admin/documents', label: 'Documentos', icon: FileText },
      { href: '/admin/evaluations', label: 'Evaluaciones', icon: ClipboardList },
      { href: '/admin/recruitment', label: 'Reclutamiento', icon: UserPlus },

    ],
    notifications: [
      { type: 'blue', title: 'Nuevo usuario registrado', description: 'María González se registró como voluntaria' },
      { type: 'yellow', title: 'Proyecto requiere atención', description: 'EcoVerde tiene tareas bloqueadas' },
      { type: 'green', title: 'Evaluación completada', description: '15 evaluaciones de Q4 finalizadas' }
    ]
  },
  hr: {
    icon: UserCheck,
    gradient: 'from-blue-500 to-indigo-600',
    focusRing: 'focus:ring-blue-500/20 focus:border-blue-500',
    title: 'Living Stones',
    subtitle: 'Recursos Humanos',
    searchPlaceholder: 'Buscar voluntarios, evaluaciones...',
    navigation: [
      { href: '/hr/dashboard', label: 'Dashboard', icon: BarChart3 },
      { href: '/hr/users', label: 'Usuarios', icon: Users },
      { href: '/hr/projects', label: 'Proyectos', icon: FolderOpen },
      { href: '/hr/communications', label: 'Comunicaciones', icon: MessageSquare },
      { href: '/hr/documents', label: 'Documentos', icon: FileText },
      { href: '/hr/evaluations', label: 'Evaluaciones', icon: ClipboardList },
      { href: '/hr/recruitment', label: 'Reclutamiento', icon: UserPlus },

    ],
    notifications: [
      { type: 'blue', title: 'Nueva solicitud de voluntario', description: 'Ana López completó su aplicación' },
      { type: 'yellow', title: 'Evaluación vencida', description: '12 evaluaciones de Q4 pendientes' },
      { type: 'green', title: 'Capacitación completada', description: '15 voluntarios finalizaron el curso' }
    ]
  },
  lead: {
    icon: Star,
    gradient: 'from-purple-500 to-violet-600',
    focusRing: 'focus:ring-purple-500/20 focus:border-purple-500',
    title: 'Living Stones',
    subtitle: 'Líder de Proyecto',
    searchPlaceholder: 'Buscar proyectos, tareas...',
    navigation: [
      { href: '/lead/dashboard', label: 'Dashboard', icon: BarChart3 },
      { href: '/lead/users', label: 'Usuarios', icon: Users },
      { href: '/lead/projects', label: 'Proyectos', icon: FolderOpen },
      { href: '/lead/communications', label: 'Comunicaciones', icon: MessageSquare },
      { href: '/lead/documents', label: 'Documentos', icon: FileText },
      { href: '/lead/evaluations', label: 'Evaluaciones', icon: ClipboardList },
      { href: '/lead/recruitment', label: 'Reclutamiento', icon: UserPlus },

    ],
    notifications: [
      { type: 'blue', title: 'Nueva tarea asignada', description: 'Revisión de presupuesto Q4' },
      { type: 'yellow', title: 'Milestone próximo', description: 'Entrega proyecto EcoVerde mañana' },
      { type: 'green', title: 'Proyecto completado', description: 'CleanUp 2024 finalizado exitosamente' }
    ]
  },
  volunteer: {
    icon: Heart,
    gradient: 'from-pink-500 to-rose-600', 
    focusRing: 'focus:ring-pink-500/20 focus:border-pink-500',
    title: 'Living Stones',
    subtitle: 'Panel de Voluntario',
    searchPlaceholder: 'Buscar proyectos, tareas...',
    navigation: [
      { href: '/volunteer/dashboard', label: 'Dashboard', icon: BarChart3 },
      { href: '/volunteer/projects', label: 'Proyectos', icon: FolderOpen },
      { href: '/volunteer/communications', label: 'Comunicaciones', icon: MessageSquare },
      { href: '/volunteer/documents', label: 'Documentos', icon: FileText },
      { href: '/volunteer/evaluations', label: 'Mi Rendimiento', icon: Award },
      { href: '/volunteer/recruitment', label: 'Mi Proceso', icon: UserPlus },

    ],
    notifications: [
      { type: 'emerald', title: 'Nueva tarea asignada', description: 'Se te asignó una nueva tarea en el proyecto Educación Comunitaria', time: 'Hace 2 horas' },
      { type: 'yellow', title: 'Evaluación completada', description: 'Recibiste una evaluación de 5 estrellas', time: 'Hace 1 día' },
      { type: 'blue', title: 'Nuevo mensaje', description: 'Mensaje del líder del proyecto sobre reunión', time: 'Hace 3 días' }
    ]
  }
};

const publicConfig: RoleConfig = {
  icon: Heart,
  gradient: 'from-living-green-500 to-living-green-600',
  focusRing: 'focus:ring-living-green-500/20 focus:border-living-green-500',
  title: 'Living Stones',
  subtitle: 'Volunteer System',
  searchPlaceholder: '',
  navigation: [],
  notifications: []
};

const NOTIFICATION_COLORS: Record<NotificationType, { bg: string; text: string; border: string; time: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-400', time: 'text-blue-500' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-800', border: 'border-yellow-400', time: 'text-yellow-500' },
    green: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-400', time: 'text-green-500' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-400', time: 'text-emerald-500' },
};

// --- Componente de Notificación ---

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const colors = NOTIFICATION_COLORS[notification.type];
    const titleTextColor = colors.text;

    return (
        <div className={`p-3 ${colors.bg} rounded-lg border-l-4 ${colors.border}`}>
            <p className={`text-sm font-medium ${titleTextColor}`}>
                {notification.title}
            </p>
            <p className={`text-xs ${titleTextColor.replace('-800', '-600')} ${notification.time ? 'mt-1' : ''}`}>
                {notification.description}
            </p>
            {notification.time && (
                <p className={`text-xs ${colors.time} mt-1`}>
                    {notification.time}
                </p>
            )}
        </div>
    );
};

// --- Universal Header (Principal) ---

interface UniversalHeaderProps {
  userRole?: UserRole | 'public';
  isFixed?: boolean;
}

export default function UniversalHeader({ 
  userRole = 'public', 
  isFixed = true 
}: UniversalHeaderProps) {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); 
  const [showNavMenu, setShowNavMenu] = useState(false); // <--- NUEVO ESTADO DE MENÚ AGRUPADOR
  const [notificationCount] = useState(3);
  
  // Refs para cerrar menús al hacer clic fuera
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null); // <--- NUEVA REFERENCIA DE MENÚ AGRUPADOR
  
  const config = useMemo(() => 
    userRole === 'public' 
      ? publicConfig 
      : roleConfigs[userRole as UserRole]
  , [userRole]);

  const IconComponent = config.icon;

  // Lógica de carga de sesión y manejo de clics fuera
  useEffect(() => {
    if (userRole !== 'public') {
      const sessionData = localStorage.getItem('auth_session');
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        if (roleConfigs[parsedSession.role as UserRole]) {
          setSession(parsedSession);
        }
      }
    }
    
    const handleOutsideClick = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) { // <--- CERRAR MENÚ AGRUPADOR
        setShowNavMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [userRole]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth_session');
    router.replace('/login'); 
  }, [router]);

  const handleProfileClick = useCallback(() => {
    if (session?.userId) {
      router.push(`/${userRole}/profile`);
      setShowUserMenu(false);
    }
  }, [session, userRole, router]);

  // --- Header Público ---
  if (userRole === 'public') {
    return (
      <header className={`nav-header sticky top-0 z-50 transition-all duration-300 ${showMobileMenu ? 'h-full' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${config.gradient} rounded-xl shadow-lg`}>
                <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-living-green-500 rounded-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">{config.title}</h1>
                <p className="text-xs text-muted -mt-1">{config.subtitle}</p>
              </div>
            </Link>

            {/* Navegación de escritorio */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="/login" className="nav-link">Iniciar Sesión</a>
              <a href="/register" className="nav-link">Registrarse</a>
              <a href="#" className="nav-link">Acerca de</a>
              <a href="#" className="nav-link">Contacto</a>
            </nav>

            {/* Botones y menú móvil */}
            <div className="flex items-center gap-4">
              <a href="/register" className="btn-living hidden sm:inline-flex">
                Únete Ahora
              </a>
              
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-slate-600 hover:text-living-green-600 transition-colors"
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil (oculto por defecto) */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-sm p-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4 text-center">
              <a href="/login" className="nav-link-mobile">Iniciar Sesión</a>
              <a href="/register" className="nav-link-mobile">Registrarse</a>
              <a href="#" className="nav-link-mobile">Acerca de</a>
              <a href="#" className="nav-link-mobile">Contacto</a>
              <a href="/register" className="btn-living mt-4">Únete Ahora</a>
            </nav>
          </div>
        )}
      </header>
    );
  }

  // --- Header para Usuarios Autenticados ---
  const isVolunteer = userRole === 'volunteer';
  const headerClass = isVolunteer 
    ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm' 
    : 'nav-header';
  const titleClass = isVolunteer ? 'text-slate-800' : 'text-gradient';
  const subtitleClass = isVolunteer ? 'text-slate-500' : 'text-muted';

  return (
    <>
      <header className={`${isFixed ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 ${headerClass} px-4 md:px-6 py-3 h-16 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo y título */}
          <div className="flex items-center space-x-6">
            <a href={`/${userRole}/dashboard`} className="flex items-center space-x-3">
              <div className={`w-9 h-9 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center`}>
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold ${titleClass}`}>
                  {config.title}
                </h1>
                <p className={`text-xs ${subtitleClass} -mt-1 hidden sm:block`}>
                  {config.subtitle}
                </p>
              </div>
            </a>
          </div>

          {/* Navegación principal (AGRUPADA) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* 1. Ítems Principales (Mostrar los primeros 4) */}
            {config.navigation.slice(0, 4).map((item) => (
              <ActiveLink 
                key={item.href} 
                href={item.href} 
                className="nav-link px-3 py-2 rounded-lg text-sm"
              >
                <item.icon className="w-4 h-4 inline mr-2" />
                {item.label}
              </ActiveLink>
            ))}

            {/* 2. Dropdown para ítems Adicionales (Si hay más de 4) */}
            {config.navigation.length > 4 && (
                <div className="relative" ref={navMenuRef}>
                    <button
                        onClick={() => {
                            setShowNavMenu(prev => !prev);
                            setShowUserMenu(false); // Cerrar menú de usuario
                            setShowNotifications(false); // Cerrar notificaciones
                        }}
                        className={`nav-link px-3 py-2 rounded-lg text-sm flex items-center transition-colors 
                                   ${showNavMenu ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                        aria-expanded={showNavMenu}
                    >
                        <Menu className="w-4 h-4 inline mr-2 text-slate-500" />
                        Más
                        <ChevronDown className={`w-4 h-4 ml-1 text-slate-500 transition-transform duration-200 ${showNavMenu ? 'rotate-180' : 'rotate-0'}`} />
                    </button>

                    {showNavMenu && (
                        <div className="absolute left-0 top-12 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 origin-top-left animate-in fade-in-0 zoom-in-95 duration-200">
                            <div className="py-1 space-y-1">
                                {config.navigation.slice(4).map((item) => (
                                    <ActiveLink 
                                        key={item.href} 
                                        href={item.href} 
                                        className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
                                        onClick={() => setShowNavMenu(false)} // Cerrar al seleccionar un enlace
                                    >
                                        <item.icon className="w-4 h-4 text-slate-500" />
                                        <span className="font-medium">{item.label}</span>
                                    </ActiveLink>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
          </nav>

          {/* Acciones del usuario */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* EL BUSCADOR HA SIDO ELIMINADO PARA LIBERAR ESPACIO. 
            {config.searchPlaceholder && (
              <div className="hidden lg:block relative">
                ... Buscador ...
              </div>
            )}
            */}

            {/* Notificaciones */}
            <div className="relative" ref={notifMenuRef}>
              <button
                onClick={() => {
                    setShowNotifications(prev => !prev);
                    setShowUserMenu(false); 
                    setShowNavMenu(false); // Cerrar menú de navegación
                }}
                className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Notificaciones"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-11 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 space-y-3 z-50 origin-top-right animate-in fade-in-0 zoom-in-95 duration-200">
                  <h3 className="font-semibold text-base text-slate-800 border-b pb-2">Notificaciones Recientes</h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {config.notifications.map((notification, index) => (
                      <NotificationItem key={index} notification={notification} />
                    ))}
                    {config.notifications.length === 0 && (
                         <p className="text-sm text-slate-500 text-center py-4">No hay notificaciones.</p>
                    )}
                  </div>
                  {config.notifications.length > 0 && (
                      <button className="w-full text-sm text-blue-600 hover:text-blue-800 transition-colors pt-2 border-t">
                        Ver todas las notificaciones
                      </button>
                  )}
                </div>
              )}
            </div>

            {/* Menú de usuario */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                    setShowUserMenu(prev => !prev);
                    setShowNotifications(false); 
                    setShowNavMenu(false); // Cerrar menú de navegación
                }}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Menú de usuario"
              >
                {/* Avatar */}
                <div className={`w-8 h-8 bg-gradient-to-br ${config.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                  {session?.avatar ? (
                    <Image src={session.avatar} alt={session.name} className="w-8 h-8 rounded-full object-cover" width={32} height={32} />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                {/* Info de usuario (Escritorio) */}
                <div className="hidden sm:block text-left truncate max-w-[120px]">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {session?.name || `Usuario ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
                  </p>
                  <p className="text-xs text-slate-500 -mt-0.5 truncate">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : 'rotate-0'}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 origin-top-right animate-in fade-in-0 zoom-in-95 duration-200">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{session?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{session?.email}</p>
                  </div>
                  <div className="py-1 space-y-1">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span className="font-medium">Mi Perfil</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/${userRole}/settings`);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="font-medium">Configuración</span>
                    </button>
                    <hr className="my-1 border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left font-medium"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Menú para Navegación Móvil (Solo visible en pantallas pequeñas) */}
            <button 
                onClick={() => {
                    setShowMobileMenu(prev => !prev);
                    setShowUserMenu(false); 
                    setShowNotifications(false);
                    setShowNavMenu(false); // Cerrar menú de navegación
                }}
                className="lg:hidden p-2 ml-2 text-slate-600 hover:bg-slate-100 transition-colors rounded-lg"
                aria-label="Menú de Navegación"
            >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Navegación Móvil para usuarios autenticados */}
      {showMobileMenu && (
        <nav className="lg:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-sm p-4 border-t border-slate-200 z-40 overflow-y-auto animate-in slide-in-from-top-1 duration-300">
            <div className="space-y-2">
                {config.navigation.map((item) => (
                    <ActiveLink 
                        key={item.href} 
                        href={item.href} 
                        className="flex items-center space-x-3 p-3 text-base text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full"
                        onClick={() => setShowMobileMenu(false)} // Cierra el menú al hacer clic
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </ActiveLink>
                ))}
            </div>
            <hr className="my-4 border-slate-100" />
            <div className="flex flex-col space-y-2">
                <button
                    onClick={() => { handleProfileClick(); setShowMobileMenu(false); }}
                    className="flex items-center space-x-3 p-3 text-base text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
                >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Mi Perfil</span>
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-3 text-base text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left font-medium"
                >
                    <LogOut className="w-5 h-5 text-red-500" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </nav>
      )}

      {/* Spacer para headers fijos */}
      {isFixed && <div className="h-16"></div>}
    </>
  );
}