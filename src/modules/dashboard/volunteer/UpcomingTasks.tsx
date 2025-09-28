'use client';

import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Target,
  Calendar,
  Users,
  FileText,
  Flag
} from 'lucide-react';

interface UpcomingTasksProps {
  data: any;
}

export default function UpcomingTasks({ data }: UpcomingTasksProps) {
  const upcomingTasks = data?.upcomingTasks || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Próximas Tareas</h2>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          Ver todas
        </button>
      </div>
      
      <div className="space-y-4">
        {upcomingTasks.map((task: any) => {
          const daysLeft = getDaysUntilDue(task.dueDate);
          return (
            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-slate-800">{task.title}</h3>
                <p className="text-sm text-slate-600">{task.projectName}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Vence: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {daysLeft > 0 ? `${daysLeft} días` : daysLeft === 0 ? 'Hoy' : 'Vencido'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
                <button className="btn-living text-sm">
                  Ver Detalles
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Resumen de tareas */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-red-600">
              {upcomingTasks.filter((t: any) => getDaysUntilDue(t.dueDate) <= 3).length}
            </p>
            <p className="text-xs text-slate-600">Urgentes (≤3 días)</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-yellow-600">
              {upcomingTasks.filter((t: any) => getDaysUntilDue(t.dueDate) > 3 && getDaysUntilDue(t.dueDate) <= 7).length}
            </p>
            <p className="text-xs text-slate-600">Próximas (≤7 días)</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-green-600">
              {upcomingTasks.filter((t: any) => t.priority === 'low').length}
            </p>
            <p className="text-xs text-slate-600">Baja Prioridad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
