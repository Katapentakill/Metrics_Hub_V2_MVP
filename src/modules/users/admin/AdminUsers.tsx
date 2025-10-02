// src/modules/users/admin/AdminUsers.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical,
  Shield,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Plus
} from 'lucide-react';

import { ExtendedUserWithProfile, UserStats } from '@/lib/types';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import UserFilters, { type FilterOptions as AdvancedFilters } from '@/modules/users/admin/UserFilters';
import UserActions from '@/modules/users/admin/UserActions';
import ExportUsers from '@/modules/users/admin/ExportUsers';

// Modales para acciones del menú
import ChangeRoleModal from '@/modules/users/admin/modals/ChangeRoleModal';
import ResetPasswordModal from '@/modules/users/admin/modals/ResetPasswordModal';
import SuspendUserModal from '@/modules/users/admin/modals/SuspendUserModal';
import ConfirmDeleteModal from '@/modules/users/admin/modals/ConfirmDeleteModal';
import ExportUserModal from '@/modules/users/admin/modals/ExportUserModal';

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<ExtendedUserWithProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ExtendedUserWithProfile[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>({});

  // Modales y acciones
  const [selectedUser, setSelectedUser] = useState<ExtendedUserWithProfile | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [showResetPwd, setShowResetPwd] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { filterUsers(); }, [users, searchTerm, selectedRole, selectedStatus, advFilters]);

  const loadUsers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const mockUsers = extendedMockUsers;

      const userStats: UserStats = {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.status === 'active').length,
        inactive: mockUsers.filter(u => u.status === 'inactive').length,
        suspended: mockUsers.filter(u => u.status === 'suspended').length,
        deleted: mockUsers.filter(u => u.status === 'deleted').length,
        byRole: {
          admin: mockUsers.filter(u => u.role === 'admin').length,
          hr: mockUsers.filter(u => u.role === 'hr').length,
          lead: mockUsers.filter(u => u.role === 'lead').length,
          volunteer: mockUsers.filter(u => u.role === 'volunteer').length,
          unassigned: mockUsers.filter(u => u.role === 'unassigned').length,
        },
        byCountry: mockUsers.reduce((acc, user) => {
          const country = user.profile?.country || 'Unknown';
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        bySkillCategory: mockUsers.reduce((acc, user) => {
          user.profile?.skills?.forEach(skill => {
            acc[skill.category] = (acc[skill.category] || 0) + 1;
          });
          return acc;
        }, {} as Record<string, number>)
      };

      setUsers(mockUsers);
      setStats(userStats);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading users:', error);
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];
    const q = searchTerm.toLowerCase();

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.profile?.first_name?.toLowerCase().includes(q) ||
        user.profile?.last_name?.toLowerCase().includes(q) ||
        user.profile?.bio?.toLowerCase().includes(q) ||
        user.profile?.skills?.some(s => s.name.toLowerCase().includes(q)) ||
        user.profile?.university?.toLowerCase().includes(q)
      );
    }

    if (selectedRole !== 'all') filtered = filtered.filter(u => u.role === selectedRole);
    if (selectedStatus !== 'all') filtered = filtered.filter(u => u.status === selectedStatus);

    if (advFilters.country) {
      filtered = filtered.filter(u => u.profile?.country === advFilters.country);
    }

    if (advFilters.hoursPerWeek) {
      const wanted = Number(advFilters.hoursPerWeek);
      filtered = filtered.filter(u => Number(u.profile?.hours_per_week) === wanted);
    }

    setFilteredUsers(filtered);
  };

  // Navegación a páginas dedicadas
  const handleViewUser = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleEditUser = (userId: string) => {
    router.push(`/admin/users/${userId}/edit`);
  };

  const handleCreateUser = () => {
    router.push('/admin/users/create');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  // Handlers para modales del menú
  const handleChangeRole = (newRole: ExtendedUserWithProfile['role']) => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
    setShowChangeRole(false);
    setSelectedUser(null);
  };

  const handleResetPassword = (newPassword: string) => {
    console.log(`Password reset for ${selectedUser?.email}: ${newPassword}`);
    setShowResetPwd(false);
    setSelectedUser(null);
  };

  const handleSuspendUser = (reason: string, until?: string) => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u =>
      u.id === selectedUser.id
        ? { ...u, status: 'suspended', suspension_reason: reason, suspension_until: until }
        : u
    ));
    setShowSuspend(false);
    setSelectedUser(null);
  };

  // Funciones de utilidad
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'hr': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lead': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'volunteer': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'hr': return 'Recursos Humanos';
      case 'lead': return 'Líder de Proyecto';
      case 'volunteer': return 'Voluntario';
      case 'unassigned': return 'Sin Asignar';
      default: return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'suspended': return 'Suspendido';
      case 'deleted': return 'Eliminado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="loading-skeleton h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card p-6">
              <div className="loading-skeleton h-6 w-20 mb-2" />
              <div className="loading-skeleton h-8 w-16" />
            </div>
          ))}
        </div>
        <div className="card p-6">
          <div className="loading-skeleton h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center">
            <Users className="w-8 h-8 mr-3 text-emerald-600" />
            Gestión de Usuarios
          </h1>
          <p className="text-muted mt-1">Administra todos los usuarios del sistema Living Stones</p>
        </div>
        <div className="flex items-center space-x-3">
          <ExportUsers users={filteredUsers} />
          <button
            onClick={handleCreateUser}
            className="btn-living flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Usuario</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Total Usuarios</p>
                <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {Object.keys(stats.byCountry).length} países
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Usuarios Activos</p>
                <p className="text-3xl font-bold text-slate-800">{stats.active}</p>
                <p className="text-sm text-green-600">
                  {Math.round((stats.active / stats.total) * 100)}% del total
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Voluntarios</p>
                <p className="text-3xl font-bold text-slate-800">{stats.byRole.volunteer}</p>
                <p className="text-sm text-slate-500">Rol más común</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Administradores</p>
                <p className="text-3xl font-bold text-slate-800">{stats.byRole.admin}</p>
                <p className="text-sm text-red-600">Acceso completo</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email, habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administrador</option>
              <option value="hr">HR</option>
              <option value="lead">Líder Proyecto</option>
              <option value="volunteer">Voluntario</option>
              <option value="unassigned">Sin Asignar</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <UserFilters onFilterChange={(filters) => setAdvFilters(filters)} />
        )}
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Usuario</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Rol</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Estado</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Ubicación</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Habilidades</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Último Login</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </p>
                        {user.profile?.phone && (
                          <p className="text-xs text-slate-400 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.profile.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    {user.profile && (
                      <div className="text-sm">
                        <p className="text-slate-800 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {user.profile.city}, {user.profile.country}
                        </p>
                        <p className="text-xs text-slate-500">{user.profile.timezone}</p>
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <p className="text-slate-800 line-clamp-2">
                        {(() => {
                          const skills = user.profile?.skills;
                          if (!skills?.length) return 'Sin habilidades';
                          if (skills.length <= 2) return skills.map(s => s.name).join(', ');
                          return `${skills.slice(0, 2).map(s => s.name).join(', ')} +${skills.length - 2}`;
                        })()}
                      </p>
                      {user.profile?.university && (
                        <p className="text-xs text-slate-500 mt-1">
                          📚 {user.profile.university}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-sm">
                      {user.last_login ? (
                        <>
                          <p className="text-slate-800">{formatDate(user.last_login)}</p>
                          <p className="text-xs text-slate-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(user.last_login).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </>
                      ) : (
                        <span className="text-slate-400">Nunca</span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-2">
                      {/* Botón para ver perfil completo */}
                      <button
                        onClick={() => handleViewUser(user.id)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver perfil completo"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Menú de tres puntos */}
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === user.id ? null : user.id)}
                          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {showActions === user.id && (
                          <UserActions
                            user={user}
                            onEdit={() => { setShowActions(null); handleEditUser(user.id); }}
                            onChangeRole={() => { setSelectedUser(user); setShowChangeRole(true); setShowActions(null); }}
                            onResetPassword={() => { setSelectedUser(user); setShowResetPwd(true); setShowActions(null); }}
                            onSuspend={() => { setSelectedUser(user); setShowSuspend(true); setShowActions(null); }}
                            onExport={() => { setSelectedUser(user); setShowExport(true); setShowActions(null); }}
                            onDelete={() => { setSelectedUser(user); setShowDeleteConfirm(true); setShowActions(null); }}
                            onClose={() => setShowActions(null)}
                          />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No se encontraron usuarios</h3>
            <p className="text-slate-500">
              {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda.'
                : 'No hay usuarios disponibles en este momento.'}
            </p>
          </div>
        )}
      </div>

      {/* Modales del menú */}
      {showChangeRole && selectedUser && (
        <ChangeRoleModal
          user={selectedUser}
          onSubmit={handleChangeRole}
          onClose={() => { setShowChangeRole(false); setSelectedUser(null); }}
        />
      )}

      {showResetPwd && selectedUser && (
        <ResetPasswordModal
          userEmail={selectedUser.email}
          onSubmit={handleResetPassword}
          onClose={() => { setShowResetPwd(false); setSelectedUser(null); }}
        />
      )}

      {showSuspend && selectedUser && (
        <SuspendUserModal
          user={selectedUser}
          onSubmit={handleSuspendUser}
          onClose={() => { setShowSuspend(false); setSelectedUser(null); }}
        />
      )}

      {showDeleteConfirm && selectedUser && (
        <ConfirmDeleteModal
          title="Eliminar usuario"
          message={`¿Seguro que deseas eliminar a ${selectedUser.name}? Esta acción no se puede deshacer.`}
          confirmText="Eliminar"
          onConfirm={() => { handleDeleteUser(selectedUser.id); setShowDeleteConfirm(false); setSelectedUser(null); }}
          onClose={() => { setShowDeleteConfirm(false); setSelectedUser(null); }}
        />
      )}

      {showExport && selectedUser && (
        <ExportUserModal
          user={selectedUser}
          onClose={() => { setShowExport(false); setSelectedUser(null); }}
        />
      )}
    </div>
  );
}