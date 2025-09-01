// src/features/admin/UserModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Save, 
  Globe,
  Github,
  Linkedin,
  GraduationCap,
  Heart,
  Plus,
  Trash2,
  Award,
  Languages
} from 'lucide-react';
import { 
  ExtendedUserWithProfile, 
  SimpleSkill, 
  SimpleLanguage 
} from '@/lib/types';

interface UserModalProps {
  user?: ExtendedUserWithProfile | null;
  onSave: (userData: ExtendedUserWithProfile) => void;
  onClose: () => void;
}

export default function UserModal({ user, onSave, onClose }: UserModalProps) {
  const [currentTab, setCurrentTab] = useState('basic');
  const [formData, setFormData] = useState<Partial<ExtendedUserWithProfile>>({
    name: '',
    email: '',
    role: 'volunteer',
    status: 'active',
    profile: {
      id: Date.now().toString(),
      user_id: Date.now().toString(),
      first_name: '',
      last_name: '',
      phone: '',
      country: '',
      city: '',
      timezone: 'GMT-5',
      hours_per_week: 10,
      preferred_hours: 'Flexible',
      preferred_days: '',
      bio: '',
      birth_date: '',
      linkedin: '',
      github: '',
      portfolio: '',
      motivation: '',
      university: '',
      program: '',
      supervisor_name: '',
      supervisor_email: '',
      skills: [],
      languages: [],
      certifications: []
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        profile: {
          id: user.profile?.id || Date.now().toString(),
          user_id: user.profile?.user_id || user.id,
          first_name: user.profile?.first_name || '',
          last_name: user.profile?.last_name || '',
          phone: user.profile?.phone || '',
          country: user.profile?.country || '',
          city: user.profile?.city || '',
          timezone: user.profile?.timezone || 'GMT-5',
          hours_per_week: user.profile?.hours_per_week || 10,
          preferred_hours: user.profile?.preferred_hours || 'Flexible',
          preferred_days: user.profile?.preferred_days || '',
          bio: user.profile?.bio || '',
          birth_date: user.profile?.birth_date || '',
          linkedin: user.profile?.linkedin || '',
          github: user.profile?.github || '',
          portfolio: user.profile?.portfolio || '',
          motivation: user.profile?.motivation || '',
          university: user.profile?.university || '',
          program: user.profile?.program || '',
          supervisor_name: user.profile?.supervisor_name || '',
          supervisor_email: user.profile?.supervisor_email || '',
          skills: user.profile?.skills || [],
          languages: user.profile?.languages || [],
          certifications: user.profile?.certifications || []
        }
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.profile?.first_name?.trim()) {
      newErrors.first_name = 'El nombre es requerido';
    }

    if (!formData.profile?.last_name?.trim()) {
      newErrors.last_name = 'El apellido es requerido';
    }

    if (!formData.profile?.country?.trim()) {
      newErrors.country = 'El país es requerido';
    }

    if (!formData.profile?.city?.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular guardar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Combinar nombre y apellido en el campo name
      const userData: ExtendedUserWithProfile = {
        ...formData as ExtendedUserWithProfile,
        name: `${formData.profile?.first_name} ${formData.profile?.last_name}`.trim(),
        id: formData.id || Date.now().toString(),
        password: formData.password || '',
        email_verified: formData.email_verified || 0,
        created_at: formData.created_at || new Date().toISOString()
      };
      
      onSave(userData);
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('profile.')) {
      const profileField = field.replace('profile.', '');
      setFormData({
        ...formData,
        profile: {
          ...formData.profile!,
          [profileField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
    
    // Limpiar error si existe
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const addSkill = () => {
    const newSkill: SimpleSkill = { 
      name: '', 
      level: 'beginner', 
      category: 'development' 
    };
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        skills: [...(formData.profile?.skills || []), newSkill]
      }
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.profile?.skills?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        skills: updatedSkills
      }
    });
  };

  const updateSkill = (index: number, field: keyof SimpleSkill, value: string) => {
    const updatedSkills = [...(formData.profile?.skills || [])];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        skills: updatedSkills
      }
    });
  };

  const addLanguage = () => {
    const newLanguage: SimpleLanguage = { name: '', level: 'A1' };
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        languages: [...(formData.profile?.languages || []), newLanguage]
      }
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = formData.profile?.languages?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        languages: updatedLanguages
      }
    });
  };

  const updateLanguage = (index: number, field: keyof SimpleLanguage, value: string) => {
    const updatedLanguages = [...(formData.profile?.languages || [])];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        languages: updatedLanguages
      }
    });
  };

  const addCertification = () => {
    const newCertifications = [...(formData.profile?.certifications || []), ''];
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        certifications: newCertifications
      }
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = formData.profile?.certifications?.filter((_, i) => i !== index) || [];
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        certifications: updatedCertifications
      }
    });
  };

  const updateCertification = (index: number, value: string) => {
    const updatedCertifications = [...(formData.profile?.certifications || [])];
    updatedCertifications[index] = value;
    setFormData({
      ...formData,
      profile: {
        ...formData.profile!,
        certifications: updatedCertifications
      }
    });
  };

  const countries = [
    'España', 'México', 'Colombia', 'Argentina', 'Perú', 'Chile',
    'Venezuela', 'Ecuador', 'Estados Unidos', 'Guatemala', 'Cuba', 'Bolivia'
  ];

  const timezones = [
    'EST', 'PST', 'MST', 'CST', 'GMT-5', 'GMT-3', 'GMT+1', 'GMT-6'
  ];

  const skillCategories = [
    'development', 'design', 'marketing', 'analytics', 'management', 'communication', 'hr'
  ];

  const skillLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
  const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: User },
    { id: 'location', label: 'Ubicación', icon: MapPin },
    { id: 'professional', label: 'Profesional', icon: Globe },
    { id: 'academic', label: 'Académico', icon: GraduationCap },
    { id: 'skills', label: 'Habilidades', icon: Award },
    { id: 'languages', label: 'Idiomas', icon: Languages }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </h2>
              <p className="text-sm text-muted">
                {user ? 'Modifica la información del usuario' : 'Completa los datos del nuevo usuario'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  currentTab === tab.id
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

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Tab: Información Básica */}
            {currentTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.first_name || ''}
                      onChange={(e) => handleInputChange('profile.first_name', e.target.value)}
                      className={`input-field w-full ${errors.first_name ? 'input-error' : ''}`}
                      placeholder="Nombre"
                    />
                    {errors.first_name && (
                      <p className="text-red-600 text-xs mt-1">{errors.first_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.last_name || ''}
                      onChange={(e) => handleInputChange('profile.last_name', e.target.value)}
                      className={`input-field w-full ${errors.last_name ? 'input-error' : ''}`}
                      placeholder="Apellido"
                    />
                    {errors.last_name && (
                      <p className="text-red-600 text-xs mt-1">{errors.last_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`input-field w-full ${errors.email ? 'input-error' : ''}`}
                      placeholder="usuario@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.profile?.phone || ''}
                      onChange={(e) => handleInputChange('profile.phone', e.target.value)}
                      className="input-field w-full"
                      placeholder="+1-555-0123"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={formData.profile?.birth_date || ''}
                      onChange={(e) => handleInputChange('profile.birth_date', e.target.value)}
                      className="input-field w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Rol *
                    </label>
                    <select
                      value={formData.role || 'volunteer'}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="volunteer">Voluntario</option>
                      <option value="lead_project">Líder de Proyecto</option>
                      <option value="hr">Recursos Humanos</option>
                      <option value="admin">Administrador</option>
                      <option value="unassigned">Sin Asignar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Estado *
                    </label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="suspended">Suspendido</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Biografía
                  </label>
                  <textarea
                    value={formData.profile?.bio || ''}
                    onChange={(e) => handleInputChange('profile.bio', e.target.value)}
                    rows={4}
                    className="input-field w-full resize-none"
                    placeholder="Cuéntanos un poco sobre este usuario..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Motivación
                  </label>
                  <textarea
                    value={formData.profile?.motivation || ''}
                    onChange={(e) => handleInputChange('profile.motivation', e.target.value)}
                    rows={3}
                    className="input-field w-full resize-none"
                    placeholder="¿Qué lo motiva a participar en Living Stones?"
                  />
                </div>
              </div>
            )}

            {/* Tab: Ubicación */}
            {currentTab === 'location' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      País *
                    </label>
                    <select
                      value={formData.profile?.country || ''}
                      onChange={(e) => handleInputChange('profile.country', e.target.value)}
                      className={`input-field w-full ${errors.country ? 'input-error' : ''}`}
                    >
                      <option value="">Seleccionar país</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-red-600 text-xs mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.city || ''}
                      onChange={(e) => handleInputChange('profile.city', e.target.value)}
                      className={`input-field w-full ${errors.city ? 'input-error' : ''}`}
                      placeholder="Ciudad"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Zona Horaria
                    </label>
                    <select
                      value={formData.profile?.timezone || 'GMT-5'}
                      onChange={(e) => handleInputChange('profile.timezone', e.target.value)}
                      className="input-field w-full"
                    >
                      {timezones.map(tz => (
                        <option key={tz} value={tz}>{tz}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Horas por Semana
                    </label>
                    <select
                      value={formData.profile?.hours_per_week || 10}
                      onChange={(e) => handleInputChange('profile.hours_per_week', parseInt(e.target.value))}
                      className="input-field w-full"
                    >
                      <option value={10}>10 horas</option>
                      <option value={20}>20 horas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Horario Preferido
                    </label>
                    <select
                      value={formData.profile?.preferred_hours || 'Flexible'}
                      onChange={(e) => handleInputChange('profile.preferred_hours', e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="Mañanas">Mañanas</option>
                      <option value="Tardes">Tardes</option>
                      <option value="Noches">Noches</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Días Preferidos
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.preferred_days || ''}
                      onChange={(e) => handleInputChange('profile.preferred_days', e.target.value)}
                      className="input-field w-full"
                      placeholder="Lunes,Martes,Miércoles..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Profesional */}
            {currentTab === 'professional' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      LinkedIn
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        value={formData.profile?.linkedin || ''}
                        onChange={(e) => handleInputChange('profile.linkedin', e.target.value)}
                        className="input-field w-full pl-10"
                        placeholder="https://linkedin.com/in/usuario"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      GitHub
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        value={formData.profile?.github || ''}
                        onChange={(e) => handleInputChange('profile.github', e.target.value)}
                        className="input-field w-full pl-10"
                        placeholder="https://github.com/usuario"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Portfolio
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="url"
                        value={formData.profile?.portfolio || ''}
                        onChange={(e) => handleInputChange('profile.portfolio', e.target.value)}
                        className="input-field w-full pl-10"
                        placeholder="https://miportfolio.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Académico */}
            {currentTab === 'academic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Universidad
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.university || ''}
                      onChange={(e) => handleInputChange('profile.university', e.target.value)}
                      className="input-field w-full"
                      placeholder="Nombre de la universidad"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Programa/Carrera
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.program || ''}
                      onChange={(e) => handleInputChange('profile.program', e.target.value)}
                      className="input-field w-full"
                      placeholder="Ingeniería, Marketing, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Supervisor Académico
                    </label>
                    <input
                      type="text"
                      value={formData.profile?.supervisor_name || ''}
                      onChange={(e) => handleInputChange('profile.supervisor_name', e.target.value)}
                      className="input-field w-full"
                      placeholder="Nombre del supervisor"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email del Supervisor
                    </label>
                    <input
                      type="email"
                      value={formData.profile?.supervisor_email || ''}
                      onChange={(e) => handleInputChange('profile.supervisor_email', e.target.value)}
                      className="input-field w-full"
                      placeholder="supervisor@universidad.edu"
                    />
                  </div>
                </div>

                {/* Certificaciones */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-slate-700">
                      Certificaciones
                    </label>
                    <button
                      type="button"
                      onClick={addCertification}
                      className="btn-secondary text-sm flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Agregar</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.profile?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => updateCertification(index, e.target.value)}
                          className="input-field flex-1"
                          placeholder="Nombre de la certificación"
                        />
                        <button
                          type="button"
                          onClick={() => removeCertification(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Habilidades */}
            {currentTab === 'skills' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Habilidades Técnicas
                  </h3>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="btn-living flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Habilidad</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.profile?.skills?.map((skill, index) => (
                    <div key={index} className="card p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Habilidad
                          </label>
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(index, 'name', e.target.value)}
                            className="input-field w-full"
                            placeholder="Ej: React, Python, Photoshop"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nivel
                          </label>
                          <select
                            value={skill.level}
                            onChange={(e) => updateSkill(index, 'level', e.target.value)}
                            className="input-field w-full"
                          >
                            {skillLevels.map(level => (
                              <option key={level} value={level}>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Categoría
                          </label>
                          <select
                            value={skill.category}
                            onChange={(e) => updateSkill(index, 'category', e.target.value)}
                            className="input-field w-full"
                          >
                            {skillCategories.map(category => (
                              <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="w-full p-2 text-red-500 hover:bg-red-50 border border-red-200 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {(!formData.profile?.skills || formData.profile.skills.length === 0) && (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg">
                    <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No hay habilidades agregadas</p>
                    <p className="text-slate-400 text-xs">Haz clic en "Agregar Habilidad" para comenzar</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Idiomas */}
            {currentTab === 'languages' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Idiomas
                  </h3>
                  <button
                    type="button"
                    onClick={addLanguage}
                    className="btn-living flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Idioma</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.profile?.languages?.map((language, index) => (
                    <div key={index} className="card p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Idioma
                          </label>
                          <input
                            type="text"
                            value={language.name}
                            onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                            className="input-field w-full"
                            placeholder="Ej: Español, Inglés, Francés"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nivel
                          </label>
                          <select
                            value={language.level}
                            onChange={(e) => updateLanguage(index, 'level', e.target.value)}
                            className="input-field w-full"
                          >
                            {languageLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={() => removeLanguage(index)}
                            className="w-full p-2 text-red-500 hover:bg-red-50 border border-red-200 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {(!formData.profile?.languages || formData.profile.languages.length === 0) && (
                  <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg">
                    <Languages className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No hay idiomas agregados</p>
                    <p className="text-slate-400 text-xs">Haz clic en "Agregar Idioma" para comenzar</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer con botones */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-living flex items-center space-x-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner w-4 h-4"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{user ? 'Actualizar' : 'Crear'} Usuario</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}