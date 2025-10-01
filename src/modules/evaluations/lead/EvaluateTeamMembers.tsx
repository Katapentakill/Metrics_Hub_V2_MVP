import React, { useState } from 'react';
import { User, Star, Save, Send, ArrowLeft, Plus, Trash2 } from 'lucide-react';

// Interfaces para el tipado
interface EvaluationForm {
  employeeId: string;
  employeeName: string;
  position: string;
  evaluationPeriod: string;
  competencies: CompetencyEvaluation[];
  overallComments: string;
  goals: Goal[];
  developmentAreas: string[];
  strengths: string[];
  workQuality: number;
  teamwork: number;
  communication: number;
  initiative: number;
  reliability: number;
}

interface CompetencyEvaluation {
  id: string;
  name: string;
  description: string;
  score: number;
  comment: string;
}

interface Goal {
  id: string;
  description: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
}

const EvaluateTeamMembers = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [newStrength, setNewStrength] = useState('');
  const [newDevelopmentArea, setNewDevelopmentArea] = useState('');
  
  const [evaluationForm, setEvaluationForm] = useState<EvaluationForm>({
    employeeId: '',
    employeeName: '',
    position: '',
    evaluationPeriod: '2024-Q4',
    competencies: [
      { id: 'comp_1', name: 'Technical Skills', description: 'Job-specific technical competencies', score: 0, comment: '' },
      { id: 'comp_2', name: 'Communication', description: 'Clear and effective communication', score: 0, comment: '' },
      { id: 'comp_3', name: 'Problem Solving', description: 'Analytical and creative problem-solving', score: 0, comment: '' },
      { id: 'comp_4', name: 'Leadership', description: 'Ability to guide and inspire others', score: 0, comment: '' },
      { id: 'comp_5', name: 'Adaptability', description: 'Flexibility and openness to change', score: 0, comment: '' }
    ],
    overallComments: '',
    goals: [],
    developmentAreas: [],
    strengths: [],
    workQuality: 0,
    teamwork: 0,
    communication: 0,
    initiative: 0,
    reliability: 0
  });

  // Mock team members data
  const teamMembers: TeamMember[] = [
    { id: 'tm_001', name: 'Sarah Johnson', position: 'Senior Developer' },
    { id: 'tm_002', name: 'Mike Chen', position: 'UI/UX Designer' },
    { id: 'tm_003', name: 'Emily Rodriguez', position: 'Content Specialist' },
    { id: 'tm_004', name: 'David Kim', position: 'Marketing Coordinator' },
    { id: 'tm_005', name: 'Alex Thompson', position: 'Junior Developer' }
  ];

  const evaluationSteps = [
    { id: 1, name: 'Employee Selection', description: 'Choose team member to evaluate' },
    { id: 2, name: 'Competency Assessment', description: 'Rate core competencies' },
    { id: 3, name: 'Performance Areas', description: 'Evaluate specific performance areas' },
    { id: 4, name: 'Goals & Development', description: 'Set goals and development areas' },
    { id: 5, name: 'Review & Submit', description: 'Final review and submission' }
  ];

  const handleEmployeeSelect = (employeeId: string) => {
    const employee = teamMembers.find(m => m.id === employeeId);
    if (employee) {
      setSelectedEmployee(employeeId);
      setEvaluationForm(prev => ({
        ...prev,
        employeeId: employee.id,
        employeeName: employee.name,
        position: employee.position
      }));
      setCurrentStep(2);
    }
  };

  const handleCompetencyChange = (competencyId: string, field: keyof CompetencyEvaluation, value: string | number) => {
    setEvaluationForm(prev => ({
      ...prev,
      competencies: prev.competencies.map(comp =>
        comp.id === competencyId ? { ...comp, [field]: value } : comp
      )
    }));
  };

  const handlePerformanceAreaChange = (area: keyof EvaluationForm, value: number) => {
    setEvaluationForm(prev => ({ ...prev, [area]: value }));
  };

  const addGoal = () => {
    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      description: '',
      deadline: '',
      priority: 'medium'
    };
    setEvaluationForm(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const updateGoal = (goalId: string, field: keyof Goal, value: string) => {
    setEvaluationForm(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === goalId ? { ...goal, [field]: value } : goal
      )
    }));
  };

  const removeGoal = (goalId: string) => {
    setEvaluationForm(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== goalId)
    }));
  };

  const addStrength = () => {
    if (newStrength.trim()) {
      setEvaluationForm(prev => ({
        ...prev,
        strengths: [...prev.strengths, newStrength.trim()]
      }));
      setNewStrength('');
    }
  };

  const removeStrength = (index: number) => {
    setEvaluationForm(prev => ({
      ...prev,
      strengths: prev.strengths.filter((_, i) => i !== index)
    }));
  };

  const addDevelopmentArea = () => {
    if (newDevelopmentArea.trim()) {
      setEvaluationForm(prev => ({
        ...prev,
        developmentAreas: [...prev.developmentAreas, newDevelopmentArea.trim()]
      }));
      setNewDevelopmentArea('');
    }
  };

  const removeDevelopmentArea = (index: number) => {
    setEvaluationForm(prev => ({
      ...prev,
      developmentAreas: prev.developmentAreas.filter((_, i) => i !== index)
    }));
  };

  const getScoreColor = (score: number): string => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    if (score > 0) return 'text-red-600';
    return 'text-gray-400';
  };

  const getOverallScore = (): number => {
    const competencyAvg = evaluationForm.competencies.reduce((sum, comp) => sum + comp.score, 0) / evaluationForm.competencies.length;
    const performanceAvg = (evaluationForm.workQuality + evaluationForm.teamwork + evaluationForm.communication + evaluationForm.initiative + evaluationForm.reliability) / 5;
    return ((competencyAvg + performanceAvg) / 2) || 0;
  };

  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 1: return selectedEmployee !== '';
      case 2: return evaluationForm.competencies.every(comp => comp.score > 0);
      case 3: return [evaluationForm.workQuality, evaluationForm.teamwork, evaluationForm.communication, evaluationForm.initiative, evaluationForm.reliability].every(score => score > 0);
      case 4: return evaluationForm.strengths.length > 0 && evaluationForm.developmentAreas.length > 0;
      default: return true;
    }
  };

  const handleSubmit = (type: 'draft' | 'final') => {
    console.log(`Submitting evaluation as ${type}:`, evaluationForm);
    // Here would be the API call to save the evaluation
  };

  const StarRating = ({ score, onChange }: { score: number; onChange: (score: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`w-5 h-5 transition-colors ${
              star <= score ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <Star className="w-full h-full fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Member Evaluation</h1>
            <p className="text-gray-600 mt-2">
              {currentStep > 1 && evaluationForm.employeeName ? 
                `Evaluating ${evaluationForm.employeeName} - ${evaluationForm.position}` :
                'Select a team member to begin evaluation'
              }
            </p>
          </div>
        </div>
        
        {currentStep > 1 && (
          <div className="text-right">
            <div className="text-sm text-gray-600">Overall Score</div>
            <div className={`text-2xl font-bold ${getScoreColor(getOverallScore())}`}>
              {getOverallScore().toFixed(1)}
            </div>
          </div>
        )}
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          {evaluationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === step.id ? 'bg-living-green-500 text-white' :
                  currentStep > step.id ? 'bg-emerald-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3">
                  <div className={`font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
              {index < evaluationSteps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-emerald-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        
        {/* Step 1: Employee Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Team Member</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleEmployeeSelect(member.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedEmployee === member.id
                      ? 'border-living-green-500 bg-living-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Competency Assessment */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Competency Assessment</h2>
            <div className="space-y-6">
              {evaluationForm.competencies.map((competency) => (
                <div key={competency.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{competency.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{competency.description}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <StarRating
                        score={competency.score}
                        onChange={(score) => handleCompetencyChange(competency.id, 'score', score)}
                      />
                      <div className={`text-sm font-medium mt-1 ${getScoreColor(competency.score)}`}>
                        {competency.score > 0 ? `${competency.score}/5` : 'Not rated'}
                      </div>
                    </div>
                  </div>
                  <textarea
                    value={competency.comment}
                    onChange={(e) => handleCompetencyChange(competency.id, 'comment', e.target.value)}
                    placeholder="Add specific feedback and examples..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Performance Areas */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'workQuality', label: 'Work Quality', description: 'Accuracy, attention to detail, and thoroughness' },
                { key: 'teamwork', label: 'Teamwork', description: 'Collaboration and supporting team members' },
                { key: 'communication', label: 'Communication', description: 'Clear and effective information sharing' },
                { key: 'initiative', label: 'Initiative', description: 'Proactive approach and self-motivation' },
                { key: 'reliability', label: 'Reliability', description: 'Meeting deadlines and commitments' }
              ].map((area) => (
                <div key={area.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{area.label}</h3>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                    <div className="text-right">
                      <StarRating
                        score={evaluationForm[area.key as keyof EvaluationForm] as number}
                        onChange={(score) => handlePerformanceAreaChange(area.key as keyof EvaluationForm, score)}
                      />
                      <div className={`text-sm font-medium mt-1 ${getScoreColor(evaluationForm[area.key as keyof EvaluationForm] as number)}`}>
                        {(evaluationForm[area.key as keyof EvaluationForm] as number) > 0 ? `${evaluationForm[area.key as keyof EvaluationForm]}/5` : 'Not rated'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Goals & Development */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Goals & Development Areas</h2>
            
            {/* Strengths */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Strengths</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {evaluationForm.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <span className="text-sm">{strength}</span>
                    <button
                      type="button"
                      onClick={() => removeStrength(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newStrength}
                  onChange={(e) => setNewStrength(e.target.value)}
                  placeholder="Add a strength..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addStrength()}
                />
                <button
                  type="button"
                  onClick={addStrength}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Development Areas */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Development Areas</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {evaluationForm.developmentAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                    <span className="text-sm">{area}</span>
                    <button
                      type="button"
                      onClick={() => removeDevelopmentArea(index)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newDevelopmentArea}
                  onChange={(e) => setNewDevelopmentArea(e.target.value)}
                  placeholder="Add a development area..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addDevelopmentArea()}
                />
                <button
                  type="button"
                  onClick={addDevelopmentArea}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Goals */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Development Goals</h3>
                <button
                  type="button"
                  onClick={addGoal}
                  className="px-3 py-1 bg-living-green-100 text-living-green-700 rounded-lg hover:bg-living-green-200 transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Add Goal</span>
                </button>
              </div>
              <div className="space-y-3">
                {evaluationForm.goals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <div className="md:col-span-6">
                        <textarea
                          value={goal.description}
                          onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                          placeholder="Describe the development goal..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent resize-none"
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <input
                          type="date"
                          value={goal.deadline}
                          onChange={(e) => updateGoal(goal.id, 'deadline', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <select
                          value={goal.priority}
                          onChange={(e) => updateGoal(goal.id, 'priority', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div className="md:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeGoal(goal.id)}
                          className="p-2 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Review & Submit</h2>
            
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Evaluation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(getOverallScore())}`}>
                      {getOverallScore().toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{evaluationForm.strengths.length}</div>
                    <div className="text-sm text-gray-600">Key Strengths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{evaluationForm.goals.length}</div>
                    <div className="text-sm text-gray-600">Development Goals</div>
                  </div>
                </div>
              </div>

              {/* Overall Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Comments & Feedback
                </label>
                <textarea
                  value={evaluationForm.overallComments}
                  onChange={(e) => setEvaluationForm(prev => ({ ...prev, overallComments: e.target.value }))}
                  placeholder="Provide overall feedback, additional observations, and next steps..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-living-green-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleSubmit('draft')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save as Draft</span>
                </button>
                <button
                  onClick={() => handleSubmit('final')}
                  className="btn-living px-6 py-2 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Evaluation</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceedToNext()}
              className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                canProceedToNext()
                  ? 'btn-living'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Next Step</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateTeamMembers;