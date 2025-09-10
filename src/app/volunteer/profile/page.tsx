//src/app/volunteer/profile/page.tsx
// src/app/volunteer/profile/page.tsx
'use client';

import React from 'react';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Users,
  Clock,
  Calendar,
  MapPin,
  FileText,
} from 'lucide-react';

// Datos simulados para el perfil del voluntario
const volunteerProfile = {
  name: 'María González',
  email: 'maria.gonzalez@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Software Developer',
  team: 'Vitalink',
  supervisor: 'Jane Doe',
  hrsPerWk: 15,
  startDate: '2025-09-01',
  location: 'Remote',
  bio: 'Volunteer with a passion for web development and open-source projects. Eager to contribute to the team and learn new technologies.',
};

export default function VolunteerProfile() {
  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Encabezado del perfil */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center">
            <User size={48} className="text-slate-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{volunteerProfile.name}</h1>
            <p className="text-lg text-slate-500 mt-1">{volunteerProfile.role}</p>
          </div>
        </div>

        {/* Información personal y de la organización */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tarjeta de Contacto Personal */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <User size={20} />
              <span>Personal Information</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-slate-500" />
                <span>{volunteerProfile.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-slate-500" />
                <span>{volunteerProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-slate-500" />
                <span>{volunteerProfile.location}</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Información de la Organización */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
              <Briefcase size={20} />
              <span>Organizational Information</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center space-x-3">
                <Users size={16} className="text-slate-500" />
                <span>Team: <span className="font-semibold text-slate-800">{volunteerProfile.team}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <User size={16} className="text-slate-500" />
                <span>Supervisor: <span className="font-semibold text-slate-800">{volunteerProfile.supervisor}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={16} className="text-slate-500" />
                <span>Hours/Week: <span className="font-semibold text-slate-800">{volunteerProfile.hrsPerWk}</span></span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar size={16} className="text-slate-500" />
                <span>Start Date: <span className="font-semibold text-slate-800">{volunteerProfile.startDate}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Biografía */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center space-x-2">
            <FileText size={20} />
            <span>Biography</span>
          </h2>
          <p className="text-sm text-slate-600">{volunteerProfile.bio}</p>
        </div>
      </div>
    </main>
  );
}