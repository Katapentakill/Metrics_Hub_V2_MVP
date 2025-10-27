// src/app/(public)/ofertas/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { getMockJobOpenings, searchJobOpenings } from '@/lib/data/jobOpenings';
import { JobCategory, JobOpening } from '@/lib/types/jobOpenings';
import JobSearchHero from '@/modules/public/jobs/JobSearchHero';
import JobListItem from '@/modules/public/jobs/JobListItem';
import JobDetailPanel from '@/modules/public/jobs/JobDetailPanel';
import Link from 'next/link';
import { ArrowRight, Filter, X } from 'lucide-react';

export default function OfertasPage() {
  const [allJobs] = useState(() => getMockJobOpenings(25));
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: undefined as JobCategory | undefined,
    location: '',
  });
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const filteredJobs = useMemo(() => {
    const published = allJobs.filter((job) => job.status === 'published');
    return searchJobOpenings(published, filters);
  }, [allJobs, filters]);

  // Auto-select first job when filters change
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob) {
      setSelectedJob(filteredJobs[0]);
    } else if (filteredJobs.length > 0 && selectedJob) {
      // Check if selected job is still in filtered results
      const stillExists = filteredJobs.find(job => job.id === selectedJob.id);
      if (!stillExists) {
        setSelectedJob(filteredJobs[0]);
      }
    } else if (filteredJobs.length === 0) {
      setSelectedJob(null);
    }
  }, [filteredJobs, selectedJob]);

  const handleSearch = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      category: undefined,
      location: '',
    });
  };

  const handleJobSelect = (job: JobOpening) => {
    setSelectedJob(job);
    setShowMobileDetail(true);
  };

  const handleCloseMobileDetail = () => {
    setShowMobileDetail(false);
  };

  const hasActiveFilters =
    filters.searchTerm || filters.category || filters.location;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <JobSearchHero onSearch={handleSearch} />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Summary & Clear */}
        {hasActiveFilters && (
          <div className="mb-6 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-green-800 font-semibold">
                Filtros activos:
              </span>
              {filters.searchTerm && (
                <span className="px-3 py-1 bg-white rounded-full text-sm text-green-700 border border-green-200">
                  "{filters.searchTerm}"
                </span>
              )}
              {filters.category && (
                <span className="px-3 py-1 bg-white rounded-full text-sm text-green-700 border border-green-200">
                  {filters.category}
                </span>
              )}
              {filters.location && (
                <span className="px-3 py-1 bg-white rounded-full text-sm text-green-700 border border-green-200">
                  {filters.location}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-green-700 hover:text-green-800 font-medium"
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {hasActiveFilters ? 'Resultados de búsqueda' : 'Ofertas disponibles'}
          </h2>
          <p className="text-gray-600 mt-1">
            {filteredJobs.length} oportunidad{filteredJobs.length !== 1 ? 'es' : ''}{' '}
            de voluntariado {hasActiveFilters ? 'encontrada' : 'disponible'}
            {filteredJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Two Column Layout - List + Detail */}
        {filteredJobs.length > 0 ? (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left Column - Jobs List */}
            <div className={`lg:col-span-5 ${showMobileDetail ? 'hidden lg:block' : ''}`}>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredJobs.map((job) => (
                    <JobListItem
                      key={job.id}
                      job={job}
                      isSelected={selectedJob?.id === job.id}
                      onClick={() => handleJobSelect(job)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Job Detail */}
            <div className={`lg:col-span-7 ${!showMobileDetail ? 'hidden lg:block' : ''}`}>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
                <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                  <JobDetailPanel
                    job={selectedJob}
                    onClose={handleCloseMobileDetail}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron ofertas
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Ver todas las ofertas
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para hacer la diferencia?
          </h2>
          <p className="text-green-50 text-lg mb-6 max-w-2xl mx-auto">
            Únete a nuestra comunidad de voluntarios y contribuye a proyectos
            que transforman vidas en América Latina
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl"
            >
              Registrarme ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-800 text-white font-semibold rounded-xl hover:bg-green-900 transition-all border-2 border-white/20"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
