// ===============================
// FOOTER ADMIN
// ===============================
import { Shield, Database, Users, Settings, BarChart3, AlertCircle, MessageSquare, FileText, UserPlus, ClipboardList } from 'lucide-react';

export function FooterAdmin() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del admin */}
          <div className="col-span-1 md:col-span-3 space-y-4">
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
              evaluaciones y configuraciones del sistema.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-slate-400" />
                <span>Administrar Usuarios</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Supervisar Proyectos</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4 text-yellow-400" />
                <span>Sistema de Evaluaciones</span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>Configuración del Sistema</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Operativo</span>
              </div>
              <div>
                <span className="text-slate-500">Versión Admin 1.0.0</span>
              </div>
            </div>
            
            <div className="text-xs text-slate-500">
              © 2024 Living Stones Admin Panel
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}