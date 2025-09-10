// src/components/layout/Volunteer/FooterVolunteer.tsx
import { Heart, Users, Target, BookOpen, Award, Clock, MessageSquare, Calendar } from 'lucide-react';

export default function FooterVolunteer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción del voluntario */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Living Stones Volunteer</h3>
                <p className="text-sm text-slate-400">Portal del Voluntario</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Plataforma diseñada para voluntarios comprometidos con hacer la diferencia. 
              Gestiona tus proyectos, tareas y crecimiento personal mientras contribuyes 
              a causas que transforman comunidades.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-living-green-400" />
                <span>87 horas contribuidas</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-blue-400" />
                <span>3 proyectos activos</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>5 logros obtenidos</span>
              </div>
            </div>
          </div>

          {/* Mis acciones rápidas */}
          <div>
            <h4 className="text-white font-semibold mb-4">Acciones Rápidas</h4>
            <div className="space-y-2">
              <a href="/volunteer/tasks" className="block text-sm hover:text-living-green-400 transition-colors">
                Ver Mis Tareas
              </a>
              <a href="/volunteer/projects" className="block text-sm hover:text-living-green-400 transition-colors">
                Mis Proyectos Activos
              </a>
              <a href="/volunteer/schedule" className="block text-sm hover:text-living-green-400 transition-colors">
                Mi Horario Semanal
              </a>
              <a href="/volunteer/team" className="block text-sm hover:text-living-green-400 transition-colors">
                Mi Equipo de Trabajo
              </a>
              <a href="/volunteer/resources" className="block text-sm hover:text-living-green-400 transition-colors">
                Recursos y Materiales
              </a>
            </div>
          </div>

          {/* Desarrollo y aprendizaje */}
          <div>
            <h4 className="text-white font-semibold mb-4">Desarrollo Personal</h4>
            <div className="space-y-2">
              <a href="/volunteer/training" className="block text-sm hover:text-living-green-400 transition-colors">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Capacitaciones Disponibles
              </a>
              <a href="/volunteer/achievements" className="block text-sm hover:text-living-green-400 transition-colors">
                Mis Logros y Certificados
              </a>
              <a href="/volunteer/feedback" className="block text-sm hover:text-living-green-400 transition-colors">
                Evaluaciones y Feedback
              </a>
              <a href="/volunteer/goals" className="block text-sm hover:text-living-green-400 transition-colors">
                Metas Personales
              </a>
              <a href="/volunteer/mentorship" className="block text-sm hover:text-living-green-400 transition-colors">
                Programa de Mentoría
              </a>
            </div>
          </div>
        </div>

        {/* Información de progreso y comunidad */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-living-green-400 rounded-full animate-pulse"></div>
                <span>Estado: Voluntario Activo</span>
              </div>
              <div>
                <span className="text-slate-500">Desde: Enero 2024</span>
              </div>
              <div>
                <span className="text-slate-500">Última actividad: {new Date().toLocaleDateString('es-ES')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>Contactar Coordinador</span>
              </button>
              <div className="text-xs text-slate-500">
                © 2024 Living Stones Foundation
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas personales destacadas */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">87h</p>
                <p className="text-xs text-slate-400">Horas Voluntariado</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">23</p>
                <p className="text-xs text-slate-400">Tareas Completadas</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">26</p>
                <p className="text-xs text-slate-400">Compañeros de Equipo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensaje motivacional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-living-green-900 to-blue-900 rounded-lg border border-slate-700">
          <div className="flex items-start space-x-3">
            <Heart className="w-5 h-5 text-living-green-400 mt-0.5" />
            <div>
              <h5 className="text-white font-medium text-sm">Gracias por tu Compromiso</h5>
              <p className="text-xs text-slate-300 mt-1">
                Tu dedicación y trabajo están creando un impacto real en nuestras comunidades. 
                Cada hora que contribuyes, cada proyecto en el que participas, hace la diferencia. 
                ¡Sigue así y continúa creciendo con nosotros!
              </p>
            </div>
          </div>
        </div>

        {/* Próximas actividades */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-white font-medium text-sm flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Próximas Actividades</span>
            </h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-slate-300">Reunión de Equipo - Mañana 10:00 AM</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-300">Trabajo de Campo - Viernes 8:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}