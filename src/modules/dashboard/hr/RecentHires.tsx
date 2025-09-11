// src/modules/dashboard/hr/RecentHires.tsx
'use client';

import {
    UserPlus,
    Calendar,
    MapPin,
    Briefcase,
    Clock,
    Award,
    TrendingUp,
    Users,
    CheckCircle,
    Star,
    MessageCircle,
    Mail,
    Phone
} from 'lucide-react';
import { useState } from 'react';

/**
 * Representa una contratación reciente.
 */
interface RecentHire {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    hireDate: string;
    startDate: string;
    location: string;
    experience: string;
    /** Fuente del candidato */
    source: 'website' | 'referral' | 'linkedin' | 'university' | 'other';
    /** Estado del proceso de onboarding */
    onboardingStatus: 'pending' | 'in_progress' | 'completed';
    mentor: string;
    skills: string[];
    photo?: string;
    notes?: string;
}

/**
 * Métricas y estadísticas de contratación.
 */
interface HiringStats {
    /** Contrataciones de este mes */
    thisMonth: number;
    /** Contrataciones del mes anterior */
    lastMonth: number;
    /** Contrataciones del trimestre */
    thisQuarter: number;
    /** Tiempo promedio para contratar */
    averageTimeToHire: number;
    /** Retención en 90 días */
    retention90Days: number;
    /** Fuente principal de reclutamiento */
    topSource: string;
}

/**
 * RecentHires Component
 *
 * Muestra las contrataciones más recientes, estadísticas de reclutamiento,
 * estado de onboarding, distribución por fuentes y acciones rápidas.
 *
 * @component
 * @returns {JSX.Element} Vista con lista de nuevas contrataciones.
 *
 * @example
 * <RecentHires />
 */
export default function RecentHires() {
    const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

    /** Lista de contrataciones recientes */
    const recentHires: RecentHire[] = [
        {
            id: '1',
            name: 'María González',
            email: 'maria.gonzalez@livingstone.org',
            phone: '+57 300 123 4567',
            position: 'Desarrolladora Frontend',
            department: 'Tecnología',
            hireDate: '2024-02-15',
            startDate: '2024-02-20',
            location: 'Bogotá, Colombia',
            experience: '3 años',
            source: 'linkedin',
            onboardingStatus: 'in_progress',
            mentor: 'Carlos Ruiz',
            skills: ['React', 'TypeScript', 'Tailwind CSS'],
            notes: 'Excelente portafolio, muy motivada'
        },
        {
            id: '2',
            name: 'Diego Morales',
            email: 'diego.morales@livingstone.org',
            phone: '+57 301 987 6543',
            position: 'Especialista en Marketing',
            department: 'Marketing',
            hireDate: '2024-02-12',
            startDate: '2024-02-19',
            location: 'Medellín, Colombia',
            experience: '2 años',
            source: 'website',
            onboardingStatus: 'completed',
            mentor: 'Ana Martínez',
            skills: ['SEO', 'Google Ads', 'Content Marketing']
        },
        {
            id: '3',
            name: 'Laura Pérez',
            email: 'laura.perez@livingstone.org',
            phone: '+57 302 456 7890',
            position: 'Coordinadora de Proyectos',
            department: 'Operaciones',
            hireDate: '2024-02-08',
            startDate: '2024-02-12',
            location: 'Cali, Colombia',
            experience: '4 años',
            source: 'referral',
            onboardingStatus: 'completed',
            mentor: 'Pedro Sánchez',
            skills: ['Project Management', 'Scrum', 'Leadership']
        },
        {
            id: '4',
            name: 'Andrés Silva',
            email: 'andres.silva@livingstone.org',
            phone: '+57 303 789 0123',
            position: 'Diseñador UX/UI',
            department: 'Diseño',
            hireDate: '2024-02-05',
            startDate: '2024-02-08',
            location: 'Barranquilla, Colombia',
            experience: '1 año',
            source: 'university',
            onboardingStatus: 'completed',
            mentor: 'Sofia López',
            skills: ['Figma', 'User Research', 'Prototyping']
        },
        {
            id: '5',
            name: 'Camila Torres',
            email: 'camila.torres@livingstone.org',
            phone: '+57 304 234 5678',
            position: 'Voluntaria de Comunicaciones',
            department: 'Comunicaciones',
            hireDate: '2024-01-28',
            startDate: '2024-02-01',
            location: 'Bogotá, Colombia',
            experience: 'Recién graduada',
            source: 'website',
            onboardingStatus: 'completed',
            mentor: 'Roberto García',
            skills: ['Redes Sociales', 'Redacción', 'Fotografía']
        }
    ];

    /** Estadísticas de contrataciones */
    const stats: HiringStats = {
        thisMonth: 5,
        lastMonth: 3,
        thisQuarter: 12,
        averageTimeToHire: 28,
        retention90Days: 94,
        topSource: 'website'
    };

    /** Retorna el icono correspondiente a la fuente de reclutamiento */
    const getSourceIcon = (source: string) => {
        switch (source) {
            case 'linkedin': return '💼';
            case 'website': return '🌐';
            case 'referral': return '👥';
            case 'university': return '🎓';
            default: return '📝';
        }
    };

    /** Retorna la etiqueta legible de la fuente de reclutamiento */
    const getSourceLabel = (source: string) => {
        switch (source) {
            case 'linkedin': return 'LinkedIn';
            case 'website': return 'Sitio Web';
            case 'referral': return 'Referido';
            case 'university': return 'Universidad';
            default: return 'Otro';
        }
    };

    /** Retorna los estilos de color para el estado del onboarding */
    const getOnboardingStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    /** Retorna el texto legible del estado del onboarding */
    const getOnboardingStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Completado';
            case 'in_progress': return 'En Progreso';
            case 'pending': return 'Pendiente';
            default: return status;
        }
    };

    /** Acción para contactar a una contratación reciente */
    const handleContactHire = (hireId: string, method: 'email' | 'phone') => {
        console.log(`Contacting hire ${hireId} via ${method}`);
        // Aquí iría la lógica real
    };

    /** Acción para ver el perfil de una contratación reciente */
    const handleViewProfile = (hireId: string) => {
        console.log(`Viewing profile for hire ${hireId}`);
        // Aquí iría la lógica real
    };

    /** Filtrado de contrataciones según el período seleccionado */
    const filteredHires = recentHires.filter(hire => {
        const hireDate = new Date(hire.hireDate);
        const now = new Date();

        if (selectedPeriod === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return hireDate >= weekAgo;
        } else if (selectedPeriod === 'month') {
            return hireDate.getMonth() === now.getMonth() && hireDate.getFullYear() === now.getFullYear();
        } else {
            const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
            return hireDate >= quarterStart;
        }
    });

    /** Distribución de contrataciones por fuente de reclutamiento */
    const sourceDistribution = recentHires.reduce((acc, hire) => {
        acc[hire.source] = (acc[hire.source] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="card p-6 space-y-6">
            {/* Header con título y selector de período */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-green-600" />
                    Nuevas Contrataciones
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        +{stats.thisMonth} este mes
                    </span>
                </h3>
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
                    className="text-xs border border-slate-200 rounded px-2 py-1"
                >
                    <option value="week">Esta semana</option>
                    <option value="month">Este mes</option>
                    <option value="quarter">Este trimestre</option>
                </select>
            </div>

            {/* Estadísticas principales de contratación */}
            {/* ... (resto del JSX sin cambios, ya documentado arriba con funciones y comentarios) */}
        </div>
    );
}
