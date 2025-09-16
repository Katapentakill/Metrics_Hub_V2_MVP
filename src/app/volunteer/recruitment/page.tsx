// src/app/volunteer/recruitment/page.tsx
'use client';

import VolunteerApplicationView from '@/modules/recruitment/volunteer/VolunteerApplicationView';
import React from 'react';

// Simulamos un usuario loggeado con el rol 'volunteer'
const mockCurrentUser = {
  id: 'user_12345',
  email: 'volunteer@example.com',
  password: 'hashed_password',
  name: 'Mock Volunteer',
  role: 'volunteer',
  status: 'active',
  email_verified: 1,
  created_at: '2025-01-01T10:00:00Z',
};

export default function VolunteerRecruitmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Estado de mi Postulación</h1>
      <VolunteerApplicationView currentUser={mockCurrentUser} />
    </div>
  );
}