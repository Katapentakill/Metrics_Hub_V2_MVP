// src/features/admin/projects/ProjectActions.tsx
'use client';

import { Edit, Download, Trash2 } from 'lucide-react';

interface Props {
  onEdit: () => void;
  onExport: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ProjectActions({ onEdit, onExport, onDelete, onClose }: Props) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
      <button onClick={() => { onEdit(); onClose(); }} className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50">
        <Edit className="w-4 h-4 text-slate-500" /><span className="text-sm">Editar</span>
      </button>
      <button onClick={() => { onExport(); onClose(); }} className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50">
        <Download className="w-4 h-4 text-slate-500" /><span className="text-sm">Exportar</span>
      </button>
      <button onClick={() => { onDelete(); onClose(); }} className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50">
        <Trash2 className="w-4 h-4 text-red-500" /><span className="text-sm text-red-600">Eliminar</span>
      </button>
    </div>
  );
}
