// src/components/layout/Volunteer/FooterVolunteer.tsx
'use client';
import { useSidebar } from '@/contexts/SidebarContext';
import { Heart, BookOpen, Award, MessageSquare, Target } from 'lucide-react';

export function FooterVolunteer() {
  const { isCollapsed } = useSidebar();

  return (
    <footer className={`bg-slate-900 text-slate-300 mt-12 transition-all duration-300 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción del Volunteer */}
          <div className="col-span-1 md:col-span-3 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Living Stones Volunteer</h3>
                <p className="text-sm text-slate-400">Panel de Voluntario</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Plataforma personalizada para voluntarios: gestión de proyectos asignados, 
              seguimiento de tareas, acceso a recursos, comunicación con equipos y 
              evaluación de tu impacto social. Tu espacio para hacer la diferencia.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-slate-400" />
                <span>Mis Proyectos</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>Tareas</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>Evaluaciones</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Comunicación</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información del sistema Volunteer */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Sistema Volunteer Activo</span>
              </div>
              <div>
                <span className="text-slate-500">Versión Volunteer 1.0.0</span>
              </div>
              <div>
                <span className="text-slate-500">Última actividad: {new Date().toLocaleString('es-ES')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1 bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors text-sm">
                <Heart className="w-4 h-4" />
                <span>Mi Impacto</span>
              </button>
              <div className="text-xs text-slate-500">
                © 2024 Living Stones Volunteer Panel
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje motivacional para voluntarios */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <h5 className="text-white font-medium text-sm">¡Gracias por tu dedicación!</h5>
              <p className="text-xs text-slate-400 mt-1">
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