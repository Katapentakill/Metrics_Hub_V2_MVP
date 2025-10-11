'use client';

import { UserPlus, Users, ClipboardCheck, TrendingUp, Calendar, Target } from 'lucide-react';
import '../../../styles/dashboard-hr.css';

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
        { stage: 'Aplicaciones', count: data.totalApplications, color: 'hr-pipeline-slate', percentage: 100 },
        { stage: 'Filtro HR', count: data.pendingApplications, color: 'hr-pipeline-emerald', percentage: 70 },
        { stage: 'Entrevistas', count: data.activeInterviews, color: 'hr-pipeline-blue', percentage: 40 },
        { stage: 'Aprobados', count: data.approvedApplications, color: 'hr-pipeline-yellow', percentage: 25 }
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
        { status: 'Pendientes', count: data.pendingApplications, color: 'hr-status-slate', textColor: 'hr-text-slate' },
        { status: 'En Entrevista', count: data.activeInterviews, color: 'hr-status-emerald', textColor: 'hr-text-emerald' },
        { status: 'Aprobados', count: data.approvedApplications, color: 'hr-pipeline-blue', textColor: 'hr-text-emerald' },
        { status: 'Rechazados', count: data.rejectedApplications, color: 'hr-pipeline-yellow', textColor: 'hr-text-slate' }
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
        <div className="hr-stats-card">
            {/* Header con título y estado de actualización */}
            <div className="hr-stats-header">
                <h3 className="hr-stats-title">
                    <UserPlus className="hr-stats-title-icon" />
                    Estadísticas de Reclutamiento
                </h3>
                <div className="hr-stats-update">
                    <Calendar className="hr-stats-update-icon" />
                    <span>Actualizado en tiempo real</span>
                </div>
            </div>

            {/* Pipeline de Reclutamiento */}
            <div className="hr-stats-section">
                <h4 className="hr-stats-subtitle">
                    <Target className="hr-stats-subtitle-icon" />
                    Pipeline de Reclutamiento
                </h4>
                <div className="hr-pipeline-list">
                    {recruitmentPipeline.map((stage, index) => (
                        <div key={stage.stage} className="hr-pipeline-item">
                            <div className="hr-pipeline-stage">
                                <span className="hr-pipeline-number">{index + 1}</span>
                                <span className="hr-pipeline-label">{stage.stage}</span>
                            </div>
                            <div className="hr-pipeline-stats">
                                <div className="hr-pipeline-progress-track">
                                    <div
                                        className={`hr-pipeline-progress-bar ${stage.color}`}
                                        style={{ width: `${stage.percentage}%` }}
                                    ></div>
                                </div>
                                <span className="hr-pipeline-count">{stage.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="hr-pipeline-tip">
                    💡 Tasa de conversión actual: <span className="hr-pipeline-tip-value">{data.conversionRate}%</span> (de aplicación a contratación)
                </div>
            </div>

            {/* Estado de Candidatos */}
            <div className="hr-stats-section">
                <h4 className="hr-stats-subtitle">
                    <ClipboardCheck className="hr-stats-subtitle-icon" />
                    Estado Actual de Candidatos
                </h4>
                <div className="hr-status-grid">
                    {candidateStatus.map((status) => (
                        <div key={status.status} className="hr-status-card">
                            <div className={`hr-status-badge ${status.color}`}>
                                {status.count}
                            </div>
                            <p className="hr-status-label">{status.status}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tendencia de Aplicaciones y Contrataciones */}
            <div className="hr-stats-section">
                <h4 className="hr-stats-subtitle">
                    <TrendingUp className="hr-stats-subtitle-icon" />
                    Tendencia de Aplicaciones (Últimos 6 Meses)
                </h4>
                <div className="hr-trends-wrapper">
                    {/* Nuevas aplicaciones */}
                    <div className="hr-trend-chart">
                        <div className="hr-trend-header">
                            <span className="hr-trend-label">Nuevas Aplicaciones</span>
                            <span className="hr-trend-average">Promedio: 23/mes</span>
                        </div>
                        <div className="hr-chart-bars">
                            {monthlyApplications.map((month) => (
                                <div key={month.month} className="hr-chart-item">
                                    <div
                                        className="hr-chart-bar hr-bar-emerald"
                                        style={{ height: `${(month.applications / 31) * 100}%` }}
                                        title={`${month.month}: ${month.applications} aplicaciones`}
                                    ></div>
                                    <span className="hr-chart-month">{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nuevas contrataciones */}
                    <div className="hr-trend-chart">
                        <div className="hr-trend-header">
                            <span className="hr-trend-label">Nuevas Contrataciones</span>
                            <span className="hr-trend-average">Total: 30 contrataciones</span>
                        </div>
                        <div className="hr-chart-bars hr-chart-bars-sm">
                            {monthlyApplications.map((month) => (
                                <div key={month.month} className="hr-chart-item">
                                    <div
                                        className="hr-chart-bar hr-bar-emerald"
                                        style={{ height: `${(month.hires / 8) * 100}%` }}
                                        title={`${month.month}: ${month.hires} contrataciones`}
                                    ></div>
                                    <span className="hr-chart-month">{month.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Entrevistas Programadas */}
            <div className="hr-stats-section">
                <h4 className="hr-stats-subtitle">
                    <Users className="hr-stats-subtitle-icon" />
                    Entrevistas de Esta Semana
                </h4>
                <div className="hr-interviews-chart">
                    {upcomingInterviews.map((day) => (
                        <div key={day.day} className="hr-interview-day">
                            <div
                                className="hr-interview-bar"
                                style={{ height: `${day.count * 8}px` }}
                                title={`${day.day}: ${day.count} entrevistas`}
                            ></div>
                            <span className="hr-interview-label">{day.day}</span>
                        </div>
                    ))}
                </div>
                <div className="hr-interviews-total">
                    Total programadas: <span className="hr-interviews-total-value">{data.scheduledInterviews}</span> entrevistas
                </div>
            </div>

            {/* Métricas de Rendimiento */}
            <div className="hr-performance-grid">
                <div className="hr-performance-item">
                    <p className="hr-performance-value hr-performance-emerald">
                        {data.conversionRate}%
                    </p>
                    <p className="hr-performance-label">Tasa Conversión</p>
                </div>
                <div className="hr-performance-item">
                    <p className="hr-performance-value hr-performance-emerald">
                        {Math.round((data.approvedApplications / data.totalApplications) * 100)}%
                    </p>
                    <p className="hr-performance-label">Tasa Aprobación</p>
                </div>
                <div className="hr-performance-item">
                    <p className="hr-performance-value hr-performance-slate">
                        {Math.round(data.totalApplications / 6)}
                    </p>
                    <p className="hr-performance-label">Promedio/Mes</p>
                </div>
            </div>
        </div>
    );
}