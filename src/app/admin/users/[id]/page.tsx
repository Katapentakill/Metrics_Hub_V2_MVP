// Ubicación: /pages/admin/users/[id]/page.tsx o /components/admin/users/UserProfileAdminPage.tsx
// Código completo con sección de currículum funcional
// src/app/admin/users/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Edit, 
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
  ExternalLink,
  User,
  Folder,
  Activity,
  Settings,
  MoreVertical,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  Upload,
  Eye
} from 'lucide-react';
import { ExtendedUserWithProfile, UserProject, ActivityItem, CVData } from '@/lib/types';
import { extendedMockUsers, mockUserProjects, mockUserActivities, mockCVData } from '@/lib/data/users';

export default function UserProfileAdminPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [user, setUser] = useState<ExtendedUserWithProfile | null>(null);
  const [projects, setProjects] = useState<UserProject[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = async () => {
    try {
      // Simular carga de datos
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = extendedMockUsers.find(u => u.id === userId);
      if (!foundUser) {
        router.push('/admin/users');
        return;
      }

      setUser(foundUser);

      // Usar proyectos mock centralizados
      setProjects(mockUserProjects);
      
      // Usar actividades mock centralizadas
      setActivities(mockUserActivities.slice(0, 5));
      
      // Usar datos de CV mock centralizados con fallback
      const userCvData = mockCVData[`user_${userId}`] || mockCVData['user_12'];
      setCvData(userCvData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 p-6">
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
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Usuario no encontrado</h2>
          <p className="text-slate-600 mb-6">El usuario que buscas no existe o ha sido eliminado.</p>
          <button
            onClick={() => router.push('/admin/users')}
            className="btn-living"
          >
            Volver a usuarios
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

  const formatMonthYear = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return formatDate(dateString);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lead': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'volunteer': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <Shield className="w-4 h-4 text-blue-600" />;
      case 'skill_added': return <Star className="w-4 h-4 text-yellow-600" />;
      case 'project_joined': return <Folder className="w-4 h-4 text-green-600" />;
      case 'profile_updated': return <User className="w-4 h-4 text-purple-600" />;
      case 'achievement': return <Award className="w-4 h-4 text-orange-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  // Agregamos la pestaña de currículum
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: User },
    { id: 'curriculum', label: 'Currículum', icon: FileText },
    { id: 'projects', label: 'Proyectos', icon: Folder },
    { id: 'activity', label: 'Actividad', icon: Activity },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const totalHours = projects.reduce((sum, project) => sum + project.hours_contributed, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/admin/users')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Perfil de Usuario</h1>
            <p className="text-sm text-slate-500">Vista detallada del administrador</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push(`/admin/users/${userId}/edit`)}
            className="btn-living flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Editar Usuario</span>
          </button>
          <div className="relative">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="card overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-12">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-3xl">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
              <p className="text-emerald-100 text-lg mb-3">{user.email}</p>
              <div className="flex items-center space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-white bg-opacity-20 text-white border-white border-opacity-30`}>
                  {user.role === 'admin' ? 'Administrador' : 
                   user.role === 'hr' ? 'Recursos Humanos' :
                   user.role === 'lead' ? 'Líder de Proyecto' :
                   user.role === 'volunteer' ? 'Voluntario' : 'Sin Asignar'}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-white bg-opacity-20 text-white border-white border-opacity-30`}>
                  {user.status === 'active' ? 'Activo' :
                   user.status === 'inactive' ? 'Inactivo' :
                   user.status === 'suspended' ? 'Suspendido' : user.status}
                </span>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl font-bold">{totalHours}</p>
                  <p className="text-emerald-100 text-sm">Horas totales</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeProjects}</p>
                  <p className="text-emerald-100 text-sm">Proyectos activos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedProjects}</p>
                  <p className="text-emerald-100 text-sm">Completados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content basado en tab activo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Contenido principal */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tab: Overview */}
          {activeTab === 'overview' && (
            <>
              {/* Información Personal */}
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center border-b pb-3">
                  <User className="w-5 h-5 mr-2 text-emerald-600" />
                  Información Personal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-20">Email:</span>
                      <span className="ml-2 font-medium">{user.email}</span>
                    </div>
                    {user.profile?.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 mr-3 text-slate-400" />
                        <span className="text-slate-600 w-20">Teléfono:</span>
                        <span className="ml-2 font-medium">{user.profile.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-20">Ubicación:</span>
                      <span className="ml-2 font-medium">{user.profile?.city}, {user.profile?.country}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Globe className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-20">Zona:</span>
                      <span className="ml-2 font-medium">{user.profile?.timezone}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-24">Registrado:</span>
                      <span className="ml-2 font-medium">{formatDate(user.created_at)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-24">Último login:</span>
                      <span className="ml-2 font-medium">
                        {user.last_login ? formatDate(user.last_login) : 'Nunca'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-24">Email verificado:</span>
                      <span className={`ml-2 font-medium ${user.email_verified ? 'text-green-600' : 'text-red-600'}`}>
                        {user.email_verified ? 'Verificado' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-3 text-slate-400" />
                      <span className="text-slate-600 w-24">Disponibilidad:</span>
                      <span className="ml-2 font-medium">{user.profile?.hours_per_week}h/semana</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biografía y Motivación */}
              {(user.profile?.bio || user.profile?.motivation) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {user.profile.bio && (
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                        <Book className="w-5 h-5 mr-2 text-emerald-600" />
                        Biografía
                      </h3>
                      <p className="text-slate-700 leading-relaxed">{user.profile.bio}</p>
                    </div>
                  )}
                  {user.profile.motivation && (
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                        Motivación
                      </h3>
                      <p className="text-slate-700 leading-relaxed">{user.profile.motivation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Habilidades */}
              {user.profile?.skills && user.profile.skills.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-emerald-600" />
                    Habilidades ({user.profile.skills.length})
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {user.profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <span className="font-medium text-sm mr-2">{skill.name}</span>
                        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Tab: Currículum - NUEVA SECCIÓN */}
          {activeTab === 'curriculum' && cvData && (
            <div className="space-y-6">
              {/* Header del CV */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                    Currículum Vitae
                  </h3>
                  <div className="flex items-center space-x-3">
                    {cvData.cv_file_url && (
                      <a
                        href={cvData.cv_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar PDF</span>
                      </a>
                    )}
                    <button className="btn-living-outline text-sm flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Actualizar CV</span>
                    </button>
                  </div>
                </div>
                
                {/* Resumen profesional */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h4 className="font-medium text-slate-800 mb-2">Resumen Profesional</h4>
                  <p className="text-slate-700 leading-relaxed">{cvData.summary}</p>
                </div>

                <div className="text-xs text-slate-500 text-right">
                  Última actualización: {formatDate(cvData.last_updated)}
                </div>
              </div>

              {/* Experiencia Laboral */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-emerald-600" />
                  Experiencia Laboral
                </h3>
                <div className="space-y-6">
                  {cvData.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-emerald-200 pl-6 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-lg">{exp.position}</h4>
                          <p className="text-emerald-600 font-medium">{exp.company}</p>
                          <p className="text-sm text-slate-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {exp.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-700">
                            {formatMonthYear(exp.start_date)} - {exp.end_date ? formatMonthYear(exp.end_date) : 'Presente'}
                          </p>
                          {exp.is_current && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              Actual
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-700 mb-4">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <div>
                          <h5 className="font-medium text-slate-800 mb-2">Logros destacados:</h5>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, index) => (
                              <li key={index} className="text-sm text-slate-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-3 flex-sadminink-0"></span>
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
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                  Educación
                </h3>
                <div className="space-y-6">
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-blue-200 pl-6 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-800 text-lg">{edu.degree}</h4>
                          <p className="text-blue-600 font-medium">{edu.institution}</p>
                          <p className="text-sm text-slate-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {edu.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-700">
                            {formatMonthYear(edu.start_date)} - {edu.end_date ? formatMonthYear(edu.end_date) : 'En curso'}
                          </p>
                          {edu.gpa && (
                            <p className="text-sm text-slate-500">GPA: {edu.gpa}</p>
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
                          <h5 className="font-medium text-slate-800 mb-2">Cursos relevantes:</h5>
                          <div className="flex flex-wrap gap-2">
                            {edu.relevant_courses.map((course, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
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
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-emerald-600" />
                    Proyectos Personales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cvData.projects.map((project, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-semibold text-slate-800">{project.name}</h4>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{project.description}</p>
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
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-emerald-600" />
                    Experiencia de Voluntariado
                  </h3>
                  <div className="space-y-4">
                    {cvData.volunteer_experience.map((vol, index) => (
                      <div key={index} className="border-l-2 border-red-200 pl-6 pb-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-800">{vol.role}</h4>
                            <p className="text-red-600 font-medium">{vol.organization}</p>
                          </div>
                          <p className="text-sm font-medium text-slate-700">
                            {formatMonthYear(vol.start_date)} - {vol.end_date ? formatMonthYear(vol.end_date) : 'Presente'}
                          </p>
                        </div>
                        <p className="text-slate-700 text-sm">{vol.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-800">Proyectos</h3>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span>Total: {projects.length}</span>
                  <span>•</span>
                  <span>Activos: {activeProjects}</span>
                  <span>•</span>
                  <span>Completados: {completedProjects}</span>
                </div>
              </div>

              {projects.map((project) => (
                <div key={project.id} className="card p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-slate-800">{project.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                          {project.status === 'active' ? 'Activo' :
                           project.status === 'completed' ? 'Completado' :
                           project.status === 'paused' ? 'Pausado' : 'Cancelado'}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-slate-500">
                        <span>Rol: <strong className="text-slate-700">{project.role}</strong></span>
                        <span>Equipo: <strong className="text-slate-700">{project.team_size} personas</strong></span>
                        <span>Horas: <strong className="text-slate-700">{project.hours_contributed}h</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-3">
                    <div>
                      Inicio: {formatDate(project.start_date)}
                      {project.end_date && ` • Fin: ${formatDate(project.end_date)}`}
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Ver proyecto →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Activity */}
          {activeTab === 'activity' && (
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Actividad Reciente</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                    <div className="flex-sadminink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-800">{activity.description}</p>
                      <p className="text-sm text-slate-500 mt-1">{getTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                  Configuración de Cuenta
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-800">Estado de la cuenta</h4>
                      <p className="text-sm text-slate-600">Controla el acceso del usuario al sistema</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'Activo' :
                         user.status === 'inactive' ? 'Inactivo' :
                         user.status === 'suspended' ? 'Suspendido' : user.status}
                      </span>
                      <button className="btn-secondary text-sm">Cambiar</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-800">Rol del usuario</h4>
                      <p className="text-sm text-slate-600">Define los permisos y accesos del usuario</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? 'Administrador' :
                         user.role === 'hr' ? 'Recursos Humanos' :
                         user.role === 'lead' ? 'Líder de Proyecto' :
                         user.role === 'volunteer' ? 'Voluntario' : 'Sin Asignar'}
                      </span>
                      <button className="btn-secondary text-sm">Cambiar</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-800">Zona de peligro</h4>
                      <p className="text-sm text-red-600">Acciones irreversibles para esta cuenta</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="btn-danger text-sm">Suspender</button>
                      <button className="btn-danger text-sm">Eliminar</button>
                    </div>
                  </div>
                </div>
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
              Enlaces
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

          {/* Currículum Vitae - NUEVA SECCIÓN PARA EL SIDEBAR */}
          {cvData && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                Currículum Vitae
              </h3>
              
              <div className="space-y-3">
                {/* Botón para ver CV completo */}
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className="w-full flex items-center p-3 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all group"
                >
                  <Eye className="w-4 h-4 text-emerald-600 mr-3" />
                  <span className="text-slate-600 flex-grow text-left">Ver CV Completo</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                </button>

                {/* Descargar PDF del CV */}
                {cvData.cv_file_url && (
                  <a
                    href={cvData.cv_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                  >
                    <Download className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-slate-600 flex-grow">Descargar PDF</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                  </a>
                )}

                {/* Información rápida del CV */}
                <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Experiencia:</span>
                    <span className="font-medium text-slate-800">{cvData.experience.length} trabajos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Educación:</span>
                    <span className="font-medium text-slate-800">{cvData.education.length} títulos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Proyectos:</span>
                    <span className="font-medium text-slate-800">{cvData.projects.length} proyectos</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Actualizado:</span>
                    <span className="font-medium text-slate-800">
                      {new Date(cvData.last_updated).toLocaleDateString('es-ES', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Botón para actualizar CV */}
                <button className="w-full btn-living-outline text-sm justify-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Actualizar CV
                </button>
              </div>
            </div>
          )}

          {/* Información Académica */}
          {(user.profile?.university || user.profile?.supervisor_name) && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-emerald-600" />
                Académico
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
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-800">{language.name}</span>
                    <span className="text-sm text-slate-600 bg-white px-2 py-1 rounded-full">
                      {language.level}
                    </span>
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

          {/* Estadísticas rápidas */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Estadísticas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Habilidades</span>
                <span className="font-semibold text-slate-800">{user.profile?.skills?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Idiomas</span>
                <span className="font-semibold text-slate-800">{user.profile?.languages?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Certificaciones</span>
                <span className="font-semibold text-slate-800">{user.profile?.certifications?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Proyectos activos</span>
                <span className="font-semibold text-emerald-600">{activeProjects}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total horas</span>
                <span className="font-semibold text-emerald-600">{totalHours}h</span>
              </div>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Acciones Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full btn-living-outline text-sm justify-center">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </button>
              <button className="w-full btn-living-outline text-sm justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Cambiar Rol
              </button>
              <button className="w-full btn-living-outline text-sm justify-center">
                <Clock className="w-4 h-4 mr-2" />
                Reset Password
              </button>
              <button className="w-full btn-danger-outline text-sm justify-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Suspender Usuario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}