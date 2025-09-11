// Main authentication service - Backend ready
// TODO: When backend is implemented, this service will handle real API calls
// Currently uses mock data but structured for easy backend migration

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
import { AuthAPI, TokenManager } from './api';
import { generateMockJWT, parseJWT, isJWTValid, createSessionFromJWT } from './jwt';

// Session management
class SessionManager {
  private static readonly SESSION_KEY = 'metrics_hub_session';

  // Store session in localStorage
  static setSession(session: AuthSession): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  // Get current session
  static getSession(): AuthSession | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session: AuthSession = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date(session.expiresAt).getTime() < Date.now()) {
        this.clearSession();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Session parsing error:', error);
      this.clearSession();
      return null;
    }
  }

  // Clear session
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
    TokenManager.clearTokens();
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const session = this.getSession();
    return session !== null && isJWTValid(session.token);
  }
}

// Main authentication service
export class AuthService {
  // Login user
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      // TODO: Replace with real API call when backend is implemented
      const response = await AuthAPI.login(credentials);

      if (response.success && response.session) {
        // Store session and tokens
        SessionManager.setSession(response.session);
        TokenManager.setTokens(response.session.token, response.session.refreshToken);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      // TODO: Replace with real API call when backend is implemented
      const response = await AuthAPI.register(userData);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  // Complete two-factor authentication
  static async completeTwoFactor(request: TwoFactorRequest): Promise<TwoFactorResponse> {
    try {
      // TODO: Replace with real API call when backend is implemented
      const response = await AuthAPI.completeTwoFactor(request);

      if (response.success && response.session) {
        // Store session and tokens
        SessionManager.setSession(response.session);
        TokenManager.setTokens(response.session.token, response.session.refreshToken);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Two-factor authentication failed'
      };
    }
  }

  // Request password reset
  static async requestPasswordReset(request: PasswordResetRequest): Promise<PasswordResetResponse> {
    try {
      // TODO: Replace with real API call when backend is implemented
      const response = await AuthAPI.requestPasswordReset(request);
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password reset failed'
      };
    }
  }

  // Logout user
  static async logout(): Promise<void> {
    try {
      // TODO: Call backend logout endpoint when implemented
      // await AuthAPI.logout();
      
      // Clear local session and tokens
      SessionManager.clearSession();
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local session even if backend call fails
      SessionManager.clearSession();
    }
  }

  // Get current user session
  static getCurrentSession(): AuthSession | null {
    return SessionManager.getSession();
  }

  // Get current user
  static getCurrentUser(): User | null {
    const session = SessionManager.getSession();
    if (!session) return null;

    // TODO: When backend is implemented, fetch full user data from API
    // For now, return basic user info from session
    return {
      id: session.userId,
      email: session.email,
      name: session.name,
      role: session.role,
      avatar: session.avatar,
      emailVerified: true, // TODO: Get from backend
      twoFactorEnabled: false, // TODO: Get from backend
      status: 'active', // TODO: Get from backend
      created_at: new Date().toISOString(), // TODO: Get from backend
      updated_at: new Date().toISOString(), // TODO: Get from backend
      ssoLinked: false,
      demoPassword: 'demo123',
      password: 'demo123',
      email_verified: 1
    };
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return SessionManager.isAuthenticated();
  }

  // Check if user has specific role
  static hasRole(role: UserRole): boolean {
    const session = SessionManager.getSession();
    return session?.role === role;
  }

  // Check if user has any of the specified roles
  static hasAnyRole(roles: UserRole[]): boolean {
    const session = SessionManager.getSession();
    return session ? roles.includes(session.role) : false;
  }

  // Check if user is admin
  static isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Check if user is HR
  static isHR(): boolean {
    return this.hasAnyRole(['admin', 'hr']);
  }

  // Check if user is Lead Project Manager
  static isLeadProject(): boolean {
    return this.hasRole('lead_project');
  }

  // Check if user is Volunteer
  static isVolunteer(): boolean {
    return this.hasRole('volunteer');
  }

  // Get redirect path based on user role
  static getRedirectPath(role: UserRole): string {
    const redirects: Record<UserRole, string> = {
      admin: '/admin/dashboard',
      hr: '/hr/dashboard',
      lead_project: '/project-manager/dashboard',
      volunteer: '/volunteer-portal/dashboard',
      unassigned: '/volunteer-portal/dashboard'
    };

    return redirects[role] || '/login';
  }

  // Refresh authentication token
  static async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) return false;

      // TODO: Replace with real API call when backend is implemented
      const response = await AuthAPI.refreshToken({ refreshToken });

      if (response.success && response.token) {
        const session = SessionManager.getSession();
        if (session) {
          // Update session with new token
          const updatedSession: AuthSession = {
            ...session,
            token: response.token,
            refreshToken: response.refreshToken || session.refreshToken,
            expiresAt: response.expiresAt ? new Date(response.expiresAt).toISOString() : session.expiresAt
          };

          SessionManager.setSession(updatedSession);
          TokenManager.setTokens(response.token, response.refreshToken);
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  // Check and refresh token if needed
  static async checkAndRefreshToken(): Promise<boolean> {
    const session = SessionManager.getSession();
    if (!session) return false;

    // Check if token is close to expiring (less than 30 minutes)
    const timeUntilExpiry = new Date(session.expiresAt).getTime() - Date.now();
    const thirtyMinutes = 30 * 60 * 1000;

    if (timeUntilExpiry < thirtyMinutes) {
      return await this.refreshToken();
    }

    return true;
  }

  // Validate JWT token
  static validateToken(token: string): boolean {
    return isJWTValid(token);
  }

  // Get token payload
  static getTokenPayload(token: string) {
    return parseJWT(token);
  }
}

// Export convenience functions for backward compatibility
export const loginAction = AuthService.login;
export const registerAction = AuthService.register;
export const completeTwoFactorAction = AuthService.completeTwoFactor;
export const forgotPasswordAction = AuthService.requestPasswordReset;
export const logoutAction = AuthService.logout;
export const getCurrentUserSession = AuthService.getCurrentSession;
export const getCurrentUser = AuthService.getCurrentUser;
export const isAuthenticated = AuthService.isAuthenticated;
export const isAdmin = AuthService.isAdmin;
export const isHR = AuthService.isHR;
export const isLeadProject = AuthService.isLeadProject;
export const isVolunteer = AuthService.isVolunteer;
export const getRedirectPath = AuthService.getRedirectPath;
