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
     * Retorna la clase de color según la etapa de selección.
     */
    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'initial_review': return 'bg-gray-100 text-slate-700';
            case 'hr_filter': return 'bg-gray-100 text-slate-700';
            case 'interview_scheduled': return 'bg-emerald-100 text-emerald-800';
            case 'interview_completed': return 'bg-emerald-100 text-emerald-800';
            default: return 'bg-gray-100 text-slate-700';
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
            case 'high': return 'text-emerald-600';
            case 'medium': return 'text-slate-600';
            case 'low': return 'text-gray-500';
            default: return 'text-slate-600';
        }
    };

    /**
     * Retorna el ícono visual para cada estado de la aplicación.
     */
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 text-slate-500" />;
            case 'in_review': return <Eye className="w-4 h-4 text-slate-600" />;
            case 'approved': return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'rejected': return <XCircle className="w-4 h-4 text-slate-500" />;
            default: return <AlertCircle className="w-4 h-4 text-slate-500" />;
        }
    };

    /**
     * Simula una acción tomada sobre una aplicación.
     *
     * @param {string} actionType - Tipo de acción (e.g., "approve", "reject").
     * @param {string} applicationId - ID de la aplicación a modificar.
     */
    const handleAction = (actionType: string, applicationId: string) => {
        console.log(`Executing ${actionType} for application ${applicationId}`);
        // Aquí iría la lógica real de backend/API
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
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-emerald-600" />
                    Aplicaciones Pendientes
                    {urgentCount > 0 && (
                        <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                            {urgentCount} urgentes
                        </span>
                    )}
                </h3>
                <div className="flex space-x-2">
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    >
                        <option value="all">Todas ({pendingApplications.length})</option>
                        <option value="urgent">Urgentes ({urgentCount})</option>
                        <option value="initial_review">Revisión Inicial</option>
                        <option value="hr_filter">Filtro HR</option>
                        <option value="interviews">Entrevistas</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {filteredApplications.map((application) => (
                    <div key={application.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-emerald-200 transition-all">
                        {/* Header con información básica */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-semibold text-slate-800">{application.candidateName}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(application.stage)}`}>
                                        {getStageText(application.stage)}
                                    </span>
                                    <span className={`flex items-center ${getPriorityColor(application.priority)}`}>
                                        <Star className="w-3 h-3 mr-1" />
                                        <span className="text-xs capitalize font-medium">{application.priority}</span>
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{application.position}</p>
                                <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    <span className="flex items-center">
                                        <Mail className="w-3 h-3 mr-1 text-slate-400" />
                                        {application.email}
                                    </span>
                                    <span className="flex items-center">
                                        <Phone className="w-3 h-3 mr-1 text-slate-400" />
                                        {application.phone}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {getStatusIcon(application.status)}
                                <span className="text-xs text-gray-600">
                                    {new Date(application.appliedDate).toLocaleDateString('es-ES')}
                                </span>
                            </div>
                        </div>

                        {/* Información adicional */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-4 text-xs">
                                <span className="text-gray-600">
                                    <strong className="text-slate-700">Experiencia:</strong> {application.experience}
                                </span>
                                {application.interviewDate && (
                                    <span className="flex items-center text-emerald-600 font-medium">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(application.interviewDate).toLocaleDateString('es-ES')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                                {application.skills.map((skill) => (
                                    <span key={skill} className="px-2 py-1 bg-gray-100 text-slate-700 text-xs rounded font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Notas si existen */}
                        {application.notes && (
                            <div className="mb-3 p-2 bg-emerald-50 rounded text-xs">
                                <span className="flex items-center text-emerald-700 font-medium">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    {application.notes}
                                </span>
                            </div>
                        )}

                        {/* Acciones */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleAction('view', application.id)}
                                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 rounded transition-colors font-medium"
                                >
                                    Ver Perfil
                                </button>
                                <button
                                    onClick={() => handleAction('contact', application.id)}
                                    className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors font-medium"
                                >
                                    Contactar
                                </button>
                                {application.stage === 'hr_filter' && (
                                    <button
                                        onClick={() => handleAction('interview', application.id)}
                                        className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors font-medium"
                                    >
                                        Programar Entrevista
                                    </button>
                                )}
                            </div>
                            <div className="flex space-x-1">
                                <button
                                    onClick={() => handleAction('approve', application.id)}
                                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                    title="Aprobar"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleAction('reject', application.id)}
                                    className="p-1 text-slate-600 hover:bg-gray-50 rounded transition-colors"
                                    title="Rechazar"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredApplications.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                    <UserCheck className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm">No hay aplicaciones que coincidan con el filtro</p>
                </div>
            )}

            {/* Resumen de acciones */}
            <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-lg font-semibold text-slate-600">
                            {pendingApplications.filter(a => a.stage === 'initial_review').length}
                        </p>
                        <p className="text-xs text-gray-600">Por Revisar</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-slate-600">
                            {pendingApplications.filter(a => a.stage === 'hr_filter').length}
                        </p>
                        <p className="text-xs text-gray-600">En Filtro</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-emerald-600">
                            {pendingApplications.filter(a => a.stage === 'interview_scheduled').length}
                        </p>
                        <p className="text-xs text-gray-600">Entrevistas</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-emerald-600">
                            {pendingApplications.filter(a => a.stage === 'interview_completed').length}
                        </p>
                        <p className="text-xs text-gray-600">Completadas</p>
                    </div>
                </div>
            </div>
        </div>
    );
}