// src/app/hr/recruitment/evaluation/interview-management/page.tsx
import { CalendarCheck, Clock, Users, MapPin, Video, Phone, MessageSquare, Filter, Plus, Calendar, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminPageLayout from '@/modules/recruitment/hr/components/AdminPageLayout';

// Mock data for interviews
const todayInterviews = [
  {
    id: 1,
    candidateName: 'María González',
    position: 'Frontend Developer',
    time: '09:00 AM',
    duration: '45 min',
    interviewer: 'Carlos Ruiz',
    type: 'video',
    status: 'confirmed',
    location: 'Zoom Meeting'
  },
  {
    id: 2,
    candidateName: 'Juan Pérez',
    position: 'Backend Developer',
    time: '11:30 AM',
    duration: '60 min',
    interviewer: 'Ana López',
    type: 'presencial',
    status: 'pending',
    location: 'Sala de Juntas A'
  },
  {
    id: 3,
    candidateName: 'Sofia Martín',
    position: 'UX Designer',
    time: '02:00 PM',
    duration: '45 min',
    interviewer: 'Diego Torres',
    type: 'phone',
    status: 'confirmed',
    location: 'Llamada telefónica'
  },
  {
    id: 4,
    candidateName: 'Roberto Silva',
    position: 'Project Manager',
    time: '04:30 PM',
    duration: '30 min',
    interviewer: 'Laura Vega',
    type: 'video',
    status: 'rescheduled',
    location: 'Google Meet'
  }
];

const upcomingInterviews = [
  {
    date: 'Mañana',
    count: 6,
    interviews: [
      { time: '10:00 AM', candidate: 'Andrea Morales', position: 'Data Analyst' },
      { time: '02:30 PM', candidate: 'Miguel Santos', position: 'DevOps Engineer' }
    ]
  },
  {
    date: 'Viernes',
    count: 4,
    interviews: [
      { time: '09:30 AM', candidate: 'Carmen Jiménez', position: 'Marketing Manager' },
      { time: '03:00 PM', candidate: 'Fernando Castro', position: 'Sales Representative' }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'rescheduled': return 'bg-orange-100 text-orange-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return <Video className="w-4 h-4" />;
    case 'phone': return <Phone className="w-4 h-4" />;
    case 'presencial': return <MapPin className="w-4 h-4" />;
    default: return <CalendarCheck className="w-4 h-4" />;
  }
};

export default function InterviewManagementPage() {
  return (
    <AdminPageLayout
      title="Gestión de Entrevistas"
      subtitle="Panel de Control"
      description="Supervisa y coordina todas las entrevistas programadas por el equipo. Gestiona horarios, confirma asistencias y mantén un seguimiento completo del proceso de evaluación."
      icon={CalendarCheck}
      iconGradient="bg-gradient-to-br from-green-500 to-blue-600"
      breadcrumbItems={[
        { label: 'Recruitment', href: '/hr/recruitment' },
        { label: 'Evaluación', href: '/hr/recruitment/evaluation' },
        { label: 'Gestión de Entrevistas' }
      ]}
      headerActions={
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Entrevista
          </Button>
        </div>
      }
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Hoy</p>
              <p className="text-2xl font-bold text-blue-900">8</p>
              <p className="text-xs text-blue-600">entrevistas</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Esta Semana</p>
              <p className="text-2xl font-bold text-green-900">23</p>
              <p className="text-xs text-green-600">programadas</p>
            </div>
            <CalendarCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pendientes</p>
              <p className="text-2xl font-bold text-yellow-900">12</p>
              <p className="text-xs text-yellow-600">confirmación</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Entrevistadores</p>
              <p className="text-2xl font-bold text-purple-900">15</p>
              <p className="text-xs text-purple-600">activos</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Interviews */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-blue-600" />
                Entrevistas de Hoy
                <span className="ml-auto text-sm font-normal text-gray-500">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(interview.type)}
                            <span className="font-semibold text-gray-900">{interview.candidateName}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                            {interview.status === 'confirmed' ? 'Confirmada' : 
                             interview.status === 'pending' ? 'Pendiente' : 
                             interview.status === 'rescheduled' ? 'Reprogramada' : 'Cancelada'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{interview.position}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {interview.time} ({interview.duration})
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {interview.interviewer}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {interview.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Interviews */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Próximas Entrevistas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((day, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{day.date}</h4>
                      <span className="text-sm text-gray-500">{day.count} entrevistas</span>
                    </div>
                    <div className="space-y-2">
                      {day.interviews.map((interview, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{interview.time}</span>
                            <span className="text-gray-500">{interview.candidate}</span>
                          </div>
                          <p className="text-gray-400 text-xs">{interview.position}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Calendario Completo
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Programar Entrevista
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Ver Disponibilidad
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Enviar Recordatorios
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Horarios
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
}