// src/features/admin/UserDetailModal.tsx
'use client';

import React from 'react';
import { 
  X, 
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
  Users, 
  Star, 
  GraduationCap,
  Briefcase,
  Heart,
  Languages,
  Code,
  Edit,
  ExternalLink,
  User
} from 'lucide-react';
import { ExtendedUserWithProfile } from '@/lib/types';

interface UserDetailModalProps {
  user: ExtendedUserWithProfile;
  onClose: () => void;
  onEdit: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose, onEdit }) => {
  if (!user || !user.profile) return null;

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'hr': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lead_project': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'volunteer': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'hr': return 'Recursos Humanos';
      case 'lead_project': return 'Líder de Proyecto';
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

  const skillsByCategory = user.profile.skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof user.profile.skills>) || {};

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'development': return <Code className="w-4 h-4" />;
      case 'design': return <Star className="w-4 h-4" />;
      case 'marketing': return <Users className="w-4 h-4" />;
      case 'analytics': return <Award className="w-4 h-4" />;
      case 'management': return <Briefcase className="w-4 h-4" />;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <p className="text-emerald-100 text-lg">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-white bg-opacity-20 text-white border-white border-opacity-30`}>
                    {getRoleLabel(user.role)}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-white bg-opacity-20 text-white border-white border-opacity-30`}>
                    {getStatusLabel(user.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onEdit}
                className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all duration-200 backdrop-blur-sm"
                title="Editar usuario"
              >
                <Edit className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-140px)] custom-scrollbar">
          <div className="p-8 space-y-8">
            {/* Información Personal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Información Básica */}
              <div className="card p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center border-b pb-3">
                  <User className="w-5 h-5 mr-2 text-emerald-600" />
                  Información Personal
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 w-20">Email:</span>
                    <span className="ml-2 font-medium">{user.email}</span>
                  </div>
                  {user.profile.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 w-20">Teléfono:</span>
                      <span className="ml-2 font-medium">{user.profile.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 w-20">Ubicación:</span>
                    <span className="ml-2 font-medium">{user.profile.city}, {user.profile.country}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 w-20">Zona:</span>
                    <span className="ml-2 font-medium">{user.profile.timezone}</span>
                  </div>
                  {user.profile.birth_date && (
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 w-20">Edad:</span>
                      <span className="ml-2 font-medium">{calculateAge(user.profile.birth_date)} años</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 w-20">Disponibilidad:</span>
                    <span className="ml-2 font-medium">{user.profile.hours_per_week}h/semana</span>
                  </div>
                  {user.profile.preferred_hours && (
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 w-20">Horario:</span>
                      <span className="ml-2 font-medium">{user.profile.preferred_hours}</span>
                    </div>
                  )}
                  {user.profile.preferred_days && (
                    <div className="flex items-start text-sm">
                      <Calendar className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 w-20">Días:</span>
                      <span className="ml-2 font-medium">{user.profile.preferred_days.replace(/,/g, ', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enlaces Profesionales */}
              <div className="card p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center border-b pb-3">
                  <Globe className="w-5 h-5 mr-2 text-emerald-600" />
                  Enlaces Profesionales
                </h3>
                <div className="space-y-4">
                  {user.profile.linkedin && (
                    <a 
                      href={user.profile.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <Linkedin className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-600 flex-grow">LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                    </a>
                  )}
                  {user.profile.github && (
                    <a 
                      href={user.profile.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm p-3 rounded-lg border border-slate-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <Github className="w-4 h-4 mr-3 text-gray-800 flex-shrink-0" />
                      <span className="text-gray-600 flex-grow">GitHub</span>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-800" />
                    </a>
                  )}
                  {user.profile.portfolio && (
                    <a 
                      href={user.profile.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 group"
                    >
                      <Globe className="w-4 h-4 mr-3 text-emerald-600 flex-shrink-0" />
                      <span className="text-gray-600 flex-grow">Portfolio</span>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
                    </a>
                  )}
                  {!user.profile.linkedin && !user.profile.github && !user.profile.portfolio && (
                    <div className="text-center py-8">
                      <Globe className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">No hay enlaces profesionales disponibles</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Biografía y Motivación */}
            {(user.profile.bio || user.profile.motivation) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {user.profile.bio && (
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4 border-b pb-3">
                      <Book className="w-5 h-5 mr-2 text-emerald-600" />
                      Biografía
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{user.profile.bio}</p>
                  </div>
                )}
                {user.profile.motivation && (
                  <div className="card p-6">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-4 border-b pb-3">
                      <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                      Motivación
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{user.profile.motivation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Información Académica/Profesional */}
            {(user.profile.university || user.profile.supervisor_name) && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6 border-b pb-3">
                  <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                  Información Académica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.profile.university && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Universidad</h4>
                      <p className="text-gray-700">{user.profile.university}</p>
                      {user.profile.program && (
                        <p className="text-gray-500 text-sm mt-1">{user.profile.program}</p>
                      )}
                    </div>
                  )}
                  {user.profile.supervisor_name && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Supervisor Académico</h4>
                      <p className="text-gray-700">{user.profile.supervisor_name}</p>
                      {user.profile.supervisor_email && (
                        <p className="text-gray-500 text-sm mt-1">{user.profile.supervisor_email}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Habilidades por Categoría */}
            {user.profile.skills && user.profile.skills.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6 border-b pb-3">
                  <Star className="w-5 h-5 mr-2 text-emerald-600" />
                  Habilidades Técnicas
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

            {/* Idiomas */}
            {user.profile.languages && user.profile.languages.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6 border-b pb-3">
                  <Languages className="w-5 h-5 mr-2 text-emerald-600" />
                  Idiomas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.profile.languages.map((language, index) => (
                    <div 
                      key={`${language.name}-${index}`}
                      className={`flex items-center justify-between p-4 rounded-lg border ${getLanguageLevelColor(language.level)} transition-all duration-200 hover:scale-105`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-xl">
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
            {user.profile.certifications && user.profile.certifications.length > 0 && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6 border-b pb-3">
                  <Award className="w-5 h-5 mr-2 text-emerald-600" />
                  Certificaciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.profile.certifications.map((certification, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      <Award className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{certification}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Información del Sistema */}
            <div className="card p-6 bg-slate-50">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center mb-6 border-b pb-3">
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                Información del Sistema
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <span className="text-gray-600 block">Fecha de Registro:</span>
                  <span className="font-medium text-gray-800">{formatDate(user.created_at)}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Último Login:</span>
                  <span className="font-medium text-gray-800">
                    {user.last_login ? formatDate(user.last_login) : 'Nunca'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block">Email Verificado:</span>
                  <span className={`font-medium ${user.email_verified ? 'text-green-600' : 'text-red-600'}`}>
                    {user.email_verified ? 'Verificado' : 'Pendiente'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;