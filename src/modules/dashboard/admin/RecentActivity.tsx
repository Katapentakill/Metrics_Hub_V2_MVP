'use client';

import { 
  Clock, 
  UserPlus, 
  FolderOpen, 
  CheckSquare, 
  AlertTriangle, 
  Mail,
  Settings,
  FileText,
  Users,
  Award
} from 'lucide-react';
import '../../../styles/dashboard-admin.css';

interface ActivityItem {
  id: string;
  type: 'user' | 'project' | 'task' | 'system' | 'evaluation' | 'application';
  title: string;
  description: string;
  time: string;
  user?: string;
  icon: any;
  color: string;
  bgColor: string;
}

export default function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'user',
      title: 'Nuevo usuario registrado',
      description: 'María González se registró como voluntaria',
      time: 'Hace 15 minutos',
      user: 'María González',
      icon: UserPlus,
      color: 'activity-emerald',
      bgColor: 'activity-bg-emerald'
    },
    {
      id: '2',
      type: 'task',
      title: 'Tarea completada',
      description: 'Diseño de mockups finalizado en proyecto EcoVerde',
      time: 'Hace 32 minutos',
      user: 'Carlos Ruiz',
      icon: CheckSquare,
      color: 'activity-emerald',
      bgColor: 'activity-bg-emerald'
    },
    {
      id: '3',
      type: 'project',
      title: 'Proyecto actualizado',
      description: 'TechEdu cambió estado a "Activo"',
      time: 'Hace 1 hora',
      user: 'Ana Martínez',
      icon: FolderOpen,
      color: 'activity-emerald',
      bgColor: 'activity-bg-emerald'
    },
    {
      id: '4',
      type: 'system',
      title: 'Configuración modificada',
      description: 'Ajustes de notificaciones actualizados',
      time: 'Hace 2 horas',
      user: 'Admin Sistema',
      icon: Settings,
      color: 'activity-slate',
      bgColor: 'activity-bg-gray'
    },
    {
      id: '5',
      type: 'application',
      title: 'Aplicación aprobada',
      description: 'Candidato Diego Morales aceptado como voluntario',
      time: 'Hace 3 horas',
      user: 'Laura Pérez (HR)',
      icon: Award,
      color: 'activity-emerald',
      bgColor: 'activity-bg-emerald'
    },
    {
      id: '6',
      type: 'evaluation',
      title: 'Evaluación completada',
      description: 'Evaluación Q4 de equipo HealthConnect finalizada',
      time: 'Hace 4 horas',
      user: 'Pedro Sánchez',
      icon: FileText,
      color: 'activity-slate',
      bgColor: 'activity-bg-gray'
    },
    {
      id: '7',
      type: 'user',
      title: 'Usuario desactivado',
      description: 'Cuenta de Roberto García suspendida temporalmente',
      time: 'Hace 5 horas',
      user: 'Admin Sistema',
      icon: AlertTriangle,
      color: 'activity-slate',
      bgColor: 'activity-bg-gray'
    },
    {
      id: '8',
      type: 'system',
      title: 'Notificación enviada',
      description: 'Recordatorio de evaluaciones enviado a 45 usuarios',
      time: 'Hace 6 horas',
      user: 'Sistema Automático',
      icon: Mail,
      color: 'activity-slate',
      bgColor: 'activity-bg-gray'
    }
  ];

  const getTimeAgo = (time: string) => {
    return time;
  };

  const handleViewDetails = (activityId: string) => {
    console.log(`Ver detalles de actividad: ${activityId}`);
  };

  return (
    <div className="admin-activity-card">
      <div className="admin-activity-header">
        <h3 className="admin-activity-title">
          <Clock className="admin-activity-title-icon" />
          Actividad Reciente
        </h3>
        <button className="admin-activity-view-all">
          Ver todo el historial
        </button>
      </div>

      <div className="admin-activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="admin-activity-item">
            {/* Icono de actividad */}
            <div className={`admin-activity-icon-wrapper ${activity.bgColor}`}>
              <activity.icon className={`admin-activity-icon ${activity.color}`} />
            </div>

            {/* Contenido de la actividad */}
            <div className="admin-activity-content">
              <div className="admin-activity-content-top">
                <div className="admin-activity-content-main">
                  <p className="admin-activity-item-title">
                    {activity.title}
                  </p>
                  <p className="admin-activity-item-description">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <p className="admin-activity-item-user">
                      por <span className="admin-activity-user-name">{activity.user}</span>
                    </p>
                  )}
                </div>
                <div className="admin-activity-time">
                  {getTimeAgo(activity.time)}
                </div>
              </div>

              {/* Línea divisoria sutil */}
              <div className="admin-activity-divider"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen de actividad */}
      <div className="admin-activity-summary">
        <div className="admin-activity-summary-grid">
          <div className="admin-activity-summary-item">
            <p className="admin-activity-summary-number admin-summary-emerald">12</p>
            <p className="admin-activity-summary-label">Hoy</p>
          </div>
          <div className="admin-activity-summary-item">
            <p className="admin-activity-summary-number admin-summary-emerald">47</p>
            <p className="admin-activity-summary-label">Esta semana</p>
          </div>
          <div className="admin-activity-summary-item">
            <p className="admin-activity-summary-number admin-summary-slate">189</p>
            <p className="admin-activity-summary-label">Este mes</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas desde actividad */}
      <div className="admin-activity-actions">
        <button className="admin-activity-export-btn">
          Exportar log
        </button>
      </div>
    </div>
  );
}