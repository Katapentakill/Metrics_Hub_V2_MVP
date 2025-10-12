// 📁 src/modules/evaluations/shared/modals/NewEvaluationModal.tsx
// Modal compartido para crear nuevas evaluaciones con integración de proyectos

"use client";

import React, { useState } from 'react';
import { X, Save, Users, Calendar, Star, Target, Briefcase, UserPlus } from 'lucide-react';
import type { ExtendedUserWithProfile } from '@/lib/types';
import type { EvaluationPeriod, EvaluationType, EvaluationFormData } from '@/lib/types/evaluations';

interface NewEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EvaluationFormData) => void;
  allUsers: ExtendedUserWithProfile[];
  allPeriods: EvaluationPeriod[];
  // Props para integración con proyectos (futuro)
  projects?: Array<{
    id: string;
    name: string;
    team_members: string[];
    lead_id: string;
  }>;
}

export default function NewEvaluationModal({
  isOpen,
  onClose,
  onSave,
  allUsers,
  allPeriods,
  projects = []
}: NewEvaluationModalProps) {
  const [formData, setFormData] = useState<EvaluationFormData>({
    type: 'performance',
    evaluated_user_id: '',
    evaluator_id: '',
    period_id: '',
    due_date: '',
    criteria_scores: {},
    feedback_text: '',
    strengths: '',
    improvement_areas: '',
    achievements: '',
    challenges: '',
    goals_next_period: '',
    recommended_training: ''
  });

  const [selectedProject, setSelectedProject] = useState<string>('');
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'basic' | 'details' | 'assignment'>('basic');

  const evaluationTypes: { value: EvaluationType; label: string; icon: React.ReactNode }[] = [
    { value: 'performance', label: 'Evaluación de Desempeño', icon: <Target className="w-5 h-5" /> },
    { value: 'peer_feedback', label: 'Feedback de Pares', icon: <Users className="w-5 h-5" /> },
    { value: 'self_evaluation', label: 'Auto-evaluación', icon: <UserPlus className="w-5 h-5" /> },
    { value: 'upward_feedback', label: 'Feedback Hacia Arriba', icon: <Star className="w-5 h-5" /> },
    { value: '360_feedback', label: 'Feedback 360°', icon: <Users className="w-5 h-5" /> }
  ];

  const validateBasicForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bulkMode && !formData.evaluated_user_id) {
      newErrors.evaluated_user_id = 'Debe seleccionar un usuario a evaluar';
    }

    if (bulkMode && selectedTeamMembers.length === 0) {
      newErrors.team_members = 'Debe seleccionar al menos un miembro del equipo';
    }

    if (!formData.evaluator_id) {
      newErrors.evaluator_id = 'Debe seleccionar un evaluador';
    }

    if (!formData.period_id) {
      newErrors.period_id = 'Debe seleccionar un período';
    }

    if (!formData.due_date) {
      newErrors.due_date = 'Debe establecer una fecha límite';
    }

    if (!bulkMode && formData.evaluated_user_id === formData.evaluator_id) {
      newErrors.evaluator_id = 'El evaluador no puede ser la misma persona que el evaluado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'basic' && validateBasicForm()) {
      setStep('details');
    } else if (step === 'details') {
      setStep('assignment');
    }
  };

  const handleSubmit = () => {
    if (bulkMode) {
      // Crear múltiples evaluaciones para el equipo
      selectedTeamMembers.forEach(memberId => {
        const evaluationData = {
          ...formData,
          evaluated_user_id: memberId
        };
        onSave(evaluationData);
      });
    } else {
      onSave(formData);
    }
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      type: 'performance',
      evaluated_user_id: '',
      evaluator_id: '',
      period_id: '',
      due_date: '',
      criteria_scores: {},
      feedback_text: '',
      strengths: '',
      improvement_areas: '',
      achievements: '',
      challenges: '',
      goals_next_period: '',
      recommended_training: ''
    });
    setSelectedProject('');
    setBulkMode(false);
    setSelectedTeamMembers([]);
    setErrors({});
    setStep('basic');
    onClose();
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    const project = projects.find(p => p.id === projectId);
    if (project) {
      // Auto-seleccionar al líder como evaluador
      setFormData(prev => ({ ...prev, evaluator_id: project.lead_id }));
      // En modo bulk, preseleccionar todos los miembros del equipo
      if (bulkMode) {
        setSelectedTeamMembers(project.team_members);
      }
    }
  };

  const toggleTeamMember = (memberId: string) => {
    setSelectedTeamMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Nueva Evaluación</h2>
              <p className="text-emerald-100 mt-1">
                {step === 'basic' ? 'Información básica' : 
                 step === 'details' ? 'Detalles de la evaluación' : 
                 'Asignación y confirmación'}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-emerald-200 hover:text-white transition-colors p-2 rounded-lg hover:bg-emerald-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stepper */}
          <div className="mt-6 flex items-center space-x-4">
            {['basic', 'details', 'assignment'].map((s, index) => (
              <React.Fragment key={s}>
                <div className={`flex items-center space-x-2 ${
                  step === s ? 'text-white' : 
                  ['basic', 'details', 'assignment'].indexOf(step) > index ? 'text-emerald-200' : 'text-emerald-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    step === s ? 'border-white bg-white text-emerald-600' :
                    ['basic', 'details', 'assignment'].indexOf(step) > index ? 'border-emerald-200 bg-emerald-200 text-emerald-700' :
                    'border-emerald-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">
                    {s === 'basic' ? 'Básico' : s === 'details' ? 'Detalles' : 'Asignación'}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-12 h-0.5 ${
                    ['basic', 'details', 'assignment'].indexOf(step) > index ? 'bg-emerald-200' : 'bg-emerald-400'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {step === 'basic' && (
            <div className="space-y-6">
              {/* Modo de Evaluación */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <div>
                      <label className="text-sm font-medium text-blue-800">
                        Evaluación por Equipo de Proyecto
                      </label>
                      <p className="text-xs text-blue-600">
                        Crear evaluaciones para todo un equipo de proyecto
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bulkMode}
                      onChange={(e) => setBulkMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              {/* Selección de Proyecto (si está en modo bulk) */}
              {bulkMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proyecto *
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => handleProjectChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar proyecto...</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name} ({project.team_members.length} miembros)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Tipo de Evaluación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Evaluación
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evaluationTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                        formData.type === type.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="evaluationType"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as EvaluationType }))}
                        className="sr-only"
                      />
                      <div className="flex w-full items-center">
                        <div className={`mr-3 ${formData.type === type.value ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {type.icon}
                        </div>
                        <div className="text-sm font-medium text-gray-900">{type.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Grid de campos básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Usuario a Evaluar o Equipo */}
                {!bulkMode ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usuario a Evaluar *
                    </label>
                    <select
                      value={formData.evaluated_user_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, evaluated_user_id: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.evaluated_user_id ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccionar usuario...</option>
                      {allUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} - {user.email}
                        </option>
                      ))}
                    </select>
                    {errors.evaluated_user_id && (
                      <p className="mt-1 text-sm text-red-600">{errors.evaluated_user_id}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Miembros del Equipo ({selectedTeamMembers.length} seleccionados)
                    </label>
                    <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                      {selectedProject && projects.find(p => p.id === selectedProject)?.team_members.map(memberId => {
                        const user = allUsers.find(u => u.id === memberId);
                        return user ? (
                          <label key={user.id} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedTeamMembers.includes(user.id)}
                              onChange={() => toggleTeamMember(user.id)}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="text-sm">{user.name}</span>
                          </label>
                        ) : null;
                      })}
                    </div>
                    {errors.team_members && (
                      <p className="mt-1 text-sm text-red-600">{errors.team_members}</p>
                    )}
                  </div>
                )}

                {/* Evaluador */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Evaluador *
                  </label>
                  <select
                    value={formData.evaluator_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, evaluator_id: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.evaluator_id ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccionar evaluador...</option>
                    {allUsers.filter(user => ['admin', 'hr', 'lead'].includes(user.role)).map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.role === 'admin' ? 'Admin' : user.role === 'hr' ? 'HR' : 'Líder'}
                      </option>
                    ))}
                  </select>
                  {errors.evaluator_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.evaluator_id}</p>
                  )}
                </div>

                {/* Período */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Período *
                  </label>
                  <select
                    value={formData.period_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, period_id: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.period_id ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Seleccionar período...</option>
                    {allPeriods.map((period) => (
                      <option key={period.id} value={period.id}>
                        {period.name}
                      </option>
                    ))}
                  </select>
                  {errors.period_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.period_id}</p>
                  )}
                </div>

                {/* Fecha Límite */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha Límite *
                  </label>
                  <input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      errors.due_date ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.due_date && (
                    <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              {/* Feedback General */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentarios Iniciales
                </label>
                <textarea
                  value={formData.feedback_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, feedback_text: e.target.value }))}
                  placeholder="Comentarios o instrucciones iniciales para esta evaluación..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Objetivos para el próximo período */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivos Esperados
                </label>
                <textarea
                  value={formData.goals_next_period}
                  onChange={(e) => setFormData(prev => ({ ...prev, goals_next_period: e.target.value }))}
                  placeholder="Define los objetivos que se espera evaluar..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {step === 'assignment' && (
            <div className="space-y-6">
              {/* Resumen de la evaluación */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de la Evaluación</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Tipo:</span>
                    <span className="ml-2">{evaluationTypes.find(t => t.value === formData.type)?.label}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Evaluador:</span>
                    <span className="ml-2">{allUsers.find(u => u.id === formData.evaluator_id)?.name || 'No seleccionado'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Período:</span>
                    <span className="ml-2">{allPeriods.find(p => p.id === formData.period_id)?.name || 'No seleccionado'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Fecha límite:</span>
                    <span className="ml-2">{formData.due_date || 'No establecida'}</span>
                  </div>
                  {bulkMode ? (
                    <div className="md:col-span-2">
                      <span className="font-medium text-gray-600">Evaluaciones a crear:</span>
                      <span className="ml-2">{selectedTeamMembers.length} evaluaciones</span>
                      <div className="mt-2 text-xs text-gray-500">
                        {selectedTeamMembers.map(id => allUsers.find(u => u.id === id)?.name).join(', ')}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="font-medium text-gray-600">Usuario a evaluar:</span>
                      <span className="ml-2">{allUsers.find(u => u.id === formData.evaluated_user_id)?.name || 'No seleccionado'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmación */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="text-sm">
                    <h4 className="font-medium text-emerald-800 mb-1">¿Crear evaluación?</h4>
                    <p className="text-emerald-700">
                      {bulkMode 
                        ? `Se crearán ${selectedTeamMembers.length} evaluaciones para el proyecto seleccionado.`
                        : 'Se creará una nueva evaluación con la información proporcionada.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <button
            type="button"
            onClick={step === 'basic' ? handleClose : () => setStep(step === 'assignment' ? 'details' : 'basic')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {step === 'basic' ? 'Cancelar' : 'Anterior'}
          </button>
          
          <div className="flex items-center space-x-3">
            {step !== 'assignment' ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Siguiente
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{bulkMode ? `Crear ${selectedTeamMembers.length} Evaluaciones` : 'Crear Evaluación'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
