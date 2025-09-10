// src/modules/users/hr/VolunteerManagement.tsx
'use client';

import React, { useState } from 'react';
import {
  Pencil,
  Mail,
  Users,
  Briefcase,
  FileText,
  Clock,
  Plus,
  Minus,
  Trash,
} from 'lucide-react';
import { getMockVolunteers, MockVolunteer } from '@/lib/data/mockVolunteerData';

// Genera los datos una sola vez
const initialVolunteers = getMockVolunteers(30);

// Opciones predefinidas para los selectores
const allActions = ['First Call', 'Warning', 'Final Call', 'No Call'];
const allStatuses = ['Active', 'On leave', 'Inactive', 'Finalized', ''];
const allVolunteerTypes = ['Regular', 'CPT', 'OPT'];

const allRoles = [
  'Big Data Analyst',
  'Software developer',
  'Brand Designer - UI/UX Designer',
  'Project Developer',
  'Product Designer',
  'Community Manager',
  'Social Media Strategist',
  'Backend Developer',
];
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

const getActionColor = (action: string) => {
  switch (action) {
    case 'First Call':
      return 'bg-blue-100 text-blue-700';
    case 'Warning':
      return 'bg-yellow-100 text-yellow-700';
    case 'Final Call':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function VolunteerManagement() {
  const [volunteers, setVolunteers] = useState<MockVolunteer[]>(initialVolunteers);
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleFieldChange = (
    volunteerId: string,
    field: keyof MockVolunteer,
    value: any
  ) => {
    setVolunteers((prev) =>
      prev.map((v) => (v.id === volunteerId ? { ...v, [field]: value } : v))
    );
  };

  const handleAdd = () => {
    const newVolunteer = {
      id: `new-${Date.now()}`,
      name: 'New Volunteer',
      action: '',
      status: '',
      role: '',
      team: '',
      supervisor: '',
      weeksLeft: 0,
      hrsPerWk: 0,
      volunteerType: '',
      duration: 0,
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      personalEmail: '',
    };
    setVolunteers((prev) => [...prev, newVolunteer]);
    setExpanded((prev) => [...prev, newVolunteer.id]); // auto-expand
  };

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
      <h1 className="text-2xl font-bold mb-4">Gestión de Voluntarios</h1>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Volunteer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Acction
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
              {volunteers.map((volunteer) => (
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
                      <select
                        value={volunteer.action}
                        onChange={(e) => handleFieldChange(volunteer.id, 'action', e.target.value)}
                        className={`block w-full px-2 py-1 border rounded-md text-xs font-semibold ${getActionColor(volunteer.action)}`}
                      >
                        {allActions.map((action) => (
                          <option key={action} value={action}>
                            {action === '' ? 'Sin Asignar' : action}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={volunteer.status}
                        onChange={(e) => handleFieldChange(volunteer.id, 'status', e.target.value)}
                        className={`block w-full px-2 py-1 border rounded-md text-xs font-semibold ${getStatusColor(volunteer.status)}`}
                      >
                        {allStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status === '' ? 'Sin Asignar' : status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={volunteer.role}
                        onChange={(e) => handleFieldChange(volunteer.id, 'role', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {allRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={volunteer.team}
                        onChange={(e) => handleFieldChange(volunteer.id, 'team', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {allTeams.map((team) => (
                          <option key={team} value={team}>
                            {team}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <select
                        value={volunteer.volunteerType}
                        onChange={(e) => handleFieldChange(volunteer.id, 'volunteerType', e.target.value)}
                        className="block w-full px-2 py-1 border rounded-md text-sm text-slate-700"
                      >
                        {allVolunteerTypes.map((type) => (
                          <option key={type} value={type}>
                            {type === '' ? 'Sin Asignar' : type}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  {expanded.includes(volunteer.id) && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 bg-slate-50">
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
      <div className="px-6 py-4 bg-slate-50 flex justify-end">
        <button
          onClick={handleAdd}
          className="bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 flex items-center"
        >
          <Plus size={16} className="mr-1" /> Add Volunteer
        </button>
      </div>
    </div>
  );
}