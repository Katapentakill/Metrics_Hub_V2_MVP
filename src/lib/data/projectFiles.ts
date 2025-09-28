// 📁 src/lib/data/projectFiles.ts
// Datos mock para archivos de proyecto (reemplaza datos hardcodeados en componentes)

import { ProjectFile, ExternalResource } from '@/lib/types/files';

// Archivos mock para diferentes proyectos
export const mockProjectFiles: ProjectFile[] = [
  // Archivos para proyecto "Centro Comunitario Santiago" (p1)
  {
    id: '1',
    name: 'Project Charter - Biblioteca Comunitaria.pdf',
    type: 'document',
    category: 'project_docs',
    size: '2.3 MB',
    uploadedBy: 'Ricardo Mendoza',
    uploadedAt: '2024-09-01',
    description: 'Documento principal del proyecto con objetivos y alcance',
    file_path: '/uploads/projects/p1/charter.pdf',
    mime_type: 'application/pdf',
    download_count: 15,
    is_public: false
  },
  {
    id: '2',
    name: 'Plan de Trabajo Q4 2024.xlsx',
    type: 'document',
    category: 'project_docs',
    size: '1.8 MB',
    uploadedBy: 'Lucia Fernández',
    uploadedAt: '2024-09-03',
    description: 'Cronograma detallado de actividades para el último trimestre',
    file_path: '/uploads/projects/p1/plan_trabajo.xlsx',
    mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    download_count: 8,
    is_public: false
  },
  {
    id: '3',
    name: 'Logo Biblioteca Comunitaria.png',
    type: 'image',
    category: 'multimedia',
    size: '456 KB',
    uploadedBy: 'Patricia Jiménez',
    uploadedAt: '2024-08-28',
    description: 'Logo oficial del proyecto en alta resolución',
    file_path: '/uploads/projects/p1/logo.png',
    mime_type: 'image/png',
    download_count: 23,
    is_public: true
  },
  {
    id: '4',
    name: 'Demo Aplicación Web.mp4',
    type: 'video',
    category: 'multimedia',
    size: '15.2 MB',
    uploadedBy: 'Ricardo Mendoza',
    uploadedAt: '2024-09-05',
    description: 'Video demostración de la aplicación web desarrollada',
    file_path: '/uploads/projects/p1/demo.mp4',
    mime_type: 'video/mp4',
    download_count: 12,
    is_public: true
  },
  {
    id: '5',
    name: 'Acuerdo de Voluntariado.pdf',
    type: 'document',
    category: 'legal',
    size: '892 KB',
    uploadedBy: 'Admin Sistema',
    uploadedAt: '2024-08-15',
    description: 'Documento legal de términos y condiciones del voluntariado',
    file_path: '/uploads/legal/acuerdo_voluntariado.pdf',
    mime_type: 'application/pdf',
    download_count: 45,
    is_public: true
  },
  // Archivos para proyecto "Programa de Alfabetización Lima" (p2)
  {
    id: '6',
    name: 'Plan de Trabajo - Centro Comunitario.pdf',
    type: 'document',
    category: 'project_docs',
    size: '2.3 MB',
    uploadedBy: 'Andrea Castillo',
    uploadedAt: '2024-08-15',
    description: 'Plan detallado de actividades y cronograma del proyecto',
    file_path: '/uploads/projects/p2/plan_centro.pdf',
    mime_type: 'application/pdf',
    download_count: 12,
    is_public: false
  },
  {
    id: '7',
    name: 'Fotos del Sitio - Antes.jpg',
    type: 'image',
    category: 'multimedia',
    size: '1.8 MB',
    uploadedBy: 'Daniel Castro',
    uploadedAt: '2024-08-20',
    description: 'Fotografías del estado actual del centro comunitario',
    file_path: '/uploads/projects/p2/fotos_antes.jpg',
    mime_type: 'image/jpeg',
    download_count: 8,
    is_public: true
  },
  {
    id: '8',
    name: 'Permisos Municipales.pdf',
    type: 'document',
    category: 'legal',
    size: '856 KB',
    uploadedBy: 'Ana Martínez',
    uploadedAt: '2024-08-25',
    description: 'Documentación legal y permisos obtenidos',
    file_path: '/uploads/projects/p2/permisos.pdf',
    mime_type: 'application/pdf',
    download_count: 5,
    is_public: false
  },
  {
    id: '9',
    name: 'Video Presentación Proyecto.mp4',
    type: 'video',
    category: 'multimedia',
    size: '45.2 MB',
    uploadedBy: 'Rodrigo Campos',
    uploadedAt: '2024-08-28',
    description: 'Video explicativo del proyecto para la comunidad',
    file_path: '/uploads/projects/p2/presentacion.mp4',
    mime_type: 'video/mp4',
    download_count: 18,
    is_public: true
  }
];

// Recursos externos mock
export const mockExternalResources: ExternalResource[] = [
  {
    id: 'ext_001',
    name: 'Documentación de React',
    url: 'https://react.dev',
    description: 'Documentación oficial de React para desarrollo frontend',
    category: 'documentation',
    color: '#61DAFB'
  },
  {
    id: 'ext_002',
    name: 'Figma Community',
    url: 'https://figma.com/community',
    description: 'Recursos de diseño y plantillas en Figma',
    category: 'tools',
    color: '#F24E1E'
  },
  {
    id: 'ext_003',
    name: 'GitHub Actions',
    url: 'https://github.com/features/actions',
    description: 'Automatización de CI/CD con GitHub Actions',
    category: 'tools',
    color: '#2088FF'
  },
  {
    id: 'ext_004',
    name: 'Material Design Guidelines',
    url: 'https://material.io/design',
    description: 'Guías de diseño de Material Design',
    category: 'references',
    color: '#4285F4'
  },
  {
    id: 'ext_005',
    name: 'Plantilla de Presentación',
    url: 'https://slides.google.com/template',
    description: 'Plantilla estándar para presentaciones del proyecto',
    category: 'templates',
    color: '#34A853'
  },
  {
    id: 'ext_006',
    name: 'Node.js Documentation',
    url: 'https://nodejs.org/docs',
    description: 'Documentación oficial de Node.js para backend',
    category: 'documentation',
    color: '#339933'
  },
  {
    id: 'ext_007',
    name: 'MongoDB Atlas',
    url: 'https://cloud.mongodb.com',
    description: 'Base de datos en la nube para el proyecto',
    category: 'tools',
    color: '#47A248'
  }
];

// Función para obtener archivos por proyecto
export const getProjectFiles = (projectId: string): ProjectFile[] => {
  return mockProjectFiles.filter(file => 
    file.file_path?.includes(`/projects/${projectId}/`) || 
    file.file_path?.includes('/legal/') ||
    file.file_path?.includes('/uploads/')
  );
};

// Función para obtener recursos externos por categoría
export const getExternalResourcesByCategory = (category?: string): ExternalResource[] => {
  if (!category || category === 'all') {
    return mockExternalResources;
  }
  return mockExternalResources.filter(resource => resource.category === category);
};
