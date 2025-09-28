// UBICACIÓN: src/modules/projects/admin/files/ProjectFilesManager.tsx
// Gestor de archivos CON modales funcionales

'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Upload, 
  Search, 
  Download,
  Eye,
  Trash2,
  Plus,
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
  Edit
} from 'lucide-react';
import { mockProjectFiles, mockExternalResources } from '@/lib/data/mockProjectFiles';

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
  type: 'drive' | 'slack' | 'whatsapp' | 'figma' | 'github' | 'notion' | 'other';
  description: string;
  icon: string;
  color: string;
}

export default function ProjectFilesManager() {
  const [activeTab, setActiveTab] = useState<'files' | 'links'>('files');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Estados de modales
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [showEditFileModal, setShowEditFileModal] = useState(false);
  const [showEditLinkModal, setShowEditLinkModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [selectedLink, setSelectedLink] = useState<ExternalResource | null>(null);

  // Estados de datos - usar mocks centralizados
  const [mockFiles, setMockFiles] = useState<ProjectFile[]>(mockProjectFiles);

  const [externalResources, setExternalResources] = useState<ExternalResource[]>(mockExternalResources);

  const getFileIcon = (type: ProjectFile['type']) => {
    switch (type) {
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Video;
      case 'link': return Link;
      default: return FileText;
    }
  };

  const getCategoryLabel = (category: ProjectFile['category']) => {
    switch (category) {
      case 'project_docs': return 'Documentos del Proyecto';
      case 'external_links': return 'Enlaces Externos';
      case 'multimedia': return 'Multimedia';
      case 'legal': return 'Documentos Legales';
      default: return 'Otros';
    }
  };

  const getCategoryColor = (category: ProjectFile['category']) => {
    switch (category) {
      case 'project_docs': return 'bg-blue-100 text-blue-800';
      case 'external_links': return 'bg-green-100 text-green-800';
      case 'multimedia': return 'bg-purple-100 text-purple-800';
      case 'legal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Folder': return Folder;
      case 'MessageSquare': return MessageSquare;
      case 'Palette': return Palette;
      case 'Code': return Code;
      case 'BarChart3': return BarChart3;
      case 'Settings': return Settings;
      case 'Globe': return Globe;
      case 'FileText': return FileText;
      default: return ExternalLink;
    }
  };

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handlers para archivos
  const handleAddFile = (fileData: Partial<ProjectFile>) => {
    const newFile: ProjectFile = {
      id: `file_${Date.now()}`,
      name: fileData.name || '',
      type: fileData.type || 'document',
      category: fileData.category || 'project_docs',
      size: fileData.size || '0 KB',
      uploadedBy: 'Usuario Actual',
      uploadedAt: new Date().toISOString().split('T')[0],
      description: fileData.description || ''
    };
    setMockFiles([...mockFiles, newFile]);
    setShowAddFileModal(false);
  };

  const handleEditFile = (fileData: Partial<ProjectFile>) => {
    if (!selectedFile) return;
    
    setMockFiles(mockFiles.map(file => 
      file.id === selectedFile.id 
        ? { ...file, ...fileData }
        : file
    ));
    setShowEditFileModal(false);
    setSelectedFile(null);
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      setMockFiles(mockFiles.filter(file => file.id !== fileId));
    }
  };

  // Handlers para enlaces
  const handleAddLink = (linkData: Partial<ExternalResource>) => {
    const newLink: ExternalResource = {
      id: `link_${Date.now()}`,
      name: linkData.name || '',
      url: linkData.url || '',
      type: linkData.type || 'other',
      description: linkData.description || '',
      icon: 'Globe',
      color: 'text-blue-600'
    };
    setExternalResources([...externalResources, newLink]);
    setShowAddLinkModal(false);
  };

  const handleEditLink = (linkData: Partial<ExternalResource>) => {
    if (!selectedLink) return;
    
    setExternalResources(externalResources.map(link => 
      link.id === selectedLink.id 
        ? { ...link, ...linkData }
        : link
    ));
    setShowEditLinkModal(false);
    setSelectedLink(null);
  };

  const handleDeleteLink = (linkId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este enlace?')) {
      setExternalResources(externalResources.filter(link => link.id !== linkId));
    }
  };

  const openEditFile = (file: ProjectFile) => {
    setSelectedFile(file);
    setShowEditFileModal(true);
  };

  const openEditLink = (link: ExternalResource) => {
    setSelectedLink(link);
    setShowEditLinkModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Archivos y Recursos</h3>
          <p className="text-gray-600 text-sm mt-1">
            Gestiona documentos, enlaces y recursos del proyecto
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'files'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Documentos ({mockFiles.length})</span>
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('links')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'links'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Enlaces Externos ({externalResources.length})</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'files' && (
        <div className="space-y-6">
          {/* Header y botón para documentos */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar archivos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="all">Todas las categorías</option>
                <option value="project_docs">Documentos del Proyecto</option>
                <option value="multimedia">Multimedia</option>
                <option value="legal">Documentos Legales</option>
              </select>
              
              <button 
                onClick={() => setShowAddFileModal(true)}
                className="btn-living flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Subir Archivo</span>
              </button>
            </div>
          </div>

          {/* Lista de archivos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-100">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div key={file.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 mb-1">{file.name}</h4>
                          {file.description && (
                            <p className="text-sm text-gray-600 mb-2">{file.description}</p>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className={`px-2 py-1 rounded-full ${getCategoryColor(file.category)}`}>
                              {getCategoryLabel(file.category)}
                            </span>
                            <span>{file.size}</span>
                            <span>Subido por {file.uploadedBy}</span>
                            <span>{new Date(file.uploadedAt).toLocaleDateString('es-ES')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditFile(file)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteFile(file.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'links' && (
        <div className="space-y-6">
          {/* Header de enlaces */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Enlaces a herramientas y recursos externos del proyecto
            </p>
            <button 
              onClick={() => setShowAddLinkModal(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Agregar Enlace</span>
            </button>
          </div>

          {/* Grid de enlaces externos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalResources.map((resource) => {
              const Icon = getResourceIcon(resource.icon);
              return (
                <div key={resource.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${resource.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{resource.name}</h4>
                      </div>
                    </div>
                    <button 
                      onClick={() => openEditLink(resource)}
                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  
                  <div className="flex items-center space-x-2">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Abrir Enlace</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Estadísticas del footer */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Resumen de Archivos</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{mockFiles.length}</div>
            <div className="text-sm text-gray-600">Total Archivos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockFiles.filter(f => f.category === 'project_docs').length}
            </div>
            <div className="text-sm text-gray-600">Documentos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockFiles.filter(f => f.category === 'multimedia').length}
            </div>
            <div className="text-sm text-gray-600">Multimedia</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{externalResources.length}</div>
            <div className="text-sm text-gray-600">Enlaces Externos</div>
          </div>
        </div>
      </div>

      {/* Modales - Versión simplificada para prueba */}
      {showAddFileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Subir Archivo</h3>
              <button
                onClick={() => setShowAddFileModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del archivo"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Descripción"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddFileModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleAddFile({
                      name: 'Archivo de prueba',
                      type: 'document',
                      category: 'project_docs',
                      description: 'Descripción de prueba'
                    });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Subir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddLinkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Agregar Enlace</h3>
              <button
                onClick={() => setShowAddLinkModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre del enlace"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="url"
                placeholder="https://ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                placeholder="Descripción"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddLinkModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleAddLink({
                      name: 'Enlace de prueba',
                      url: 'https://ejemplo.com',
                      type: 'other',
                      description: 'Descripción de prueba'
                    });
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditFileModal && selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Editar Archivo</h3>
              <button
                onClick={() => {
                  setShowEditFileModal(false);
                  setSelectedFile(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                defaultValue={selectedFile.name}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                defaultValue={selectedFile.description}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowEditFileModal(false);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleEditFile({
                      name: selectedFile.name + ' (editado)',
                      description: 'Descripción actualizada'
                    });
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditLinkModal && selectedLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Editar Enlace</h3>
              <button
                onClick={() => {
                  setShowEditLinkModal(false);
                  setSelectedLink(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                defaultValue={selectedLink.name}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="url"
                defaultValue={selectedLink.url}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
              <textarea
                defaultValue={selectedLink.description}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                rows={3}
              />
              
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    handleDeleteLink(selectedLink.id);
                    setShowEditLinkModal(false);
                    setSelectedLink(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Eliminar
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowEditLinkModal(false);
                      setSelectedLink(null);
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      handleEditLink({
                        name: selectedLink.name + ' (editado)',
                        description: 'Descripción actualizada'
                      });
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}