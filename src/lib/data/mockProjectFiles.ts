// 📁 src/lib/data/mockProjectFiles.ts
// Datos mock centralizados para archivos y recursos de proyectos

export interface ProjectFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'link' | 'other';
  category: 'project_docs' | 'external_links' | 'multimedia' | 'legal';
  url?: string;
  size?: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

export interface ExternalResource {
  id: string;
  name: string;
  url: string;
  type: 'drive' | 'slack' | 'whatsapp' | 'figma' | 'github' | 'notion' | 'other';
  description: string;
  icon: string;
  color: string;
}

export const mockProjectFiles: ProjectFile[] = [
  {
    id: '1',
    name: 'Project Charter - Biblioteca Comunitaria.pdf',
    type: 'document',
    category: 'project_docs',
    size: '2.3 MB',
    uploadedBy: 'Ricardo Mendoza',
    uploadedAt: '2024-09-01',
    description: 'Documento principal del proyecto con objetivos y alcance'
  },
  {
    id: '2',
    name: 'Plan de Trabajo Q4 2024.xlsx',
    type: 'document',
    category: 'project_docs',
    size: '1.8 MB',
    uploadedBy: 'Lucia Fernández',
    uploadedAt: '2024-09-03',
    description: 'Cronograma detallado de actividades para el último trimestre'
  },
  {
    id: '3',
    name: 'Logo Biblioteca Comunitaria.png',
    type: 'image',
    category: 'multimedia',
    size: '456 KB',
    uploadedBy: 'Patricia Jiménez',
    uploadedAt: '2024-08-28',
    description: 'Logo oficial del proyecto en alta resolución'
  },
  {
    id: '4',
    name: 'Demo Aplicación Web.mp4',
    type: 'video',
    category: 'multimedia',
    size: '15.2 MB',
    uploadedBy: 'Ricardo Mendoza',
    uploadedAt: '2024-09-05',
    description: 'Video demostración de la aplicación web desarrollada'
  },
  {
    id: '5',
    name: 'Acuerdo de Voluntariado.pdf',
    type: 'document',
    category: 'legal',
    size: '892 KB',
    uploadedBy: 'Admin Sistema',
    uploadedAt: '2024-08-15',
    description: 'Documento legal de términos y condiciones del voluntariado'
  },
  {
    id: '6',
    name: 'Manual de Usuario v2.1.pdf',
    type: 'document',
    category: 'project_docs',
    size: '3.1 MB',
    uploadedBy: 'Ana Martínez',
    uploadedAt: '2024-09-08',
    description: 'Manual actualizado con nuevas funcionalidades'
  },
  {
    id: '7',
    name: 'Wireframes Mobile.png',
    type: 'image',
    category: 'multimedia',
    size: '1.2 MB',
    uploadedBy: 'María González',
    uploadedAt: '2024-09-02',
    description: 'Diseños de interfaz para aplicación móvil'
  },
  {
    id: '8',
    name: 'Presentación Stakeholders.pptx',
    type: 'document',
    category: 'project_docs',
    size: '4.5 MB',
    uploadedBy: 'Fernando Ruiz',
    uploadedAt: '2024-08-30',
    description: 'Presentación para reunión con stakeholders'
  }
];

export const mockExternalResources: ExternalResource[] = [
  {
    id: '1',
    name: 'Drive del Proyecto',
    url: 'https://drive.google.com/drive/folders/proyecto-biblioteca',
    type: 'drive',
    description: 'Carpeta compartida con todos los documentos del proyecto',
    icon: 'Folder',
    color: 'text-blue-600'
  },
  {
    id: '2',
    name: 'Canal de Slack',
    url: 'https://livingstone.slack.com/channels/biblioteca-cdmx',
    type: 'slack',
    description: 'Canal principal de comunicación del equipo',
    icon: 'MessageSquare',
    color: 'text-purple-600'
  },
  {
    id: '3',
    name: 'Grupo WhatsApp',
    url: 'https://chat.whatsapp.com/BibliotecaCDMX',
    type: 'whatsapp',
    description: 'Grupo para comunicación rápida y coordinación diaria',
    icon: 'MessageSquare',
    color: 'text-green-600'
  },
  {
    id: '4',
    name: 'Diagramas en Figma',
    url: 'https://figma.com/file/biblioteca-wireframes',
    type: 'figma',
    description: 'Diseños y prototipos de la aplicación',
    icon: 'Palette',
    color: 'text-pink-600'
  },
  {
    id: '5',
    name: 'Repositorio GitHub',
    url: 'https://github.com/livingstones/biblioteca-comunitaria',
    type: 'github',
    description: 'Código fuente del proyecto',
    icon: 'Code',
    color: 'text-gray-600'
  },
  {
    id: '6',
    name: 'Dashboard Analytics',
    url: 'https://analytics.google.com/biblioteca-metrics',
    type: 'other',
    description: 'Métricas y estadísticas del proyecto',
    icon: 'BarChart3',
    color: 'text-orange-600'
  },
  {
    id: '7',
    name: 'Configuración Servidor',
    url: 'https://notion.so/server-config-biblioteca',
    type: 'notion',
    description: 'Documentación técnica del servidor',
    icon: 'Settings',
    color: 'text-indigo-600'
  },
  {
    id: '8',
    name: 'Sitio Web Público',
    url: 'https://biblioteca-comunitaria.org',
    type: 'other',
    description: 'Sitio web público del proyecto',
    icon: 'Globe',
    color: 'text-teal-600'
  }
];

// Función para obtener archivos por categoría
export function getFilesByCategory(files: ProjectFile[], category: string): ProjectFile[] {
  if (category === 'all') return files;
  return files.filter(file => file.category === category);
}

// Función para obtener recursos por tipo
export function getResourcesByType(resources: ExternalResource[], type: string): ExternalResource[] {
  if (type === 'all') return resources;
  return resources.filter(resource => resource.type === type);
}

// Función para buscar archivos
export function searchFiles(files: ProjectFile[], searchTerm: string): ProjectFile[] {
  if (!searchTerm) return files;
  
  const searchLower = searchTerm.toLowerCase();
  return files.filter(file => 
    file.name.toLowerCase().includes(searchLower) ||
    file.description?.toLowerCase().includes(searchLower) ||
    file.uploadedBy.toLowerCase().includes(searchLower)
  );
}

// Función para buscar recursos externos
export function searchResources(resources: ExternalResource[], searchTerm: string): ExternalResource[] {
  if (!searchTerm) return resources;
  
  const searchLower = searchTerm.toLowerCase();
  return resources.filter(resource => 
    resource.name.toLowerCase().includes(searchLower) ||
    resource.description.toLowerCase().includes(searchLower)
  );
}
