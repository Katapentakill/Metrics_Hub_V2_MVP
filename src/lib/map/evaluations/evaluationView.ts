// 📁 src/lib/map/evaluations/evaluationView.ts
// Builder para vistas de evaluaciones con datos relacionados

import type { ExtendedUserWithProfile } from '@/lib/types';
import { Evaluation, EvaluationPeriod, FeedbackSession } from '@/lib/types/evaluations';


export interface EvaluationView {
  evaluation: Evaluation;
  evaluatedUser?: ExtendedUserWithProfile;
  evaluator?: ExtendedUserWithProfile;
  period?: EvaluationPeriod;
  feedbackSessions?: FeedbackSession[];
}

export function buildEvaluationViews(
  evaluations: Evaluation[],
  users: ExtendedUserWithProfile[],
  feedbackSessions: FeedbackSession[],
  periods: EvaluationPeriod[]
): EvaluationView[] {
  return evaluations.map((evaluation) => {
    // Buscar usuario evaluado
    const evaluatedUser = users.find(user => user.id === evaluation.evaluated_user_id);
    
    // Buscar evaluador
    const evaluator = users.find(user => user.id === evaluation.evaluator_id);
    
    // Buscar período
    const period = periods.find(p => p.id === evaluation.period_id);
    
    // Buscar sesiones de feedback relacionadas
    const relatedFeedbackSessions = feedbackSessions.filter(
      session => session.evaluation_id === evaluation.id
    );

    return {
      evaluation,
      evaluatedUser,
      evaluator,
      period,
      feedbackSessions: relatedFeedbackSessions
    };
  });
}