//src/modules/dashboard/hr/ComplianceDocumentation.tsx
'use client';

import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getMockVolunteers, MockVolunteer } from '../../../lib/data/mockVolunteerData';
import { useEffect, useState } from 'react';

export default function ComplianceDocumentation() {
  const [volunteers, setVolunteers] = useState<MockVolunteer[]>([]);

  useEffect(() => {
    // Simulamos la carga de datos del mock
    const allVolunteers = getMockVolunteers();
    setVolunteers(allVolunteers);
  }, []);
  
  const expiringSoon = Math.floor(Math.random() * 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center p-4 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-200">
        <Clock className="w-5 h-5 mr-3" />
        <p className="font-medium">
          <span className="font-bold">{expiringSoon}</span> documentos por vencer en los próximos 30 días.
        </p>
      </div>




    </div>
  );
}
