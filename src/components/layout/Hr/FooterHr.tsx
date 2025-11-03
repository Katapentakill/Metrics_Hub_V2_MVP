// src/components/layout/Hr/FooterHr.tsx
import { useSidebar } from '@/contexts/SidebarContext';
import { UserCheck, Users, FileText, MessageSquare, ClipboardList } from 'lucide-react';
import Image from 'next/image';

export function FooterHr() {
  const { isCollapsed } = useSidebar();

  return (
    <footer className={`bg-green-900 text-green-50 mt-20 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del HR */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src='/images/logo-lsf-usa-white-icono.png' alt='logo-lsf-usa-icono (1)' width={36} height={36}/>
              <div>
                <h3 className="text-2xl font-bold text-white">Living Stones HR</h3>
                <p className="text-sm text-green-100">Panel de Recursos Humanos</p>
              </div>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Sistema especializado en gestión de recursos humanos para voluntarios: reclutamiento, 
              evaluaciones de desempeño y desarrollo de talento.
            </p>
            <div className="flex items-center space-x-4 text-xs text-green-100">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-green-300" />
                <span>Directorio de Voluntarios</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4 text-green-300" />
                <span>Evaluaciones de Desempeño</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-green-300" />
                <span>Comunicaciones Internas</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4 text-green-300" />
                <span>Documentos de HR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema HR */}
        <div className="border-t border-green-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-green-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema HR Activo</span>
              </div>
              <div>
                <span>Versión HR 1.0.0</span>
              </div>
            </div>
            
            <div className="text-sm text-green-200">
              © 2024 Living Stones HR Panel
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}