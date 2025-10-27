// src/modules/volunteer/applications/VolunteerApplicationForm.tsx
'use client';

import { JobOpening, VolunteerApplicationData } from '@/lib/types';
import { useState } from 'react';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface VolunteerApplicationFormProps {
  job: JobOpening;
  onClose?: () => void;
}

export default function VolunteerApplicationForm({
  job,
  onClose,
}: VolunteerApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VolunteerApplicationData>({
    coverLetter: '',
    motivations: [],
    availabilityDetails: {
      startDate: '',
      endDate: '',
      hoursPerWeek: job.hoursPerWeek || 10,
      timezone: 'America/New_York',
    },
    relevantExperience: '',
    whyYouAreFit: '',
    additionalInfo: '',
  });

  const [currentMotivation, setCurrentMotivation] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('availability.')) {
      const key = name.replace('availability.', '');
      setFormData({
        ...formData,
        availabilityDetails: {
          ...formData.availabilityDetails,
          [key]: key === 'hoursPerWeek' ? parseInt(value) : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addMotivation = () => {
    if (currentMotivation.trim()) {
      setFormData({
        ...formData,
        motivations: [...formData.motivations, currentMotivation],
      });
      setCurrentMotivation('');
    }
  };

  const removeMotivation = (index: number) => {
    setFormData({
      ...formData,
      motivations: formData.motivations.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos requeridos estén completos
    if (!formData.coverLetter.trim()) {
      alert('Por favor completa la carta de presentación');
      return;
    }

    if (!formData.availabilityDetails.startDate) {
      alert('Por favor especifica una fecha de inicio');
      return;
    }

    if (!formData.relevantExperience.trim()) {
      alert('Por favor describe tu experiencia relevante');
      return;
    }

    if (!formData.whyYouAreFit.trim()) {
      alert('Por favor explica por qué te ajustas a esta posición');
      return;
    }

    setIsSubmitting(true);

    // Simular envío de formulario
    setTimeout(() => {
      console.log('Aplicación enviada:', {
        jobId: job.id,
        applicantRole: 'volunteer',
        ...formData,
      });

      // Aquí irá el envío real a la API
      alert('¡Tu aplicación ha sido enviada exitosamente!');
      setIsSubmitting(false);
      onClose?.();
    }, 1000);
  };

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'America/Mexico_City',
    'America/Bogota',
    'America/Lima',
    'America/Santiago',
    'America/Buenos_Aires',
    'America/Sao_Paulo',
    'Europe/London',
    'Europe/Paris',
    'Europe/Madrid',
    'Europe/Berlin',
  ];

  const getProgressPercentage = () => {
    const totalSteps = 3;
    return (step / totalSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Aplicación para voluntario
            </h1>
            <p className="text-gray-600 text-sm mt-1">{job.title}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Paso {step} de 3
            </span>
            <span className="text-sm font-medium text-gray-500">
              {getProgressPercentage().toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Motivación y Carta */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Cuéntanos tu motivación
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Por qué te interesa esta posición?
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Comparte tu carta de presentación y por qué quieres unirte a nuestro equipo..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Puntos clave de tu motivación
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentMotivation}
                      onChange={(e) => setCurrentMotivation(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addMotivation();
                        }
                      }}
                      placeholder="Añade un punto de motivación..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={addMotivation}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors"
                    >
                      Añadir
                    </button>
                  </div>

                  {formData.motivations.length > 0 && (
                    <div className="space-y-2">
                      {formData.motivations.map((motivation, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200"
                        >
                          <span className="text-sm text-gray-700">
                            {motivation}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeMotivation(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Disponibilidad y Experiencia */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Tu disponibilidad
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de inicio
                    </label>
                    <input
                      type="date"
                      name="availability.startDate"
                      value={formData.availabilityDetails.startDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de fin (opcional)
                    </label>
                    <input
                      type="date"
                      name="availability.endDate"
                      value={formData.availabilityDetails.endDate || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horas por semana
                    </label>
                    <input
                      type="number"
                      name="availability.hoursPerWeek"
                      value={formData.availabilityDetails.hoursPerWeek}
                      onChange={handleInputChange}
                      min="1"
                      max="40"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona horaria
                    </label>
                    <select
                      name="availability.timezone"
                      value={formData.availabilityDetails.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Tu experiencia
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiencia relevante
                  </label>
                  <textarea
                    name="relevantExperience"
                    value={formData.relevantExperience}
                    onChange={handleInputChange}
                    placeholder="Describe tu experiencia relevante para este rol..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Por qué te ajustas a esta posición?
                  </label>
                  <textarea
                    name="whyYouAreFit"
                    value={formData.whyYouAreFit}
                    onChange={handleInputChange}
                    placeholder="Explica cómo tus habilidades y experiencia se alinean con los requisitos..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Información Adicional y Revisión */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Información adicional
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Hay algo más que debamos saber? (Opcional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo || ''}
                    onChange={handleInputChange}
                    placeholder="Cualquier información adicional que consideres relevante..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">¡Casi listo!</p>
                  <p>
                    Revisa tu información antes de enviar. No podrás editar después de
                    submitir la aplicación.
                  </p>
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Resumen de tu aplicación</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Puesto</p>
                    <p className="font-medium text-gray-900">{job.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Disponibilidad</p>
                    <p className="font-medium text-gray-900">
                      {formData.availabilityDetails.hoursPerWeek}h/semana desde{' '}
                      {new Date(formData.availabilityDetails.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Zona horaria</p>
                    <p className="font-medium text-gray-900">
                      {formData.availabilityDetails.timezone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Atrás
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Enviando...' : 'Enviar aplicación'}
              </button>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
