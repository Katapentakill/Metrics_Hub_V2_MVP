// src/features/admin/projects/ProjectDetailModal.tsx
'use client';

import { ProjectView } from '@/lib/map/projects/projectView';
import { MapPin, Users } from 'lucide-react';

interface Props {
  view: ProjectView;
  onClose: () => void;
  onEdit: () => void;
}

export default function ProjectDetailModal({ view, onClose, onEdit }: Props) {
  const { project, lead, members, country, city, progressPct } = view;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
      <div className="card w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">{project.name}</h3>
          <div className="space-x-2">
            <button className="btn-secondary" onClick={onEdit}>Editar</button>
            <button className="btn-ghost" onClick={onClose}>Cerrar</button>
          </div>
        </div>

        {project.description && <p className="text-sm text-slate-600 mb-4">{project.description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><span className="text-slate-500">Estado:</span> <strong>{project.status}</strong></p>
            <p><span className="text-slate-500">Progreso:</span> <strong>{progressPct}%</strong></p>
            <p className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {city ? `${city}, ` : ''}{country || '—'}
            </p>
          </div>
          <div>
            <p><span className="text-slate-500">Líder:</span> {lead?.name} ({lead?.email})</p>
            {project.deadline && (<p><span className="text-slate-500">Deadline:</span> {project.deadline}</p>)}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Users className="w-4 h-4" /> Integrantes ({members?.length || 0})
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(members || []).map((m) => (
              <span key={m.id} className="badge badge-info">{m.name} — {m.profile?.country}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
