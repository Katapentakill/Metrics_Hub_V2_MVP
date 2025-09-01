import React from 'react';

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmDeleteModal({ title, message, confirmText = 'Confirmar', onConfirm, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600 mt-2">{message}</p>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="btn-secondary">Cancelar</button>
          <button onClick={onConfirm} className="btn-danger">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
