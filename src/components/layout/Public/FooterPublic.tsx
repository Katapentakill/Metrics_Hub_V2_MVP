// src/components/layout/Public/FooterPublic.tsx
'use client';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function FooterPublic() {
  return (
    <footer className="bg-green-900 text-green-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                <div className="w-5 h-5 bg-green-600 rounded-md flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Living Stones</h3>
                <p className="text-xs text-green-100">Volunteer System</p>
              </div>
            </div>
            <p className="text-sm text-green-100 leading-relaxed">
              Conectamos voluntarios apasionados con proyectos que generan impacto social positivo en comunidades alrededor del mundo.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Enlaces Rápidos</h4>
            <nav className="space-y-2">
              <Link href="/login" className="block text-sm text-green-100 hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="block text-sm text-green-100 hover:text-white transition-colors">
                Registrarse
              </Link>
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Cómo Funciona
              </Link>
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Proyectos Activos
              </Link>
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Testimonios
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Soporte</h4>
            <nav className="space-y-2">
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Centro de Ayuda
              </Link>
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Preguntas Frecuentes
              </Link>
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Guías para Voluntarios
              </Link>
              <Link href="/forgot-password" className="block text-sm text-green-100 hover:text-white transition-colors">
                Restablecer Contraseña
              </Link>
              <Link href="#" className="block text-sm text-green-100 hover:text-white transition-colors">
                Contactar Soporte
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-100">info@livingstones.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-300 flex-shrink-0" />
                <span className="text-sm text-green-100">+1 (555) 123-HELP</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-100">
                  <p>123 Volunteer Street</p>
                  <p>Impact City, IC 12345</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p className="text-green-200 text-sm">
            © 2024 Living Stones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}