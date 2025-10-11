// src/app/(public)/login/page.tsx
'use client';

import { useGuestGuard } from '@/lib/auth';
import LoginForm from '@/modules/auth/LoginForm';
import '@/styles/login.css';
import { Metadata } from 'next';

// Nota: Para metadata en client components, considera mover esto a layout.tsx
// export const metadata: Metadata = {
//   title: 'Iniciar Sesión | Living Stones',
//   description: 'Sistema de Gestión de Voluntarios',
// };

export default function LoginPage() {
  useGuestGuard();

  const currentYear = new Date().getFullYear();

  return (
    <div className="login-container">
      {/* Fondo decorativo SVG */}
      <div className="login-bg-pattern" aria-hidden="true"></div>

      {/* Contenido principal */}
      <main className="login-content">
        <header className="login-header">
          <div className="login-logo" role="img" aria-label="Logo de Living Stones">
            <div className="login-logo-inner">
              <div className="login-logo-dot"></div>
            </div>
          </div>
          <h1 className="login-title">Living Stones</h1>
          <p className="login-subtitle">Sistema de Voluntarios</p>
        </header>

        <LoginForm />

        <footer className="login-footer">
          <p>© {currentYear} Living Stones. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}