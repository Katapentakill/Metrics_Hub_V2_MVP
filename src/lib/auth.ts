// src/lib/auth.ts
import { User } from './types';

const AUTH_KEY = 'auth_session';

// Configuración de redirección por roles - rutas específicas por role
const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  hr: '/hr/dashboard', 
  lead_project: '/lead_project/projects',
  volunteer: '/volunteer/profile',
  unassigned: '/volunteer/profile'
} as const;

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: User['role'];
  avatar?: string;
  loginTime: string;
}

/**
 * Establece la sesión de autenticación en localStorage
 */
export function setAuthSession(user: User): void {
  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    loginTime: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }
}

/**
 * Obtiene la sesión actual del usuario
 */
export function getAuthSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionData = localStorage.getItem(AUTH_KEY);
    if (!sessionData) return null;
    
    return JSON.parse(sessionData) as AuthSession;
  } catch {
    return null;
  }
}

/**
 * Elimina la sesión de autenticación
 */
export function clearAuthSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return getAuthSession() !== null;
}

/**
 * Obtiene la ruta de redirección apropiada según el rol del usuario
 */
export function getRedirectPath(role: User['role']): string {
  return ROLE_REDIRECTS[role];
}

/**
 * Obtiene el rol del usuario actual
 */
export function getCurrentUserRole(): User['role'] | null {
  const session = getAuthSession();
  return session?.role || null;
}

/**
 * Verifica si el usuario tiene un rol específico
 */
export function hasRole(role: User['role']): boolean {
  const currentRole = getCurrentUserRole();
  return currentRole === role;
}

/**
 * Helper para verificar permisos de admin
 */
export function isAdmin(): boolean {
  return hasRole('admin');
}

/**
 * Helper para verificar permisos de HR
 */
export function isHR(): boolean {
  return hasRole('hr');
}

/**
 * Helper para verificar permisos de Lead Project
 */
export function isLeadProject(): boolean {
  return hasRole('lead_project');
}

/**
 * Helper para verificar permisos de Volunteer
 */
export function isVolunteer(): boolean {
  return hasRole('volunteer');
}

/**
 * Hook personalizado para usar en componentes de cliente
 */
export function useAuth() {
  if (typeof window === 'undefined') {
    return {
      user: null,
      isAuthenticated: false,
      logout: () => {}
    };
  }

  const session = getAuthSession();
  
  return {
    user: session,
    isAuthenticated: !!session,
    logout: () => {
      clearAuthSession();
      window.location.href = '/login';
    }
  };
}

/**
 * Hook para proteger páginas públicas (redirige si ya está autenticado)
 */
export function useGuestGuard() {
  if (typeof window === 'undefined') return;

  const session = getAuthSession();
  
  if (session) {
    window.location.href = getRedirectPath(session.role);
  }
}