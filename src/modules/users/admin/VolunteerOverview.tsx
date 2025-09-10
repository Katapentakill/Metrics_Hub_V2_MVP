// src/modules/users/admin/VolunteerOverview.tsx
'use client';

import React, { useState } from 'react';
import {
  Mail,
  Users,
  Briefcase,
  FileText,
  Clock,
  Plus,
  Minus,
  Search,
} from 'lucide-react';
import { getMockVolunteers, MockVolunteer } from '@/lib/data/mockVolunteerData';

// Genera los datos una sola vez
const initialVolunteers = getMockVolunteers(30);

// Opciones para los filtros (la fuente de datos sigue siendo la misma)
const allStatuses = ['Active', 'On leave', 'Inactive', 'Finalized'];
const allVolunteerTypes = ['Regular', 'CPT', 'OPT'];
const allTeams = [
  'Genesis',
  'Vitalink',
  'Vitalink, Volunteer Metrics',
  'Brand & Design',
  'Cultive Connect',
  'Global Affairs Office',
  'Cultive Connect, Genesis',
  'Human Resources',
  'Green Verde',
  'English Program',
  'Finance',
  'Volunteer Metrics',
];

// Colores para los estados
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-700';
    case 'On leave':
      return 'bg-yellow-100 text-yellow-700';
    case 'Inactive':
      return 'bg-red-100 text-red-700';
    case 'Finalized':
      return 'bg-gray-100 text-gray-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function VolunteerOverview() {
  const [volunteers] = useState<MockVolunteer[]>(initialVolunteers);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterTeam, setFilterTeam] = useState<string>('All');

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || volunteer.status === filterStatus;
    const matchesType = filterType === 'All' || volunteer.volunteerType === filterType;
    const matchesTeam = filterTeam === 'All' || volunteer.team === filterTeam;
    return matchesSearch && matchesStatus && matchesType && matchesTeam;
  });

  if (volunteers.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-slate-500">
          No hay voluntarios para mostrar.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Voluntarios (Vista Admin)</h1>

      {/* Sección de filtros y búsqueda mejorada */}
      <div className="bg-slate-100 rounded-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="w-full h-10 pl-10 pr-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-slate-500 transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        
        <div className="w-full md:w-1/4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full h-10 px-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">Todos los estados</option>
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4">
          <select
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="w-full h-10 px-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">Todos los equipos</option>
            {allTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full h-10 px-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700"
          >
            <option value="All">Todos los tipos</option>
            {allVolunteerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Volunteer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Volunteer Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredVolunteers.map((volunteer) => (
                <React.Fragment key={volunteer.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleExpand(volunteer.id)}
                          className="mr-2 text-slate-400 hover:text-slate-600"
                        >
                          {expanded.includes(volunteer.id) ? (
                            <Minus size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
                        </button>
                        <span>{volunteer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(volunteer.status)}`}>
                        {volunteer.status || 'Sin Asignar'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="text-sm text-slate-700">{volunteer.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="text-sm text-slate-700">{volunteer.team}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <span className="text-sm text-slate-700">{volunteer.volunteerType || 'Sin Asignar'}</span>
                    </td>
                  </tr>
                  {expanded.includes(volunteer.id) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-slate-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-slate-600">
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800"> Personal Contact</p>
                            <div className="flex items-center space-x-2">
                              <Mail size={16} />
                              <span className="text-slate-700 w-full">{volunteer.personalEmail}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Duration</p>
                            <div className="flex items-center space-x-2">
                              <Clock size={16} />
                              <span>Hours/Week: {volunteer.hrsPerWk}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Briefcase size={16} />
                              <span>Duration: {volunteer.duration} months</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText size={16} />
                              <span>Start: {volunteer.startDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <FileText size={16} />
                              <span>End: {volunteer.endDate}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-slate-800">Details</p>
                            <div className="flex items-center space-x-2">
                              <Users size={16} />
                              <span>Supervisor: {volunteer.supervisor}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}