// src/modules/public/layout/PublicFooter.tsx
'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function PublicFooter() {
  return (
    <footer className="bg-green-900 text-green-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src='/images/logo-lsf-usa-white-icono.png' alt='logo-lsf-usa-icono (1)' width={36} height={36}/>
              <h3 className="text-2xl font-bold text-white">Living Stones</h3>
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Conectamos voluntarios apasionados con proyectos de impacto social
              en América Latina. Juntos construimos un futuro mejor.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-800 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ofertas"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Ofertas de voluntariado
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Registrarse
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@livingstones.org"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  info@livingstones.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="text-green-100">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="text-green-100">
                  América Latina
                  <br />
                  Trabajo 100% Remoto
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-800 mt-8 pt-8 text-center">
          <p className="text-green-200 text-sm">
            © 2024 Living Stones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
