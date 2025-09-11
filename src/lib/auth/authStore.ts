// In-memory authentication store with localStorage persistence
import { 
  MockUser, 
  AuthSession, 
  AuditEntry, 
  SecurityAlert, 
  DemoControls, 
  AuthExportData,
  SEED_USERS,
  ROLE_PERMISSIONS,
  DEFAULT_DEMO_CONTROLS,
  EXPORT_VERSION
} from './authData';

// Storage keys for localStorage
const STORAGE_KEYS = {
  SESSION: 'metrics_hub_session',
  USERS: 'metrics_hub_users',
  AUDIT_LOG: 'metrics_hub_audit_log',
  ALERTS: 'metrics_hub_alerts',
  DEMO_CONTROLS: 'metrics_hub_demo_controls'
} as const;

// In-memory stores
let users: MockUser[] = [...SEED_USERS];
let currentSession: AuthSession | null = null;
let auditLog: AuditEntry[] = [];
let securityAlerts: SecurityAlert[] = [];
let demoControls: DemoControls = { ...DEFAULT_DEMO_CONTROLS };

// Utility functions
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function generateFakeIP(): string {
  return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function generateFakeUserAgent(): string {
  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
  ];
  return agents[Math.floor(Math.random() * agents.length)];
}

// LocalStorage helpers
function saveToStorage<T>(key: string, data: T): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
}

function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}

// Initialize store from localStorage
function initializeStore(): void {
  users = loadFromStorage(STORAGE_KEYS.USERS, [...SEED_USERS]);
  currentSession = loadFromStorage(STORAGE_KEYS.SESSION, null);
  auditLog = loadFromStorage(STORAGE_KEYS.AUDIT_LOG, []);
  securityAlerts = loadFromStorage(STORAGE_KEYS.ALERTS, []);
  demoControls = loadFromStorage(STORAGE_KEYS.DEMO_CONTROLS, { ...DEFAULT_DEMO_CONTROLS });
}

// Audit logging
function addAuditEntry(
  userId: string,
  userEmail: string,
  action: string,
  resource: string,
  result: 'success' | 'failure' | 'denied',
  details?: string
): void {
  const entry: AuditEntry = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    userId,
    userEmail,
    action,
    resource,
    result,
    ip: generateFakeIP(),
    userAgent: generateFakeUserAgent(),
    details
  };
  
  auditLog.unshift(entry); // Add to beginning
  auditLog = auditLog.slice(0, 1000); // Keep only last 1000 entries
  
  saveToStorage(STORAGE_KEYS.AUDIT_LOG, auditLog);
}

// Security alerts
function addSecurityAlert(
  type: SecurityAlert['type'],
  severity: SecurityAlert['severity'],
  message: string,
  userId?: string
): void {
  const alert: SecurityAlert = {
    id: generateId(),
    type,
    severity,
    message,
    userId,
    timestamp: new Date().toISOString(),
    acknowledged: false
  };
  
  securityAlerts.unshift(alert);
  securityAlerts = securityAlerts.slice(0, 100); // Keep only last 100 alerts
  
  saveToStorage(STORAGE_KEYS.ALERTS, securityAlerts);
}

// Authentication functions
export function authenticateUser(email: string, password: string): { success: boolean; user?: MockUser; error?: string } {
  const user = users.find(u => u.email === email && u.demoPassword === password && u.status === 'active');
  
  if (!user) {
    addAuditEntry('', email, 'login_attempt', 'authentication', 'failure', 'Invalid credentials');
    
    // Check for repeated failed logins
    const recentFailures = auditLog.filter(entry => 
      entry.userEmail === email && 
      entry.action === 'login_attempt' && 
      entry.result === 'failure' &&
      new Date(entry.timestamp).getTime() > Date.now() - 5 * 60 * 1000 // Last 5 minutes
    );
    
    if (recentFailures.length >= 3) {
      addSecurityAlert('repeated_failed_login', 'high', `Multiple failed login attempts for ${email}`);
    }
    
    return { success: false, error: 'Invalid credentials' };
  }
  
  if (!user.emailVerified) {
    addAuditEntry(user.id, user.email, 'login_attempt', 'authentication', 'denied', 'Email not verified');
    return { success: false, error: 'Please verify your email address' };
  }
  
  addAuditEntry(user.id, user.email, 'login_success', 'authentication', 'success');
  
  // Update last login
  user.last_login = new Date().toISOString();
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  return { success: true, user };
}

export function createSession(user: MockUser): AuthSession {
  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    loginTime: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    lastActivity: new Date().toISOString()
  };
  
  currentSession = session;
  saveToStorage(STORAGE_KEYS.SESSION, session);
  
  addAuditEntry(user.id, user.email, 'session_created', 'authentication', 'success');
  
  return session;
}

export function getCurrentSession(): AuthSession | null {
  if (!currentSession) return null;
  
  // Check if session is expired
  if (new Date(currentSession.expiresAt) < new Date()) {
    logout();
    return null;
  }
  
  return currentSession;
}

export function updateSessionActivity(): void {
  if (currentSession) {
    currentSession.lastActivity = new Date().toISOString();
    saveToStorage(STORAGE_KEYS.SESSION, currentSession);
  }
}

export function logout(): void {
  if (currentSession) {
    addAuditEntry(currentSession.userId, currentSession.email, 'logout', 'authentication', 'success');
  }
  
  currentSession = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }
}

export function registerUser(userData: Partial<MockUser>): { success: boolean; user?: MockUser; error?: string } {
  // Check if email already exists
  if (users.find(u => u.email === userData.email)) {
    return { success: false, error: 'Email already exists' };
  }
  
  const newUser: MockUser = {
    id: generateId(),
    email: userData.email!,
    password: 'demo123', // Will be ignored
    name: userData.name!,
    role: 'unassigned',
    status: 'active',
    avatar: '',
    email_verified: 0,
    created_at: new Date().toISOString(),
    last_login: undefined,
    emailVerified: false,
    twoFactorEnabled: false,
    ssoLinked: false,
    demoPassword: userData.demoPassword || 'demo123'
  };
  
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  addAuditEntry(newUser.id, newUser.email, 'user_registered', 'user_management', 'success');
  
  return { success: true, user: newUser };
}

// Two-factor authentication
export function verifyTwoFactor(userId: string, code: string): { success: boolean; error?: string } {
  const user = users.find(u => u.id === userId);
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  if (!user.twoFactorEnabled) {
    return { success: false, error: 'Two-factor authentication not enabled' };
  }
  
  // Accept any 6-digit code for demo
  if (!/^\d{6}$/.test(code)) {
    addAuditEntry(userId, user.email, '2fa_verification', 'authentication', 'failure', 'Invalid code format');
    return { success: false, error: 'Invalid code format' };
  }
  
  addAuditEntry(userId, user.email, '2fa_verification', 'authentication', 'success');
  return { success: true };
}

// Password reset
export function resetPassword(email: string): { success: boolean; newPassword?: string; error?: string } {
  const user = users.find(u => u.email === email && u.status === 'active');
  
  if (!user) {
    addAuditEntry('', email, 'password_reset_request', 'authentication', 'failure', 'User not found');
    return { success: false, error: 'User not found' };
  }
  
  // Generate new demo password
  const newPassword = `reset${Math.random().toString(36).substr(2, 6)}`;
  user.demoPassword = newPassword;
  
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  addAuditEntry(user.id, user.email, 'password_reset', 'authentication', 'success');
  
  // Check for many password resets
  const recentResets = auditLog.filter(entry => 
    entry.userId === user.id && 
    entry.action === 'password_reset' &&
    new Date(entry.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000 // Last 24 hours
  );
  
  if (recentResets.length >= 3) {
    addSecurityAlert('many_password_resets', 'medium', `Multiple password resets for ${user.email}`);
  }
  
  return { success: true, newPassword };
}

// Permission checking
export function hasPermission(userId: string, action: string): boolean {
  const user = users.find(u => u.id === userId);
  if (!user) return false;
  
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  const permission = permissions.find(p => p.action === action);
  
  return permission?.allowed || false;
}

export function checkPermission(userId: string, action: string, resource?: string): { allowed: boolean; reason?: string } {
  const user = users.find(u => u.id === userId);
  if (!user) {
    return { allowed: false, reason: 'User not found' };
  }
  
  const allowed = hasPermission(userId, action);
  
  addAuditEntry(
    userId, 
    user.email, 
    `permission_check_${action}`, 
    resource || 'permissions', 
    allowed ? 'success' : 'denied',
    allowed ? undefined : 'Insufficient permissions'
  );
  
  if (!allowed) {
    addSecurityAlert('privilege_escalation', 'high', `Unauthorized access attempt: ${action} by ${user.email}`);
  }
  
  return { allowed, reason: allowed ? undefined : 'Insufficient permissions' };
}

// User management
export function updateUser(userId: string, updates: Partial<MockUser>): { success: boolean; user?: MockUser; error?: string } {
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  const oldUser = { ...users[userIndex] };
  users[userIndex] = { ...users[userIndex], ...updates };
  
  saveToStorage(STORAGE_KEYS.USERS, users);
  
  addAuditEntry(
    userId, 
    users[userIndex].email, 
    'user_updated', 
    'user_management', 
    'success',
    `Updated: ${Object.keys(updates).join(', ')}`
  );
  
  return { success: true, user: users[userIndex] };
}

export function getAllUsers(): MockUser[] {
  return [...users];
}

export function getUserById(userId: string): MockUser | undefined {
  return users.find(u => u.id === userId);
}

// Audit and alerts
export function getAuditLog(limit: number = 100): AuditEntry[] {
  return auditLog.slice(0, limit);
}

export function getSecurityAlerts(): SecurityAlert[] {
  return [...securityAlerts];
}

export function acknowledgeAlert(alertId: string): void {
  const alert = securityAlerts.find(a => a.id === alertId);
  if (alert) {
    alert.acknowledged = true;
    saveToStorage(STORAGE_KEYS.ALERTS, securityAlerts);
  }
}

// Demo controls
export function updateDemoControls(updates: Partial<DemoControls>): void {
  demoControls = { ...demoControls, ...updates };
  saveToStorage(STORAGE_KEYS.DEMO_CONTROLS, demoControls);
}

export function getDemoControls(): DemoControls {
  return { ...demoControls };
}

export function simulateNetworkDelay(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, demoControls.networkDelay);
  });
}

// Export/Import
export function exportAuthData(): AuthExportData {
  return {
    users: [...users],
    roleMap: ROLE_PERMISSIONS,
    auditLog: [...auditLog],
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString()
  };
}

export function importAuthData(data: AuthExportData): { success: boolean; error?: string } {
  try {
    if (data.version !== EXPORT_VERSION) {
      return { success: false, error: 'Incompatible export version' };
    }
    
    users = [...data.users];
    auditLog = [...data.auditLog];
    
    saveToStorage(STORAGE_KEYS.USERS, users);
    saveToStorage(STORAGE_KEYS.AUDIT_LOG, auditLog);
    
    addAuditEntry('system', 'system', 'data_imported', 'system', 'success', `Imported ${data.users.length} users`);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Invalid import data' };
  }
}

// Reset functions
export function resetToSeedData(): void {
  users = [...SEED_USERS];
  currentSession = null;
  auditLog = [];
  securityAlerts = [];
  demoControls = { ...DEFAULT_DEMO_CONTROLS };
  
  // Clear localStorage
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
  
  addAuditEntry('system', 'system', 'data_reset', 'system', 'success', 'Reset to seed data');
}

export function clearAllData(): void {
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
  
  users = [];
  currentSession = null;
  auditLog = [];
  securityAlerts = [];
  demoControls = { ...DEFAULT_DEMO_CONTROLS };
}

// Initialize store on module load
if (typeof window !== 'undefined') {
  initializeStore();
}

// Auto-save session activity every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    updateSessionActivity();
  }, 5 * 60 * 1000);
}
