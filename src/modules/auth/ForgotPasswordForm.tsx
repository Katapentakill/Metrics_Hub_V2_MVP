// src/modules/auth/ForgotPasswordForm.tsx
'use client';

import { useState } from 'react';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ForgotPasswordFormProps {
  className?: string;
}

export default function ForgotPasswordForm({ className = '' }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);

    // Redirigir después de 3 segundos
    setTimeout(() => {
      router.push('/login?message=Revisa tu email para restablecer tu contraseña');
    }, 3000);
  }

  // Vista de éxito
  if (isSuccess) {
    return (
      <div className={`forgot-password-content ${className}`}>
        <div className="forgot-password-success-card">
          <div className="forgot-password-success-icon-wrapper">
            <CheckCircle className="forgot-password-success-icon" />
          </div>
          
          <h2 className="forgot-password-success-title">¡Email Enviado!</h2>
          
          <p className="forgot-password-success-description">
            Hemos enviado las instrucciones para restablecer tu contraseña a:
          </p>
          
          <p className="forgot-password-success-email">{email}</p>
          
          <p className="forgot-password-success-note">
            Revisa tu bandeja de entrada y carpeta de spam.
          </p>
          
          <p className="forgot-password-success-redirect">
            Redirigiendo al login en unos segundos...
          </p>
        </div>
      </div>
    );
  }

  // Vista del formulario
  return (
    <div className={`forgot-password-content ${className}`}>
      {/* Tarjeta principal del formulario */}
      <div className="forgot-password-form-card">
        
        {/* Header del formulario */}
        <div className="forgot-password-form-header">
          <h2 className="forgot-password-form-title">
            Restablecer Contraseña
          </h2>
          <p className="forgot-password-form-description">
            Ingresa tu email y te enviaremos instrucciones
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="forgot-password-input-group">
            <label htmlFor="email" className="forgot-password-input-label">
              Email
            </label>
            <div className="forgot-password-input-wrapper">
              <Mail className="forgot-password-input-icon" aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="forgot-password-input-field"
                placeholder="tu@email.com"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading || !email}
            className="forgot-password-button-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 forgot-password-spinner" />
                <span>Enviando...</span>
              </>
            ) : (
              <span>Enviar Instrucciones</span>
            )}
          </button>
        </form>

        {/* Link de regreso */}
        <button
          onClick={() => router.push('/login')}
          className="forgot-password-back-link"
          disabled={isLoading}
          type="button"
        >
          <ArrowLeft className="forgot-password-back-link-icon" />
          Volver al login
        </button>
      </div>

      {/* Nota informativa */}
      <div className="forgot-password-info-box">
        <strong>Nota:</strong> Este es un prototipo. En producción, aquí se enviaría un email real con un enlace seguro para restablecer la contraseña.
      </div>
    </div>
  );
}