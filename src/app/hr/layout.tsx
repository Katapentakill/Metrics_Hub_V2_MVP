'use client';

import { useEffect, useState } from 'react';
import HeaderHR from '@/components/layout/Hr/HeaderHR';
import FooterHR from '@/components/layout/Hr/FooterHR';

interface AdminLayoutProps {
  /** Contenido dinámico de la página (children de Next.js). */
  children: React.ReactNode;
}

/**
 * Layout principal para la sección **HR / Admin** del panel.
 * 
 * - Incluye **HeaderHR** y **FooterHR** de forma persistente.
 * - Controla el acceso restringido al rol `hr` validando el objeto
 *   `auth_session` almacenado en `localStorage`.
 * - Redirige automáticamente a `/login` si no hay sesión válida o si
 *   el rol del usuario no corresponde a Recursos Humanos.
 * - Muestra un estado de carga mientras se valida la sesión.
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  /** Indica si el usuario tiene permisos válidos para acceder a HR. */
  const [isAuthorized, setIsAuthorized] = useState(false);

  /** Bandera de carga mientras se valida la sesión en el useEffect. */
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('auth_session');
    
    if (!session) {
      // No existe sesión → redirigir inmediatamente al login
      window.location.href = '/login';
      return;
    }

    try {
      const sessionData = JSON.parse(session);

      // Validar que el rol sea HR, de lo contrario forzar login
      if (sessionData.role !== 'hr') {
        window.location.href = '/login';
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Error validating hr session:', error);
      window.location.href = '/login';
    } finally {
      // Siempre finalizar estado de carga
      setIsLoading(false);
    }
  }, []);

  // Pantalla de carga mientras se valida sesión
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="spinner w-8 h-8 mx-auto"></div>
          <p className="text-muted">Verificando permisos de Recursos Humanos...</p>
        </div>
      </div>
    );
  }

  // Si no está autorizado → no renderizar nada (previene parpadeo)
  if (!isAuthorized) {
    return null;
  }

  // Layout con Header y Footer de HR + contenido de la página
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeaderHR />
      <main className="pt-20 pb-8 min-h-screen">
        <div className="admin-main-content px-6 py-6">
          {children}
        </div>
      </main>
      <FooterHR />
    </div>
  );
}
