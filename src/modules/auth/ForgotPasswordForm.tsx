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

    try {
      const { forgotPasswordAction } = await import('@/lib/auth/authActions');
      
      const result = await forgotPasswordAction(email);
      
      if (result.success) {
        setIsSuccess(true);
        // Show the new password for demo purposes
        alert(`Nueva contraseña generada: ${result.newPassword}\n\nGuárdala en un lugar seguro.`);
        
        setTimeout(() => {
          router.push('/login?message=Tu nueva contraseña ha sido generada');
        }, 3000);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className={`w-full max-w-md mx-auto ${className}`}>
        <div className="card p-8 space-y-6 text-center">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-living-green-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gradient">¡Contraseña Restablecida!</h1>
            <p className="text-muted">
              Se ha generado una nueva contraseña para:
            </p>
            <p className="font-medium text-secondary">{email}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted">
              La nueva contraseña se mostró en una ventana emergente.
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
          <strong>Nota:</strong> Este es un sistema de demo. En producción, se enviaría un email real con un enlace seguro para restablecer la contraseña.
        </div>
      </div>
    </div>
  );
}