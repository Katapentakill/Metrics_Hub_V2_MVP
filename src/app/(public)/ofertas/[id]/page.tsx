// src/app/(public)/ofertas/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMockJobOpenings } from '@/lib/data/jobOpenings';
import { JobOpening } from '@/lib/types/jobOpenings';
import {
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  Users,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Bookmark,
  Globe,
  Mail,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<JobOpening | null>(null);
  const [similarJobs, setSimilarJobs] = useState<JobOpening[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const allJobs = getMockJobOpenings(25);
    const foundJob = allJobs.find((j) => j.id === params.id);

    if (foundJob) {
      setJob(foundJob);
      // Get similar jobs (same category, different id)
      const similar = allJobs
        .filter(
          (j) =>
            j.category === foundJob.category &&
            j.id !== foundJob.id &&
            j.status === 'published'
        )
        .slice(0, 3);
      setSimilarJobs(similar);
    }
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job?.title,
          text: job?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Here you would typically save to localStorage or backend
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando oferta...</p>
        </div>
      </div>
    );
  }

  const daysAgo = job.publishedDate
    ? Math.floor((Date.now() - job.publishedDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a ofertas
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {job.category}
                </span>
                <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {job.jobType}
                </span>
                {daysAgo <= 7 && (
                  <span className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-semibold">
                    ¡Nueva!
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-xl text-gray-600 font-medium">{job.department}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                title="Compartir"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleSave}
                className={`p-3 border-2 rounded-xl transition-colors ${
                  isSaved
                    ? 'bg-green-50 border-green-600'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                title="Guardar"
              >
                <Bookmark
                  className={`w-5 h-5 ${
                    isSaved ? 'text-green-600 fill-green-600' : 'text-gray-600'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Ubicación</p>
                <p className="text-sm font-semibold text-gray-900">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Horas/semana</p>
                <p className="text-sm font-semibold text-gray-900">{job.hoursPerWeek}h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Duración</p>
                <p className="text-sm font-semibold text-gray-900">{job.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Postulantes</p>
                <p className="text-sm font-semibold text-gray-900">
                  {job.applicantsCount}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex gap-3">
            <Link
              href="/register"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl text-center"
            >
              Postular a esta posición
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all text-center"
            >
              Ya tengo cuenta
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Publicado hace {daysAgo === 0 ? 'hoy' : `${daysAgo} días`}
          </p>
        </div>

        {/* Job Details */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Descripción del puesto
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Responsabilidades
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Requisitos
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred Qualifications */}
            {job.preferredQualifications.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Cualificaciones deseables
                </h2>
                <ul className="space-y-3">
                  {job.preferredQualifications.map((qual, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Habilidades requeridas
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Beneficios
              </h3>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Información adicional
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nivel de experiencia</p>
                  <p className="font-semibold text-gray-900">{job.experienceLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tipo de modalidad</p>
                  <p className="font-semibold text-gray-900">{job.locationType}</p>
                </div>
                {job.languageRequirements && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Idiomas</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {job.languageRequirements.map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {job.timezone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Zona horaria</p>
                    <p className="font-semibold text-gray-900">{job.timezone}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">¿Tienes preguntas?</h3>
              <p className="text-green-50 text-sm mb-4">
                Contáctanos para más información sobre esta oportunidad
              </p>
              <a
                href={`mailto:${job.contactEmail}`}
                className="flex items-center gap-2 text-white hover:text-green-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">{job.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Ofertas similares
              </h2>
              <Link
                href="/ofertas"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
              >
                Ver todas
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {similarJobs.map((similarJob) => (
                <Link
                  key={similarJob.id}
                  href={`/ofertas/${similarJob.id}`}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all p-6"
                >
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {similarJob.category}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-3 mb-2">
                    {similarJob.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {similarJob.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{similarJob.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
