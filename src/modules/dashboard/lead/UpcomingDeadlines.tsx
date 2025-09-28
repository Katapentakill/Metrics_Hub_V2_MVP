'use client';

import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Target,
  Users,
  FileText,
  Flag
} from 'lucide-react';

interface UpcomingDeadlinesProps {
  data: any;
}

export default function UpcomingDeadlines({ data }: UpcomingDeadlinesProps) {
  const deadlines = [
    {
      id: '1',
      title: 'Entrega MVP EcoVerde',
      project: 'EcoVerde',
      dueDate: '2024-02-17',
      priority: 'high',
      status: 'urgent',
      assignedTo: 'María González',
      progress: 85,
      description: 'Primera versión funcional del sistema de gestión ambiental'
    },
    {
      id: '2',
      title: 'Revisión TechEdu',
      project: 'TechEdu',
      dueDate: '2024-02-22',
      priority: 'medium',
      status: 'upcoming',
      assignedTo: 'Carlos Ruiz',
      progress: 60,
      description: 'Revisión de diseño y funcionalidades educativas'
    },
    {
      id: '3',
      title: 'Documentación HealthConnect',
      project: 'HealthConnect',
      dueDate: '2024-02-25',
      priority: 'low',
      status: 'upcoming',
      assignedTo: 'Ana Martínez',
      progress: 30,
      description: 'Documentación técnica y manual de usuario'
    },
    {
      id: '4',
      title: 'Testing de Integración',
      project: 'EcoVerde',
      dueDate: '2024-03-01',
      priority: 'high',
      status: 'upcoming',
      assignedTo: 'Diego Morales',
      progress: 0,
      description: 'Pruebas de integración del sistema completo'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent': return 'bg-red-50 border-red-400 text-red-800';
      case 'upcoming': return 'bg-yellow-50 border-yellow-400 text-yellow-800';
      case 'completed': return 'bg-green-50 border-green-400 text-green-800';
      default: return 'bg-slate-50 border-slate-400 text-slate-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  const getDaysUntilDeadline = (dueDate: string) => {
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Target className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-orange-600" />
        Próximos Deadlines
      </h3>
      
      <div className="space-y-3">
        {deadlines.map((deadline) => {
          const daysLeft = getDaysUntilDeadline(deadline.dueDate);
          return (
            <div key={deadline.id} className={`p-3 rounded-lg border-l-4 ${getStatusColor(deadline.status)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 flex items-center">
                    {deadline.title}
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(deadline.status)}`}>
                      {deadline.status === 'urgent' ? 'Urgente' : 
                       deadline.status === 'upcoming' ? 'Próximo' : 'Completado'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{deadline.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      {deadline.project}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {deadline.assignedTo}
                    </span>
                    <span className={`flex items-center ${getPriorityColor(deadline.priority)}`}>
                      <Flag className="w-3 h-3 mr-1" />
                      {deadline.priority === 'high' ? 'Alta' : 
                       deadline.priority === 'medium' ? 'Media' : 'Baja'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(deadline.status)}
                    <span className="text-xs text-slate-500">
                      {daysLeft > 0 ? `${daysLeft} días` : daysLeft === 0 ? 'Hoy' : 'Vencido'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(deadline.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {/* Barra de progreso */}
              {deadline.progress > 0 && (
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${deadline.progress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                <span>Progreso: {deadline.progress}%</span>
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {daysLeft > 0 ? `${daysLeft} días restantes` : 
                   daysLeft === 0 ? 'Vence hoy' : `${Math.abs(daysLeft)} días vencido`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Resumen de deadlines */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-red-600">
              {deadlines.filter(d => getDaysUntilDeadline(d.dueDate) <= 3).length}
            </p>
            <p className="text-xs text-slate-600">Urgentes (≤3 días)</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-yellow-600">
              {deadlines.filter(d => getDaysUntilDeadline(d.dueDate) > 3 && getDaysUntilDeadline(d.dueDate) <= 7).length}
            </p>
            <p className="text-xs text-slate-600">Próximos (≤7 días)</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              {deadlines.filter(d => d.progress === 100).length}
            </p>
            <p className="text-xs text-slate-600">Completados</p>
          </div>
        </div>
      </div>
      
      {/* Acciones rápidas */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors">
          Ver Urgentes
        </button>
        <button className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
          Programar Reunión
        </button>
        <button className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors">
          Actualizar Progreso
        </button>
      </div>
    </div>
  );
}
