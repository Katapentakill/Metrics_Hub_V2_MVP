// src/modules/dashboard/volunteer/RecentActivity.tsx
'use client';

import { 
  CheckCircle, 
  Star, 
  Award, 
  Users, 
  Activity,
  Clock
} from 'lucide-react';
import '@/styles/dashboard.css';

interface RecentActivityProps {
  data: any;
}

interface ActivityItem {
  id: string | number;
  type: string;
  title: string;
  description: string;
  projectName?: string;
  timestamp: string;
}

export default function RecentActivity({ data }: RecentActivityProps) {
  const recentActivities: ActivityItem[] = data?.recentActivities || [];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed': 
        return <CheckCircle className="activity-icon-completed" />;
      case 'evaluation_received': 
        return <Star className="activity-icon-evaluation" />;
      case 'milestone_reached': 
        return <Award className="activity-icon-milestone" />;
      case 'project_joined': 
        return <Users className="activity-icon-joined" />;
      default: 
        return <Activity className="activity-icon-default" />;
    }
  };

  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Hace ${days} día${days > 1 ? 's' : ''}`;
    }
  };

  // Cálculo de contadores
  const completedTasksCount = recentActivities.filter(
    (a) => a.type === 'task_completed'
  ).length;

  const evaluationsCount = recentActivities.filter(
    (a) => a.type === 'evaluation_received'
  ).length;

  const achievementsCount = recentActivities.filter(
    (a) => a.type === 'milestone_reached'
  ).length;

  return (
    <div className="recent-activity-container">
      <div className="recent-activity-header">
        <h2 className="recent-activity-title">Actividad Reciente</h2>
        <button className="recent-activity-view-history">
          Ver historial
        </button>
      </div>
      
      <div className="recent-activity-list">
        {recentActivities.map((activity) => (
          <div 
            key={activity.id} 
            className="activity-item"
          >
            <div className="activity-icon-wrapper">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-title">{activity.title}</p>
              <p className="activity-description">{activity.description}</p>
              {activity.projectName && (
                <p className="activity-project">
                  Proyecto: <span className="activity-project-name">{activity.projectName}</span>
                </p>
              )}
              <p className="activity-timestamp">
                <Clock className="activity-timestamp-icon" />
                {getTimeAgo(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Resumen de actividad */}
      <div className="activity-summary">
        <div className="activity-summary-grid">
          {/* Tareas Completadas */}
          <div className="activity-summary-card activity-summary-completed">
            <p className="activity-summary-number activity-summary-number-completed">
              {completedTasksCount}
            </p>
            <p className="activity-summary-label">Tareas Completadas</p>
          </div>
          
          {/* Evaluaciones */}
          <div className="activity-summary-card activity-summary-evaluations">
            <p className="activity-summary-number activity-summary-number-evaluations">
              {evaluationsCount}
            </p>
            <p className="activity-summary-label">Evaluaciones</p>
          </div>
          
          {/* Logros */}
          <div className="activity-summary-card activity-summary-achievements">
            <p className="activity-summary-number activity-summary-number-achievements">
              {achievementsCount}
            </p>
            <p className="activity-summary-label">Logros</p>
          </div>
        </div>
      </div>
    </div>
  );
}