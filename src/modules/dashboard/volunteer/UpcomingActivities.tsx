// src/modules/dashboard/volunteer/UpcomingActivities.tsx
'use client';

import { Calendar, Clock, MapPin, Users, Video, Coffee } from 'lucide-react';

export default function UpcomingActivities() {
  // Datos ficticios de próximas actividades
  const activities = [
    {
      id: '1',
      title: 'Reunión de Equipo EcoVerde',
      type: 'meeting' as const,
      date: '2025-09-10',
      time: '10:00',
      duration: '1h 30min',
      location: 'Virtual - Zoom',
      attendees: 8,
      project: 'EcoVerde',
      priority: 'high' as const
    },
    {
      id: '2',
      title: 'Capacitación: Nuevos Protocolos',
      type: 'training' as const,
      date: '2025-09-11',
      time: '14:00',
      duration: '2h',
      location: 'Sala de Conferencias A',
      attendees: 15,
      project: 'General',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Trabajo de Campo - Reforestación',
      type: 'fieldwork' as const,
      date: '2025-09-13',
      time: '08:00',
      duration: '4h',
      location: 'Parque Central, Zona Norte',
      attendees: 12,
      project: 'EcoVerde',
      priority: 'high' as const
    },
    {
      id: '4',
      title: 'Coffee Chat con Mentores',
      type: 'social' as const,
      date: '2025-09-14',
      time: '16:00',
      duration: '1h',
      location: 'Café Central',
      attendees: 6,
      project: 'TechEdu',
      priority: 'low' as const
    },
    {
      id: '5',
      title: 'Entrevista a Nuevo Candidato',
      type: 'interview' as const,
      date: '2025-09-15',
      time: '11:00',
      duration: '45min',
      location: 'Virtual - Google Meet',
      attendees: 3,
      project: 'Reclutamiento',
      priority: 'medium' as const
    }
  ];

  const getTypeIcon = (type: 'meeting' | 'training' | 'fieldwork' | 'social' | 'interview') => {
    switch (type) {
      case 'meeting': return <Video className="w-4 h-4 text-blue-600" />;
      case 'training': return <Users className="w-4 h-4 text-purple-600" />;
      case 'fieldwork': return <MapPin className="w-4 h-4 text-green-600" />;
      case 'social': return <Coffee className="w-4 h-4 text-orange-600" />;
      case 'interview': return <Users className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getTypeColor = (type: 'meeting' | 'training' | 'fieldwork' | 'social' | 'interview') => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-purple-100 text-purple-800';
      case 'fieldwork': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-orange-100 text-orange-800';
      case 'interview': return 'bg-indigo-100 text-indigo-800';
    }
  };

  const getTypeText = (type: 'meeting' | 'training' | 'fieldwork' | 'social' | 'interview') => {
    switch (type) {
      case 'meeting': return 'Reunión';
      case 'training': return 'Capacitación';
      case 'fieldwork': return 'Campo';
      case 'social': return 'Social';
      case 'interview': return 'Entrevista';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'short',
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'border-l-red-400';
      case 'medium': return 'border-l-yellow-400';
      case 'low': return 'border-l-green-400';
    }
  };

  // Actividades de hoy y mañana
  const todayActivities = activities.filter(activity => {
    const activityDate = new Date(activity.date);
    const today = new Date();
    return activityDate.toDateString() === today.toDateString();
  });

  const upcomingActivities = activities.filter(activity => {
    const activityDate = new Date(activity.date);
    const today = new Date();
    return activityDate > today;
  }).slice(0, 4);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-living-green-600" />
          <h3 className="text-lg font-semibold text-slate-800">Próximas Actividades</h3>
        </div>
        <button className="text-sm text-living-green-600 hover:text-living-green-700 font-medium">
          Ver calendario →
        </button>
      </div>

      {/* Actividades de hoy (si las hay) */}
      {todayActivities.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-700 mb-3 flex items-center space-x-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>Hoy</span>
          </h4>
          <div className="space-y-2">
            {todayActivities.map((activity) => (
              <div key={activity.id} className={`p-3 bg-red-50 rounded-lg border-l-4 ${getPriorityColor(activity.priority)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(activity.type)}
                    <span className="text-sm font-medium text-slate-800">{activity.title}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(activity.type)}`}>
                    {getTypeText(activity.type)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time} - {activity.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Próximas actividades */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-slate-700">Esta Semana</h4>
        {upcomingActivities.map((activity) => (
          <div key={activity.id} className={`p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow border-l-4 ${getPriorityColor(activity.priority)}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getTypeIcon(activity.type)}
                <span className="text-sm font-medium text-slate-800">{activity.title}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(activity.type)}`}>
                  {getTypeText(activity.type)}
                </span>
                <span className="text-xs text-slate-500">
                  {formatDate(activity.date)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time} - {activity.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{activity.attendees} personas</span>
                </div>
              </div>
              <span className="text-slate-500">{activity.project}</span>
            </div>
            <div className="mt-2 text-xs text-slate-600">
              <MapPin className="w-3 h-3 inline mr-1" />
              {activity.location}
            </div>
          </div>
        ))}
      </div>

      {/* Resumen semanal */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-living-green-50 to-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Esta Semana</span>
            <span className="text-sm font-bold text-slate-800">{activities.length} actividades</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>
              {activities.filter(a => a.type === 'meeting').length} reuniones
            </span>
            <span>
              {activities.filter(a => a.type === 'fieldwork').length} trabajo de campo
            </span>
            <span>
              {activities.filter(a => a.type === 'training').length} capacitaciones
            </span>
          </div>
        </div>
      </div>

      {/* Recordatorio */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Recordatorio</p>
            <p className="text-xs text-yellow-700">
              Tienes una reunión importante mañana a las 10:00 AM. ¡No olvides preparar tu presentación!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}