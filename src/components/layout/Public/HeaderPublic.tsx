'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderPublic() {
  const pathname = usePathname();

  return (
    <header className="nav-header sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/login" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-xl shadow-lg">
              <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-living-green-500 rounded-sm"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Living Stones</h1>
              <p className="text-xs text-muted -mt-1">Volunteer System</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/login"
              className={`nav-link ${pathname === '/login' ? 'nav-link-active' : ''}`}
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/register"
              className={`nav-link ${pathname === '/register' ? 'nav-link-active' : ''}`}
            >
              Registrarse
            </Link>
            <Link href="#" className="nav-link">Acerca de</Link>
            <Link href="#" className="nav-link">Contacto</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/register" className="btn-living hidden sm:inline-flex">
              Únete Ahora
            </Link>
            
            <button className="md:hidden p-2 text-slate-600 hover:text-living-green-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}