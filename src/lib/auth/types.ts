// Authentication types - Backend ready
// TODO: When backend is implemented, these types should match your API response schemas

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  ssoProvider?: string;
  ssoId?: string;
  status: 'active' | 'suspended' | 'inactive' | 'deleted';
  last_login?: string;
  created_at: string;
  updated_at: string;
  // Backward compatibility fields
  ssoLinked: boolean;
  demoPassword: string;
  password: string;
  email_verified: number;
}

export type UserRole = 'admin' | 'hr' | 'lead_project' | 'volunteer' | 'unassigned';

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  token: string; // JWT token
  refreshToken?: string; // For token refresh
  expiresAt: string; // ISO string for backward compatibility
  createdAt: number; // Unix timestamp
  loginTime: string; // For backward compatibility
  lastActivity?: string; // For backward compatibility
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  session?: AuthSession;
  requiresTwoFactor?: boolean;
  error?: string;
  redirectPath?: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  profile?: {
    first_name: string;
    last_name: string;
    phone?: string;
    organization?: string;
    role_preference?: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  user?: User;
  error?: string;
  requiresEmailVerification?: boolean;
}

export interface TwoFactorRequest {
  userId: string;
  code: string;
}

export interface TwoFactorResponse {
  success: boolean;
  session?: AuthSession;
  error?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetResponse {
  success: boolean;
  error?: string;
  message?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  expiresAt?: number;
  error?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Permission types
export interface Permission {
  action: string;
  resource?: string;
  allowed: boolean;
}

export interface RolePermissions {
  [role: string]: string[];
}

// Audit and security
export interface AuditEntry {
  id: string;
  userId?: string;
  userEmail: string;
  action: string;
  resource: string;
  result: 'success' | 'failure' | 'denied';
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface SecurityAlert {
  id: string;
  type: 'repeated_failed_login' | 'impossible_travel' | 'suspicious_activity' | 'admin_action';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  userId?: string;
  acknowledged: boolean;
  createdAt: string;
}

// Demo/Development controls (remove in production)
export interface DemoControls {
  networkDelay: number;
  simulateErrors: boolean;
  showDebugInfo: boolean;
  enableAuditLog: boolean;
  enableSecurityAlerts: boolean;
}

// Export data structure
export interface AuthExportData {
  version: string;
  timestamp: string;
  users: User[];
  auditLog: AuditEntry[];
  securityAlerts: SecurityAlert[];
  demoControls: DemoControls;
}
