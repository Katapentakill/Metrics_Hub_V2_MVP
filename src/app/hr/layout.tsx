// src/app/(hr)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import HeaderHr from '@/components/layout/Hr/HeaderHr';
import {FooterHr} from '@/components/layout/Hr/FooterHr';
import { useSidebar } from '@/contexts/SidebarContext';

interface HrLayoutProps {
  children: React.ReactNode;
}

export default function HrLayout({ children }: HrLayoutProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  
  const { isCollapsed } = useSidebar();
  

  useEffect(() => {
    const session = localStorage.getItem('auth_session');
    
    if (!session) {
      window.location.href = '/login';
      return;
    }

    try {
      const sessionData = JSON.parse(session);
      
      if (sessionData.role !== 'hr') {
        window.location.href = '/login';
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Error validating HR session:', error);
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <div className="spinner w-8 h-8 mx-auto"></div>
          <p className="text-muted">Verificando permisos de Recursos Humanos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeaderHr />
      <main className={`admin-main-content ${ isCollapsed ? 'lg:ml-20' : 'lg:ml-64' }`}>
        <div className="page-container">
          {children}
        </div>
      </main>
      <FooterHr />
    </div>
  );
}