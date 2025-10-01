import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, User, Eye, MessageSquare, Filter, Search, Calendar } from 'lucide-react';

// Interfaces para el tipado
interface PendingEvaluation {
  id: string;
  employeeName: string;
  employeeId: string;
  evaluatorName: string;
  department: string;
  type: 'self' | 'supervisor' | 'peer' | '360';
  submittedAt: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending_review' | 'in_review' | 'needs_clarification' | 'approved';
  overallScore: number;
  completionTime: string;
}

interface ReviewAction {
  id: string;
  type: 'approve' | 'reject' | 'request_clarification';
  comment?: string;
  assignFollowUp?: string;
}

const EvaluationProcessor = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data para evaluaciones pendientes
  const pendingEvaluations: PendingEvaluation[] = [
    {
      id: 'eval_001',
      employeeName: 'Sarah Johnson',
      employeeId: 'EMP_001',
      evaluatorName: 'Mike Chen (Self)',
      department: 'Projects',
      type: 'self',
      submittedAt: '2024-09-15T10:30:00Z',
      priority: 'high',
      status: 'pending_review',
      overallScore: 4.2,
      completionTime: '25 mins'
    },
    {
      id: 'eval_002',
      employeeName: 'David Kim',
      employeeId: 'EMP_002',
      evaluatorName: 'Sarah Johnson',
      department: 'Communications',
      type: 'supervisor',
      submittedAt: '2024-09-14T15:45:00Z',
      priority: 'medium',
      status: 'in_review',
      overallScore: 3.8,
      completionTime: '18 mins'
    },
    {
      id: 'eval_003',
      employeeName: 'Emily Rodriguez',
      employeeId: 'EMP_003',
      evaluatorName: 'Team Lead',
      department: 'Community',
      type: 'peer',
      submittedAt: '2024-09-14T09:15:00Z',
      priority: 'low',
      status: 'needs_clarification',
      overallScore: 4.5,
      completionTime: '32 mins'
    },
    {
      id: 'eval_004',
      employeeName: 'Alex Thompson',
      employeeId: 'EMP_004',
      evaluatorName: 'Multiple Evaluators',
      department: 'Operations',
      type: '360',
      submittedAt: '2024-09-13T14:20:00Z',
      priority: 'high',
      status: 'pending_review',
      overallScore: 4.1,
      completionTime: '45 mins'
    },
    {
      id: 'eval_005',
      employeeName: 'Maria Garcia',
      employeeId: 'EMP_005',
      evaluatorName: 'John Smith',
      department: 'Projects',
      type: 'supervisor',
      submittedAt: '2024-09-13T11:00:00Z',
      priority: 'medium',
      status: 'approved',
      overallScore: 4.3,
      completionTime: '22 mins'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Evaluations', count: pendingEvaluations.length },
    { value: 'pending_review', label: 'Pending Review', count: pendingEvaluations.filter(e => e.status === 'pending_review').length },
    { value: 'in_review', label: 'In Review', count: pendingEvaluations.filter(e => e.status === 'in_review').length },
    { value: 'needs_clarification', label: 'Needs Clarification', count: pendingEvaluations.filter(e => e.status === 'needs_clarification').length },
    { value: 'high_priority', label: 'High Priority', count: pendingEvaluations.filter(e => e.priority === 'high').length }
  ];

  const getStatusColor = (status: PendingEvaluation['status']): string => {
    switch (status) {
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'needs_clarification': return 'bg-red-100 text-red-800';
      case 'approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: PendingEvaluation['priority']): string => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const getTypeIcon = (type: PendingEvaluation['type']) => {
    switch (type) {
      case 'self': return <User className="w-4 h-4" />;
      case 'supervisor': return <Eye className="w-4 h-4" />;
      case 'peer': return <MessageSquare className="w-4 h-4" />;
      case '360': return <CheckCircle className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const filteredEvaluations = pendingEvaluations.filter(evaluation => {
    const matchesFilter = selectedFilter === 'all' || 
      evaluation.status === selectedFilter || 
      (selectedFilter === 'high_priority' && evaluation.priority === 'high');
    
    const matchesSearch = evaluation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.evaluatorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleReviewAction = (evaluationId: string, action: ReviewAction) => {
    console.log('Processing review action:', { evaluationId, action });
    // Aquí iría la lógica para procesar la acción
    setShowReviewModal(false);
    setSelectedEvaluation(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evaluation Processor</h1>
          <p className="text-gray-600 mt-2">Review, analyze and process submitted evaluations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Schedule Review</span>
          </button>
          <button className="btn-living px-6 py-2">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">
                {pendingEvaluations.filter(e => e.status === 'pending_review').length}
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
              <p className="text-sm font-medium text-gray-600">In Review</p>
              <p className="text-3xl font-bold text-blue-600">
                {pendingEvaluations.filter(e => e.status === 'in_review').length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Need Clarification</p>
              <p className="text-3xl font-bold text-red-600">
                {pendingEvaluations.filter(e => e.status === 'needs_clarification').length}
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
              <p className="text-sm font-medium text-gray-600">Processed Today</p>
              <p className="text-3xl font-bold text-emerald-600">12</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedFilter === option.value
                      ? 'bg-living-green-100 text-living-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search evaluations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>

      {/* Evaluations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Evaluations Queue ({filteredEvaluations.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEvaluations.map((evaluation) => (
            <div
              key={evaluation.id}
              className={`p-6 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(evaluation.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(evaluation.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{evaluation.employeeName}</h3>
                      <p className="text-sm text-gray-600">
                        {evaluation.department} • Evaluated by {evaluation.evaluatorName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Overall Score</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">{evaluation.overallScore}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-living-green-500 h-2 rounded-full" 
                            style={{ width: `${(evaluation.overallScore / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Completion Time</p>
                      <p className="font-medium text-gray-900">{evaluation.completionTime}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Submitted</p>
                      <p className="font-medium text-gray-900">{formatDate(evaluation.submittedAt)}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Priority</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        evaluation.priority === 'high' ? 'bg-red-100 text-red-800' :
                        evaluation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {evaluation.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                    {evaluation.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedEvaluation(evaluation.id);
                        setShowReviewModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-living-green-600 transition-colors"
                      title="Review Evaluation"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Add Comment"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    
                    {evaluation.status === 'pending_review' && (
                      <button
                        onClick={() => handleReviewAction(evaluation.id, { id: 'quick_approve', type: 'approve' })}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                        title="Quick Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEvaluations.length === 0 && (
          <div className="p-12 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No evaluations found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {/* Review Modal - Placeholder */}
      {showReviewModal && selectedEvaluation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Review Evaluation</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Detailed evaluation review interface would go here with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Competency scores breakdown</li>
                <li>Comments and feedback</li>
                <li>Historical comparison</li>
                <li>Action buttons (Approve, Reject, Request Clarification)</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReviewAction(selectedEvaluation, { id: 'approve', type: 'approve' })}
                className="btn-living px-4 py-2"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationProcessor;