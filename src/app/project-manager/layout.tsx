'use client';

import { useEffect, useState } from 'react';
import { getCurrentUserSession } from '@/lib/auth/authActions';

interface ProjectManagerLayoutProps {
  children: React.ReactNode;
}

export default function ProjectManagerLayout({ children }: ProjectManagerLayoutProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getCurrentUserSession();
    
    if (!session) {
      window.location.href = '/login';
      return;
    }

    if (session.role !== 'lead_project') {
      window.location.href = '/login';
      return;
    }

    setIsAuthorized(true);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center space-y-4">
          <div className="spinner w-8 h-8 mx-auto"></div>
          <p className="text-muted">Verifying project manager access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="pt-8 pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
