// src/components/layout/Lead/FooterLead.tsx
import { useSidebar } from '@/contexts/SidebarContext';
import { Star, Users, CheckSquare, ClipboardList, Target } from 'lucide-react';
import Image from 'next/image';

export function FooterLead() {
  const { isCollapsed } = useSidebar();

  return (
    <footer className={`bg-green-900 text-green-50 mt-20 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del Lead */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src='/images/logo-lsf-usa-white-icono.png' alt='logo-lsf-usa-icono (1)' width={36} height={36}/>
              <div>
                <h3 className="text-2xl font-bold text-white">Living Stones Lead</h3>
                <p className="text-sm text-green-100">Panel de Líder de Proyecto</p>
              </div>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Sistema especializado para líderes de proyecto: gestión de equipos, seguimiento de tareas, 
              coordinación de recursos y evaluación de progreso.
            </p>
            <div className="flex items-center space-x-4 text-xs text-green-100">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-green-300" />
                <span>Mis Proyectos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-green-300" />
                <span>Gestión de Equipo</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckSquare className="w-4 h-4 text-green-300" />
                <span>Tareas y Milestones</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4 text-green-300" />
                <span>Evaluaciones de Equipo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema Lead */}
        <div className="border-t border-green-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-green-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Lead Activo</span>
              </div>
              <div>
                <span>Versión Lead 1.0.0</span>
              </div>
            </div>
            
            <div className="text-sm text-green-200">
              © 2024 Living Stones Lead Panel
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}