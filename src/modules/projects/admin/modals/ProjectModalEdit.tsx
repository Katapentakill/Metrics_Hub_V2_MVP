// src/features/admin/projects/ProjectModalEdit.tsx
'use client';

import { useState } from 'react';
import type { Project, ExtendedUserWithProfile } from '@/lib/types';

interface Props {
  project: Project | null;
  leads: ExtendedUserWithProfile[]; // usuarios con role 'lead_project'
  onSave: (patch: Partial<Project>) => void;
  onClose: () => void;
}

export default function ProjectModalEdit({ project, leads, onSave, onClose }: Props) {
  const [form, setForm] = useState<Partial<Project>>({
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'planning',
    lead_id: project?.lead_id || leads[0]?.id,
    max_team_size: project?.max_team_size || 8,
    deadline: project?.deadline || '',
  });

  const handle = (k: keyof Project, v: any) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-30">
      <div className="card w-full max-w-2xl p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{project ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-600">Nombre</label>
            <input className="input-field w-full" value={form.name || ''} onChange={(e) => handle('name', e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-slate-600">Estado</label>
            <select
              className="input-field w-full"
              value={form.status}
              onChange={(e) => handle('status', e.target.value as Project['status'])}
            >
              <option value="planning">En planificación</option>
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
              <option value="paused">Pausado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-slate-600">Descripción</label>
            <textarea
              className="input-field w-full"
              rows={3}
              value={form.description || ''}
              onChange={(e) => handle('description', e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">Líder</label>
            <select
              className="input-field w-full"
              value={form.lead_id}
              onChange={(e) => handle('lead_id', e.target.value)}
            >
              {leads.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.profile?.country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-600">Tamaño Máximo Equipo</label>
            <input
              type="number"
              className="input-field w-full"
              value={form.max_team_size || 8}
              onChange={(e) => handle('max_team_size', Number(e.target.value || 0))}
              min={1}
            />
          </div>

          <div>
            <label className="text-xs text-slate-600">Fecha Límite</label>
            <input
              type="date"
              className="input-field w-full"
              value={form.deadline || ''}
              onChange={(e) => handle('deadline', e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn-living" onClick={() => onSave(form)}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
