// Route protection middleware for mock authentication system
'use client';

import { getCurrentUserSession, canAccessRoute, userHasPermission } from './authActions';
import { ROUTE_PROTECTION } from './authData';

export interface RouteProtectionResult {
  allowed: boolean;
  reason?: string;
  redirectTo?: string;
  message?: string;
}

/**
 * Check if current user can access a specific route
 */
export function checkRouteAccess(path: string): RouteProtectionResult {
  const session = getCurrentUserSession();
  
  if (!session) {
    return {
      allowed: false,
      reason: 'Not authenticated',
      redirectTo: '/login',
      message: 'Please sign in to access this page'
    };
  }
  
  // Check route-specific permissions
  const routeConfig = ROUTE_PROTECTION[path as keyof typeof ROUTE_PROTECTION];
  
  if (routeConfig) {
    const { roles, message } = routeConfig;
    
    if (roles.includes('authenticated')) {
      return { allowed: true };
    }
    
    if (!roles.includes(session.role)) {
      return {
        allowed: false,
        reason: 'Insufficient permissions',
        redirectTo: getRedirectPath(session.role),
        message: message || 'Insufficient permissions'
      };
    }
  }
  
  return { allowed: true };
}

/**
 * Get redirect path based on user role
 */
export function getRedirectPath(role: string): string {
  const redirects = {
    admin: '/admin/dashboard',
    hr: '/hr/dashboard',
    lead_project: '/project-manager/dashboard',
    volunteer: '/volunteer-portal/dashboard',
    unassigned: '/volunteer-portal/dashboard'
  };
  
  return redirects[role as keyof typeof redirects] || '/login';
}

/**
 * Check if user has specific role
 */
export function hasRole(role: string): boolean {
  const session = getCurrentUserSession();
  return session?.role === role;
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(roles: string[]): boolean {
  const session = getCurrentUserSession();
  return session ? roles.includes(session.role) : false;
}

/**
 * Check if user is admin
 */
export function isAdmin(): boolean {
  return hasRole('admin');
}

/**
 * Check if user is HR (including Senior HR)
 */
export function isHR(): boolean {
  return hasAnyRole(['admin', 'hr']);
}

/**
 * Check if user is Lead Project Manager
 */
export function isLeadProject(): boolean {
  return hasRole('lead_project');
}

/**
 * Check if user is Volunteer
 */
export function isVolunteer(): boolean {
  return hasRole('volunteer');
}

/**
 * Check if user is unassigned
 */
export function isUnassigned(): boolean {
  return hasRole('unassigned');
}

/**
 * Get current user role
 */
export function getCurrentRole(): string | null {
  const session = getCurrentUserSession();
  return session?.role || null;
}

/**
 * Get current user info
 */
export function getCurrentUserInfo() {
  const session = getCurrentUserSession();
  return session ? {
    id: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
    avatar: session.avatar
  } : null;
}

/**
 * Route protection hook for React components
 */
export function useRouteProtection(path: string) {
  const protection = checkRouteAccess(path);
  
  return {
    ...protection,
    isAuthenticated: !!getCurrentUserSession(),
    currentUser: getCurrentUserInfo(),
    currentRole: getCurrentRole()
  };
}

/**
 * Redirect if not authorized
 */
export function redirectIfUnauthorized(path: string): void {
  const protection = checkRouteAccess(path);
  
  if (!protection.allowed && protection.redirectTo) {
    window.location.href = protection.redirectTo;
  }
}

/**
 * Show error message if not authorized
 */
export function getAuthorizationMessage(path: string): string | null {
  const protection = checkRouteAccess(path);
  return protection.allowed ? null : (protection.message || 'Access denied');
}

/**
 * Check if user can perform specific action
 */
export function canPerformAction(action: string, resource?: string): boolean {
  const session = getCurrentUserSession();
  if (!session) return false;
  
  return userHasPermission(action);
}

/**
 * Get user permissions for UI display
 */
export function getUserPermissions() {
  const session = getCurrentUserSession();
  if (!session) return [];
  
  const permissions = {
    admin: [
      'invite_user', 'reset_password_others', 'set_role_others', 'enforce_2fa_others',
      'view_auth_audit', 'export_auth_audit', 'configure_sso', 'rotate_tokens',
      'manage_sessions_others', 'change_global_settings', 'change_regional_settings',
      'edit_regional_templates', 'edit_project_templates', 'edit_personal_settings'
    ],
    hr: [
      'invite_user', 'reset_password_others', 'enforce_2fa_others',
      'change_regional_settings', 'edit_regional_templates', 'edit_project_templates',
      'edit_personal_settings'
    ],
    lead_project: [
      'edit_project_templates', 'edit_personal_settings'
    ],
    volunteer: [
      'edit_personal_settings'
    ],
    unassigned: []
  };
  
  return permissions[session.role as keyof typeof permissions] || [];
}

/**
 * Check if current route requires authentication
 */
export function requiresAuthentication(path: string): boolean {
  const publicRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/',
    '/about',
    '/contact'
  ];
  
  return !publicRoutes.includes(path);
}

/**
 * Check if current route is admin-only
 */
export function isAdminRoute(path: string): boolean {
  return path.startsWith('/admin');
}

/**
 * Check if current route is HR-only
 */
export function isHRRoute(path: string): boolean {
  return path.startsWith('/hr') || path.startsWith('/admin');
}

/**
 * Check if current route is Lead-only
 */
export function isLeadRoute(path: string): boolean {
  return path.startsWith('/lead') || path.startsWith('/hr') || path.startsWith('/admin');
}

/**
 * Get appropriate dashboard path for current user
 */
export function getDashboardPath(): string {
  const role = getCurrentRole();
  return getRedirectPath(role || 'unassigned');
}

/**
 * Check if user should be redirected to dashboard
 */
export function shouldRedirectToDashboard(path: string): boolean {
  const session = getCurrentUserSession();
  if (!session) return false;
  
  const dashboardPath = getDashboardPath();
  return path === '/' || path === '/login' || path === '/register';
}

/**
 * Get redirect URL after login
 */
export function getPostLoginRedirect(): string {
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  
  if (redirect && redirect.startsWith('/')) {
    return redirect;
  }
  
  return getDashboardPath();
}
