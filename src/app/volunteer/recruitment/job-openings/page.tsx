// src/app/volunteer/recruitment/job-openings/page.tsx
'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight,
  Filter,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Zap
} from 'lucide-react';

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

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    'Principiante': 'bg-gray-100 text-gray-700 border-gray-300',
    'Intermedio': 'bg-gray-100 text-gray-700 border-gray-300',
    'Avanzado': 'bg-gray-100 text-gray-700 border-gray-300'
  };
  return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-700';
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

export default function VolunteerJobOpenings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');

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
  const stats = {
    total: mockJobOpenings.length,
    urgent: mockJobOpenings.filter(j => j.urgent).length,
    applications: mockJobOpenings.reduce((acc, job) => acc + job.applicants, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 translate-x-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-16 -translate-x-16" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold flex items-center gap-2">
                  Vacantes Disponibles
                  <Sparkles className="w-7 h-7" />
                </h1>
              </div>
            </div>
            <p className="text-green-100 text-lg mb-6">
              Descubre oportunidades para contribuir y crecer con nosotros
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-bold text-2xl">{stats.total}</span>
                </div>
                <p className="text-sm text-green-200">Vacantes Activas</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold text-2xl">{stats.urgent}</span>
                </div>
                <p className="text-sm text-green-200">Urgentes</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-5 h-5" />
                  <span className="font-bold text-2xl">{stats.applications}</span>
                </div>
                <p className="text-sm text-green-200">Aplicaciones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por rol, equipo o habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select 
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              >
                <option value="all">Todas</option>
                <option value="urgent">Urgentes</option>
                <option value="remote">Remotas</option>
                <option value="featured">Destacadas</option>
              </select>
              
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
              >
                <option value="all">Todos los equipos</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">
              Mostrando <span className="text-green-600 font-bold">{filteredJobs.length}</span> de {stats.total} vacantes
            </span>
            {(selectedFilter !== 'all' || selectedTeam !== 'all') && (
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSelectedTeam('all');
                  setSearchTerm('');
                }}
                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
              >
                <Filter className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Lista de trabajos */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron vacantes</h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros de búsqueda o explora otras categorías
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
                setSelectedTeam('all');
              }}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="group bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                {/* Badges */}
                {(job.urgent || job.featured) && (
                  <div className="flex gap-2 p-4 pb-0">
                    {job.urgent && (
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        URGENTE
                      </span>
                    )}
                    {job.featured && (
                      <span className="bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                        DESTACADA
                      </span>
                    )}
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl group-hover:text-green-600 transition-colors mb-2">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">{job.team}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyColor(job.difficulty)}`}>
                      {job.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{job.timeCommitment}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 font-medium">{job.applicants} aplicaciones</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 mt-auto">
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(job.datePosted)}
                    </span>
                    
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all hover:shadow-lg group">
                      Ver Detalles
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}