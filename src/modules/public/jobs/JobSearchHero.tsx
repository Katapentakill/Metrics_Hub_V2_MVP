// src/modules/public/jobs/JobSearchHero.tsx
'use client';

import { Search, MapPin, Briefcase } from 'lucide-react';
import { JobCategory } from '@/lib/types/jobOpenings';

interface JobSearchHeroProps {
  onSearch: (filters: {
    searchTerm: string;
    category: JobCategory | undefined;
    location: string;
  }) => void;
}

export default function JobSearchHero({ onSearch }: JobSearchHeroProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoryValue = formData.get('category') as string;

    onSearch({
      searchTerm: formData.get('search') as string,
      category: categoryValue === '' ? undefined : (categoryValue as JobCategory),
      location: formData.get('location') as string,
    });
  };

  const categories: (JobCategory | '')[] = [
    '',
    'Technology',
    'Design',
    'Marketing',
    'Operations',
    'Human Resources',
    'Finance',
    'Legal',
    'Other',
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            ¡Únete a Living Stones!
          </h1>
          <p className="text-xl sm:text-2xl text-green-50 mb-2">
            Encuentra oportunidades de voluntariado que transforman vidas
          </p>
          <p className="text-green-100 text-lg">
            Más de <span className="font-bold text-white">25 posiciones</span> disponibles en diferentes áreas
          </p>
        </div>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Búsqueda por palabras clave */}
              <div className="md:col-span-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Cargo o categoría"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-gray-900 placeholder-gray-400 transition-all"
                  />
                </div>
              </div>

              {/* Categoría */}
              <div className="md:col-span-3">
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="category"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-gray-900 appearance-none bg-white transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat || 'all'} value={cat}>
                        {cat || 'Todas las categorías'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ubicación */}
              <div className="md:col-span-3">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="location"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-gray-900 appearance-none bg-white transition-all cursor-pointer"
                  >
                    <option value="">Todas las ubicaciones</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>
              </div>

              {/* Botón de búsqueda */}
              <div className="md:col-span-1">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-10">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">25+</div>
            <div className="text-green-100 text-sm mt-1">Ofertas activas</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-green-100 text-sm mt-1">Remoto</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">8</div>
            <div className="text-green-100 text-sm mt-1">Categorías</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-3xl font-bold">∞</div>
            <div className="text-green-100 text-sm mt-1">Impacto</div>
          </div>
        </div>
      </div>
    </div>
  );
}
