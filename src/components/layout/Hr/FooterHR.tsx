// src/components/layout/FooterAdmin.tsx
import { Shield, Database, Users, Settings, BarChart3, AlertCircle } from 'lucide-react';

export default function FooterHR() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda: logo + descripción */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Living Stones HR</h3>
              <p className="text-sm text-slate-400">Panel de Recursos Humanos</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Sistema de gestión de voluntarios enfocado en administración de usuarios, proyectos, 
            aplicaciones y evaluaciones. Acceso exclusivo para HR.
          </p>
        </div>

        {/* Columna derecha: enlaces rápidos */}
        <div>
          <h4 className="text-white font-semibold mb-4">Gestión Rápida</h4>
          <div className="space-y-2">
            <a href="/hr/users" className="block text-sm hover:text-emerald-400 transition-colors">
              Administrar Usuarios
            </a>
            <a href="/hr/projects" className="block text-sm hover:text-emerald-400 transition-colors">
              Supervisar Proyectos
            </a>
            <a href="/hr/applications" className="block text-sm hover:text-emerald-400 transition-colors">
              Aplicaciones Pendientes
            </a>
            <a href="/hr/evaluations" className="block text-sm hover:text-emerald-400 transition-colors">
              Sistema de Evaluaciones
            </a>
            <a href="/hr/reports" className="block text-sm hover:text-emerald-400 transition-colors">
              Reportes Ejecutivos
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
                Como miembro de Recursos Humanos, tienes acceso a la gestión de voluntarios, proyectos y evaluaciones. Usa estos privilegios responsablemente y protege la confidencialidad de la información de los usuarios
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}