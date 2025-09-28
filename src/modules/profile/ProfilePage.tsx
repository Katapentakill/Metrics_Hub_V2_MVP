// 📁 src/components/profile/ProfilePage.tsx
// Componente compartido para perfiles de usuario

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Github,
  Linkedin,
  Book,
  Clock,
  GraduationCap,
  Heart,
  Languages,
  Code,
  Edit3,
  Save,
  X,
  Camera,
  Upload,
  CheckCircle,
  AlertCircle,
  Shield,
  Star,
  Award,
  Settings,
  Users,
  Target,
  Crown,
  Briefcase,
  BarChart3,
  UserCheck,
  FileText,
  Projector,
  Activity,
  Download
} from 'lucide-react';
import { getAuthSession } from '@/lib/auth';
import { ExtendedUserWithProfile, UserProject, ActivityItem, CVData } from '@/lib/types';
import { getProfileDataByRole, roleUIConfig, editableFieldsByRole } from '@/lib/data/profile';

interface ProfilePageProps {
  allowedRoles: string[];
}

export default function ProfilePage({ allowedRoles }: ProfilePageProps) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<ExtendedUserWithProfile | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Estado del formulario de edición
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
    website: '',
    motivation: ''
  });

  useEffect(() => {
    const sessionData = getAuthSession();
    if (!sessionData || !allowedRoles.includes(sessionData.role)) {
      router.push('/login');
      return;
    }
    setSession(sessionData);
    loadUserProfile();
  }, [router, allowedRoles]);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const profileData = getProfileDataByRole(session?.role, session);
      setUser(profileData.user);
      setProjects(profileData.projects);
      setActivities(profileData.activities);
      setCvData(profileData.cvData);

      // Inicializar formulario de edición
      if (profileData.user) {
        setEditForm({
          name: profileData.user.name,
          email: profileData.user.email,
          phone: profileData.user.profile?.phone || '',
          country: profileData.user.profile?.country || '',
          city: profileData.user.profile?.city || '',
          bio: profileData.user.profile?.bio || '',
          linkedin: profileData.user.profile?.linkedin || '',
          github: profileData.user.profile?.github || '',
          portfolio: profileData.user.profile?.portfolio || '',
          website: '',
          motivation: profileData.user.profile?.motivation || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular actualización del usuario
      if (user) {
        setUser({
          ...user,
          name: editForm.name,
          email: editForm.email,
          profile: {
            ...user.profile,
            phone: editForm.phone,
            country: editForm.country,
            city: editForm.city,
            bio: editForm.bio,
            linkedin: editForm.linkedin,
            github: editForm.github,
            portfolio: editForm.portfolio,
            motivation: editForm.motivation
          } as any
        });
      }
      
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        phone: user.profile?.phone || '',
        country: user.profile?.country || '',
        city: user.profile?.city || '',
        bio: user.profile?.bio || '',
        linkedin: user.profile?.linkedin || '',
        github: user.profile?.github || '',
        portfolio: user.profile?.portfolio || '',
        website: '',
        motivation: user.profile?.motivation || ''
      });
    }
    setIsEditing(false);
  };

  const getRoleIcon = (role: string) => {
    const config = roleUIConfig[role as keyof typeof roleUIConfig];
    switch (config?.icon) {
      case 'Crown': return Crown;
      case 'Users': return Users;
      case 'Target': return Target;
      case 'Heart': return Heart;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    const config = roleUIConfig[role as keyof typeof roleUIConfig];
    return config?.color || 'gray';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatMonthYear = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">No se pudo cargar el perfil</p>
        </div>
      </div>
    );
  }

  const RoleIcon = getRoleIcon(user.role);
  const roleColor = getRoleColor(user.role);
  const editableFields = editableFieldsByRole[user.role as keyof typeof editableFieldsByRole] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600">Gestiona tu información personal</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Guardando...' : 'Guardar'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Perfil actualizado exitosamente</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Avatar y Info Básica */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mt-4">{user.name}</h2>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <RoleIcon className={`w-4 h-4 text-${roleColor}-600`} />
                  <span className={`text-sm font-medium text-${roleColor}-600`}>
                    {roleUIConfig[user.role as keyof typeof roleUIConfig]?.title}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {roleUIConfig[user.role as keyof typeof roleUIConfig]?.description}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Proyectos</span>
                  <span className="text-sm font-medium text-gray-900">{projects.length}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Actividades</span>
                  <span className="text-sm font-medium text-gray-900">{activities.length}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Miembro desde</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Información de Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                  {user.profile?.phone && (
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">{user.profile.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">{user.profile?.city}, {user.profile?.country}</span>
                  </div>
                </div>
              </div>

              {/* Enlaces Profesionales */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Enlaces Profesionales</h3>
                <div className="space-y-2">
                  {user.profile?.linkedin && (
                    <a
                      href={user.profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-gray-600 flex-grow">LinkedIn</span>
                      <Globe className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                    </a>
                  )}
                  {user.profile?.github && (
                    <a
                      href={user.profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm p-2 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all group"
                    >
                      <Github className="w-4 h-4 text-gray-800 mr-2" />
                      <span className="text-gray-600 flex-grow">GitHub</span>
                      <Globe className="w-3 h-3 text-gray-400 group-hover:text-gray-800" />
                    </a>
                  )}
                  {user.profile?.portfolio && (
                    <a
                      href={user.profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm p-2 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                    >
                      <Globe className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-gray-600 flex-grow">Portfolio</span>
                      <Globe className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
                    </a>
                  )}
                  {!user.profile?.linkedin && !user.profile?.github && !user.profile?.portfolio && (
                    <div className="text-center py-4">
                      <Globe className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500 text-xs">No hay enlaces disponibles</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Currículum Vitae */}
              {cvData && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Currículum Vitae</h3>
                  
                  <div className="space-y-2">
                    {/* Botón para ver CV completo */}
                    <button
                      onClick={() => setActiveTab('curriculum')}
                      className="w-full flex items-center p-2 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                    >
                      <FileText className="w-4 h-4 text-emerald-600 mr-2" />
                      <span className="text-gray-600 flex-grow text-left text-sm">Ver CV Completo</span>
                      <Globe className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
                    </button>

                    {/* Descargar PDF del CV */}
                    {cvData.cv_file_url && (
                      <a
                        href={cvData.cv_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <Download className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-gray-600 flex-grow text-sm">Descargar PDF</span>
                        <Globe className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                      </a>
                    )}

                    {/* Información rápida del CV */}
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Experiencia:</span>
                        <span className="font-medium text-gray-800">{cvData.experience.length} trabajos</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Educación:</span>
                        <span className="font-medium text-gray-800">{cvData.education.length} títulos</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Proyectos:</span>
                        <span className="font-medium text-gray-800">{cvData.projects.length} proyectos</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Actualizado:</span>
                        <span className="font-medium text-gray-800">
                          {new Date(cvData.last_updated).toLocaleDateString('es-ES', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Botón para actualizar CV */}
                    <button className="w-full flex items-center justify-center p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-xs">
                      <Upload className="w-3 h-3 mr-1" />
                      Actualizar CV
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Resumen', icon: User },
                    { id: 'curriculum', label: 'Currículum', icon: FileText },
                    { id: 'projects', label: 'Proyectos', icon: Projector },
                    { id: 'activity', label: 'Actividad', icon: Activity },
                    { id: 'skills', label: 'Habilidades', icon: Code }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                          {isEditing && editableFields.includes('name') ? (
                            <input
                              type="text"
                              value={editForm.name}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          {isEditing && editableFields.includes('email') ? (
                            <input
                              type="email"
                              value={editForm.email}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                          {isEditing && editableFields.includes('phone') ? (
                            <input
                              type="tel"
                              value={editForm.phone}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.profile?.phone || 'No especificado'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                          {isEditing && editableFields.includes('city') ? (
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={editForm.city}
                                onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                                placeholder="Ciudad"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                              <input
                                type="text"
                                value={editForm.country}
                                onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                                placeholder="País"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                            </div>
                          ) : (
                            <p className="text-gray-900">{user.profile?.city}, {user.profile?.country}</p>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
                        {isEditing && editableFields.includes('bio') ? (
                          <textarea
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">{user.profile?.bio || 'No especificado'}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Motivación</label>
                        {isEditing && editableFields.includes('motivation') ? (
                          <textarea
                            value={editForm.motivation}
                            onChange={(e) => setEditForm({ ...editForm, motivation: e.target.value })}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">{user.profile?.motivation || 'No especificado'}</p>
                        )}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces Sociales</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                          {isEditing && editableFields.includes('linkedin') ? (
                            <input
                              type="url"
                              value={editForm.linkedin}
                              onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.profile?.linkedin || 'No especificado'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                          {isEditing && editableFields.includes('github') ? (
                            <input
                              type="url"
                              value={editForm.github}
                              onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.profile?.github || 'No especificado'}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                          {isEditing && editableFields.includes('portfolio') ? (
                            <input
                              type="url"
                              value={editForm.portfolio}
                              onChange={(e) => setEditForm({ ...editForm, portfolio: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          ) : (
                            <p className="text-gray-900">{user.profile?.portfolio || 'No especificado'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && cvData && (
                  <div className="space-y-6">
                    {/* Header del CV */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                          <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                          Currículum Vitae
                        </h3>
                        <div className="flex items-center space-x-3">
                          {cvData.cv_file_url && (
                            <a
                              href={cvData.cv_file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <Download className="w-4 h-4" />
                              <span>Descargar PDF</span>
                            </a>
                          )}
                          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <Upload className="w-4 h-4" />
                            <span>Actualizar CV</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Resumen profesional */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Resumen Profesional</h4>
                        <p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
                      </div>

                      <div className="text-xs text-gray-500 text-right">
                        Última actualización: {formatDate(cvData.last_updated)}
                      </div>
                    </div>

                    {/* Experiencia Laboral */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-emerald-600" />
                        Experiencia Laboral
                      </h3>
                      <div className="space-y-6">
                        {cvData.experience.map((exp) => (
                          <div key={exp.id} className="border-l-2 border-emerald-200 pl-6 pb-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{exp.position}</h4>
                                <p className="text-emerald-600 font-medium">{exp.company}</p>
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {exp.location}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">
                                  {formatMonthYear(exp.start_date)} - {exp.end_date ? formatMonthYear(exp.end_date) : 'Presente'}
                                </p>
                                {exp.is_current && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                    Actual
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{exp.description}</p>
                            {exp.achievements.length > 0 && (
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2">Logros destacados:</h5>
                                <ul className="space-y-1">
                                  {exp.achievements.map((achievement, index) => (
                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                      {achievement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Educación */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                        Educación
                      </h3>
                      <div className="space-y-6">
                        {cvData.education.map((edu) => (
                          <div key={edu.id} className="border-l-2 border-blue-200 pl-6 pb-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg">{edu.degree}</h4>
                                <p className="text-blue-600 font-medium">{edu.institution}</p>
                                <p className="text-sm text-gray-500 flex items-center mt-1">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {edu.location}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">
                                  {formatMonthYear(edu.start_date)} - {edu.end_date ? formatMonthYear(edu.end_date) : 'En curso'}
                                </p>
                                {edu.gpa && (
                                  <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                                )}
                                {edu.honors && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                    {edu.honors}
                                  </span>
                                )}
                              </div>
                            </div>
                            {edu.relevant_courses && edu.relevant_courses.length > 0 && (
                              <div>
                                <h5 className="font-medium text-gray-900 mb-2">Cursos relevantes:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {edu.relevant_courses.map((course, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                    >
                                      {course}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Proyectos Personales */}
                    {cvData.projects.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                          <Code className="w-5 h-5 mr-2 text-emerald-600" />
                          Proyectos Personales
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cvData.projects.map((project, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-gray-900">{project.name}</h4>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 hover:text-emerald-700"
                                  >
                                    <Globe className="w-4 h-4" />
                                  </a>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-md border border-emerald-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experiencia de Voluntariado */}
                    {cvData.volunteer_experience.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                          <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                          Experiencia de Voluntariado
                        </h3>
                        <div className="space-y-4">
                          {cvData.volunteer_experience.map((vol, index) => (
                            <div key={index} className="border-l-2 border-red-200 pl-6 pb-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{vol.role}</h4>
                                  <p className="text-red-600 font-medium">{vol.organization}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-700">
                                  {formatMonthYear(vol.start_date)} - {vol.end_date ? formatMonthYear(vol.end_date) : 'Presente'}
                                </p>
                              </div>
                              <p className="text-gray-700 text-sm">{vol.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Mis Proyectos</h3>
                    {projects.length > 0 ? (
                      <div className="space-y-4">
                        {projects.map((project) => (
                          <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{project.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                project.status === 'active' ? 'bg-green-100 text-green-800' :
                                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>Inicio: {new Date(project.start_date).toLocaleDateString()}</span>
                              {project.end_date && (
                                <span>Fin: {new Date(project.end_date).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No hay proyectos asignados</p>
                    )}
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
                    {activities.length > 0 ? (
                      <div className="space-y-4">
                        {activities.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{activity.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No hay actividad reciente</p>
                    )}
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Habilidades</h3>
                      {user.profile?.skills && user.profile.skills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {user.profile.skills.map((skill, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{skill.name}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  skill.level === 'expert' ? 'bg-purple-100 text-purple-800' :
                                  skill.level === 'advanced' ? 'bg-blue-100 text-blue-800' :
                                  skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {skill.level}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 capitalize">{skill.category}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No hay habilidades registradas</p>
                      )}
                    </div>

                    {/* Languages */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Idiomas</h3>
                      {user.profile?.languages && user.profile.languages.length > 0 ? (
                        <div className="space-y-3">
                          {user.profile.languages.map((language, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                              <span className="font-medium text-gray-900">{language.name}</span>
                              <span className="text-sm text-gray-600">{language.level}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No hay idiomas registrados</p>
                      )}
                    </div>

                    {/* Certifications */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificaciones</h3>
                      {user.profile?.certifications && user.profile.certifications.length > 0 ? (
                        <div className="space-y-2">
                          {user.profile.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-900">{cert}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No hay certificaciones registradas</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
