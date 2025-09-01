import React, { useMemo, useState } from 'react';
import { ExtendedUserWithProfile } from '@/lib/types';

type Props = {
  user: ExtendedUserWithProfile;
  onClose: () => void;
};

type Format = 'json' | 'csv';

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export default function ExportUserModal({ user, onClose }: Props) {
  const [format, setFormat] = useState<Format>('json');
  const [includeProfile, setIncludeProfile] = useState(true);
  const [includeSkills, setIncludeSkills] = useState(true);
  const [includeMeta, setIncludeMeta] = useState(true);

  const flat = useMemo(() => {
    const profile = includeProfile ? user.profile ?? {} : {};
    const skills = includeSkills ? (user.profile?.skills ?? []) : [];
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      created_at: includeMeta ? user.created_at : undefined,
      last_login: includeMeta ? user.last_login : undefined,
      first_name: (profile as any).first_name,
      last_name: (profile as any).last_name,
      phone: (profile as any).phone,
      city: (profile as any).city,
      country: (profile as any).country,
      timezone: (profile as any).timezone,
      university: (profile as any).university,
      skills: skills.map((s: any) => s.name).join('|'),
      skill_categories: skills.map((s: any) => s.category).join('|'),
    };
  }, [user, includeProfile, includeSkills, includeMeta]);

  const toCSV = (row: Record<string, any>) => {
    const headers = Object.keys(row);
    const values = headers.map(h => {
      const v = row[h] ?? '';
      const s = String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    });
    return `${headers.join(',')}\n${values.join(',')}`;
  };

  const doExport = () => {
    const base = `usuario_${slugify(user.name)}_${new Date().toISOString().slice(0,10)}`;
    if (format === 'json') {
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        ...(includeMeta ? { created_at: user.created_at, last_login: user.last_login } : {}),
        ...(includeProfile ? { profile: { ...user.profile, ...(includeSkills ? {} : { skills: undefined }) } } : {}),
      };
      download(`${base}.json`, JSON.stringify(data, null, 2), 'application/json;charset=utf-8');
    } else {
      download(`${base}.csv`, toCSV(flat as any), 'text/csv;charset=utf-8');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800">Exportar datos de usuario</h3>
        <p className="text-sm text-slate-500 mt-1">{user.name} — {user.email}</p>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Formato</p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="fmt" checked={format==='json'} onChange={() => setFormat('json')} />
                JSON
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="fmt" checked={format==='csv'} onChange={() => setFormat('csv')} />
                CSV
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Contenido</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={includeProfile} onChange={e => setIncludeProfile(e.target.checked)} />
                Incluir perfil (teléfono, ubicación, universidad…)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={includeSkills} disabled={!includeProfile} onChange={e => setIncludeSkills(e.target.checked)} />
                Incluir habilidades
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={includeMeta} onChange={e => setIncludeMeta(e.target.checked)} />
                Incluir metadatos (creado, último login)
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">Cancelar</button>
          <button onClick={doExport} className="btn-living">Exportar</button>
        </div>
      </div>
    </div>
  );
}
