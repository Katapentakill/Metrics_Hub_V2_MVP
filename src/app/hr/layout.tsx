//src/app/hr/layout.tsx
import React from 'react';
import HeaderHR from '@/components/layout/Hr/HeaderHR';

export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderHR />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}