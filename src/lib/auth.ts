// src/lib/auth.ts - Updated to use mock authentication system
import { User } from './types';
import { 
  getCurrentUserSession, 
  getCurrentUser, 
  isAuthenticated as mockIsAuthenticated,
  logoutAction as mockLogout,
  getRedirectPath as mockGetRedirectPath
} from './auth/authActions';

const AUTH_KEY = 'metrics_hub_session';

// Configuración de redirección por roles - rutas específicas por role
const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  hr: '/hr/dashboard', 
  lead_project: '/project-manager/dashboard',
  volunteer: '/volunteer-portal/dashboard',
  unassigned: '/volunteer-portal/dashboard'
} as const;

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: User['role'];
  avatar?: string;
  loginTime: string;
  expiresAt?: string;
  lastActivity?: string;
}

/**
 * Establece la sesión de autenticación en localStorage
 * @deprecated Use mock authentication system instead
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
 * @deprecated Use getCurrentUserSession from mockActions instead
 */
export function getAuthSession(): AuthSession | null {
  return getCurrentUserSession();
}

/**
 * Elimina la sesión de autenticación
 * @deprecated Use logoutAction from mockActions instead
 */
export async function clearAuthSession(): Promise<void> {
  await mockLogout();
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return mockIsAuthenticated();
}

/**
 * Obtiene la ruta de redirección apropiada según el rol del usuario
 */
export function getRedirectPath(role: User['role']): string {
  return mockGetRedirectPath(role);
}

/**
 * Obtiene el rol del usuario actual
 */
export function getCurrentUserRole(): User['role'] | null {
  const session = getCurrentUserSession();
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

  const session = getCurrentUserSession();
  
  return {
    user: session,
    isAuthenticated: !!session,
    logout: async () => {
      await mockLogout();
      window.location.href = '/login';
    }
  };
}

/**
 * Hook para proteger páginas públicas (redirige si ya está autenticado)
 */
export function useGuestGuard() {
  if (typeof window === 'undefined') return;

  const session = getCurrentUserSession();
  
  if (session) {
    window.location.href = getRedirectPath(session.role);
  }
}