'use client';

import { useState } from 'react';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
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

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      router.push('/login?message=Revisa tu email para restablecer tu contraseña');
    }, 3000);
  }

  if (isSuccess) {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <div className="card p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-living-green-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gradient">¡Email Enviado!</h1>
            <p className="text-muted">
              Hemos enviado las instrucciones para restablecer tu contraseña a:
            </p>
            <p className="font-medium text-secondary">{email}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted">
              Revisa tu bandeja de entrada y carpeta de spam.
            </p>
            
            <div className="text-sm text-muted">
              Redirigiendo al login en unos segundos...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="card p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Restablecer Contraseña</h1>
          <p className="text-muted">Ingresa tu email y te enviaremos instrucciones</p>
        </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field has-icon w-full"
                placeholder="tu@email.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="btn-living w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Instrucciones'
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
            disabled={isLoading}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al login
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-700">
          <strong>Nota:</strong> Este es un prototipo. En producción, aquí se enviaría un email real con un enlace seguro para restablecer la contraseña.
        </div>
      </div>
    </div>
  );
}