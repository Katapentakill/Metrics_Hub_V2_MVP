// src/app/hr/documents/page.tsx
// src/app/hr/documents/page.tsx
import DocumentHub from '@/modules/documents/hr/documenthub';
import React from 'react';

export const metadata = {
  title: 'HR Documents',
  description: 'Manage all organization documents.',
};

export default function HRDocumentsPage() {
  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <DocumentHub/>
      </div>
    </main>
  );
}