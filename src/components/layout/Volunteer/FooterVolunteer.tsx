// src/components/layout/Volunteer/FooterVolunteer.tsx
'use client';
import { useSidebar } from '@/contexts/SidebarContext';
import { Heart, BookOpen, Award, MessageSquare, Target } from 'lucide-react';

export function FooterVolunteer() {
  const { isCollapsed } = useSidebar();

  return (
    <footer className={`bg-green-900 text-green-50 mt-20 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del Volunteer */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <div className="w-5 h-5 bg-green-600 rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Living Stones Volunteer</h3>
                <p className="text-sm text-green-100">Panel de Voluntario</p>
              </div>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Plataforma personalizada para voluntarios: gestión de proyectos asignados, 
              seguimiento de tareas, acceso a recursos, comunicación con equipos y 
              evaluación de tu impacto social. Tu espacio para hacer la diferencia.
            </p>
            <div className="flex items-center space-x-4 text-xs text-green-100">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-green-300" />
                <span>Mis Proyectos</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-green-300" />
                <span>Tareas</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-green-300" />
                <span>Evaluaciones</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-green-300" />
                <span>Comunicación</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema Volunteer */}
        <div className="border-t border-green-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-green-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Volunteer Activo</span>
              </div>
              <div>
                <span>Versión Volunteer 1.0.0</span>
              </div>
              <div>
                <span>Última actividad: {new Date().toLocaleString('es-ES')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1 bg-green-800 hover:bg-green-700 rounded-lg transition-colors text-sm">
                <Heart className="w-4 h-4" />
                <span>Mi Impacto</span>
              </button>
              <div className="text-sm text-green-200">
                © 2024 Living Stones Volunteer Panel
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje motivacional para voluntarios */}
        <div className="mt-6 p-4 bg-green-800 rounded-lg border border-green-700">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-green-300 mt-0.5" />
            <div>
              <h5 className="text-white font-medium text-sm">¡Gracias por tu dedicación!</h5>
              <p className="text-xs text-green-100 mt-1">
                Tu compromiso como voluntario es fundamental para crear un impacto positivo en nuestra comunidad. 
                Cada tarea que completas, cada hora que dedicas y cada proyecto en el que participas contribuye 
                directamente a hacer del mundo un lugar mejor. ¡Sigue así!
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}