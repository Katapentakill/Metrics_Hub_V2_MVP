'use client';

import { 
  Users, 
  UserCheck, 
  Clock, 
  Target,
  MessageSquare,
  Mail,
  Phone,
  Star,
  Award
} from 'lucide-react';

interface TeamAssignmentsProps {
  data: any;
}

export default function TeamAssignments({ data }: TeamAssignmentsProps) {
  const teamMembers = [
    {
      id: '1',
      name: 'María González',
      role: 'Frontend Developer',
      status: 'active',
      tasksCompleted: 12,
      totalTasks: 15,
      lastActive: '2024-02-15T10:30:00Z',
      skills: ['React', 'TypeScript', 'Tailwind'],
      performance: 'excellent',
      avatar: 'MG'
    },
    {
      id: '2',
      name: 'Carlos Ruiz',
      role: 'UX Designer',
      status: 'active',
      tasksCompleted: 8,
      totalTasks: 10,
      lastActive: '2024-02-15T09:15:00Z',
      skills: ['Figma', 'User Research', 'Prototyping'],
      performance: 'good',
      avatar: 'CR'
    },
    {
      id: '3',
      name: 'Ana Martínez',
      role: 'Project Manager',
      status: 'active',
      tasksCompleted: 6,
      totalTasks: 8,
      lastActive: '2024-02-15T08:45:00Z',
      skills: ['Scrum', 'Agile', 'Leadership'],
      performance: 'excellent',
      avatar: 'AM'
    },
    {
      id: '4',
      name: 'Diego Morales',
      role: 'Backend Developer',
      status: 'busy',
      tasksCompleted: 15,
      totalTasks: 18,
      lastActive: '2024-02-15T11:20:00Z',
      skills: ['Node.js', 'PostgreSQL', 'AWS'],
      performance: 'good',
      avatar: 'DM'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'busy': return 'bg-yellow-100 text-yellow-700';
      case 'away': return 'bg-gray-100 text-gray-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs_improvement': return 'text-yellow-600';
      default: return 'text-slate-600';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'excellent': return <Award className="w-4 h-4 text-green-500" />;
      case 'good': return <Star className="w-4 h-4 text-blue-500" />;
      case 'needs_improvement': return <Target className="w-4 h-4 text-yellow-500" />;
      default: return <UserCheck className="w-4 h-4 text-slate-500" />;
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
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-blue-600" />
        Equipo Asignado
      </h3>
      
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {member.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{member.name}</p>
                <p className="text-xs text-slate-500">{member.role}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                    {member.status === 'active' ? 'Activo' : member.status === 'busy' ? 'Ocupado' : 'Ausente'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {getTimeAgo(member.lastActive)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-xs text-slate-600">
                  {member.tasksCompleted}/{member.totalTasks} tareas
                </p>
                <div className="w-16 bg-slate-200 rounded-full h-1 mt-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full" 
                    style={{ width: `${(member.tasksCompleted / member.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {getPerformanceIcon(member.performance)}
                <span className={`text-xs ${getPerformanceColor(member.performance)}`}>
                  {member.performance === 'excellent' ? 'Excelente' : 
                   member.performance === 'good' ? 'Bueno' : 'Mejorable'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Acciones rápidas del equipo */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-xs">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Chat Grupal</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-xs">
            <Users className="w-4 h-4 text-green-600" />
            <span>Reunión</span>
          </button>
        </div>
      </div>
      
      {/* Métricas del equipo */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold text-blue-600">{data?.activeTeamMembers || 0}</p>
          <p className="text-xs text-slate-600">Activos</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-green-600">
            {Math.round((data?.completedTasks || 0) / (data?.totalTasks || 1) * 100)}%
          </p>
          <p className="text-xs text-slate-600">Productividad</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-purple-600">{data?.teamProductivity || 0}%</p>
          <p className="text-xs text-slate-600">Eficiencia</p>
        </div>
      </div>
    </div>
  );
}
