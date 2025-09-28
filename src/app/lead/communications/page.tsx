// 📁 src/app/lead/communications/page.tsx
// Página principal del módulo de comunicaciones para líderes de proyecto

import React from 'react';
import { Metadata } from 'next';
import CommunicationsPage from '@/modules/communications/CommunicationsPage';

export const metadata: Metadata = {
  title: 'Centro de Comunicaciones | Lead Dashboard',
  description: 'Comunicaciones para líderes de proyecto',
};

export default function LeadCommunicationsPage() {
  return (
    <CommunicationsPage 
      allowedRoles={['lead']}
      currentUserId="lead-user-123"
    />
  );
}