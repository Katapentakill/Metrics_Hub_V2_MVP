// UBICACIÓN: src/modules/projects/volunteer/files/ProjectFilesManagerUpdated.tsx
// Gestor de archivos para Voluntarios - Versión actualizada con tipos organizados

'use client';

import React, { useState, useMemo } from 'react';
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

// Importar tipos organizados
import { ProjectFile, ExternalResource } from '@/lib/types/files';
import { mockProjectFiles, mockExternalResources } from '@/lib/data';

interface ProjectFilesManagerProps {
  projectId?: string;
}

export default function ProjectFilesManagerUpdated({ projectId = 'p1' }: ProjectFilesManagerProps) {
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Usar datos mock organizados en lugar de datos hardcodeados
  const projectFiles = useMemo(() => mockProjectFiles, []);
  const externalResources = useMemo(() => mockExternalResources, []);

  // Filtrar archivos por búsqueda y categoría
  const filteredFiles = useMemo(() => {
    let filtered = projectFiles;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((file: ProjectFile) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((file: ProjectFile) => file.category === selectedCategory);
    }

    return filtered;
  }, [projectFiles, searchTerm, selectedCategory]);

  // Filtrar recursos externos por búsqueda y categoría
  const filteredResources = useMemo(() => {
    let filtered = externalResources;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((resource: ExternalResource) =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [externalResources, searchTerm]);

  // Obtener icono según el tipo de archivo
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'audio':
        return MessageSquare;
      case 'archive':
        return Folder;
      default:
        return File;
    }
  };

  // Obtener icono según la categoría de recurso
  const getResourceIcon = (category: string) => {
    switch (category) {
      case 'documentation':
        return FileText;
      case 'tools':
        return Settings;
      case 'references':
        return BarChart3;
      case 'templates':
        return Palette;
      default:
        return Globe;
    }
  };

  // Formatear tamaño de archivo
  const formatFileSize = (size: string) => {
    return size;
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Archivos del Proyecto</h2>
          <p className="text-gray-600">Gestiona documentos y recursos del proyecto</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Archivos ({projectFiles.length})
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'links'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <ExternalLink className="w-4 h-4 inline mr-2" />
            Enlaces ({externalResources.length})
          </button>
        </nav>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        {activeTab === 'files' && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            <option value="project_docs">Documentos del Proyecto</option>
            <option value="multimedia">Multimedia</option>
            <option value="legal">Legal</option>
            <option value="technical">Técnico</option>
            <option value="presentations">Presentaciones</option>
          </select>
        )}
      </div>

      {/* Contenido de archivos */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay archivos</h3>
              <p className="text-gray-500">No se encontraron archivos que coincidan con los filtros.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFiles.map((file: ProjectFile) => {
                const IconComponent = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {file.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>Subido por {file.uploadedBy}</span>
                            <span>•</span>
                            <span>{formatDate(file.uploadedAt)}</span>
                            <span>•</span>
                            <span>{formatFileSize(file.size)}</span>
                            {file.download_count && (
                              <>
                                <span>•</span>
                                <span>{file.download_count} descargas</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
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
      )}

      {/* Contenido de enlaces */}
      {activeTab === 'links' && (
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <ExternalLink className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay enlaces</h3>
              <p className="text-gray-500">No se encontraron enlaces que coincidan con los filtros.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredResources.map((resource: ExternalResource) => {
                const IconComponent = getResourceIcon(resource.category);
                return (
                  <div
                    key={resource.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${resource.color}20` }}
                          >
                            <IconComponent className="w-5 h-5" style={{ color: resource.color }} />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {resource.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {resource.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="capitalize">{resource.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
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
