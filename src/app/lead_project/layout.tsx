// src/app/lead_project/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import HeaderLead from '@/components/layout/Lead/HeaderLead';
import FooterLead from '@/components/layout/Lead/FooterLead';

interface LeadProjectLayoutProps {
  children: React.ReactNode;
}

export default function LeadProjectLayout({ children }: LeadProjectLayoutProps) {
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
      
      if (sessionData.role !== 'lead_project') {
        window.location.href = '/login';
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error('Error validating lead project session:', error);
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="text-center space-y-4">
          <div className="spinner w-8 h-8 mx-auto"></div>
          <p className="text-muted">Verificando permisos de líder de proyecto...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <HeaderLead />
      <main className="pt-20 pb-8 min-h-screen">
        <div className="lead-main-content px-6 py-6">
          {children}
        </div>
      </main>
      <FooterLead />
    </div>
  );
}