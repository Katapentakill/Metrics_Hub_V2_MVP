// src/app/admin/recruitment/candidate-management/database/page.tsx
'use client';
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Users, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Download,
  Eye,
  Edit,
  UserPlus,
  BarChart3,
  TrendingUp,
  Award,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminPageLayout from '@/modules/recruitment/admin/components/AdminPageLayout';
import AdminDashboardStats from '@/modules/recruitment/admin/components/AdminDashboardStats';
import AdminAdvancedFilters from '@/modules/recruitment/admin/components/AdminAdvancedFilters';
import AdminStatusBadge from '@/modules/recruitment/admin/components/AdminStatusBadge';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { CANDIDATE_STATUSES, AVAILABLE_ROLES, VOLUNTEER_TYPES } from '@/modules/recruitment/shared/constants';

// Generar datos más ricos para la base de datos
const generateEnhancedCandidateData = (baseData: MockCandidate[]) => {
  return baseData.map((candidate, index) => ({
    ...candidate,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA'][index % 10],
    experience: Math.floor(Math.random() * 10) + 1,
    education: ['Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Associate Degree', 'High School'][Math.floor(Math.random() * 5)],
    skills: [
      ['JavaScript', 'React', 'Node.js'],
      ['Python', 'Data Analysis', 'SQL'],
      ['Design', 'Figma', 'Adobe Creative Suite'],
      ['Project Management', 'Agile', 'Scrum'],
      ['Marketing', 'SEO', 'Content Creation']
    ][Math.floor(Math.random() * 5)],
    salary: Math.floor(Math.random() * 50000) + 40000,
    availability: ['Immediate', 'Two Weeks', 'One Month', 'Flexible'][Math.floor(Math.random() * 4)],
    source: ['LinkedIn', 'Company Website', 'Referral', 'Job Board', 'Recruiter'][Math.floor(Math.random() * 5)],
    rating: Math.floor(Math.random() * 5) + 1,
    notes: Math.floor(Math.random() * 10) + 1,
    interviews: Math.floor(Math.random() * 3),
    lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  }));
};

const initialMockData = generateEnhancedCandidateData(getMockRecruitmentData(150));

export default function AdminCandidateDatabasePage() {
  const [candidates] = useState(initialMockData);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Filtros avanzados configuración
  const filterOptions = [
    {
      key: 'applicationStatus',
      label: 'Estado de Aplicación',
      type: 'select' as const,
      options: CANDIDATE_STATUSES.map(status => ({ value: status, label: status }))
    },
    {
      key: 'appliedRole',
      label: 'Rol Aplicado',
      type: 'select' as const,
      options: AVAILABLE_ROLES.map(role => ({ value: role, label: role }))
    },
    {
      key: 'volunteerType',
      label: 'Tipo de Voluntario',
      type: 'select' as const,
      options: VOLUNTEER_TYPES.map(type => ({ value: type, label: type }))
    },
    {
      key: 'location',
      label: 'Ubicación',
      type: 'select' as const,
      options: [...new Set(candidates.map(c => c.location))].map(loc => ({ value: loc, label: loc }))
    },
    {
      key: 'experience',
      label: 'Años de Experiencia',
      type: 'select' as const,
      options: [
        { value: '0-2', label: '0-2 años' },
        { value: '3-5', label: '3-5 años' },
        { value: '6-10', label: '6-10 años' },
        { value: '10+', label: '10+ años' }
      ]
    },
    {
      key: 'source',
      label: 'Fuente de Reclutamiento',
      type: 'select' as const,
      options: [...new Set(candidates.map(c => c.source))].map(source => ({ value: source, label: source }))
    },
    {
      key: 'availability',
      label: 'Disponibilidad',
      type: 'select' as const,
      options: [...new Set(candidates.map(c => c.availability))].map(avail => ({ value: avail, label: avail }))
    },
    {
      key: 'lastActivity',
      label: 'Última Actividad',
      type: 'date' as const
    }
  ];

  // Filtrar candidatos
  const filteredCandidates = useMemo(() => {
    let result = candidates;

    // Búsqueda por texto
    if (searchTerm) {
      result = result.filter(candidate =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.appliedRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Aplicar filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      
      if (key === 'experience') {
        const [min, max] = value.split('-').map(Number);
        if (value === '10+') {
          result = result.filter(c => c.experience >= 10);
        } else {
          result = result.filter(c => c.experience >= min && c.experience <= (max || min));
        }
      } else if (key === 'lastActivity') {
        result = result.filter(c => c.lastActivity >= value);
      } else {
        result = result.filter(c => c[key as keyof typeof c] === value);
      }
    });

    return result;
  }, [candidates, searchTerm, filters]);

  // Estadísticas para el dashboard - PALETA VERDE
  const databaseStats = [
    {
      title: 'Total Candidatos',
      value: candidates.length,
      change: { value: 12, type: 'increase' as const, period: 'mes anterior' },
      icon: Users,
      color: 'text-emerald-600',
    },
    {
      title: 'Candidatos Activos',
      value: candidates.filter(c => !['Rejected by HR', 'Rejected by PM', 'Rejected by Candidate'].includes(c.applicationStatus)).length,
      change: { value: 8, type: 'increase' as const, period: 'semana anterior' },
      icon: TrendingUp,
      color: 'text-teal-600',
    },
    {
      title: 'Promedio Experiencia',
      value: `${Math.round(candidates.reduce((sum, c) => sum + c.experience, 0) / candidates.length)} años`,
      change: { value: 5, type: 'increase' as const, period: 'año anterior' },
      icon: Award,
      color: 'text-green-600',
    },
    {
      title: 'Fuentes Activas',
      value: new Set(candidates.map(c => c.source)).size,
      change: { value: 15, type: 'increase' as const, period: 'trimestre anterior' },
      icon: BarChart3,
      color: 'text-lime-600',
    },
  ];

  const handleFiltersChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const handleExport = () => {
    console.log('Exportando base de datos de candidatos...');
  };

  const getStatusBadgeProps = (status: string) => {
    if (status.includes('Rejected')) return { status: 'closed' as const, text: 'Rechazado' };
    if (status.includes('Accepted') || status === 'Onboard') return { status: 'success' as const, text: 'Aprobado' };
    if (status.includes('Interview')) return { status: 'warning' as const, text: 'Entrevista' };
    if (status.includes('Review')) return { status: 'info' as const, text: 'Revisión' };
    return { status: 'pending' as const, text: status };
  };

  const headerActions = (
    <>
      <Button variant="outline" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button size="lg" className="shadow-lg">
        <UserPlus className="mr-2 h-5 w-5" />
        Agregar Candidato
      </Button>
    </>
  );

  return (
    <AdminPageLayout
      title="Base de Datos de Candidatos"
      subtitle="Panel de Administración"
      description="Accede a un repositorio completo con todos los perfiles de candidatos en la historia de la organización. Busca, filtra y gestiona información detallada de cada candidato."
      icon={Search}
      breadcrumbItems={[
        { label: 'Recruitment', href: '/admin/recruitment' },
        { label: 'Candidate Management', href: '/admin/recruitment/candidate-management' },
        { label: 'Database' }
      ]}
      headerActions={headerActions}
    >
      <AdminDashboardStats stats={databaseStats} />

      {/* Búsqueda Principal */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nombre, email, rol, ubicación o habilidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-base"
              />
            </div>
            <div className="text-sm text-gray-600">
              {filteredCandidates.length} de {candidates.length} candidatos
            </div>
          </div>
        </CardContent>
      </Card>

      <AdminAdvancedFilters
        filters={filterOptions}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        activeFilters={filters}
      />

      {/* Vista de Tabla */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Lista de Candidatos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol & Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experiencia & Educación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Habilidades
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Actividad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => {
                  const statusProps = getStatusBadgeProps(candidate.applicationStatus);
                  return (
                    <tr key={candidate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {candidate.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-1 mb-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {candidate.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 mb-1">{candidate.appliedRole}</div>
                        <AdminStatusBadge status={statusProps.status} size="sm">
                          {statusProps.text}
                        </AdminStatusBadge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-1 mb-1">
                          <Briefcase className="w-3 h-3 text-gray-400" />
                          {candidate.experience} años exp.
                        </div>
                        <div className="text-gray-500">{candidate.education}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {candidate.lastActivity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" title="Ver detalles">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" title="Editar">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron candidatos</h3>
            <p className="text-gray-500">
              Intenta ajustar los filtros de búsqueda o términos para encontrar candidatos.
            </p>
            <Button variant="outline" onClick={handleClearFilters} className="mt-4">
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resumen de Estadísticas - PALETA VERDE */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-emerald-600">{new Set(candidates.map(c => c.appliedRole)).size}</div>
            <div className="text-sm text-gray-600">Roles Únicos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-teal-600">{new Set(candidates.map(c => c.location)).size}</div>
            <div className="text-sm text-gray-600">Ubicaciones</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              ${Math.round(candidates.reduce((sum, c) => sum + c.salary, 0) / candidates.length / 1000)}K
            </div>
            <div className="text-sm text-gray-600">Salario Promedio</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-lime-600">{new Set(candidates.map(c => c.source)).size}</div>
            <div className="text-sm text-gray-600">Fuentes de Reclutamiento</div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
}