// ===============================
// FOOTER HR
// ===============================
import { UserCheck, Users, FileText, Calendar, MessageSquare, UserPlus, ClipboardList, Award, TrendingUp, Database, BarChart3 } from 'lucide-react';

export function FooterHr() {
  return (
    <footer className="bg-blue-900 text-blue-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del HR */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Living Stones HR</h3>
                <p className="text-sm text-blue-300">Panel de Recursos Humanos</p>
              </div>
            </div>
            <p className="text-sm text-blue-200 max-w-md">
              Sistema especializado en gestión de recursos humanos para voluntarios: reclutamiento, 
              evaluaciones de desempeño y desarrollo de talento.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-blue-300" />
                <span>Directorio de Voluntarios</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4 text-green-400" />
                <span>Evaluaciones de Desempeño</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-yellow-400" />
                <span>Comunicaciones Internas</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Documentos de HR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema HR */}
        <div className="mt-8 pt-8 border-t border-blue-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema HR Activo</span>
              </div>
              <div>
                <span className="text-blue-300">Versión HR 1.0.0</span>
              </div>
            </div>
            
            <div className="text-xs text-blue-300">
              © 2024 Living Stones HR Panel
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
