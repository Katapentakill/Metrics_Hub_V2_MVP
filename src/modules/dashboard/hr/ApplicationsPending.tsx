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
            case 'initial_review': return 'bg-blue-100 text-blue-800';
            case 'hr_filter': return 'bg-yellow-100 text-yellow-800';
            case 'interview_scheduled': return 'bg-purple-100 text-purple-800';
            case 'interview_completed': return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
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
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-green-600';
            default: return 'text-slate-600';
        }
    };

    /**
     * Retorna el ícono visual para cada estado de la aplicación.
     */
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'in_review': return <Eye className="w-4 h-4 text-blue-500" />;
            case 'approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
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
            {/* Header con filtros */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                    Aplicaciones Pendientes
                    {urgentCount > 0 && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            {urgentCount} urgentes
                        </span>
                    )}
                </h3>
                <div className="flex space-x-2">
                    <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="text-xs border border-slate-200 rounded px-2 py-1"
                    >
                        <option value="all">Todas ({pendingApplications.length})</option>
                        <option value="urgent">Urgentes ({urgentCount})</option>
                        <option value="initial_review">Revisión Inicial</option>
                        <option value="hr_filter">Filtro HR</option>
                        <option value="interviews">Entrevistas</option>
                    </select>
                </div>
            </div>

            {/* Lista de aplicaciones */}
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                {filteredApplications.map((application) => (
                    <div key={application.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        {/* Header con información básica */}
                        {/* ... resto del render que ya tenías ... */}
                    </div>
                ))}
            </div>
        </div>
    );
}
