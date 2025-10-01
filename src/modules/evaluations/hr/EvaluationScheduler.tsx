import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Settings, Bell, CheckCircle, AlertTriangle } from 'lucide-react';

// Interfaces para el tipado
interface EvaluationCycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'draft';
  participants: string[];
  evaluationType: 'quarterly' | 'biannual' | 'annual' | 'custom';
  completionRate: number;
  totalEvaluations: number;
  completedEvaluations: number;
}

interface ScheduledEvaluation {
  id: string;
  employeeName: string;
  employeeId: string;
  evaluatorName: string;
  department: string;
  type: 'self' | 'supervisor' | 'peer' | '360';
  scheduledDate: string;
  dueDate: string;
  status: 'scheduled' | 'reminded' | 'overdue' | 'completed';
  cycleId: string;
}

interface ReminderSettings {
  enabled: boolean;
  daysBefore: number[];
  escalationDays: number;
  autoEscalation: boolean;
}

const EvaluationScheduler = () => {
  const [activeTab, setActiveTab] = useState<'cycles' | 'schedule' | 'reminders'>('cycles');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);

  // Mock data
  const evaluationCycles: EvaluationCycle[] = [
    {
      id: 'cycle_001',
      name: 'Q4 2024 Performance Review',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      status: 'active',
      participants: ['dept_projects', 'dept_operations', 'dept_community', 'dept_communications'],
      evaluationType: 'quarterly',
      totalEvaluations: 156,
      completedEvaluations: 134,
      completionRate: 86
    },
    {
      id: 'cycle_002',
      name: 'Annual Review 2024',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      status: 'upcoming',
      participants: ['all_departments'],
      evaluationType: 'annual',
      totalEvaluations: 200,
      completedEvaluations: 0,
      completionRate: 0
    },
    {
      id: 'cycle_003',
      name: 'Q3 2024 Performance Review',
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      status: 'completed',
      participants: ['dept_projects', 'dept_operations'],
      evaluationType: 'quarterly',
      totalEvaluations: 89,
      completedEvaluations: 89,
      completionRate: 100
    }
  ];

  const scheduledEvaluations: ScheduledEvaluation[] = [
    {
      id: 'sched_001',
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP_001',
      evaluatorName: 'Self Evaluation',
      department: 'Projects',
      type: 'self',
      scheduledDate: '2024-10-15',
      dueDate: '2024-10-22',
      status: 'scheduled',
      cycleId: 'cycle_001'
    },
    {
      id: 'sched_002',
      employeeName: 'Mike Chen',
      employeeId: 'EMP_002',
      evaluatorName: 'Sarah Johnson',
      department: 'Operations',
      type: 'supervisor',
      scheduledDate: '2024-10-16',
      dueDate: '2024-10-23',
      status: 'reminded',
      cycleId: 'cycle_001'
    },
    {
      id: 'sched_003',
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP_003',
      evaluatorName: 'Team Peers',
      department: 'Community',
      type: 'peer',
      scheduledDate: '2024-10-10',
      dueDate: '2024-10-17',
      status: 'overdue',
      cycleId: 'cycle_001'
    },
    {
      id: 'sched_004',
      employeeName: 'David Kim',
      employeeId: 'EMP_004',
      evaluatorName: 'Multiple Evaluators',
      department: 'Communications',
      type: '360',
      scheduledDate: '2024-10-12',
      dueDate: '2024-10-19',
      status: 'completed',
      cycleId: 'cycle_001'
    }
  ];

  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>({
    enabled: true,
    daysBefore: [7, 3, 1],
    escalationDays: 7,
    autoEscalation: true
  });

  const getStatusColor = (status: EvaluationCycle['status'] | ScheduledEvaluation['status']): string => {
    switch (status) {
      case 'active':
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'reminded': return 'bg-purple-100 text-purple-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: ScheduledEvaluation['type']) => {
    switch (type) {
      case 'self': return '👤';
      case 'supervisor': return '👥';
      case 'peer': return '🤝';
      case '360': return '🔄';
      default: return '📋';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysUntil = (dateString: string): number => {
    const today = new Date();
    const target = new Date(dateString);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleBulkReminder = (cycleId: string) => {
    console.log('Sending bulk reminders for cycle:', cycleId);
    // Lógica para enviar recordatorios masivos
  };

  const handleCreateCycle = () => {
    console.log('Creating new evaluation cycle');
    setShowCreateModal(false);
    // Lógica para crear nuevo ciclo
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evaluation Scheduler</h1>
          <p className="text-gray-600 mt-2">Plan and manage evaluation cycles and schedules</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Send Reminders</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-living px-6 py-2 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Cycle</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'cycles', name: 'Evaluation Cycles', icon: Calendar },
            { id: 'schedule', name: 'Schedule Overview', icon: Clock },
            { id: 'reminders', name: 'Reminder Settings', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-living-green-500 text-living-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Evaluation Cycles Tab */}
      {activeTab === 'cycles' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cycles</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {evaluationCycles.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {evaluationCycles.filter(c => c.status === 'upcoming').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Evaluations</p>
                  <p className="text-3xl font-bold text-living-green-600">
                    {evaluationCycles.reduce((sum, cycle) => sum + cycle.totalEvaluations, 0)}
                  </p>
                </div>
                <div className="p-3 bg-living-green-50 rounded-full">
                  <Users className="w-6 h-6 text-living-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {Math.round(evaluationCycles.reduce((sum, cycle) => sum + cycle.completionRate, 0) / evaluationCycles.length)}%
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-full">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Cycles List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Evaluation Cycles</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {evaluationCycles.map((cycle) => (
                <div key={cycle.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-semibold text-gray-900">{cycle.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cycle.status)}`}>
                          {cycle.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize">
                          {cycle.evaluationType}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Period</p>
                          <p className="font-medium text-gray-900">
                            {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                          </p>
                          {cycle.status === 'upcoming' && (
                            <p className="text-xs text-blue-600">
                              Starts in {calculateDaysUntil(cycle.startDate)} days
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Progress</p>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{cycle.completionRate}%</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-living-green-500 h-2 rounded-full"
                                style={{ width: `${cycle.completionRate}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {cycle.completedEvaluations}/{cycle.totalEvaluations} completed
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Participants</p>
                          <p className="font-medium text-gray-900">{cycle.participants.length} departments</p>
                          <p className="text-xs text-gray-600">{cycle.totalEvaluations} evaluations</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">Actions</p>
                          <div className="flex space-x-2 mt-1">
                            <button
                              onClick={() => setSelectedCycle(selectedCycle === cycle.id ? null : cycle.id)}
                              className="text-xs text-living-green-600 hover:text-living-green-700 font-medium"
                            >
                              View Details
                            </button>
                            {cycle.status === 'active' && (
                              <button
                                onClick={() => handleBulkReminder(cycle.id)}
                                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Send Reminders
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedCycle === cycle.id && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Cycle Configuration</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium">{cycle.evaluationType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-medium">
                                {Math.ceil((new Date(cycle.endDate).getTime() - new Date(cycle.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Auto-reminders:</span>
                              <span className="font-medium">Enabled</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Deadline enforcement:</span>
                              <span className="font-medium">Flexible</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Department Status</h4>
                          <div className="space-y-2">
                            {['Projects', 'Operations', 'Community', 'Communications'].map((dept, index) => (
                              <div key={dept} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{dept}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-medium">
                                    {Math.floor(Math.random() * 20) + 10}/{Math.floor(Math.random() * 25) + 15}
                                  </span>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-living-green-500 h-2 rounded-full" 
                                      style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Overview Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {/* Schedule Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {scheduledEvaluations.filter(e => {
                      const evalDate = new Date(e.scheduledDate);
                      const today = new Date();
                      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                      const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
                      return evalDate >= weekStart && evalDate <= weekEnd;
                    }).length}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-3xl font-bold text-red-600">
                    {scheduledEvaluations.filter(e => e.status === 'overdue').length}
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {scheduledEvaluations.filter(e => e.status === 'completed').length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-full">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reminded</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {scheduledEvaluations.filter(e => e.status === 'reminded').length}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-full">
                  <Bell className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Scheduled Evaluations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Evaluations</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {scheduledEvaluations.map((evaluation) => (
                <div key={evaluation.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{getTypeIcon(evaluation.type)}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{evaluation.employeeName}</h3>
                        <p className="text-sm text-gray-600">
                          {evaluation.department} • Evaluator: {evaluation.evaluatorName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Scheduled</p>
                        <p className="font-medium">{formatDate(evaluation.scheduledDate)}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Due</p>
                        <p className={`font-medium ${
                          evaluation.status === 'overdue' ? 'text-red-600' :
                          calculateDaysUntil(evaluation.dueDate) <= 3 ? 'text-yellow-600' :
                          'text-gray-900'
                        }`}>
                          {formatDate(evaluation.dueDate)}
                        </p>
                        <p className={`text-xs ${
                          evaluation.status === 'overdue' ? 'text-red-600' :
                          calculateDaysUntil(evaluation.dueDate) <= 3 ? 'text-yellow-600' :
                          'text-gray-500'
                        }`}>
                          {evaluation.status === 'overdue' ? 
                            `${Math.abs(calculateDaysUntil(evaluation.dueDate))} days overdue` :
                            `${calculateDaysUntil(evaluation.dueDate)} days remaining`
                          }
                        </p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                        {evaluation.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>

                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Send Reminder">
                          <Bell className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-living-green-600 transition-colors" title="Reschedule">
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reminder Settings Tab */}
      {activeTab === 'reminders' && (
        <div className="max-w-4xl space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Reminder Configuration</h2>

            <div className="space-y-6">
              {/* Enable/Disable Reminders */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Enable Automatic Reminders</h3>
                  <p className="text-sm text-gray-500">Send automated reminder notifications to participants</p>
                </div>
                <button
                  onClick={() => setReminderSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    reminderSettings.enabled ? 'bg-living-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      reminderSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Reminder Schedule */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Reminder Schedule</h3>
                <p className="text-sm text-gray-500 mb-4">Configure when reminders are sent before the due date</p>
                <div className="grid grid-cols-3 gap-4">
                  {reminderSettings.daysBefore.map((days, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reminder {index + 1}
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={days}
                          onChange={(e) => {
                            const newDays = [...reminderSettings.daysBefore];
                            newDays[index] = parseInt(e.target.value) || 0;
                            setReminderSettings(prev => ({ ...prev, daysBefore: newDays }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
                          min="1"
                          disabled={!reminderSettings.enabled}
                        />
                        <span className="text-sm text-gray-500">days before</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escalation Settings */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Escalation Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Escalate After (days overdue)
                    </label>
                    <input
                      type="number"
                      value={reminderSettings.escalationDays}
                      onChange={(e) => setReminderSettings(prev => ({ 
                        ...prev, 
                        escalationDays: parseInt(e.target.value) || 0 
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
                      min="1"
                      disabled={!reminderSettings.enabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Auto-escalation</h4>
                      <p className="text-sm text-gray-500">Automatically notify managers when overdue</p>
                    </div>
                    <button
                      onClick={() => setReminderSettings(prev => ({ 
                        ...prev, 
                        autoEscalation: !prev.autoEscalation 
                      }))}
                      disabled={!reminderSettings.enabled}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        reminderSettings.autoEscalation && reminderSettings.enabled 
                          ? 'bg-living-green-500' 
                          : 'bg-gray-200'
                      } ${!reminderSettings.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          reminderSettings.autoEscalation && reminderSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-end">
                  <button className="btn-living px-6 py-2 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Save Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-medium text-gray-900 mb-4">Reminder Preview</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <p><strong>Current Configuration:</strong></p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Reminders: {reminderSettings.enabled ? 'Enabled' : 'Disabled'}</li>
                  {reminderSettings.enabled && (
                    <>
                      <li>Schedule: {reminderSettings.daysBefore.join(', ')} days before due date</li>
                      <li>Escalation: After {reminderSettings.escalationDays} days overdue</li>
                      <li>Auto-escalation: {reminderSettings.autoEscalation ? 'Yes' : 'No'}</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Cycle Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create Evaluation Cycle</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Evaluation cycle creation would include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Cycle name and type (quarterly, annual, etc.)</li>
                <li>Start and end dates</li>
                <li>Department/participant selection</li>
                <li>Evaluation types to include</li>
                <li>Reminder schedule configuration</li>
                <li>Template and competency selection</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCycle}
                className="btn-living px-4 py-2"
              >
                Create Cycle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationScheduler;