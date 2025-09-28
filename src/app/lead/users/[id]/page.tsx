// pages/lead/users/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Globe, 
  Github, 
  Linkedin, 
  Award, 
  Book, 
  Clock, 
  Star, 
  GraduationCap,
  Heart,
  Languages,
  Code,
  ExternalLink,
  User,
  UserPlus,
  MessageSquare,
  XCircle
} from 'lucide-react';
import { ExtendedUserWithProfile } from '@/lib/types';
import { extendedMockUsers } from '@/lib/data/extendedUsers';
import RequestVolunteerModal from '@/modules/users/lead/modals/RequestVolunteerModal';
import ContactVolunteerModal from '@/modules/users/lead/modals/ContactVolunteerModal';

export default function LeadUserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<ExtendedUserWithProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modales
  const [showRequestVolunteer, setShowRequestVolunteer] = useState(false);
  const [showContactVolunteer, setShowContactVolunteer] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = extendedMockUsers.find(u => u.id === userId);
      
      // Solo permitir ver voluntarios activos y otros líderes de proyecto
      if (!foundUser || 
          (foundUser.role !== 'volunteer' && foundUser.role !== 'lead') ||
          foundUser.status !== 'active') {
        router.push('/lead/users');
        return;
      }

      setUser(foundUser);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 p-6">
        <div className="loading-skeleton h-8 w-64" />
        <div className="loading-skeleton h-64 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="loading-skeleton h-96 w-full" />
          </div>
          <div className="loading-skeleton h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Usuario no disponible</h2>
          <p className="text-slate-600 mb-6">Este usuario no existe o no está disponible para consulta.</p>
          <button
            onClick={() => router.push('/lead/users')}
            className="btn-living"
          >
            Volver a voluntarios
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'advanced': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'beginner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLanguageLevelColor = (level: string) => {
    if (level === 'Native') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (level >= 'C1') return 'bg-green-100 text-green-800 border-green-200';
    if (level >= 'B1') return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getSkillLevelIcon = (level: string) => {
    switch (level) {
      case 'expert': return '🌟';
      case 'advanced': return '⭐';
      case 'intermediate': return '✨';
      case 'beginner': return '💫';
      default: return '⚪';
    }
  };

  const getAvailabilityColor = (hours: number) => {
    if (hours >= 20) return 'bg-green-100 text-green-800';
    if (hours >= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getAvailabilityLabel = (hours: number) => {
    if (hours >= 20) return 'Alta disponibilidad';
    if (hours >= 10) return 'Media disponibilidad';
    return 'Baja disponibilidad';
  };

  const skillsByCategory = user.profile?.skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof user.profile.skills>) || {};

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return <Code className="w-4 h-4" />;
      case 'design': return <Star className="w-4 h-4" />;
      case 'marketing': return <MessageSquare className="w-4 h-4" />;
      case 'analytics': return <Award className="w-4 h-4" />;
      case 'management': return <User className="w-4 h-4" />;
      case 'communication': return <Languages className="w-4 h-4" />;
      case 'hr': return <User className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'development': return 'Desarrollo';
      case 'design': return 'Diseño';
      case 'marketing': return 'Marketing';
      case 'analytics': return 'Análisis';
      case 'management': return 'Gestión';
      case 'communication': return 'Comunicación';
      case 'hr': return 'Recursos Humanos';
      default: return category;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/lead/users')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Perfil del Voluntario</h1>
            <p className="text-sm text-slate-500">Vista para líder de proyecto</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowRequestVolunteer(true)}
            className="btn-living flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Solicitar para Proyecto</span>
          </button>
          <button
            onClick={() => setShowContactVolunteer(true)}
            className="btn-living-outline flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contactar</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-2xl">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-emerald-100 text-lg mb-3">{user.email}</p>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white border-white border-opacity-30">
                  {user.role === 'lead' ? 'Líder de Proyecto' : 'Voluntario'}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(user.profile?.hours_per_week || 0)}`}>
                  {user.profile?.hours_per_week}h/semana
                </span>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-lg font-bold">{getAvailabilityLabel(user.profile?.hours_per_week || 0)}</p>
                  <p className="text-emerald-100 text-sm">Disponibilidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Información Personal */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center border-b pb-3">
              <User className="w-5 h-5 mr-2 text-emerald-600" />
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 w-20">Email:</span>
                  <span className="ml-2 font-medium">{user.email}</span>
                </div>
                {user.profile?.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600 w-20">Teléfono:</span>
                    <span className="ml-2 font-medium">{user.profile.phone}</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 w-20">Ubicación:</span>
                  <span className="ml-2 font-medium">{user.profile?.city}, {user.profile?.country}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 w-20">Zona:</span>
                  <span className="ml-2 font-medium">{user.profile?.timezone}</span>
                </div>
              </div>
              <div className="space-y-4">
                {user.profile?.birth_date && (
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600 w-20">Edad:</span>
                    <span className="ml-2 font-medium">{calculateAge(user.profile.birth_date)} años</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600 w-20">Disponibilidad:</span>
                  <span className="ml-2 font-medium">{user.profile?.hours_per_week}h/semana</span>
                </div>
                {user.profile?.preferred_hours && (
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600 w-20">Horario:</span>
                    <span className="ml-2 font-medium">{user.profile.preferred_hours}</span>
                  </div>
                )}
                {user.profile?.preferred_days && (
                  <div className="flex items-start text-sm">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                    <span className="text-gray-600 w-20">Días:</span>
                    <span className="ml-2 font-medium">{user.profile.preferred_days.replace(/,/g, ', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Biografía y Motivación */}
          {(user.profile?.bio || user.profile?.motivation) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {user.profile.bio && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Book className="w-5 h-5 mr-2 text-emerald-600" />
                    Sobre el Voluntario
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{user.profile.bio}</p>
                </div>
              )}
              {user.profile.motivation && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                    Motivación
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{user.profile.motivation}</p>
                </div>
              )}
            </div>
          )}

          {/* Habilidades por Categoría */}
          {user.profile?.skills && user.profile.skills.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <Star className="w-5 h-5 mr-2 text-emerald-600" />
                Habilidades Técnicas ({user.profile.skills.length})
              </h3>
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2">{getCategoryLabel(category)}</span>
                      <span className="ml-2 text-sm text-gray-500">({skills.length})</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {skills.map((skill, index) => (
                        <div 
                          key={`${skill.name}-${index}`}
                          className={`flex items-center justify-between p-3 rounded-lg border ${getSkillLevelColor(skill.level)} transition-all duration-200 hover:scale-105`}
                        >
                          <div className="flex items-center">
                            <span className="mr-2">{getSkillLevelIcon(skill.level)}</span>
                            <span className="font-medium text-sm">{skill.name}</span>
                          </div>
                          <span className="text-xs font-semibold uppercase">{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Enlaces Profesionales */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-emerald-600" />
              Enlaces Profesionales
            </h3>
            <div className="space-y-3">
              {user.profile?.linkedin && (
                <a
                  href={user.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-blue-600 mr-3" />
                  <span className="text-slate-600 flex-grow">LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </a>
              )}
              {user.profile?.github && (
                <a
                  href={user.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                >
                  <Github className="w-4 h-4 text-gray-800 mr-3" />
                  <span className="text-slate-600 flex-grow">GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-gray-800" />
                </a>
              )}
              {user.profile?.portfolio && (
                <a
                  href={user.profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                >
                  <Globe className="w-4 h-4 text-emerald-600 mr-3" />
                  <span className="text-slate-600 flex-grow">Portfolio</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                </a>
              )}
              {!user.profile?.linkedin && !user.profile?.github && !user.profile?.portfolio && (
                <div className="text-center py-6">
                  <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">No hay enlaces disponibles</p>
                </div>
              )}
            </div>
          </div>

          {/* Información Académica */}
          {(user.profile?.university || user.profile?.supervisor_name) && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                Información Académica
              </h3>
              <div className="space-y-4">
                {user.profile.university && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">Universidad</h4>
                    <p className="text-slate-600 text-sm">{user.profile.university}</p>
                    {user.profile.program && (
                      <p className="text-slate-500 text-xs mt-1">{user.profile.program}</p>
                    )}
                  </div>
                )}
                {user.profile.supervisor_name && (
                  <div>
                    <h4 className="font-medium text-slate-800 mb-1">Supervisor</h4>
                    <p className="text-slate-600 text-sm">{user.profile.supervisor_name}</p>
                    {user.profile.supervisor_email && (
                      <p className="text-slate-500 text-xs mt-1">{user.profile.supervisor_email}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Idiomas */}
          {user.profile?.languages && user.profile.languages.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Languages className="w-5 h-5 mr-2 text-emerald-600" />
                Idiomas
              </h3>
              <div className="space-y-3">
                {user.profile.languages.map((language, index) => (
                  <div 
                    key={`${language.name}-${index}`}
                    className={`flex items-center justify-between p-3 rounded-lg border ${getLanguageLevelColor(language.level)} transition-all duration-200 hover:scale-105`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">
                        {language.level === 'Native' ? '🌟' : 
                         language.level >= 'C1' ? '⭐' : 
                         language.level >= 'B1' ? '✨' : '💫'}
                      </span>
                      <span className="font-medium">{language.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificaciones */}
          {user.profile?.certifications && user.profile.certifications.length > 0 && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-emerald-600" />
                Certificaciones
              </h3>
              <div className="space-y-3">
                {user.profile.certifications.map((certification, index) => (
                  <div key={index} className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-slate-800">{certification}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Acciones rápidas */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowRequestVolunteer(true)}
                className="w-full btn-living text-sm justify-center"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Solicitar para Proyecto
              </button>
              <button 
                onClick={() => setShowContactVolunteer(true)}
                className="w-full btn-living-outline text-sm justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contactar Directamente
              </button>
              <a 
                href={`mailto:${user.email}`}
                className="w-full btn-secondary text-sm justify-center inline-flex items-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </a>
            </div>
          </div>

          {/* Información del Sistema (limitada) */}
          <div className="card p-6 bg-slate-50">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
              Información Adicional
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Miembro desde:</span>
                <span className="font-medium text-slate-800">{formatDate(user.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estado:</span>
                <span className="font-medium text-green-600">Activo y disponible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Habilidades:</span>
                <span className="font-medium text-slate-800">{user.profile?.skills?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Idiomas:</span>
                <span className="font-medium text-slate-800">{user.profile?.languages?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {showRequestVolunteer && (
        <RequestVolunteerModal
          user={user}
          onClose={() => setShowRequestVolunteer(false)}
          onSubmit={(requestData) => {
            console.log('Solicitud enviada:', requestData);
            setShowRequestVolunteer(false);
          }}
        />
      )}

      {showContactVolunteer && (
        <ContactVolunteerModal
          user={user}
          onClose={() => setShowContactVolunteer(false)}
          onSubmit={(messageData) => {
            console.log('Mensaje enviado:', messageData);
            setShowContactVolunteer(false);
          }}
        />
      )}
    </div>
  );
}