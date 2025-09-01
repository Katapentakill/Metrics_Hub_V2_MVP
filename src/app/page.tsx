'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const session = getAuthSession()
    
    if (session) {
      // Redirigir según el rol si está autenticado
      const redirectPaths = {
        admin: '/admin/dashboard',
        hr: '/hr/dashboard',
        lead_project: '/lead_project/projects',
        volunteer: '/volunteer/profile',
        unassigned: '/volunteer/profile'
      }
      router.push(redirectPaths[session.role])
    } else {
      // Si no está autenticado, ir a login
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-living-green-50 via-white to-living-green-100">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-living-green-500 to-living-green-600 rounded-2xl shadow-lg mb-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-living-green-500 rounded-sm"></div>
          </div>
        </div>
        <div className="animate-pulse text-living-green-600">
          Cargando...
        </div>
      </div>
    </div>
  )
}