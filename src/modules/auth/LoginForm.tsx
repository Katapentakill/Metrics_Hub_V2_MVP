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
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="card p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Bienvenido</h1>
          <p className="text-muted">Ingresa a tu cuenta de Living Stones</p>
        </div>

        <form action={handleSubmit} className="space-y-4">
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
          <div><strong>Admin:</strong> admin_1@example.com</div>
          <div><strong>HR:</strong> hr_1@example.com</div>
          <div><strong>Lead:</strong> lead_1@example.com</div>
          <div><strong>Volunteer:</strong> volunteer_1@example.com</div>
          <div className="mt-1"><strong>Password:</strong> password123</div>
        </div>
      </div>
    </div>
  );
}