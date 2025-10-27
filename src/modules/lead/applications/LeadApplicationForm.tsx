// src/modules/lead/applications/LeadApplicationForm.tsx
'use client';

import { JobOpening, LeadApplicationData } from '@/lib/types';
import { useState } from 'react';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';

interface LeadApplicationFormProps {
  job: JobOpening;
  onClose?: () => void;
}

export default function LeadApplicationForm({
  job,
  onClose,
}: LeadApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LeadApplicationData>({
    coverLetter: '',
    motivations: [],
    projectExperience: '',
    teamManagement: '',
    whyYouAreFit: '',
    additionalInfo: '',
  });

  const [currentMotivation, setCurrentMotivation] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    // Validar campos requeridos
    if (!formData.coverLetter.trim()) {
      alert('Por favor completa la carta de presentación');
      return;
    }

    if (!formData.projectExperience.trim()) {
      alert('Por favor describe tu experiencia en proyectos');
      return;
    }

    if (!formData.teamManagement.trim()) {
      alert('Por favor describe tu experiencia en gestión de equipos');
      return;
    }

    if (!formData.whyYouAreFit.trim()) {
      alert('Por favor explica por qué te ajustas a esta posición');
      return;
    }

    setIsSubmitting(true);

    // Simular envío del formulario
    setTimeout(() => {
      console.log('Aplicación de líder enviada:', {
        jobId: job.id,
        applicantRole: 'lead',
        ...formData,
      });

      alert(
        '¡Tu aplicación como líder ha sido enviada exitosamente!'
      );
      setIsSubmitting(false);
      onClose?.();
    }, 1000);
  };

  const getProgressPercentage = () => {
    const totalSteps = 3;
    return (step / totalSteps) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6">
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
              Solicitud como Líder de Proyecto
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
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
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
                  Tu interés en liderar este proyecto
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carta de presentación
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Comparte tu visión para este proyecto y por qué te gustaría liderarlo..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
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
                      placeholder="Añade un punto..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={addMotivation}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                    >
                      Añadir
                    </button>
                  </div>

                  {formData.motivations.length > 0 && (
                    <div className="space-y-2">
                      {formData.motivations.map((motivation, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-200"
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

          {/* Step 2: Experiencia */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Tu experiencia en proyectos
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiencia en proyectos similares
                  </label>
                  <textarea
                    name="projectExperience"
                    value={formData.projectExperience}
                    onChange={handleInputChange}
                    placeholder="Describe proyectos que hayas liderado o participado, presupuestos, alcance, impacto..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experiencia en gestión de equipos
                  </label>
                  <textarea
                    name="teamManagement"
                    value={formData.teamManagement}
                    onChange={handleInputChange}
                    placeholder="Describe tu experiencia liderando equipos, tamaño del equipo, metodologías utilizadas, logros..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    rows={5}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Por qué eres apto e información adicional */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  ¿Por qué eres apto para esta posición?
                </h2>

                <div className="mb-4">
                  <textarea
                    name="whyYouAreFit"
                    value={formData.whyYouAreFit}
                    onChange={handleInputChange}
                    placeholder="Explica cómo tus habilidades se alinean específicamente con los requisitos de este rol de liderazgo..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Información adicional (Opcional)
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo || ''}
                    onChange={handleInputChange}
                    placeholder="Cualquier información adicional que consideres relevante..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    rows={4}
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">¡Casi listo!</p>
                  <p>
                    Tu aplicación como líder será revisada por nuestro equipo de recursos
                    humanos. Te notificaremos sobre el siguiente paso.
                  </p>
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Resumen de tu solicitud</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Posición</p>
                    <p className="font-medium text-gray-900">{job.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Rol</p>
                    <p className="font-medium text-gray-900">Líder de Proyecto</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Departamento</p>
                    <p className="font-medium text-gray-900">{job.department}</p>
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
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
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
