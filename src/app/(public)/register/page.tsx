// src/app/(public)/register/page.tsx
'use client';

import { useGuestGuard } from '@/lib/auth';
import RegisterForm from '@/modules/auth/RegisterForm';

export default function RegisterPage() {
  useGuestGuard();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-white to-green-100 py-8 px-4 relative overflow-hidden">
      {/* Fondo SVG decorativo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%2316a34a%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 pointer-events-none"></div>

      {/* Contenido principal */}
      <div className="relative container mx-auto z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Únete a Living Stones
          </h1>
          <p className="text-gray-600">Crea tu cuenta y comienza a hacer la diferencia</p>
        </div>

        <RegisterForm />

        <div className="text-center mt-8 text-xs text-gray-500">
          <p>© 2024 Living Stones. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}