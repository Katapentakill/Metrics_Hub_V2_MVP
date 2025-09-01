import React, { useState } from 'react';
import { ExtendedUserWithProfile } from '@/lib/types';

type Props = {
  user: ExtendedUserWithProfile;
  onSubmit: (reason: string, until?: string) => void;
  onClose: () => void;
};

export default function SuspendUserModal({ user, onSubmit, onClose }: Props) {
  const [reason, setReason] = useState('');
  const [until, setUntil] = useState<string>('');

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800">Suspender usuario</h3>
        <p className="text-sm text-slate-500 mt-1">{user.name} — {user.email}</p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Motivo</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              rows={3}
              placeholder="Motivo de suspensión..."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Hasta (opcional)</label>
            <input
              type="date"
              value={until}
              onChange={(e) => setUntil(e.target.value)}
              className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="btn-secondary">Cancelar</button>
          <button
            onClick={() => onSubmit(reason.trim(), until || undefined)}
            className="btn-danger"
            disabled={!reason.trim()}
          >
            Suspender
          </button>
        </div>
      </div>
    </div>
  );
}
