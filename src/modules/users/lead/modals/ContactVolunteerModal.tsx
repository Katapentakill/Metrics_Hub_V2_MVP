// modules/users/lead/modals/ContactVolunteerModal.tsx
'use client';

import React, { useState } from 'react';
import { 
  X, 
  User, 
  MessageSquare, 
  Send,
  Mail,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { ExtendedUserWithProfile } from '@/lib/types';

interface MessageData {
  subject: string;
  message: string;
  contactMethod: 'email' | 'platform';
  priority: 'low' | 'normal' | 'high';
}

interface ContactVolunteerModalProps {
  user: ExtendedUserWithProfile;
  onClose: () => void;
  onSubmit: (messageData: MessageData) => void;
}

const ContactVolunteerModal: React.FC<ContactVolunteerModalProps> = ({ 
  user, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<MessageData>({
    subject: '',
    message: '',
    contactMethod: 'platform',
    priority: 'normal'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Templates de mensajes predefinidos
  const messageTemplates = [
    {
      id: 'introduction',
      title: 'Presentación e Interés',
      subject: 'Hola! Me interesa conocer tu experiencia',
      message: `Hola ${user.name},

Espero que estés bien. Soy líder de proyecto en Living Stones Foundation y me gustaría conocer más sobre tu experiencia y habilidades.

He visto tu perfil y creo que podrías ser una gran adición a nuestro equipo en futuros proyectos.

¿Te interesaría tener una conversación para conocernos mejor?

Saludos cordiales,`
    },
    {
      id: 'collaboration',
      title: 'Propuesta de Colaboración',
      subject: 'Oportunidad de colaboración en proyecto social',
      message: `Hola ${user.name},

Me pongo en contacto contigo porque tengo una propuesta de colaboración que podría interesarte.

Estamos trabajando en un proyecto que podría beneficiarse mucho de tus habilidades, especialmente en ${user.profile?.skills?.[0]?.name || 'tu área de expertise'}.

¿Podrías dedicar unos minutos para que te cuente más detalles?

Quedo atento/a a tu respuesta,`
    },
    {
      id: 'consultation',
      title: 'Consulta Técnica',
      subject: 'Consulta sobre tu experiencia técnica',
      message: `Hola ${user.name},

Te escribo porque tengo algunas preguntas técnicas relacionadas con ${user.profile?.skills?.[0]?.name || 'tu área de expertise'} y creo que tu experiencia podría ser muy valiosa.

¿Tendrías unos minutos para una consulta rápida? Sería de gran ayuda para nuestro proyecto actual.

Muchas gracias por tu tiempo,`
    }
  ];

  const contactMethods = [
    { 
      value: 'platform', 
      label: 'Mensajería Interna', 
      icon: MessageCircle,
      description: 'A través de la plataforma Living Stones'
    },
    { 
      value: 'email', 
      label: 'Correo Electrónico', 
      icon: Mail,
      description: user.email,
      available: true
    }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Baja', color: 'bg-gray-100 text-gray-800' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'Alta', color: 'bg-orange-100 text-orange-800' }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    }

    if (formData.message.trim().length < 20) {
      newErrors.message = 'El mensaje debe tener al menos 20 caracteres';
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
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof MessageData, value: any) => {
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

  const applyTemplate = (template: typeof messageTemplates[0]) => {
    handleInputChange('subject', template.subject);
    handleInputChange('message', template.message);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="card max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-purple-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Contactar Voluntario</h2>
              <p className="text-sm text-slate-600">
                Enviar mensaje directo a <strong>{user.name}</strong>
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
            
            {/* Información del Destinatario */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Destinatario
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
                    {user.profile?.city}, {user.profile?.country} • {user.profile?.timezone}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-slate-600">Responde típicamente:</p>
                  <p className="text-sm font-medium text-slate-800">En 24 horas</p>
                </div>
              </div>
            </div>

            {/* Templates de Mensaje */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Templates de Mensaje</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {messageTemplates.map(template => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => applyTemplate(template)}
                    className="text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <h4 className="font-medium text-slate-800 mb-1">{template.title}</h4>
                    <p className="text-sm text-slate-600 truncate">{template.subject}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Método de Contacto */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Método de Contacto
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contactMethods.map(method => {
                  const Icon = method.icon;
                  
                  return (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => handleInputChange('contactMethod', method.value)}
                      className={`p-4 border rounded-lg transition-colors ${
                        formData.contactMethod === method.value
                          ? 'border-purple-300 bg-purple-50'
                          : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-purple-600" />
                        <div className="text-left">
                          <p className="font-medium text-slate-800">{method.label}</p>
                          <p className="text-xs text-slate-500">{method.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Asunto */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Asunto *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`input-field w-full ${errors.subject ? 'input-error' : ''}`}
                placeholder="¿De qué quieres hablar?"
                maxLength={100}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.subject && (
                  <p className="text-red-600 text-xs">{errors.subject}</p>
                )}
                <p className="text-xs text-slate-500 ml-auto">
                  {formData.subject.length}/100
                </p>
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mensaje *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className={`input-field w-full resize-none ${errors.message ? 'input-error' : ''}`}
                placeholder="Escribe tu mensaje aquí..."
                maxLength={1000}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.message && (
                  <p className="text-red-600 text-xs">{errors.message}</p>
                )}
                <p className="text-xs text-slate-500 ml-auto">
                  {formData.message.length}/1000 • Mínimo 20 caracteres
                </p>
              </div>
            </div>

            {/* Prioridad */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Prioridad del Mensaje
              </label>
              <div className="flex flex-wrap gap-2">
                {priorityOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleInputChange('priority', option.value)}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
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

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-1">Consejos para un buen mensaje</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Sé específico sobre lo que necesitas o propones</li>
                    <li>• Menciona por qué elegiste a este voluntario en particular</li>
                    <li>• Incluye un poco de contexto sobre ti y tu proyecto</li>
                    <li>• Sé respetuoso con su tiempo y disponibilidad</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer con botones */}
          <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50">
            <div className="text-sm text-slate-600">
              {formData.contactMethod === 'email' && (
                <span>Se enviará a: {user.email}</span>
              )}
              {formData.contactMethod === 'platform' && (
                <span>Notificación interna + email</span>
              )}
            </div>
            <div className="flex items-center space-x-4">
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
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactVolunteerModal;