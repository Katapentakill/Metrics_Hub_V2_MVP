// src/modules/public/layout/PublicHeader.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserPlus, Briefcase, Info, Heart } from 'lucide-react';
import Image from 'next/image';

export default function PublicHeader() {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';
  const isOfertasPage = pathname?.startsWith('/ofertas');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/ofertas" className="flex items-center gap-3 group">
            <Image src='/images/logo-lsf-usa-icono.png' alt='logo-lsf-usa-icono (1)' width={36} height={36}/>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 text-transparent bg-clip-text">
                Living Stones
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Voluntariado</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/ofertas"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isOfertasPage
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Ofertas
            </Link>
            <Link
              href="#about"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Info className="w-4 h-4" />
              Acerca de
            </Link>
            <Link
              href="#impact"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Impacto
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {!isLoginPage && (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Iniciar sesión</span>
                <span className="sm:hidden">Login</span>
              </Link>
            )}
            {!isRegisterPage && (
              <Link
                href="/register"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Registrarse</span>
                <span className="sm:hidden">Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
