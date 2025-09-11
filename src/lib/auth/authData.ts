// Mock authentication data for front-end only testing
import { User } from '../types';

export interface MockUser extends User {
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  ssoLinked: boolean;
  ssoProvider?: string;
  demoPassword: string; // For demo purposes only
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  role: User['role'];
  avatar?: string;
  loginTime: string;
  expiresAt: string;
  lastActivity: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  result: 'success' | 'failure' | 'denied';
  ip: string; // Fake IP for demo
  userAgent: string;
  details?: string;
}

export interface RolePermission {
  action: string;
  allowed: boolean;
  resource?: string;
}

export interface RoleMap {
  [role: string]: RolePermission[];
}

// Seed personas for testing
export const SEED_USERS: MockUser[] = [
  {
    id: '1',
    email: 'alex@metrics.com',
    password: 'demo123', // This will be ignored, using demoPassword instead
    name: 'Alex Chen',
    role: 'admin',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    emailVerified: true,
    twoFactorEnabled: true,
    ssoLinked: true,
    ssoProvider: 'google',
    demoPassword: 'admin123'
  },
  {
    id: '2',
    email: 'sarah@metrics.com',
    password: 'demo123',
    name: 'Sarah Johnson',
    role: 'hr',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    emailVerified: true,
    twoFactorEnabled: true,
    ssoLinked: false,
    demoPassword: 'hr123'
  },
  {
    id: '3',
    email: 'mike@metrics.com',
    password: 'demo123',
    name: 'Mike Rodriguez',
    role: 'hr',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    emailVerified: true,
    twoFactorEnabled: true,
    ssoLinked: true,
    ssoProvider: 'microsoft',
    demoPassword: 'seniorhr123'
  },
  {
    id: '4',
    email: 'lisa@metrics.com',
    password: 'demo123',
    name: 'Lisa Wang',
    role: 'lead_project',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    emailVerified: true,
    twoFactorEnabled: false,
    ssoLinked: false,
    demoPassword: 'pm123'
  },
  {
    id: '5',
    email: 'tom@metrics.com',
    password: 'demo123',
    name: 'Tom Wilson',
    role: 'volunteer',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    emailVerified: true,
    twoFactorEnabled: false,
    ssoLinked: false,
    demoPassword: 'volunteer123'
  },
  {
    id: '6',
    email: 'guest@metrics.com',
    password: 'demo123',
    name: 'Guest User',
    role: 'unassigned',
    status: 'active',
    avatar: '',
    email_verified: 0,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    emailVerified: false,
    twoFactorEnabled: false,
    ssoLinked: false,
    demoPassword: 'guest123'
  }
];

// Role-based permissions matrix
export const ROLE_PERMISSIONS: RoleMap = {
  admin: [
    { action: 'invite_user', allowed: true },
    { action: 'reset_password_others', allowed: true },
    { action: 'set_role_others', allowed: true },
    { action: 'enforce_2fa_others', allowed: true },
    { action: 'view_auth_audit', allowed: true },
    { action: 'export_auth_audit', allowed: true },
    { action: 'configure_sso', allowed: true },
    { action: 'rotate_tokens', allowed: true },
    { action: 'manage_sessions_others', allowed: true },
    { action: 'change_global_settings', allowed: true },
    { action: 'change_regional_settings', allowed: true },
    { action: 'edit_regional_templates', allowed: true },
    { action: 'edit_project_templates', allowed: true },
    { action: 'edit_personal_settings', allowed: true }
  ],
  hr: [
    { action: 'invite_user', allowed: true },
    { action: 'reset_password_others', allowed: true },
    { action: 'set_role_others', allowed: false },
    { action: 'enforce_2fa_others', allowed: true },
    { action: 'view_auth_audit', allowed: false },
    { action: 'export_auth_audit', allowed: false },
    { action: 'configure_sso', allowed: false },
    { action: 'rotate_tokens', allowed: false },
    { action: 'manage_sessions_others', allowed: false },
    { action: 'change_global_settings', allowed: false },
    { action: 'change_regional_settings', allowed: true },
    { action: 'edit_regional_templates', allowed: true },
    { action: 'edit_project_templates', allowed: true },
    { action: 'edit_personal_settings', allowed: true }
  ],
  lead_project: [
    { action: 'invite_user', allowed: false },
    { action: 'reset_password_others', allowed: false },
    { action: 'set_role_others', allowed: false },
    { action: 'enforce_2fa_others', allowed: false },
    { action: 'view_auth_audit', allowed: false },
    { action: 'export_auth_audit', allowed: false },
    { action: 'configure_sso', allowed: false },
    { action: 'rotate_tokens', allowed: false },
    { action: 'manage_sessions_others', allowed: false },
    { action: 'change_global_settings', allowed: false },
    { action: 'change_regional_settings', allowed: false },
    { action: 'edit_regional_templates', allowed: false },
    { action: 'edit_project_templates', allowed: true },
    { action: 'edit_personal_settings', allowed: true }
  ],
  volunteer: [
    { action: 'invite_user', allowed: false },
    { action: 'reset_password_others', allowed: false },
    { action: 'set_role_others', allowed: false },
    { action: 'enforce_2fa_others', allowed: false },
    { action: 'view_auth_audit', allowed: false },
    { action: 'export_auth_audit', allowed: false },
    { action: 'configure_sso', allowed: false },
    { action: 'rotate_tokens', allowed: false },
    { action: 'manage_sessions_others', allowed: false },
    { action: 'change_global_settings', allowed: false },
    { action: 'change_regional_settings', allowed: false },
    { action: 'edit_regional_templates', allowed: false },
    { action: 'edit_project_templates', allowed: false },
    { action: 'edit_personal_settings', allowed: true }
  ],
  unassigned: [
    { action: 'invite_user', allowed: false },
    { action: 'reset_password_others', allowed: false },
    { action: 'set_role_others', allowed: false },
    { action: 'enforce_2fa_others', allowed: false },
    { action: 'view_auth_audit', allowed: false },
    { action: 'export_auth_audit', allowed: false },
    { action: 'configure_sso', allowed: false },
    { action: 'rotate_tokens', allowed: false },
    { action: 'manage_sessions_others', allowed: false },
    { action: 'change_global_settings', allowed: false },
    { action: 'change_regional_settings', allowed: false },
    { action: 'edit_regional_templates', allowed: false },
    { action: 'edit_project_templates', allowed: false },
    { action: 'edit_personal_settings', allowed: false }
  ]
};

// Route protection configuration
export const ROUTE_PROTECTION = {
  '/admin/auth-settings': { roles: ['admin'], message: 'Admin access required' },
  '/admin/session-management': { roles: ['admin'], message: 'Admin access required' },
  '/admin/audit-logs': { roles: ['admin'], message: 'Admin access required' },
  '/admin/global-settings': { roles: ['admin'], message: 'Admin access required' },
  '/admin/integrations': { roles: ['admin'], message: 'Admin access required' },
  '/hr/auth-settings': { roles: ['admin', 'hr'], message: 'Insufficient permissions' },
  '/hr/regional-settings': { roles: ['admin', 'hr'], message: 'Insufficient permissions' },
  '/hr/templates': { roles: ['admin', 'hr'], message: 'Insufficient permissions' },
  '/hr/notifications': { roles: ['admin', 'hr'], message: 'Insufficient permissions' },
  '/lead/templates': { roles: ['admin', 'hr', 'lead_project'], message: 'Insufficient permissions' },
  '/volunteer/personal-settings': { roles: ['admin', 'hr', 'lead_project', 'volunteer'], message: 'Please sign in' },
  '/two-factor-setup': { roles: ['authenticated'], message: 'Please sign in' },
  '/sso-connection': { roles: ['authenticated'], message: 'Please sign in' }
};

// Alert types for simulation
export interface SecurityAlert {
  id: string;
  type: 'repeated_failed_login' | 'impossible_travel' | 'many_password_resets' | 'privilege_escalation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  userId?: string;
  timestamp: string;
  acknowledged: boolean;
}

// Demo controls configuration
export interface DemoControls {
  networkDelay: number; // milliseconds
  showLoadingStates: boolean;
  simulateErrors: boolean;
}

export const DEFAULT_DEMO_CONTROLS: DemoControls = {
  networkDelay: 0,
  showLoadingStates: false,
  simulateErrors: false
};

// Export/Import data structure
export interface AuthExportData {
  users: MockUser[];
  roleMap: RoleMap;
  auditLog: AuditEntry[];
  version: string;
  exportedAt: string;
}

export const EXPORT_VERSION = '1.0';
