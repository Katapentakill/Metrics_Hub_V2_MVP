import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function FooterPublic() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-xl shadow-lg">
                <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-living-green-500 rounded-sm"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Living Stones</h3>
                <p className="text-xs text-slate-400">Volunteer System</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Conectamos voluntarios apasionados con proyectos que generan impacto social positivo en comunidades alrededor del mundo.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-living-green-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-living-green-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-living-green-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-living-green-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Enlaces Rápidos</h4>
            <nav className="space-y-2">
              <Link href="/login" className="block text-sm hover:text-living-green-400 transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="block text-sm hover:text-living-green-400 transition-colors">
                Registrarse
              </Link>
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Cómo Funciona
              </Link>
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Proyectos Activos
              </Link>
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Testimonios
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Soporte</h4>
            <nav className="space-y-2">
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Centro de Ayuda
              </Link>
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Preguntas Frecuentes
              </Link>
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Guías para Voluntarios
              </Link>
              <Link href="/forgot-password" className="block text-sm hover:text-living-green-400 transition-colors">
                Restablecer Contraseña
              </Link>
              <Link href="#" className="block text-sm hover:text-living-green-400 transition-colors">
                Contactar Soporte
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-living-green-400" />
                <span className="text-sm">info@livingstones.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-living-green-400" />
                <span className="text-sm">+1 (555) 123-HELP</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-living-green-400 mt-0.5" />
                <div className="text-sm">
                  <p>123 Volunteer Street</p>
                  <p>Impact City, IC 12345</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © 2024 Living Stones. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-slate-400 hover:text-living-green-400 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-living-green-400 transition-colors">
                Términos de Servicio
              </Link>
              <Link href="#" className="text-sm text-slate-400 hover:text-living-green-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}