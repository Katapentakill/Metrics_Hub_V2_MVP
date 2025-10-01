'use client';

import React, { useState } from 'react';
import EvaluationsDashboard from '@/modules/evaluations/volunteer/EvaluationsDashboard';
import SelfEvaluationForm from '@/modules/evaluations/volunteer/SelfEvaluationForm';
import EvaluationHistory from '@/modules/evaluations/volunteer/EvaluationHistory';
import DevelopmentPlan from '@/modules/evaluations/volunteer/DevelopmentPlan';

export default function EvaluationsPage() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <EvaluationsDashboard />;
      case 'new-evaluation':
        return <SelfEvaluationForm />;
      case 'history':
        return <EvaluationHistory />;
      case 'development':
        return <DevelopmentPlan />;
      default:
        return <EvaluationsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs - Only visible when in dashboard or history */}
      {(activeView === 'dashboard' || activeView === 'history' || activeView === 'development') && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeView === 'dashboard'
                    ? 'border-var(--living-green-600) text-var(--living-green-600)'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeView === 'history'
                    ? 'border-var(--living-green-600) text-var(--living-green-600)'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Historial
              </button>
              <button
                onClick={() => setActiveView('development')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeView === 'development'
                    ? 'border-var(--living-green-600) text-var(--living-green-600)'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Plan de Desarrollo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back button for evaluation form */}
      {activeView === 'new-evaluation' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => setActiveView('dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Volver al Resumen</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {renderView()}
    </div>
  );
}