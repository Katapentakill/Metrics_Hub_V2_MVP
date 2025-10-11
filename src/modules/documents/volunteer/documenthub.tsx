// src/modules/documents/admin/documentHub.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  Filter
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
// DATA - Paleta Institucional
// ============================================================================

const sections: SectionConfig[] = [
  {
    title: 'Mis Documentos de Postulación',
    description: 'Accede a tu CV, portafolio y otros archivos que subiste durante el proceso de solicitud.',
    href: '/volunteer/documents/my-application-files',
    icon: Users,
    gradient: 'from-green-800 to-emerald-600',
    bgHover: 'hover:bg-green-50',
    stats: { label: 'Documents', value: 120, subValue: '+10 this week' },
  },
  {
    title: 'Documentos Firmados',
    description: 'Revisa tus acuerdos de voluntariado, políticas de confidencialidad y otros documentos oficiales firmados con la organización.',
    href: '/volunteer/documents/signed-documents',
    icon: Shield,
    gradient: 'from-teal-500 to-teal-600',
    bgHover: 'hover:bg-green-50',
    stats: { label: 'Volunteers', value: 60, subValue: '2 need review' },
  },
  {
    title: 'Guías y Recursos del Proyecto',
    description: 'Accede a manuales de herramientas, procedimientos, y otros recursos relevantes para tu trabajo.',
    href: '/volunteer/documents/project-resources',
    icon: Users,
    gradient: 'from-emerald-600 to-teal-500',
    bgHover: 'hover:bg-green-50',
    stats: { label: 'Files', value: 300, subValue: '50 pending' },
  },
  {
    title: 'Subir Nuevos Documentos',
    description: 'Sube cualquier documento adicional que te haya sido solicitado por el equipo de RR.HH.',
    href: '/volunteer/documents/upload',
    icon: Settings,
    gradient: 'from-green-800 to-green-800',
    bgHover: 'hover:bg-green-50',
    stats: { label: 'Pending', value: 12, subValue: '3 urgent' },
  },
];

const recentActivities: RecentActivity[] = [
  { id: '1', action: 'uploaded', user: 'Sarah Johnson', document: 'Q3 Financial Report.pdf', time: '5 min ago', type: 'upload' },
  { id: '2', action: 'approved', user: 'Admin User', document: 'Volunteer Certificate - John Doe', time: '12 min ago', type: 'approve' },
  { id: '3', action: 'reviewed', user: 'Mike Chen', document: 'Safety Protocol Update', time: '1 hour ago', type: 'review' },
  { id: '4', action: 'downloaded', user: 'Lisa Wang', document: 'Employee Handbook 2025', time: '2 hours ago', type: 'download' },
];

const ACTIVITY_COLOR_MAP = {
    upload: { icon: Upload, text: 'text-green-800', bg: 'bg-green-50', border: 'border-emerald-600' },
    approve: { icon: FileCheck, text: 'text-emerald-600', bg: 'bg-green-50', border: 'border-emerald-600' },
    review: { icon: AlertCircle, text: 'text-teal-500', bg: 'bg-green-50', border: 'border-teal-500' },
    download: { icon: Download, text: 'text-blue-500', bg: 'bg-green-50', border: 'border-blue-500' },
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
  const trendColor = isUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50';

  return (
    <div className="bg-green-50 rounded-xl p-5 shadow-sm border border-teal-500 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trendColor}`}>
            <TrendingUp className={`w-3 h-3 ${isUp ? 'text-emerald-600' : 'text-red-500 rotate-180'}`} />
            <span className="text-xs font-medium">{trend}</span>
          </div>
        )}
      </div>
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const SectionCard = ({ section }: { section: SectionConfig }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={section.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden bg-green-50 rounded-xl border-2 border-teal-500 block
        hover:shadow-2xl hover:-translate-y-2 
        transition-all duration-300 cursor-pointer
        ${section.bgHover}
      `}
    >
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${section.gradient}`} />
      
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`
              p-3 rounded-xl bg-gradient-to-br ${section.gradient} 
              shadow-sm transition-transform duration-300 flex-shrink-0
              ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}
            `}>
              <section.icon className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-green-800 transition-colors">
                {section.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`
                  px-3 py-1 rounded-full text-sm font-bold
                  bg-gradient-to-r ${section.gradient} text-white shadow-sm
                `}>
                  {section.stats.value}
                </span>
                <span className="text-xs font-medium text-gray-600">
                  {section.stats.label}
                </span>
              </div>
            </div>
          </div>
          
          <ArrowRight className={`
            w-6 h-6 text-slate-400 transition-all duration-300
            ${isHovered ? 'text-green-800 translate-x-1' : ''}
          `} />
        </div>

        {section.stats.subValue && (
          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3 ml-16">
            <Activity className="w-3 h-3" />
            <span>{section.stats.subValue}</span>
          </div>
        )}
      </div>
      
      <div className="px-6 pb-6">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {section.description}
        </p>
        
        <div className="pt-4 border-t border-slate-200">
          <span className={`
            text-sm font-medium transition-colors
            ${isHovered ? 'text-green-800' : 'text-slate-400'}
          `}>
            Explorar sección →
          </span>
        </div>
      </div>
    </a>
  );
};

const ActivityItem = ({ activity }: { activity: RecentActivity }) => {
  const config = ACTIVITY_COLOR_MAP[activity.type];
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-green-50 rounded-lg transition-colors border-l-4 border-transparent hover:border-teal-500">
      <div className={`p-2 rounded-lg ${config.bg} border ${config.border}`}>
        <Icon className={`w-4 h-4 ${config.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-800">
          <span className="font-semibold">{activity.user}</span>
          {' '}{activity.action}{' '}
          <span className="font-medium text-gray-600">{activity.document}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DocumentHub() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <FileText className="w-10 h-10 text-green-800" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Document Center</h1>
              <p className="text-gray-600 mt-1">
                Gestión centralizada de documentos organizacionales
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={FileText}
              label="Total Documents"
              value="450"
              trend="+8%"
              color="bg-gradient-to-br from-green-800 to-green-800"
            />
            <StatCard
              icon={Users}
              label="Active Users"
              value="89"
              trend="+5%"
              color="bg-gradient-to-br from-emerald-600 to-emerald-600"
            />
            <StatCard
              icon={AlertCircle}
              label="Pending Review"
              value="12"
              color="bg-gradient-to-br from-teal-500 to-teal-500"
            />
            <StatCard
              icon={BarChart3}
              label="Storage Used"
              value="2.4 GB"
              trend="+0.3 GB"
              color="bg-gradient-to-br from-blue-500 to-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Document Sections</h2>
              <p className="text-gray-600">Accede a las diferentes áreas de gestión documental</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <SectionCard key={section.title} section={section} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-green-50 rounded-xl shadow-sm border border-teal-500 p-6 sticky lg:top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-800" />
                  Recent Activity
                </h2>
                <button className="text-sm text-green-800 hover:text-emerald-600 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-2">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-white rounded-lg border border-emerald-600">
                    <p className="text-2xl font-bold text-emerald-600">34</p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-teal-500">
                    <p className="text-2xl font-bold text-teal-500">218</p>
                    <p className="text-xs text-gray-600">This Week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl shadow-sm border border-teal-500 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Quick Actions</h2>
              <p className="text-sm text-gray-600">Acciones rápidas para gestión eficiente</p>
            </div>
            <button className="text-sm text-slate-600 hover:text-green-800 flex items-center gap-1">
              <Settings className="w-4 h-4" />
              Customize
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="p-4 bg-green-800 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
              <Upload className="w-5 h-5" />
              <span className="font-medium">Upload Document</span>
            </button>
            <button className="p-4 bg-white border-2 border-slate-200 text-gray-600 rounded-xl hover:border-teal-500 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span className="font-medium">Recent Activity</span>
            </button>
            <button className="p-4 bg-white border-2 border-slate-200 text-gray-600 rounded-xl hover:border-teal-500 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-500" />
              <span className="font-medium">Generate Report</span>
            </button>
            <button className="p-4 bg-white border-2 border-slate-200 text-gray-600 rounded-xl hover:border-teal-500 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
              <Filter className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Advanced Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}