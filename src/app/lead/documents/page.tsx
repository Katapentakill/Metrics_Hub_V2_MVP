import VolunteerManagement from '@/modules/documents/lead/documents';
import React from 'react';

export default function VolunteersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Volunteers</h1>
      <VolunteerManagement />
    </div>
  );
}
