// 📁 src/app/hr/communications/page.tsx
// Página principal del módulo de comunicaciones para recursos humanos

import React from 'react';
import { Metadata } from 'next';
import CommunicationsPage from '@/modules/communications/CommunicationsPage';

export const metadata: Metadata = {
  title: 'Centro de Comunicaciones | HR Dashboard',
  description: 'Gestión de comunicaciones para recursos humanos',
};

export default function HRCommunicationsPage() {
  return (
    <CommunicationsPage 
      allowedRoles={['hr']}
    />
  );
}