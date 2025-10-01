import React, { useState } from 'react';
import { FileText, Download, Calendar, Users, BarChart3, TrendingUp, Filter, RefreshCw } from 'lucide-react';

const ReportsGenerator = () => {
  const [selectedReport, setSelectedReport] = useState('performance');
  const [dateRange, setDateRange] = useState('quarter');
  const [selectedDepartments, setSelectedDepartments] = useState(['all']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filters, setFilters] = useState({
    includeComments: true,
    includeGraphs: true,
    includeComparisons: true,
    confidentialMode: false
  });

  const reportTypes = [
    {
      id: 'performance',
      name: 'Performance Overview',
      description: 'Comprehensive performance analysis across all departments',
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    {
      id: 'trends',
      name: 'Trend Analysis',
      description: 'Performance trends and patterns over time',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 'department',
      name: 'Department Comparison',
      description: 'Comparative analysis between departments',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      id: 'individual',
      name: 'Individual Reports',
      description: 'Detailed individual performance reports',
      icon: FileText,
      color: 'bg-orange-500'
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: 156 },
    { id: 'projects', name: 'Projects', count: 45 },
    { id: 'operations', name: 'Operations', count: 38 },
    { id: 'community', name: 'Community Outreach', count: 41 },
    { id: 'communications', name: 'Communications', count: 32 }
  ];

  const recentReports = [
    {
      name: 'Q3 2024 Performance Report',
      type: 'Performance Overview',
      generated: '2024-09-15',
      size: '2.3 MB',
      downloads: 12
    },
    {
      name: 'Department Comparison - August',
      type: 'Department Comparison',
      generated: '2024-09-01',
      size: '1.8 MB',
      downloads: 8
    },
    {
      name: 'Trend Analysis H1 2024',
      type: 'Trend Analysis',
      generated: '2024-08-15',
      size: '3.1 MB',
      downloads: 15
    },
    {
      name: 'Individual Reports - July',
      type: 'Individual Reports',
      generated: '2024-08-01',
      size: '4.2 MB',
      downloads: 23
    }
  ];

  const handleDepartmentToggle = (deptId: string) => {
    if (deptId === 'all') {
      setSelectedDepartments(['all']);
    } else {
      setSelectedDepartments(prev => {
        const withoutAll = prev.filter(id => id !== 'all');
        if (withoutAll.includes(deptId)) {
          return withoutAll.filter(id => id !== deptId);
        } else {
          return [...withoutAll, deptId];
        }
      });
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    
    // In real implementation, this would trigger download
    const fileName = `${reportTypes.find(r => r.id === selectedReport)?.name}_${dateRange}_${new Date().toISOString().split('T')[0]}.pdf`;
    console.log('Generated report:', fileName);
  };

  const getSelectedReportType = () => {
    return reportTypes.find(r => r.id === selectedReport);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports Generator</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive evaluation reports and analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Report Type Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Report Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      selectedReport === report.id
                        ? 'border-living-green-500 bg-living-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${report.color} rounded-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Filters and Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900">Configuration</h2>
            </div>

            <div className="space-y-6">
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Period
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
                >
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="semester">Last 6 Months</option>
                  <option value="year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Department Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departments ({selectedDepartments.length === 1 && selectedDepartments[0] === 'all' 
                    ? 'All' 
                    : selectedDepartments.filter(d => d !== 'all').length})
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {departments.map((dept) => (
                    <label key={dept.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept.id)}
                        onChange={() => handleDepartmentToggle(dept.id)}
                        className="rounded border-gray-300 text-living-green-600 focus:ring-living-green-500"
                      />
                      <span className="ml-3 flex-1 text-sm text-gray-700">
                        {dept.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {dept.count} users
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Report Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Include in Report
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.includeComments}
                      onChange={(e) => setFilters(prev => ({ ...prev, includeComments: e.target.checked }))}
                      className="rounded border-gray-300 text-living-green-600 focus:ring-living-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Comments and Feedback</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.includeGraphs}
                      onChange={(e) => setFilters(prev => ({ ...prev, includeGraphs: e.target.checked }))}
                      className="rounded border-gray-300 text-living-green-600 focus:ring-living-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Charts and Visualizations</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.includeComparisons}
                      onChange={(e) => setFilters(prev => ({ ...prev, includeComparisons: e.target.checked }))}
                      className="rounded border-gray-300 text-living-green-600 focus:ring-living-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Historical Comparisons</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.confidentialMode}
                      onChange={(e) => setFilters(prev => ({ ...prev, confidentialMode: e.target.checked }))}
                      className="rounded border-gray-300 text-living-green-600 focus:ring-living-green-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">Anonymize Personal Data</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Ready to Generate</h3>
                <p className="text-sm text-gray-600">
                  {getSelectedReportType()?.name} • {dateRange} • {
                    selectedDepartments.length === 1 && selectedDepartments[0] === 'all' 
                      ? 'All Departments' 
                      : `${selectedDepartments.filter(d => d !== 'all').length} Department${selectedDepartments.filter(d => d !== 'all').length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
                  isGenerating
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'btn-living'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Reports</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <p className="text-sm text-gray-600">{report.type}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>Generated: {report.generated}</span>
                        <span>{report.size}</span>
                        <span>{report.downloads} downloads</span>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-living-green-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
                View all reports →
              </button>
            </div>
          </div>

          {/* Report Preview */}
          {selectedReport && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Report Preview</h2>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900">{getSelectedReportType()?.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Preview will be available after generation
                  </p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Estimated pages:</span>
                    <span className="font-medium">
                      {selectedReport === 'individual' ? '45-60' : 
                       selectedReport === 'trends' ? '25-35' :
                       selectedReport === 'department' ? '15-25' : '20-30'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium">PDF</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated size:</span>
                    <span className="font-medium">2-4 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Generation time:</span>
                    <span className="font-medium">2-3 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Report Statistics</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total reports generated</span>
                <span className="font-semibold text-gray-900">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This month</span>
                <span className="font-semibold text-gray-900">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Most popular type</span>
                <span className="font-semibold text-gray-900">Performance Overview</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average generation time</span>
                <span className="font-semibold text-gray-900">2.3 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsGenerator;