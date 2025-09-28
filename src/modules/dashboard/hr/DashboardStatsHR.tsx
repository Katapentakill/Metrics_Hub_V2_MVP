'use client';

import { UserPlus, Users, ClipboardCheck, TrendingUp, Calendar, Target } from 'lucide-react';

/**
 * Datos principales del dashboard de Recursos Humanos (HR).
 */
interface HRDashboardData {
    /** Total de aplicaciones recibidas */
    totalApplications: number;
    /** Aplicaciones en estado pendiente */
    pendingApplications: number;
    /** Aplicaciones aprobadas */
    approvedApplications: number;
    /** Aplicaciones rechazadas */
    rejectedApplications: number;
    /** Entrevistas activas actualmente */
    activeInterviews: number;
    /** Entrevistas programadas en el calendario */
    scheduledInterviews: number;
    /** Nuevas contrataciones realizadas */
    newHires: number;
    /** Aplicaciones recibidas este mes */
    thisMonthApplications: number;
    /** Porcentaje de conversión de aplicación a contratación */
    conversionRate: number;
}

/**
 * Props del componente DashboardStatsHR.
 */
interface DashboardStatsHRProps {
    /** Objeto con las métricas de HR, o null si no hay datos */
    data: HRDashboardData | null;
}

/**
 * DashboardStatsHR Component
 *
 * Muestra las estadísticas de reclutamiento para el área de Recursos Humanos:
 * - Pipeline de reclutamiento (aplicaciones → filtro HR → entrevistas → aprobados).
 * - Estado actual de candidatos.
 * - Tendencia de aplicaciones y contrataciones por mes.
 * - Entrevistas programadas en la semana.
 * - Métricas de rendimiento (conversión, aprobación, promedio mensual).
 *
 * @component
 * @param {DashboardStatsHRProps} props - Recibe los datos de métricas HR.
 * @returns {JSX.Element | null} - Vista con estadísticas de reclutamiento.
 *
 * @example
 * <DashboardStatsHR data={hrData} />
 */
export default function DashboardStatsHR({ data }: DashboardStatsHRProps) {
    if (!data) return null;

    /** Pipeline de reclutamiento en diferentes etapas */
    const recruitmentPipeline = [
        { stage: 'Aplicaciones', count: data.totalApplications, color: 'bg-blue-500', percentage: 100 },
        { stage: 'Filtro HR', count: data.pendingApplications, color: 'bg-yellow-500', percentage: 70 },
        { stage: 'Entrevistas', count: data.activeInterviews, color: 'bg-purple-500', percentage: 40 },
        { stage: 'Aprobados', count: data.approvedApplications, color: 'bg-green-500', percentage: 25 }
    ];

    /** Aplicaciones recibidas y contrataciones por mes (últimos 6 meses) */
    const monthlyApplications = [
        { month: 'Sep', applications: 15, hires: 4 },
        { month: 'Oct', applications: 23, hires: 6 },
        { month: 'Nov', applications: 31, hires: 8 },
        { month: 'Dic', applications: 18, hires: 5 },
        { month: 'Ene', applications: 28, hires: 7 },
        { month: 'Feb', applications: data.thisMonthApplications, hires: data.newHires }
    ];

    /** Estado actual de los candidatos (pendientes, entrevistas, aprobados, rechazados) */
    const candidateStatus = [
        { status: 'Pendientes', count: data.pendingApplications, color: 'bg-yellow-500', textColor: 'text-yellow-700' },
        { status: 'En Entrevista', count: data.activeInterviews, color: 'bg-purple-500', textColor: 'text-purple-700' },
        { status: 'Aprobados', count: data.approvedApplications, color: 'bg-green-500', textColor: 'text-green-700' },
        { status: 'Rechazados', count: data.rejectedApplications, color: 'bg-red-500', textColor: 'text-red-700' }
    ];

    /** Entrevistas programadas en la semana */
    const upcomingInterviews = [
        { day: 'Lun', count: 3 },
        { day: 'Mar', count: 5 },
        { day: 'Mié', count: 2 },
        { day: 'Jue', count: 4 },
        { day: 'Vie', count: 1 }
    ];

    return (
        <div className="card p-6 space-y-6">
            {/* Header con título y estado de actualización */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-blue-600" />
                    Estadísticas de Reclutamiento
                </h3>
                <div className="flex items-center space-x-2 text-xs text-muted">
                    <Calendar className="w-4 h-4" />
                    <span>Actualizado en tiempo real</span>
                </div>
            </div>

            {/* Pipeline de Reclutamiento */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-700 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Pipeline de Reclutamiento
                </h4>
                <div className="space-y-3">
                    {recruitmentPipeline.map((stage, index) => (
                        <div key={stage.stage} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded">{index + 1}</span>
                                    <span className="text-sm text-slate-600">{stage.stage}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-24 bg-slate-200 rounded-full h-2">
                                    <div
                                        className={`h-2 ${stage.color} rounded-full transition-all duration-500`}
                                        style={{ width: `${stage.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-medium text-slate-800 w-8 text-right">{stage.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                    💡 Tasa de conversión actual: {data.conversionRate}% (de aplicación a contratación)
                </div>
            </div>

            {/* Estado de Candidatos */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-700 flex items-center">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Estado Actual de Candidatos
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    {candidateStatus.map((status) => (
                        <div key={status.status} className="text-center p-3 bg-slate-50 rounded-lg border">
                            <div className={`w-8 h-8 ${status.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-semibold text-sm`}>
                                {status.count}
                            </div>
                            <p className="text-xs text-slate-600">{status.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tendencia de Aplicaciones y Contrataciones */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-700 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Tendencia de Aplicaciones (Últimos 6 Meses)
                </h4>
                <div className="space-y-4">
                    {/* Nuevas aplicaciones */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-600">Nuevas Aplicaciones</span>
                            <span className="text-xs text-blue-600">Promedio: 23/mes</span>
                        </div>
                        <div className="flex items-end space-x-1 h-16">
                            {monthlyApplications.map((month) => (
                                <div key={month.month} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600 cursor-pointer"
                                        style={{ height: `${(month.applications / 31) * 100}%` }}
                                        title={`${month.month}: ${month.applications} aplicaciones`}
                                    ></div>
                                    <span className="text-xs text-slate-500 mt-1">{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nuevas contrataciones */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-600">Nuevas Contrataciones</span>
                            <span className="text-xs text-green-600">Total: 30 contrataciones</span>
                        </div>
                        <div className="flex items-end space-x-1 h-12">
                            {monthlyApplications.map((month) => (
                                <div key={month.month} className="flex-1 flex flex-col items-center">
                                    <div
                                        className="w-full bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600 cursor-pointer"
                                        style={{ height: `${(month.hires / 8) * 100}%` }}
                                        title={`${month.month}: ${month.hires} contrataciones`}
                                    ></div>
                                    <span className="text-xs text-slate-500 mt-1">{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Entrevistas Programadas */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-700 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Entrevistas de Esta Semana
                </h4>
                <div className="flex justify-between items-end h-12 bg-slate-50 p-3 rounded-lg">
                    {upcomingInterviews.map((day) => (
                        <div key={day.day} className="flex flex-col items-center">
                            <div
                                className="w-8 bg-purple-500 rounded-t transition-all duration-500 hover:bg-purple-600 cursor-pointer"
                                style={{ height: `${day.count * 8}px` }}
                                title={`${day.day}: ${day.count} entrevistas`}
                            ></div>
                            <span className="text-xs text-slate-500 mt-1">{day.day}</span>
                        </div>
                    ))}
                </div>
                <div className="text-xs text-slate-500 text-center">
                    Total programadas: {data.scheduledInterviews} entrevistas
                </div>
            </div>

            {/* Métricas de Rendimiento */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        {data.conversionRate}%
                    </p>
                    <p className="text-xs text-slate-600">Tasa Conversión</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {Math.round((data.approvedApplications / data.totalApplications) * 100)}%
                    </p>
                    <p className="text-xs text-slate-600">Tasa Aprobación</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {Math.round(data.totalApplications / 6)}
                    </p>
                    <p className="text-xs text-slate-600">Promedio/Mes</p>
                </div>
            </div>
        </div>
    );
}