'use client';

import { useState } from 'react';
// import Link from 'next/link'; // Original failing import

// FIX: Implementación SIMPLIFICADA del componente Link. Ahora es un DIV para evitar la anidación de <a>.
const Link: React.FC<{ href: string; children: React.ReactNode; legacyBehavior?: boolean }> = ({ children }) => {
  // Retornamos solo los children envueltos en un fragmento o div neutro
  return <>{children}</>;
};

import { 
  FileText, 
  Users, 
  Settings, 
  BookOpen, 
  ArrowRight, 
  Upload,
  Clock,
  TrendingUp,
  Shield,
  Activity,
  BarChart3,
  FileCheck,
  AlertCircle,
  Download,
  Search,
  Filter,
  FolderOpen
} from 'lucide-react';

// ============================================================================
// INTERFACES
// ============================================================================

interface SectionConfig {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgHover: string;
  stats: { 
    label: string; 
    value: string | number;
    subValue?: string;
  };
}

interface RecentActivity {
  id: string;
  action: string;
  user: string;
  document: string;
  time: string;
  type: 'upload' | 'approve' | 'review' | 'download';
}

// ============================================================================
// DATA (Colores Unificados: Esmeralda y Azul como primarios)
// ============================================================================

const sections: SectionConfig[] = [
  {
    title: 'Company Library',
    description: 'Documentos de referencia generales y recursos compartidos de la organización.',
    href: '/admin/documents/company-library',
    icon: BookOpen,
    // Usamos el color principal de la aplicación (Esmeralda)
    gradient: 'from-emerald-500 to-emerald-600',
    bgHover: 'hover:bg-emerald-50',
    stats: { label: 'Documents', value: 234, subValue: '+12 this week' },
  },
  {
    title: 'Policies & Guides',
    description: 'Políticas internas, procedimientos operativos y guías de cumplimiento.',
    href: '/admin/documents/policies-guides',
    icon: Shield,
    // Usamos Azul para el contraste secundario o áreas funcionales clave
    gradient: 'from-blue-500 to-blue-600',
    bgHover: 'hover:bg-blue-50',
    stats: { label: 'Policies', value: 48, subValue: '5 need review' },
  },
  {
    title: 'Volunteer Submissions',
    description: 'Documentos personales, certificaciones y materiales enviados por voluntarios, CPT/OPT.',
    href: '/admin/documents/volunteer-submissions',
    icon: Users,
    // Volvemos a Esmeralda/Azul o una variante neutra
    gradient: 'from-emerald-400 to-emerald-500',
    bgHover: 'hover:bg-emerald-50',
    stats: { label: 'Submissions', value: 156, subValue: '23 pending' },
  },
  {
    title: 'Document Management',
    description: 'Herramientas de administración, aprobación y organización documental.',
    href: '/admin/documents/management',
    icon: Settings,
    // Usamos Azul para el contraste secundario o áreas funcionales clave
    gradient: 'from-blue-400 to-blue-500',
    bgHover: 'hover:bg-blue-50',
    stats: { label: 'Pending', value: 12, subValue: '3 urgent' },
  },
];

const recentActivities: RecentActivity[] = [
  { id: '1', action: 'uploaded', user: 'Sarah Johnson', document: 'Q3 Financial Report.pdf', time: '5 min ago', type: 'upload' },
  { id: '2', action: 'approved', user: 'Admin User', document: 'Volunteer Certificate - John Doe', time: '12 min ago', type: 'approve' },
  { id: '3', action: 'reviewed', user: 'Mike Chen', document: 'Safety Protocol Update', time: '1 hour ago', type: 'review' },
  { id: '4', action: 'downloaded', user: 'Lisa Wang', document: 'Employee Handbook 2025', time: '2 hours ago', type: 'download' },
];

// Mapeo de colores para la actividad (usando Esmeralda, Azul, Naranja, Rojo)
const ACTIVITY_COLOR_MAP = {
    upload: { icon: Upload, text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-400' },
    approve: { icon: FileCheck, text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-400' },
    review: { icon: AlertCircle, text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-400' }, // Alerta
    download: { icon: Download, text: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-300' }, // Neutro
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

const StatCard = ({ label, value, trend, icon: Icon, color }: {
  label: string;
  value: string | number;
  trend?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) => {
  const isUp = trend && trend.includes('+');
  const trendColor = isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className={`w-5 h-5 text-white`} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendColor}`}>
            <TrendingUp className={`w-3 h-3 ${isUp ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
            <span className="text-xs font-medium">{trend}</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const SectionCard = ({ section }: { section: SectionConfig }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // FIX: El componente Link ahora es solo un contenedor (Fragmento),
    // y el enlace real (<a>) se maneja en el elemento interno.
    <Link href={section.href} legacyBehavior>
      <a
        href={section.href} // Añadimos el href directamente aquí
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative overflow-hidden bg-white rounded-xl border-2 border-gray-200 block
          hover:shadow-2xl hover:-translate-y-2 
          transition-all duration-300 cursor-pointer
          ${section.bgHover}
        `}
      >
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${section.gradient}`} />
        
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div className={`
                p-3 rounded-xl bg-gradient-to-br ${section.gradient} 
                shadow-lg transition-transform duration-300 flex-shrink-0
                ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
              `}>
                <section.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Title and Badge */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {section.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`
                    px-3 py-1 rounded-full text-sm font-bold
                    bg-gradient-to-r ${section.gradient} text-white shadow-sm
                  `}>
                    {section.stats.value}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {section.stats.label}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Arrow */}
            <ArrowRight className={`
              w-6 h-6 text-gray-400 transition-all duration-300
              ${isHovered ? 'text-gray-700 translate-x-1' : ''}
            `} />
          </div>

          {/* Sub-stat */}
          {section.stats.subValue && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 ml-16">
              <Activity className="w-3 h-3" />
              <span>{section.stats.subValue}</span>
            </div>
          )}
        </div>
        
        {/* Card Body */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {section.description}
          </p>
          
          {/* Action hint */}
          <div className="pt-4 border-t border-gray-100">
            <span className={`
              text-sm font-medium transition-colors
              ${isHovered ? 'text-emerald-600' : 'text-gray-400'}
            `}>
              Explorar sección →
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

const ActivityItem = ({ activity }: { activity: RecentActivity }) => {
  const config = ACTIVITY_COLOR_MAP[activity.type];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-gray-200">
      <div className={`p-2 rounded-lg ${config.bg}`}>
        <Icon className={`w-4 h-4 ${config.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{activity.user}</span>
          {' '}{activity.action}{' '}
          <span className="font-medium text-gray-700">{activity.document}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DocumentHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            {/* INICIO: Logo principal modificado a línea verde sin fondo */}
            
              <FileText className="w-8 h-8 mr-3 text-emerald-600" />
            
            {/* FIN: Logo principal modificado */}
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center">Document Center</h1>
              <p className="text-muted mt-1">
                Gestión centralizada de documentos organizacionales
              </p>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={FileText}
              label="Total Documents"
              value="450"
              trend="+8%"
              // Usando la paleta Esmeralda
              color="from-emerald-500 to-emerald-600"
            />
            <StatCard
              icon={Users}
              label="Active Users"
              value="89"
              trend="+5%"
              // Usando la paleta Azul
              color="from-blue-500 to-blue-600"
            />
            <StatCard
              icon={AlertCircle}
              label="Pending Review"
              value="12"
              // Usando la paleta Naranja/Alerta
              color="from-orange-500 to-red-600"
            />
            <StatCard
              icon={BarChart3}
              label="Storage Used"
              value="2.4 GB"
              trend="+0.3 GB"
              // Usando la paleta Neutra/Énfasis
              color="from-gray-500 to-gray-600"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Sections */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Sections</h2>
              <p className="text-gray-600">Accede a las diferentes áreas de gestión documental</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>

          {/* Right Column - Activity Feed */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky lg:top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" />
                  Recent Activity
                </h2>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>

              {/* Activity Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">34</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="text-2xl font-bold text-emerald-600">218</p>
                    <p className="text-xs text-gray-600">This Week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Quick Actions</h2>
              <p className="text-sm text-gray-600">Acciones rápidas para gestión eficiente</p>
            </div>
            <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <Settings className="w-4 h-4" />
              Customize
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Document</span>
            </button>
            <button className="p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Recent Activity</span>
            </button>
            <button className="p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Generate Report</span>
            </button>
            <button className="p-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Advanced Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
