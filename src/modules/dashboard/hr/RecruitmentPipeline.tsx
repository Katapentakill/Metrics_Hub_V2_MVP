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

/**
 * Representa una etapa dentro del pipeline de reclutamiento.
 */
interface PipelineStage {
    id: string;
    /** Nombre de la etapa (ej: "Aplicación", "Filtro HR") */
    name: string;
    /** Descripción breve de lo que ocurre en la etapa */
    description: string;
    /** Icono visual representativo */
    icon: any;
    /** Número de candidatos en esta etapa */
    count: number;
    /** Porcentaje respecto al total de candidatos */
    percentage: number;
    /** Color principal para el icono */
    color: string;
    /** Color de fondo para el icono */
    bgColor: string;
    /** Tiempo promedio en la etapa */
    averageTime: string;
    /** Tasa de conversión de la etapa */
    conversionRate: number;
    /** Estado de la etapa (activa, cuello de botella o en óptimo rendimiento) */
    status: 'active' | 'bottleneck' | 'optimal';
}

/**
 * Métricas generales del pipeline de reclutamiento.
 */
interface RecruitmentMetrics {
    /** Total de candidatos en el pipeline */
    totalCandidates: number;
    /** Tiempo promedio de todo el proceso */
    averageProcessTime: string;
    /** Conversión general desde aplicación hasta onboarding */
    overallConversionRate: number;
    /** Procesos activos actualmente */
    activeProcesses: number;
}

/**
 * RecruitmentPipeline Component
 *
 * Muestra una visualización del pipeline de reclutamiento con métricas por etapa,
 * flujo semanal y acciones rápidas de gestión.
 *
 * @component
 * @returns {JSX.Element} Componente con la visualización del pipeline.
 *
 * @example
 * <RecruitmentPipeline />
 */
export default function RecruitmentPipeline() {
    /** Definición de las 6 etapas principales del pipeline */
    const pipelineStages: PipelineStage[] = [
        {
            id: '1',
            name: 'Aplicación',
            description: 'Candidatos que han enviado su aplicación',
            icon: FileText,
            count: 142,
            percentage: 100,
            color: 'text-slate-600',
            bgColor: 'bg-gray-50',
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
            color: 'text-slate-600',
            bgColor: 'bg-gray-50',
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
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
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
            color: 'text-slate-600',
            bgColor: 'bg-gray-50',
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
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
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
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            averageTime: '14 días',
            conversionRate: 95,
            status: 'optimal'
        }
    ];

    /** Métricas generales del pipeline */
    const metrics: RecruitmentMetrics = {
        totalCandidates: 142,
        averageProcessTime: '32 días',
        overallConversionRate: 17,
        activeProcesses: 89
    };

    /**
     * Retorna el ícono según el estado de la etapa.
     */
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'bottleneck': return <AlertTriangle className="w-4 h-4 text-slate-600" />;
            case 'optimal': return <TrendingUp className="w-4 h-4 text-emerald-500" />;
            default: return <Target className="w-4 h-4 text-slate-600" />;
        }
    };

    /**
     * Retorna el color de fondo según el estado de la etapa.
     */
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'bottleneck': return 'border-slate-200 bg-gray-50';
            case 'optimal': return 'border-emerald-200 bg-emerald-50';
            default: return 'border-slate-200 bg-gray-50';
        }
    };

    /** Flujo de aplicaciones y completados por semana */
    const weeklyFlow = [
        { week: 'S1', applications: 28, completed: 4 },
        { week: 'S2', applications: 35, completed: 6 },
        { week: 'S3', applications: 42, completed: 8 },
        { week: 'S4', applications: 37, completed: 6 }
    ];

    /**
     * Acción genérica para interactuar con las etapas o métricas del pipeline.
     * @param stageId - Id de la etapa (o "all")
     * @param action - Acción a ejecutar (ej: "view_details", "export_report")
     */
    const handleStageAction = (stageId: string, action: string) => {
        console.log(`Executing ${action} for stage ${stageId}`);
        // Aquí iría la lógica real (API, navegación, etc.)
    };

    return (
        <div className="card p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-emerald-600" />
                    Pipeline de Reclutamiento
                </h3>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Actualizado cada hora</span>
                </div>
            </div>

            {/* Métricas generales */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-600">{metrics.totalCandidates}</p>
                    <p className="text-xs text-gray-600">Total Candidatos</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{metrics.overallConversionRate}%</p>
                    <p className="text-xs text-gray-600">Conversión General</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-600">{metrics.averageProcessTime}</p>
                    <p className="text-xs text-gray-600">Tiempo Promedio</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{metrics.activeProcesses}</p>
                    <p className="text-xs text-gray-600">Procesos Activos</p>
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
                                            <h5 className="font-semibold text-slate-800 flex items-center space-x-2">
                                                <span>{stage.name}</span>
                                                {getStatusIcon(stage.status)}
                                            </h5>
                                            <p className="text-xs text-gray-600">{stage.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-slate-800">{stage.count}</p>
                                        <p className="text-xs text-gray-600">{stage.percentage}% del total</p>
                                    </div>
                                </div>

                                {/* Barra de progreso */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${stage.color.replace('text-', 'bg-')}`}
                                        style={{ width: `${stage.percentage}%` }}
                                    ></div>
                                </div>

                                {/* Métricas de la etapa */}
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                    <div className="flex space-x-4">
                                        <span className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1 text-slate-400" />
                                            Promedio: {stage.averageTime}
                                        </span>
                                        <span className="flex items-center">
                                            <TrendingUp className="w-3 h-3 mr-1 text-slate-400" />
                                            Conversión: {stage.conversionRate}%
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleStageAction(stage.id, 'view_details')}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        Ver detalles →
                                    </button>
                                </div>

                                {/* Alertas de la etapa */}
                                {stage.status === 'bottleneck' && (
                                    <div className="mt-3 p-2 bg-gray-100 border border-slate-300 rounded text-xs text-slate-700 font-medium">
                                        ⚠️ Cuello de botella detectado - Tiempo de procesamiento por encima del promedio
                                    </div>
                                )}

                                {stage.status === 'optimal' && (
                                    <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-700 font-medium">
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
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    Flujo de las Últimas 4 Semanas
                </h4>
                <div className="grid grid-cols-4 gap-4">
                    {weeklyFlow.map((week) => (
                        <div key={week.week} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <p className="text-sm font-semibold text-slate-800">{week.week}</p>
                            <div className="mt-2 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Aplicaciones:</span>
                                    <span className="font-medium text-slate-700">{week.applications}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">Completados:</span>
                                    <span className="font-medium text-emerald-600">{week.completed}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                                    <div
                                        className="h-1 bg-emerald-500 rounded-full"
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
                    className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors font-medium"
                >
                    Optimizar Pipeline
                </button>
                <button
                    onClick={() => handleStageAction('all', 'export_report')}
                    className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors font-medium"
                >
                    Exportar Reporte
                </button>
                <button
                    onClick={() => handleStageAction('all', 'set_alerts')}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 rounded transition-colors font-medium"
                >
                    Configurar Alertas
                </button>
                <button
                    onClick={() => handleStageAction('bottleneck', 'resolve')}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 rounded transition-colors font-medium"
                >
                    Resolver Cuellos de Botella
                </button>
            </div>
        </div>
    );
}