// src/app/(public)/forgot-password/page.tsx
'use client';

import { useGuestGuard } from '@/lib/auth';
import ForgotPasswordForm from '@/modules/auth/ForgotPasswordForm';
import '@/styles/forgot-password.css';

export default function ForgotPasswordPage() {
  useGuestGuard();

  return (
    <div className="forgot-password-container">
      {/* Fondo SVG decorativo con color green-800 institucional */}
      <div className="forgot-password-bg"></div>

      {/* Contenido principal */}
      <div className="forgot-password-content">
        {/* Logo institucional con gradiente green-800 a emerald */}
        <div className="forgot-password-header">
          <div className="forgot-password-logo">
            <div className="forgot-password-logo-inner">
              <div className="forgot-password-logo-dot"></div>
            </div>
          </div>
          
          {/* Título con gradiente institucional */}
          <h1 className="forgot-password-title">
            Living Stones
          </h1>
          
          {/* Subtítulo con color texto normal */}
          <p className="forgot-password-subtitle">Sistema de Voluntarios</p>
        </div>

        {/* Formulario de recuperación de contraseña */}
        <ForgotPasswordForm />

        {/* Footer con texto muted */}
        <div className="forgot-password-footer">
          <p>© 2024 Living Stones. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}