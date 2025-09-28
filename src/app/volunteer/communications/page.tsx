// 📁 src/app/volunteer/communications/page.tsx
// Página principal del módulo de comunicaciones para voluntarios

import React from 'react';
import { Metadata } from 'next';
import CommunicationsPage from '@/modules/communications/CommunicationsPage';

export const metadata: Metadata = {
  title: 'Centro de Comunicaciones | Volunteer Dashboard',
  description: 'Comunicaciones para voluntarios',
};

export default function VolunteerCommunicationsPage() {
  return (
    <CommunicationsPage 
      allowedRoles={['volunteer']}
      currentUserId="volunteer-user-123"
    />
  );
}