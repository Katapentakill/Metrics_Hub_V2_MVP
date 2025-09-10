// src/app/volunteer/dashboard/page.tsx
'use client';

import React from 'react';
import {
  ClipboardList,
  Mail,
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  Circle,
  User,
} from 'lucide-react';

// Datos simulados para el candidato actual
const candidateInfo = {
  name: 'María González',
  role: 'Software Developer',
  assignedTeam: 'Vitalink',
  contactPerson: 'Jane Doe',
  contactEmail: 'jane.doe@livingstones.org',
  progress: 'Interview Scheduled', // Estado actual del candidato
};

// Pasos del proceso de onboarding
const onboardingSteps = [
  'Application Received',
  'HR Review',
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Accepted by Candidate',
  'Onboard',
];

// Tareas pendientes para el candidato
const pendingTasks = [
  { id: 1, text: 'Review the Interview Guide document.', completed: false },
  { id: 2, text: 'Confirm your interview time via email.', completed: false },
  { id: 3, text: 'Prepare for your technical interview.', completed: false },
];

export default function CandidateDashboard() {
  const currentStepIndex = onboardingSteps.indexOf(candidateInfo.progress);

  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de bienvenida */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Welcome, {candidateInfo.name}!</h1>
          <p className="text-lg text-slate-500 mt-1">
            This is your personal dashboard. Here you can track your progress in the onboarding process and find important information.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna de la izquierda: Seguimiento y Tareas */}
          <div className="lg:col-span-2">
            {/* Seguimiento del Proceso */}
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Onboarding Progress</h2>
              <div className="space-y-4">
                {onboardingSteps.map((step, index) => (
                  <div key={step} className="flex items-center space-x-3">
                    {index < currentStepIndex ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : index === currentStepIndex ? (
                      <Clock size={20} className="text-blue-500" />
                    ) : (
                      <Circle size={20} className="text-slate-300" />
                    )}
                    <span
                      className={`font-medium ${
                        index === currentStepIndex
                          ? 'text-blue-700'
                          : index < currentStepIndex
                          ? 'text-green-700'
                          : 'text-slate-500'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tareas Pendientes */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h2>
              <ul className="space-y-3">
                {pendingTasks.map(task => (
                  <li key={task.id} className="flex items-center space-x-3">
                    <CheckCircle
                      size={20}
                      className={task.completed ? 'text-green-500' : 'text-slate-300'}
                    />
                    <span className={`text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna de la derecha: Información de Contacto */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Your Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Briefcase size={20} className="text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Applied Role</p>
                    <p className="text-lg font-semibold text-slate-800">{candidateInfo.role}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users size={20} className="text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Assigned Team</p>
                    <p className="text-lg font-semibold text-slate-800">{candidateInfo.assignedTeam}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <User size={20} className="text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Your Contact</p>
                    <p className="text-lg font-semibold text-slate-800">{candidateInfo.contactPerson}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail size={20} className="text-slate-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-600">Contact Email</p>
                    <p className="text-lg font-semibold text-slate-800">{candidateInfo.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos */}
            <div className="card p-6 mt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Documents</h2>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText size={20} className="text-slate-500" />
                    <span className="text-sm text-slate-700">Interview Guide</span>
                  </div>
                  <a href="#" className="text-blue-600 hover:underline text-sm">Download</a>
                </li>
                <li className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText size={20} className="text-slate-500" />
                    <span className="text-sm text-slate-700">Volunteer Agreement</span>
                  </div>
                  <a href="#" className="text-blue-600 hover:underline text-sm">Download</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}