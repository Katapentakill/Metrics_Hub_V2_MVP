'use client';

import { 
  BarChart3, 
  FolderOpen, 
  Users, 
  Clock, 
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ProjectsOverviewProps {
  data: any;
}

export default function ProjectsOverview({ data }: ProjectsOverviewProps) {
  const projects = [
    {
      id: '1',
      name: 'EcoVerde',
      description: 'Proyecto ambiental',
      progress: 85,
      status: 'active',
      teamMembers: 8,
      tasksCompleted: 24,
      totalTasks: 28,
      deadline: '2024-03-15',
      priority: 'high'
    },
    {
      id: '2',
      name: 'TechEdu',
      description: 'Educación tecnológica',
      progress: 60,
      status: 'active',
      teamMembers: 6,
      tasksCompleted: 18,
      totalTasks: 30,
      deadline: '2024-04-20',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'HealthConnect',
      description: 'Conectividad en salud',
      progress: 45,
      status: 'active',
      teamMembers: 5,
      tasksCompleted: 12,
      totalTasks: 26,
      deadline: '2024-05-10',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'planning': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-slate-100 text-slate-700';
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

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
        Resumen de Proyectos
      </h3>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-slate-50 rounded-lg border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-slate-800 flex items-center">
                  {project.name}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                    Activo
                  </span>
                  <span className={`ml-2 text-xs ${getPriorityColor(project.priority)}`}>
                    {project.priority === 'high' ? 'Alta' : project.priority === 'medium' ? 'Media' : 'Baja'}
                  </span>
                </h4>
                <p className="text-sm text-slate-600 mb-2">{project.description}</p>
                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.teamMembers} miembros
                  </span>
                  <span className="flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {project.tasksCompleted}/{project.totalTasks} tareas
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Vence: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Progreso: {project.progress}%</span>
              <span className="flex items-center">
                {project.progress > 80 ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : project.progress < 30 ? (
                  <AlertTriangle className="w-3 h-3 mr-1 text-yellow-500" />
                ) : (
                  <Target className="w-3 h-3 mr-1 text-blue-500" />
                )}
                {project.progress > 80 ? 'En buen ritmo' : project.progress < 30 ? 'Requiere atención' : 'En progreso'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Métricas generales */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-emerald-600">{data?.activeProjects || 0}</p>
            <p className="text-xs text-slate-600">Proyectos Activos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{data?.activeTeamMembers || 0}</p>
            <p className="text-xs text-slate-600">Miembros del Equipo</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round((data?.completedTasks || 0) / (data?.totalTasks || 1) * 100)}%
            </p>
            <p className="text-xs text-slate-600">Progreso General</p>
          </div>
        </div>
      </div>
    </div>
  );
}
