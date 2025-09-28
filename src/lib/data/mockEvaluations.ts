// 📁 src/lib/data/mockEvaluations.ts
// Datos simulados para evaluaciones, feedback y períodos

import type { Evaluation, FeedbackSession, EvaluationPeriod } from '@/lib/types/evaluations';

export const mockEvaluationPeriods: EvaluationPeriod[] = [
  {
    id: 'period_q1_2024',
    name: 'Q1 2024',
    start_date: '2024-01-01',
    end_date: '2024-03-31',
    is_active: true,
    description: 'Evaluaciones del primer trimestre 2024',
    created_at: '2023-12-15T10:00:00Z'
  },
  {
    id: 'period_q4_2023',
    name: 'Q4 2023',
    start_date: '2023-10-01',
    end_date: '2023-12-31',
    is_active: false,
    description: 'Evaluaciones del cuarto trimestre 2023',
    created_at: '2023-09-15T10:00:00Z'
  },
  {
    id: 'period_q3_2023',
    name: 'Q3 2023',
    start_date: '2023-07-01',
    end_date: '2023-09-30',
    is_active: false,
    description: 'Evaluaciones del tercer trimestre 2023',
    created_at: '2023-06-15T10:00:00Z'
  }
];

export const mockEvaluations: Evaluation[] = [
  {
    id: 'eval_001',
    evaluated_user_id: '1',
    evaluator_id: '3',
    period_id: 'period_q1_2024',
    type: 'performance',
    status: 'completed',
    overall_score: 4.3,
    criteria_scores: {
      commitment: 4.5,
      punctuality: 4.0,
      technical_skills: 4.5,
      teamwork: 4.2,
      initiative: 4.0,
      creativity: 4.1,
      cultural_adaptation: 4.4
    },
    feedback_text: 'Excelente desempeño en el proyecto Frontend. Muestra gran iniciativa y habilidades técnicas sólidas. Su capacidad de colaboración ha mejorado significativamente.',
    strengths: 'Dominio técnico en React, Proactividad en la resolución de problemas, Comunicación efectiva con el equipo',
    improvement_areas: 'Mejorar participación en code reviews, Documentación de código más detallada',
    achievements: 'Implementó sistema de componentes reutilizables, Redujo tiempo de carga en 30%, Mentoró a 2 voluntarios nuevos',
    challenges: 'Gestión del tiempo con múltiples tareas, Adaptación a nuevas tecnologías',
    goals_next_period: 'Liderar implementación de TypeScript, Mejorar testing coverage, Participar en arquitectura del sistema',
    recommended_training: 'Curso avanzado de TypeScript, Workshop de testing con Jest, Metodologías de documentación técnica',
    due_date: '2024-01-25',
    completed_date: '2024-01-23',
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-23T14:30:00Z'
  },
  {
    id: 'eval_002',
    evaluated_user_id: '2',
    evaluator_id: '4',
    period_id: 'period_q1_2024',
    type: 'peer_feedback',
    status: 'pending',
    due_date: '2024-01-30',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 'eval_003',
    evaluated_user_id: '3',
    evaluator_id: '1',
    period_id: 'period_q1_2024',
    type: 'self_evaluation',
    status: 'in_progress',
    overall_score: 3.8,
    criteria_scores: {
      commitment: 4.0,
      punctuality: 3.5,
      technical_skills: 4.2,
      teamwork: 3.8,
      initiative: 3.5,
      creativity: 4.0,
      cultural_adaptation: 3.9
    },
    feedback_text: 'He trabajado en mejorar mi puntualidad y participación proactiva en las reuniones del equipo. Siento que he crecido técnicamente pero necesito trabajar más en soft skills.',
    strengths: 'Habilidades técnicas en backend, Capacidad de análisis, Resolución de problemas complejos',
    improvement_areas: 'Puntualidad en reuniones, Comunicación más asertiva, Gestión del tiempo',
    achievements: 'Optimicé queries de base de datos, Implementé sistema de cache, Reduje errores en 40%',
    challenges: 'Balance trabajo-estudio, Coordinación con diferentes zonas horarias',
    goals_next_period: 'Mejorar soft skills, Participar más en planning sessions, Aprender nuevas tecnologías cloud',
    due_date: '2024-01-28',
    created_at: '2024-01-18T11:00:00Z',
    updated_at: '2024-01-25T16:00:00Z'
  },
  {
    id: 'eval_004',
    evaluated_user_id: '4',
    evaluator_id: '2',
    period_id: 'period_q1_2024',
    type: 'upward_feedback',
    status: 'overdue',
    due_date: '2024-01-20',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'eval_005',
    evaluated_user_id: '5',
    evaluator_id: '3',
    period_id: 'period_q4_2023',
    type: 'performance',
    status: 'completed',
    overall_score: 3.8,
    criteria_scores: {
      commitment: 4.0,
      punctuality: 3.5,
      technical_skills: 4.0,
      teamwork: 3.8,
      initiative: 3.5,
      creativity: 4.0,
      cultural_adaptation: 3.7
    },
    feedback_text: 'Buen desempeño general en el equipo de Marketing. Necesita mejorar la puntualidad en reuniones pero su creatividad y compromiso son excelentes.',
    strengths: 'Creatividad en campañas, Conocimiento de herramientas digitales, Adaptabilidad',
    improvement_areas: 'Puntualidad, Gestión del tiempo, Documentación de procesos',
    achievements: 'Aumentó engagement en 25%, Creó 3 campañas exitosas, Capacitó a nuevo voluntario',
    challenges: 'Coordinación internacional, Diferentes culturas de trabajo',
    goals_next_period: 'Mejorar gestión de tiempo, Aprender analytics avanzado, Liderar proyecto especial',
    recommended_training: 'Curso de Google Analytics, Workshop de gestión del tiempo, Herramientas de automation',
    due_date: '2023-12-20',
    completed_date: '2023-12-18',
    created_at: '2023-12-10T10:00:00Z',
    updated_at: '2023-12-18T15:00:00Z'
  },
  {
    id: 'eval_006',
    evaluated_user_id: '6',
    evaluator_id: '4',
    period_id: 'period_q1_2024',
    type: '360_feedback',
    status: 'in_progress',
    overall_score: 4.1,
    criteria_scores: {
      commitment: 4.2,
      punctuality: 4.0,
      technical_skills: 4.3,
      teamwork: 4.0,
      initiative: 3.8,
      creativity: 4.2,
      cultural_adaptation: 4.1
    },
    feedback_text: 'Evaluación 360° en progreso. Hasta ahora muestra excelente desempeño técnico y buena colaboración con el equipo de UX/UI.',
    strengths: 'Habilidades de diseño, Atención al detalle, Colaboración efectiva',
    improvement_areas: 'Proactividad en propuestas, Gestión de feedback de clientes',
    due_date: '2024-02-05',
    created_at: '2024-01-22T08:00:00Z',
    updated_at: '2024-01-26T12:00:00Z'
  },
  {
    id: 'eval_007',
    evaluated_user_id: '7',
    evaluator_id: '2',
    period_id: 'period_q1_2024',
    type: 'performance',
    status: 'pending',
    due_date: '2024-02-01',
    created_at: '2024-01-25T09:00:00Z',
    updated_at: '2024-01-25T09:00:00Z'
  },
  {
    id: 'eval_008',
    evaluated_user_id: '8',
    evaluator_id: '3',
    period_id: 'period_q1_2024',
    type: 'peer_feedback',
    status: 'completed',
    overall_score: 4.0,
    criteria_scores: {
      commitment: 4.1,
      punctuality: 4.0,
      technical_skills: 3.8,
      teamwork: 4.2,
      initiative: 3.9,
      creativity: 4.0,
      cultural_adaptation: 4.0
    },
    feedback_text: 'Excelente trabajo en equipo y comunicación. Su capacidad de análisis de datos ha sido fundamental para el proyecto.',
    strengths: 'Análisis de datos, Trabajo en equipo, Comunicación clara',
    improvement_areas: 'Conocimientos técnicos avanzados, Liderazgo de iniciativas',
    achievements: 'Implementó dashboard de métricas, Optimizó procesos de análisis, Capacitó equipo en herramientas',
    due_date: '2024-01-27',
    completed_date: '2024-01-26',
    created_at: '2024-01-20T11:00:00Z',
    updated_at: '2024-01-26T13:00:00Z'
  }
];

export const mockFeedbackSessions: FeedbackSession[] = [
  {
    id: 'feedback_001',
    evaluation_id: 'eval_001',
    feedback_type: 'downward',
    feedback_content: 'María muestra excelente progreso técnico y su actitud colaborativa ha mejorado el ambiente del equipo. Su proactividad para resolver problemas complejos es destacable.',
    is_anonymous: false,
    created_by: '3',
    created_at: '2024-01-23T10:00:00Z'
  },
  {
    id: 'feedback_002',
    evaluation_id: 'eval_001',
    feedback_type: 'horizontal',
    feedback_content: 'Es muy fácil trabajar con María. Siempre está dispuesta a ayudar y sus conocimientos técnicos han sido muy valiosos para el proyecto. Solo sugeriría más participación en las revisiones de código.',
    is_anonymous: true,
    created_by: '2',
    created_at: '2024-01-22T14:00:00Z'
  },
  {
    id: 'feedback_003',
    evaluation_id: 'eval_003',
    feedback_type: 'upward',
    feedback_content: 'Agradezco mucho el apoyo y mentoría recibida. Las reuniones one-on-one han sido muy útiles para mi crecimiento. Sugeriría tener más claridad en los objetivos del proyecto desde el inicio.',
    is_anonymous: true,
    created_by: '3',
    created_at: '2024-01-25T11:00:00Z'
  },
  {
    id: 'feedback_004',
    evaluation_id: 'eval_005',
    feedback_type: 'downward',
    feedback_content: 'Patricia tiene una creatividad excepcional y genera ideas innovadoras constantemente. Su capacidad para adaptar estrategias según diferentes audiencias es impresionante. Necesita trabajar en la gestión del tiempo.',
    is_anonymous: false,
    created_by: '3',
    created_at: '2023-12-18T09:00:00Z'
  },
  {
    id: 'feedback_005',
    evaluation_id: 'eval_006',
    feedback_type: 'horizontal',
    feedback_content: 'Su trabajo de diseño es excelente y siempre busca la perfección en los detalles. Es muy colaborativa y acepta feedback constructivo muy bien. Podría ser más proactiva en proponer mejoras.',
    is_anonymous: true,
    created_by: '5',
    created_at: '2024-01-26T10:00:00Z'
  },
  {
    id: 'feedback_006',
    evaluation_id: 'eval_008',
    feedback_type: 'horizontal',
    feedback_content: 'Alberto es muy meticuloso en su trabajo de análisis y sus reportes son siempre claros y bien estructurados. Su capacidad de encontrar insights importantes en los datos es valiosa para todo el equipo.',
    is_anonymous: true,
    created_by: '6',
    created_at: '2024-01-26T12:00:00Z'
  },
  // Feedback confidencial adicional para insights
  {
    id: 'feedback_007',
    evaluation_id: 'eval_001',
    feedback_type: 'upward',
    feedback_content: 'El liderazgo es bueno en general, pero a veces falta claridad en los objetivos del sprint. Las reuniones de equipo podrían ser más enfocadas y eficientes.',
    is_anonymous: true,
    created_by: '1',
    created_at: '2024-01-23T16:00:00Z'
  },
  {
    id: 'feedback_008',
    evaluation_id: 'eval_002',
    feedback_type: 'horizontal',
    feedback_content: 'Trabajar con Daniel es genial, siempre está dispuesto a ayudar con problemas técnicos complejos. Su conocimiento del backend es impresionante.',
    is_anonymous: true,
    created_by: '1',
    created_at: '2024-01-24T13:00:00Z'
  },
  {
    id: 'feedback_009',
    evaluation_id: 'eval_004',
    feedback_type: 'upward',
    feedback_content: 'El seguimiento del proyecto ha mejorado mucho. Agradecería más feedback técnico específico sobre mi código y arquitectura.',
    is_anonymous: true,
    created_by: '4',
    created_at: '2024-01-15T14:00:00Z'
  },
  {
    id: 'feedback_010',
    evaluation_id: 'eval_006',
    feedback_type: 'downward',
    feedback_content: 'Sofia muestra gran talento en UX/UI y su atención al detalle es excelente. Su capacidad de traducir requisitos complejos en interfaces intuitivas es destacable.',
    is_anonymous: false,
    created_by: '4',
    created_at: '2024-01-26T08:00:00Z'
  }
];