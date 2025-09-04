'use client';

import { 
  FileText, 
  Filter, 
  Video, 
  Users, 
  CheckCircle, 
  UserPlus,
  ArrowRight,
  Clock,
  TrendingUp,
  Target,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  description: string;
  icon: any;
  count: number;
  percentage: number;
  color: string;
  bgColor: string;
  averageTime: string;
  conversionRate: number;
  status: 'active' | 'bottleneck' | 'optimal';
}

interface RecruitmentMetrics {
  totalCandidates: number;
  averageProcessTime: string;
  overallConversionRate: number;
  activeProcesses: number;
}

export default function RecruitmentPipeline() {
  const pipelineStages: PipelineStage[] = [
    {
      id: '1',
      name: 'Aplicación',
      description: 'Candidatos que han enviado su aplicación',
      icon: FileText,
      count: 142,
      percentage: 100,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      averageTime: '1 día',
      conversionRate: 70,
      status: 'active'
    },
    {
      id: '2',
      name: 'Filtro HR',
      description: 'Revisión inicial de candidatos',
      icon: Filter,
      count: 98,
      percentage: 69,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      averageTime: '3 días',
      conversionRate: 60,
      status: 'bottleneck'
    },
    {
      id: '3',
      name: 'Video Presentación',
      description: 'Candidatos grabando video de presentación',
      icon: Video,
      count: 59,
      percentage: 42,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      averageTime: '5 días',
      conversionRate: 75,
      status: 'optimal'
    },
    {
      id: '4',
      name: 'Entrevista',
      description: 'Entrevistas con Lead Project y HR',
      icon: Users,
      count: 44,
      percentage: 31,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      averageTime: '7 días',
      conversionRate: 68,
      status: 'active'
    },
    {
      id: '5',
      name: 'Decisión',
      description: 'Proceso de toma de decisión final',
      icon: CheckCircle,
      count: 30,
      percentage: 21,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      averageTime: '2 días',
      conversionRate: 80,
      status: 'optimal'
    },
    {
      id: '6',
      name: 'Onboarding',
      description: 'Nuevos voluntarios en proceso de integración',
      icon: UserPlus,
      count: 24,
      percentage: 17,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      averageTime: '14 días',
      conversionRate: 95,
      status: 'optimal'
    }
  ];

  const metrics: RecruitmentMetrics = {
    totalCandidates: 142,
    averageProcessTime: '32 días',
    overallConversionRate: 17,
    activeProcesses: 89
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'bottleneck':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'optimal':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      default:
        return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'bottleneck':
        return 'border-red-200 bg-red-50';
      case 'optimal':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  // Datos para el gráfico de flujo semanal
  const weeklyFlow = [
    { week: 'S1', applications: 28, completed: 4 },
    { week: 'S2', applications: 35, completed: 6 },
    { week: 'S3', applications: 42, completed: 8 },
    { week: 'S4', applications: 37, completed: 6 }
  ];

  const handleStageAction = (stageId: string, action: string) => {
    console.log(`Executing ${action} for stage ${stageId}`);
    // Aquí iría la lógica real
  };

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-indigo-600" />
          Pipeline de Reclutamiento
        </h3>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Actualizado cada hora</span>
        </div>
      </div>

      {/* Métricas generales */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{metrics.totalCandidates}</p>
          <p className="text-xs text-slate-600">Total Candidatos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{metrics.overallConversionRate}%</p>
          <p className="text-xs text-slate-600">Conversión General</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{metrics.averageProcessTime}</p>
          <p className="text-xs text-slate-600">Tiempo Promedio</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{metrics.activeProcesses}</p>
          <p className="text-xs text-slate-600">Procesos Activos</p>
        </div>
      </div>

      {/* Pipeline visual */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700">Flujo del Proceso (6 Etapas)</h4>
        <div className="space-y-3">
          {pipelineStages.map((stage, index) => (
            <div key={stage.id}>
              <div className={`border rounded-lg p-4 ${getStatusColor(stage.status)} hover:shadow-md transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 ${stage.bgColor} rounded-lg`}>
                      <stage.icon className={`w-5 h-5 ${stage.color}`} />
                    </div>
                    <div>
                      <h5 className="font-semibold text-slate-800 flex items-center">
                        {stage.name}
                        {getStatusIcon(stage.status)}
                      </h5>
                      <p className="text-xs text-slate-600">{stage.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-800">{stage.count}</p>
                    <p className="text-xs text-slate-500">{stage.percentage}% del total</p>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${stage.color.replace('text-', 'bg-')}`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>

                {/* Métricas de la etapa */}
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex space-x-4">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Promedio: {stage.averageTime}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Conversión: {stage.conversionRate}%
                    </span>
                  </div>
                  <button
                    onClick={() => handleStageAction(stage.id, 'view_details')}
                    className="text-blue-600 hover:underline"
                  >
                    Ver detalles →
                  </button>
                </div>

                {/* Alertas de la etapa */}
                {stage.status === 'bottleneck' && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                    ⚠️ Cuello de botella detectado - Tiempo de procesamiento por encima del promedio
                  </div>
                )}
                
                {stage.status === 'optimal' && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700">
                    ✅ Funcionamiento óptimo - Métricas dentro de los objetivos
                  </div>
                )}
              </div>

              {/* Flecha entre etapas */}
              {index < pipelineStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Flujo semanal */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Flujo de las Últimas 4 Semanas
        </h4>
        <div className="grid grid-cols-4 gap-4">
          {weeklyFlow.map((week) => (
            <div key={week.week} className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-800">{week.week}</p>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Aplicaciones:</span>
                  <span className="font-medium text-blue-600">{week.applications}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Completados:</span>
                  <span className="font-medium text-green-600">{week.completed}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                  <div 
                    className="h-1 bg-green-500 rounded-full"
                    style={{ width: `${(week.completed / week.applications) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones rápidas del pipeline */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={() => handleStageAction('all', 'optimize')}
          className="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
        >
          Optimizar Pipeline
        </button>
        <button
          onClick={() => handleStageAction('all', 'export_report')}
          className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
        >
          Exportar Reporte
        </button>
        <button
          onClick={() => handleStageAction('all', 'set_alerts')}
          className="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-colors"
        >
          Configurar Alertas
        </button>
        <button
          onClick={() => handleStageAction('bottleneck', 'resolve')}
          className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
        >
          Resolver Cuellos de Botella
        </button>
      </div>
    </div>
  );
}