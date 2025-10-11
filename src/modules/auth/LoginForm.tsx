// src/modules/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { loginAction } from './actions';

interface LoginFormProps {
  className?: string;
}

export default function LoginForm({ className = '' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginAction(formData);
      
      if (!result.success) {
        setError(result.error || 'Error desconocido');
        return;
      }

      if (result.user) {
        const session = {
          userId: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
          avatar: result.user.avatar,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('auth_session', JSON.stringify(session));
        window.location.href = result.redirectPath || '/volunteer/profile';
      }

    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`login-content ${className}`}>
      {/* Tarjeta principal del formulario */}
      <div className="login-form-card">
        
        {/* Header del formulario */}
        <div className="login-form-header">
          <h1 className="login-form-title">Bienvenido</h1>
          <p className="login-form-description">
            Ingresa a tu cuenta de Living Stones
          </p>
        </div>

        <form action={handleSubmit}>
          {/* Campo Email */}
          <div className="login-input-group">
            <label htmlFor="email" className="login-input-label">
              Email
            </label>
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" aria-hidden="true" />
              <input
                type="email"
                id="email"
                name="email"
                required
                className="login-input-field"
                placeholder="tu@email.com"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="login-input-group">
            <label htmlFor="password" className="login-input-label">
              Contraseña
            </label>
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="login-input-field login-input-field-with-button"
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-input-toggle-btn"
                disabled={isLoading}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="login-alert login-alert-error" role="alert">
              <span>{error}</span>
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-button-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 login-spinner" />
                <span>Ingresando...</span>
              </>
            ) : (
              <span>Ingresar</span>
            )}
          </button>
        </form>

        {/* Links de ayuda */}
        <div className="login-links">
          <a href="/forgot-password" className="login-link">
            ¿Olvidaste tu contraseña?
          </a>
          <div className="login-link-secondary" style={{ marginTop: '0.5rem' }}>
            ¿No tienes cuenta?{' '}
            <a href="/register" className="login-link-bold">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>

      {/* Credenciales de prueba */}
      <div className="login-credentials-box">
        <h3 className="login-credentials-title">
          <span role="img" aria-label="llave">🔑</span>
          Credenciales de prueba:
        </h3>
        <div className="login-credentials-list">
          <div className="login-credentials-item">
            <span className="login-credentials-label">Admin:</span> admin_1@example.com
          </div>
          <div className="login-credentials-item">
            <span className="login-credentials-label">HR:</span> hr_1@example.com
          </div>
          <div className="login-credentials-item">
            <span className="login-credentials-label">Lead:</span> lead_1@example.com
          </div>
          <div className="login-credentials-item">
            <span className="login-credentials-label">Volunteer:</span> volunteer_1@example.com
          </div>
          <div className="login-credentials-item login-credentials-divider">
            <span className="login-credentials-label">Password:</span> password123
          </div>
        </div>
      </div>
    </div>
  );
}