// src/app/lead/recruitment/available-positions/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { getMockJobOpenings } from '@/lib/data/jobOpenings';
import { JobOpening } from '@/lib/types/jobOpenings';
import {
  Briefcase,
  Search,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Filter,
  X,
  Mail,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ModalState {
  isDetailsOpen: boolean;
  selectedJob: JobOpening | null;
}

export default function LeadAvailablePositions() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [modal, setModal] = useState<ModalState>({ isDetailsOpen: false, selectedJob: null });

  // Obtener ofertas reales publicadas
  const allJobs = useMemo(() => {
    const jobs = getMockJobOpenings(50);
    return jobs.filter(job => job.status === 'published');
  }, []);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      let matchesFilter = true;
      if (selectedFilter === 'remote') matchesFilter = job.locationType === 'Remote';
      else if (selectedFilter === 'hybrid') matchesFilter = job.locationType === 'Hybrid';

      let matchesDept = true;
      if (selectedDepartment !== 'all') matchesDept = job.department === selectedDepartment;

      return matchesSearch && matchesFilter && matchesDept;
    });
  }, [allJobs, searchTerm, selectedFilter, selectedDepartment]);

  const departments = useMemo(() => {
    return [...new Set(allJobs.map(job => job.department))];
  }, [allJobs]);

  const handleApply = (job: JobOpening) => {
    router.push(`/lead/applications?jobId=${job.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Posiciones Disponibles</h1>
              <p className="text-gray-600 text-sm mt-1">Como Líder de Proyecto</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-2xl text-purple-600">{allJobs.length}</span>
              </div>
              <p className="text-sm text-gray-600">Posiciones Activas</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-2xl text-blue-600">
                  {allJobs.reduce((acc, job) => acc + job.applicantsCount, 0)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Postulantes Totales</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-2xl text-green-600">{departments.length}</span>
              </div>
              <p className="text-sm text-gray-600">Departamentos</p>
            </div>
          </div>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por posición, departamento o habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              >
                <option value="all">Todas</option>
                <option value="remote">Remoto</option>
                <option value="hybrid">Híbrido</option>
              </select>

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
              >
                <option value="all">Todos los departamentos</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">
              Mostrando <span className="text-purple-600 font-bold">{filteredJobs.length}</span> de {allJobs.length} posiciones
            </span>
            {(selectedFilter !== 'all' || selectedDepartment !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                  setSelectedDepartment('all');
                }}
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                <Filter className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Lista de Posiciones */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No se encontraron posiciones</h3>
            <p className="text-gray-600 mb-6">Intenta ajustar tus filtros de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
                setSelectedDepartment('all');
              }}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group bg-white rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="p-6 pb-4 border-b border-slate-200">
                  <h3 className="font-bold text-xl text-slate-800 mb-2 line-clamp-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">{job.department}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {job.description}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700 font-medium">{job.hoursPerWeek}h/semana</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700 font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-gray-700 font-medium">{job.applicantsCount} postulantes</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex gap-2 pt-4 border-t border-slate-200 mt-auto">
                    <button
                      onClick={() => setModal({ isDetailsOpen: true, selectedJob: job })}
                      className="flex-1 px-4 py-2.5 border border-purple-600 text-purple-600 text-sm font-semibold rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => handleApply(job)}
                      className="flex-1 px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      Aplicar
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {modal.isDetailsOpen && modal.selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Header */}
            <div className="sticky top-0 bg-purple-600 p-6 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">{modal.selectedJob.title}</h2>
                  <p className="text-purple-200">{modal.selectedJob.department} • {modal.selectedJob.jobType}</p>
                </div>
                <button
                  onClick={() => setModal({ isDetailsOpen: false, selectedJob: null })}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Clock className="w-4 h-4 text-purple-200 mb-1" />
                  <p className="text-xs font-semibold text-purple-200">{modal.selectedJob.hoursPerWeek}h/semana</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <MapPin className="w-4 h-4 text-purple-200 mb-1" />
                  <p className="text-xs font-semibold text-purple-200">{modal.selectedJob.location}</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-3">
                  <Users className="w-4 h-4 text-purple-200 mb-1" />
                  <p className="text-xs font-semibold text-purple-200">{modal.selectedJob.applicantsCount} postulantes</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">{modal.selectedJob.description}</p>
              </div>

              {modal.selectedJob.responsibilities && modal.selectedJob.responsibilities.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-slate-800 mb-3">Responsabilidades</h3>
                  <ul className="space-y-2">
                    {modal.selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {modal.selectedJob.requirements && modal.selectedJob.requirements.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg text-slate-800 mb-3">Requisitos</h3>
                  <ul className="space-y-2">
                    {modal.selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">Habilidades Requeridas</h3>
                <div className="flex flex-wrap gap-2">
                  {modal.selectedJob.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">Beneficios</h3>
                <ul className="space-y-2">
                  {modal.selectedJob.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-4 text-white">
                <h3 className="font-bold mb-2">¿Tienes preguntas?</h3>
                <p className="text-purple-50 text-xs mb-3">
                  Contáctanos para más información sobre esta oportunidad
                </p>
                <a
                  href={`mailto:${modal.selectedJob.contactEmail}`}
                  className="flex items-center gap-2 text-white hover:text-purple-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">{modal.selectedJob.contactEmail}</span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setModal({ isDetailsOpen: false, selectedJob: null })}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-800 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    handleApply(modal.selectedJob!);
                    setModal({ isDetailsOpen: false, selectedJob: null });
                  }}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-lg"
                >
                  Aplicar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
