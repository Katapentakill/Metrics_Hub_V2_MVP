//src/app/admin/documents/page.tsx
// src/app/admin/documents/page.tsx
import AdminDocumentManagement from '@/modules/documents/admin/docs';
import React from 'react';

export const metadata = {
  title: 'Admin Documents',
  description: 'Manage all organization documents.',
};

export default function DocumentsPage() {
  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <AdminDocumentManagement />
      </div>
    </main>
  );
}