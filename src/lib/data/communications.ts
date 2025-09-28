// 📁 src/lib/data/communications.ts
// Datos mock para comunicaciones y notificaciones

import { Communication, CommunicationStats } from '@/lib/types/communications';
import { Notification } from '@/lib/types/notifications';

// Comunicaciones mock completas para todos los roles
export const mockCommunications: Communication[] = [
  {
    id: 'comm-1',
    title: 'Nueva Biblioteca Comunitaria Inaugurada en Guatemala',
    content: 'Con gran emoción anunciamos la inauguración de nuestra nueva biblioteca comunitaria en Antigua, Guatemala. Este espacio servirá como centro de aprendizaje y desarrollo para más de 500 niños de la comunidad local.',
    type: 'news' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-1',
    author_name: 'Ana García',
    created_at: '2024-09-20T10:00:00Z',
    published_at: '2024-09-20T10:00:00Z',
    updated_at: '2024-09-20T10:00:00Z',
    tags: ['guatemala', 'biblioteca', 'inauguración'],
    image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    excerpt: 'Inauguración exitosa beneficiará a más de 500 niños de la comunidad.',
    read_count: 245,
    likes_count: 18,
    comments_count: 7,
    featured: true,
    target_audience: 'all' as const,
    location: 'Antigua, Guatemala'
  },
  {
    id: 'comm-2',
    title: 'Actualización Importante: Nuevos Protocolos de Seguridad',
    content: 'Se han implementado nuevos protocolos de seguridad para todos los proyectos comunitarios. Como líder de proyecto, es fundamental que revises y apliques estas medidas en tu equipo. Los cambios incluyen procedimientos de emergencia actualizados y nuevos requisitos de reporte.',
    type: 'announcement' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-2',
    author_name: 'Carlos Mendoza',
    created_at: '2024-09-19T14:30:00Z',
    published_at: '2024-09-19T14:30:00Z',
    updated_at: '2024-09-19T14:30:00Z',
    tags: ['seguridad', 'protocolos', 'líderes', 'procedimientos'],
    excerpt: 'Nuevos protocolos de seguridad implementados para todos los proyectos.',
    read_count: 156,
    likes_count: 12,
    comments_count: 5,
    featured: false,
    target_audience: 'leads' as const,
    deadline: '2024-10-01T23:59:59Z'
  },
  {
    id: 'comm-3',
    title: 'Convocatoria: Voluntarios para Clínica Móvil en Ecuador',
    content: 'Buscamos voluntarios con experiencia médica para unirse a nuestro programa de clínica móvil en Quito, Ecuador. Esta iniciativa llevará atención médica básica a comunidades rurales de difícil acceso.',
    type: 'announcement' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-2',
    author_name: 'Carlos Mendoza',
    created_at: '2024-09-19T14:30:00Z',
    published_at: '2024-09-19T14:30:00Z',
    updated_at: '2024-09-19T14:30:00Z',
    tags: ['ecuador', 'voluntarios', 'salud', 'convocatoria'],
    excerpt: 'Se necesitan profesionales médicos para programa de atención rural.',
    read_count: 156,
    likes_count: 12,
    comments_count: 5,
    featured: false,
    target_audience: 'volunteers' as const,
    location: 'Quito, Ecuador',
    deadline: '2024-10-15T23:59:59Z'
  },
  {
    id: 'comm-4',
    title: 'Actualización: Proyecto Huertos Urbanos en Valencia',
    content: 'El proyecto de huertos urbanos en Valencia, Venezuela, ha alcanzado el 60% de avance. Se han establecido 15 huertos comunitarios que benefician a más de 200 familias con acceso a alimentos frescos y nutritivos.',
    type: 'update' as const,
    priority: 'medium' as const,
    status: 'published' as const,
    author_id: 'user-3',
    author_name: 'María López',
    created_at: '2024-09-18T09:15:00Z',
    published_at: '2024-09-18T09:15:00Z',
    updated_at: '2024-09-18T09:15:00Z',
    tags: ['venezuela', 'huertos', 'progreso', 'alimentación'],
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    excerpt: '15 huertos establecidos benefician a más de 200 familias.',
    read_count: 89,
    likes_count: 8,
    comments_count: 3,
    featured: false,
    target_audience: 'all' as const,
    location: 'Valencia, Venezuela'
  },
  {
    id: 'comm-5',
    title: 'Recordatorio: Reunión Mensual de Coordinadores y Líderes',
    content: 'Se recuerda a todos los coordinadores y líderes de proyecto la reunión mensual programada para el viernes 25 de septiembre a las 3:00 PM (GMT-5). Se revisarán los avances de todos los proyectos activos y se discutirán nuevas iniciativas. La asistencia es obligatoria.',
    type: 'reminder' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-1',
    author_name: 'Ana García',
    created_at: '2024-09-17T11:00:00Z',
    published_at: '2024-09-17T11:00:00Z',
    updated_at: '2024-09-17T11:00:00Z',
    tags: ['reunión', 'coordinadores', 'líderes', 'gestión'],
    excerpt: 'Reunión mensual obligatoria el viernes 25 de septiembre a las 3:00 PM.',
    read_count: 34,
    likes_count: 2,
    comments_count: 1,
    featured: false,
    target_audience: 'coordinators' as const,
    event_date: '2024-09-25T20:00:00Z',
    deadline: '2024-09-25T19:00:00Z'
  },
  {
    id: 'comm-6',
    title: 'Recordatorio: Reunión Mensual de Coordinadores',
    content: 'Se recuerda a todos los coordinadores de proyecto la reunión mensual programada para el viernes 25 de septiembre a las 3:00 PM (GMT-5). Se revisarán los avances de todos los proyectos activos.',
    type: 'reminder' as const,
    priority: 'medium' as const,
    status: 'published' as const,
    author_id: 'user-1',
    author_name: 'Ana García',
    created_at: '2024-09-17T11:00:00Z',
    published_at: '2024-09-17T11:00:00Z',
    updated_at: '2024-09-17T11:00:00Z',
    tags: ['reunión', 'coordinadores', 'gestión'],
    excerpt: 'Reunión mensual el viernes 25 de septiembre a las 3:00 PM.',
    read_count: 34,
    likes_count: 2,
    comments_count: 1,
    featured: false,
    target_audience: 'coordinators' as const,
    event_date: '2024-09-25T20:00:00Z'
  },
  {
    id: 'comm-7',
    title: 'Celebrando 2 Años de Impacto Comunitario',
    content: 'Este mes celebramos dos años de trabajo continuo en América Latina. Hemos impactado positivamente a más de 5,000 personas a través de nuestros proyectos de educación, salud y desarrollo sostenible.',
    type: 'news' as const,
    priority: 'medium' as const,
    status: 'published' as const,
    author_id: 'user-4',
    author_name: 'Roberto Silva',
    created_at: '2024-09-16T16:45:00Z',
    published_at: '2024-09-16T16:45:00Z',
    updated_at: '2024-09-16T16:45:00Z',
    tags: ['aniversario', 'impacto', 'celebración', 'latinoamérica'],
    image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
    excerpt: 'Dos años impactando positivamente a más de 5,000 personas.',
    read_count: 312,
    likes_count: 45,
    comments_count: 23,
    featured: true,
    target_audience: 'all' as const
  },
  {
    id: 'comm-8',
    title: 'Capacitación Obligatoria: Gestión de Equipos de Proyecto',
    content: 'Todos los líderes de proyecto deben participar en el taller de capacitación sobre gestión de equipos comunitarios. El evento será virtual y se realizará los días 5 y 6 de octubre de 2:00 PM a 6:00 PM (GMT-5). Se expedirán certificados de participación.',
    type: 'event' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-5',
    author_name: 'Elena Rodríguez',
    created_at: '2024-09-15T13:20:00Z',
    published_at: '2024-09-15T13:20:00Z',
    updated_at: '2024-09-15T13:20:00Z',
    tags: ['capacitación', 'líderes', 'gestión', 'equipos', 'obligatorio'],
    excerpt: 'Capacitación obligatoria para líderes los días 5 y 6 de octubre.',
    read_count: 78,
    likes_count: 6,
    comments_count: 4,
    featured: true,
    target_audience: 'leads' as const,
    event_date: '2024-10-05T19:00:00Z',
    deadline: '2024-10-01T23:59:59Z'
  },
  {
    id: 'comm-9',
    title: 'Capacitación: Gestión de Proyectos Comunitarios',
    content: 'Invitamos a todos los voluntarios a participar en nuestro taller de capacitación sobre gestión de proyectos comunitarios. El evento será virtual y se realizará los días 5 y 6 de octubre.',
    type: 'event' as const,
    priority: 'medium' as const,
    status: 'published' as const,
    author_id: 'user-5',
    author_name: 'Elena Rodríguez',
    created_at: '2024-09-15T13:20:00Z',
    published_at: '2024-09-15T13:20:00Z',
    updated_at: '2024-09-15T13:20:00Z',
    tags: ['capacitación', 'gestión', 'proyectos', 'taller'],
    excerpt: 'Taller virtual de gestión de proyectos los días 5 y 6 de octubre.',
    read_count: 78,
    likes_count: 6,
    comments_count: 4,
    featured: false,
    target_audience: 'volunteers' as const,
    event_date: '2024-10-05T15:00:00Z',
    registration_required: true
  },
  {
    id: 'comm-10',
    title: 'Proceso de Evaluación Trimestral Q4 2024',
    content: 'Iniciamos el proceso de evaluación trimestral para Q4 2024. Todos los líderes de proyecto deben completar la autoevaluación y la evaluación de su equipo antes del 15 de octubre. Los formularios están disponibles en el portal interno.',
    type: 'announcement' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-2',
    author_name: 'Carlos Mendoza',
    created_at: '2024-09-14T08:00:00Z',
    published_at: '2024-09-14T08:00:00Z',
    updated_at: '2024-09-14T08:00:00Z',
    tags: ['evaluación', 'Q4', 'líderes', 'autoevaluación', 'equipo'],
    excerpt: 'Evaluación trimestral Q4 debe completarse antes del 15 de octubre.',
    read_count: 145,
    likes_count: 8,
    comments_count: 12,
    featured: false,
    target_audience: 'leads' as const,
    deadline: '2024-10-15T23:59:59Z'
  },
  {
    id: 'comm-11',
    title: 'Nuevos Recursos Disponibles: Toolkit de Liderazgo',
    content: 'Hemos lanzado un nuevo toolkit de liderazgo con plantillas, guías y herramientas para mejorar la gestión de proyectos comunitarios. Incluye matrices de seguimiento, formatos de reporte y estrategias de motivación de equipos.',
    type: 'update' as const,
    priority: 'medium' as const,
    status: 'published' as const,
    author_id: 'user-5',
    author_name: 'Elena Rodríguez',
    created_at: '2024-09-13T10:30:00Z',
    published_at: '2024-09-13T10:30:00Z',
    updated_at: '2024-09-13T10:30:00Z',
    tags: ['toolkit', 'liderazgo', 'recursos', 'plantillas', 'gestión'],
    excerpt: 'Nuevo toolkit con herramientas para mejorar la gestión de proyectos.',
    read_count: 67,
    likes_count: 11,
    comments_count: 6,
    featured: false,
    target_audience: 'leads' as const
  },
  {
    id: 'comm-12',
    title: 'Políticas de Recursos Humanos Actualizadas',
    content: 'Se han actualizado las políticas de recursos humanos para incluir nuevas directrices sobre trabajo remoto, políticas de vacaciones y procedimientos de evaluación de desempeño. Todos los empleados deben revisar estos cambios.',
    type: 'announcement' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-1',
    author_name: 'Ana García',
    created_at: '2024-09-12T09:00:00Z',
    published_at: '2024-09-12T09:00:00Z',
    updated_at: '2024-09-12T09:00:00Z',
    tags: ['RRHH', 'políticas', 'actualización', 'empleados'],
    excerpt: 'Nuevas políticas de RRHH incluyen directrices sobre trabajo remoto.',
    read_count: 98,
    likes_count: 5,
    comments_count: 3,
    featured: false,
    target_audience: 'hr' as const,
    deadline: '2024-10-01T23:59:59Z'
  },
  {
    id: 'comm-13',
    title: 'Reunión Ejecutiva: Estrategia Q4 2024',
    content: 'Se convoca a todos los miembros del equipo ejecutivo a la reunión estratégica para el cuarto trimestre. Se discutirán objetivos, presupuestos y nuevas iniciativas para cerrar el año.',
    type: 'announcement' as const,
    priority: 'high' as const,
    status: 'published' as const,
    author_id: 'user-4',
    author_name: 'Roberto Silva',
    created_at: '2024-09-11T14:00:00Z',
    published_at: '2024-09-11T14:00:00Z',
    updated_at: '2024-09-11T14:00:00Z',
    tags: ['ejecutivo', 'estrategia', 'Q4', 'reunión'],
    excerpt: 'Reunión ejecutiva para definir estrategia del Q4 2024.',
    read_count: 23,
    likes_count: 2,
    comments_count: 1,
    featured: false,
    target_audience: 'admin' as const,
    event_date: '2024-09-30T15:00:00Z',
    deadline: '2024-09-28T23:59:59Z'
  }
];

// Mock data para usuarios (autores)
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Ana García',
    email: 'ana.garcia@org.com',
    role: 'Coordinadora General',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
  },
  {
    id: 'user-2',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@org.com',
    role: 'Coordinador de Operaciones',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: 'user-3',
    name: 'María López',
    email: 'maria.lopez@org.com',
    role: 'Coordinadora de Proyectos',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  },
  {
    id: 'user-4',
    name: 'Roberto Silva',
    email: 'roberto.silva@org.com',
    role: 'Director Regional',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'user-5',
    name: 'Elena Rodríguez',
    email: 'elena.rodriguez@org.com',
    role: 'Especialista en Desarrollo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  }
];

// Funciones utilitarias para filtrar comunicaciones por rol
export const getCommunicationsByRole = (role: string) => {
  const allowedAudiences = getRoleAudiences(role);
  return mockCommunications.filter(comm => 
    allowedAudiences.includes(comm.target_audience as any)
  );
};

export const getRoleAudiences = (role: string): string[] => {
  switch (role) {
    case 'volunteer':
      return ['all', 'volunteers'];
    case 'lead':
      return ['all', 'coordinators', 'leads'];
    case 'admin':
      return ['all', 'coordinators', 'leads', 'volunteers', 'admin'];
    case 'hr':
      return ['all', 'coordinators', 'leads', 'volunteers', 'hr'];
    default:
      return ['all'];
  }
};

export const getCommunicationStatsByRole = (role: string) => {
  const filteredCommunications = getCommunicationsByRole(role);
  
  return {
    total_communications: filteredCommunications.length,
    published_communications: filteredCommunications.filter(c => c.status === 'published').length,
    total_reads: filteredCommunications.reduce((acc, c) => acc + c.read_count, 0),
    total_likes: filteredCommunications.reduce((acc, c) => acc + c.likes_count, 0),
    total_comments: filteredCommunications.reduce((acc, c) => acc + c.comments_count, 0),
    featured_communications: filteredCommunications.filter(c => c.featured).length,
    this_month_communications: filteredCommunications.filter(c => {
      const created = new Date(c.created_at);
      const now = new Date();
      return created.getMonth() === now.getMonth() && 
             created.getFullYear() === now.getFullYear();
    }).length
  };
};

// Estadísticas de comunicaciones mock (legacy - mantener para compatibilidad)
export const mockCommunicationStats: CommunicationStats = {
  total_communications: 13,
  published_communications: 13,
  draft_communications: 0,
  archived_communications: 0
};

// Notificaciones mock
export const mockNotifications: Notification[] = [
  {
    id: 'notif_001',
    user_id: '17',
    type: 'task_assigned',
    title: 'Nueva tarea asignada',
    message: 'Se te ha asignado la tarea "Diseñar mockups de la aplicación"',
    data: JSON.stringify({ task_id: 'task_001', project_id: 'p1' }),
    is_read: 0,
    created_at: '2024-08-01T10:00:00Z'
  },
  {
    id: 'notif_002',
    user_id: '17',
    type: 'evaluation_due',
    title: 'Evaluación pendiente',
    message: 'Tienes una evaluación pendiente que vence el 30 de septiembre',
    data: JSON.stringify({ evaluation_id: 'eval_001' }),
    is_read: 0,
    created_at: '2024-08-03T09:15:00Z'
  },
  {
    id: 'notif_003',
    user_id: '17',
    type: 'system_update',
    title: 'Actualización del sistema',
    message: 'El sistema ha sido actualizado con nuevas funcionalidades',
    is_read: 1,
    created_at: '2024-08-05T16:45:00Z'
  }
];
