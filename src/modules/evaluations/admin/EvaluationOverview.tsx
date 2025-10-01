import React, { useState } from 'react';
import { BarChart3, Users, CheckCircle, Clock, AlertTriangle, TrendingUp, Calendar, Target } from 'lucide-react';

const EvaluationOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q4');

  // Mock data for admin overview
  const overviewStats = {
    totalEvaluations: 156,
    completed: 134,
    pending: 22,
    overdue: 8,
    averageScore: 4.2,
    completionRate: 86,
    nextDeadline: '2024-10-15'
  };

  const departmentData = [
    { name: 'Projects', total: 45, completed: 42, pending: 3, avgScore: 4.3 },
    { name: 'Operations', total: 38, completed: 35, pending: 3, avgScore: 4.1 },
    { name: 'Community', total: 41, completed: 32, pending: 9, avgScore: 4.4 },
    { name: 'Communications', total: 32, completed: 25, pending: 7, avgScore: 4.0 }
  ];

  const recentActivity = [
    { action: 'Evaluation completed', user: 'Sarah Johnson', department: 'Projects', time: '2 hours ago' },
    { action: 'Improvement plan created', user: 'Mike Chen', department: 'Operations', time: '4 hours ago' },
    { action: 'Evaluation submitted', user: 'Emily Rodriguez', department: 'Community', time: '6 hours ago' },
    { action: 'Reminder sent', user: 'David Kim', department: 'Communications', time: '1 day ago' }
  ];

  const getScoreColor = (score: number): string => {
    if (score >= 4.5) return 'text-emerald-600 bg-emerald-50';
    if (score >= 4.0) return 'text-green-600 bg-green-50';
    if (score >= 3.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCompletionColor = (rate: number): string => {
    if (rate >= 90) return 'text-emerald-600';
    if (rate >= 80) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evaluation System Overview</h1>
          <p className="text-gray-600 mt-2">Monitor and manage the organization-wide evaluation process</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent"
          >
            <option value="2024-Q4">Q4 2024</option>
            <option value="2024-Q3">Q3 2024</option>
            <option value="2024-Q2">Q2 2024</option>
            <option value="2024-Q1">Q1 2024</option>
          </select>
          <button className="btn-living px-6 py-2">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Evaluations</p>
              <p className="text-3xl font-bold text-gray-900">{overviewStats.totalEvaluations}</p>
            </div>
            <div className="p-3 bg-living-green-50 rounded-full">
              <Users className="w-6 h-6 text-living-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% from last quarter</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-emerald-600">{overviewStats.completed}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Completion Rate</span>
              <span className={`font-medium ${getCompletionColor(overviewStats.completionRate)}`}>
                {overviewStats.completionRate}%
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full" 
                style={{ width: `${overviewStats.completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{overviewStats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600">{overviewStats.overdue} overdue</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-living-green-600">{overviewStats.averageScore}</p>
            </div>
            <div className="p-3 bg-living-green-50 rounded-full">
              <Target className="w-6 h-6 text-living-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Out of 5.0 scale</p>
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Department Breakdown</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(dept.avgScore)}`}>
                    {dept.avgScore}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Total</p>
                    <p className="font-semibold text-gray-900">{dept.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Completed</p>
                    <p className="font-semibold text-emerald-600">{dept.completed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pending</p>
                    <p className="font-semibold text-yellow-600">{dept.pending}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round((dept.completed / dept.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-living-green-500 h-2 rounded-full" 
                      style={{ width: `${(dept.completed / dept.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-living-green-50 rounded-full">
                  {activity.action.includes('completed') ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  ) : activity.action.includes('created') ? (
                    <Target className="w-4 h-4 text-blue-600" />
                  ) : activity.action.includes('submitted') ? (
                    <Clock className="w-4 h-4 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user} • {activity.department}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
              View all activity →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-living-green-400 hover:bg-living-green-50 transition-colors">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Schedule Evaluations</p>
              <p className="text-sm text-gray-600">Set up next evaluation cycle</p>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-living-green-400 hover:bg-living-green-50 transition-colors">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Send Reminders</p>
              <p className="text-sm text-gray-600">Notify pending evaluations</p>
            </div>
          </button>
          
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-living-green-400 hover:bg-living-green-50 transition-colors">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Analytics Report</p>
              <p className="text-sm text-gray-600">Generate detailed insights</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationOverview;