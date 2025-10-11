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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-[#d1fae5] text-[#065f46]'; // Éxito (emerald)
      case 'draft': return 'bg-[#fef3c7] text-[#92400e]'; // Advertencia (yellow)
      case 'archived': return 'bg-[#f9fafb] text-[#4b5563]'; // Neutral (gray)
      default: return 'bg-[#dbeafe] text-[#1e40af]'; // Info (blue)
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-[#dbeafe] text-[#1e40af]'; // Info (blue)
      case 'news': return 'bg-[#d1fae5] text-[#065f46]'; // Éxito (emerald)
      case 'event': return 'bg-[#f0fdf4] text-[#166534]'; // Verde principal
      case 'reminder': return 'bg-[#fef3c7] text-[#92400e]'; // Advertencia (yellow)
      default: return 'bg-[#f9fafb] text-[#4b5563]'; // Neutral (gray)
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
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#059669] mx-auto mb-4"></div>
          <p className="text-[#4b5563]">Cargando comunicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {/* Título con ícono institucional */}
              <div className="flex items-center mb-2">
                <MessageSquare className="w-8 h-8 mr-3 text-[#059669]" />
                <h1 className="text-3xl font-bold text-[#1e293b]">Centro de Comunicaciones</h1>
              </div>
              <p className="text-[#4b5563] mt-2">
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
                className="flex items-center space-x-2 px-6 py-2.5 bg-[#166534] text-white rounded-lg 
                           hover:bg-[#15803d] transition-all hover:-translate-y-0.5 hover:shadow-md
                           font-semibold text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Comunicación</span>
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#f0fdf4] border-2 border-[#14b8a6] rounded-xl shadow-md p-6 
                          hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-[#166534] to-[#059669] rounded-xl">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-[#4b5563]">Total</p>
                <p className="text-2xl font-bold text-[#1e293b]">{stats.total_communications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f0fdf4] border-2 border-[#14b8a6] rounded-xl shadow-md p-6 
                          hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-[#059669] to-[#14b8a6] rounded-xl">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-[#4b5563]">Publicadas</p>
                <p className="text-2xl font-bold text-[#1e293b]">{stats.published_communications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f0fdf4] border-2 border-[#14b8a6] rounded-xl shadow-md p-6 
                          hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-[#14b8a6] to-[#22c55e] rounded-xl">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-[#4b5563]">Visualizaciones</p>
                <p className="text-2xl font-bold text-[#1e293b]">{stats.total_reads}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f0fdf4] border-2 border-[#14b8a6] rounded-xl shadow-md p-6 
                          hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-[#84cc16] to-[#22c55e] rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-[#4b5563]">Destacadas</p>
                <p className="text-2xl font-bold text-[#1e293b]">{stats.featured_communications}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#059669] w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar comunicaciones..."
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-[#e2e8f0] rounded-lg 
                             focus:outline-none focus:border-[#059669] focus:ring-3 focus:ring-[#059669]/10
                             transition-all text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-2">Tipo</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-[#e2e8f0] rounded-lg 
                           focus:outline-none focus:border-[#059669] focus:ring-3 focus:ring-[#059669]/10
                           transition-all text-sm"
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
                <label className="block text-sm font-semibold text-[#1e293b] mb-2">Estado</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-[#e2e8f0] rounded-lg 
                             focus:outline-none focus:border-[#059669] focus:ring-3 focus:ring-[#059669]/10
                             transition-all text-sm"
                >
                  <option value="all">Todos los estados</option>
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-[#1e293b] mb-2">Fecha</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-[#e2e8f0] rounded-lg 
                           focus:outline-none focus:border-[#059669] focus:ring-3 focus:ring-[#059669]/10
                           transition-all text-sm"
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
        <div className="bg-white border border-[#e2e8f0] rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-[#e2e8f0]">
            <h2 className="text-lg font-bold text-[#1e293b]">
              Comunicaciones ({filteredCommunications.length})
            </h2>
          </div>
          
          <div className="divide-y divide-[#e2e8f0]">
            {paginatedCommunications.map((comm) => {
              const TypeIcon = getTypeIcon(comm.type);
              return (
                <div key={comm.id} className="p-6 hover:bg-[#f9fafb] transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TypeIcon className="w-5 h-5 text-[#059669]" />
                        <h3 className="text-lg font-semibold text-[#1e293b]">{comm.title}</h3>
                        {comm.featured && (
                          <Star className="w-4 h-4 text-[#eab308] fill-current" />
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(comm.type)}`}>
                          {comm.type === 'announcement' ? 'Anuncio' :
                           comm.type === 'news' ? 'Noticia' :
                           comm.type === 'event' ? 'Evento' : 'Recordatorio'}
                        </span>
                      </div>
                      
                      <p className="text-[#4b5563] mb-3 line-clamp-2">{comm.content}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-[#4b5563]">
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
                        <button 
                          onClick={() => handleEditCommunication(comm)}
                          className="p-2 hover:bg-[#dbeafe] rounded-lg transition-colors"
                        >
                          <Edit3 className="w-5 h-5 text-[#3b82f6]" />
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          onClick={() => handleDeleteCommunication(comm)}
                          className="p-2 hover:bg-[#fee2e2] rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-[#ef4444]" />
                        </button>
                      )}
                      <button 
                        onClick={() => setSelectedCommunication(comm)}
                        className="p-2 hover:bg-[#f0fdf4] rounded-lg transition-colors"
                      >
                        <Eye className="w-5 h-5 text-[#166534]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end items-center space-x-2 p-4 border-t border-[#e2e8f0]">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border-2 border-[#e2e8f0] rounded-lg bg-white text-[#475569] 
                           hover:bg-[#f9fafb] hover:border-[#475569] disabled:opacity-50 transition-all"
              >
                <ChevronLeft className="w-4 h-4 inline" />
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 border-2 rounded-lg font-semibold text-sm transition-all ${
                      page === currentPage 
                        ? 'bg-[#166534] text-white border-[#166534] shadow-md' 
                        : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f9fafb] hover:border-[#475569]'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border-2 border-[#e2e8f0] rounded-lg bg-white text-[#475569] 
                           hover:bg-[#f9fafb] hover:border-[#475569] disabled:opacity-50 transition-all"
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