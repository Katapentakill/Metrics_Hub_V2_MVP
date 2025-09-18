//src/app/hr/recruitment/evaluation/page.tsx
'use client';

import { useState } from 'react';
import { 
  UserCheck, 
  Sliders, 
  CalendarCheck, 
  FileText, 
  MessageSquare,
  Filter,
  Star,
  Clock,
  Send,
  Download,
  Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EvaluationAndSelectionPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Datos simulados
  const candidatesData = {
    total: 45,
    reviewed: 28,
    pending: 17,
    approved: 12,
    rejected: 8,
    interviews: 15
  };

  const recentEvaluations = [
    { name: 'Ana García', position: 'Developer', score: 85, status: 'approved' },
    { name: 'Carlos López', position: 'Designer', score: 72, status: 'pending' },
    { name: 'María Rodríguez', position: 'Manager', score: 90, status: 'approved' },
    { name: 'Juan Pérez', position: 'Analyst', score: 65, status: 'rejected' }
  ];

  const upcomingInterviews = [
    { candidate: 'Laura Chen', position: 'Developer', date: '2025-09-20', time: '10:00' },
    { candidate: 'Miguel Santos', position: 'Designer', date: '2025-09-20', time: '14:30' },
    { candidate: 'Sofia Reyes', position: 'Manager', date: '2025-09-21', time: '09:00' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{candidatesData.total}</div>
            <p className="text-sm text-gray-600">Total Candidatos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{candidatesData.reviewed}</div>
            <p className="text-sm text-gray-600">Revisados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{candidatesData.pending}</div>
            <p className="text-sm text-gray-600">Pendientes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <CalendarCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{candidatesData.interviews}</div>
            <p className="text-sm text-gray-600">Entrevistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Evaluaciones recientes */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluaciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvaluations.map((evaluation, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{evaluation.name}</p>
                  <p className="text-sm text-gray-600">{evaluation.position}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold">{evaluation.score}/100</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(evaluation.score/20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    evaluation.status === 'approved' ? 'bg-green-100 text-green-700' :
                    evaluation.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {evaluation.status === 'approved' ? 'Aprobado' :
                     evaluation.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximas entrevistas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Entrevistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingInterviews.map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{interview.candidate}</p>
                  <p className="text-sm text-gray-600">{interview.position}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{interview.date}</p>
                  <p className="text-sm text-gray-600">{interview.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFiltering = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtrado Automático</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Experiencia Mínima (años)</label>
            <input type="number" className="w-full p-2 border rounded-lg" defaultValue="2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Habilidades Requeridas</label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="React, Node.js, Python..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Puntuación Mínima</label>
            <input type="number" className="w-full p-2 border rounded-lg" defaultValue="70" />
          </div>
          
          <Button className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            Aplicar Filtros
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidatos Filtrados</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">23 candidatos cumplen con los criterios</p>
          <div className="space-y-2">
            {recentEvaluations.slice(0, 3).map((candidate, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <span>{candidate.name}</span>
                <span className="font-semibold">{candidate.score}/100</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInterviews = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Programar Nueva Entrevista</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Candidato</label>
            <select className="w-full p-2 border rounded-lg">
              <option>Seleccionar candidato...</option>
              <option>Ana García</option>
              <option>Carlos López</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Fecha</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hora</label>
              <input type="time" className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Entrevistador</label>
            <select className="w-full p-2 border rounded-lg">
              <option>María Fernández</option>
              <option>Juan Carlos</option>
            </select>
          </div>
          
          <Button className="w-full">
            <CalendarCheck className="w-4 h-4 mr-2" />
            Programar Entrevista
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entrevistas de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingInterviews.slice(0, 2).map((interview, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">{interview.candidate}</p>
                  <p className="text-sm text-gray-600">{interview.time}</p>
                </div>
                <Button size="sm">
                  <Send className="w-4 h-4 mr-1" />
                  Recordatorio
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Candidato</label>
            <select className="w-full p-2 border rounded-lg">
              <option>Ana García</option>
              <option>Carlos López</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Puntuación (1-100)</label>
            <input type="number" className="w-full p-2 border rounded-lg" min="1" max="100" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Comentarios</label>
            <textarea className="w-full p-2 border rounded-lg h-20" placeholder="Fortalezas, áreas de mejora..."></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Recomendación</label>
            <select className="w-full p-2 border rounded-lg">
              <option>Aprobar</option>
              <option>Rechazar</option>
              <option>Segunda entrevista</option>
            </select>
          </div>
          
          <Button className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Guardar Feedback
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvaluations.slice(0, 3).map((evaluation, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">{evaluation.name}</p>
                  <span className="text-sm font-semibold">{evaluation.score}/100</span>
                </div>
                <p className="text-sm text-gray-600">
                  {evaluation.status === 'approved' ? 'Candidato recomendado para continuar en el proceso.' :
                   evaluation.status === 'rejected' ? 'No cumple con los requisitos técnicos.' :
                   'Pendiente de segunda evaluación.'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Evaluación y Selección</h1>
        <p className="text-blue-100">
          Gestiona todo el proceso de evaluación de candidatos desde un solo lugar
        </p>
      </div>

      {/* Navegación por tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Resumen', icon: UserCheck },
          { id: 'filtering', label: 'Filtrado', icon: Sliders },
          { id: 'interviews', label: 'Entrevistas', icon: CalendarCheck },
          { id: 'feedback', label: 'Feedback', icon: MessageSquare }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido dinámico */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'filtering' && renderFiltering()}
      {activeTab === 'interviews' && renderInterviews()}
      {activeTab === 'feedback' && renderFeedback()}

      {/* Acciones rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar Evaluaciones
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Reporte General
            </Button>
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Enviar Recordatorios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationAndSelectionPage;