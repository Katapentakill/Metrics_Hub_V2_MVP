// src/app/volunteer/recruitment/job-openings/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Search, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight,
  Filter,
  Star,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Datos simulados mejorados con más información
const mockJobOpenings = [
  {
    id: 'job-1',
    title: 'Asistente de Marketing Digital',
    team: 'Marketing',
    type: 'Voluntario',
    description: 'Apoya en la gestión de redes sociales y la creación de contenido para campañas. Colabora con el equipo creativo en el desarrollo de estrategias digitales.',
    datePosted: '2025-09-10',
    urgent: false,
    skills: ['Social Media', 'Diseño Gráfico', 'Canva', 'Analytics'],
    timeCommitment: '10-15 horas/semana',
    location: 'Remoto',
    difficulty: 'Intermedio',
    applicants: 12,
    featured: true
  },
  {
    id: 'job-2',
    title: 'Coordinador de Eventos',
    team: 'Operaciones',
    type: 'Voluntario',
    description: 'Colabora en la planificación y ejecución de eventos y talleres para nuestra comunidad. Gestiona logística y coordina con proveedores.',
    datePosted: '2025-09-12',
    urgent: true,
    skills: ['Organización', 'Comunicación', 'Gestión de Proyectos', 'Liderazgo'],
    timeCommitment: '15-20 horas/semana',
    location: 'Híbrido',
    difficulty: 'Avanzado',
    applicants: 8,
    featured: false
  },
  {
    id: 'job-3',
    title: 'Tutor de Programación',
    team: 'Educación',
    type: 'Voluntario',
    description: 'Enseña conceptos básicos de programación a estudiantes principiantes. Crea material educativo y proporciona mentoría personalizada.',
    datePosted: '2025-09-08',
    urgent: false,
    skills: ['JavaScript', 'Python', 'Enseñanza', 'Paciencia'],
    timeCommitment: '5-10 horas/semana',
    location: 'Remoto',
    difficulty: 'Principiante',
    applicants: 25,
    featured: false
  },
  {
    id: 'job-4',
    title: 'Diseñador UX/UI',
    team: 'Tecnología',
    type: 'Voluntario',
    description: 'Diseña interfaces de usuario intuitivas y atractivas para nuestras plataformas digitales. Colabora estrechamente con desarrolladores.',
    datePosted: '2025-09-14',
    urgent: true,
    skills: ['Figma', 'Adobe XD', 'Prototipado', 'Research'],
    timeCommitment: '12-18 horas/semana',
    location: 'Remoto',
    difficulty: 'Avanzado',
    applicants: 5,
    featured: true
  }
];

export default function VolunteerJobOpeningsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Principiante': 'bg-green-100 text-green-700 border-green-200',
      'Intermedio': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Avanzado': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Hace 1 día';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.ceil(diffDays / 7)} semanas`;
    return `Hace ${Math.ceil(diffDays / 30)} meses`;
  };

  const filteredJobs = mockJobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesFilter = true;
    if (selectedFilter === 'urgent') matchesFilter = job.urgent;
    else if (selectedFilter === 'remote') matchesFilter = job.location === 'Remoto';
    else if (selectedFilter === 'featured') matchesFilter = job.featured;
    
    let matchesTeam = true;
    if (selectedTeam !== 'all') matchesTeam = job.team === selectedTeam;
    
    return matchesSearch && matchesFilter && matchesTeam;
  });

  const teams = [...new Set(mockJobOpenings.map(job => job.team))];

  return (
    <div className="space-y-8">
      {/* Header con estadísticas */}
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 rounded-2xl p-8 text-white relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3">Vacantes Disponibles</h1>
              <p className="text-green-100 text-lg mb-6">
                Descubre oportunidades para contribuir y crecer con nosotros
              </p>
              
              {/* Estadísticas rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-5 h-5" />
                    <span className="font-semibold">{mockJobOpenings.length}</span>
                  </div>
                  <p className="text-sm text-green-200">Vacantes Activas</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-semibold">{mockJobOpenings.filter(j => j.urgent).length}</span>
                  </div>
                  <p className="text-sm text-green-200">Urgentes</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{mockJobOpenings.reduce((acc, job) => acc + job.applicants, 0)}</span>
                  </div>
                  <p className="text-sm text-green-200">Aplicaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda mejorados */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Barra de búsqueda */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por rol, equipo o habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            
            {/* Filtros */}
            <div className="flex gap-3">
              <select 
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todas</option>
                <option value="urgent">Urgentes</option>
                <option value="remote">Remotas</option>
                <option value="featured">Destacadas</option>
              </select>
              
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todos los equipos</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Contador de resultados */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Mostrando {filteredJobs.length} de {mockJobOpenings.length} vacantes</span>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filtros activos: {[selectedFilter, selectedTeam].filter(f => f !== 'all').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de trabajos mejorada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden h-full flex flex-col">
            {/* Header con badges */}
            <div className="relative">
              {(job.urgent || job.featured) && (
                <div className="flex gap-2 p-3 pb-0">
                  {job.urgent && (
                    <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      🔥 URGENTE
                    </span>
                  )}
                  {job.featured && (
                    <span className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      ⭐ DESTACADA
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <CardContent className="p-6 flex-1 flex flex-col">
              {/* Título y equipo */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-green-600 transition-colors mb-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{job.team}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(job.difficulty)}`}>
                  {job.difficulty}
                </span>
              </div>
              
              {/* Descripción */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {job.description}
              </p>
              
              {/* Información de la posición */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{job.timeCommitment}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{job.applicants} aplicaciones</span>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{job.skills.length - 3} más
                    </span>
                  )}
                </div>
              </div>
              
              {/* Footer con tiempo y botón */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <span className="text-xs text-gray-500">
                  {getTimeAgo(job.datePosted)}
                </span>
                
                <Link href={`/volunteer/recruitment/job-openings/${job.id}`}>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-all duration-200 hover:shadow-lg group">
                    Ver Detalles
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío mejorado */}
      {filteredJobs.length === 0 && (
        <Card className="text-center p-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No se encontraron vacantes</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar tus filtros de búsqueda o explora otras categorías
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('all');
              setSelectedTeam('all');
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Limpiar Filtros
          </button>
        </Card>
      )}
    </div>
  );
}