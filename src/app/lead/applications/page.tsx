// src/app/lead/applications/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMockJobOpenings } from '@/lib/data/jobOpenings';
import { JobOpening } from '@/lib/types/jobOpenings';
import LeadApplicationForm from '@/modules/lead/applications/LeadApplicationForm';
import { useAuth } from '@/lib/auth';

export default function LeadApplicationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const jobId = searchParams.get('jobId');

  const [job, setJob] = useState<JobOpening | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Obtener el trabajo
    if (jobId) {
      const jobs = getMockJobOpenings(100);
      const foundJob = jobs.find((j) => j.id === jobId);
      setJob(foundJob || null);
    }
    setIsLoading(false);
  }, [jobId, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oferta no encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar la oferta que buscas.
          </p>
          <button
            onClick={() => router.push('/ofertas')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Volver a ofertas
          </button>
        </div>
      </div>
    );
  }

  return (
    <LeadApplicationForm
      job={job}
      onClose={() => router.push('/ofertas')}
    />
  );
}
