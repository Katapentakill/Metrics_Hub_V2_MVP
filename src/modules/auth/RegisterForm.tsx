// src/modules/auth/RegisterForm.tsx
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
  Check,
  Upload,
  File,
  X
} from 'lucide-react';
import '@/styles/register.css';

// Tipos
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
  resume_file?: File | null;
  resume_filename?: string;
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form Data:', formData);
      console.log('Registro completado. Por favor inicia sesión.');
      window.location.href = '/login?message=Registro completado. Por favor inicia sesión.';
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
    <div className="register-container">
      <div className="register-content">
        {/* Header */}
        <div className="register-header">
        
          <h1 className="register-title2">Crear Cuenta</h1>
          <p className="register-subtitle">Únete a Living Stones como voluntario</p>
        </div>

        {/* Main Card */}
        <div className="register-form-card">
          {/* Progress Section */}
          <div>
            {/* Progress Bar */}
            <div className="register-progress-bar">
              <div 
                className="register-progress-fill"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="register-steps">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isComplete = isStepComplete(step.number);
                
                return (
                  <div key={step.number} className="register-step">
                    <div className={`register-step-circle ${
                      isActive ? 'active' : isComplete ? 'complete' : 'inactive'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="register-step-text">
                      <p className={`register-step-title ${
                        isActive ? 'active' : isComplete ? 'complete' : 'inactive'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`register-step-number ${
                        isActive || isComplete ? 'active' : 'inactive'
                      }`}>
                        Paso {step.number}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step Content */}
            <div className="register-step-content">
              {/* Step 1: Información Personal */}
              {currentStep === 1 && (
                <div className="content-enter">
                  <div className="register-step-header">
                    <h3 className="register-step-content-title">Información Personal</h3>
                    <p className="register-step-content-description">Cuéntanos un poco sobre ti</p>
                  </div>
                  
                  <div className="register-form-grid">
                    <div className="register-input-group">
                      <label className="register-input-label">Nombre *</label>
                      <div className="register-input-wrapper">
                        <User className="register-input-icon" />
                        <input
                          type="text"
                          value={formData.profile.first_name}
                          onChange={(e) => handleInputChange('profile.first_name', e.target.value)}
                          className={`register-input-field ${errors['profile.first_name'] ? 'input-error' : ''}`}
                          placeholder="Tu nombre"
                          disabled={isLoading}
                        />
                      </div>
                      {errors['profile.first_name'] && (
                        <p className="register-alert-error">{errors['profile.first_name']}</p>
                      )}
                    </div>

                    <div className="register-input-group">
                      <label className="register-input-label">Apellido *</label>
                      <div className="register-input-wrapper">
                        <User className="register-input-icon" />
                        <input
                          type="text"
                          value={formData.profile.last_name}
                          onChange={(e) => handleInputChange('profile.last_name', e.target.value)}
                          className={`register-input-field ${errors['profile.last_name'] ? 'input-error' : ''}`}
                          placeholder="Tu apellido"
                          disabled={isLoading}
                        />
                      </div>
                      {errors['profile.last_name'] && (
                        <p className="register-alert-error">{errors['profile.last_name']}</p>
                      )}
                    </div>
                  </div>

                  <div className="register-input-group register-form-full-width">
                    <label className="register-input-label">Email *</label>
                    <div className="register-input-wrapper">
                      <Mail className="register-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`register-input-field ${errors.email ? 'input-error' : ''}`}
                        placeholder="tu@email.com"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="register-alert-error">{errors.email}</p>}
                  </div>

                  <div className="register-input-group register-form-full-width">
                    <label className="register-input-label">Teléfono *</label>
                    <div className="register-input-wrapper">
                      <Phone className="register-input-icon" />
                      <input
                        type="tel"
                        value={formData.profile.phone}
                        onChange={(e) => handleInputChange('profile.phone', e.target.value)}
                        className={`register-input-field ${errors['profile.phone'] ? 'input-error' : ''}`}
                        placeholder="+1 (555) 123-4567"
                        disabled={isLoading}
                      />
                    </div>
                    {errors['profile.phone'] && (
                      <p className="register-alert-error">{errors['profile.phone']}</p>
                    )}
                  </div>

                  <div className="register-form-grid">
                    <div className="register-input-group">
                      <label className="register-input-label">País *</label>
                      <div className="register-input-wrapper">
                        <MapPin className="register-input-icon" />
                        <select
                          value={countries.find(c => c.name === formData.profile.country)?.code || ''}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className={`register-select-field ${errors['profile.country'] ? 'input-error' : ''}`}
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
                      {errors['profile.country'] && (
                        <p className="register-alert-error">{errors['profile.country']}</p>
                      )}
                    </div>

                    <div className="register-input-group">
                      <label className="register-input-label">Ciudad *</label>
                      <div className="register-input-wrapper">
                        <MapPin className="register-input-icon" />
                        <input
                          type="text"
                          value={formData.profile.city}
                          onChange={(e) => handleInputChange('profile.city', e.target.value)}
                          className={`register-input-field ${errors['profile.city'] ? 'input-error' : ''}`}
                          placeholder="Tu ciudad"
                          disabled={isLoading}
                        />
                      </div>
                      {errors['profile.city'] && (
                        <p className="register-alert-error">{errors['profile.city']}</p>
                      )}
                    </div>
                  </div>

                  <div className="register-input-group register-form-full-width">
                    <label className="register-input-label">Fecha de Nacimiento *</label>
                    <div className="register-input-wrapper">
                      <Calendar className="register-input-icon" />
                      <input
                        type="date"
                        value={formData.profile.birth_date}
                        onChange={(e) => handleInputChange('profile.birth_date', e.target.value)}
                        className={`register-input-field ${errors['profile.birth_date'] ? 'input-error' : ''}`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors['profile.birth_date'] && (
                      <p className="register-alert-error">{errors['profile.birth_date']}</p>
                    )}
                  </div>

                  <div className="register-input-group register-form-full-width">
                    <label className="register-input-label">Cuéntanos sobre ti</label>
                    <textarea
                      value={formData.profile.bio}
                      onChange={(e) => handleInputChange('profile.bio', e.target.value)}
                      rows={3}
                      className="register-input-field"
                      placeholder="Escribe una breve descripción sobre ti, tu experiencia y intereses..."
                      disabled={isLoading}
                    />
                  </div>

                  <div className="register-input-group register-form-full-width">
                    <label className="register-input-label">¿Qué te motiva a ser voluntario?</label>
                    <textarea
                      value={formData.profile.motivation}
                      onChange={(e) => handleInputChange('profile.motivation', e.target.value)}
                      rows={3}
                      className="register-input-field"
                      placeholder="Comparte qué te inspira a contribuir como voluntario en Living Stones..."
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Seguridad */}
              {currentStep === 2 && (
                <div className="content-enter">
                  <div className="register-step-header">
                    <h3 className="register-step-content-title">Seguridad y Tipo de Voluntario</h3>
                    <p className="register-step-content-description">Configura tu acceso y perfil</p>
                  </div>

                  <div className="register-input-group">
                    <label className="register-input-label">Contraseña *</label>
                    <div className="register-input-wrapper">
                      <Lock className="register-input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`register-input-field register-input-field-with-button ${errors.password ? 'input-error' : ''}`}
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="register-input-toggle-btn"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="register-alert-error">{errors.password}</p>}
                    <p className="register-step-content-description">Mínimo 8 caracteres</p>
                  </div>

                  <div className="register-input-group">
                    <label className="register-input-label">Confirmar Contraseña *</label>
                    <div className="register-input-wrapper">
                      <Lock className="register-input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`register-input-field register-input-field-with-button ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="register-input-toggle-btn"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="register-alert-error">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="register-input-group">
                    <label className="register-input-label">Tipo de Voluntario</label>
                    <div className="register-type-grid">
                      {[
                        
                        { value: 'student_usa', label: 'CPT-USA', desc: 'Estudiante internacional practicante en USA', color: 'green' },
                        { value: 'student_intl', label: 'OPT-USA', desc: 'Graduado internacional practicante en  USA', color: 'darkgreen' },
                        { value: 'regular', label: 'Voluntario Regular', color: 'teal' },

                      ].map((type) => (
                        <div key={type.value} className="register-type-option">
                          <input
                            type="radio"
                            id={type.value}
                            name="volunteerType"
                            value={type.value}
                            checked={formData.volunteerType === type.value}
                            onChange={(e) => handleInputChange('volunteerType', e.target.value)}
                            className="register-type-radio"
                          />
                          <label htmlFor={type.value} className={`register-type-label ${type.color}`}>
                            <span className="register-type-title">{type.label}</span>
                            <span className="register-type-description">{type.desc}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Campos condicionales para estudiantes */}
                  {(formData.volunteerType === 'student_usa' || formData.volunteerType === 'student_intl') && (
                    <div className="register-conditional-section">
                      <h4 className="register-conditional-title">
                        <GraduationCap className="w-5 h-5" />
                        Información Académica
                      </h4>
                      <div className="register-form-grid">
                        <div className="register-input-group">
                          <label className="register-input-label">Universidad</label>
                          <input
                            type="text"
                            value={formData.profile.university || ''}
                            onChange={(e) => handleInputChange('profile.university', e.target.value)}
                            className="register-input-field"
                            placeholder="Nombre de tu universidad"
                          />
                        </div>
                        <div className="register-input-group">
                          <label className="register-input-label">Programa/Carrera</label>
                          <input
                            type="text"
                            value={formData.profile.program || ''}
                            onChange={(e) => handleInputChange('profile.program', e.target.value)}
                            className="register-input-field"
                            placeholder="Tu carrera o programa"
                          />
                        </div>
                        <div className="register-input-group">
                          <label className="register-input-label">Supervisor Académico</label>
                          <input
                            type="text"
                            value={formData.profile.supervisor_name || ''}
                            onChange={(e) => handleInputChange('profile.supervisor_name', e.target.value)}
                            className="register-input-field"
                            placeholder="Nombre del supervisor"
                          />
                        </div>
                        <div className="register-input-group">
                          <label className="register-input-label">Email del Supervisor</label>
                          <input
                            type="email"
                            value={formData.profile.supervisor_email || ''}
                            onChange={(e) => handleInputChange('profile.supervisor_email', e.target.value)}
                            className="register-input-field"
                            placeholder="supervisor@universidad.edu"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Campos condicionales para profesionales */}
                  {formData.volunteerType === 'professional_intl' && (
                    <div className="register-conditional-section">
                      <h4 className="register-conditional-title">Información Profesional</h4>
                      <div className="register-form-grid">
                        <div className="register-input-group">
                          <label className="register-input-label">Área Profesional</label>
                          <input
                            type="text"
                            value={formData.professionalArea || ''}
                            onChange={(e) => handleInputChange('professionalArea', e.target.value)}
                            className="register-input-field"
                            placeholder="Ej: Desarrollo de Software, Marketing"
                          />
                        </div>
                        <div className="register-input-group">
                          <label className="register-input-label">Años de Experiencia</label>
                          <input
                            type="number"
                            value={formData.yearsExperience || ''}
                            onChange={(e) => handleInputChange('yearsExperience', parseInt(e.target.value) || 0)}
                            className="register-input-field"
                            placeholder="0"
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enlaces Profesionales */}
                  <div className="register-input-group">
                    <h4 className="register-section-title">Enlaces Profesionales (Opcional)</h4>
                    <div className="register-form-grid">
                      <div className="register-input-group">
                        <label className="register-input-label">LinkedIn</label>
                        <div className="register-input-wrapper">
                          <Linkedin className="register-input-icon" />
                          <input
                            type="url"
                            value={formData.profile.linkedin || ''}
                            onChange={(e) => handleInputChange('profile.linkedin', e.target.value)}
                            className="register-input-field"
                            placeholder="https://linkedin.com/in/tu-perfil"
                          />
                        </div>
                      </div>
                      <div className="register-input-group">
                        <label className="register-input-label">GitHub</label>
                        <div className="register-input-wrapper">
                          <Github className="register-input-icon" />
                          <input
                            type="url"
                            value={formData.profile.github || ''}
                            onChange={(e) => handleInputChange('profile.github', e.target.value)}
                            className="register-input-field"
                            placeholder="https://github.com/tu-usuario"
                          />
                        </div>
                      </div>
                      <div className="register-input-group register-form-full-width">
                        <label className="register-input-label">Portfolio</label>
                        <div className="register-input-wrapper">
                          <Globe className="register-input-icon" />
                          <input
                            type="url"
                            value={formData.profile.portfolio || ''}
                            onChange={(e) => handleInputChange('profile.portfolio', e.target.value)}
                            className="register-input-field"
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
                <div className="content-enter">
                  <div className="register-step-header">
                    <h3 className="register-step-content-title">Tu Disponibilidad</h3>
                    <p className="register-step-content-description">Define cuándo puedes colaborar</p>
                  </div>

                  <div className="register-form-grid">
                    <div className="register-input-group">
                      <label className="register-input-label">Horas por semana *</label>
                      <select
                        value={formData.profile.hours_per_week}
                        onChange={(e) => handleInputChange('profile.hours_per_week', parseInt(e.target.value) as 10 | 20)}
                        className="register-select-field"
                        disabled={isLoading}
                      >
                        <option value={10}>10 horas semanales</option>
                        <option value={20}>20 horas semanales</option>
                      </select>
                    </div>

                    <div className="register-input-group">
                      <label className="register-input-label">Horario Preferido *</label>
                      <select
                        value={formData.profile.preferred_hours}
                        onChange={(e) => handleInputChange('profile.preferred_hours', e.target.value)}
                        className="register-select-field"
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

                  <div className="register-input-group">
                    <label className="register-input-label">Días Preferidos</label>
                    <div className="register-days-grid">
                      {daysOfWeek.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => togglePreferredDay(day)}
                          className={`register-day-button ${
                            formData.profile.preferred_days.includes(day) ? 'selected' : 'unselected'
                          }`}
                          disabled={isLoading}
                        >
                          <div className="register-day-abbr">{day.substring(0, 3)}</div>
                        </button>
                      ))}
                    </div>
                    <p className="register-step-content-description">
                      Selecciona los días que prefieres trabajar (opcional)
                    </p>
                  </div>

                  <div className="register-input-group">
                    <label className="register-input-label">Zona Horaria</label>
                    <input
                      type="text"
                      value={formData.profile.timezone}
                      className="register-input-field"
                      disabled
                    />
                    <p className="register-step-content-description">
                      Detectada automáticamente según tu país
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Habilidades */}
              {currentStep === 4 && (
                <div className="content-enter">
                  <div className="register-step-header">
                    <h3 className="register-step-content-title">Habilidades e Idiomas</h3>
                    <p className="register-step-content-description">Comparte tus conocimientos y capacidades</p>
                  </div>

                  {/* Habilidades */}
                  <div>
                    <div className="register-section-header">
                      <h4 className="register-section-title">
                        <Award className="w-5 h-5" />
                        Habilidades Técnicas
                      </h4>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="register-add-button"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div>
                      {formData.profile.skills.map((skill, index) => (
                        <div key={index} className="register-skill-item">
                          <div className="register-skill-grid">
                            <div className="register-input-group">
                              <label className="register-input-label">Habilidad</label>
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                                className="register-input-field"
                                placeholder="Ej: React, Python, Photoshop"
                              />
                            </div>
                            <div className="register-input-group">
                              <label className="register-input-label">Nivel</label>
                              <select
                                value={skill.level}
                                onChange={(e) => updateSkill(index, 'level', e.target.value as any)}
                                className="register-select-field"
                              >
                                {skillLevels.map(level => (
                                  <option key={level.value} value={level.value}>
                                    {level.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="register-input-group">
                              <label className="register-input-label">Categoría</label>
                              <select
                                value={skill.category}
                                onChange={(e) => updateSkill(index, 'category', e.target.value as any)}
                                className="register-select-field"
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
                                className="register-remove-button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {formData.profile.skills.length === 0 && (
                      <div className="register-empty-state">
                        <Award className="register-empty-icon" />
                        <p className="register-empty-title">No hay habilidades agregadas</p>
                        <p className="register-empty-description">Haz clic en "Agregar" para comenzar</p>
                      </div>
                    )}
                  </div>

                  {/* Idiomas */}
                  <div>
                    <div className="register-section-header">
                      <h4 className="register-section-title">
                        <Languages className="w-5 h-5" />
                        Idiomas
                      </h4>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="register-add-button"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div>
                      {formData.profile.languages.map((language, index) => (
                        <div key={index} className="register-language-item">
                          <div className="register-language-grid">
                            <div className="register-input-group">
                              <label className="register-input-label">Idioma</label>
                              <input
                                type="text"
                                value={language.name}
                                onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                                className="register-input-field"
                                placeholder="Ej: Español, Inglés, Francés"
                              />
                            </div>
                            <div className="register-input-group">
                              <label className="register-input-label">Nivel</label>
                              <select
                                value={language.level}
                                onChange={(e) => updateLanguage(index, 'level', e.target.value as any)}
                                className="register-select-field"
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
                                className="register-remove-button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {formData.profile.languages.length === 0 && (
                      <div className="register-empty-state">
                        <Languages className="register-empty-icon" />
                        <p className="register-empty-title">No hay idiomas agregados</p>
                        <p className="register-empty-description">Haz clic en "Agregar" para comenzar</p>
                      </div>
                    )}
                  </div>

                  {/* Certificaciones */}
                  <div>
                    <div className="register-section-header">
                      <h4 className="register-section-title">Certificaciones (Opcional)</h4>
                      <button
                        type="button"
                        onClick={addCertification}
                        className="register-add-button"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agregar</span>
                      </button>
                    </div>

                    <div>
                      {formData.profile.certifications.map((cert, index) => (
                        <div key={index} className="register-certification-item">
                          <input
                            type="text"
                            value={cert}
                            onChange={(e) => updateCertification(index, e.target.value)}
                            className="register-input-field"
                            placeholder="Nombre de la certificación"
                          />
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="register-certification-remove"
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
                <div className="content-enter">
                  <div className="register-step-header">
                    <h3 className="register-step-content-title">¡Casi Terminamos!</h3>
                    <p className="register-step-content-description">Revisa tu información y acepta los términos</p>
                  </div>

                  {/* Resumen */}
                  <div className="register-summary">
                    <h4 className="register-summary-title">
                      <User className="w-5 h-5" />
                      Resumen de tu Perfil
                    </h4>
                    <div className="register-summary-grid">
                      <div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Nombre: </span>
                          <span className="register-summary-value">
                            {formData.profile.first_name} {formData.profile.last_name}
                          </span>
                        </div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Email: </span>
                          <span className="register-summary-value">{formData.email}</span>
                        </div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Ubicación: </span>
                          <span className="register-summary-value">
                            {formData.profile.city}, {formData.profile.country}
                          </span>
                        </div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Tipo: </span>
                          <span className="register-badge register-badge-blue">
                            {formData.volunteerType === 'regular' ? 'Voluntario Regular' :
                            formData.volunteerType === 'student_usa' ? 'Estudiante USA' :
                            formData.volunteerType === 'student_intl' ? 'Estudiante Internacional' :
                            'Profesional Internacional'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Disponibilidad: </span>
                          <span className="register-summary-value">{formData.profile.hours_per_week}h/semana</span>
                        </div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Horario: </span>
                          <span className="register-summary-value">
                            {formData.profile.preferred_hours || 'No especificado'}
                          </span>
                        </div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Habilidades: </span>
                          <span className="register-badge register-badge-green">
                            {formData.profile.skills.length} agregadas
                          </span>
                        </div>
                        <div className="register-summary-item">
                          <span className="register-summary-label">Idiomas: </span>
                          <span className="register-badge register-badge-green">
                            {formData.profile.languages.length} agregados
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="register-terms-box">
                    <div className="register-terms-wrapper">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className={`register-terms-checkbox ${errors.acceptTerms ? 'error' : ''}`}
                        disabled={isLoading}
                      />
                      <label htmlFor="terms" className="register-terms-label">
                        Acepto los{' '}
                        <a href="#" className="register-terms-link">
                          términos y condiciones
                        </a>
                        {' '}y la{' '}
                        <a href="#" className="register-terms-link">
                          política de privacidad
                        </a>
                        {' '}de Living Stones. Entiendo que mi información será utilizada para evaluar mi participación como voluntario.
                      </label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="register-alert register-alert-error" style={{ marginTop: '0.5rem', marginLeft: '2.25rem' }}>
                        {errors.acceptTerms}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="register-nav">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1 || isLoading}
                className="register-nav-button prev"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="register-nav-button next"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading || !formData.acceptTerms}
                  className="register-button-primary"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 register-spinner" />
                      <span>Creando cuenta...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Crear Cuenta</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Footer Link */}
          <div className="register-footer-link">
            <p className="register-footer-text">
              ¿Ya tienes cuenta?{' '}
              <a href="/login">Inicia sesión aquí</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="register-footer">
          <p>&copy; 2024 Living Stones. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}