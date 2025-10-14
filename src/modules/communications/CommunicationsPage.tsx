// 📁 src/components/communications/CommunicationsPage.tsx
// Componente compartido para comunicaciones del sistema - Paleta Institucional

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
      if (!canViewAll) {
        if (comm.status !== 'published') return false;
        
        const roleAudiences = {
          'lead': ['all', 'coordinators', 'leads'],
          'volunteer': ['all', 'volunteers'],
          'student': ['all', 'students']
        };
        
        const allowedAudiences = roleAudiences[userRole as keyof typeof roleAudiences] || ['all'];
        if (!allowedAudiences.includes(comm.target_audience)) return false;
      }
      
      const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           comm.author_name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || comm.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || comm.status === selectedStatus;
      
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

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleCreateCommunication = (newCommunication: Partial<Communication>) => {
    console.log("handleCreateCommunication called with:", newCommunication);
    try {
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
      setStats(prev => ({ ...prev, total_communications: prev.total_communications + 1 }));
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error in handleCreateCommunication:", error);
    }
  };

  const handleEditCommunication = (communication: Communication) => setCommunicationToEdit(communication);
  const handleDeleteCommunication = (communication: Communication) => setCommunicationToDelete(communication);

  const confirmDelete = () => {
    if (communicationToDelete) {
      setCommunications(prev => prev.filter(c => c.id !== communicationToDelete.id));
      setStats(prev => ({ ...prev, total_communications: prev.total_communications - 1 }));
      setCommunicationToDelete(null);
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
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando comunicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header - PALETA INSTITUCIONAL */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-lg flex items-center justify-center shadow-sm mr-3">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800">Centro de Comunicaciones</h1>
              </div>
              <p className="text-gray-600 mt-2">
                {userRole === 'admin'
                  ? 'Gestiona todas las comunicaciones del sistema'
                  : userRole === 'hr'
                  ? 'Gestiona comunicaciones para recursos humanos'
                  : userRole === 'lead'
                  ? 'Comunicaciones para líderes de proyecto'
                  : 'Noticias y anuncios importantes'}
              </p>
            </div>

            {canCreate && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[#15803d] to-[#14532d] hover:from-[#166534] hover:to-[#15803d] text-white rounded-lg transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Comunicación</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards - Diferentes fondos de verde */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-lg hover:border-[#059669] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total_communications}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Publicadas */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-lg hover:border-[#059669] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Publicadas</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.published_communications}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Visualizaciones */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-lg hover:border-[#059669] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Visualizaciones</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total_reads}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Destacadas */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-lg hover:border-[#059669] transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Destacadas</p>
                <p className="text-2xl font-bold text-slate-800">{stats.featured_communications}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#84cc16] to-[#65a30d] rounded-lg flex items-center justify-center shadow-sm">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar comunicaciones..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] text-slate-800"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tipo</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] text-slate-800"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Estado</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] text-slate-800"
                >
                  <option value="all">Todos los estados</option>
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669] text-slate-800"
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
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              Comunicaciones ({filteredCommunications.length})
            </h2>
          </div>
          
          <div className="divide-y divide-slate-200">
            {paginatedCommunications.map((comm) => {
              const TypeIcon = getTypeIcon(comm.type);
              return (
                <div key={comm.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TypeIcon className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-medium text-slate-800">{comm.title}</h3>
                        {comm.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{comm.content}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                      {canEdit && (
                        <button onClick={() => handleEditCommunication(comm)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit3 className="w-5 h-5 text-slate-600 hover:text-[#3b82f6]" />
                        </button>
                      )}
                      {canDelete && (
                        <button onClick={() => handleDeleteCommunication(comm)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5 text-slate-600 hover:text-red-600" />
                        </button>
                      )}
                      <button onClick={() => setSelectedCommunication(comm)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-5 h-5 text-slate-600 hover:text-[#3b82f6]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center space-x-2 p-4 border-t border-slate-200">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 inline" />
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border rounded-lg transition-colors ${
                      page === currentPage 
                        ? 'bg-emerald-600 text-white border-emerald-600' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 inline" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showCreateModal && (
        <CreateCommunicationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCommunication}
          userRole={userRole}
        />
      )}

      {selectedCommunication && (
        <CommunicationDetailsModal
          communication={selectedCommunication}
          isOpen={selectedCommunication !== null}
          onClose={() => setSelectedCommunication(null)}
          userRole={userRole}
        />
      )}
    </div>
  );
}