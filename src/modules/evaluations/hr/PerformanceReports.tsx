import React, { useState } from 'react';
import { TrendingUp, Users, Award, AlertCircle, BarChart3, Download, Filter, Calendar, Target } from 'lucide-react';

// Interfaces para el tipado
interface EmployeeReport {
  id: string;
  name: string;
  department: string;
  position: string;
  avatar?: string;
  currentScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  strengths: string[];
  improvements: string[];
  evaluationCount: number;
  lastEvaluation: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface DepartmentPerformance {
  name: string;
  avgScore: number;
  employeeCount: number;
  topPerformers: number;
  needsImprovement: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
}

interface CompetencyPerformance {
  name: string;
  avgScore: number;
  distribution: {
    excellent: number;
    good: number;
    average: number;
    needsWork: number;
  };
}

const PerformanceReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewType, setViewType] = useState<'individual' | 'department' | 'competency'>('individual');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'trend'>('score');

  // Mock data
  const employeeReports: EmployeeReport[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      department: 'Projects',
      position: 'Project Lead',
      currentScore: 4.5,
      previousScore: 4.2,
      trend: 'up',
      strengths: ['Leadership', 'Communication', 'Problem Solving'],
      improvements: ['Time Management'],
      evaluationCount: 3,
      lastEvaluation: '2024-09-15',
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'Mike Chen',
      department: 'Operations',
      position: 'Operations Manager',
      currentScore: 4.1,
      previousScore: 4.0,
      trend: 'up',
      strengths: ['Technical Skills', 'Reliability'],
      improvements: ['Leadership', 'Communication'],
      evaluationCount: 2,
      lastEvaluation: '2024-09-10',
      riskLevel: 'low'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      department: 'Community',
      position: 'Community Coordinator',
      currentScore: 3.8,
      previousScore: 4.1,
      trend: 'down',
      strengths: ['Teamwork', 'Adaptability'],
      improvements: ['Technical Skills', 'Initiative'],
      evaluationCount: 2,
      lastEvaluation: '2024-09-12',
      riskLevel: 'medium'
    },
    {
      id: '4',
      name: 'David Kim',
      department: 'Communications',
      position: 'Content Manager',
      currentScore: 3.5,
      previousScore: 3.3,
      trend: 'up',
      strengths: ['Creativity', 'Communication'],
      improvements: ['Technical Skills', 'Leadership'],
      evaluationCount: 2,
      lastEvaluation: '2024-09-08',
      riskLevel: 'medium'
    },
    {
      id: '5',
      name: 'Alex Thompson',
      department: 'Operations',
      position: 'Senior Volunteer',
      currentScore: 3.2,
      previousScore: 3.8,
      trend: 'down',
      strengths: ['Reliability'],
      improvements: ['Communication', 'Problem Solving', 'Initiative'],
      evaluationCount: 2,
      lastEvaluation: '2024-09-14',
      riskLevel: 'high'
    }
  ];

  const departmentPerformance: DepartmentPerformance[] = [
    {
      name: 'Projects',
      avgScore: 4.3,
      employeeCount: 15,
      topPerformers: 8,
      needsImprovement: 2,
      trend: 'up',
      trendValue: 0.2
    },
    {
      name: 'Operations',
      avgScore: 3.9,
      employeeCount: 12,
      topPerformers: 5,
      needsImprovement: 3,
      trend: 'stable',
      trendValue: 0.0
    },
    {
      name: 'Community',
      avgScore: 4.1,
      employeeCount: 18,
      topPerformers: 9,
      needsImprovement: 2,
      trend: 'up',
      trendValue: 0.1
    },
    {
      name: 'Communications',
      avgScore: 3.8,
      employeeCount: 10,
      topPerformers: 4,
      needsImprovement: 3,
      trend: 'down',
      trendValue: -0.1
    }
  ];

  const competencyPerformance: CompetencyPerformance[] = [
    {
      name: 'Leadership',
      avgScore: 4.1,
      distribution: { excellent: 35, good: 40, average: 20, needsWork: 5 }
    },
    {
      name: 'Communication',
      avgScore: 4.2,
      distribution: { excellent: 40, good: 35, average: 20, needsWork: 5 }
    },
    {
      name: 'Technical Skills',
      avgScore: 3.8,
      distribution: { excellent: 25, good: 35, average: 30, needsWork: 10 }
    },
    {
      name: 'Teamwork',
      avgScore: 4.3,
      distribution: { excellent: 45, good: 35, average: 15, needsWork: 5 }
    },
    {
      name: 'Problem Solving',
      avgScore: 3.9,
      distribution: { excellent: 30, good: 40, average: 25, needsWork: 5 }
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', value?: number) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  const getRiskColor = (risk: 'low' | 'medium' | 'high'): string => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredEmployees = employeeReports
    .filter(emp => selectedDepartment === 'all' || emp.department === selectedDepartment)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'score': return b.currentScore - a.currentScore;
        case 'trend': 
          if (a.trend === b.trend) return b.currentScore - a.currentScore;
          if (a.trend === 'up') return -1;
          if (b.trend === 'up') return 1;
          if (a.trend === 'stable') return -1;
          return 1;
        default: return 0;
      }
    });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive performance analysis and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
          >
            <option value="current">Current Period</option>
            <option value="previous">Previous Period</option>
            <option value="comparison">Period Comparison</option>
          </select>
          <button className="btn-living px-6 py-2 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-living-green-600">4.0</p>
            </div>
            <div className="p-3 bg-living-green-50 rounded-full">
              <Target className="w-6 h-6 text-living-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600">+0.2 from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Performers</p>
              <p className="text-3xl font-bold text-emerald-600">26</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">47% of total workforce</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Need Improvement</p>
              <p className="text-3xl font-bold text-yellow-600">10</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">18% of workforce</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Risk</p>
              <p className="text-3xl font-bold text-red-600">3</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-red-600">Require immediate attention</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewType('individual')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'individual'
                    ? 'bg-white text-living-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Individual Reports
              </button>
              <button
                onClick={() => setViewType('department')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'department'
                    ? 'bg-white text-living-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Department Analysis
              </button>
              <button
                onClick={() => setViewType('competency')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewType === 'competency'
                    ? 'bg-white text-living-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Competency Breakdown
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {viewType === 'individual' && (
              <>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
                >
                  <option value="all">All Departments</option>
                  <option value="Projects">Projects</option>
                  <option value="Operations">Operations</option>
                  <option value="Community">Community</option>
                  <option value="Communications">Communications</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'score' | 'trend')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
                >
                  <option value="score">Sort by Score</option>
                  <option value="name">Sort by Name</option>
                  <option value="trend">Sort by Trend</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Individual Reports View */}
      {viewType === 'individual' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Individual Performance Reports ({filteredEmployees.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-living-green-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-living-green-700">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(employee.riskLevel)}`}>
                          {employee.riskLevel} risk
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {employee.position} • {employee.department}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Performance Score</p>
                          <div className="flex items-center space-x-3">
                            <span className={`text-2xl font-bold ${getScoreColor(employee.currentScore)}`}>
                              {employee.currentScore}
                            </span>
                            <div className="flex items-center space-x-1">
                              {getTrendIcon(employee.trend)}
                              <span className={`text-sm ${
                                employee.trend === 'up' ? 'text-green-600' :
                                employee.trend === 'down' ? 'text-red-600' :
                                'text-gray-600'
                              }`}>
                                {employee.trend === 'up' ? '+' : employee.trend === 'down' ? '-' : ''}
                                {Math.abs(employee.currentScore - employee.previousScore).toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Key Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.strengths.slice(0, 2).map((strength, index) => (
                              <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                {strength}
                              </span>
                            ))}
                            {employee.strengths.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{employee.strengths.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Improvement Areas</p>
                          <div className="flex flex-wrap gap-1">
                            {employee.improvements.slice(0, 2).map((improvement, index) => (
                              <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                {improvement}
                              </span>
                            ))}
                            {employee.improvements.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{employee.improvements.length - 2} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{employee.evaluationCount} evaluations</span>
                          <span>Last: {new Date(employee.lastEvaluation).toLocaleDateString()}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
                            View Details
                          </button>
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Create Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Department Analysis View */}
      {viewType === 'department' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departmentPerformance.map((dept, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(dept.trend, dept.trendValue)}
                  <span className={`text-sm ${
                    dept.trend === 'up' ? 'text-green-600' :
                    dept.trend === 'down' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {dept.trendValue > 0 ? '+' : ''}{dept.trendValue.toFixed(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(dept.avgScore)}`}>
                    {dept.avgScore}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Performers</span>
                    <span className="font-semibold text-emerald-600">{dept.topPerformers}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full" 
                      style={{ width: `${(dept.topPerformers / dept.employeeCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Need Improvement</span>
                    <span className="font-semibold text-yellow-600">{dept.needsImprovement}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(dept.needsImprovement / dept.employeeCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total Employees</span>
                    <span className="font-semibold">{dept.employeeCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Competency Breakdown View */}
      {viewType === 'competency' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Competency Performance Analysis</h2>
          
          <div className="space-y-6">
            {competencyPerformance.map((competency, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{competency.name}</h3>
                  <span className={`text-lg font-bold ${getScoreColor(competency.avgScore)}`}>
                    {competency.avgScore}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {competency.distribution.excellent}%
                    </div>
                    <div className="text-xs text-gray-600">Excellent</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full" 
                        style={{ width: `${competency.distribution.excellent}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {competency.distribution.good}%
                    </div>
                    <div className="text-xs text-gray-600">Good</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${competency.distribution.good}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      {competency.distribution.average}%
                    </div>
                    <div className="text-xs text-gray-600">Average</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${competency.distribution.average}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {competency.distribution.needsWork}%
                    </div>
                    <div className="text-xs text-gray-600">Needs Work</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${competency.distribution.needsWork}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceReports;