// modules/users/lead/modals/RequestVolunteerModal.tsx
'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  Send,
  Clock,
  Calendar,
  Target,
  AlertCircle
} from 'lucide-react';
import { ExtendedUserWithProfile } from '@/lib/types';

interface RequestData {
  projectName: string;
  roleNeeded: string;
  timeCommitment: string;
  duration: string;
  startDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  message: string;
}

interface RequestVolunteerModalProps {
  user: ExtendedUserWithProfile;
  onClose: () => void;
  onSubmit: (requestData: RequestData) => void;
}

const RequestVolunteerModal: React.FC<RequestVolunteerModalProps> = ({ 
  user, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<RequestData>({
    projectName: '',
    roleNeeded: '',
    timeCommitment: '',
    duration: '',
    startDate: '',
    priority: 'medium',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorityOptions = [
    { value: 'low', label: 'Baja', color: 'bg-gray-100 text-gray-800' },
    { value: 'medium', label: 'Media', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgente', color: 'bg-red-100 text-red-800' }
  ];

  const timeCommitmentOptions = [
    '5-10 horas/semana',
    '10-15 horas/semana',
    '15-20 horas/semana',
    '20+ horas/semana',
    'Flexible según disponibilidad'
  ];

  const durationOptions = [
    '1-2 meses',
    '3-6 meses',
    '6-12 meses',
    'Más de 1 año',
    'Proyecto puntual'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'El nombre del proyecto es requerido';
    }

    if (!formData.roleNeeded.trim()) {
      newErrors.roleNeeded = 'El rol solicitado es requerido';
    }

    if (!formData.timeCommitment) {
      newErrors.timeCommitment = 'Especifica el tiempo de compromiso';
    }

    if (!formData.duration) {
      newErrors.duration = 'Especifica la duración del proyecto';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La fecha de inicio es requerida';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Un mensaje personalizado es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit(formData);
    } catch (error) {
      console.error('Error sending request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof RequestData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Solicitar Voluntario</h2>
              <p className="text-sm text-slate-600">
                Solicitar a <strong>{user.name}</strong> para un proyecto
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Información del Voluntario */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Voluntario Seleccionado
              </h3>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                  <p className="text-xs text-slate-400">
                    Disponibilidad: {user.profile?.hours_per_week}h/semana • {user.profile?.timezone}
                  </p>
                </div>
              </div>
            </div>

            {/* Información del Proyecto */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className={`input-field w-full ${errors.projectName ? 'input-error' : ''}`}
                  placeholder="Ej: Plataforma de Donaciones Online"
                />
                {errors.projectName && (
                  <p className="text-red-600 text-xs mt-1">{errors.projectName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rol Solicitado *
                </label>
                <input
                  type="text"
                  value={formData.roleNeeded}
                  onChange={(e) => handleInputChange('roleNeeded', e.target.value)}
                  className={`input-field w-full ${errors.roleNeeded ? 'input-error' : ''}`}
                  placeholder="Ej: Frontend Developer, Designer, etc."
                />
                {errors.roleNeeded && (
                  <p className="text-red-600 text-xs mt-1">{errors.roleNeeded}</p>
                )}
              </div>
            </div>

            {/* Tiempo y Duración */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Tiempo Requerido *
                </label>
                <select
                  value={formData.timeCommitment}
                  onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                  className={`input-field w-full ${errors.timeCommitment ? 'input-error' : ''}`}
                >
                  <option value="">Seleccionar tiempo</option>
                  {timeCommitmentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.timeCommitment && (
                  <p className="text-red-600 text-xs mt-1">{errors.timeCommitment}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Duración *
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className={`input-field w-full ${errors.duration ? 'input-error' : ''}`}
                >
                  <option value="">Seleccionar duración</option>
                  {durationOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.duration && (
                  <p className="text-red-600 text-xs mt-1">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className={`input-field w-full ${errors.startDate ? 'input-error' : ''}`}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.startDate && (
                  <p className="text-red-600 text-xs mt-1">{errors.startDate}</p>
                )}
              </div>
            </div>

            {/* Prioridad */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Prioridad del Proyecto
              </label>
              <div className="flex flex-wrap gap-3">
                {priorityOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('priority', option.value)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      formData.priority === option.value
                        ? `${option.color} border-current`
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mensaje para el Voluntario *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className={`input-field w-full resize-none ${errors.message ? 'input-error' : ''}`}
                placeholder="Describe el proyecto, por qué elegiste a este voluntario y cualquier información adicional relevante..."
              />
              {errors.message && (
                <p className="text-red-600 text-xs mt-1">{errors.message}</p>
              )}
            </div>
          </div>

          {/* Footer con botones */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-living flex items-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner w-4 h-4"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestVolunteerModal;