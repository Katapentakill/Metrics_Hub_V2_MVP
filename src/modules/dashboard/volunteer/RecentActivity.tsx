'use client';

import { 
  CheckCircle, 
  Star, 
  Award, 
  Users, 
  Activity,
  Clock,
  Target
} from 'lucide-react';

interface RecentActivityProps {
  data: any;
}

export default function RecentActivity({ data }: RecentActivityProps) {
  const recentActivities = data?.recentActivities || [];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'evaluation_received': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'milestone_reached': return <Award className="w-5 h-5 text-purple-500" />;
      case 'project_joined': return <Users className="w-5 h-5 text-blue-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `Hace ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return `Hace ${Math.floor(diffInMinutes / 1440)} días`;
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Actividad Reciente</h2>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
          Ver historial
        </button>
      </div>
      
      <div className="space-y-4">
        {recentActivities.map((activity: any) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{activity.title}</p>
              <p className="text-xs text-slate-600 mt-1">{activity.description}</p>
              {activity.projectName && (
                <p className="text-xs text-slate-500 mt-1">
                  Proyecto: {activity.projectName}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-1">
                {getTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Resumen de actividad */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-green-600">
              {recentActivities.filter((a: any) => a.type === 'task_completed').length}
            </p>
            <p className="text-xs text-slate-600">Tareas Completadas</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-yellow-600">
              {recentActivities.filter((a: any) => a.type === 'evaluation_received').length}
            </p>
            <p className="text-xs text-slate-600">Evaluaciones</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-purple-600">
              {recentActivities.filter((a: any) => a.type === 'milestone_reached').length}
            </p>
            <p className="text-xs text-slate-600">Logros</p>
          </div>
        </div>
      </div>
    </div>
  );
}
