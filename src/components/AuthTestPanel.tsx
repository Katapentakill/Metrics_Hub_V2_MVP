'use client';

import { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Download, 
  Upload, 
  RotateCcw, 
  Trash2, 
  Eye, 
  EyeOff,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { 
  getCurrentUser, 
  getCurrentUserSession, 
  isAdmin,
  getAllUsersAction,
  getAuditLogAction,
  getSecurityAlertsAction,
  acknowledgeAlertAction,
  updateDemoControlsAction,
  getDemoControlsAction,
  exportAuthDataAction,
  importAuthDataAction,
  resetToSeedDataAction,
  clearAllDataAction,
  updateUserAction
} from '@/lib/auth/authActions';
import { MockUser, SecurityAlert, AuthExportData } from '@/lib/auth/authData';
import type { DemoControls } from '@/lib/auth/authData';

interface DemoControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoControls({ isOpen, onClose }: DemoControlsProps) {
  const [activeTab, setActiveTab] = useState<'personas' | 'settings' | 'data' | 'audit'>('personas');
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  const [allUsers, setAllUsers] = useState<MockUser[]>([]);
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [demoControls, setDemoControls] = useState<DemoControls>({
    networkDelay: 0,
    showLoadingStates: false,
    simulateErrors: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [user, users, audit, alerts, controls] = await Promise.all([
        getCurrentUser(),
        getAllUsersAction(),
        getAuditLogAction(50),
        getSecurityAlertsAction(),
        getDemoControlsAction()
      ]);
      
      setCurrentUser(user);
      setAllUsers(users);
      setAuditLog(audit);
      setSecurityAlerts(alerts);
      setDemoControls(controls);
    } catch (error) {
      console.error('Error loading demo data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaSwitch = async (user: MockUser) => {
    setIsLoading(true);
    try {
      // Create a fake session for the selected user
      const session = {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        loginTime: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        lastActivity: new Date().toISOString()
      };
      
      localStorage.setItem('metrics_hub_session', JSON.stringify(session));
      window.location.reload();
    } catch (error) {
      console.error('Error switching persona:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserToggle = async (field: keyof MockUser, value: any) => {
    if (!currentUser) return;
    
    setIsLoading(true);
    try {
      const result = await updateUserAction(currentUser.id, { [field]: value });
      if (result.success) {
        setCurrentUser(result.user || null);
        await loadData();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoControlsUpdate = async (updates: Partial<DemoControls>) => {
    setIsLoading(true);
    try {
      await updateDemoControlsAction(updates);
      setDemoControls(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error updating demo controls:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      const data = await exportAuthDataAction();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `metrics-hub-auth-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const text = await file.text();
      const data: AuthExportData = JSON.parse(text);
      
      const result = await importAuthDataAction(data);
      if (result.success) {
        await loadData();
        alert('Data imported successfully!');
      } else {
        alert(`Import failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Invalid file format');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetData = async () => {
    if (!confirm('Are you sure you want to reset all data to seed state?')) return;
    
    setIsLoading(true);
    try {
      await resetToSeedDataAction();
      await loadData();
      alert('Data reset to seed state!');
    } catch (error) {
      console.error('Error resetting data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear ALL data? This cannot be undone!')) return;
    
    setIsLoading(true);
    try {
      await clearAllDataAction();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error clearing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    setIsLoading(true);
    try {
      await acknowledgeAlertAction(alertId);
      await loadData();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800">Demo Controls</h2>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              DEMO ONLY
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <EyeOff className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          {[
            { id: 'personas', label: 'Personas', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'data', label: 'Data', icon: FileText },
            { id: 'audit', label: 'Audit', icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Clock className="w-6 h-6 animate-spin text-emerald-600 mr-2" />
              <span className="text-slate-600">Loading...</span>
            </div>
          )}

          {/* Personas Tab */}
          {activeTab === 'personas' && !isLoading && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Switch Personas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allUsers.map(user => (
                    <div
                      key={user.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        currentUser?.id === user.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
                      }`}
                      onClick={() => handlePersonaSwitch(user)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{user.name}</h4>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
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
                              <Shield className="w-3 h-3 text-emerald-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current User Settings */}
              {currentUser && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Current User Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Email Verified</span>
                        <button
                          onClick={() => handleUserToggle('emailVerified', !currentUser.emailVerified)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            currentUser.emailVerified ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              currentUser.emailVerified ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Two Factor Enabled</span>
                        <button
                          onClick={() => handleUserToggle('twoFactorEnabled', !currentUser.twoFactorEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            currentUser.twoFactorEnabled ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              currentUser.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">SSO Linked</span>
                        <button
                          onClick={() => handleUserToggle('ssoLinked', !currentUser.ssoLinked)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            currentUser.ssoLinked ? 'bg-emerald-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              currentUser.ssoLinked ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600">
                        <strong>Demo Password:</strong> {currentUser.demoPassword}
                      </p>
                      <p className="text-sm text-slate-600">
                        <strong>SSO Provider:</strong> {currentUser.ssoProvider || 'None'}
                      </p>
                      <p className="text-sm text-slate-600">
                        <strong>Status:</strong> {currentUser.status}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && !isLoading && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Demo Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-700">Network Delay</span>
                    <p className="text-xs text-slate-500">Simulate network latency (ms)</p>
                  </div>
                  <input
                    type="number"
                    value={demoControls.networkDelay}
                    onChange={(e) => handleDemoControlsUpdate({ networkDelay: parseInt(e.target.value) || 0 })}
                    className="w-20 px-3 py-1 border border-slate-300 rounded text-sm"
                    min="0"
                    max="5000"
                    step="100"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-700">Show Loading States</span>
                    <p className="text-xs text-slate-500">Display loading indicators</p>
                  </div>
                  <button
                    onClick={() => handleDemoControlsUpdate({ showLoadingStates: !demoControls.showLoadingStates })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      demoControls.showLoadingStates ? 'bg-emerald-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        demoControls.showLoadingStates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-slate-700">Simulate Errors</span>
                    <p className="text-xs text-slate-500">Randomly trigger error states</p>
                  </div>
                  <button
                    onClick={() => handleDemoControlsUpdate({ simulateErrors: !demoControls.simulateErrors })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      demoControls.simulateErrors ? 'bg-red-600' : 'bg-slate-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        demoControls.simulateErrors ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Data Tab */}
          {activeTab === 'data' && !isLoading && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Data Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700">Export/Import</h4>
                  <div className="space-y-3">
                    <button
                      onClick={handleExportData}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export JSON</span>
                    </button>
                    
                    <label className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Import JSON</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700">Reset Data</h4>
                  <div className="space-y-3">
                    <button
                      onClick={handleResetData}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset to Seed</span>
                    </button>
                    
                    <button
                      onClick={handleClearData}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear All Data</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-700 mb-2">Data Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Users:</span>
                    <span className="ml-2 font-medium">{allUsers.length}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Audit Entries:</span>
                    <span className="ml-2 font-medium">{auditLog.length}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Alerts:</span>
                    <span className="ml-2 font-medium">{securityAlerts.length}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Active Users:</span>
                    <span className="ml-2 font-medium">{allUsers.filter(u => u.status === 'active').length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Tab */}
          {activeTab === 'audit' && !isLoading && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">Audit Log & Security Alerts</h3>
              
              {/* Security Alerts */}
              {securityAlerts.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Security Alerts</h4>
                  <div className="space-y-2">
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
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                            <p className="text-xs text-slate-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!alert.acknowledged && (
                            <button
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                              className="ml-2 px-2 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
                            >
                              Acknowledge
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Recent Audit Entries */}
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Recent Audit Entries</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {auditLog.slice(0, 20).map(entry => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded text-sm"
                    >
                      <div className="flex-1">
                        <span className="font-medium">{entry.userEmail}</span>
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
          <div className="text-sm text-slate-600">
            <strong>Warning:</strong> This is a demo-only system. Never use in production!
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Mock Backend Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
