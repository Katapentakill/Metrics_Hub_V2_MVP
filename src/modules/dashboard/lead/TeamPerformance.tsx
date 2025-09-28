'use client';

import { 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface TeamPerformanceProps {
  data: any;
}

export default function TeamPerformance({ data }: TeamPerformanceProps) {
  const performanceMetrics = [
    {
      name: 'Productividad General',
      value: data?.teamProductivity || 87,
      target: 80,
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-500'
    },
    {
      name: 'Tareas Completadas',
      value: data?.completedTasks || 98,
      target: 100,
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-500'
    },
    {
      name: 'Cumplimiento de Deadlines',
      value: 92,
      target: 90,
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'Satisfacción del Cliente',
      value: 4.7,
      target: 4.5,
      trend: 'up',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500'
    }
  ];

  const teamMembers = [
    {
      name: 'María González',
      role: 'Frontend Developer',
      productivity: 95,
      tasksCompleted: 12,
      quality: 4.8,
      trend: 'up'
    },
    {
      name: 'Carlos Ruiz',
      role: 'UX Designer',
      productivity: 88,
      tasksCompleted: 8,
      quality: 4.6,
      trend: 'up'
    },
    {
      name: 'Ana Martínez',
      role: 'Project Manager',
      productivity: 92,
      tasksCompleted: 6,
      quality: 4.9,
      trend: 'stable'
    },
    {
      name: 'Diego Morales',
      role: 'Backend Developer',
      productivity: 85,
      tasksCompleted: 15,
      quality: 4.5,
      trend: 'down'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
        Performance del Equipo
      </h3>
      
      {/* Métricas principales */}
      <div className="space-y-4">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-600">{metric.name}</span>
                <span className="text-sm font-semibold text-slate-800">
                  {typeof metric.value === 'number' && metric.value < 10 ? 
                    `${metric.value}/5` : `${metric.value}%`}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 ${metric.bgColor} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                <span>Meta: {typeof metric.target === 'number' && metric.target < 10 ? 
                  `${metric.target}/5` : `${metric.target}%`}</span>
                <span className={`flex items-center ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                  <span className="ml-1">
                    {metric.trend === 'up' ? '+5%' : metric.trend === 'down' ? '-2%' : '0%'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Performance individual */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-medium text-slate-700 mb-4">Performance Individual</h4>
        <div className="space-y-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-800">{member.name}</span>
                  <span className="text-sm text-slate-600">{member.productivity}%</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{member.role}</p>
                <div className="w-full bg-slate-200 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${member.productivity}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                  <span>{member.tasksCompleted} tareas</span>
                  <span className="flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    {member.quality}/5
                  </span>
                </div>
              </div>
              <div className="ml-3">
                {getTrendIcon(member.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Resumen de performance */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{data?.thisMonthCompletions || 0}</p>
            <p className="text-xs text-slate-600">Tareas Este Mes</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{data?.activeTeamMembers || 0}</p>
            <p className="text-xs text-slate-600">Miembros Activos</p>
          </div>
        </div>
      </div>
      
      {/* Acciones rápidas */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors">
          Ver Reporte Detallado
        </button>
        <button className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors">
          Programar 1:1
        </button>
        <button className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
          Reconocimientos
        </button>
      </div>
    </div>
  );
}
