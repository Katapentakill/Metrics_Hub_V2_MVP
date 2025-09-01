// src/components/layout/FooterAdmin.tsx
import { Shield, Database, Users, Settings, BarChart3, AlertCircle } from 'lucide-react';

export default function FooterAdmin() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción del admin */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Living Stones Admin</h3>
                <p className="text-sm text-slate-400">Panel de Control Administrativo</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Sistema completo de gestión de voluntarios con control total sobre usuarios, proyectos, 
              evaluaciones y configuraciones del sistema. Acceso privilegiado para administradores.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>SQLite Database</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-400" />
                <span>50+ Usuarios</span>
              </div>
              <div className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <span>Analytics Avanzado</span>
              </div>
            </div>
          </div>

          {/* Accesos rápidos de administración */}
          <div>
            <h4 className="text-white font-semibold mb-4">Gestión Rápida</h4>
            <div className="space-y-2">
              <a href="/admin/users" className="block text-sm hover:text-emerald-400 transition-colors">
                Administrar Usuarios
              </a>
              <a href="/admin/projects" className="block text-sm hover:text-emerald-400 transition-colors">
                Supervisar Proyectos
              </a>
              <a href="/admin/applications" className="block text-sm hover:text-emerald-400 transition-colors">
                Aplicaciones Pendientes
              </a>
              <a href="/admin/evaluations" className="block text-sm hover:text-emerald-400 transition-colors">
                Sistema de Evaluaciones
              </a>
              <a href="/admin/reports" className="block text-sm hover:text-emerald-400 transition-colors">
                Reportes Ejecutivos
              </a>
            </div>
          </div>

          {/* Configuración y herramientas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Configuración</h4>
            <div className="space-y-2">
              <a href="/admin/settings/system" className="block text-sm hover:text-emerald-400 transition-colors">
                <Settings className="w-4 h-4 inline mr-2" />
                Configuración Sistema
              </a>
              <a href="/admin/settings/roles" className="block text-sm hover:text-emerald-400 transition-colors">
                Gestión de Roles
              </a>
              <a href="/admin/settings/notifications" className="block text-sm hover:text-emerald-400 transition-colors">
                Notificaciones Globales
              </a>
              <a href="/admin/logs" className="block text-sm hover:text-emerald-400 transition-colors">
                Logs del Sistema
              </a>
              <a href="/admin/backup" className="block text-sm hover:text-emerald-400 transition-colors">
                Respaldos y Seguridad
              </a>
            </div>
          </div>
        </div>

        {/* Información del sistema y alertas */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Operativo</span>
              </div>
              <div>
                <span className="text-slate-500">Versión Admin 1.0.0</span>
              </div>
              <div>
                <span className="text-slate-500">Última sincronización: {new Date().toLocaleString('es-ES')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Estado del Sistema</span>
              </button>
              <div className="text-xs text-slate-500">
                © 2024 Living Stones Admin Panel
              </div>
            </div>
          </div>
        </div>

        {/* Notas importantes para administradores */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <h5 className="text-white font-medium text-sm">Nota de Seguridad</h5>
              <p className="text-xs text-slate-400 mt-1">
                Como administrador, tienes acceso completo al sistema. Usa estos privilegios responsablemente 
                y mantén la confidencialidad de la información de usuarios y proyectos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}