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
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-lg hover:border-emerald-500 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 rounded-lg bg-emerald-50">
          <Icon className="w-5 h-5 text-emerald-600" />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</p>
      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
    </div>
  );
};

const SectionCard = ({ section }: any) => {
  const Icon = section.icon;
  return (
    <a href={section.href} className="group block">
      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-emerald-500 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
            <Icon className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
              {section.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {section.description}
            </p>
            <div className="flex items-center text-emerald-600 font-medium text-sm group-hover:gap-2 transition-all">
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="p-4 bg-emerald-600 rounded-2xl shadow-lg">
                <UserCheck className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-slate-800">Mi Solicitud</h1>
                <Sparkles className="w-7 h-7 text-emerald-500" />
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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Mi Aplicación Actual</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="bg-emerald-50 border-b border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-2xl text-slate-800">{applicationData.role}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">Equipo: <span className="font-semibold">{applicationData.team}</span></p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold border border-slate-200">
                    <Clock className="w-4 h-4" />
                    {applicationData.status}
                  </span>
                </div>
                <a href="/volunteer/recruitment/application-status">
                  <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-500 transition-all hover:shadow-lg">
                    Ver Detalles
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-slate-200">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Fecha de Aplicación</p>
                    <p className="text-sm font-bold text-slate-800">{applicationData.appliedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Progreso</p>
                    <p className="text-sm font-bold text-slate-800">{applicationData.progress}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-slate-200">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-gray-600 font-medium">Siguiente Paso</p>
                    <p className="text-sm font-bold text-slate-800">{applicationData.nextStep}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progreso del Proceso</span>
                  <span className="text-sm font-bold text-emerald-600">{applicationData.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${applicationData.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Acciones Disponibles</h2>
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