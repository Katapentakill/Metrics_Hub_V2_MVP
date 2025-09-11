'use client';

import { useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  getCurrentUserSession, 
  isAuthenticated,
  userHasPermission,
  checkUserPermission,
  getAllUsersAction,
  getAuditLogAction,
  getSecurityAlertsAction
} from '@/lib/auth/authActions';
import { MockUser, SecurityAlert } from '@/lib/auth/authData';

export default function TestAuthPage() {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<MockUser[]>([]);
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    setIsLoading(true);
    try {
      const [user, userSession, users, audit, alerts] = await Promise.all([
        getCurrentUser(),
        getCurrentUserSession(),
        getAllUsersAction(),
        getAuditLogAction(20),
        getSecurityAlertsAction()
      ]);

      setCurrentUser(user);
      setSession(userSession);
      setAllUsers(users);
      setAuditLog(audit);
      setSecurityAlerts(alerts);

      // Test permissions
      if (user) {
        const userPermissions = [
          'invite_user',
          'reset_password_others',
          'set_role_others',
          'view_auth_audit',
          'change_global_settings',
          'edit_personal_settings'
        ].filter(permission => userHasPermission(permission));
        
        setPermissions(userPermissions);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testPermission = async (action: string) => {
    if (!currentUser) return;
    
    const result = checkUserPermission(action, 'test-resource');
    alert(`Permission "${action}": ${result.allowed ? 'ALLOWED' : 'DENIED'}\nReason: ${result.reason || 'None'}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-muted">Loading authentication data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Authentication Test Page</h1>
          <p className="text-muted text-lg">Testing the mock authentication system</p>
        </div>

        {/* Authentication Status */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Authentication Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Current User</h3>
              {currentUser ? (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Role:</strong> <span className="badge badge-info">{currentUser.role}</span></p>
                  <p><strong>Status:</strong> <span className={`badge ${currentUser.status === 'active' ? 'badge-success' : 'badge-error'}`}>{currentUser.status}</span></p>
                  <p><strong>Email Verified:</strong> {currentUser.emailVerified ? '✅' : '❌'}</p>
                  <p><strong>2FA Enabled:</strong> {currentUser.twoFactorEnabled ? '✅' : '❌'}</p>
                  <p><strong>SSO Linked:</strong> {currentUser.ssoLinked ? '✅' : '❌'}</p>
                </div>
              ) : (
                <p className="text-muted">No user logged in</p>
              )}
            </div>
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Session Info</h3>
              {session ? (
                <div className="space-y-2">
                  <p><strong>User ID:</strong> {session.userId}</p>
                  <p><strong>Login Time:</strong> {new Date(session.loginTime).toLocaleString()}</p>
                  <p><strong>Expires:</strong> {new Date(session.expiresAt).toLocaleString()}</p>
                  <p><strong>Last Activity:</strong> {new Date(session.lastActivity).toLocaleString()}</p>
                  <p><strong>Is Authenticated:</strong> {isAuthenticated() ? '✅' : '❌'}</p>
                </div>
              ) : (
                <p className="text-muted">No active session</p>
              )}
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">User Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Available Permissions</h3>
              <div className="space-y-2">
                {permissions.map(permission => (
                  <div key={permission} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium text-green-800">{permission}</span>
                    <span className="text-xs text-green-600">✅ ALLOWED</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-slate-700 mb-2">Test Permissions</h3>
              <div className="space-y-2">
                {[
                  'invite_user',
                  'reset_password_others',
                  'set_role_others',
                  'view_auth_audit',
                  'change_global_settings',
                  'edit_personal_settings'
                ].map(permission => (
                  <button
                    key={permission}
                    onClick={() => testPermission(permission)}
                    className="w-full text-left p-2 bg-slate-50 hover:bg-slate-100 rounded transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-700">{permission}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Users */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">All Users ({allUsers.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers.map(user => (
              <div key={user.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h3 className="font-medium text-slate-800">{user.name}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-2">{user.email}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user.role === 'hr' ? 'bg-blue-100 text-blue-700' :
                    user.role === 'lead_project' ? 'bg-purple-100 text-purple-700' :
                    user.role === 'volunteer' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role}
                  </span>
                  {user.twoFactorEnabled && (
                    <span className="text-xs text-emerald-600">🔒 2FA</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Alerts */}
        {securityAlerts.length > 0 && (
          <div className="card p-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Security Alerts ({securityAlerts.length})</h2>
            <div className="space-y-3">
              {securityAlerts.slice(0, 5).map(alert => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                    alert.severity === 'high' ? 'bg-orange-50 border-orange-500' :
                    alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(alert.timestamp).toLocaleString()} • {alert.severity.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Audit Log */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Recent Audit Log ({auditLog.length})</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {auditLog.map(entry => (
              <div key={entry.id} className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm">
                <div className="flex-1">
                  <span className="font-medium text-slate-800">{entry.userEmail}</span>
                  <span className="text-slate-600 ml-2">{entry.action}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    entry.result === 'success' ? 'bg-green-100 text-green-700' :
                    entry.result === 'failure' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {entry.result}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => window.location.href = '/login'}
              className="btn-secondary"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.href = '/admin/dashboard'}
              className="btn-primary"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/hr/dashboard'}
              className="btn-primary"
            >
              HR Dashboard
            </button>
            <button
              onClick={loadAuthData}
              className="btn-secondary"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
