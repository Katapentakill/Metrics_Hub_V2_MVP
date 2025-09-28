// 📁 src/lib/data/users.ts
// Datos mock para usuarios y gestión de personal

import { ExtendedUserWithProfile } from '@/lib/types/base';
import { Application, ApplicationStage, Interview, UserProject, ActivityItem, CVData } from '@/lib/types/users';

// Usuarios extendidos (mantener el archivo existente pero organizado)
export { extendedMockUsers } from './extendedUsers';

// Aplicaciones mock
export const mockApplications: Application[] = [
  {
    id: 'app_001',
    email: 'maria.gonzalez@email.com',
    first_name: 'María',
    last_name: 'González',
    phone: '+57 300 123 4567',
    country: 'Colombia',
    city: 'Bogotá',
    birth_date: '1995-03-15',
    type: 'student_usa',
    current_stage: 3,
    status: 'in_review',
    assigned_to_hr: '4',
    cv_path: '/uploads/cv_maria_gonzalez.pdf',
    notes: 'Excelente portafolio, muy motivada',
    created_at: '2024-02-15T10:00:00Z',
    completed_at: '2024-02-20T15:30:00Z'
  },
  {
    id: 'app_002',
    email: 'carlos.ruiz@email.com',
    first_name: 'Carlos',
    last_name: 'Ruiz',
    phone: '+57 301 987 6543',
    country: 'Colombia',
    city: 'Medellín',
    birth_date: '1992-07-22',
    type: 'professional_intl',
    current_stage: 2,
    status: 'submitted',
    assigned_to_hr: '5',
    cv_path: '/uploads/cv_carlos_ruiz.pdf',
    notes: 'Portfolio muy completo',
    created_at: '2024-02-14T14:30:00Z'
  },
  {
    id: 'app_003',
    email: 'ana.martinez@email.com',
    first_name: 'Ana',
    last_name: 'Martínez',
    phone: '+57 302 456 7890',
    country: 'Colombia',
    city: 'Cali',
    birth_date: '1998-11-08',
    type: 'student_intl',
    current_stage: 4,
    status: 'accepted',
    assigned_to_hr: '6',
    cv_path: '/uploads/cv_ana_martinez.pdf',
    notes: 'Candidata excepcional',
    created_at: '2024-02-10T09:15:00Z',
    completed_at: '2024-02-25T11:45:00Z'
  }
];

// Etapas de aplicación mock
export const mockApplicationStages: ApplicationStage[] = [
  {
    id: 'stage_001',
    application_id: 'app_001',
    stage: 1,
    name: 'Aplicación Recibida',
    status: 'completed',
    started_at: '2024-02-15T10:00:00Z',
    completed_at: '2024-02-15T10:05:00Z',
    notes: 'Aplicación recibida automáticamente',
    completed_by: 'system'
  },
  {
    id: 'stage_002',
    application_id: 'app_001',
    stage: 2,
    name: 'Filtro Inicial',
    status: 'completed',
    started_at: '2024-02-15T10:05:00Z',
    completed_at: '2024-02-16T14:30:00Z',
    notes: 'Cumple todos los requisitos básicos',
    completed_by: '4'
  },
  {
    id: 'stage_003',
    application_id: 'app_001',
    stage: 3,
    name: 'Evaluación de Video',
    status: 'in_progress',
    started_at: '2024-02-16T14:30:00Z',
    notes: 'Video enviado, en revisión'
  }
];

// Entrevistas mock
export const mockInterviews: Interview[] = [
  {
    id: 'int_001',
    application_id: 'app_001',
    scheduled_at: '2024-02-28T15:00:00Z',
    duration: 45,
    zoom_link: 'https://zoom.us/j/123456789',
    status: 'scheduled',
    notes: 'Entrevista técnica con el equipo de desarrollo',
    created_by: '4',
    created_at: '2024-02-20T10:00:00Z'
  },
  {
    id: 'int_002',
    application_id: 'app_002',
    scheduled_at: '2024-02-25T10:30:00Z',
    duration: 30,
    zoom_link: 'https://zoom.us/j/987654321',
    status: 'completed',
    notes: 'Entrevista completada exitosamente',
    created_by: '5',
    created_at: '2024-02-18T09:00:00Z'
  }
];

// Proyectos de usuario mock
export const mockUserProjects: UserProject[] = [
  {
    id: 'proj_001',
    user_id: 'user_001',
    title: 'Plataforma de Donaciones',
    description: 'Sistema web para gestionar donaciones en tiempo real con dashboard administrativo',
    status: 'active',
    role: 'Frontend Developer',
    start_date: '2024-06-01',
    hours_contributed: 45,
    team_size: 6
  },
  {
    id: 'proj_002',
    user_id: 'user_001',
    title: 'App Móvil Educativa',
    description: 'Aplicación móvil para educación en comunidades rurales',
    status: 'completed',
    role: 'UI/UX Designer',
    start_date: '2024-03-15',
    end_date: '2024-05-30',
    hours_contributed: 80,
    team_size: 4
  },
  {
    id: 'proj_003',
    user_id: 'user_001',
    title: 'Sistema de Gestión de Voluntarios',
    description: 'CRM especializado para organizaciones sin fines de lucro',
    status: 'paused',
    role: 'Full Stack Developer',
    start_date: '2024-01-10',
    hours_contributed: 120,
    team_size: 8
  },
  {
    id: 'proj_004',
    user_id: 'user_002',
    title: 'Portal de Transparencia',
    description: 'Portal web para mostrar el impacto y uso de fondos de la organización',
    status: 'active',
    role: 'Data Analyst',
    start_date: '2024-07-01',
    hours_contributed: 25,
    team_size: 3
  },
  {
    id: 'proj_005',
    user_id: 'user_003',
    title: 'Campaña Digital Sostenibilidad',
    description: 'Campaña de marketing digital para concientización ambiental',
    status: 'completed',
    role: 'Marketing Specialist',
    start_date: '2024-02-01',
    end_date: '2024-04-30',
    hours_contributed: 60,
    team_size: 5
  }
];

// Actividades de usuario mock
export const mockUserActivities: ActivityItem[] = [
  {
    id: 'act_001',
    user_id: 'user_001',
    type: 'login',
    description: 'Inicio de sesión desde Chrome en Windows',
    timestamp: '2024-09-05T14:30:00Z'
  },
  {
    id: 'act_002',
    user_id: 'user_001',
    type: 'skill_added',
    description: 'Agregó la habilidad "TypeScript" con nivel avanzado',
    timestamp: '2024-09-03T10:15:00Z'
  },
  {
    id: 'act_003',
    user_id: 'user_001',
    type: 'project_joined',
    description: 'Se unió al proyecto "Plataforma de Donaciones"',
    timestamp: '2024-09-01T16:45:00Z'
  },
  {
    id: 'act_004',
    user_id: 'user_001',
    type: 'profile_updated',
    description: 'Actualizó su biografía y enlaces profesionales',
    timestamp: '2024-08-28T11:20:00Z'
  },
  {
    id: 'act_005',
    user_id: 'user_001',
    type: 'achievement',
    description: 'Completó 100 horas de voluntariado',
    timestamp: '2024-08-25T09:30:00Z'
  },
  {
    id: 'act_006',
    user_id: 'user_001',
    type: 'login',
    description: 'Inicio de sesión desde Firefox en macOS',
    timestamp: '2024-08-23T09:15:00Z'
  },
  {
    id: 'act_007',
    user_id: 'user_001',
    type: 'project_joined',
    description: 'Se unió al proyecto "App Móvil Educativa"',
    timestamp: '2024-08-20T13:00:00Z'
  },
  {
    id: 'act_008',
    user_id: 'user_001',
    type: 'skill_added',
    description: 'Agregó la habilidad "React Native" con nivel intermedio',
    timestamp: '2024-08-18T16:30:00Z'
  },
  {
    id: 'act_009',
    user_id: 'user_001',
    type: 'achievement',
    description: 'Completó el proyecto "Sistema de Gestión de Voluntarios"',
    timestamp: '2024-08-15T11:45:00Z'
  },
  {
    id: 'act_010',
    user_id: 'user_001',
    type: 'profile_updated',
    description: 'Actualizó su información de contacto',
    timestamp: '2024-08-12T14:20:00Z'
  }
];

// Datos de CV mock
export const mockCVData: Record<string, CVData> = {
  'user_12': {
    summary: 'Desarrolladora frontend apasionada por crear interfaces accesibles y experiencias de usuario excepcionales. Estudiante de último año con experiencia en React, JavaScript y diseño responsive.',
    experience: [
      {
        id: 'exp_001',
        position: 'Frontend Developer Intern',
        company: 'TechSocial Solutions',
        location: 'Buenos Aires, Argentina',
        start_date: '2024-01-15',
        end_date: '2024-06-30',
        is_current: false,
        description: 'Desarrollé interfaces de usuario para aplicaciones web usando React y TypeScript.',
        achievements: [
          'Implementé 15+ componentes reutilizables que mejoraron la consistencia del design system',
          'Optimicé el rendimiento de la aplicación reduciendo el tiempo de carga en 40%',
          'Colaboré con equipo de diseño para implementar interfaces accesibles'
        ]
      }
    ],
    education: [
      {
        id: 'edu_001',
        degree: 'Ingeniería en Sistemas de Información',
        institution: 'Universidad de Buenos Aires',
        location: 'Buenos Aires, Argentina',
        start_date: '2019-03-01',
        end_date: '2024-12-15',
        gpa: '8.5/10',
        honors: 'Dean\'s List',
        relevant_courses: ['Algoritmos y Estructuras de Datos', 'Desarrollo Web', 'Bases de Datos', 'Ingeniería de Software']
      }
    ],
    projects: [
      {
        name: 'Portfolio Personal',
        description: 'Sitio web personal desarrollado con React y Styled Components',
        technologies: ['React', 'TypeScript', 'Styled Components', 'Framer Motion'],
        url: 'https://anamartinez.dev'
      },
      {
        name: 'Task Manager App',
        description: 'Aplicación de gestión de tareas con autenticación y base de datos',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        url: 'https://github.com/anamartinez-dev/task-manager'
      }
    ],
    volunteer_experience: [
      {
        organization: 'LivingStones',
        role: 'Frontend Developer',
        start_date: '2024-02-15',
        description: 'Desarrollo de interfaces para plataforma de gestión de voluntarios'
      }
    ],
    cv_file_url: '/uploads/cv_ana_martinez.pdf',
    last_updated: '2024-09-01T10:00:00Z'
  },
  'user_14': {
    summary: 'Estudiante de Marketing Digital con pasión por causas sociales y comunicación digital. Especializada en gestión de redes sociales y creación de contenido.',
    experience: [
      {
        id: 'exp_002',
        position: 'Social Media Intern',
        company: 'Fundación Verde',
        location: 'Barcelona, España',
        start_date: '2024-06-01',
        is_current: true,
        end_date: '',
        description: 'Gestión de redes sociales y creación de contenido para campañas ambientales.',
        achievements: [
          'Incrementé el engagement en Instagram en un 150% en 3 meses',
          'Creé más de 50 piezas de contenido visual',
          'Gestioné campañas que alcanzaron más de 100,000 personas'
        ]
      }
    ],
    education: [
      {
        id: 'edu_002',
        degree: 'Grado en Marketing Digital',
        institution: 'Universidad Pompeu Fabra',
        location: 'Barcelona, España',
        start_date: '2020-09-01',
        end_date: '2024-06-15',
        gpa: '8.7/10',
        relevant_courses: ['Marketing Digital', 'Analítica Web', 'Publicidad Online', 'Comunicación Corporativa']
      }
    ],
    projects: [
      {
        name: 'Campaña #EcoJoven',
        description: 'Campaña de concientización ambiental dirigida a jóvenes universitarios',
        technologies: ['Instagram', 'TikTok', 'Canva', 'Google Analytics'],
        url: 'https://instagram.com/ecojoven2024'
      }
    ],
    volunteer_experience: [
      {
        organization: 'LivingStones',
        role: 'Marketing Specialist',
        start_date: '2024-03-05',
        description: 'Gestión de redes sociales y creación de contenido para campañas de impacto social'
      }
    ],
    cv_file_url: '/uploads/cv_maria_gonzalez.pdf',
    last_updated: '2024-08-28T15:30:00Z'
  }
};
