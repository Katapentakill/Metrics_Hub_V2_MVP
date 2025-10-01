import React, { useState } from 'react';
import { Users, Star, Clock, CheckCircle, AlertTriangle, Calendar, Target, TrendingUp, MessageSquare } from 'lucide-react';

// Interfaces para el tipado
interface TeamMember {
  id: string;
  name: string;
  position: string;
  avatar?: string;
  currentScore: number;
  previousScore: number;
  trend: 'up' | 'down' | 'stable';
  evaluationStatus: 'pending' | 'in_progress' | 'completed' | 'overdue';
  lastEvaluation: string;
  nextDue: string;
  projectContribution: number;
  strengths: string[];
  improvements: string[];
  workload: 'light' | 'moderate' | 'heavy' | 'overloaded';
}

interface ProjectMetrics {
  projectName: string;
  teamSize: number;
  avgPerformance: number;
  completedEvaluations: number;
  pendingEvaluations: number;
  teamMorale: number;
  deliveryRate: number;
}

const TeamEvaluations = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data
  const projectMetrics: ProjectMetrics = {
    projectName: 'Community Outreach Platform',
    teamSize: 8,
    avgPerformance: 4.2,
    completedEvaluations: 6,
    pendingEvaluations: 2,
    teamMorale: 4.4,
    deliveryRate: 92
  };

  const teamMembers: TeamMember[] = [
    {
      id: 'tm_001',
      name: 'Sarah Johnson',
      position: 'Senior Developer',
      currentScore: 4.5,
      previousScore: 4.2,
      trend: 'up',
      evaluationStatus: 'completed',
      lastEvaluation: '2024-09-15',
      nextDue: '2024-11-15',
      projectContribution: 95,
      strengths: ['Technical Leadership', 'Problem Solving', 'Mentoring'],
      improvements: ['Time Management'],
      workload: 'moderate'
    },
    {
      id: 'tm_002',
      name: 'Mike Chen',
      position: 'UI/UX Designer',
      currentScore: 4.1,
      previousScore: 4.0,
      trend: 'up',
      evaluationStatus: 'pending',
      lastEvaluation: '2024-07-15',
      nextDue: '2024-09-30',
      projectContribution: 88,
      strengths: ['Creative Design', 'User Research'],
      improvements: ['Communication', 'Deadline Management'],
      workload: 'heavy'
    },
    {
      id: 'tm_003',
      name: 'Emily Rodriguez',
      position: 'Content Specialist',
      currentScore: 3.8,
      previousScore: 4.1,
      trend: 'down',
      evaluationStatus: 'overdue',
      lastEvaluation: '2024-07-01',
      nextDue: '2024-09-01',
      projectContribution: 72,
      strengths: ['Content Creation', 'Social Media'],
      improvements: ['Project Coordination', 'Initiative'],
      workload: 'light'
    },
    {
      id: 'tm_004',
      name: 'David Kim',
      position: 'Marketing Coordinator',
      currentScore: 4.3,
      previousScore: 4.2,
      trend: 'up',
      evaluationStatus: 'in_progress',
      lastEvaluation: '2024-09-10',
      nextDue: '2024-11-10',
      projectContribution: 90,
      strengths: ['Strategic Planning', 'Team Collaboration'],
      improvements: ['Technical Skills'],
      workload: 'moderate'
    },
    {
      id: 'tm_005',
      name: 'Alex Thompson',
      position: 'Junior Developer',
      currentScore: 3.6,
      previousScore: 3.4,
      trend: 'up',
      evaluationStatus: 'pending',
      lastEvaluation: '2024-08-20',
      nextDue: '2024-10-20',
      projectContribution: 78,
      strengths: ['Learning Agility', 'Code Quality'],
      improvements: ['Communication', 'Independence'],
      workload: 'moderate'
    },
    {
      id: 'tm_006',
      name: 'Lisa Wang',
      position: 'Project Coordinator',
      currentScore: 4.4,
      previousScore: 4.3,
      trend: 'up',
      evaluationStatus: 'completed',
      lastEvaluation: '2024-09-12',
      nextDue: '2024-11-12',
      projectContribution: 93,
      strengths: ['Organization', 'Communication', 'Leadership'],
      improvements: ['Technical Understanding'],
      workload: 'heavy'
    }
  ];

  const getStatusColor = (status: TeamMember['evaluationStatus']): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: TeamMember['trend']) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
  };

  const getWorkloadColor = (workload: TeamMember['workload']): string => {
    switch (workload) {
      case 'light': return 'bg-blue-100 text-blue-800';
      case 'moderate': return 'bg-green-100 text-green-800';
      case 'heavy': return 'bg-yellow-100 text-yellow-800';
      case 'overloaded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredMembers = teamMembers.filter(member => {
    if (filterStatus === 'all') return true;
    return member.evaluationStatus === filterStatus;
  });

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Evaluations</h1>
          <p className="text-gray-600 mt-2">Manage and track your team's performance evaluations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Schedule Reviews</span>
          </button>
          <button className="btn-living px-6 py-2">
            Start Evaluation
          </button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{projectMetrics.projectName}</h2>
            <p className="text-gray-600">Team Performance Overview</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-4 bg-living-green-50 rounded-xl mb-3">
              <Users className="w-8 h-8 text-living-green-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{projectMetrics.teamSize}</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>

          <div className="text-center">
            <div className="p-4 bg-blue-50 rounded-xl mb-3">
              <Star className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{projectMetrics.avgPerformance}</div>
            <div className="text-sm text-gray-600">Avg Performance</div>
          </div>

          <div className="text-center">
            <div className="p-4 bg-emerald-50 rounded-xl mb-3">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{projectMetrics.completedEvaluations}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>

          <div className="text-center">
            <div className="p-4 bg-yellow-50 rounded-xl mb-3">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{projectMetrics.pendingEvaluations}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-100">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Team Morale</span>
              <span className="font-semibold text-living-green-600">{projectMetrics.teamMorale}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-living-green-500 h-2 rounded-full" 
                style={{ width: `${(projectMetrics.teamMorale / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Delivery Rate</span>
              <span className="font-semibold text-blue-600">{projectMetrics.deliveryRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${projectMetrics.deliveryRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'All Members' },
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'overdue', label: 'Overdue' }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === filter.value
                      ? 'bg-living-green-100 text-living-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label} ({teamMembers.filter(m => filter.value === 'all' || m.evaluationStatus === filter.value).length})
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : ''
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-md text-sm ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : ''
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-living-green-100 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-living-green-700">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.evaluationStatus)}`}>
                  {member.evaluationStatus.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${getScoreColor(member.currentScore)}`}>
                      {member.currentScore}
                    </span>
                    {getTrendIcon(member.trend)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Contribution</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900">{member.projectContribution}%</span>
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-living-green-500 h-2 rounded-full" 
                        style={{ width: `${member.projectContribution}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Workload</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(member.workload)}`}>
                    {member.workload}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Next Due</p>
                  <p className={`text-sm font-medium ${
                    member.evaluationStatus === 'overdue' ? 'text-red-600' :
                    calculateDaysUntil(member.nextDue) <= 7 ? 'text-yellow-600' :
                    'text-gray-900'
                  }`}>
                    {formatDate(member.nextDue)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({member.evaluationStatus === 'overdue' ? 
                        `${Math.abs(calculateDaysUntil(member.nextDue))} days overdue` :
                        `${calculateDaysUntil(member.nextDue)} days`
                      })
                    </span>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
                      View Details
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="Send Message">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-living-green-600 transition-colors" title="Start Evaluation">
                        <Target className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Team Members ({filteredMembers.length})</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-living-green-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-living-green-700">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>

                    <div className="grid grid-cols-4 gap-8 flex-1">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Performance</p>
                        <div className="flex items-center justify-center space-x-1 mt-1">
                          <span className={`font-bold ${getScoreColor(member.currentScore)}`}>
                            {member.currentScore}
                          </span>
                          {getTrendIcon(member.trend)}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-gray-500">Contribution</p>
                        <p className="font-semibold text-gray-900 mt-1">{member.projectContribution}%</p>
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-gray-500">Workload</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium mt-1 inline-block ${getWorkloadColor(member.workload)}`}>
                          {member.workload}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-gray-500">Next Due</p>
                        <p className="text-xs font-medium text-gray-900 mt-1">
                          {formatDate(member.nextDue)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 ml-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.evaluationStatus)}`}>
                      {member.evaluationStatus.replace('_', ' ')}
                    </span>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Send Message">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-living-green-600 transition-colors" title="Start Evaluation">
                        <Target className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium text-gray-900 mb-2">No team members found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default TeamEvaluations;