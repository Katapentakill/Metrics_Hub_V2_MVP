//src/app/admin/documents/page.tsx
import DocumentHub from '@/modules/documents/admin/documenthub';
import React from 'react';

export const metadata = {
  title: 'Admin Documents',
  description: 'Manage all organization documents.',
};

export default function AdminDocumentsPage() {
  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <DocumentHub/>
      </div>
    </main>
  );
}