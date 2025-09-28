// 📁 src/components/communications/CommunicationsPage.tsx
// Componente compartido para comunicaciones del sistema

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Clock,
  FileText,
  Bell,
  Edit3,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Archive,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react';
import { Communication } from '@/lib/types/communications';
import { 
  getCommunicationsByRole, 
  getCommunicationStatsByRole, 
  mockUsers 
} from '@/lib/data/communications';
import { getCurrentUserRole } from '@/lib/auth';
import CreateCommunicationModal from './modals/CreateCommunicationModal';
import CommunicationDetailsModal from './modals/CommunicationDetailsModal';

interface CommunicationStats {
  total_communications: number;
  published_communications: number;
  total_reads: number;
  total_likes: number;
  total_comments: number;
  featured_communications: number;
  this_month_communications: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface CommunicationsPageProps {
  allowedRoles: string[];
  currentUserId?: string;
}

export default function CommunicationsPage({ allowedRoles, currentUserId }: CommunicationsPageProps) {
  const [userRole, setUserRole] = useState<string>('');
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [stats, setStats] = useState<CommunicationStats>({
    total_communications: 0,
    published_communications: 0,
    total_reads: 0,
    total_likes: 0,
    total_comments: 0,
    featured_communications: 0,
    this_month_communications: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState<Communication | null>(null);
  const [communicationToEdit, setCommunicationToEdit] = useState<Communication | null>(null);
  const [communicationToDelete, setCommunicationToDelete] = useState<Communication | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Cargar datos basados en el rol del usuario
  useEffect(() => {
    const role = getCurrentUserRole();
    if (role && allowedRoles.includes(role)) {
      setUserRole(role);
      const comms = getCommunicationsByRole(role);
      const commStats = getCommunicationStatsByRole(role);
      setCommunications(comms);
      setStats(commStats);
    }
  }, [allowedRoles]);

  // Determinar permisos basados en el rol
  const canCreate = ['admin', 'hr'].includes(userRole);
  const canEdit = ['admin', 'hr'].includes(userRole);
  const canDelete = ['admin'].includes(userRole);
  const canViewAll = ['admin', 'hr'].includes(userRole);

  // Filtrar comunicaciones basado en el rol
  const filteredCommunications = useMemo(() => {
    const filtered = communications.filter(comm => {
      // Filtros específicos por rol
      if (!canViewAll) {
        // Para roles no administrativos, solo mostrar comunicaciones publicadas
        if (comm.status !== 'published') return false;
        
        // Filtrar por audiencia objetivo
        const roleAudiences = {
          'lead': ['all', 'coordinators', 'leads'],
          'volunteer': ['all', 'volunteers'],
          'student': ['all', 'students']
        };
        
        const allowedAudiences = roleAudiences[userRole as keyof typeof roleAudiences] || ['all'];
        if (!allowedAudiences.includes(comm.target_audience)) return false;
      }
      
      // Filtros generales
      const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comm.author_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || comm.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || comm.status === selectedStatus;
      
      // Filtro por fecha
      let matchesDate = true;
      if (selectedDateRange !== 'all') {
        const commDate = new Date(comm.created_at);
        const now = new Date();
        
        switch (selectedDateRange) {
          case 'today':
            matchesDate = commDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = commDate >= weekAgo;
            break;
          case 'month':
            matchesDate = commDate.getMonth() === now.getMonth() && commDate.getFullYear() === now.getFullYear();
            break;
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            const commQuarter = Math.floor(commDate.getMonth() / 3);
            matchesDate = commQuarter === quarter && commDate.getFullYear() === now.getFullYear();
            break;
        }
      }
      
      return matchesSearch && matchesType && matchesStatus && matchesDate;
    });

    return filtered;
  }, [communications, searchTerm, selectedType, selectedStatus, selectedDateRange, userRole, canViewAll]);

  // Paginación
  const totalPages = Math.ceil(filteredCommunications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCommunications = filteredCommunications.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateCommunication = (newCommunication: Partial<Communication>) => {
    // Simular creación de comunicación
    const communication: Communication = {
      id: `comm_${Date.now()}`,
      title: newCommunication.title || '',
      content: newCommunication.content || '',
      type: newCommunication.type || 'announcement',
      priority: newCommunication.priority || 'medium',
      status: newCommunication.status || 'draft',
      author_id: 'current_user',
      author_name: 'Usuario Actual',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: newCommunication.tags || [],
      excerpt: newCommunication.excerpt || '',
      featured: newCommunication.featured || false,
      target_audience: newCommunication.target_audience || 'all',
      location: newCommunication.location,
      deadline: newCommunication.deadline,
      event_date: newCommunication.event_date,
      registration_required: newCommunication.registration_required || false,
      read_count: 0,
      likes_count: 0,
      comments_count: 0
    };

    setCommunications(prev => [communication, ...prev]);
    setStats(prev => ({
      ...prev,
      total_communications: prev.total_communications + 1
    }));
  };

  const handleEditCommunication = (communication: Communication) => {
    setCommunicationToEdit(communication);
  };

  const handleDeleteCommunication = (communication: Communication) => {
    setCommunicationToDelete(communication);
  };

  const confirmDelete = () => {
    if (communicationToDelete) {
      setCommunications(prev => prev.filter(c => c.id !== communicationToDelete.id));
      setStats(prev => ({
        ...prev,
        total_communications: prev.total_communications - 1
      }));
      setCommunicationToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return Megaphone;
      case 'news': return FileText;
      case 'event': return Calendar;
      case 'reminder': return Bell;
      default: return FileText;
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando comunicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Centro de Comunicaciones</h1>
              <p className="text-gray-600 mt-2">
                {userRole === 'admin' ? 'Gestiona todas las comunicaciones del sistema' :
                 userRole === 'hr' ? 'Gestiona comunicaciones para recursos humanos' :
                 userRole === 'lead' ? 'Comunicaciones para líderes de proyecto' :
                 'Noticias y anuncios importantes'}
              </p>
            </div>
            {canCreate && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Comunicación</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_communications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publicadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.published_communications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visualizaciones</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total_reads}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Destacadas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.featured_communications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar comunicaciones..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Todos los tipos</option>
                <option value="announcement">Anuncio</option>
                <option value="news">Noticia</option>
                <option value="event">Evento</option>
                <option value="reminder">Recordatorio</option>
              </select>
            </div>
            
            {canViewAll && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">Todas las fechas</option>
                <option value="today">Hoy</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mes</option>
                <option value="quarter">Este trimestre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Communications List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Comunicaciones ({filteredCommunications.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {paginatedCommunications.map((comm) => {
              const TypeIcon = getTypeIcon(comm.type);
              return (
                <div key={comm.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TypeIcon className="w-5 h-5 text-gray-500" />
                        <h3 className="text-lg font-medium text-gray-900">{comm.title}</h3>
                        {comm.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{comm.content}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{comm.author_name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(comm.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{comm.read_count} vistas</span>
                        </div>
                        {comm.likes_count > 0 && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{comm.likes_count} likes</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(comm.type)}`}>
                        {comm.type}
                      </span>
                      {canViewAll && (
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comm.status)}`}>
                          {comm.status}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedCommunication(comm)}
                        className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver detalles</span>
                      </button>
                      
                      {comm.comments_count > 0 && (
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                          <MessageSquare className="w-4 h-4" />
                          <span>{comm.comments_count} comentarios</span>
                        </button>
                      )}
                    </div>
                    
                    {canEdit && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditCommunication(comm)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Editar"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {canDelete && (
                          <button 
                            onClick={() => handleDeleteCommunication(comm)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredCommunications.length)} de {filteredCommunications.length} resultados
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 text-sm rounded ${
                        page === currentPage
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <CreateCommunicationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCommunication}
          userRole={userRole}
        />

        <CommunicationDetailsModal
          communication={selectedCommunication}
          isOpen={!!selectedCommunication}
          onClose={() => setSelectedCommunication(null)}
          onEdit={handleEditCommunication}
          onDelete={handleDeleteCommunication}
          userRole={userRole}
        />

        {/* Delete Confirmation Modal */}
        {communicationToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirmar eliminación</h3>
                  <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                ¿Estás seguro de que quieres eliminar la comunicación "{communicationToDelete.title}"?
              </p>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setCommunicationToDelete(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
