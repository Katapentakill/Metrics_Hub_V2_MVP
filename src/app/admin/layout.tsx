// src/app/(admin)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import HeaderAdmin from '@/components/layout/Admin/HeaderAdmin';
import {FooterAdmin} from '@/components/layout/Admin/FooterAdmin';
import { useSidebar } from '@/contexts/SidebarContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
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
      
      if (sessionData.role !== 'admin') {
        window.location.href = '/login';
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Error validating admin session:', error);
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="spinner w-8 h-8 mx-auto"></div>
          <p className="text-muted">Verificando permisos de administrador...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <HeaderAdmin />
      <main className={`admin-main-content ${ isCollapsed } ? 'lg:ml-20' : 'lg:ml-64'`}>
        <div className="page-container">
          {children}
        </div>
      </main>
      <FooterAdmin />
    </div>
  );
}