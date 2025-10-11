// src/modules/dashboard/volunteer/UpcomingTasks.tsx
'use client';

import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Target,
  Calendar
} from 'lucide-react';
import '@/styles/dashboard.css';

interface UpcomingTasksProps {
  data: any;
}

export default function UpcomingTasks({ data }: UpcomingTasksProps) {
  const upcomingTasks = data?.upcomingTasks || [];

  const getPriorityClass = (priority: string): string => {
    switch (priority) {
      case 'high': 
        return 'task-priority-high';
      case 'medium': 
        return 'task-priority-medium';
      case 'low': 
        return 'task-priority-low';
      default: 
        return 'task-priority-default';
    }
  };

  const getTaskCardClass = (priority: string): string => {
    switch (priority) {
      case 'high': 
        return 'task-card task-card-high';
      case 'medium': 
        return 'task-card task-card-medium';
      case 'low': 
        return 'task-card task-card-low';
      default: 
        return 'task-card task-card-default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': 
        return <AlertCircle className="priority-icon-high" />;
      case 'medium': 
        return <Clock className="priority-icon-medium" />;
      case 'low': 
        return <CheckCircle className="priority-icon-low" />;
      default: 
        return <Target className="priority-icon-default" />;
    }
  };

  const getPriorityLabel = (priority: string): string => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysText = (daysLeft: number): string => {
    if (daysLeft > 0) {
      return `${daysLeft} días`;
    } else if (daysLeft === 0) {
      return 'Hoy';
    } else {
      return `Vencido (${Math.abs(daysLeft)} días)`;
    }
  };

  const getDaysClass = (daysLeft: number): string => {
    if (daysLeft < 0) {
      return 'task-card-meta-item task-card-meta-urgent';
    } else if (daysLeft <= 3) {
      return 'task-card-meta-item task-card-meta-warning';
    } else {
      return 'task-card-meta-item';
    }
  };

  const urgentCount = upcomingTasks.filter((t: any) => {
    const days = getDaysUntilDue(t.dueDate);
    return days <= 3 && days >= 0;
  }).length;

  const upcomingCount = upcomingTasks.filter((t: any) => {
    const days = getDaysUntilDue(t.dueDate);
    return days > 3 && days <= 7;
  }).length;

  const lowPriorityCount = upcomingTasks.filter((t: any) => 
    t.priority === 'low'
  ).length;

  return (
    <div className="upcoming-tasks-container">
      <div className="upcoming-tasks-header">
        <h2 className="upcoming-tasks-title">Próximas Tareas</h2>
        <button className="upcoming-tasks-view-all">
          Ver todas
        </button>
      </div>
      
      <div className="upcoming-tasks-list">
        {upcomingTasks.map((task: any) => {
          const daysLeft = getDaysUntilDue(task.dueDate);
          
          return (
            <div 
              key={task.id} 
              className={getTaskCardClass(task.priority)}
            >
              <div className="task-card-content">
                <div className="task-card-header">
                  {getPriorityIcon(task.priority)}
                  <h3 className="task-card-title">{task.title}</h3>
                </div>
                <p className="task-card-project">{task.projectName}</p>
                <div className="task-card-meta">
                  <span className="task-card-meta-item">
                    <Calendar className="task-card-meta-icon" />
                    Vence: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                  <span className={getDaysClass(daysLeft)}>
                    <Clock className="task-card-meta-icon" />
                    {getDaysText(daysLeft)}
                  </span>
                </div>
              </div>
              
              <div className="task-card-actions">
                <span className={`task-priority-badge ${getPriorityClass(task.priority)}`}>
                  {getPriorityLabel(task.priority)}
                </span>
                <button className="task-details-button">
                  Ver Detalles
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Resumen de tareas */}
      <div className="task-summary">
        <div className="task-summary-grid">
          {/* Urgentes */}
          <div className="task-summary-card task-summary-urgent">
            <p className="task-summary-number task-summary-number-urgent">
              {urgentCount}
            </p>
            <p className="task-summary-label">Urgentes (≤3 días)</p>
          </div>
          
          {/* Próximas */}
          <div className="task-summary-card task-summary-upcoming">
            <p className="task-summary-number task-summary-number-warning">
              {upcomingCount}
            </p>
            <p className="task-summary-label">Próximas (≤7 días)</p>
          </div>
          
          {/* Baja Prioridad */}
          <div className="task-summary-card task-summary-low">
            <p className="task-summary-number task-summary-number-success">
              {lowPriorityCount}
            </p>
            <p className="task-summary-label">Baja Prioridad</p>
          </div>
        </div>
      </div>
    </div>
  );
}