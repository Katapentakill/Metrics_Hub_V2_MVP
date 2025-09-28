// 📁 src/lib/data/files.ts
// Datos mock para archivos y documentos

import { ProjectFile, ExternalResource, Document, CertificateData } from '@/lib/types/files';

// Archivos de proyecto mock
export const mockProjectFiles: ProjectFile[] = [
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
  }
];

// Documentos mock
export const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    user_id: '17',
    type: 'certificate',
    title: 'Certificado de Participación - Proyecto Biblioteca Comunitaria',
    content: 'Certificado que acredita la participación en el proyecto...',
    verification_code: 'CERT-2024-001',
    status: 'generated',
    expires_at: '2025-12-31',
    created_at: '2024-08-01T10:00:00Z',
    metadata: JSON.stringify({
      project_id: 'p1',
      hours_contributed: 120,
      skills_developed: ['React', 'Node.js', 'MongoDB']
    })
  },
  {
    id: 'doc_002',
    user_id: '17',
    type: 'letter',
    title: 'Carta de Recomendación - Daniel Castro',
    content: 'Carta de recomendación para Daniel Castro por su excelente trabajo...',
    verification_code: 'LETTER-2024-001',
    status: 'sent',
    created_at: '2024-08-15T14:30:00Z',
    metadata: JSON.stringify({
      project_id: 'p1',
      role: 'Desarrollador Frontend',
      performance_rating: 4.5
    })
  }
];

// Datos de certificados mock
export const mockCertificateData: CertificateData[] = [
  {
    type: 'participation',
    recipient_name: 'Daniel Castro',
    service_period: {
      start_date: '2024-06-01',
      end_date: '2024-08-31'
    },
    total_hours: 120,
    main_project: 'Biblioteca Comunitaria',
    key_skills: ['React', 'Node.js', 'MongoDB', 'Git'],
    verification_code: 'CERT-2024-001',
    issued_date: '2024-09-01',
    expires_date: '2025-12-31',
    issuer_signature: 'Carlos Gutiérrez - Director Técnico'
  },
  {
    type: 'outstanding_contribution',
    recipient_name: 'Ana Martínez',
    service_period: {
      start_date: '2024-03-01',
      end_date: '2024-08-31'
    },
    total_hours: 200,
    main_project: 'Programa Educativo Infantil',
    key_skills: ['Marketing Digital', 'Content Creation', 'Social Media'],
    verification_code: 'CERT-2024-002',
    issued_date: '2024-09-01',
    expires_date: '2025-12-31',
    issuer_signature: 'Laura Pérez - Coordinadora de Proyectos'
  }
];
