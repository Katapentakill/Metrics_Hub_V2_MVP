import React, { useState } from 'react';

type Props = {
  userEmail: string;
  onSubmit: (newPassword: string) => void;
  onClose: () => void;
};

export default function ResetPasswordModal({ userEmail, onSubmit, onClose }: Props) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const canSave = password.length >= 8;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800">Resetear contraseña</h3>
        <p className="text-sm text-slate-500 mt-1">{userEmail}</p>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-slate-700">Nueva contraseña</label>
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button onClick={() => setShow(s => !s)} className="text-xs text-slate-500 underline">
            {show ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="btn-secondary">Cancelar</button>
          <button disabled={!canSave} onClick={() => onSubmit(password)} className="btn-living disabled:opacity-50">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
