// src/modules/public/jobs/JobDetailPanel.tsx
'use client';

import { JobOpening } from '@/lib/types/jobOpenings';
import {
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  Users,
  CheckCircle2,
  Share2,
  Bookmark,
  Mail,
  X,
  Crown,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';

interface JobDetailPanelProps {
  job: JobOpening | null;
  onClose?: () => void;
}

export default function JobDetailPanel({ job, onClose }: JobDetailPanelProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (!job) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 p-8">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Selecciona una oferta
          </h3>
          <p className="text-gray-500">
            Haz clic en cualquier oferta de la lista para ver los detalles
          </p>
        </div>
      </div>
    );
  }

  const daysAgo = job.publishedDate
    ? Math.floor((Date.now() - job.publishedDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: job.description,
          url: `${window.location.origin}/ofertas/${job.id}`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/ofertas/${job.id}`);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setShowRoleModal(true);
    }
  };

  const handleRoleSelection = (role: 'volunteer' | 'lead') => {
    setShowRoleModal(false);
    const path = role === 'volunteer'
      ? `/volunteer/applications?jobId=${job.id}`
      : `/lead/applications?jobId=${job.id}`;
    router.push(path);
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Mobile close button */}
      {onClose && (
        <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="font-semibold text-gray-900">Detalles de la oferta</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  {job.category}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  {job.jobType}
                </span>
                {daysAgo <= 7 && (
                  <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-semibold">
                    ¡Nueva!
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <p className="text-lg text-gray-600 font-medium">{job.department}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                title="Compartir"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleSave}
                className={`p-2 border rounded-lg transition-colors ${
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
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Ubicación</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{job.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Horas/semana</p>
                <p className="text-sm font-semibold text-gray-900">{job.hoursPerWeek}h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Duración</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{job.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Users className="w-4 h-4 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Postulantes</p>
                <p className="text-sm font-semibold text-gray-900">{job.applicantsCount}</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleApplyClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg text-center"
          >
            Postularme a esta posición
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Publicado hace {daysAgo === 0 ? 'hoy' : `${daysAgo} días`}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Descripción del puesto
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{job.description}</p>
        </div>

        {/* Responsibilities */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Responsabilidades
          </h2>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, index) => (
              <li key={index} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Requisitos
          </h2>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preferred Qualifications */}
        {job.preferredQualifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Cualificaciones deseables
            </h2>
            <ul className="space-y-2">
              {job.preferredQualifications.map((qual, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Habilidades requeridas
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Beneficios
          </h2>
          <ul className="space-y-2">
            {job.benefits.map((benefit, index) => (
              <li key={index} className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-3">
            Información adicional
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-500">Nivel de experiencia</p>
              <p className="text-sm font-semibold text-gray-900">{job.experienceLevel}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tipo de modalidad</p>
              <p className="text-sm font-semibold text-gray-900">{job.locationType}</p>
            </div>
            {job.languageRequirements && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Idiomas</p>
                <div className="flex flex-wrap gap-1">
                  {job.languageRequirements.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white text-gray-700 rounded text-xs border border-gray-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">¿Tienes preguntas?</h3>
          <p className="text-green-50 text-xs mb-3">
            Contáctanos para más información sobre esta oportunidad
          </p>
          <a
            href={`mailto:${job.contactEmail}`}
            className="flex items-center gap-2 text-white hover:text-green-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">{job.contactEmail}</span>
          </a>
        </div>
      </div>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¿Cómo deseas aplicar?
              </h2>
              <p className="text-gray-600 mb-6">
                Selecciona tu rol para completar tu aplicación
              </p>

              <div className="space-y-3">
                {/* Volunteer Option */}
                <button
                  onClick={() => handleRoleSelection('volunteer')}
                  className="w-full p-4 border-2 border-green-200 rounded-xl hover:bg-green-50 hover:border-green-600 transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-green-700">
                        Voluntario
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Contribuye tu tiempo y habilidades a una causa que te importa
                      </p>
                    </div>
                  </div>
                </button>

                {/* Lead Option */}
                <button
                  onClick={() => handleRoleSelection('lead')}
                  className="w-full p-4 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-600 transition-all text-left group"
                >
                  <div className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-700">
                        Líder de Proyecto
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Lidera un equipo y gestiona el proyecto desde el inicio
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowRoleModal(false)}
                className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
