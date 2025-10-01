import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, ThumbsDown, Clock, CheckCircle, ArrowUp, ArrowDown, Users, Star } from 'lucide-react';

// Interfaces para el tipado
interface FeedbackItem {
  id: string;
  type: 'received' | 'given' | 'peer';
  direction: 'upward' | 'downward' | 'horizontal';
  fromUser: string;
  toUser: string;
  date: string;
  category: 'performance' | 'collaboration' | 'leadership' | 'communication' | 'general';
  rating?: number;
  content: string;
  status: 'pending' | 'acknowledged' | 'responded';
  isAnonymous: boolean;
  tags: string[];
}

interface FeedbackRequest {
  id: string;
  requestedFrom: string;
  requestedBy: string;
  dueDate: string;
  purpose: string;
  status: 'sent' | 'completed' | 'overdue';
  questions: string[];
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  relationship: 'direct_report' | 'peer' | 'manager';
}

const FeedbackManager = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'given' | 'requests'>('received');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'acknowledged'>('all');
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Mock data
  const teamMembers: TeamMember[] = [
    { id: 'tm_001', name: 'Sarah Johnson', position: 'Senior Developer', relationship: 'direct_report' },
    { id: 'tm_002', name: 'Mike Chen', position: 'UI/UX Designer', relationship: 'direct_report' },
    { id: 'tm_003', name: 'Emily Rodriguez', position: 'Content Specialist', relationship: 'direct_report' },
    { id: 'tm_004', name: 'David Kim', position: 'Marketing Lead', relationship: 'peer' },
    { id: 'tm_005', name: 'Lisa Wang', position: 'Operations Manager', relationship: 'manager' }
  ];

  const feedbackItems: FeedbackItem[] = [
    {
      id: 'fb_001',
      type: 'received',
      direction: 'upward',
      fromUser: 'Sarah Johnson',
      toUser: 'You',
      date: '2024-09-15',
      category: 'leadership',
      rating: 4,
      content: 'Your leadership during the recent project crisis was exceptional. You provided clear direction and kept the team motivated even when facing tight deadlines. I particularly appreciated how you shielded the team from external pressure while ensuring we stayed focused on quality deliverables.',
      status: 'acknowledged',
      isAnonymous: false,
      tags: ['leadership', 'crisis management', 'team support']
    },
    {
      id: 'fb_002',
      type: 'given',
      direction: 'downward',
      fromUser: 'You',
      toUser: 'Mike Chen',
      date: '2024-09-12',
      category: 'performance',
      rating: 4,
      content: 'Great improvement in meeting project deadlines this quarter. Your design work has been consistently high quality, and I appreciate the proactive communication about potential blockers. Consider taking on more client-facing responsibilities to further develop your presentation skills.',
      status: 'acknowledged',
      isAnonymous: false,
      tags: ['improvement', 'deadlines', 'quality work']
    },
    {
      id: 'fb_003',
      type: 'received',
      direction: 'upward',
      fromUser: 'Anonymous Team Member',
      toUser: 'You',
      date: '2024-09-10',
      category: 'communication',
      rating: 3,
      content: 'While you are knowledgeable and supportive, sometimes the feedback feels rushed during our one-on-ones. It would be helpful to have more structured discussions about career development and specific areas for improvement.',
      status: 'pending',
      isAnonymous: true,
      tags: ['communication', '1-on-1s', 'development']
    },
    {
      id: 'fb_004',
      type: 'received',
      direction: 'horizontal',
      fromUser: 'David Kim',
      toUser: 'You',
      date: '2024-09-08',
      category: 'collaboration',
      rating: 5,
      content: 'Excellent collaboration on the cross-functional marketing campaign. Your team delivered all technical requirements ahead of schedule, and the quality exceeded expectations. The regular sync meetings you organized kept everyone aligned and productive.',
      status: 'acknowledged',
      isAnonymous: false,
      tags: ['collaboration', 'cross-functional', 'delivery']
    },
    {
      id: 'fb_005',
      type: 'given',
      direction: 'downward',
      fromUser: 'You',
      toUser: 'Emily Rodriguez',
      date: '2024-09-05',
      category: 'performance',
      rating: 3,
      content: 'I noticed some challenges with project coordination lately. Your content quality remains excellent, but there have been a few missed deadlines that affected the team timeline. Let\'s discuss strategies for better time management and workload prioritization in our next one-on-one.',
      status: 'responded',
      isAnonymous: false,
      tags: ['time management', 'coordination', 'support needed']
    }
  ];

  const feedbackRequests: FeedbackRequest[] = [
    {
      id: 'req_001',
      requestedFrom: 'Sarah Johnson',
      requestedBy: 'You',
      dueDate: '2024-09-25',
      purpose: 'Q3 Performance Review Input',
      status: 'sent',
      questions: [
        'How would you rate my leadership effectiveness this quarter?',
        'What areas should I focus on for improvement?',
        'How well do I communicate project expectations?'
      ]
    },
    {
      id: 'req_002',
      requestedFrom: 'Mike Chen',
      requestedBy: 'You',
      dueDate: '2024-09-20',
      purpose: 'Project Retrospective Feedback',
      status: 'completed',
      questions: [
        'What went well in our recent project collaboration?',
        'Where could we improve our workflow?',
        'How satisfied are you with the support provided?'
      ]
    },
    {
      id: 'req_003',
      requestedFrom: 'Team (Anonymous)',
      requestedBy: 'You',
      dueDate: '2024-09-18',
      purpose: 'Leadership 360 Review',
      status: 'overdue',
      questions: [
        'Rate my overall leadership effectiveness',
        'What leadership qualities should I develop further?',
        'How can I better support team goals?'
      ]
    }
  ];

  const getCategoryIcon = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'performance': return <Star className="w-4 h-4" />;
      case 'leadership': return <Users className="w-4 h-4" />;
      case 'collaboration': return <MessageSquare className="w-4 h-4" />;
      case 'communication': return <Send className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getDirectionIcon = (direction: FeedbackItem['direction']) => {
    switch (direction) {
      case 'upward': return <ArrowUp className="w-4 h-4 text-blue-500" />;
      case 'downward': return <ArrowDown className="w-4 h-4 text-green-500" />;
      case 'horizontal': return <MessageSquare className="w-4 h-4 text-purple-500" />;
    }
  };

  const getStatusColor = (status: FeedbackItem['status'] | FeedbackRequest['status']): string => {
    switch (status) {
      case 'pending':
      case 'sent': return 'bg-yellow-100 text-yellow-800';
      case 'acknowledged':
      case 'completed': return 'bg-green-100 text-green-800';
      case 'responded': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredFeedback = feedbackItems.filter(item => {
    if (activeTab === 'received' && item.type !== 'received') return false;
    if (activeTab === 'given' && item.type !== 'given') return false;
    if (selectedFilter !== 'all' && item.status !== selectedFilter) return false;
    return true;
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAcknowledgeFeedback = (feedbackId: string) => {
    console.log('Acknowledging feedback:', feedbackId);
    // Here would be the API call to update feedback status
  };

  const handleRespondToFeedback = (feedbackId: string) => {
    console.log('Responding to feedback:', feedbackId);
    // Here would open a response modal or navigate to response page
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Manager</h1>
          <p className="text-gray-600 mt-2">Manage bidirectional feedback and team communication</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Request Feedback</span>
          </button>
          <button
            onClick={() => setShowComposeModal(true)}
            className="btn-living px-6 py-2 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Give Feedback</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Feedback Received</p>
              <p className="text-3xl font-bold text-blue-600">
                {feedbackItems.filter(f => f.type === 'received').length}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <ArrowUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              {feedbackItems.filter(f => f.type === 'received' && f.status === 'pending').length} pending
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Feedback Given</p>
              <p className="text-3xl font-bold text-green-600">
                {feedbackItems.filter(f => f.type === 'given').length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <ArrowDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              {feedbackItems.filter(f => f.type === 'given' && f.status === 'acknowledged').length} acknowledged
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Requests</p>
              <p className="text-3xl font-bold text-purple-600">
                {feedbackRequests.filter(r => r.status === 'sent').length}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-red-600">
              {feedbackRequests.filter(r => r.status === 'overdue').length} overdue
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-3xl font-bold text-living-green-600">
                {(feedbackItems
                  .filter(f => f.type === 'received' && f.rating)
                  .reduce((sum, f) => sum + (f.rating || 0), 0) / 
                  feedbackItems.filter(f => f.type === 'received' && f.rating).length
                ).toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-living-green-50 rounded-full">
              <Star className="w-6 h-6 text-living-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">From team feedback</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'received', name: 'Received', count: feedbackItems.filter(f => f.type === 'received').length },
              { id: 'given', name: 'Given', count: feedbackItems.filter(f => f.type === 'given').length },
              { id: 'requests', name: 'Requests', count: feedbackRequests.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-living-green-500 text-living-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Filters for Feedback Tabs */}
        {(activeTab === 'received' || activeTab === 'given') && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex space-x-2">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'acknowledged', label: 'Acknowledged' }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedFilter(filter.value as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      selectedFilter === filter.value
                        ? 'bg-living-green-100 text-living-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6">
          {/* Feedback Items (Received/Given) */}
          {(activeTab === 'received' || activeTab === 'given') && (
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center space-x-2">
                        {getDirectionIcon(feedback.direction)}
                        {getCategoryIcon(feedback.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-semibold text-gray-900">
                            {activeTab === 'received' ? `From: ${feedback.fromUser}` : `To: ${feedback.toUser}`}
                          </span>
                          {feedback.isAnonymous && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              Anonymous
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                            {feedback.status.replace('_', ' ')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="text-sm text-gray-600">{formatDate(feedback.date)}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                            {feedback.category}
                          </span>
                          {feedback.direction === 'upward' && (
                            <span className="text-xs text-blue-600 font-medium">Upward Feedback</span>
                          )}
                          {feedback.direction === 'horizontal' && (
                            <span className="text-xs text-purple-600 font-medium">Peer Feedback</span>
                          )}
                        </div>

                        {feedback.rating && (
                          <div className="flex items-center space-x-2 mb-3">
                            {getRatingStars(feedback.rating)}
                            <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                          </div>
                        )}

                        <p className="text-gray-700 mb-3">{feedback.content}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {feedback.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    {activeTab === 'received' && feedback.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcknowledgeFeedback(feedback.id)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Acknowledge</span>
                        </button>
                        <button
                          onClick={() => handleRespondToFeedback(feedback.id)}
                          className="btn-living px-4 py-2 flex items-center space-x-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Respond</span>
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'given' && feedback.status === 'acknowledged' && (
                      <span className="flex items-center space-x-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Acknowledged by recipient</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {filteredFeedback.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No feedback found</h3>
                  <p className="text-gray-600">
                    {activeTab === 'received' 
                      ? "You haven't received any feedback matching the current filters."
                      : "You haven't given any feedback matching the current filters."
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Feedback Requests */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              {feedbackRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-gray-900">
                          Request to: {request.requestedFrom}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-sm text-gray-600">Due: {formatDate(request.dueDate)}</span>
                        <span className="text-sm font-medium text-gray-700">{request.purpose}</span>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Questions Asked:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {request.questions.map((question, index) => (
                            <li key={index} className="text-sm text-gray-600">{question}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    {request.status === 'sent' && (
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Send Reminder
                      </button>
                    )}
                    {request.status === 'completed' && (
                      <span className="flex items-center space-x-1 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Response received</span>
                      </span>
                    )}
                    {request.status === 'overdue' && (
                      <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                        Follow Up
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {feedbackRequests.length === 0 && (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No feedback requests</h3>
                  <p className="text-gray-600">You haven't sent any feedback requests yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal Placeholder */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Give Feedback</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                Feedback composition interface would include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Recipient selection (team members)</li>
                <li>Category selection (performance, leadership, etc.)</li>
                <li>Rating system (optional)</li>
                <li>Rich text editor for detailed feedback</li>
                <li>Anonymous option toggle</li>
                <li>Tags and scheduling options</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowComposeModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="btn-living px-4 py-2">
                Send Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManager;