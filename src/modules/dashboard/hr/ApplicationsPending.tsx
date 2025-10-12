'use client';

import {
    Clock,
    UserCheck,
    Mail,
    Phone,
    Calendar,
    Star,
    AlertCircle,
    CheckCircle,
    XCircle,
    Eye,
    MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import '../../../styles/dashboard-hr.css';

/**
 * Representa una aplicación pendiente dentro del proceso de reclutamiento.
 */
interface PendingApplication {
    /** ID único de la aplicación */
    id: string;
    /** Nombre del candidato */
    candidateName: string;
    /** Correo electrónico de contacto */
    email: string;
    /** Número de teléfono */
    phone: string;
    /** Cargo al que aplica */
    position: string;
    /** Fecha en la que aplicó */
    appliedDate: string;
    /** Etapa actual en el proceso de selección */
    stage: 'initial_review' | 'hr_filter' | 'interview_scheduled' | 'interview_completed';
    /** Prioridad asignada por HR */
    priority: 'high' | 'medium' | 'low';
    /** Experiencia laboral del candidato */
    experience: string;
    /** Lista de habilidades declaradas */
    skills: string[];
    /** Estado de la aplicación */
    status: 'pending' | 'in_review' | 'approved' | 'rejected';
    /** Notas adicionales del reclutador */
    notes?: string;
    /** Fecha programada para entrevista (si aplica) */
    interviewDate?: string;
}

/**
 * ApplicationsPending Component
 *
 * Renderiza una lista interactiva de aplicaciones pendientes, con filtros
 * por etapa, prioridad y urgencia. Permite a HR tomar acciones rápidas
 * como aprobar, rechazar, programar entrevistas o contactar al candidato.
 *
 * @component
 * @returns {JSX.Element} - Una tarjeta con lista filtrable de aplicaciones.
 *
 * @example
 * <ApplicationsPending />
 */
export default function ApplicationsPending() {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');

    /** Lista simulada de aplicaciones pendientes */
    const pendingApplications: PendingApplication[] = [
        {
            id: '1',
            candidateName: 'María González',
            email: 'maria.gonzalez@email.com',
            phone: '+57 300 123 4567',
            position: 'Desarrolladora Frontend',
            appliedDate: '2024-02-15',
            stage: 'initial_review',
            priority: 'high',
            experience: '3 años',
            skills: ['React', 'TypeScript', 'Tailwind'],
            status: 'pending'
        },
        {
            id: '2',
            candidateName: 'Carlos Ruiz',
            email: 'carlos.ruiz@email.com',
            phone: '+57 301 987 6543',
            position: 'Diseñador UX/UI',
            appliedDate: '2024-02-14',
            stage: 'hr_filter',
            priority: 'medium',
            experience: '2 años',
            skills: ['Figma', 'Adobe XD', 'Prototyping'],
            status: 'in_review',
            notes: 'Portfolio muy completo'
        },
        {
            id: '3',
            candidateName: 'Ana Martínez',
            email: 'ana.martinez@email.com',
            phone: '+57 302 456 7890',
            position: 'Project Manager',
            appliedDate: '2024-02-13',
            stage: 'interview_scheduled',
            priority: 'high',
            experience: '5 años',
            skills: ['Scrum', 'Agile', 'Leadership'],
            status: 'approved',
            interviewDate: '2024-02-20T10:00:00'
        },
        {
            id: '4',
            candidateName: 'Diego Morales',
            email: 'diego.morales@email.com',
            phone: '+57 303 789 0123',
            position: 'Marketing Digital',
            appliedDate: '2024-02-12',
            stage: 'interview_completed',
            priority: 'medium',
            experience: '1 año',
            skills: ['SEO', 'Google Ads', 'Analytics'],
            status: 'pending',
            notes: 'Entrevista muy positiva'
        },
        {
            id: '5',
            candidateName: 'Laura Pérez',
            email: 'laura.perez@email.com',
            phone: '+57 304 234 5678',
            position: 'Voluntaria General',
            appliedDate: '2024-02-11',
            stage: 'hr_filter',
            priority: 'low',
            experience: 'Sin experiencia',
            skills: ['Comunicación', 'Trabajo en equipo'],
            status: 'in_review'
        }
    ];

    /**
     * Retorna la clase dessssssss color según la etapa de selección.
     */
    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'initial_review': return 'hr-app-stage-gray';
            case 'hr_filter': return 'hr-app-stage-gray';
            case 'interview_scheduled': return 'hr-app-stage-emerald';
            case 'interview_completed': return 'hr-app-stage-emerald';
            default: return 'hr-app-stage-gray';
        }
    };

    /**
     * Traduce el valor de `stage` a un texto legible en español.
     */
    const getStageText = (stage: string) => {
        switch (stage) {
            case 'initial_review': return 'Revisión Inicial';
            case 'hr_filter': return 'Filtro HR';
            case 'interview_scheduled': return 'Entrevista Programada';
            case 'interview_completed': return 'Entrevista Completada';
            default: return stage;
        }
    };

    /**
     * Retorna la clase de color según la prioridad de la aplicación.
     */
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'hr-app-priority-high';
            case 'medium': return 'hr-app-priority-medium';
            case 'low': return 'hr-app-priority-low';
            default: return 'hr-app-priority-medium';
        }
    };

    /**
     * Retorna el ícono visual para cada estado de la aplicación.
     */
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="hr-app-status-icon hr-app-icon-slate" />;
            case 'in_review': return <Eye className="hr-app-status-icon hr-app-icon-slate" />;
            case 'approved': return <CheckCircle className="hr-app-status-icon hr-app-icon-emerald" />;
            case 'rejected': return <XCircle className="hr-app-status-icon hr-app-icon-slate" />;
            default: return <AlertCircle className="hr-app-status-icon hr-app-icon-slate" />;
        }
    };

    /**
     * Simula una acción tomada sobre una aplicación.
     */
    const handleAction = (actionType: string, applicationId: string) => {
        console.log(`Executing ${actionType} for application ${applicationId}`);
    };

    /** Filtrado dinámico de aplicaciones según el filtro seleccionado */
    const filteredApplications = pendingApplications.filter(app => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'urgent') return app.priority === 'high' || app.stage === 'initial_review';
        if (selectedFilter === 'interviews') return app.stage === 'interview_scheduled' || app.stage === 'interview_completed';
        return app.stage === selectedFilter;
    });

    /** Número de aplicaciones urgentes */
    const urgentCount = pendingApplications.filter(app =>
        app.priority === 'high' || app.stage === 'initial_review'
    ).length;

    return (
        <div className="hr-applications-card">
            <div className="hr-applications-header">
                <h3 className="hr-applications-title">
                    <UserCheck className="hr-applications-title-icon" />
                    Aplicaciones Pendientes
                    {urgentCount > 0 && (
                        <span className="hr-applications-urgent-badge">
                            {urgentCount} urgentes
                        </span>
                    )}
                </h3>
                <div className="hr-applications-filter">
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="hr-applications-select"
                    >
                        <option value="all">Todas ({pendingApplications.length})</option>
                        <option value="urgent">Urgentes ({urgentCount})</option>
                        <option value="initial_review">Revisión Inicial</option>
                        <option value="hr_filter">Filtro HR</option>
                        <option value="interviews">Entrevistas</option>
                    </select>
                </div>
            </div>

            <div className="hr-applications-list">
                {filteredApplications.map((application) => (
                    <div key={application.id} className="hr-application-item">
                        {/* Header con información básica */}
                        <div className="hr-app-header">
                            <div className="hr-app-info">
                                <div className="hr-app-name-row">
                                    <h4 className="hr-app-name">{application.candidateName}</h4>
                                    <span className={`hr-app-stage-badge ${getStageColor(application.stage)}`}>
                                        {getStageText(application.stage)}
                                    </span>
                                    <span className={`hr-app-priority ${getPriorityColor(application.priority)}`}>
                                        <Star className="hr-app-priority-icon" />
                                        <span className="hr-app-priority-text">{application.priority}</span>
                                    </span>
                                </div>
                                <p className="hr-app-position">{application.position}</p>
                                <div className="hr-app-contact">
                                    <span className="hr-app-contact-item">
                                        <Mail className="hr-app-contact-icon" />
                                        {application.email}
                                    </span>
                                    <span className="hr-app-contact-item">
                                        <Phone className="hr-app-contact-icon" />
                                        {application.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="hr-app-status">
                                {getStatusIcon(application.status)}
                                <span className="hr-app-date">
                                    {new Date(application.appliedDate).toLocaleDateString('es-ES')}
                                </span>
                            </div>
                        </div>

                        {/* Información adicional */}
                        <div className="hr-app-details">
                            <div className="hr-app-details-row">
                                <span className="hr-app-experience">
                                    <strong className="hr-app-label">Experiencia:</strong> {application.experience}
                                </span>
                                {application.interviewDate && (
                                    <span className="hr-app-interview-date">
                                        <Calendar className="hr-app-interview-icon" />
                                        {new Date(application.interviewDate).toLocaleDateString('es-ES')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="hr-app-skills">
                            {application.skills.map((skill) => (
                                <span key={skill} className="hr-app-skill-tag">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* Notas si existen */}
                        {application.notes && (
                            <div className="hr-app-notes">
                                <span className="hr-app-notes-text">
                                    <MessageSquare className="hr-app-notes-icon" />
                                    {application.notes}
                                </span>
                            </div>
                        )}

                        {/* Acciones */}
                        <div className="hr-app-actions">
                            <div className="hr-app-actions-left">
                                <button
                                    onClick={() => handleAction('view', application.id)}
                                    className="hr-app-btn hr-app-btn-view"
                                >
                                    Ver Perfil
                                </button>
                                <button
                                    onClick={() => handleAction('contact', application.id)}
                                    className="hr-app-btn hr-app-btn-contact"
                                >
                                    Contactar
                                </button>
                                {application.stage === 'hr_filter' && (
                                    <button
                                        onClick={() => handleAction('interview', application.id)}
                                        className="hr-app-btn hr-app-btn-interview"
                                    >
                                        Programar Entrevista
                                    </button>
                                )}
                            </div>
                            <div className="hr-app-actions-right">
                                <button
                                    onClick={() => handleAction('approve', application.id)}
                                    className="hr-app-icon-btn hr-app-icon-btn-approve"
                                    title="Aprobar"
                                >
                                    <CheckCircle className="hr-app-action-icon" />
                                </button>
                                <button
                                    onClick={() => handleAction('reject', application.id)}
                                    className="hr-app-icon-btn hr-app-icon-btn-reject"
                                    title="Rechazar"
                                >
                                    <XCircle className="hr-app-action-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredApplications.length === 0 && (
                <div className="hr-applications-empty">
                    <UserCheck className="hr-applications-empty-icon" />
                    <p className="hr-applications-empty-text">No hay aplicaciones que coincidan con el filtro</p>
                </div>
            )}

            {/* Resumen de acciones */}
            <div className="hr-applications-summary">
                <div className="hr-applications-summary-grid">
                    <div className="hr-summary-item">
                        <p className="hr-summary-value hr-summary-slate">
                            {pendingApplications.filter(a => a.stage === 'initial_review').length}
                        </p>
                        <p className="hr-summary-label">Por Revisar</p>
                    </div>
                    <div className="hr-summary-item">
                        <p className="hr-summary-value hr-summary-slate">
                            {pendingApplications.filter(a => a.stage === 'hr_filter').length}
                        </p>
                        <p className="hr-summary-label">En Filtro</p>
                    </div>
                    <div className="hr-summary-item">
                        <p className="hr-summary-value hr-summary-emerald">
                            {pendingApplications.filter(a => a.stage === 'interview_scheduled').length}
                        </p>
                        <p className="hr-summary-label">Entrevistas</p>
                    </div>
                    <div className="hr-summary-item">
                        <p className="hr-summary-value hr-summary-emerald">
                            {pendingApplications.filter(a => a.stage === 'interview_completed').length}
                        </p>
                        <p className="hr-summary-label">Completadas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}