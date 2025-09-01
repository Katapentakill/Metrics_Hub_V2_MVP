'use client';

import { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Loader2,
  Globe,
  Github,
  Linkedin,
  GraduationCap,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Award,
  Languages,
  Check
} from 'lucide-react';

// Tipos simplificados para el formulario
interface SimpleSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'development' | 'design' | 'marketing' | 'analytics' | 'management' | 'communication' | 'hr';
}

interface SimpleLanguage {
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
}

interface UserProfile {
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  city: string;
  timezone: string;
  hours_per_week: 10 | 20;
  preferred_hours: string;
  preferred_days: string;
  bio: string;
  birth_date: string;
  linkedin: string;
  github: string;
  portfolio: string;
  motivation: string;
  university: string;
  program: string;
  supervisor_name: string;
  supervisor_email: string;
  skills: SimpleSkill[];
  languages: SimpleLanguage[];
  certifications: string[];
}

type RegistrationData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'volunteer';
  status: 'active';
  acceptTerms: boolean;
  volunteerType: 'regular' | 'student_usa' | 'student_intl' | 'professional_intl';
  professionalArea?: string;
  yearsExperience?: number;
  profile: UserProfile;
};

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'volunteer',
    status: 'active',
    acceptTerms: false,
    volunteerType: 'regular',
    profile: {
      first_name: '',
      last_name: '',
      phone: '',
      country: '',
      city: '',
      timezone: 'GMT-5',
      hours_per_week: 10,
      preferred_hours: '',
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

  const countries = [
    { code: 'US', name: 'Estados Unidos', timezone: 'EST' },
    { code: 'MX', name: 'México', timezone: 'CST' },
    { code: 'CO', name: 'Colombia', timezone: 'GMT-5' },
    { code: 'AR', name: 'Argentina', timezone: 'GMT-3' },
    { code: 'ES', name: 'España', timezone: 'GMT+1' },
    { code: 'PE', name: 'Perú', timezone: 'GMT-5' },
    { code: 'CL', name: 'Chile', timezone: 'GMT-3' },
    { code: 'VE', name: 'Venezuela', timezone: 'GMT-4' },
    { code: 'EC', name: 'Ecuador', timezone: 'GMT-5' },
    { code: 'GT', name: 'Guatemala', timezone: 'GMT-6' }
  ];

  const skillCategories = [
    { value: 'development', label: 'Desarrollo' },
    { value: 'design', label: 'Diseño' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'analytics', label: 'Análisis' },
    { value: 'management', label: 'Gestión' },
    { value: 'communication', label: 'Comunicación' },
    { value: 'hr', label: 'Recursos Humanos' }
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' },
    { value: 'expert', label: 'Experto' }
  ];

  const languageLevels = [
    { value: 'A1', label: 'A1 - Básico' },
    { value: 'A2', label: 'A2 - Elemental' },
    { value: 'B1', label: 'B1 - Intermedio' },
    { value: 'B2', label: 'B2 - Intermedio Alto' },
    { value: 'C1', label: 'C1 - Avanzado' },
    { value: 'C2', label: 'C2 - Dominio' },
    { value: 'Native', label: 'Nativo' }
  ];

  const daysOfWeek = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('profile.')) {
      const profileField = field.replace('profile.', '');
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [profileField]: value
        }
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        country: country?.name || '',
        timezone: country?.timezone || 'GMT-5'
      }
    });
  };

  const togglePreferredDay = (day: string) => {
    const currentDays = formData.profile.preferred_days?.split(',').filter(d => d.trim()) || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    handleInputChange('profile.preferred_days', newDays.join(','));
  };

  const addSkill = () => {
    const newSkill: SimpleSkill = { name: '', level: 'beginner', category: 'development' };
    handleInputChange('profile.skills', [...formData.profile.skills, newSkill]);
  };

  const updateSkill = (index: number, field: keyof SimpleSkill, value: string) => {
    const updatedSkills = [...formData.profile.skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    handleInputChange('profile.skills', updatedSkills);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.profile.skills.filter((_, i) => i !== index);
    handleInputChange('profile.skills', updatedSkills);
  };

  const addLanguage = () => {
    const newLanguage: SimpleLanguage = { name: '', level: 'A1' };
    handleInputChange('profile.languages', [...formData.profile.languages, newLanguage]);
  };

  const updateLanguage = (index: number, field: keyof SimpleLanguage, value: string) => {
    const updatedLanguages = [...formData.profile.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    handleInputChange('profile.languages', updatedLanguages);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = formData.profile.languages.filter((_, i) => i !== index);
    handleInputChange('profile.languages', updatedLanguages);
  };

  const addCertification = () => {
    handleInputChange('profile.certifications', [...formData.profile.certifications, '']);
  };

  const updateCertification = (index: number, value: string) => {
    const updatedCertifications = [...formData.profile.certifications];
    updatedCertifications[index] = value;
    handleInputChange('profile.certifications', updatedCertifications);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = formData.profile.certifications.filter((_, i) => i !== index);
    handleInputChange('profile.certifications', updatedCertifications);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.profile.first_name?.trim()) newErrors['profile.first_name'] = 'El nombre es requerido';
        if (!formData.profile.last_name?.trim()) newErrors['profile.last_name'] = 'El apellido es requerido';
        if (!formData.email?.trim()) newErrors.email = 'El email es requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email inválido';
        if (!formData.profile.phone?.trim()) newErrors['profile.phone'] = 'El teléfono es requerido';
        if (!formData.profile.country) newErrors['profile.country'] = 'El país es requerido';
        if (!formData.profile.city?.trim()) newErrors['profile.city'] = 'La ciudad es requerida';
        if (!formData.profile.birth_date) newErrors['profile.birth_date'] = 'La fecha de nacimiento es requerida';
        break;
      
      case 2:
        if (!formData.password) newErrors.password = 'La contraseña es requerida';
        else if (formData.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        break;
      
      case 5:
        if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!validateStep(5)) return;
    
    setIsLoading(true);

    try {
      // Simular registro
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form Data:', formData);
      alert('Registro completado. Por favor inicia sesión.');
    } catch (error) {
      console.error('Error en registro:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const steps = [
    { number: 1, title: 'Información Personal', icon: User },
    { number: 2, title: 'Seguridad', icon: Lock },
    { number: 3, title: 'Disponibilidad', icon: Calendar },
    { number: 4, title: 'Habilidades', icon: Award },
    { number: 5, title: 'Finalizar', icon: Check }
  ];

  const isStepComplete = (stepNumber: number) => {
    return currentStep > stepNumber;
  };

  const getProgressPercentage = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <h1 className="text-gradient text-4xl font-bold mb-2">
            Crear Cuenta
          </h1>
          <p className="text-muted text-lg">Únete a Living Stones como voluntario</p>
        </div>

        {/* Main Card */}
        <div className="card p-8 space-y-8 hover-lift">
          {/* Progress Section */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="progress-bar h-2">
              <div 
                className="progress-fill transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isComplete = isStepComplete(step.number);
                
                return (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      isActive 
                        ? 'timeline-step-active shadow-lg transform scale-110' 
                        : isComplete
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                        : 'timeline-step-inactive hover:scale-105'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-xs font-medium hidden sm:block ${
                        isActive 
                          ? 'text-primary' 
                          : isComplete 
                          ? 'text-emerald-600' 
                          : 'text-muted'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`text-xs ${
                        isActive || isComplete ? 'text-primary' : 'text-muted'
                      }`}>
                        Paso {step.number}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step Content */}
            <div className="min-h-[500px] transition-all duration-300">
              {/* Step 1: Información Personal */}
              {currentStep === 1 && (
                <div className="space-y-6 content-enter">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Información Personal
                    </h3>
                    <p className="text-muted">Cuéntanos un poco sobre ti</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="input-group">
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Nombre *
                      </label>
                      <div className="relative">
                        <User className="input-icon w-5 h-5" />
                        <input
                          type="text"
                          value={formData.profile.first_name}
                          onChange={(e) => handleInputChange('profile.first_name', e.target.value)}
                          className={`input-field has-icon w-full ${errors['profile.first_name'] ? 'input-error' : ''}`}
                          placeholder="Tu nombre"
                          disabled={isLoading}
                        />
                      </div>
                      {errors['profile.first_name'] && <p className="text-red-600 text-xs mt-1">{errors['profile.first_name']}</p>}
                    </div>

                    <div className="input-group">
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Apellido *
                      </label>
                      <div className="relative">
                        <User className="input-icon w-5 h-5" />
                        <input
                          type="text"
                          value={formData.profile.last_name}
                          onChange={(e) => handleInputChange('profile.last_name', e.target.value)}
                          className={`input-field has-icon w-full ${errors['profile.last_name'] ? 'input-error' : ''}`}
                          placeholder="Tu apellido"
                          disabled={isLoading}
                        />
                      </div>
                      {errors['profile.last_name'] && <p className="text-red-600 text-xs mt-1">{errors['profile.last_name']}</p>}
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="input-icon w-5 h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`input-field has-icon w-full ${errors.email ? 'input-error' : ''}`}
                        placeholder="tu@email.com"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <Phone className="input-icon w-5 h-5" />
                      <input
                        type="tel"
                        value={formData.profile.phone}
                        onChange={(e) => handleInputChange('profile.phone', e.target.value)}
                        className={`input-field has-icon w-full ${errors['profile.phone'] ? 'input-error' : ''}`}
                        placeholder="+1 (555) 123-4567"
                        disabled={isLoading}
                      />
                    </div>
                    {errors['profile.phone'] && <p className="text-red-600 text-xs mt-1">{errors['profile.phone']}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="input-group">
                      <label className="block text-sm font-medium text-secondary mb-2">
                        País *
                      </label>
                      <div className="relative">
                        <MapPin className="input-icon w-5 h-5" />
                        <select
                          value={countries.find(c => c.name === formData.profile.country)?.code || ''}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className={`input-field has-icon w-full ${errors['profile.country'] ? 'input-error' : ''}`}
                          disabled={isLoading}
                        >
                          <option value="">Selecciona tu país</option>
                          {countries.map(country => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors['profile.country'] && <p className="text-red-600 text-xs mt-1">{errors['profile.country']}</p>}
                    </div>

                    <div className="input-group">
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Ciudad *
                      </label>
                      <div className="relative">
                        <MapPin className="input-icon w-5 h-5" />
                        <input
                          type="text"
                          value={formData.profile.city}
                          onChange={(e) => handleInputChange('profile.city', e.target.value)}
                          className={`input-field has-icon w-full ${errors['profile.city'] ? 'input-error' : ''}`}
                          placeholder="Tu ciudad"
                          disabled={isLoading}
                        />
                      </div>
                      {errors['profile.city'] && <p className="text-red-600 text-xs mt-1">{errors['profile.city']}</p>}
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Fecha de Nacimiento *
                    </label>
                    <div className="relative">
                      <Calendar className="input-icon w-5 h-5" />
                      <input
                        type="date"
                        value={formData.profile.birth_date}
                        onChange={(e) => handleInputChange('profile.birth_date', e.target.value)}
                        className={`input-field has-icon w-full ${errors['profile.birth_date'] ? 'input-error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors['profile.birth_date'] && <p className="text-red-600 text-xs mt-1">{errors['profile.birth_date']}</p>}
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Cuéntanos sobre ti
                    </label>
                    <textarea
                      value={formData.profile.bio}
                      onChange={(e) => handleInputChange('profile.bio', e.target.value)}
                      rows={3}
                      className="input-field w-full resize-none"
                      placeholder="Escribe una breve descripción sobre ti, tu experiencia y intereses..."
                      disabled={isLoading}
                    />
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      ¿Qué te motiva a ser voluntario?
                    </label>
                    <textarea
                      value={formData.profile.motivation}
                      onChange={(e) => handleInputChange('profile.motivation', e.target.value)}
                      rows={3}
                      className="input-field w-full resize-none"
                      placeholder="Comparte qué te inspira a contribuir como voluntario en Living Stones..."
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Seguridad */}
              {currentStep === 2 && (
                <div className="space-y-6 content-enter">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Seguridad y Tipo de Voluntario
                    </h3>
                    <p className="text-muted">Configura tu acceso y perfil</p>
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="input-icon w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`input-field has-icon w-full pr-12 ${errors.password ? 'input-error' : ''}`}
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                    <p className="text-xs text-slate-500 mt-1">Mínimo 8 caracteres</p>
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative">
                      <Lock className="input-icon w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`input-field has-icon w-full pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-4">
                      Tipo de Voluntario
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'regular', label: 'Voluntario Regular', desc: 'Ciudadano/Residente sin estudios actuales', color: 'border-blue-200 hover:border-blue-300 peer-checked:border-blue-500 peer-checked:bg-blue-50' },
                        { value: 'student_usa', label: 'Estudiante USA', desc: 'Estudiante en universidad americana', color: 'border-green-200 hover:border-green-300 peer-checked:border-green-500 peer-checked:bg-green-50' },
                        { value: 'student_intl', label: 'Estudiante Internacional', desc: 'Estudiante fuera de USA', color: 'border-purple-200 hover:border-purple-300 peer-checked:border-purple-500 peer-checked:bg-purple-50' },
                        { value: 'professional_intl', label: 'Profesional Internacional', desc: 'Profesional fuera de USA', color: 'border-orange-200 hover:border-orange-300 peer-checked:border-orange-500 peer-checked:bg-orange-50' }
                      ].map((type) => (
                        <div key={type.value} className="relative">
                          <input
                            type="radio"
                            id={type.value}
                            name="volunteerType"
                            value={type.value}
                            checked={formData.volunteerType === type.value}
                            onChange={(e) => handleInputChange('volunteerType', e.target.value as any)}
                            className="peer sr-only"
                          />
                          <label
                            htmlFor={type.value}
                            className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${type.color}`}
                          >
                            <span className="font-semibold text-slate-800">{type.label}</span>
                            <span className="text-sm text-slate-600 mt-1">{type.desc}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Campos condicionales */}
                  {(formData.volunteerType === 'student_usa' || formData.volunteerType === 'student_intl') && (
                    <div className="card-gradient p-6 rounded-xl border space-y-4 scale-in">
                      <h4 className="font-semibold text-slate-800 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Información Académica
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Universidad
                          </label>
                          <input
                            type="text"
                            value={formData.profile.university || ''}
                            onChange={(e) => handleInputChange('profile.university', e.target.value)}
                            className="input-field w-full"
                            placeholder="Nombre de tu universidad"
                          />
                        </div>
                        <div className="input-group">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Programa/Carrera
                          </label>
                          <input
                            type="text"
                            value={formData.profile.program || ''}
                            onChange={(e) => handleInputChange('profile.program', e.target.value)}
                            className="input-field w-full"
                            placeholder="Tu carrera o programa"
                          />
                        </div>
                        <div className="input-group">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Supervisor Académico
                          </label>
                          <input
                            type="text"
                            value={formData.profile.supervisor_name || ''}
                            onChange={(e) => handleInputChange('profile.supervisor_name', e.target.value)}
                            className="input-field w-full"
                            placeholder="Nombre del supervisor"
                          />
                        </div>
                        <div className="input-group">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email del Supervisor
                          </label>
                          <input
                            type="email"
                            value={formData.profile.supervisor_email || ''}
                            onChange={(e) => handleInputChange('profile.supervisor_email', e.target.value)}
                            className="input-field w-full"
                            placeholder="supervisor@universidad.edu"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.volunteerType === 'professional_intl' && (
                    <div className="card-gradient p-6 rounded-xl border space-y-4 scale-in">
                      <h4 className="font-semibold text-slate-800">
                        Información Profesional
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="input-group">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Área Profesional
                          </label>
                          <input
                            type="text"
                            value={formData.professionalArea || ''}
                            onChange={(e) => handleInputChange('professionalArea', e.target.value)}
                            className="input-field w-full"
                            placeholder="Ej: Desarrollo de Software, Marketing"
                          />
                        </div>
                        <div className="input-group">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Años de Experiencia
                          </label>
                          <input
                            type="number"
                            value={formData.yearsExperience || ''}
                            onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                            className="input-field w-full"
                            placeholder="0"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enlaces Profesionales */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-800">Enlaces Profesionales (Opcional)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="input-group">
                        <label className="block text-sm font-medium text-secondary mb-2">
                          LinkedIn
                        </label>
                        <div className="relative">
                          <Linkedin className="input-icon w-5 h-5" />
                          <input
                            type="url"
                            value={formData.profile.linkedin || ''}
                            onChange={(e) => handleInputChange('profile.linkedin', e.target.value)}
                            className="input-field has-icon w-full"
                            placeholder="https://linkedin.com/in/tu-perfil"
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label className="block text-sm font-medium text-secondary mb-2">
                          GitHub
                        </label>
                        <div className="relative">
                          <Github className="input-icon w-5 h-5" />
                          <input
                            type="url"
                            value={formData.profile.github || ''}
                            onChange={(e) => handleInputChange('profile.github', e.target.value)}
                            className="input-field has-icon w-full"
                            placeholder="https://github.com/tu-usuario"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 input-group">
                        <label className="block text-sm font-medium text-secondary mb-2">
                          Portfolio
                        </label>
                        <div className="relative">
                          <Globe className="input-icon w-5 h-5" />
                          <input
                            type="url"
                            value={formData.profile.portfolio || ''}
                            onChange={(e) => handleInputChange('profile.portfolio', e.target.value)}
                            className="input-field has-icon w-full"
                            placeholder="https://tu-portfolio.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Disponibilidad */}
              {currentStep === 3 && (
                <div className="space-y-6 content-enter">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Tu Disponibilidad
                    </h3>
                    <p className="text-muted">Define cuándo puedes colaborar</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="input-group">
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Horas por semana *
                      </label>
                      <select
                        value={formData.profile.hours_per_week}
                        onChange={(e) => handleInputChange('profile.hours_per_week', parseInt(e.target.value) as 10 | 20)}
                        className="input-field w-full"
                        disabled={isLoading}
                      >
                        <option value={10}>10 horas semanales</option>
                        <option value={20}>20 horas semanales</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="block text-sm font-medium text-secondary mb-2">
                        Horario Preferido *
                      </label>
                      <select
                        value={formData.profile.preferred_hours}
                        onChange={(e) => handleInputChange('profile.preferred_hours', e.target.value)}
                        className="input-field w-full"
                        disabled={isLoading}
                      >
                        <option value="">Selecciona horario</option>
                        <option value="Mañanas">Mañanas (8AM - 12PM)</option>
                        <option value="Tardes">Tardes (12PM - 6PM)</option>
                        <option value="Noches">Noches (6PM - 10PM)</option>
                        <option value="Flexible">Horario Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-3">
                      Días Preferidos
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {daysOfWeek.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => togglePreferredDay(day)}
                          className={`p-3 text-sm border-2 rounded-xl transition-all duration-200 font-medium ${
                            formData.profile.preferred_days.includes(day)
                              ? 'bg-emerald-500 border-emerald-500 text-white shadow-md transform scale-105'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:shadow-sm'
                          }`}
                          disabled={isLoading}
                        >
                          <div className="text-xs">{day.substring(0, 3)}</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Selecciona los días que prefieres trabajar (opcional)
                    </p>
                  </div>

                  <div className="input-group">
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Zona Horaria
                    </label>
                    <input
                      type="text"
                      value={formData.profile.timezone}
                      className="input-field w-full bg-slate-50 text-slate-600"
                      disabled
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Detectada automáticamente según tu país
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Habilidades */}
              {currentStep === 4 && (
                <div className="space-y-6 content-enter">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      Habilidades e Idiomas
                    </h3>
                    <p className="text-muted">Comparte tus conocimientos y capacidades</p>
                  </div>

                  {/* Habilidades */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-800 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-emerald-600" />
                        Habilidades Técnicas
                      </h4>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.profile.skills.map((skill, index) => (
                        <div key={index} className="card p-4 hover-lift">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="input-group">
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
                            <div className="input-group">
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Nivel
                              </label>
                              <select
                                value={skill.level}
                                onChange={(e) => updateSkill(index, 'level', e.target.value as any)}
                                className="input-field w-full"
                              >
                                {skillLevels.map(level => (
                                  <option key={level.value} value={level.value}>
                                    {level.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="input-group">
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Categoría
                              </label>
                              <select
                                value={skill.category}
                                onChange={(e) => updateSkill(index, 'category', e.target.value as any)}
                                className="input-field w-full"
                              >
                                {skillCategories.map(category => (
                                  <option key={category.value} value={category.value}>
                                    {category.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="w-full p-3 text-red-500 hover:bg-red-50 border border-red-200 rounded-xl transition-colors flex items-center justify-center"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {formData.profile.skills.length === 0 && (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <Award className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-500 text-lg mb-1">No hay habilidades agregadas</p>
                        <p className="text-slate-400 text-sm">Haz clic en "Agregar" para comenzar</p>
                      </div>
                    )}
                  </div>

                  {/* Idiomas */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-800 flex items-center">
                        <Languages className="w-5 h-5 mr-2 text-blue-600" />
                        Idiomas
                      </h4>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.profile.languages.map((language, index) => (
                        <div key={index} className="card p-4 hover-lift">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div className="input-group">
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
                            <div className="input-group">
                              <label className="block text-sm font-medium text-slate-700 mb-2">
                                Nivel
                              </label>
                              <select
                                value={language.level}
                                onChange={(e) => updateLanguage(index, 'level', e.target.value as any)}
                                className="input-field w-full"
                              >
                                {languageLevels.map(level => (
                                  <option key={level.value} value={level.value}>
                                    {level.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={() => removeLanguage(index)}
                                className="w-full p-3 text-red-500 hover:bg-red-50 border border-red-200 rounded-xl transition-colors flex items-center justify-center"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {formData.profile.languages.length === 0 && (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                        <Languages className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-500 text-lg mb-1">No hay idiomas agregados</p>
                        <p className="text-slate-400 text-sm">Haz clic en "Agregar" para comenzar</p>
                      </div>
                    )}
                  </div>

                  {/* Certificaciones */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-800">Certificaciones (Opcional)</h4>
                      <button
                        type="button"
                        onClick={addCertification}
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {formData.profile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={cert}
                            onChange={(e) => updateCertification(index, e.target.value)}
                            className="flex-1 input-field"
                            placeholder="Nombre de la certificación"
                          />
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Finalizar */}
              {currentStep === 5 && (
                <div className="space-y-6 content-enter">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      ¡Casi Terminamos!
                    </h3>
                    <p className="text-muted">Revisa tu información y acepta los términos</p>
                  </div>

                  {/* Resumen */}
                  <div className="card-gradient p-6 rounded-xl border">
                    <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Resumen de tu Perfil
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div className="space-y-2">
                        <p><span className="font-medium text-slate-700">Nombre:</span> <span className="text-slate-600">{formData.profile.first_name} {formData.profile.last_name}</span></p>
                        <p><span className="font-medium text-slate-700">Email:</span> <span className="text-slate-600">{formData.email}</span></p>
                        <p><span className="font-medium text-slate-700">Ubicación:</span> <span className="text-slate-600">{formData.profile.city}, {formData.profile.country}</span></p>
                        <p><span className="font-medium text-slate-700">Tipo:</span> <span className="badge badge-info">
                          {formData.volunteerType === 'regular' ? 'Voluntario Regular' :
                          formData.volunteerType === 'student_usa' ? 'Estudiante USA' :
                          formData.volunteerType === 'student_intl' ? 'Estudiante Internacional' :
                          'Profesional Internacional'}
                        </span></p>
                      </div>
                      <div className="space-y-2">
                        <p><span className="font-medium text-slate-700">Disponibilidad:</span> <span className="text-slate-600">{formData.profile.hours_per_week}h/semana</span></p>
                        <p><span className="font-medium text-slate-700">Horario:</span> <span className="text-slate-600">{formData.profile.preferred_hours || 'No especificado'}</span></p>
                        <p><span className="font-medium text-slate-700">Habilidades:</span> <span className="badge badge-success">{formData.profile.skills.length} agregadas</span></p>
                        <p><span className="font-medium text-slate-700">Idiomas:</span> <span className="badge badge-success">{formData.profile.languages.length} agregados</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="card p-6 border-2 border-slate-200">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className={`mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 ${
                          errors.acceptTerms ? 'border-red-500' : ''
                        }`}
                        disabled={isLoading}
                      />
                      <label htmlFor="terms" className="text-sm text-slate-700 leading-relaxed">
                        Acepto los{' '}
                        <a href="#" className="text-primary hover:underline font-medium">
                          términos y condiciones
                        </a>
                        {' '}y la{' '}
                        <a href="#" className="text-primary hover:underline font-medium">
                          política de privacidad
                        </a>
                        {' '}de Living Stones. Entiendo que mi información será utilizada para evaluar mi participación como voluntario.
                      </label>
                    </div>
                    {errors.acceptTerms && <p className="text-red-600 text-xs mt-2 ml-9">{errors.acceptTerms}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading}
                className={`flex items-center space-x-2 px-6 py-3 border-2 border-slate-300 rounded-xl font-medium transition-all duration-200 ${
                  currentStep === 1 || isLoading
                    ? 'text-slate-400 cursor-not-allowed opacity-50'
                    : 'text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="btn-living flex items-center space-x-2"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !formData.acceptTerms}
                  className="btn-living flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Crear Cuenta
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-slate-200">
            <div className="text-sm text-muted">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-primary hover:underline font-medium transition-colors">
                Inicia sesión aquí
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}