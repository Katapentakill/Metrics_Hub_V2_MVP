// src/modules/recruitment/volunteer/My-Application.tsx
import { 
  Briefcase, 
  UserCheck,
  Clock,
  ChevronRight,
  Sparkles,
  TrendingUp,
  CheckCircle,
  FileText,
  Calendar,
  ArrowRight
} from 'lucide-react';

const dashboardStats = [
  {
    title: 'Solicitudes Enviadas',
    value: 1,
    icon: Briefcase,
  },
  {
    title: 'En Proceso',
    value: 1,
    icon: Clock,
  },
  {
    title: 'Entrevistas Programadas',
    value: 0,
    icon: UserCheck,
  },
  {
    title: 'Tiempo de Respuesta',
    value: '3 días',
    icon: TrendingUp,
  },
];

const sections = [
  {
    title: 'Estado de mi Solicitud',
    description: 'Revisa el progreso de tu postulación, accede a la información de tus entrevistas y gestiona tus documentos.',
    href: '/volunteer/recruitment/application-status',
    icon: UserCheck,
  },
  {
    title: 'Vacantes Abiertas',
    description: 'Explora otras oportunidades de voluntariado y roles de empleo disponibles en la organización.',
    href: '/volunteer/recruitment/job-openings',
    icon: Briefcase,
  },
];

const StatsCard = ({ stat }: any) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 rounded-lg bg-green-50">
          <Icon className="w-5 h-5 text-green-600" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
    </div>
  );
};

const SectionCard = ({ section }: any) => {
  const Icon = section.icon;
  return (
    <a href={section.href} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-green-300 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
            <Icon className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              {section.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {section.description}
            </p>
            <div className="flex items-center text-green-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Ver más</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function MyApplicationPage() {
  const applicationData = {
    status: "En Revisión",
    progress: 65,
    role: "Asistente de Marketing Digital",
    team: "Marketing",
    appliedDate: "15 Sep 2025",
    nextStep: "Entrevista inicial"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">Mi Solicitud</h1>
                <Sparkles className="w-7 h-7 text-green-500" />
              </div>
              <p className="text-gray-600 text-lg">Panel personal de reclutamiento y oportunidades</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>

        {/* Current Application */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mi Aplicación Actual</h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    <h3 className="font-bold text-2xl text-gray-900">{applicationData.role}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">Equipo: <span className="font-semibold">{applicationData.team}</span></p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold border border-yellow-200">
                    <Clock className="w-4 h-4" />
                    {applicationData.status}
                  </span>
                </div>
                <a href="/volunteer/recruitment/application-status">
                  <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all hover:shadow-lg">
                    Ver Detalles
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Fecha de Aplicación</p>
                    <p className="text-sm font-bold text-gray-900">{applicationData.appliedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Progreso</p>
                    <p className="text-sm font-bold text-gray-900">{applicationData.progress}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Siguiente Paso</p>
                    <p className="text-sm font-bold text-gray-900">{applicationData.nextStep}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progreso del Proceso</span>
                  <span className="text-sm font-bold text-green-600">{applicationData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${applicationData.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acciones Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <SectionCard key={section.title} section={section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}