import React, { useState } from 'react';
import { ExtendedUserWithProfile } from '@/lib/types';

type Props = {
  user: ExtendedUserWithProfile;
  onSubmit: (newRole: ExtendedUserWithProfile['role']) => void;
  onClose: () => void;
};

const roles: { value: ExtendedUserWithProfile['role']; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'hr', label: 'Recursos Humanos' },
  { value: 'lead_project', label: 'Líder de Proyecto' },
  { value: 'volunteer', label: 'Voluntario' },
  { value: 'unassigned', label: 'Sin Asignar' },
];

export default function ChangeRoleModal({ user, onSubmit, onClose }: Props) {
  const [role, setRole] = useState<ExtendedUserWithProfile['role']>(user.role);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800">Cambiar rol</h3>
        <p className="text-sm text-slate-500 mt-1">{user.name} — {user.email}</p>

        <div className="mt-4 space-y-3">
          <label className="text-sm font-medium text-slate-700">Nuevo rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as ExtendedUserWithProfile['role'])}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="btn-secondary">Cancelar</button>
          <button onClick={() => onSubmit(role)} className="btn-living">Guardar</button>
        </div>
      </div>
    </div>
  );
}
