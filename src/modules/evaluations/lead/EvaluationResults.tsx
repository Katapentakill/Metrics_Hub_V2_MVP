import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, Download, Star, Target, Users } from 'lucide-react';

// Interfaces para el tipado
interface EvaluationResult {
  id: string;
  employeeName: string;
  position: string;
  evaluationDate: string;
  period: string;
  overallScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  competencyScores: CompetencyScore[];
  performanceAreas: PerformanceArea[];
  goals: number;
  strengths: string[];
  improvements: string[];
  status: 'completed' | 'shared' | 'acknowledged';
}

interface CompetencyScore {
  name: string;
  score: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
}

interface PerformanceArea {
  name: string;
  score: number;
  benchmark: number;
}

interface TeamAnalytics {
  avgScore: number;
  avgImprovement: number;
  topPerformer: string;
  mostImproved: string;
  completionRate: number;
  teamMorale: number;
}

interface TrendData {
  period: string;
  avgScore: number;
  improvement: number;
}

const EvaluationResults = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024-Q4');
  const [selectedView, setSelectedView] = useState<'individual' | 'team' | 'trends'>('individual');

  // Mock data
  const teamAnalytics: TeamAnalytics = {
    avgScore: 4.1,
    avgImprovement: 0.3,
    topPerformer: 'Sarah Johnson',
    mostImproved: 'Alex Thompson',
    completionRate: 87,
    teamMorale: 4.4
  };

  const evaluationResults: EvaluationResult[] = [
    {
      id: 'eval_001',
      employeeName: 'Sarah Johnson',
      position: 'Senior Developer',
      evaluationDate: '2024-09-15',
      period: '2024-Q3',
      overallScore: 4.5,
      previousScore: 4.2,
      trend: 'up',
      competencyScores: [
        { name: 'Technical Skills', score: 4.8, previousScore: 4.5, trend: 'up' },
        { name: 'Communication', score: 4.3, previousScore: 4.0, trend: 'up' },
        { name: 'Leadership', score: 4.6, previousScore: 4.3, trend: 'up' },
        { name: 'Problem Solving', score: 4.4, previousScore: 4.1, trend: 'up' },
        { name: 'Adaptability', score: 4.2, previousScore: 4.0, trend: 'up' }
      ],
      performanceAreas: [
        { name: 'Work Quality', score: 4.7, benchmark: 4.0 },
        { name: 'Teamwork', score: 4.4, benchmark: 4.0 },
        { name: 'Communication', score: 4.3, benchmark: 4.0 },
        { name: 'Initiative', score: 4.5, benchmark: 4.0 },
        { name: 'Reliability', score: 4.8, benchmark: 4.0 }
      ],
      goals: 3,
      strengths: ['Technical Leadership', 'Problem Solving', 'Mentoring'],
      improvements: ['Time Management'],
      status: 'completed'
    },
    {
      id: 'eval_002',
      employeeName: 'Mike Chen',
      position: 'UI/UX Designer',
      evaluationDate: '2024-09-12',
      period: '2024-Q3',
      overallScore: 4.1,
      previousScore: 4.0,
      trend: 'up',
      competencyScores: [
        { name: 'Technical Skills', score: 4.3, previousScore: 4.2, trend: 'up' },
        { name: 'Communication', score: 3.8, previousScore: 3.6, trend: 'up' },
        { name: 'Leadership', score: 3.9, previousScore: 3.9, trend: 'stable' },
        { name: 'Problem Solving', score: 4.2, previousScore: 4.1, trend: 'up' },
        { name: 'Adaptability', score: 4.3, previousScore: 4.2, trend: 'up' }
      ],
      performanceAreas: [
        { name: 'Work Quality', score: 4.4, benchmark: 4.0 },
        { name: 'Teamwork', score: 3.9, benchmark: 4.0 },
        { name: 'Communication', score: 3.8, benchmark: 4.0 },
        { name: 'Initiative', score: 4.0, benchmark: 4.0 },
        { name: 'Reliability', score: 4.2, benchmark: 4.0 }
      ],
      goals: 2,
      strengths: ['Creative Design', 'User Research'],
      improvements: ['Communication', 'Deadline Management'],
      status: 'shared'
    },
    {
      id: 'eval_003',
      employeeName: 'Emily Rodriguez',
      position: 'Content Specialist',
      evaluationDate: '2024-09-08',
      period: '2024-Q3',
      overallScore: 3.8,
      previousScore: 4.1,
      trend: 'down',
      competencyScores: [
        { name: 'Technical Skills', score: 3.5, previousScore: 3.8, trend: 'down' },
        { name: 'Communication', score: 4.0, previousScore: 4.2, trend: 'down' },
        { name: 'Leadership', score: 3.6, previousScore: 4.0, trend: 'down' },
        { name: 'Problem Solving', score: 3.7, previousScore: 4.0, trend: 'down' },
        { name: 'Adaptability', score: 4.1, previousScore: 4.3, trend: 'down' }
      ],
      performanceAreas: [
        { name: 'Work Quality', score: 3.9, benchmark: 4.0 },
        { name: 'Teamwork', score: 3.6, benchmark: 4.0 },
        { name: 'Communication', score: 4.0, benchmark: 4.0 },
        { name: 'Initiative', score: 3.5, benchmark: 4.0 },
        { name: 'Reliability', score: 3.8, benchmark: 4.0 }
      ],
      goals: 4,
      strengths: ['Content Creation', 'Social Media'],
      improvements: ['Project Coordination', 'Initiative', 'Technical Skills'],
      status: 'acknowledged'
    },
    {
      id: 'eval_004',
      employeeName: 'Alex Thompson',
      position: 'Junior Developer',
      evaluationDate: '2024-09-10',
      period: '2024-Q3',
      overallScore: 3.6,
      previousScore: 3.4,
      trend: 'up',
      competencyScores: [
        { name: 'Technical Skills', score: 3.8, previousScore: 3.5, trend: 'up' },
        { name: 'Communication', score: 3.4, previousScore: 3.2, trend: 'up' },
        { name: 'Leadership', score: 3.2, previousScore: 3.0, trend: 'up' },
        { name: 'Problem Solving', score: 3.7, previousScore: 3.6, trend: 'up' },
        { name: 'Adaptability', score: 3.9, previousScore: 3.7, trend: 'up' }
      ],
      performanceAreas: [
        { name: 'Work Quality', score: 3.8, benchmark: 4.0 },
        { name: 'Teamwork', score: 3.5, benchmark: 4.0 },
        { name: 'Communication', score: 3.4, benchmark: 4.0 },
        { name: 'Initiative', score: 3.6, benchmark: 4.0 },
        { name: 'Reliability', score: 3.7, benchmark: 4.0 }
      ],
      goals: 3,
      strengths: ['Learning Agility', 'Code Quality'],
      improvements: ['Communication', 'Independence', 'Leadership'],
      status: 'completed'
    }
  ];

  const getStatusColor = (status: EvaluationResult['status']): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shared': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable', size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    if (trend === 'up') return <TrendingUp className={`${sizeClass} text-green-500`} />;
    if (trend === 'down') return <TrendingDown className={`${sizeClass} text-red-500`} />;
    return <div className={`${sizeClass} bg-gray-400 rounded-full`}></div>;
  };

  const getScoreColor = (score: number, benchmark?: number): string => {
    if (benchmark && score < benchmark) return 'text-red-600';
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const generateTeamTrends = (): TrendData[] => {
    const periods = ['2024-Q1', '2024-Q2', '2024-Q3'];
    return periods.map(period => ({
      period,
      avgScore: 3.8 + Math.random() * 0.6,
      improvement: (Math.random() - 0.5) * 0.4
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evaluation Results</h1>
          <p className="text-gray-600 mt-2">Review team performance results and analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500"
          >
            <option value="2024-Q4">Q4 2024</option>
            <option value="2024-Q3">Q3 2024</option>
            <option value="2024-Q2">Q2 2024</option>
            <option value="2024-Q1">Q1 2024</option>
          </select>
          <button className="btn-living px-6 py-2 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Results</span>
          </button>
        </div>
      </div>

      {/* Team Analytics Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Team Performance Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="text-center">
            <div className="p-3 bg-living-green-50 rounded-full w-fit mx-auto mb-3">
              <Star className="w-6 h-6 text-living-green-600" />
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(teamAnalytics.avgScore)}`}>
              {teamAnalytics.avgScore}
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>

          <div className="text-center">
            <div className="p-3 bg-emerald-50 rounded-full w-fit mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">+{teamAnalytics.avgImprovement}</div>
            <div className="text-sm text-gray-600">Avg Improvement</div>
          </div>

          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-full w-fit mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{teamAnalytics.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>

          <div className="text-center">
            <div className="p-3 bg-purple-50 rounded-full w-fit mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{teamAnalytics.teamMorale}</div>
            <div className="text-sm text-gray-600">Team Morale</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Top Performer</div>
            <div className="font-semibold text-gray-900">{teamAnalytics.topPerformer}</div>
          </div>

          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Most Improved</div>
            <div className="font-semibold text-gray-900">{teamAnalytics.mostImproved}</div>
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { value: 'individual', label: 'Individual Results' },
              { value: 'team', label: 'Team Analytics' },
              { value: 'trends', label: 'Performance Trends' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedView(option.value as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === option.value
                    ? 'bg-white text-living-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Results View */}
      {selectedView === 'individual' && (
        <div className="space-y-6">
          {evaluationResults.map((result) => (
            <div key={result.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Employee Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-living-green-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-living-green-700">
                        {result.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{result.employeeName}</h3>
                      <p className="text-sm text-gray-600">{result.position}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}
                        </span>
                        {getTrendIcon(result.trend, 'md')}
                      </div>
                      <div className="text-sm text-gray-600">
                        Previous: {result.previousScore} ({result.trend === 'up' ? '+' : result.trend === 'down' ? '' : '±'}{Math.abs(result.overallScore - result.previousScore).toFixed(1)})
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  Evaluated on {formatDate(result.evaluationDate)} • Period: {result.period}
                </div>
              </div>

              {/* Detailed Results */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Competency Scores */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Competency Scores</h4>
                    <div className="space-y-3">
                      {result.competencyScores.map((comp, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <span className="text-sm text-gray-700 min-w-0 flex-1">{comp.name}</span>
                            {getTrendIcon(comp.trend)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${getScoreColor(comp.score)}`}>
                              {comp.score}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-living-green-500 h-2 rounded-full" 
                                style={{ width: `${(comp.score / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Areas */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Performance Areas</h4>
                    <div className="space-y-3">
                      {result.performanceAreas.map((area, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700 flex-1">{area.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-semibold ${getScoreColor(area.score, area.benchmark)}`}>
                              {area.score}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  area.score >= area.benchmark ? 'bg-green-500' : 'bg-yellow-500'
                                }`}
                                style={{ width: `${(area.score / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.strengths.map((strength, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Improvement Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.improvements.map((improvement, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          {improvement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Goals Count */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Development Goals Set</span>
                    <span className="font-semibold text-living-green-600">{result.goals} goals</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Team Analytics View */}
      {selectedView === 'team' && (
        <div className="space-y-6">
          {/* Competency Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Team Competency Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {['Technical Skills', 'Communication', 'Leadership', 'Problem Solving', 'Adaptability'].map((competency, index) => {
                const scores = evaluationResults.map(r => r.competencyScores.find(c => c.name === competency)?.score || 0);
                const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
                return (
                  <div key={competency} className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-3">{competency}</h4>
                    <div className={`text-3xl font-bold mb-2 ${getScoreColor(avgScore)}`}>
                      {avgScore.toFixed(1)}
                    </div>
                    <div className="space-y-1">
                      {[5, 4, 3, 2, 1].map(level => {
                        const count = scores.filter(score => Math.floor(score) === level).length;
                        const percentage = (count / scores.length) * 100;
                        return (
                          <div key={level} className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 w-3">{level}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  level >= 4 ? 'bg-emerald-500' : 
                                  level >= 3 ? 'bg-green-500' : 
                                  level >= 2 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Score Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { range: '4.5-5.0', label: 'Exceptional', color: 'bg-emerald-500', count: evaluationResults.filter(r => r.overallScore >= 4.5).length },
                { range: '4.0-4.4', label: 'Exceeds Expectations', color: 'bg-green-500', count: evaluationResults.filter(r => r.overallScore >= 4.0 && r.overallScore < 4.5).length },
                { range: '3.5-3.9', label: 'Meets Expectations', color: 'bg-yellow-500', count: evaluationResults.filter(r => r.overallScore >= 3.5 && r.overallScore < 4.0).length },
                { range: '<3.5', label: 'Needs Improvement', color: 'bg-red-500', count: evaluationResults.filter(r => r.overallScore < 3.5).length }
              ].map((category, index) => (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{category.count}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{category.label}</h4>
                  <p className="text-sm text-gray-600">{category.range}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((category.count / evaluationResults.length) * 100)}% of team
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trends View */}
      {selectedView === 'trends' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Trends Over Time</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {generateTeamTrends().map((trend, index) => (
                <div key={trend.period} className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900 mb-2">{trend.period}</div>
                  <div className={`text-2xl font-bold ${getScoreColor(trend.avgScore)}`}>
                    {trend.avgScore.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    {getTrendIcon(trend.improvement > 0 ? 'up' : trend.improvement < 0 ? 'down' : 'stable')}
                    <span className={`text-sm ${
                      trend.improvement > 0 ? 'text-green-600' :
                      trend.improvement < 0 ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {trend.improvement > 0 ? '+' : ''}{trend.improvement.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Individual Progress Tracking</h4>
              <div className="space-y-4">
                {evaluationResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-living-green-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-living-green-700 text-sm">
                          {result.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{result.employeeName}</div>
                        <div className="text-sm text-gray-600">{result.position}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Previous</div>
                        <div className={`font-semibold ${getScoreColor(result.previousScore)}`}>
                          {result.previousScore}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(result.trend)}
                        <span className={`text-sm font-medium ${
                          result.trend === 'up' ? 'text-green-600' :
                          result.trend === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {result.trend === 'up' ? '+' : result.trend === 'down' ? '' : '±'}{Math.abs(result.overallScore - result.previousScore).toFixed(1)}
                        </span>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-500">Current</div>
                        <div className={`font-semibold ${getScoreColor(result.overallScore)}`}>
                          {result.overallScore}
                        </div>
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
  );
};

export default EvaluationResults;