// src/app/(public)/register/page.tsx
'use client';

import { useGuestGuard } from '@/lib/auth';
import RegisterForm from '@/modules/auth/RegisterForm';
import '@/styles/register.css';

export default function RegisterPage() {
  useGuestGuard();

  const currentYear = new Date().getFullYear();

  return (
    <div className="register-container">
      {/* Fondo decorativo */}
      <div className="register-bg-pattern" aria-hidden="true"></div>

      {/* Contenido principal */}
      <main className="register-content">
        <header className="register-header">
          <div 
            className="register-logo" 
            role="img" 
            aria-label="Logo de Living Stones"
          >
            <div className="register-logo-inner">
              <div className="register-logo-dot"></div>
            </div>
          </div>
          <h1 className="register-title">Living Stones</h1>
          <p className="register-subtitle">Sistema de Voluntarios</p>
        </header>

        <RegisterForm />

        <footer className="register-footer">
          <p>© {currentYear} Living Stones. Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}