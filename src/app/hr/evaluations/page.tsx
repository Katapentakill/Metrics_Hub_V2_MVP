// 📁 src/app/hr/evaluations/page.tsx
// Página principal del módulo de evaluaciones con sistema de tabs híbrido

import React from 'react';
import { Metadata } from 'next';
import HybridEvaluationsDashboard from '@/modules/evaluations/HybridEvaluationsDashboard';
import { buildEvaluationViews } from '@/lib/map/evaluations/evaluationView';
import { mockEvaluations, mockFeedbackSessions, mockEvaluationPeriods } from '@/lib/data/mockEvaluations';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import { filterEvaluationsForGlobalAccess } from '@/lib/utils/evaluationFilters';
import type { EvaluationMetrics, PerformanceInsight } from '@/lib/types/evaluations';

export const metadata: Metadata = {
  title: 'Centro de Evaluaciones | HR',
  description: 'Gestión integral del desempeño y desarrollo del talento',
};

// Mock projects data (esto vendría de tu API de proyectos)
const mockProjects = [
  {
    id: 'proj-bc',
    name: 'Biblioteca Comunitaria CDMX',
    description: 'Espacio de lectura y talleres para niños.',
    status: 'completed' as const,
    team_members: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
    lead_id: 'user-1',
    start_date: '2024-01-15',
    end_date: '2024-06-30',
    progress: 100,
    location: 'Antigua, Guatemala'
  },
  {
    id: 'proj-cc',
    name: 'Centro Comunitario',
    description: 'Remodelación y habilitación de espacios para talleres.',
    status: 'active' as const,
    team_members: ['user-2', 'user-6', 'user-7'],
    lead_id: 'user-2',
    start_date: '2024-03-01',
    end_date: '2024-12-31',
    progress: 58,
    location: 'Valparaíso, Chile'
  },
  {
    id: 'proj-cm',
    name: 'Clínica Móvil',
    description: 'Jornadas médicas itinerantes.',
    status: 'completed' as const,
    team_members: ['user-8', 'user-9'],
    lead_id: 'user-8',
    start_date: '2024-02-01',
    end_date: '2024-08-31',
    progress: 100,
    location: 'Quito, Ecuador'
  },
  {
    id: 'proj-hu',  
    name: 'Huertos Urbanos',
    description: 'Implementación de huertos en barrios vulnerables.',
    status: 'active' as const,
    team_members: ['user-10', 'user-11', 'user-12'],
    lead_id: 'user-10',
    start_date: '2024-04-01',
    end_date: '2025-03-31',
    progress: 60,
    location: 'Valencia, Venezuela'
  }
];

// Función para calcular métricas
function calculateMetrics(): EvaluationMetrics {
  const total = mockEvaluations.length;
  const completed = mockEvaluations.filter(e => e.status === 'completed').length;
  const pending = mockEvaluations.filter(e => e.status === 'pending').length;
  const overdue = mockEvaluations.filter(e => e.status === 'overdue').length;

  const completedEvals = mockEvaluations.filter(e => typeof e.overall_score === 'number');
  const averageScore = completedEvals.length > 0
    ? completedEvals.reduce((acc, e) => acc + (e.overall_score ?? 0), 0) / completedEvals.length
    : 0;

  return {
    total_evaluations: total,
    completed_evaluations: completed,
    pending_evaluations: pending,
    overdue_evaluations: overdue,
    average_score: averageScore,
    completion_rate: total > 0 ? (completed / total) * 100 : 0,
    risk_evaluations: overdue + pending
  };
}

// Función para generar insights de desempeño
function generatePerformanceInsights(): PerformanceInsight[] {
  return extendedMockUsers.map((user): PerformanceInsight => {
    const userEvals = mockEvaluations.filter(e => e.evaluated_user_id === user.id);
    const completedEvals = userEvals.filter(e => typeof e.overall_score === 'number');

    if (completedEvals.length === 0) {
      return {
        user_id: user.id,
        user_name: user.name,
        average_score: 0,
        trend: 'stable',
        risk_level: 'medium',
        areas_of_concern: ['Sin evaluaciones completadas'],
        strengths: [],
      };
    }

    const averageScore =
      completedEvals.reduce((acc, e) => acc + (e.overall_score ?? 0), 0) / completedEvals.length;

    const lastEval = completedEvals[completedEvals.length - 1];
    const previousEval = completedEvals.length > 1
      ? completedEvals[completedEvals.length - 2]
      : undefined;

    let trend: PerformanceInsight['trend'] = 'stable';
    if (previousEval && lastEval) {
      const scoreDiff = (lastEval.overall_score ?? 0) - (previousEval.overall_score ?? 0);
      if (scoreDiff > 0.2) trend = 'improving';
      else if (scoreDiff < -0.2) trend = 'declining';
    }

    const risk_level: PerformanceInsight['risk_level'] =
      averageScore < 3.0 ? 'high' : averageScore < 4.0 ? 'medium' : 'low';

    return {
      user_id: user.id,
      user_name: user.name,
      average_score: Number(averageScore.toFixed(2)),
      trend,
      risk_level,
      last_evaluation_date: lastEval?.completed_date ?? undefined,
      areas_of_concern: lastEval?.improvement_areas ? [lastEval.improvement_areas] : [],
      strengths: lastEval?.strengths ? [lastEval.strengths] : [],
    };
  });
}

export default function EvaluationsPage() {
  // Construir vistas de evaluaciones con datos relacionados
  const evaluationViews = buildEvaluationViews(
    mockEvaluations,
    extendedMockUsers,
    mockFeedbackSessions,
    mockEvaluationPeriods
  );

  // Calcular métricas y insights
  const metrics = calculateMetrics();
  const performanceInsights = generatePerformanceInsights();

  // Filtrar datos para acceso global (HR)
  const filteredData = filterEvaluationsForGlobalAccess(
    evaluationViews,
    extendedMockUsers,
    metrics,
    performanceInsights
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <HybridEvaluationsDashboard
          evaluations={filteredData.evaluations}
          projects={mockProjects}
          metrics={filteredData.metrics}
          performanceInsights={filteredData.performanceInsights}
          allUsers={filteredData.users}
          allPeriods={mockEvaluationPeriods}
          role="hr"
          theme="institutional"
          basePath="/hr"
        />
      </div>
    </div>
  );
}