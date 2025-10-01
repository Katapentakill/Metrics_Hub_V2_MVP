import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Clock, Target, AlertCircle, PieChart, Activity } from 'lucide-react';

const SystemMetrics = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('completion');

  // Mock data for system metrics
  const completionTrends = [
    { period: 'Jan', rate: 78, target: 85 },
    { period: 'Mar', rate: 82, target: 85 },
    { period: 'May', rate: 88, target: 85 },
    { period: 'Jul', rate: 85, target: 85 },
    { period: 'Sep', rate: 86, target: 85 },
    { period: 'Nov', rate: 91, target: 85 }
  ];

  const scoreDistribution = [
    { range: '4.5-5.0', count: 45, percentage: 35 },
    { range: '4.0-4.4', count: 52, percentage: 40 },
    { range: '3.5-3.9', count: 24, percentage: 19 },
    { range: '3.0-3.4', count: 6, percentage: 5 },
    { range: '<3.0', count: 2, percentage: 1 }
  ];

  const responseTimeMetrics = {
    averageTime: '3.2 days',
    medianTime: '2.8 days',
    fastest: '0.5 days',
    slowest: '14.2 days',
    onTimeRate: 84
  };

  const competencyAnalysis = [
    { name: 'Leadership', avgScore: 4.3, trend: '+0.2', color: 'bg-emerald-500' },
    { name: 'Communication', avgScore: 4.1, trend: '+0.1', color: 'bg-blue-500' },
    { name: 'Technical Skills', avgScore: 4.0, trend: '-0.1', color: 'bg-purple-500' },
    { name: 'Teamwork', avgScore: 4.4, trend: '+0.3', color: 'bg-green-500' },
    { name: 'Problem Solving', avgScore: 3.9, trend: '0.0', color: 'bg-yellow-500' },
    { name: 'Adaptability', avgScore: 4.2, trend: '+0.2', color: 'bg-indigo-500' }
  ];

  const alertsAndInsights: Array<{
    type: 'warning' | 'success' | 'info' | 'error';
    title: string;
    message: string;
    action: string;
  }> = [
    {
      type: 'warning',
      title: 'Low Response Rate Detected',
      message: 'Communications department has 23% pending evaluations',
      action: 'Send targeted reminders'
    },
    {
      type: 'success',
      title: 'Improvement Trend',
      message: 'Overall scores increased by 0.3 points this quarter',
      action: 'Share success factors'
    },
    {
      type: 'info',
      title: 'Pattern Identified',
      message: 'Self-evaluations consistently score 0.4 points higher',
      action: 'Review calibration'
    },
    {
      type: 'error',
      title: 'Deadline Risk',
      message: '8 evaluations are overdue by more than 1 week',
      action: 'Escalate to managers'
    }
  ];

  const getAlertIcon = (type: 'warning' | 'success' | 'info' | 'error') => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <Target className="w-5 h-5 text-green-600" />;
      case 'info': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type: 'warning' | 'success' | 'info' | 'error') => {
    switch (type) {
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-green-200 bg-green-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Metrics & Analytics</h1>
          <p className="text-gray-600 mt-2">Deep insights into evaluation system performance and trends</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="btn-living px-6 py-2">
            Export Data
          </button>
        </div>
      </div>

      {/* Alerts and Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Alerts & Insights</h2>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertsAndInsights.map((alert, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium mt-2">
                    {alert.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Completion Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Completion Rate Trends</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {completionTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900 w-12">{trend.period}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 w-32">
                    <div 
                      className={`h-3 rounded-full ${trend.rate >= trend.target ? 'bg-emerald-500' : 'bg-yellow-500'}`}
                      style={{ width: `${trend.rate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-semibold ${trend.rate >= trend.target ? 'text-emerald-600' : 'text-yellow-600'}`}>
                    {trend.rate}%
                  </span>
                  <span className="text-sm text-gray-500 ml-2">/ {trend.target}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-living-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-living-green-900">Average Completion Rate</span>
              <span className="text-2xl font-bold text-living-green-700">85.2%</span>
            </div>
            <p className="text-sm text-living-green-600 mt-1">+3.4% improvement over last period</p>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Score Distribution</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-3">
            {scoreDistribution.map((score, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${index === 0 ? 'bg-emerald-500' : index === 1 ? 'bg-green-400' : index === 2 ? 'bg-yellow-400' : index === 3 ? 'bg-orange-400' : 'bg-red-400'}`}></div>
                  <span className="font-medium text-gray-900">{score.range}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600">{score.count}</span>
                  <span className="font-semibold text-gray-900 w-12 text-right">{score.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Average Score</p>
                <p className="text-xl font-bold text-gray-900">4.2</p>
              </div>
              <div>
                <p className="text-gray-600">Standard Deviation</p>
                <p className="text-xl font-bold text-gray-900">0.6</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Response Time Analysis</h2>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Average Time</p>
            <p className="text-2xl font-bold text-gray-900">{responseTimeMetrics.averageTime}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Median Time</p>
            <p className="text-2xl font-bold text-gray-900">{responseTimeMetrics.medianTime}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Fastest</p>
            <p className="text-2xl font-bold text-emerald-600">{responseTimeMetrics.fastest}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Slowest</p>
            <p className="text-2xl font-bold text-red-600">{responseTimeMetrics.slowest}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">On-Time Rate</p>
            <p className="text-2xl font-bold text-living-green-600">{responseTimeMetrics.onTimeRate}%</p>
          </div>
        </div>
      </div>

      {/* Competency Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Competency Performance</h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competencyAnalysis.map((competency, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{competency.name}</h3>
                <span className={`text-sm font-medium ${competency.trend.startsWith('+') ? 'text-green-600' : competency.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                  {competency.trend}
                </span>
              </div>
              
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-2xl font-bold text-gray-900">{competency.avgScore}</span>
                <span className="text-sm text-gray-600">/ 5.0</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${competency.color} h-2 rounded-full`}
                  style={{ width: `${(competency.avgScore / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;