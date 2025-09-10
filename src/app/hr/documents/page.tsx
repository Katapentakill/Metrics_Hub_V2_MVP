//src/app/hr/documents/page.tsx
// src/app/hr/documents/page.tsx
// src/app/hr/documents/page.tsx
import HrDocumentManagement from '@/modules/documents/hr/documents';
import React from 'react';

export const metadata = {
  title: 'HR Documents',
  description: 'Manage candidate and volunteer documents.',
};

export default function DocumentsPage() {
  return (
    <main className="p-6 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <HrDocumentManagement />
      </div>
    </main>
  );
}