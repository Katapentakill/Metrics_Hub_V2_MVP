'use client';
import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation'; 


import { 
  Settings, 
  Users, 
  BarChart3, 
  FileText, 
  Bell, 
  ChevronDown,
  LogOut,
  User,
  Shield,
  UserCheck,
  Star,
  Heart,
  MessageSquare,
  UserPlus,
  Award, 
  FolderOpen,
  Menu, 
  X
} from 'lucide-react';
import ActiveLink from '../ActiveLink'; // Original failing import



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

// MODIFICACIÓN: Agregar 'submenu' opcional
interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: NavigationItem[]; 
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

// **CONFIGURACIÓN DE SUBMENÚS DE DOCUMENTOS**
const DOCUMENT_SUBMENUS: Record<Exclude<UserRole, 'volunteer'>, NavigationItem[]> & { volunteer: NavigationItem[] } = {
    admin: [
        { href: '/admin/documents/company-library', label: 'Company Library', icon: FolderOpen },
        { href: '/admin/documents/policies-guides', label: 'Policies & Guides', icon: FileText },
        { href: '/admin/documents/volunteer-submissions', label: 'Volunteer Submissions', icon: UserPlus },
        { href: '/admin/documents/management', label: 'Document Management', icon: Settings },
    ],
    hr: [
        { href: '/hr/documents/hiring-and-onboarding', label: 'Hiring and Onboarding', icon: UserPlus },
        { href: '/hr/documents/volunteer-submissions', label: 'Volunteer Submissions for Approval', icon: UserCheck },
        { href: '/hr/documents/volunteer-documents', label: 'Volunteer Documents', icon: FileText },
        { href: '/hr/documents/policies-guides', label: 'Policies & Guides', icon: FileText },
        { href: '/hr/documents/volunteer-termination', label: 'Volunteer Termination', icon: X },
        { href: '/hr/documents/company-library', label: 'Company Library', icon: FolderOpen },
    ],
    lead: [
        { href: '/lead/documents/candidate-files', label: 'Documentos de Candidatos', icon: User },
        { href: '/lead/documents/project-resources', label: 'Guías y Recursos del Proyecto', icon: FolderOpen },
        { href: '/lead/documents/team-library', label: 'Biblioteca del Equipo', icon: FolderOpen },
    ],
    volunteer: [
        { href: '/volunteer/documents/my-application-files', label: 'Mis Documentos de Postulación', icon: UserCheck },
        { href: '/volunteer/documents/signed-documents', label: 'Documentos Firmados', icon: FileText },
        { href: '/volunteer/documents/project-resources', label: 'Guías y Recursos del Proyecto', icon: FolderOpen },
        { href: '/volunteer/documents/upload', label: 'Subir Nuevos Documentos', icon: UserPlus },
    ]
};

// **NUEVA CONFIGURACIÓN DE SUBMENÚS DE RECLUTAMIENTO**
const RECRUITMENT_SUBMENUS: Record<Exclude<UserRole, 'volunteer'>, NavigationItem[]> = {
    admin: [
        { href: '/admin/recruitment/job-openings', label: 'Gestión de Vacantes', icon: FolderOpen },
        { href: '/admin/recruitment/candidate-management', label: 'Gestión de Candidatos', icon: Users },
        { href: '/admin/recruitment/evaluation', label: 'Evaluación y Selección', icon: Award },
        { href: '/admin/recruitment/offers-hiring', label: 'Ofertas y Contratación', icon: UserCheck },
        { href: '/admin/recruitment/analytics', label: 'Reportes y Analíticas', icon: BarChart3 },
        { href: '/admin/recruitment/audits', label: 'Auditoría y Seguridad', icon: Shield },
    ],
    hr: [
        { href: '/hr/recruitment/job-openings', label: 'Gestión de Vacantes', icon: FolderOpen },
        { href: '/hr/recruitment/candidate-management', label: 'Gestión de Candidatos', icon: Users },
        { href: '/hr/recruitment/evaluation', label: 'Evaluación y Selección', icon: Award },
        { href: '/hr/recruitment/offers-hiring', label: 'Ofertas y Contratación', icon: UserCheck },
        { href: '/hr/recruitment/analytics', label: 'Reportes y Analíticas', icon: BarChart3 },
    ],
    lead: [
        { href: '/lead/recruitment/job-openings', label: 'Mis Vacantes', icon: FolderOpen },
        { href: '/lead/recruitment/candidate-management', label: 'Mis Candidatos', icon: Users },
    ],
};


const getRoleNavigation = (role: UserRole): NavigationItem[] => {
    const baseNav: NavigationItem[] = [
      { href: `/${role}/dashboard`, label: 'Dashboard', icon: BarChart3 },
      // Modificado para usar el label específico de cada rol
      { 
        href: `/${role}/users`, 
        label: role === 'admin' ? 'Usuarios' : role === 'hr' ? 'Voluntarios' : 'Mi Equipo', 
        icon: Users 
      }, 
      { href: `/${role}/projects`, label: 'Proyectos', icon: FolderOpen },
      { href: `/${role}/communications`, label: 'Comunicaciones', icon: MessageSquare },
      { 
        href: `/${role}/documents`, 
        label: 'Documentos', 
        icon: FileText,
        submenu: DOCUMENT_SUBMENUS[role] // INYECCIÓN DEL SUBMENÚ DE DOCUMENTOS
      },
      { 
        href: `/${role}/evaluations`, 
        label: role === 'volunteer' ? 'Mi Rendimiento' : 'Evaluaciones', 
        icon: Award 
      }, 
      { 
        href: `/${role}/recruitment`, 
        label: role === 'volunteer' ? 'Mi Proceso' : 'Reclutamiento', 
        icon: UserPlus,
        // INYECCIÓN CONDICIONAL DEL SUBMENÚ DE RECLUTAMIENTO
        submenu: role !== 'volunteer' ? RECRUITMENT_SUBMENUS[role as Exclude<UserRole, 'volunteer'>] : undefined
      },
    ];

    // Para el voluntario, el enlace de usuarios/equipo no existe en su navegación base
    if (role === 'volunteer') {
        return baseNav.filter(item => item.label !== 'Mi Equipo' && item.href !== '/volunteer/users'); 
    }
    return baseNav;
}


const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: {
    icon: Shield,
    gradient: 'from-emerald-500 to-emerald-600',
    focusRing: 'focus:ring-emerald-500/20 focus:border-emerald-500',
    title: 'Living Stones',
    subtitle: 'Panel de Administración',
    searchPlaceholder: 'Buscar usuarios, proyectos...',
    navigation: getRoleNavigation('admin'),
    notifications: [
      { type: 'blue', title: 'Nuevo usuario registrado', description: 'María González se registró como voluntaria' },
      { type: 'yellow', title: 'Proyecto requiere atención', description: 'EcoVerde tiene tareas bloqueadas' },
      { type: 'green', title: 'Evaluación completada', description: '15 evaluaciones de Q4 finalizadas' }
    ]
  },
  hr: {
    icon: UserCheck,
    gradient: 'from-emerald-500 to-emerald-600',
    focusRing: 'focus:ring-emerald-500/20 focus:border-emerald-500',
    title: 'Living Stones',
    subtitle: 'Recursos Humanos',
    searchPlaceholder: 'Buscar voluntarios, evaluaciones...',
    navigation: getRoleNavigation('hr'),
    notifications: [
      { type: 'blue', title: 'Nueva solicitud de voluntario', description: 'Ana López completó su aplicación' },
      { type: 'yellow', title: 'Evaluación vencida', description: '12 evaluaciones de Q4 pendientes' },
      { type: 'green', title: 'Capacitación completada', description: '15 voluntarios finalizaron el curso' }
    ]
  },
  lead: {
    icon: Star,
    gradient: 'from-emerald-500 to-emerald-600',
    focusRing: 'focus:ring-emerald-500/20 focus:border-emerald-500',
    title: 'Living Stones',
    subtitle: 'Líder de Proyecto',
    searchPlaceholder: 'Buscar proyectos, tareas...',
    navigation: getRoleNavigation('lead'),
    notifications: [
      { type: 'blue', title: 'Nueva tarea asignada', description: 'Revisión de presupuesto Q4' },
      { type: 'yellow', title: 'Milestone próximo', description: 'Entrega proyecto EcoVerde mañana' },
      { type: 'green', title: 'Proyecto completado', description: 'CleanUp 2024 finalizado exitosamente' }
    ]
  },
  volunteer: {
    icon: Heart,
    gradient: 'from-emerald-500 to-emerald-600',
    focusRing: 'focus:ring-emerald-500/20 focus:border-emerald-500',
    title: 'Living Stones',
    subtitle: 'Panel de Voluntario',
    searchPlaceholder: 'Buscar proyectos, tareas...',
    navigation: getRoleNavigation('volunteer'),
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

// **CONSTANTE DE MAPEO DE GRADIENTES PARA AVATAR POR ROL**
const AVATAR_GRADIENTS: Record<UserRole, string> = {
  admin: 'from-green-700 to-green-800',    // Admin: verde más oscuro
  hr: 'from-green-600 to-green-700',       // HR: un poco menos oscuro
  lead: 'from-green-500 to-green-600',      // Lead: verde medio
  volunteer: 'from-green-400 to-green-500', // Volunteer: verde más claro
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

// --- Nuevo Componente de Submenú para Sidebar (Desktop) ---

interface SubmenuProps {
    item: NavigationItem;
    sidebarCollapsed: boolean;
    isActive: (href: string) => boolean;
}

const Submenu: React.FC<SubmenuProps> = ({ item, sidebarCollapsed, isActive }) => {
    // Usamos el estado local para manejar la apertura/cierre del submenú
    // Se inicializa abierto si la ruta actual es parte del submenú
    const isSubmenuActive = isActive(item.href);
    const [isOpen, setIsOpen] = useState(isSubmenuActive);

    useEffect(() => {
        // Asegura que el submenú se abra automáticamente si la ruta actual es activa (útil en la carga inicial)
        if (isSubmenuActive) {
            setIsOpen(true);
        }
    }, [isSubmenuActive]);
    
    // Si el sidebar está colapsado, el submenú se oculta y no se puede abrir/cerrar.
    if (sidebarCollapsed) return null;

    return (
        <div className="flex flex-col space-y-1 mt-1">
            {/* El botón principal de Documentos/Recruitment es un toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center space-x-3 px-3 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left ${isSubmenuActive ? 'bg-slate-100 font-semibold' : ''}`}
            >
                <item.icon className={`w-5 h-5 text-emerald-500 flex-shrink-0`} />
                <span className="flex-grow font-medium">{item.label}</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {/* Lista de Submenú */}
            {isOpen && (
                <div className="flex flex-col pl-6 space-y-1 border-l border-slate-200 ml-5">
                    {item.submenu?.map(subItem => (
                        <ActiveLink
                            key={subItem.href}
                            href={subItem.href}
                            // Usamos una clase de ActiveLink más sutil para los submenús
                            className="flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors w-full"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-3 flex-shrink-0"></span>
                            <span>{subItem.label}</span>
                        </ActiveLink>
                    ))}
                </div>
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
  // Use the mocked useRouter
  const router = useRouter(); 
  // FIX: usar usePathname para obtener la ruta actual (pathname)
  const pathname = usePathname();
  
  const [session, setSession] = useState<SessionData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false); 
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 
  const [notificationCount] = useState(3);
  
  // Estado para submenú móvil (Documentos)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null); 
  
  // Refs para cerrar menús al hacer clic fuera
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null); 
  
  const config = useMemo(() => 
    userRole === 'public' 
      ? publicConfig 
      : roleConfigs[userRole as UserRole]
  , [userRole]);

  const IconComponent = config.icon;

  // Lógica para determinar si una ruta es activa (necesario para el sidebar y submenú)
  const isLinkActive = useCallback((href: string) => {
    // FIX: Usar 'pathname' en lugar de 'router.pathname'
    const currentPath = pathname; 
    
    // Si la ruta del link es un prefijo de la ruta actual, se considera activo (para Documentos/Reclutamiento)
    if (currentPath.startsWith(href)) {
        return true;
    }
    return false;
  }, [pathname]); // FIX: La dependencia es 'pathname'


  // Lógica de carga de sesión y manejo de clics fuera
  useEffect(() => {
    if (userRole !== 'public') {
      const sessionData = localStorage.getItem('auth_session');
      if (sessionData) {
        const parsedSession = JSON.parse(sessionData);
        // Validación mejorada para prevenir errores si el rol no existe
        if (roleConfigs[parsedSession.role as UserRole]) {
          setSession(parsedSession);
        }
      } else {
         // Simular una sesión si no existe para la demostración del sidebar
         setSession({
            userId: '1',
            email: 'user@example.com',
            name: 'Nombre Usuario',
            role: userRole as UserRole,
            avatar: undefined
         });
      }
    }
    
    const handleOutsideClick = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
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
  const headerClass = isFixed 
    ? (isVolunteer ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm' : 'nav-header')
    : 'relative bg-white border-b border-slate-200/60 shadow-sm'; // Clase para relativo si isFixed=false
    
  const titleClass = isVolunteer ? 'text-slate-800' : 'text-gradient';
  const subtitleClass = isVolunteer ? 'text-slate-500' : 'text-muted';

  // Degradado para el icono principal del logo (basado en el rol, pero blanco o esmeralda)
  const mainIconClass = isVolunteer ? 'text-white' : 'text-emerald-500';
  
  // **LÓGICA ACTUALIZADA: Seleccionar el degradado del Avatar basado en el rol**
  const avatarGradientClass = AVATAR_GRADIENTS[userRole as UserRole] || 'from-slate-400 to-slate-500';

  return (
    <>
      {/* Header Superior */}
      <header className={`${isFixed ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 ${headerClass} px-4 md:px-6 py-3 h-16 transition-all duration-300`}>
        {/* Este contenedor ocupa el 100% del ancho y alinea el contenido a los extremos */}
        <div className="flex items-center justify-between h-full w-full"> 
          
          {/* 1. SECCIÓN IZQUIERDA: Colapsar Sidebar y Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>

            <a href={`/${userRole}/dashboard`} className="flex items-center space-x-3">
              <div className={`w-9 h-9 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${mainIconClass}`} />
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

          {/* 2. ESPACIO CENTRAL (VACÍO) */}
          <div className="flex-grow">
            {/* Permite que las secciones laterales se separen a los extremos. */}
          </div>


          {/* 3. SECCIÓN DERECHA: Acciones del usuario (Notificaciones y Menú de Usuario) */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            
            {/* Notificaciones */}
            <div className="relative" ref={notifMenuRef}>
              <button
                onClick={() => {
                    setShowNotifications(prev => !prev);
                    setShowUserMenu(false); 
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

            {/* Menú de usuario (Dropdown pegado a la derecha) */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                    setShowUserMenu(prev => !prev);
                    setShowNotifications(false); 
                }}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Menú de usuario"
              >
                {/* Avatar */}
                {/* APLICACIÓN DEL COLOR DEL AVATAR BASADO EN EL ROL */}
                <div className={`w-8 h-8 bg-gradient-to-br ${avatarGradientClass} rounded-full flex items-center justify-center flex-shrink-0`}>
                  {session?.avatar ? (
                    <>
                      {console.log('session.avatar:', session.avatar)}
                      <Image src={session.avatar} alt={session.name} width={32} height={32} className="rounded-full object-cover" />
                    </>
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
                      {/* Corregido: Usar text-emerald-500 */}
                      <User className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium">Mi Perfil</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/${userRole}/settings`);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
                    >
                      {/* Corregido: Usar text-emerald-500 */}
                      <Settings className="w-4 h-4 text-emerald-500" />
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
                }}
                className="lg:hidden p-2 ml-2 text-slate-600 hover:bg-slate-100 transition-colors rounded-lg"
                aria-label="Menú de Navegación"
            >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* --- SIDEBAR IZQUIERDO (Desktop) --- */}
      <aside 
        ref={sidebarRef}
        className={`hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 shadow-sm transition-all duration-300 z-40 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <nav className="flex flex-col h-full p-3 space-y-1 overflow-y-auto">
          {config.navigation.map((item) => {
            // Si el ítem tiene submenú y el sidebar NO está colapsado, renderiza el componente Submenu
            if (item.submenu && item.submenu.length > 0 && !sidebarCollapsed) {
                return (
                    <Submenu 
                        key={item.href} 
                        item={item} 
                        sidebarCollapsed={sidebarCollapsed}
                        isActive={isLinkActive}
                    />
                );
            }
            
            // Si el ítem NO tiene submenú, o si el sidebar está colapsado, renderiza el ActiveLink normal
            return (
                <ActiveLink 
                  key={item.href} 
                  href={item.href} 
                  className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-3 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors group`}
                  // Si tiene submenú pero está colapsado, debe ser un link simple
                  onClick={item.submenu && sidebarCollapsed ? undefined : undefined}
                >
                  <item.icon className={`w-5 h-5 text-emerald-500 ${sidebarCollapsed ? '' : 'flex-shrink-0'}`} />
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  {sidebarCollapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {item.label}
                    </span>
                  )}
                </ActiveLink>
            );
          })}
        </nav>
      </aside>
      
      {/* Navegación Móvil para usuarios autenticados (REFRACTORIZADO PARA SUBMENÚ) */}
      {showMobileMenu && (
        <nav className="lg:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-sm p-4 border-t border-slate-200 z-40 overflow-y-auto animate-in slide-in-from-top-1 duration-300">
            <div className="space-y-2">
                {config.navigation.map((item) => {
                    const hasSubmenu = item.submenu && item.submenu.length > 0;
                    const isSubmenuOpen = mobileSubmenuOpen === item.href;

                    if (hasSubmenu) {
                        return (
                            <div key={item.href}>
                                <button
                                    onClick={() => setMobileSubmenuOpen(isSubmenuOpen ? null : item.href)}
                                    className={`flex items-center space-x-3 p-3 text-base text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full justify-between ${isLinkActive(item.href) ? 'bg-slate-100 font-semibold' : ''}`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon className="w-5 h-5 text-emerald-500" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                                </button>
                                {isSubmenuOpen && (
                                    <div className="flex flex-col pl-4 mt-1 space-y-1">
                                        {item.submenu?.map(subItem => (
                                            <ActiveLink 
                                                key={subItem.href} 
                                                href={subItem.href} 
                                                className="flex items-center p-3 pl-8 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors w-full"
                                                onClick={() => setShowMobileMenu(false)} // Cierra el menú al hacer clic
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-3 flex-shrink-0"></span>
                                                <span>{subItem.label}</span>
                                            </ActiveLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    // Enlaces sin submenú
                    return (
                        <ActiveLink 
                            key={item.href} 
                            href={item.href} 
                            className="flex items-center space-x-3 p-3 text-base text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full"
                            onClick={() => setShowMobileMenu(false)} // Cierra el menú al hacer clic
                        >
                            <item.icon className="w-5 h-5 text-emerald-500" />
                            <span className="font-medium">{item.label}</span>
                        </ActiveLink>
                    );
                })}
            </div>
            <hr className="my-4 border-slate-100" />
            <div className="flex flex-col space-y-2">
                <button
                    onClick={() => { handleProfileClick(); setShowMobileMenu(false); }}
                    className="flex items-center space-x-3 p-3 text-base text-slate-700 hover:bg-slate-100 rounded-lg transition-colors w-full text-left"
                >
                    <User className="w-5 h-5 text-emerald-500" />
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

      {/* Spacers: para headers fijos Y para el sidebar (Desktop) */}
      {isFixed && <div className="h-16"></div>}
      {/* Espaciador del contenido principal, movido fuera del div fixed/relative, idealmente en el Layout */}
      <div className={`hidden lg:block ${sidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 flex-shrink-0`}></div>
    </>
  );
}