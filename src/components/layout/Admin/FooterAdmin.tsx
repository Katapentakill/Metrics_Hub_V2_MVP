// src/components/layout/Admin/FooterAdmin.tsx
import { useSidebar } from '@/contexts/SidebarContext';
import { Shield, Users, Settings, ClipboardList } from 'lucide-react';
import Image from 'next/image';

export function FooterAdmin() {

  const { isCollapsed } = useSidebar();


  return (
    <footer className={`bg-green-900 text-green-50 mt-20 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del admin */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src='/images/logo-lsf-usa-white-icono.png' alt='logo-lsf-usa-icono (1)' width={36} height={36}/>
              <div>
                <h3 className="text-2xl font-bold text-white">Living Stones Admin</h3>
                <p className="text-sm text-green-100">Panel de Control Administrativo</p>
              </div>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Sistema completo de gestión de voluntarios con control total sobre usuarios, proyectos, 
              evaluaciones y configuraciones del sistema.
            </p>
            <div className="flex items-center space-x-4 text-xs text-green-100">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-green-300" />
                <span>Administrar Usuarios</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-300" />
                <span>Supervisar Proyectos</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClipboardList className="w-4 h-4 text-green-300" />
                <span>Sistema de Evaluaciones</span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="w-4 h-4 text-green-300" />
                <span>Configuración del Sistema</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema */}
        <div className="border-t border-green-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-green-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Operativo</span>
              </div>
              <div>
                <span>Versión Admin 1.0.0</span>
              </div>
            </div>
            
            <div className="text-sm text-green-200">
              © 2024 Living Stones Admin Panel
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}