// src/components/layout/Lead/FooterLead.tsx
'use client';

import { 
  Heart, 
  FolderOpen, 
  Users, 
  Target, 
  BarChart3,
  Calendar,
  MessageSquare,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

export default function FooterLead() {
  const currentYear = new Date().getFullYear();

  const quickStats = [
    { label: 'Proyectos Activos', value: '6', icon: FolderOpen, color: 'text-emerald-600' },
    { label: 'Miembros del Equipo', value: '22', icon: Users, color: 'text-blue-600' },
    { label: 'Tareas Completadas', value: '98', icon: Target, color: 'text-green-600' },
    { label: 'Productividad', value: '87%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const quickLinks = [
    { name: 'Dashboard', href: '/lead_project/dashboard', icon: BarChart3 },
    { name: 'Mis Proyectos', href: '/lead_project/projects', icon: FolderOpen },
    { name: 'Gestionar Equipo', href: '/lead_project/team', icon: Users },
    { name: 'Cronograma', href: '/lead_project/schedule', icon: Calendar }
  ];

  const projectLinks = [
    { name: 'Crear Nueva Tarea', href: '/lead_project/tasks/new', icon: Target },
    { name: 'Reportes de Progreso', href: '/lead_project/reports', icon: BarChart3 },
    { name: 'Comunicación del Equipo', href: '/lead_project/communications', icon: MessageSquare },
    { name: 'Configuración', href: '/lead_project/settings', icon: Clock }
  ];

  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white">
      {/* Stats Bar */}
      <div className="bg-emerald-800/50 backdrop-blur-sm border-b border-emerald-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-xs text-emerald-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Living Stones</h3>
                <p className="text-sm text-emerald-300">Líder de Proyecto</p>
              </div>
            </div>
            <p className="text-emerald-200 text-sm mb-4 leading-relaxed">
              Administra y coordina proyectos de impacto social. Lidera equipos hacia el éxito y el crecimiento sostenible.
            </p>
            <div className="flex items-center space-x-2 text-emerald-300">
              <Award className="w-4 h-4" />
              <span className="text-sm">Líder certificado en gestión de proyectos</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Acciones Rápidas
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="flex items-center space-x-2 text-emerald-200 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Project Management */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <FolderOpen className="w-4 h-4 mr-2" />
              Gestión de Proyectos
            </h4>
            <ul className="space-y-3">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="flex items-center space-x-2 text-emerald-200 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status & Updates */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Estado Actual
            </h4>
            <div className="space-y-4">
              <div className="bg-emerald-800/50 rounded-lg p-3 border border-emerald-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-200 text-sm">Proyectos Este Mes</span>
                  <span className="text-white font-semibold">6 activos</span>
                </div>
                <div className="w-full bg-emerald-700 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="bg-emerald-800/50 rounded-lg p-3 border border-emerald-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-200 text-sm">Eficiencia del Equipo</span>
                  <span className="text-white font-semibold">87%</span>
                </div>
                <div className="w-full bg-emerald-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>

              <div className="text-emerald-200 text-xs">
                <p>✅ Todos los deadlines bajo control</p>
                <p>📈 Productividad por encima del objetivo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-700/50 bg-emerald-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-emerald-300 text-sm">
              <span>© {currentYear} Living Stones Foundation</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Panel de Líder de Proyecto</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-emerald-200 text-sm flex items-center">
                Desarrollado con <Heart className="w-4 h-4 mx-1 text-red-400" /> para el cambio social
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Hint */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-full shadow-lg transition-colors cursor-pointer group">
          <Target className="w-5 h-5" />
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Crear nueva tarea
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 -ml-1 w-2 h-2 bg-slate-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}