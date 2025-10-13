'use client';

import { Metadata } from 'next';
import { useEffect, useState } from 'react';
import HybridEvaluationsDashboard from '@/modules/evaluations/HybridEvaluationsDashboard';
import { buildEvaluationViews } from '@/lib/map/evaluations/evaluationView';
import { mockEvaluations, mockFeedbackSessions, mockEvaluationPeriods } from '@/lib/data/mockEvaluations';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import { filterEvaluationsForLead, getCurrentUserId, sanitizeEvaluationForLead } from '@/lib/utils/evaluationFilters';
import type { EvaluationMetrics, PerformanceInsight } from '@/lib/types/evaluations';

export default function LeadEvaluationsPage() {
  const [filteredData, setFilteredData] = useState<{
    evaluations: any[];
    metrics: EvaluationMetrics;
    performanceInsights: PerformanceInsight[];
    users: any[];
  } | null>(null);

  useEffect(() => {
    // Obtener ID del usuario actual
    const currentUserId = getCurrentUserId();
    
    if (!currentUserId) {
      console.error('No se pudo obtener el ID del usuario actual');
      return;
    }

    // Construir todas las evaluaciones
    const allEvaluations = buildEvaluationViews(
      mockEvaluations, 
      extendedMockUsers, 
      mockFeedbackSessions, 
      mockEvaluationPeriods
    );

    // Calcular métricas globales
    const allMetrics: EvaluationMetrics = {
      total_evaluations: mockEvaluations.length,
      completed_evaluations: mockEvaluations.filter(e => e.status === 'completed').length,
      pending_evaluations: mockEvaluations.filter(e => e.status === 'pending').length,
      overdue_evaluations: mockEvaluations.filter(e => e.status === 'overdue').length,
      average_score: 4.2,
      completion_rate: 75.0,
      risk_evaluations: 3
    };

    // Generar insights globales
    const allPerformanceInsights: PerformanceInsight[] = extendedMockUsers.map((user): PerformanceInsight => {
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

      const averageScore = completedEvals.reduce((acc, e) => acc + (e.overall_score ?? 0), 0) / completedEvals.length;

      return {
        user_id: user.id,
        user_name: user.name,
        average_score: Number(averageScore.toFixed(2)),
        trend: 'stable',
        risk_level: averageScore < 3.0 ? 'high' : averageScore < 4.0 ? 'medium' : 'low',
        last_evaluation_date: completedEvals[completedEvals.length - 1]?.completed_date ?? undefined,
        areas_of_concern: completedEvals[completedEvals.length - 1]?.improvement_areas ? [completedEvals[completedEvals.length - 1].improvement_areas].filter((item): item is string => Boolean(item)) : [],
        strengths: completedEvals[completedEvals.length - 1]?.strengths ? [completedEvals[completedEvals.length - 1].strengths].filter((item): item is string => Boolean(item)) : [],
      };
    });

    // Proyectos donde el usuario es lead (mock data)
    const projects = [
      {
        id: 'proj_001',
        name: 'Plataforma de Donaciones',
        description: 'Sistema web para gestionar donaciones en tiempo real',
        status: 'active' as const,
        team_members: ['user_001', 'user_002', 'user_003'],
        lead_id: currentUserId, // El usuario actual es el lead
        start_date: '2024-06-01',
        end_date: '2024-12-31',
        progress: 75,
        location: 'Remoto'
      }
    ];

    // Filtrar datos para el lead
    const filtered = filterEvaluationsForLead(
      allEvaluations,
      extendedMockUsers,
      allMetrics,
      allPerformanceInsights,
      currentUserId,
      projects
    );

    // Sanitizar evaluaciones para ocultar detalles confidenciales del equipo
    const sanitizedEvaluations = filtered.evaluations.map(evaluation => 
      sanitizeEvaluationForLead(evaluation, currentUserId)
    );

    setFilteredData({
      ...filtered,
      evaluations: sanitizedEvaluations
    });
  }, []);

  if (!filteredData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="loading-skeleton h-32 rounded-xl"></div>
            <div className="loading-skeleton h-12 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="loading-skeleton h-24 rounded-xl"></div>
              ))}
            </div>
            <div className="loading-skeleton h-96 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const projects = [
    {
      id: 'proj_001',
      name: 'Plataforma de Donaciones',
      description: 'Sistema web para gestionar donaciones en tiempo real',
      status: 'active' as const,
      team_members: ['user_001', 'user_002', 'user_003'],
      lead_id: 'user_001',
      start_date: '2024-06-01',
      end_date: '2024-12-31',
      progress: 75,
      location: 'Remoto'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <HybridEvaluationsDashboard
          evaluations={filteredData.evaluations}
          projects={projects}
          metrics={filteredData.metrics}
          performanceInsights={filteredData.performanceInsights}
          allUsers={filteredData.users}
          allPeriods={mockEvaluationPeriods}
          role="lead"
          theme="emerald"
          basePath="/lead"
        />
      </div>
    </div>
  );
}