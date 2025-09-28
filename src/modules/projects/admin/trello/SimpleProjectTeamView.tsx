// UBICACIÓN: src/modules/projects/admin/trello/SimpleProjectTeamView.tsx
// Vista simple del equipo del proyecto - solo miembros

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Eye, 
  Mail, 
  MapPin,
  Star,
  Plus
} from 'lucide-react';
import type { ExtendedUserWithProfile } from '@/lib/types';

interface SimpleProjectTeamViewProps {
  projectMembers: ExtendedUserWithProfile[];
  projectLead?: ExtendedUserWithProfile;
  maxTeamSize: number;
}

export default function SimpleProjectTeamView({ 
  projectMembers, 
  projectLead,
  maxTeamSize 
}: SimpleProjectTeamViewProps) {
  const router = useRouter();

  // Navegar al perfil del usuario
  const handleViewUser = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'hr': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lead': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'volunteer': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'hr': return 'HR';
      case 'lead': return 'Líder';
      case 'volunteer': return 'Voluntario';
      default: return role;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const totalMembers = (projectLead ? 1 : 0) + projectMembers.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <Users className="w-5 h-5 mr-2 text-emerald-600" />
            Equipo del Proyecto
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {totalMembers} de {maxTeamSize} miembros
          </p>
        </div>
        
        <button className="btn-living flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Añadir Miembro</span>
        </button>
      </div>

      {/* Miembros del equipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Líder del proyecto */}
        {projectLead && (
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 relative">
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-1 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                <Star className="w-3 h-3" />
                <span>Líder</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getInitials(projectLead.name)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-lg">{projectLead.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(projectLead.role)}`}>
                    {getRoleLabel(projectLead.role)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{projectLead.email}</span>
              </div>
              {projectLead.profile?.country && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{projectLead.profile.city ? `${projectLead.profile.city}, ` : ''}{projectLead.profile.country}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleViewUser(projectLead.id)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Perfil</span>
              </button>
              <button className="p-2 bg-white hover:bg-gray-50 text-emerald-600 rounded-lg border border-emerald-200 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Miembros del equipo */}
        {projectMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {getInitials(member.name)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-lg">{member.name}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                    {getRoleLabel(member.role)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{member.email}</span>
              </div>
              {member.profile?.country && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{member.profile.city ? `${member.profile.city}, ` : ''}{member.profile.country}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleViewUser(member.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Perfil</span>
              </button>
              <button className="p-2 bg-gray-50 hover:bg-gray-100 text-blue-600 rounded-lg border border-blue-200 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Slot vacío para agregar miembro */}
        {totalMembers < maxTeamSize && (
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 cursor-pointer flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-600 mb-2">Agregar Miembro</h4>
              <p className="text-sm text-gray-500">
                {maxTeamSize - totalMembers} espacios disponibles
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas simples del equipo */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Resumen del Equipo</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalMembers}</div>
            <div className="text-sm text-gray-600">Miembros Actuales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{maxTeamSize - totalMembers}</div>
            <div className="text-sm text-gray-600">Espacios Disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round((totalMembers / maxTeamSize) * 100)}%</div>
            <div className="text-sm text-gray-600">Capacidad Ocupada</div>
          </div>
        </div>
      </div>
    </div>
  );
}