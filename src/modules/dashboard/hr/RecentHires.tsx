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
            case 'completed': return 'bg-emerald-100 text-emerald-800';
            case 'in_progress': return 'bg-gray-100 text-slate-700';
            case 'pending': return 'bg-gray-100 text-slate-700';
            default: return 'bg-gray-100 text-slate-700';
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
                    <UserPlus className="w-5 h-5 mr-2 text-emerald-600" />
                    Nuevas Contrataciones
                    <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                        +{stats.thisMonth} este mes
                    </span>
                </h3>
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
                    className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                    <option value="week">Esta semana</option>
                    <option value="month">Este mes</option>
                    <option value="quarter">Este trimestre</option>
                </select>
            </div>

            {/* Estadísticas principales de contratación */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-emerald-50 rounded-lg">
                <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{stats.thisMonth}</p>
                    <p className="text-xs text-gray-600">Este Mes</p>
                    <div className="flex items-center justify-center mt-1">
                        {stats.thisMonth > stats.lastMonth ? (
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                            <span className="text-xs text-gray-600">vs {stats.lastMonth} anterior</span>
                        )}
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-600">{stats.averageTimeToHire}</p>
                    <p className="text-xs text-gray-600">Días Promedio</p>
                    <p className="text-xs text-gray-600">Para Contratar</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">{stats.retention90Days}%</p>
                    <p className="text-xs text-gray-600">Retención</p>
                    <p className="text-xs text-gray-600">90 días</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-slate-600">{stats.thisQuarter}</p>
                    <p className="text-xs text-gray-600">Este Trimestre</p>
                    <p className="text-xs text-gray-600">Total</p>
                </div>
            </div>

            {/* Lista de nuevas contrataciones */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-700">
                    Últimas Contrataciones ({filteredHires.length})
                </h4>
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {filteredHires.map((hire) => (
                        <div key={hire.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md hover:border-emerald-200 transition-all">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {hire.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-slate-800">{hire.name}</h5>
                                        <p className="text-sm text-gray-600">{hire.position}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-gray-600">{hire.department}</span>
                                            <span className="text-xs text-slate-400">•</span>
                                            <span className="flex items-center text-xs text-gray-600">
                                                <MapPin className="w-3 h-3 mr-1 text-slate-400" />
                                                {hire.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-xs">{getSourceIcon(hire.source)}</span>
                                        <span className="text-xs text-gray-600">{getSourceLabel(hire.source)}</span>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOnboardingStatusColor(hire.onboardingStatus)}`}>
                                        {getOnboardingStatusText(hire.onboardingStatus)}
                                    </span>
                                </div>
                            </div>

                            {/* Información adicional */}
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center text-gray-600">
                                            <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                                            Contratado: {new Date(hire.hireDate).toLocaleDateString('es-ES')}
                                        </span>
                                        <span className="flex items-center text-gray-600">
                                            <Clock className="w-3 h-3 mr-1 text-slate-400" />
                                            Inicio: {new Date(hire.startDate).toLocaleDateString('es-ES')}
                                        </span>
                                    </div>
                                    <span className="flex items-center text-gray-600">
                                        <Briefcase className="w-3 h-3 mr-1 text-slate-400" />
                                        {hire.experience}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-600">
                                        <strong className="text-slate-700">Mentor:</strong> {hire.mentor}
                                    </span>
                                    <span className="flex items-center text-gray-600">
                                        <Award className="w-3 h-3 mr-1 text-slate-400" />
                                        {hire.skills.length} skills
                                    </span>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-3">
                                <div className="flex flex-wrap gap-1">
                                    {hire.skills.slice(0, 3).map((skill) => (
                                        <span key={skill} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                    {hire.skills.length > 3 && (
                                        <span className="px-2 py-1 bg-gray-100 text-slate-600 text-xs rounded font-medium">
                                            +{hire.skills.length - 3} más
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Notas */}
                            {hire.notes && (
                                <div className="mb-3 p-2 bg-emerald-50 rounded text-xs">
                                    <span className="flex items-center text-emerald-700 font-medium">
                                        <MessageCircle className="w-3 h-3 mr-1" />
                                        {hire.notes}
                                    </span>
                                </div>
                            )}

                            {/* Acciones */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleViewProfile(hire.id)}
                                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 rounded transition-colors font-medium"
                                    >
                                        Ver Perfil
                                    </button>
                                    <button
                                        onClick={() => handleContactHire(hire.id, 'email')}
                                        className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors flex items-center font-medium"
                                    >
                                        <Mail className="w-3 h-3 mr-1" />
                                        Email
                                    </button>
                                    <button
                                        onClick={() => handleContactHire(hire.id, 'phone')}
                                        className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors flex items-center font-medium"
                                    >
                                        <Phone className="w-3 h-3 mr-1" />
                                        Llamar
                                    </button>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {hire.onboardingStatus === 'completed' && (
                                        <div title="Onboarding completado">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 cursor-help" />
                                        </div>
                                    )}
                                    <div title="Agregar a favoritos">
                                        <Star className="w-4 h-4 text-slate-400 cursor-pointer hover:text-emerald-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Distribución por fuente */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-700 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-slate-400" />
                    Fuentes de Reclutamiento más Efectivas
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(sourceDistribution)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 4)
                        .map(([source, count]) => (
                            <div key={source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg">{getSourceIcon(source)}</span>
                                    <span className="text-sm text-slate-700">{getSourceLabel(source)}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold text-slate-800">{count}</p>
                                    <p className="text-xs text-gray-600">
                                        {Math.round((count / recentHires.length) * 100)}%
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Acciones rápidas */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                <button className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors font-medium">
                    Generar Reporte de Contrataciones
                </button>
                <button className="px-3 py-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded transition-colors font-medium">
                    Programar Check-in 30 días
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 rounded transition-colors font-medium">
                    Analizar Retención
                </button>
                <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-slate-700 rounded transition-colors font-medium">
                    Exportar Lista
                </button>
            </div>

            {/* Mensaje cuando no hay contrataciones */}
            {filteredHires.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                    <UserPlus className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm">No hay contrataciones en el período seleccionado</p>
                    <p className="text-xs mt-1">Prueba seleccionando un período más amplio</p>
                </div>
            )}
        </div>
    );
}