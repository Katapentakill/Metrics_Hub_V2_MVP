'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import HeaderVolunteer from '@/components/layout/Volunteer/HeaderVolunteer';
import FooterVolunteer from '@/components/layout/Volunteer/FooterVolunteer';

/**
 * Props del layout para la sección de Voluntarios.
 * 
 * @property {React.ReactNode} children - Contenido de la página que se renderiza dentro del layout.
 */
interface VolunteerLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal para el rol **Voluntario**.
 * 
 * - Valida la sesión en `localStorage` para asegurar que el usuario tenga rol `volunteer` o `unassigned`.
 * - Redirige a `/login` si la sesión no existe o no es válida.
 * - Muestra un estado de carga mientras se verifica la sesión.
 * - Incluye el `HeaderVolunteer` y `FooterVolunteer`.
 * 
 * @example
 * ```tsx
 * <VolunteerLayout>
 *   <VolunteerDashboard />
 * </VolunteerLayout>
 * ```
 */
export default function VolunteerLayout({ children }: VolunteerLayoutProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('auth_session');
    
    if (!session) {
      window.location.href = '/login';
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      
      // Permitir tanto 'volunteer' como 'unassigned' para el panel de voluntarios
      if (sessionData.role !== 'volunteer' && sessionData.role !== 'unassigned') {
        window.location.href = '/login';
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Error validating volunteer session:', error);
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-living-green-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="spinner w-8 h-8 mx-auto border-living-green-500"></div>
          <p className="text-muted">Verificando acceso de voluntario...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-living-green-50 to-blue-50">
      <HeaderVolunteer />
      <main className="pt-20 pb-8 min-h-screen">
        <div className="volunteer-main-content px-6 py-6">
          {children}
        </div>
      </main>
      <FooterVolunteer />
    </div>
  );
}
