'use client';

import React, { useState } from 'react';
import { 
  Save, 
  Send, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Target
} from 'lucide-react';

interface EvaluationQuestion {
  id: string;
  category: string;
  question: string;
  type: 'scale' | 'text' | 'goals';
  required: boolean;
}

interface EvaluationAnswer {
  questionId: string;
  value: number | string;
  comment?: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
}

const SelfEvaluationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<EvaluationAnswer[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);

  const questions: EvaluationQuestion[] = [
    {
      id: '1',
      category: 'Desempeño General',
      question: '¿Cómo evalúas tu desempeño general durante este período?',
      type: 'scale',
      required: true
    },
    {
      id: '2',
      category: 'Desempeño General',
      question: 'Describe tus principales logros en este período',
      type: 'text',
      required: true
    },
    {
      id: '3',
      category: 'Habilidades Técnicas',
      question: '¿Qué tan competente te sientes en las habilidades técnicas requeridas?',
      type: 'scale',
      required: true
    },
    {
      id: '4',
      category: 'Trabajo en Equipo',
      question: '¿Cómo evalúas tu capacidad de colaborar efectivamente con tu equipo?',
      type: 'scale',
      required: true
    },
    {
      id: '5',
      category: 'Liderazgo',
      question: '¿En qué medida has demostrado habilidades de liderazgo?',
      type: 'scale',
      required: true
    },
    {
      id: '6',
      category: 'Desarrollo Personal',
      question: 'Describe las áreas en las que te gustaría crecer profesionalmente',
      type: 'text',
      required: true
    },
    {
      id: '7',
      category: 'Objetivos Futuros',
      question: 'Define tus objetivos para el próximo período',
      type: 'goals',
      required: true
    }
  ];

  const categories = [...new Set(questions.map(q => q.category))];
  const questionsPerStep = Math.ceil(questions.length / categories.length);
  const currentQuestions = questions.filter(q => q.category === categories[currentStep]);

  const handleScaleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, value } : a);
      }
      return [...prev, { questionId, value }];
    });
  };

  const handleTextAnswer = (questionId: string, value: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, value } : a);
      }
      return [...prev, { questionId, value }];
    });
  };

  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: '',
      description: '',
      targetDate: '',
      priority: 'medium'
    };
    setGoals([...goals, newGoal]);
  };

  const handleUpdateGoal = (id: string, field: keyof Goal, value: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const getAnswerValue = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.value || '';
  };

  const isStepComplete = () => {
    return currentQuestions.every(q => {
      const answer = answers.find(a => a.questionId === q.id);
      if (q.type === 'goals') {
        return goals.length > 0 && goals.every(g => g.title && g.description && g.targetDate);
      }
      return answer && answer.value !== '';
    });
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert('Borrador guardado exitosamente');
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert('Auto-evaluación enviada exitosamente');
  };

  const renderStarRating = (questionId: string, currentValue: number) => {
    return (
      <div className="flex space-x-1 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleScaleAnswer(questionId, star)}
            className={`p-2 transition-colors ${
              star <= currentValue 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <Star className="w-8 h-8 fill-current" />
          </button>
        ))}
        <span className="ml-4 text-lg font-medium text-gray-700">
          {currentValue > 0 ? `${currentValue}/5` : 'Sin calificar'}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Auto-evaluación Trimestral
          </h1>
          <p className="text-gray-600">
            Reflexiona sobre tu desempeño y establece objetivos para tu crecimiento profesional.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progreso: {currentStep + 1} de {categories.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / categories.length) * 100)}% completado
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-var(--living-green-500) h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / categories.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-var(--living-green-100) rounded-full flex items-center justify-center mr-3">
                <span className="text-var(--living-green-600) font-bold">{currentStep + 1}</span>
              </div>
              {categories[currentStep]}
            </h2>
          </div>

          <div className="space-y-8">
            {currentQuestions.map((question) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-900 mb-2">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                </div>

                {question.type === 'scale' && (
                  <div>
                    {renderStarRating(question.id, getAnswerValue(question.id) as number)}
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Muy bajo</span>
                      <span>Excelente</span>
                    </div>
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    value={getAnswerValue(question.id) as string}
                    onChange={(e) => handleTextAnswer(question.id, e.target.value)}
                    placeholder="Escribe tu respuesta aquí..."
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                  />
                )}

                {question.type === 'goals' && (
                  <div className="space-y-4">
                    {goals.map((goal) => (
                      <div key={goal.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Título del Objetivo *
                            </label>
                            <input
                              type="text"
                              value={goal.title}
                              onChange={(e) => handleUpdateGoal(goal.id, 'title', e.target.value)}
                              placeholder="Ej: Mejorar habilidades de liderazgo"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha Objetivo *
                            </label>
                            <input
                              type="date"
                              value={goal.targetDate}
                              onChange={(e) => handleUpdateGoal(goal.id, 'targetDate', e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción *
                          </label>
                          <textarea
                            value={goal.description}
                            onChange={(e) => handleUpdateGoal(goal.id, 'description', e.target.value)}
                            placeholder="Describe cómo planeas alcanzar este objetivo..."
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Prioridad
                            </label>
                            <select
                              value={goal.priority}
                              onChange={(e) => handleUpdateGoal(goal.id, 'priority', e.target.value as 'high' | 'medium' | 'low')}
                              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                            >
                              <option value="low">Baja</option>
                              <option value="medium">Media</option>
                              <option value="high">Alta</option>
                            </select>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={handleAddGoal}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-var(--living-green-500) hover:text-var(--living-green-600) transition-colors flex items-center justify-center space-x-2"
                    >
                      <Target className="w-5 h-5" />
                      <span>Agregar Objetivo</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <div className="flex space-x-3">
              <button
                onClick={handleSaveDraft}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Borrador</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              )}

              {!isStepComplete() && (
                <div className="flex items-center space-x-2 text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Completa todos los campos requeridos</span>
                </div>
              )}

              {currentStep < categories.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepComplete()}
                  className="flex items-center space-x-2 btn-living disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepComplete() || loading}
                  className="flex items-center space-x-2 btn-living disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Enviando...' : 'Enviar Evaluación'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="mt-6 flex justify-center space-x-2">
        {categories.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index <= currentStep 
                ? 'bg-var(--living-green-500)' 
                : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SelfEvaluationForm;