// API abstraction layer for authentication
// TODO: When backend is implemented, replace mock implementations with real API calls
// This layer makes it easy to switch from mock to real backend

import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse,
  TwoFactorRequest,
  TwoFactorResponse,
  PasswordResetRequest,
  PasswordResetResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
  AuthSession,
  ApiResponse
} from './types';

// API Configuration
// TODO: Update these URLs when backend is implemented
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    twoFactor: '/auth/2fa',
    passwordReset: '/auth/password-reset',
    refreshToken: '/auth/refresh',
    profile: '/auth/profile',
    users: '/users',
    audit: '/audit',
    alerts: '/security/alerts'
  },
  timeout: 10000, // 10 seconds
  retryAttempts: 3
};

// Mock delay simulation (remove when backend is implemented)
async function simulateNetworkDelay(): Promise<void> {
  const delay = Math.random() * 1000 + 500; // 500-1500ms
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Generic API call wrapper
// TODO: Replace with real HTTP client (axios, fetch, etc.)
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    // Simulate network delay for demo
    await simulateNetworkDelay();
    
    // TODO: Replace with real API call
    // const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`, {
    //   ...options,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     ...options.headers
    //   }
    // });
    
    // For now, return mock success
    return {
      success: true,
      data: {} as T
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Authentication API calls
export class AuthAPI {
  // Login user
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    // TODO: Replace with real API call
    // const response = await apiCall<LoginResponse>(API_CONFIG.endpoints.login, {
    //   method: 'POST',
    //   body: JSON.stringify(credentials)
    // });
    
    // Mock implementation - replace with real API call
    const mockResponse: LoginResponse = {
      success: true,
      user: {
        id: '1',
        email: credentials.email,
        name: 'Mock User',
        role: 'admin',
        emailVerified: true,
        twoFactorEnabled: false,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ssoLinked: false,
        demoPassword: 'demo123',
        password: 'demo123',
        email_verified: 1
      },
      session: {
        userId: '1',
        email: credentials.email,
        name: 'Mock User',
        role: 'admin',
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString(),
        createdAt: Date.now(),
        loginTime: new Date().toISOString()
      }
    };
    
    return mockResponse;
  }

  // Register new user
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    // TODO: Replace with real API call
    // const response = await apiCall<RegisterResponse>(API_CONFIG.endpoints.register, {
    //   method: 'POST',
    //   body: JSON.stringify(userData)
    // });
    
    // Mock implementation
    return {
      success: true,
      user: {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: 'unassigned',
        emailVerified: false,
        twoFactorEnabled: false,
        status: 'inactive',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ssoLinked: false,
        demoPassword: 'demo123',
        password: 'demo123',
        email_verified: 1
      },
      requiresEmailVerification: true
    };
  }

  // Complete two-factor authentication
  static async completeTwoFactor(request: TwoFactorRequest): Promise<TwoFactorResponse> {
    // TODO: Replace with real API call
    // const response = await apiCall<TwoFactorResponse>(API_CONFIG.endpoints.twoFactor, {
    //   method: 'POST',
    //   body: JSON.stringify(request)
    // });
    
    // Mock implementation
    return {
      success: true,
      session: {
        userId: request.userId,
        email: 'user@example.com',
        name: 'Mock User',
        role: 'admin',
        token: 'mock-jwt-token',
        expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString(),
        createdAt: Date.now(),
        loginTime: new Date().toISOString()
      }
    };
  }

  // Request password reset
  static async requestPasswordReset(request: PasswordResetRequest): Promise<PasswordResetResponse> {
    // TODO: Replace with real API call
    // const response = await apiCall<PasswordResetResponse>(API_CONFIG.endpoints.passwordReset, {
    //   method: 'POST',
    //   body: JSON.stringify(request)
    // });
    
    // Mock implementation
    return {
      success: true,
      message: 'Password reset email sent'
    };
  }

  // Refresh authentication token
  static async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    // TODO: Replace with real API call
    // const response = await apiCall<RefreshTokenResponse>(API_CONFIG.endpoints.refreshToken, {
    //   method: 'POST',
    //   body: JSON.stringify(request)
    // });
    
    // Mock implementation
    return {
      success: true,
      token: 'new-mock-jwt-token',
      refreshToken: 'new-mock-refresh-token',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    };
  }

  // Logout user
  static async logout(): Promise<ApiResponse<void>> {
    // TODO: Replace with real API call
    // const response = await apiCall<void>(API_CONFIG.endpoints.logout, {
    //   method: 'POST'
    // });
    
    // Mock implementation
    return {
      success: true
    };
  }

  // Get user profile
  static async getProfile(): Promise<ApiResponse<User>> {
    // TODO: Replace with real API call
    // const response = await apiCall<User>(API_CONFIG.endpoints.profile, {
    //   method: 'GET'
    // });
    
    // Mock implementation
    return {
      success: true,
      data: {
        id: '1',
        email: 'user@example.com',
        name: 'Mock User',
        role: 'admin',
        emailVerified: true,
        twoFactorEnabled: false,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ssoLinked: false,
        demoPassword: 'demo123',
        password: 'demo123',
        email_verified: 1
      }
    };
  }

  // Get all users (admin only)
  static async getUsers(): Promise<ApiResponse<User[]>> {
    // TODO: Replace with real API call
    // const response = await apiCall<User[]>(API_CONFIG.endpoints.users, {
    //   method: 'GET'
    // });
    
    // Mock implementation
    return {
      success: true,
      data: []
    };
  }
}

// Token management utilities
export class TokenManager {
  private static readonly TOKEN_KEY = 'metrics_hub_token';
  private static readonly REFRESH_TOKEN_KEY = 'metrics_hub_refresh_token';

  // Store tokens in localStorage
  static setTokens(token: string, refreshToken?: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    if (refreshToken) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  // Get stored token
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Get stored refresh token
  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Clear all tokens
  static clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  // Check if token needs refresh
  static async checkAndRefreshToken(): Promise<boolean> {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();

    if (!token || !refreshToken) {
      return false;
    }

    // TODO: Implement real token validation and refresh logic
    // For now, just return true
    return true;
  }
}

// Request interceptor for adding auth headers
// TODO: Implement when using real HTTP client
export function addAuthHeaders(headers: Record<string, string> = {}): Record<string, string> {
  const token = TokenManager.getToken();
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}
