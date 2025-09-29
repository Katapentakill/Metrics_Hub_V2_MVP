// src/components/layout/DynamicHeader.tsx
'use client';
import { useState, useEffect } from 'react';
import UniversalHeader from './UniversalHeader';

interface SessionData {
  role: 'admin' | 'hr' | 'lead' | 'volunteer';
}

export default function DynamicHeader() {
  const [userRole, setUserRole] = useState<'admin' | 'hr' | 'lead' | 'volunteer' | 'public'>('public');

  useEffect(() => {
    const sessionData = localStorage.getItem('auth_session');
    if (sessionData) {
      const session: SessionData = JSON.parse(sessionData);
      setUserRole(session.role);
    }
  }, []);

  return <UniversalHeader userRole={userRole} />;
}