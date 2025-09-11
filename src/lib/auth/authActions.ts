// Authentication actions - Backend ready
// TODO: When backend is implemented, replace mock implementations with real API calls
'use client';

import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  TwoFactorRequest,
  TwoFactorResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  User,
  AuthSession,
  UserRole
} from './types';
import { AuthService } from './authService';

// Re-export types for backward compatibility
export type MockUser = User;
export type { AuthSession, SecurityAlert, DemoControls, AuthExportData } from './types';

// Import mock functions for backward compatibility (TODO: Remove when backend is implemented)
import { 
  simulateNetworkDelay,
  updateUser,
  getAllUsers,
  getUserById,
  getAuditLog,
  getSecurityAlerts,
  acknowledgeAlert,
  updateDemoControls,
  getDemoControls,
  exportAuthData,
  importAuthData,
  resetToSeedData,
  clearAllData,
  hasPermission,
  checkPermission
} from './authStore';

// Result types
export interface AuthResult {
  success: boolean;
  error?: string;
  user?: MockUser;
  session?: AuthSession;
  redirectPath?: string;
}

export interface LoginResult extends AuthResult {
  requiresTwoFactor?: boolean;
}

export type RegisterResult = AuthResult;

export interface TwoFactorResult {
  success: boolean;
  error?: string;
}

export interface PasswordResetResult {
  success: boolean;
  error?: string;
  newPassword?: string;
}

export interface PermissionResult {
  allowed: boolean;
  reason?: string;
}

// Role redirect paths
const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  hr: '/hr/dashboard',
  lead_project: '/project-manager/dashboard',
  volunteer: '/volunteer-portal/dashboard',
  unassigned: '/volunteer-portal/dashboard'
} as const;

// Authentication actions - Backend ready
export async function loginAction(email: string, password: string): Promise<LoginResult> {
  try {
    // TODO: When backend is implemented, this will use real API calls
    const request: LoginRequest = { email, password };
    const response = await AuthService.login(request);
    
    return {
      success: response.success,
      user: response.user,
      session: response.session,
      requiresTwoFactor: response.requiresTwoFactor,
      error: response.error,
      redirectPath: response.redirectPath
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    };
  }
}

export async function completeTwoFactorAction(userId: string, code: string): Promise<AuthResult> {
  try {
    // TODO: When backend is implemented, this will use real API calls
    const request: TwoFactorRequest = { userId, code };
    const response = await AuthService.completeTwoFactor(request);
    
    return {
      success: response.success,
      user: response.session ? {
        id: response.session.userId,
        email: response.session.email,
        name: response.session.name,
        role: response.session.role,
        avatar: response.session.avatar,
        emailVerified: true,
        twoFactorEnabled: true,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ssoLinked: false,
        demoPassword: 'demo123',
        password: 'demo123',
        email_verified: 1
      } : undefined,
      session: response.session,
      redirectPath: response.session ? AuthService.getRedirectPath(response.session.role) : undefined,
      error: response.error
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Two-factor authentication failed'
    };
  }
}

export async function registerAction(userData: {
  email: string;
  name: string;
  password: string;
}): Promise<RegisterResult> {
  try {
    // TODO: When backend is implemented, this will use real API calls
    const request: RegisterRequest = {
      email: userData.email,
      name: userData.name,
      password: userData.password
    };
    const response = await AuthService.register(request);
    
    return {
      success: response.success,
      user: response.user,
      error: response.error
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    };
  }
}

export async function logoutAction(): Promise<void> {
  try {
    // TODO: When backend is implemented, this will call real logout API
    await AuthService.logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
}

export async function forgotPasswordAction(email: string): Promise<PasswordResetResult> {
  try {
    // TODO: When backend is implemented, this will use real API calls
    const request: PasswordResetRequest = { email };
    const response = await AuthService.requestPasswordReset(request);
    
    return {
      success: response.success,
      error: response.error,
      newPassword: response.success ? 'demo123' : undefined // TODO: Remove demo password when backend is implemented
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Password reset failed'
    };
  }
}

// Session management - Backend ready
export function getCurrentUser(): MockUser | null {
  // TODO: When backend is implemented, this will fetch full user data from API
  return AuthService.getCurrentUser();
}

export function getCurrentUserSession(): AuthSession | null {
  return AuthService.getCurrentSession();
}

export function isAuthenticated(): boolean {
  return AuthService.isAuthenticated();
}

// Permission checking
export function checkUserPermission(action: string, resource?: string): PermissionResult {
  const session = AuthService.getCurrentSession();
  if (!session) {
    return { allowed: false, reason: 'Not authenticated' };
  }
  
  return checkPermission(session.userId, action, resource);
}

export function userHasPermission(action: string): boolean {
  const session = AuthService.getCurrentSession();
  if (!session) return false;
  
  return hasPermission(session.userId, action);
}

// Role checking helpers
export function isAdmin(): boolean {
  return AuthService.isAdmin();
}

export function isHR(): boolean {
  return AuthService.isHR();
}

export function isLeadProject(): boolean {
  return AuthService.isLeadProject();
}

export function isVolunteer(): boolean {
  return AuthService.isVolunteer();
}

export function isUnassigned(): boolean {
  return AuthService.hasRole('unassigned');
}

// User management actions
export async function updateUserAction(userId: string, updates: Partial<User>): Promise<AuthResult> {
  try {
    await simulateNetworkDelay();
    
    const updateResult = updateUser(userId, updates as any);
    
    if (!updateResult.success || !updateResult.user) {
      return {
        success: false,
        error: updateResult.error || 'Update failed'
      };
    }
    
    return {
      success: true,
      user: updateResult.user as unknown as User
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'An unexpected error occurred'
    };
  }
}

export async function getAllUsersAction(): Promise<User[]> {
  try {
    await simulateNetworkDelay();
    return getAllUsers() as unknown as User[];
  } catch (error) {
    console.error('Get users error:', error);
    return [];
  }
}

export async function getUserByIdAction(userId: string): Promise<User | null> {
  try {
    await simulateNetworkDelay();
    return getUserById(userId) as unknown as User || null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

// Audit and security
export async function getAuditLogAction(limit: number = 100): Promise<any[]> {
  try {
    await simulateNetworkDelay();
    return getAuditLog(limit);
  } catch (error) {
    console.error('Get audit log error:', error);
    return [];
  }
}

export async function getSecurityAlertsAction(): Promise<any[]> {
  try {
    await simulateNetworkDelay();
    return getSecurityAlerts();
  } catch (error) {
    console.error('Get security alerts error:', error);
    return [];
  }
}

export async function acknowledgeAlertAction(alertId: string): Promise<void> {
  try {
    await simulateNetworkDelay();
    acknowledgeAlert(alertId);
  } catch (error) {
    console.error('Acknowledge alert error:', error);
  }
}

// Demo controls
export async function updateDemoControlsAction(updates: Partial<any>): Promise<void> {
  try {
    await simulateNetworkDelay();
    updateDemoControls(updates);
  } catch (error) {
    console.error('Update demo controls error:', error);
  }
}

export function getDemoControlsAction(): any {
  return getDemoControls();
}

// Data management
export async function exportAuthDataAction(): Promise<any> {
  try {
    await simulateNetworkDelay();
    return exportAuthData();
  } catch (error) {
    console.error('Export data error:', error);
    throw error;
  }
}

export async function importAuthDataAction(data: any): Promise<{ success: boolean; error?: string }> {
  try {
    await simulateNetworkDelay();
    return importAuthData(data);
  } catch (error) {
    return {
      success: false,
      error: 'Import failed'
    };
  }
}

export async function resetToSeedDataAction(): Promise<void> {
  try {
    await simulateNetworkDelay();
    resetToSeedData();
  } catch (error) {
    console.error('Reset data error:', error);
  }
}

export async function clearAllDataAction(): Promise<void> {
  try {
    await simulateNetworkDelay();
    clearAllData();
  } catch (error) {
    console.error('Clear data error:', error);
  }
}

// Route protection helpers
export function getRedirectPath(role: string): string {
  return AuthService.getRedirectPath(role as UserRole);
}

export function canAccessRoute(path: string): { allowed: boolean; reason?: string; redirectTo?: string } {
  const session = AuthService.getCurrentSession();
  
  if (!session) {
    return { 
      allowed: false, 
      reason: 'Not authenticated', 
      redirectTo: '/login' 
    };
  }
  
  // Check route-specific permissions
  const routePermissions = {
    '/admin/auth-settings': ['admin'],
    '/admin/session-management': ['admin'],
    '/admin/audit-logs': ['admin'],
    '/admin/global-settings': ['admin'],
    '/admin/integrations': ['admin'],
    '/hr/auth-settings': ['admin', 'hr'],
    '/hr/regional-settings': ['admin', 'hr'],
    '/hr/templates': ['admin', 'hr'],
    '/hr/notifications': ['admin', 'hr'],
    '/lead/templates': ['admin', 'hr', 'lead_project'],
    '/volunteer/personal-settings': ['admin', 'hr', 'lead_project', 'volunteer'],
    '/two-factor-setup': ['authenticated'],
    '/sso-connection': ['authenticated']
  };
  
  const requiredRoles = routePermissions[path as keyof typeof routePermissions];
  
  if (requiredRoles) {
    if (requiredRoles.includes('authenticated')) {
      return { allowed: true };
    }
    
    if (!requiredRoles.includes(session.role)) {
      return { 
        allowed: false, 
        reason: 'Insufficient permissions', 
        redirectTo: AuthService.getRedirectPath(session.role) 
      };
    }
  }
  
  return { allowed: true };
}

// Utility functions for forms
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateTwoFactorCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}
