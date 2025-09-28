// UBICACIÓN: src/modules/projects/volunteer/files/ProjectFilesManager.tsx
// Gestor de archivos para Voluntarios - Vista limitada pero funcional

'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Search, 
  Download,
  Eye,
  Folder,
  Image,
  Video,
  Link,
  MessageSquare,
  Palette,
  Code,
  BarChart3,
  Settings,
  Globe,
  File
} from 'lucide-react';

interface ProjectFile {
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

interface ExternalResource {
  id: string;
  name: string;
  url: string;
  type: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export default function ProjectFilesManager() {
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Estados de datos
  const [mockFiles, setMockFiles] = useState<ProjectFile[]>([
    {
      id: '1',
      name: 'Plan de Trabajo - Centro Comunitario.pdf',
      type: 'document',
      category: 'project_docs',
      size: '2.3 MB',
      uploadedBy: 'Andrea Castillo',
      uploadedAt: '2024-08-15',
      description: 'Plan detallado de actividades y cronograma del proyecto'
    },
    {
      id: '2',
      name: 'Fotos del Sitio - Antes.jpg',
      type: 'image',
      category: 'multimedia',
      size: '1.8 MB',
      uploadedBy: 'Daniel Castro',
      uploadedAt: '2024-08-20',
      description: 'Fotografías del estado actual del centro comunitario'
    },
    {
      id: '3',
      name: 'Permisos Municipales.pdf',
      type: 'document',
      category: 'legal',
      size: '856 KB',
      uploadedBy: 'Ana Martínez',
      uploadedAt: '2024-08-25',
      description: 'Documentación legal y permisos obtenidos'
    },
    {
      id: '4',
      name: 'Video Presentación Proyecto.mp4',
      type: 'video',
      category: 'multimedia',
      size: '45.2 MB',
      uploadedBy: 'Rodrigo Campos',
      uploadedAt: '2024-08-28',
      description: 'Video explicativo del proyecto para la comunidad'
    }
  ]);

  const [externalResources, setExternalResources] = useState<ExternalResource[]>([
    {
      id: '1',
      name: 'Drive del Proyecto',
      url: 'https://drive.google.com/drive/folders/proyecto-centro-comunitario',
      type: 'drive',
      description: 'Carpeta compartida con todos los documentos del proyecto',
      icon: Folder,
      color: 'text-blue-600'
    },
    {
      id: '2',
      name: 'Canal de WhatsApp',
      url: 'https://chat.whatsapp.com/CentroComunitarioSantiago',
      type: 'whatsapp',
      description: 'Grupo para comunicación rápida del equipo',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      id: '3',
      name: 'Repositorio GitHub',
      url: 'https://github.com/livingstone/centro-comunitario',
      type: 'github',
      description: 'Código fuente del sistema de gestión',
      icon: Code,
      color: 'text-gray-800'
    },
    {
      id: '4',
      name: 'Documentación Notion',
      url: 'https://notion.so/centro-comunitario-docs',
      type: 'notion',
      description: 'Base de conocimiento y documentación técnica',
      icon: FileText,
      color: 'text-gray-600'
    }
  ]);

  // Filtrar archivos
  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Filtrar recursos externos
  const filteredResources = externalResources.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'link': return Link;
      default: return File;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project_docs': return 'text-blue-600 bg-blue-50';
      case 'multimedia': return 'text-purple-600 bg-purple-50';
      case 'legal': return 'text-red-600 bg-red-50';
      case 'external_links': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Archivos del Proyecto</h2>
          <p className="text-slate-600 mt-1">Gestiona documentos y recursos del Centro Comunitario Santiago</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Archivos ({mockFiles.length})
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'links'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Enlaces ({externalResources.length})
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar archivos o enlaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {activeTab === 'files' && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todas las categorías</option>
            <option value="project_docs">Documentos del Proyecto</option>
            <option value="multimedia">Multimedia</option>
            <option value="legal">Legal</option>
          </select>
        )}
      </div>

      {/* Content */}
      {activeTab === 'files' ? (
        <div className="space-y-4">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-medium text-slate-900">No hay archivos</h3>
              <p className="mt-1 text-sm text-slate-500">
                {searchTerm ? 'No se encontraron archivos con ese criterio.' : 'Aún no hay archivos en este proyecto.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div key={file.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            <FileIcon className="w-5 h-5 text-slate-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-slate-900 truncate">{file.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">{file.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>Subido por {file.uploadedBy}</span>
                            <span>•</span>
                            <span>{file.uploadedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(file.category)}`}>
                          {file.category === 'project_docs' ? 'Documento' :
                           file.category === 'multimedia' ? 'Multimedia' :
                           file.category === 'legal' ? 'Legal' : 'Otro'}
                        </span>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <ExternalLink className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-medium text-slate-900">No hay enlaces</h3>
              <p className="mt-1 text-sm text-slate-500">
                {searchTerm ? 'No se encontraron enlaces con ese criterio.' : 'Aún no hay enlaces en este proyecto.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredResources.map((resource) => {
                const ResourceIcon = resource.icon;
                return (
                  <div key={resource.id} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                            <ResourceIcon className={`w-5 h-5 ${resource.color}`} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-slate-900">{resource.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">{resource.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-slate-500">{resource.type}</span>
                            <span className="text-xs text-slate-300">•</span>
                            <span className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">
                              {resource.url}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button 
                          onClick={() => window.open(resource.url, '_blank')}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
