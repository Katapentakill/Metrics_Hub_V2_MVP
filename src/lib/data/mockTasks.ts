// UBICACIÓN: src/lib/data/mockTasks.ts
// Datos mock para tareas, actividades y recursos del proyecto

import { Task } from '@/lib/types';

export const mockTasks: Task[] = [
  // Tareas para Centro Comunitario Santiago (p1)
  {
    id: 'task1',
    title: 'Diseño de planos arquitectónicos',
    description: 'Crear planos detallados del centro comunitario incluyendo espacios para talleres, biblioteca y área de reuniones.',
    project_id: 'p1',
    assigned_to: '17', // Daniel Castro
    created_by: '8', // Andrea Castillo
    status: 'done',
    priority: 'high',
    estimated_hours: 32,
    actual_hours: 28,
    due_date: '2024-08-30',
    created_at: '2024-08-15 10:00:00',
    tags: 'arquitectura,diseño,planos'
  },
  {
    id: 'task2',
    title: 'Obtención de permisos municipales',
    description: 'Gestionar todos los permisos necesarios para la construcción con las autoridades locales.',
    project_id: 'p1',
    assigned_to: '12', // Ana Martínez
    created_by: '8',
    status: 'in_progress',
    priority: 'urgent',
    estimated_hours: 24,
    actual_hours: 16,
    due_date: '2024-09-15',
    created_at: '2024-08-20 14:30:00',
    tags: 'legal,permisos,municipal'
  },
  {
    id: 'task3',
    title: 'Presupuesto y cotizaciones',
    description: 'Obtener cotizaciones de materiales y mano de obra para el proyecto de remodelación.',
    project_id: 'p1',
    assigned_to: '23', // Rodrigo Campos
    created_by: '8',
    status: 'review',
    priority: 'medium',
    estimated_hours: 16,
    actual_hours: 12,
    due_date: '2024-09-10',
    created_at: '2024-08-25 09:15:00',
    tags: 'presupuesto,cotizaciones,financiero'
  },
  {
    id: 'task4',
    title: 'Plan de comunicación comunitaria',
    description: 'Desarrollar estrategia para informar a la comunidad sobre el proyecto y sus beneficios.',
    project_id: 'p1',
    status: 'todo',
    priority: 'medium',
    estimated_hours: 20,
    due_date: '2024-09-25',
    created_by: '8',
    created_at: '2024-09-01 16:45:00',
    tags: 'comunicación,comunidad,marketing'
  },

  // Tareas para Programa de Alfabetización Lima (p2)
  {
    id: 'task5',
    title: 'Desarrollo de material didáctico',
    description: 'Crear contenido educativo adaptado para adultos con diferentes niveles de alfabetización.',
    project_id: 'p2',
    assigned_to: '13', // Pedro Sánchez
    created_by: '7', // Miguel Rodríguez
    status: 'in_progress',
    priority: 'high',
    estimated_hours: 40,
    actual_hours: 18,
    due_date: '2024-09-30',
    created_at: '2024-08-10 11:20:00',
    tags: 'educación,material,didáctico'
  },
  {
    id: 'task6',
    title: 'Capacitación de instructores',
    description: 'Formar a los voluntarios que serán instructores en metodologías de enseñanza para adultos.',
    project_id: 'p2',
    assigned_to: '19', // Alberto Vargas
    created_by: '7',
    status: 'todo',
    priority: 'high',
    estimated_hours: 24,
    due_date: '2024-10-15',
    created_at: '2024-08-12 15:30:00',
    tags: 'capacitación,instructores,metodología'
  },
  {
    id: 'task7',
    title: 'Identificación de espacios',
    description: 'Buscar y evaluar locaciones apropiadas para las clases de alfabetización.',
    project_id: 'p2',
    status: 'blocked',
    priority: 'urgent',
    estimated_hours: 12,
    created_by: '7',
    created_at: '2024-08-18 13:45:00',
    tags: 'logística,espacios,evaluación'
  },

  // Tareas para Huertos Urbanos Medellín (p3)
  {
    id: 'task8',
    title: 'Estudio de suelos',
    description: 'Análisis químico y de pH del suelo en las ubicaciones seleccionadas para los huertos.',
    project_id: 'p3',
    assigned_to: '21', // Sergio Delgado
    created_by: '10', // Gabriela Torres
    status: 'done',
    priority: 'high',
    estimated_hours: 16,
    actual_hours: 18,
    due_date: '2024-08-25',
    created_at: '2024-08-01 10:30:00',
    tags: 'suelos,análisis,técnico'
  },
  {
    id: 'task9',
    title: 'Diseño de sistemas de riego',
    description: 'Planificar sistema de riego eficiente y sostenible para los huertos urbanos.',
    project_id: 'p3',
    assigned_to: '26', // Valeria Ortega
    created_by: '10',
    status: 'in_progress',
    priority: 'medium',
    estimated_hours: 28,
    actual_hours: 15,
    due_date: '2024-09-20',
    created_at: '2024-08-05 14:15:00',
    tags: 'riego,sostenibilidad,diseño'
  },
  {
    id: 'task10',
    title: 'Talleres comunitarios de agricultura',
    description: 'Organizar talleres educativos sobre técnicas de agricultura urbana para la comunidad.',
    project_id: 'p3',
    assigned_to: '20', // Elena Morales
    created_by: '10',
    status: 'review',
    priority: 'medium',
    estimated_hours: 32,
    actual_hours: 28,
    due_date: '2024-10-01',
    created_at: '2024-08-08 16:00:00',
    tags: 'talleres,educación,comunidad'
  },

  // Tareas para Clínica Móvil Arequipa (p4)
  {
    id: 'task11',
    title: 'Coordinación con centros de salud',
    description: 'Establecer acuerdos con hospitales y centros de salud locales para apoyo médico.',
    project_id: 'p4',
    assigned_to: '24', // Cristina Vega
    created_by: '9', // Fernando Ruiz
    status: 'done',
    priority: 'high',
    estimated_hours: 20,
    actual_hours: 22,
    due_date: '2024-07-30',
    created_at: '2024-07-10 09:30:00',
    tags: 'coordinación,salud,acuerdos'
  },
  {
    id: 'task12',
    title: 'Logística de medicamentos',
    description: 'Gestionar suministro y distribución de medicamentos básicos para las jornadas.',
    project_id: 'p4',
    assigned_to: '15', // José Ramírez
    created_by: '9',
    status: 'done',
    priority: 'urgent',
    estimated_hours: 16,
    actual_hours: 14,
    due_date: '2024-08-05',
    created_at: '2024-07-15 11:45:00',
    tags: 'medicamentos,logística,suministros'
  },

  // Tareas para Biblioteca Comunitaria CDMX (p5)
  {
    id: 'task13',
    title: 'Catalogación de libros',
    description: 'Organizar y catalogar la colección de libros donados para la biblioteca.',
    project_id: 'p5',
    assigned_to: '16', // Lucía Fernández
    created_by: '11', // Ricardo Mendoza
    status: 'in_progress',
    priority: 'medium',
    estimated_hours: 36,
    actual_hours: 20,
    due_date: '2024-09-30',
    created_at: '2024-08-20 13:20:00',
    tags: 'libros,catalogación,organización'
  },
  {
    id: 'task14',
    title: 'Programa de actividades infantiles',
    description: 'Diseñar calendario de actividades educativas y recreativas para niños.',
    project_id: 'p5',
    assigned_to: '18', // Patricia Jiménez
    created_by: '11',
    status: 'todo',
    priority: 'medium',
    estimated_hours: 24,
    due_date: '2024-10-15',
    created_at: '2024-08-25 15:10:00',
    tags: 'niños,actividades,educación'
  }
];

// Actividades recientes del proyecto (para timeline)
export interface ProjectActivity {
  id: string;
  project_id: string;
  user_id: string;
  type: 'task_completed' | 'task_assigned' | 'comment_added' | 'file_uploaded' | 'milestone_reached' | 'member_joined' | 'member_left';
  title: string;
  description?: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export const mockActivities: ProjectActivity[] = [
  {
    id: 'act1',
    project_id: 'p1',
    user_id: '17',
    type: 'task_completed',
    title: 'Completó la tarea "Diseño de planos arquitectónicos"',
    description: 'Los planos han sido finalizados y están listos para revisión',
    created_at: '2024-08-30 16:45:00',
    metadata: { task_id: 'task1', hours_spent: 28 }
  },
  {
    id: 'act2',
    project_id: 'p1',
    user_id: '8',
    type: 'task_assigned',
    title: 'Asignó nueva tarea a Ana Martínez',
    description: 'Tarea "Obtención de permisos municipales" asignada',
    created_at: '2024-08-29 10:30:00',
    metadata: { task_id: 'task2', assigned_to: '12' }
  },
  {
    id: 'act3',
    project_id: 'p1',
    user_id: '12',
    type: 'comment_added',
    title: 'Añadió un comentario en "Obtención de permisos municipales"',
    description: 'Se ha contactado con la oficina municipal, esperando respuesta',
    created_at: '2024-08-28 14:20:00',
    metadata: { task_id: 'task2' }
  },
  {
    id: 'act4',
    project_id: 'p2',
    user_id: '13',
    type: 'file_uploaded',
    title: 'Subió archivos al proyecto',
    description: 'Material didáctico v1.0 - Nivel básico de alfabetización',
    created_at: '2024-08-27 11:15:00',
    metadata: { file_name: 'material_didactico_v1.pdf', file_size: '2.3MB' }
  },
  {
    id: 'act5',
    project_id: 'p3',
    user_id: '21',
    type: 'task_completed',
    title: 'Completó "Estudio de suelos"',
    description: 'Análisis completado en todas las ubicaciones seleccionadas',
    created_at: '2024-08-26 09:45:00',
    metadata: { task_id: 'task8', hours_spent: 18 }
  },
  {
    id: 'act6',
    project_id: 'p3',
    user_id: '20',
    type: 'member_joined',
    title: 'Se unió al proyecto',
    description: 'Bienvenida Elena Morales como especialista en comunicación',
    created_at: '2024-08-25 16:30:00',
    metadata: { role: 'Especialista en Comunicación' }
  },
  {
    id: 'act7',
    project_id: 'p4',
    user_id: '9',
    type: 'milestone_reached',
    title: 'Hito alcanzado: Primera jornada médica completada',
    description: 'Se atendieron 150 pacientes en la primera jornada',
    created_at: '2024-08-24 18:00:00',
    metadata: { milestone: 'primera_jornada', patients_attended: 150 }
  },
  {
    id: 'act8',
    project_id: 'p5',
    user_id: '16',
    type: 'comment_added',
    title: 'Comentó en la catalogación de libros',
    description: 'Se han catalogado 245 libros infantiles hasta ahora',
    created_at: '2024-08-23 13:30:00',
    metadata: { task_id: 'task13', books_catalogued: 245 }
  },
  {
    id: 'act9',
    project_id: 'p1',
    user_id: '23',
    type: 'task_assigned',
    title: 'Tomó la tarea "Presupuesto y cotizaciones"',
    description: 'Rodrigo se asignó la tarea de presupuesto',
    created_at: '2024-08-22 15:45:00',
    metadata: { task_id: 'task3', self_assigned: true }
  },
  {
    id: 'act10',
    project_id: 'p2',
    user_id: '7',
    type: 'task_assigned',
    title: 'Creó nueva tarea "Capacitación de instructores"',
    description: 'Nueva tarea asignada a Alberto Vargas',
    created_at: '2024-08-21 09:30:00',
    metadata: { task_id: 'task6', assigned_to: '19' }
  }
];

// Recursos del proyecto (documentos, enlaces útiles)
export interface ProjectResource {
  id: string;
  project_id: string;
  name: string;
  type: 'document' | 'link' | 'image' | 'video' | 'presentation';
  url?: string;
  file_path?: string;
  description?: string;
  uploaded_by: string;
  created_at: string;
  size?: number; // en bytes
  is_public: boolean;
}

export const mockResources: ProjectResource[] = [
  // Recursos para Centro Comunitario Santiago (p1)
  {
    id: 'res1',
    project_id: 'p1',
    name: 'Planos arquitectónicos finales',
    type: 'document',
    file_path: '/uploads/p1/planos_arquitectonicos_v3.pdf',
    description: 'Planos definitivos del centro comunitario con todas las especificaciones',
    uploaded_by: '17',
    created_at: '2024-08-30 16:45:00',
    size: 15680000, // 15.68 MB
    is_public: false
  },
  {
    id: 'res2',
    project_id: 'p1',
    name: 'Presupuesto detallado',
    type: 'document',
    file_path: '/uploads/p1/presupuesto_detallado.xlsx',
    description: 'Cotizaciones y presupuesto completo del proyecto',
    uploaded_by: '23',
    created_at: '2024-09-05 11:20:00',
    size: 3240000, // 3.24 MB
    is_public: false
  },
  {
    id: 'res3',
    project_id: 'p1',
    name: 'Presentación del proyecto',
    type: 'presentation',
    file_path: '/uploads/p1/presentacion_comunidad.pptx',
    description: 'Presentación para mostrar a la comunidad los beneficios del proyecto',
    uploaded_by: '8',
    created_at: '2024-08-28 14:30:00',
    size: 8900000, // 8.9 MB
    is_public: true
  },
  {
    id: 'res4',
    project_id: 'p1',
    name: 'Sitio web del municipio',
    type: 'link',
    url: 'https://municipalidad-santiago.cl/permisos-construccion',
    description: 'Portal oficial para tramitar permisos de construcción',
    uploaded_by: '12',
    created_at: '2024-08-25 09:15:00',
    is_public: true
  },

  // Recursos para Programa de Alfabetización Lima (p2)
  {
    id: 'res5',
    project_id: 'p2',
    name: 'Material didáctico - Nivel básico',
    type: 'document',
    file_path: '/uploads/p2/material_nivel_basico.pdf',
    description: 'Cartillas y ejercicios para estudiantes de nivel básico de alfabetización',
    uploaded_by: '13',
    created_at: '2024-08-27 11:15:00',
    size: 2400000, // 2.4 MB
    is_public: true
  },
  {
    id: 'res6',
    project_id: 'p2',
    name: 'Guía metodológica para instructores',
    type: 'document',
    file_path: '/uploads/p2/guia_instructores.pdf',
    description: 'Manual con metodologías de enseñanza para adultos',
    uploaded_by: '19',
    created_at: '2024-08-20 16:45:00',
    size: 5200000, // 5.2 MB
    is_public: false
  },
  {
    id: 'res7',
    project_id: 'p2',
    name: 'Video testimonial',
    type: 'video',
    file_path: '/uploads/p2/testimonial_maria_gonzalez.mp4',
    description: 'Testimonio de una beneficiaria del programa anterior',
    uploaded_by: '7',
    created_at: '2024-08-18 13:30:00',
    size: 45600000, // 45.6 MB
    is_public: true
  },

  // Recursos para Huertos Urbanos Medellín (p3)
  {
    id: 'res8',
    project_id: 'p3',
    name: 'Informe de análisis de suelos',
    type: 'document',
    file_path: '/uploads/p3/analisis_suelos_completo.pdf',
    description: 'Resultados detallados del análisis químico de suelos en todas las ubicaciones',
    uploaded_by: '21',
    created_at: '2024-08-26 10:30:00',
    size: 7800000, // 7.8 MB
    is_public: false
  },
  {
    id: 'res9',
    project_id: 'p3',
    name: 'Diseños de sistemas de riego',
    type: 'image',
    file_path: '/uploads/p3/disenos_riego_v2.png',
    description: 'Esquemas técnicos de los sistemas de riego propuestos',
    uploaded_by: '26',
    created_at: '2024-08-24 15:45:00',
    size: 3200000, // 3.2 MB
    is_public: false
  },
  {
    id: 'res10',
    project_id: 'p3',
    name: 'Manual de agricultura urbana',
    type: 'link',
    url: 'https://fao.org/urban-agriculture/manual-basico',
    description: 'Guía oficial de la FAO sobre técnicas de agricultura urbana',
    uploaded_by: '10',
    created_at: '2024-08-15 11:00:00',
    is_public: true
  },

  // Recursos para Clínica Móvil Arequipa (p4)
  {
    id: 'res11',
    project_id: 'p4',
    name: 'Acuerdos con centros de salud',
    type: 'document',
    file_path: '/uploads/p4/acuerdos_centros_salud.pdf',
    description: 'Convenios firmados con hospitales y centros de salud locales',
    uploaded_by: '24',
    created_at: '2024-07-30 17:20:00',
    size: 4100000, // 4.1 MB
    is_public: false
  },
  {
    id: 'res12',
    project_id: 'p4',
    name: 'Reporte primera jornada',
    type: 'document',
    file_path: '/uploads/p4/reporte_jornada_1.pdf',
    description: 'Estadísticas y resultados de la primera jornada médica',
    uploaded_by: '9',
    created_at: '2024-08-24 19:30:00',
    size: 1800000, // 1.8 MB
    is_public: true
  },

  // Recursos para Biblioteca Comunitaria CDMX (p5)
  {
    id: 'res13',
    project_id: 'p5',
    name: 'Catálogo de libros donados',
    type: 'document',
    file_path: '/uploads/p5/catalogo_libros_v1.xlsx',
    description: 'Lista completa de libros donados organizados por categorías',
    uploaded_by: '16',
    created_at: '2024-08-23 14:15:00',
    size: 890000, // 0.89 MB
    is_public: false
  },
  {
    id: 'res14',
    project_id: 'p5',
    name: 'Programa de actividades infantiles',
    type: 'document',
    file_path: '/uploads/p5/programa_actividades_ninos.pdf',
    description: 'Calendario y descripción de actividades educativas para niños',
    uploaded_by: '18',
    created_at: '2024-08-22 10:45:00',
    size: 2100000, // 2.1 MB
    is_public: true
  }
];

// Comentarios de tareas
export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
  parent_id?: string; // Para respuestas a comentarios
}

export const mockTaskComments: TaskComment[] = [
  {
    id: 'comm1',
    task_id: 'task2',
    user_id: '12',
    content: 'He contactado con la oficina municipal. Me dijeron que el proceso puede tomar entre 2-3 semanas. Voy a hacer seguimiento cada semana.',
    created_at: '2024-08-28 14:20:00'
  },
  {
    id: 'comm2',
    task_id: 'task2',
    user_id: '8',
    content: 'Perfecto Ana. Mientras tanto podemos ir adelantando otros aspectos del proyecto. ¿Necesitas algún documento adicional?',
    created_at: '2024-08-28 15:30:00',
    parent_id: 'comm1'
  },
  {
    id: 'comm3',
    task_id: 'task3',
    user_id: '23',
    content: 'Ya obtuve 3 cotizaciones para materiales. Los precios varían bastante, voy a negociar con los proveedores para obtener mejores tarifas.',
    created_at: '2024-09-03 16:45:00'
  },
  {
    id: 'comm4',
    task_id: 'task5',
    user_id: '13',
    content: 'El material para nivel básico está listo. Ahora voy a trabajar en el material para nivel intermedio. ¿Alguien puede revisar lo que ya terminé?',
    created_at: '2024-08-25 11:30:00'
  },
  {
    id: 'comm5',
    task_id: 'task5',
    user_id: '7',
    content: 'Excelente trabajo Pedro. Yo puedo revisar el material. Te envío mis comentarios antes del viernes.',
    created_at: '2024-08-25 14:15:00',
    parent_id: 'comm4'
  },
  {
    id: 'comm6',
    task_id: 'task9',
    user_id: '26',
    content: 'He estado investigando sistemas de riego por goteo sostenibles. Encontré algunas opciones interesantes que utilizan material reciclado.',
    created_at: '2024-08-20 10:20:00'
  },
  {
    id: 'comm7',
    task_id: 'task13',
    user_id: '16',
    content: 'Progreso actualizado: Ya catalogué 245 libros infantiles y 180 libros para adultos. El sistema de clasificación está funcionando muy bien.',
    created_at: '2024-08-23 13:30:00'
  },
  {
    id: 'comm8',
    task_id: 'task13',
    user_id: '11',
    content: '¡Increíble progreso Lucía! A este ritmo terminaremos antes de lo previsto. ¿Necesitas ayuda adicional con alguna sección específica?',
    created_at: '2024-08-23 16:00:00',
    parent_id: 'comm7'
  }
];