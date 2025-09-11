'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { loginAction, completeTwoFactorAction } from '@/lib/auth/authActions';

interface LoginFormProps {
  className?: string;
}

export default function LoginForm({ className = '' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await loginAction(email, password);
      
      if (!result.success) {
        setError(result.error || 'Error desconocido');
        return;
      }

      if (result.requiresTwoFactor && result.user) {
        setRequiresTwoFactor(true);
        setCurrentUser(result.user);
        return;
      }

      if (result.user && result.redirectPath) {
        window.location.href = result.redirectPath;
      }

    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleTwoFactorSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await completeTwoFactorAction(currentUser.id, twoFactorCode);
      
      if (!result.success) {
        setError(result.error || 'Código inválido');
        return;
      }

      if (result.redirectPath) {
        window.location.href = result.redirectPath;
      }

    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="card p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Bienvenido</h1>
          <p className="text-muted">Ingresa a tu cuenta de Living Stones</p>
        </div>

        {!requiresTwoFactor ? (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="input-icon w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input-field has-icon w-full"
                placeholder="tu@email.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="input-icon w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                className="input-field has-icon w-full pr-12"
                placeholder="••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-living w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>
        ) : (
          <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-secondary mb-2">
                Verificación en Dos Pasos
              </h3>
              <p className="text-muted">
                Ingresa el código de 6 dígitos para {currentUser?.email}
              </p>
            </div>

            <div className="input-group">
              <label htmlFor="twoFactorCode" className="block text-sm font-medium text-secondary mb-2">
                Código de Verificación
              </label>
              <div className="relative">
                <Lock className="input-icon w-5 h-5" />
                <input
                  type="text"
                  id="twoFactorCode"
                  name="twoFactorCode"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  required
                  maxLength={6}
                  className="input-field has-icon w-full text-center text-2xl tracking-widest"
                  placeholder="000000"
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-muted mt-1">
                Para demo: ingresa cualquier código de 6 dígitos
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || twoFactorCode.length !== 6}
              className="btn-living w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar Código'
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setRequiresTwoFactor(false);
                setCurrentUser(null);
                setTwoFactorCode('');
                setError(null);
              }}
              className="w-full text-sm text-muted hover:text-secondary transition-colors"
            >
              ← Volver al login
            </button>
          </form>
        )}

        <div className="text-center space-y-2">
          <a href="/forgot-password" className="text-sm text-primary hover:underline transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
          <div className="text-sm text-muted">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-primary hover:underline font-medium transition-colors">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-2">🔑 Credenciales de prueba:</h3>
        <div className="space-y-1 text-xs text-slate-600">
          <div><strong>Admin:</strong> alex@metrics.com (admin123)</div>
          <div><strong>HR:</strong> sarah@metrics.com (hr123)</div>
          <div><strong>Senior HR:</strong> mike@metrics.com (seniorhr123)</div>
          <div><strong>Project Manager:</strong> lisa@metrics.com (pm123)</div>
          <div><strong>Volunteer:</strong> tom@metrics.com (volunteer123)</div>
          <div><strong>Unassigned:</strong> guest@metrics.com (guest123)</div>
          <div className="mt-2 text-xs text-slate-500">
            <strong>Nota:</strong> Alex, Sarah y Mike tienen 2FA habilitado
          </div>
        </div>
      </div>
    </div>
  );
}