import React from 'react';
import { 
  Pencil, Mail, KeyRound, Shield, UserX, Download, Trash2 
} from 'lucide-react';
import { ExtendedUserWithProfile } from '@/lib/types';

type Props = {
  user: ExtendedUserWithProfile;
  onEdit: () => void;
  onChangeRole: () => void;
  onResetPassword: () => void;
  onSuspend: () => void;
  onExport: () => void;
  onDelete: () => void;
  onClose: () => void;
};

const Item: React.FC<{
  icon: React.ElementType; label: string; hint?: string; color?: string; onClick: () => void;
}> = ({ icon: Icon, label, hint, color = 'text-slate-700', onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-start space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 text-left"
  >
    <Icon className={`w-4 h-4 mt-0.5 ${color}`} />
    <div>
      <p className={`text-sm font-medium ${color}`}>{label}</p>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  </button>
);

export default function UserActions({
  user, onEdit, onChangeRole, onResetPassword, onSuspend, onExport, onDelete, onClose
}: Props) {
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-20">
      <div className="px-3 py-2 border-b border-slate-200">
        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
        <p className="text-xs text-slate-500">{user.email}</p>
      </div>

      <div className="py-2 space-y-1">
        <Item icon={Pencil} label="Editar Usuario" onClick={onEdit} />
        <Item icon={Mail} label="Enviar Email" onClick={onClose} />
      </div>

      <div className="py-2 space-y-1 border-y border-slate-200">
        <Item icon={KeyRound} label="Resetear Contraseña" onClick={onResetPassword} color="text-amber-600" />
        <Item icon={Shield} label="Cambiar Rol" onClick={onChangeRole} color="text-indigo-600" />
        <Item icon={UserX} label="Suspender Usuario" onClick={onSuspend} color="text-red-600" />
      </div>

      <div className="py-2 space-y-1">
        <Item icon={Download} label="Exportar Datos" onClick={onExport} />
        <Item icon={Trash2} label="Eliminar Usuario" onClick={onDelete} color="text-red-600" />
      </div>
    </div>
  );
}
