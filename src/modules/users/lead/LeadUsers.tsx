// modules/users/lead/LeadUsers.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Filter, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  UserPlus,
  Clock,
  Award,
  MessageSquare
} from 'lucide-react';

import { ExtendedUserWithProfile, UserStats } from '@/lib/types';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import LeadUserFilters, { type FilterOptions as AdvancedFilters } from './modals/LeadUserFilters';
import RequestVolunteerModal from './modals/RequestVolunteerModal';
import ContactVolunteerModal from './modals/ContactVolunteerModal';

export default function LeadUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<ExtendedUserWithProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ExtendedUserWithProfile[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [advFilters, setAdvFilters] = useState<AdvancedFilters>({});

  // Modales
  const [selectedUser, setSelectedUser] = useState<ExtendedUserWithProfile | null>(null);
  const [showRequestVolunteer, setShowRequestVolunteer] = useState(false);
  const [showContactVolunteer, setShowContactVolunteer] = useState(false);

  useEffect(() => { loadUsers(); }, []);
  useEffect(() => { filterUsers(); }, [users, searchTerm, selectedSkillCategory, selectedAvailability, advFilters]);

  const loadUsers = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Solo mostrar voluntarios activos y líderes de proyecto (para colaboración)
      const availableUsers = extendedMockUsers.filter(user => 
        (user.role === 'volunteer' || user.role === 'lead') && 
        user.status === 'active'
      );

      // Estadísticas relevantes para líder de proyecto
      const userStats: UserStats = {
        total: availableUsers.length,
        active: availableUsers.filter(u => u.status === 'active').length,
        inactive: 0, // No mostramos inactivos
        suspended: 0, // No mostramos suspendidos
        deleted: 0, // No mostramos eliminados
        byRole: {
          admin: 0, // No mostramos admins
          hr: 0, // No mostramos HR
          lead: availableUsers.filter(u => u.role === 'lead').length,
          volunteer: availableUsers.filter(u => u.role === 'volunteer').length,
          unassigned: 0,
        },
        byCountry: availableUsers.reduce((acc, user) => {
          const country = user.profile?.country || 'Unknown';
          acc[country] = (acc[country] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        bySkillCategory: availableUsers.reduce((acc, user) => {
          user.profile?.skills?.forEach(skill => {
            acc[skill.category] = (acc[skill.category] || 0) + 1;
          });
          return acc;
        }, {} as Record<string, number>)
      };

      setUsers(availableUsers);
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

    if (selectedSkillCategory !== 'all') {
      filtered = filtered.filter(u => 
        u.profile?.skills?.some(skill => skill.category === selectedSkillCategory)
      );
    }

    if (selectedAvailability !== 'all') {
      const hours = Number(selectedAvailability);
      filtered = filtered.filter(u => Number(u.profile?.hours_per_week) >= hours);
    }

    if (advFilters.country) {
      filtered = filtered.filter(u => u.profile?.country === advFilters.country);
    }

    if (advFilters.timezone) {
      filtered = filtered.filter(u => u.profile?.timezone === advFilters.timezone);
    }

    if (advFilters.skillLevel) {
      filtered = filtered.filter(u => 
        u.profile?.skills?.some(skill => skill.level === advFilters.skillLevel)
      );
    }

    if (advFilters.hasLinkedIn) {
      filtered = filtered.filter(u => u.profile?.linkedin);
    }

    if (advFilters.hasGitHub) {
      filtered = filtered.filter(u => u.profile?.github);
    }

    if (advFilters.hasPortfolio) {
      filtered = filtered.filter(u => u.profile?.portfolio);
    }

    setFilteredUsers(filtered);
  };

  // Navegación a página de detalle
  const handleViewUser = (userId: string) => {
    router.push(`/lead/users/${userId}`);
  };

  // Handlers para modales
  const handleRequestVolunteer = (user: ExtendedUserWithProfile) => {
    setSelectedUser(user);
    setShowRequestVolunteer(true);
  };

  const handleContactVolunteer = (user: ExtendedUserWithProfile) => {
    setSelectedUser(user);
    setShowContactVolunteer(true);
  };

  // Funciones de utilidad
  const getAvailabilityColor = (hours: number) => {
    if (hours >= 20) return 'bg-green-100 text-green-800 border-green-200';
    if (hours >= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getAvailabilityLabel = (hours: number) => {
    if (hours >= 20) return 'Alta disponibilidad';
    if (hours >= 10) return 'Media disponibilidad';
    return 'Baja disponibilidad';
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'text-purple-600';
      case 'advanced': return 'text-green-600';
      case 'intermediate': return 'text-blue-600';
      case 'beginner': return 'text-yellow-600';
      default: return 'text-gray-600';
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
            Voluntarios Disponibles
          </h1>
          <p className="text-muted mt-1">Encuentra y conecta con voluntarios para tus proyectos</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600">Mostrando solo voluntarios activos</p>
          <p className="text-xs text-slate-500">Última actualización: {new Date().toLocaleTimeString('es-ES')}</p>
        </div>
      </div>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Total Disponibles</p>
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
                <p className="text-sm font-medium text-muted">Voluntarios</p>
                <p className="text-3xl font-bold text-slate-800">{stats.byRole.volunteer}</p>
                <p className="text-sm text-emerald-600">
                  {Math.round((stats.byRole.volunteer / stats.total) * 100)}% del total
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Líderes de Proyecto</p>
                <p className="text-3xl font-bold text-slate-800">{stats.byRole.lead}</p>
                <p className="text-sm text-slate-500">Para colaboración</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="card p-6 hover-lift">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Categorías de Skills</p>
                <p className="text-3xl font-bold text-slate-800">{Object.keys(stats.bySkillCategory).length}</p>
                <p className="text-sm text-blue-600">Áreas disponibles</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
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
                placeholder="Buscar por nombre, habilidades, universidad..."
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
              value={selectedSkillCategory}
              onChange={(e) => setSelectedSkillCategory(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">Todas las habilidades</option>
              <option value="development">Desarrollo</option>
              <option value="design">Diseño</option>
              <option value="marketing">Marketing</option>
              <option value="analytics">Análisis</option>
              <option value="management">Gestión</option>
              <option value="communication">Comunicación</option>
              <option value="hr">Recursos Humanos</option>
            </select>
            
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">Cualquier disponibilidad</option>
              <option value="20">Alta disponibilidad (20+ hrs)</option>
              <option value="10">Media disponibilidad (10+ hrs)</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <LeadUserFilters onFilterChange={(filters) => setAdvFilters(filters)} />
        )}
      </div>

      {/* Tabla */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Voluntario</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Ubicación & Tiempo</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Habilidades Destacadas</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Disponibilidad</th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700">Universidad</th>
                <th className="text-center py-4 px-6 font-semibold text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
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
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          user.role === 'lead' 
                            ? 'bg-purple-100 text-purple-800 border-purple-200' 
                            : 'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {user.role === 'lead' ? 'Líder de Proyecto' : 'Voluntario'}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    {user.profile && (
                      <div className="text-sm">
                        <p className="text-slate-800 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {user.profile.city}, {user.profile.country}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {user.profile.timezone} • {user.profile.preferred_hours}
                        </p>
                        {user.profile.preferred_days && (
                          <p className="text-xs text-slate-400 mt-1">
                            Días: {user.profile.preferred_days.split(',').slice(0, 3).join(', ')}
                          </p>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-sm">
                      {user.profile?.skills && user.profile.skills.length > 0 ? (
                        <div className="space-y-1">
                          {user.profile.skills.slice(0, 3).map((skill, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-slate-700 font-medium text-xs">{skill.name}</span>
                              <span className={`text-xs font-semibold ${getSkillLevelColor(skill.level)}`}>
                                {skill.level}
                              </span>
                            </div>
                          ))}
                          {user.profile.skills.length > 3 && (
                            <p className="text-xs text-slate-500">
                              +{user.profile.skills.length - 3} más
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">Sin habilidades registradas</span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAvailabilityColor(user.profile?.hours_per_week || 0)}`}>
                        {user.profile?.hours_per_week}h/semana
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        {getAvailabilityLabel(user.profile?.hours_per_week || 0)}
                      </p>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <div className="text-sm">
                      {user.profile?.university ? (
                        <>
                          <p className="text-slate-800 font-medium text-xs">{user.profile.university}</p>
                          {user.profile.program && (
                            <p className="text-slate-500 text-xs mt-1">{user.profile.program}</p>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-400 text-xs">No especificada</span>
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

                      {/* Botón para solicitar al voluntario */}
                      <button
                        onClick={() => handleRequestVolunteer(user)}
                        className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Solicitar para proyecto"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>

                      {/* Botón para contactar directamente */}
                      <button
                        onClick={() => handleContactVolunteer(user)}
                        className="p-2 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Contactar directamente"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
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
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No se encontraron voluntarios</h3>
            <p className="text-slate-500">
              {searchTerm || selectedSkillCategory !== 'all' || selectedAvailability !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda.'
                : 'No hay voluntarios disponibles en este momento.'}
            </p>
          </div>
        )}
      </div>

      {/* Modales */}
      {showRequestVolunteer && selectedUser && (
        <RequestVolunteerModal
          user={selectedUser}
          onClose={() => { setShowRequestVolunteer(false); setSelectedUser(null); }}
          onSubmit={(projectData) => {
            console.log('Solicitud enviada:', projectData);
            setShowRequestVolunteer(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showContactVolunteer && selectedUser && (
        <ContactVolunteerModal
          user={selectedUser}
          onClose={() => { setShowContactVolunteer(false); setSelectedUser(null); }}
          onSubmit={(messageData) => {
            console.log('Mensaje enviado:', messageData);
            setShowContactVolunteer(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}