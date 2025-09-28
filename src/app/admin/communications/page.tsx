// 📁 src/app/admin/communications/page.tsx
// Página principal del módulo de comunicaciones para administradores

import React from 'react';
import { Metadata } from 'next';
import CommunicationsPage from '@/modules/communications/CommunicationsPage';

export const metadata: Metadata = {
  title: 'Centro de Comunicaciones | Admin Dashboard',
  description: 'Gestión completa de comunicaciones para administradores',
};

export default function AdminCommunicationsPage() {
  return (
    <CommunicationsPage 
      allowedRoles={['admin']}
    />
  );
}