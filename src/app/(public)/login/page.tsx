'use client';

import { useGuestGuard } from '@/lib/auth';
import LoginForm from '@/modules/auth/LoginForm';

export default function LoginPage() {
  useGuestGuard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-living-green-50 via-white to-living-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo decorativo SVG */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2316a34a%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 pointer-events-none"></div>

      {/* Contenido principal */}
      <div className="relative w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-2xl shadow-lg mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-living-green-500 rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-living-green-500 to-living-green-700 text-transparent bg-clip-text">
            Living Stones
          </h1>
          <p className="text-muted text-sm">Sistema de Voluntarios</p>
        </div>

        <LoginForm />

        <div className="text-center mt-8 text-xs text-muted">
          <p>© 2024 Living Stones. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
