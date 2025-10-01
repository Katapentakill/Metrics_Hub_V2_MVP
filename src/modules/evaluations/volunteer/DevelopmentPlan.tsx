'use client';

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Award,
  Users,
  Lightbulb,
  BarChart3,
  Eye
} from 'lucide-react';

interface DevelopmentGoal {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'leadership' | 'communication' | 'personal';
  priority: 'high' | 'medium' | 'low';
  status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  startDate: string;
  targetDate: string;
  completedDate?: string;
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    completedDate?: string;
  }[];
  resources: {
    id: string;
    title: string;
    type: 'course' | 'book' | 'mentor' | 'workshop' | 'other';
    url?: string;
  }[];
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  importance: 'critical' | 'important' | 'nice_to_have';
  recommendedActions: string[];
}

const DevelopmentPlan: React.FC = () => {
  const [goals, setGoals] = useState<DevelopmentGoal[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<DevelopmentGoal | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setGoals([
        {
          id: '1',
          title: 'Certificación en Gestión de Proyectos',
          description: 'Obtener certificación PMP para mejorar habilidades de gestión de proyectos',
          category: 'technical',
          priority: 'high',
          status: 'in_progress',
          progress: 65,
          startDate: '2025-08-01',
          targetDate: '2025-12-31',
          milestones: [
            { id: '1', title: 'Completar curso online', completed: true, completedDate: '2025-09-01' },
            { id: '2', title: 'Estudiar guía PMBOK', completed: true, completedDate: '2025-09-15' },
            { id: '3', title: 'Realizar examen de práctica', completed: false },
            { id: '4', title: 'Presentar examen oficial', completed: false }
          ],
          resources: [
            { id: '1', title: 'Curso PMP en Coursera', type: 'course', url: 'https://coursera.org' },
            { id: '2', title: 'PMBOK Guide 7th Edition', type: 'book' },
            { id: '3', title: 'Mentor: Carlos López', type: 'mentor' }
          ]
        },
        {
          id: '2',
          title: 'Mejorar Habilidades de Liderazgo',
          description: 'Desarrollar capacidades para liderar equipos de voluntarios efectivamente',
          category: 'leadership',
          priority: 'high',
          status: 'in_progress',
          progress: 40,
          startDate: '2025-07-01',
          targetDate: '2025-11-30',
          milestones: [
            { id: '1', title: 'Liderar un proyecto pequeño', completed: true, completedDate: '2025-08-15' },
            { id: '2', title: 'Asistir a taller de liderazgo', completed: false },
            { id: '3', title: 'Mentor de nuevos voluntarios', completed: false },
            { id: '4', title: 'Liderar proyecto grande', completed: false }
          ],
          resources: [
            { id: '1', title: 'Workshop de Liderazgo Living Stones', type: 'workshop' },
            { id: '2', title: 'Libro: Los 7 Hábitos de la Gente Altamente Efectiva', type: 'book' }
          ]
        },
        {
          id: '3',
          title: 'Comunicación Efectiva en Equipos Diversos',
          description: 'Desarrollar habilidades para comunicar efectivamente en contextos multiculturales',
          category: 'communication',
          priority: 'medium',
          status: 'not_started',
          progress: 0,
          startDate: '2025-10-01',
          targetDate: '2026-02-28',
          milestones: [
            { id: '1', title: 'Curso de comunicación intercultural', completed: false },
            { id: '2', title: 'Práctica con equipos internacionales', completed: false },
            { id: '3', title: 'Certificación en facilitación', completed: false }
          ],
          resources: [
            { id: '1', title: 'Curso Comunicación Intercultural', type: 'course', url: 'https://udemy.com' }
          ]
        },
        {
          id: '4',
          title: 'Gestión del Tiempo y Productividad',
          description: 'Optimizar la gestión del tiempo para balancear múltiples proyectos',
          category: 'personal',
          priority: 'medium',
          status: 'completed',
          progress: 100,
          startDate: '2025-05-01',
          targetDate: '2025-08-31',
          completedDate: '2025-08-20',
          milestones: [
            { id: '1', title: 'Implementar método Pomodoro', completed: true, completedDate: '2025-05-15' },
            { id: '2', title: 'Usar herramienta de gestión de tareas', completed: true, completedDate: '2025-06-01' },
            { id: '3', title: 'Establecer rutinas productivas', completed: true, completedDate: '2025-07-15' },
            { id: '4', title: 'Evaluar mejoras', completed: true, completedDate: '2025-08-20' }
          ],
          resources: [
            { id: '1', title: 'Getting Things Done - David Allen', type: 'book' },
            { id: '2', title: 'Trello para gestión de tareas', type: 'other' }
          ]
        }
      ]);

      setSkillGaps([
        {
          skill: 'Gestión de Proyectos',
          currentLevel: 3,
          targetLevel: 5,
          importance: 'critical',
          recommendedActions: [
            'Obtener certificación PMP',
            'Liderar proyectos complejos',
            'Estudiar metodologías ágiles'
          ]
        },
        {
          skill: 'Liderazgo de Equipos',
          currentLevel: 3.5,
          targetLevel: 4.5,
          importance: 'critical',
          recommendedActions: [
            'Participar en talleres de liderazgo',
            'Mentorear nuevos voluntarios',
            'Liderar equipos diversos'
          ]
        },
        {
          skill: 'Comunicación Intercultural',
          currentLevel: 2.5,
          targetLevel: 4,
          importance: 'important',
          recommendedActions: [
            'Curso de comunicación intercultural',
            'Trabajar con equipos internacionales',
            'Aprender un nuevo idioma'
          ]
        },
        {
          skill: 'Resolución de Conflictos',
          currentLevel: 3,
          targetLevel: 4,
          importance: 'important',
          recommendedActions: [
            'Taller de mediación',
            'Practicar técnicas de negociación',
            'Estudiar casos de estudio'
          ]
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <BookOpen className="w-4 h-4" />;
      case 'leadership':
        return <Users className="w-4 h-4" />;
      case 'communication':
        return <Lightbulb className="w-4 h-4" />;
      case 'personal':
        return <Target className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'technical':
        return 'Técnico';
      case 'leadership':
        return 'Liderazgo';
      case 'communication':
        return 'Comunicación';
      case 'personal':
        return 'Desarrollo Personal';
      default:
        return category;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in_progress':
        return 'En Progreso';
      case 'on_hold':
        return 'En Pausa';
      default:
        return 'No Iniciado';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'text-red-600';
      case 'important':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredGoals = goals.filter(goal => {
    if (filterCategory !== 'all' && goal.category !== filterCategory) return false;
    if (filterStatus !== 'all' && goal.status !== filterStatus) return false;
    return true;
  });

  const activeGoals = goals.filter(g => g.status === 'in_progress').length;
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const averageProgress = goals.length > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
    : 0;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Plan de Desarrollo Personal
            </h1>
            <p className="text-gray-600">
              Gestiona tus objetivos de crecimiento y desarrolla tus habilidades profesionales.
            </p>
          </div>
          <button 
            onClick={() => setShowAddGoal(true)}
            className="btn-living flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Objetivo</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Objetivos Activos</p>
              <p className="text-3xl font-bold text-blue-600">{activeGoals}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completados</p>
              <p className="text-3xl font-bold text-green-600">{completedGoals}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Progreso Promedio</p>
              <p className="text-3xl font-bold text-var(--living-green-600)">{averageProgress}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-var(--living-green-600)" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brechas de Habilidad</p>
              <p className="text-3xl font-bold text-orange-600">{skillGaps.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Skill Gaps Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Brechas de Habilidades Identificadas</h3>
          <p className="text-sm text-gray-600 mt-1">
            Áreas de oportunidad basadas en tus evaluaciones
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {skillGaps.map((gap) => (
              <div key={gap.skill} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{gap.skill}</h4>
                    <span className={`text-sm font-medium ${getImportanceColor(gap.importance)}`}>
                      {gap.importance === 'critical' ? 'Crítico' :
                       gap.importance === 'important' ? 'Importante' : 'Deseable'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      <span className="font-bold">{gap.currentLevel}</span> → <span className="font-bold text-var(--living-green-600)">{gap.targetLevel}</span>
                    </div>
                    <div className="text-xs text-gray-500">nivel actual → objetivo</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Progreso hacia objetivo</span>
                    <span className="text-xs text-gray-600">
                      {Math.round((gap.currentLevel / gap.targetLevel) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-var(--living-green-500) h-2 rounded-full"
                      style={{ width: `${(gap.currentLevel / gap.targetLevel) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Acciones Recomendadas:</p>
                  <ul className="space-y-1">
                    {gap.recommendedActions.map((action, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-var(--living-green-600) mr-2">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
              >
                <option value="all">Todas las categorías</option>
                <option value="technical">Técnico</option>
                <option value="leadership">Liderazgo</option>
                <option value="communication">Comunicación</option>
                <option value="personal">Desarrollo Personal</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="not_started">No Iniciado</option>
                <option value="in_progress">En Progreso</option>
                <option value="on_hold">En Pausa</option>
                <option value="completed">Completado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600">{getCategoryLabel(goal.category)}</span>
                        <span>•</span>
                        <span className={`font-medium ${getPriorityColor(goal.priority)}`}>
                          {goal.priority === 'high' ? 'Alta Prioridad' :
                           goal.priority === 'medium' ? 'Prioridad Media' : 'Baja Prioridad'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{goal.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Inicio: {new Date(goal.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4" />
                      <span>Meta: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    {goal.completedDate && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completado: {new Date(goal.completedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progreso General</span>
                      <span className="text-sm font-bold text-var(--living-green-600)">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          goal.status === 'completed' ? 'bg-green-500' :
                          goal.status === 'in_progress' ? 'bg-blue-500' :
                          goal.status === 'on_hold' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Hitos ({goal.milestones.filter(m => m.completed).length}/{goal.milestones.length})</h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-3 text-sm">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {milestone.completed && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={milestone.completed ? 'text-gray-900' : 'text-gray-600'}>
                            {milestone.title}
                          </span>
                          {milestone.completedDate && (
                            <span className="text-xs text-gray-500">
                              ({new Date(milestone.completedDate).toLocaleDateString()})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  {goal.resources.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Recursos</h4>
                      <div className="flex flex-wrap gap-2">
                        {goal.resources.map((resource) => (
                          <span
                            key={resource.id}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 flex items-center space-x-1"
                          >
                            {resource.type === 'course' && <BookOpen className="w-3 h-3" />}
                            {resource.type === 'book' && <BookOpen className="w-3 h-3" />}
                            {resource.type === 'mentor' && <Users className="w-3 h-3" />}
                            {resource.type === 'workshop' && <Award className="w-3 h-3" />}
                            <span>{resource.title}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2 ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                    {getStatusLabel(goal.status)}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedGoal(goal)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No hay objetivos con estos filtros</p>
          <p className="text-gray-400">Intenta ajustar los filtros o crea un nuevo objetivo</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedGoal.title}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedGoal.status)}`}>
                      {getStatusLabel(selectedGoal.status)}
                    </span>
                    <span className={`text-sm font-medium ${getPriorityColor(selectedGoal.priority)}`}>
                      {selectedGoal.priority === 'high' ? 'Alta Prioridad' :
                       selectedGoal.priority === 'medium' ? 'Prioridad Media' : 'Baja Prioridad'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-2xl font-bold text-gray-500"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Descripción</h3>
                <p className="text-gray-700">{selectedGoal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fechas</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Inicio:</span>
                      <span className="font-medium">{new Date(selectedGoal.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Meta:</span>
                      <span className="font-medium">{new Date(selectedGoal.targetDate).toLocaleDateString()}</span>
                    </div>
                    {selectedGoal.completedDate && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completado:</span>
                        <span className="font-medium">{new Date(selectedGoal.completedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Progreso</h3>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-4xl font-bold text-var(--living-green-600) mb-1">
                      {selectedGoal.progress}%
                    </div>
                    <div className="text-sm text-gray-600">Completado</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-var(--living-green-500) h-2 rounded-full"
                        style={{ width: `${selectedGoal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Hitos del Proyecto</h3>
                <div className="space-y-3">
                  {selectedGoal.milestones.map((milestone) => (
                    <div key={milestone.id} className={`p-4 rounded-lg border ${
                      milestone.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {milestone.completed && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <span className={`font-medium ${milestone.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                            {milestone.title}
                          </span>
                        </div>
                        {milestone.completedDate && (
                          <span className="text-sm text-gray-600">
                            {new Date(milestone.completedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedGoal.resources.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Recursos Disponibles</h3>
                  <div className="space-y-2">
                    {selectedGoal.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-white rounded-lg">
                            {resource.type === 'course' && <BookOpen className="w-4 h-4 text-blue-600" />}
                            {resource.type === 'book' && <BookOpen className="w-4 h-4 text-green-600" />}
                            {resource.type === 'mentor' && <Users className="w-4 h-4 text-purple-600" />}
                            {resource.type === 'workshop' && <Award className="w-4 h-4 text-orange-600" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{resource.title}</p>
                            <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                          </div>
                        </div>
                        {resource.url && (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-var(--living-green-600) hover:text-var(--living-green-700) font-medium"
                          >
                            Acceder →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cerrar
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Editar Objetivo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Nuevo Objetivo de Desarrollo
                  </h2>
                  <p className="text-gray-600">Define tu próximo objetivo de crecimiento profesional</p>
                </div>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-2xl font-bold text-gray-500"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Objetivo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Certificación en Gestión de Proyectos"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe qué quieres lograr y por qué es importante..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent">
                      <option value="">Selecciona una categoría</option>
                      <option value="technical">Técnico</option>
                      <option value="leadership">Liderazgo</option>
                      <option value="communication">Comunicación</option>
                      <option value="personal">Desarrollo Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad *
                    </label>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent">
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio *
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha Objetivo *
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-var(--living-green-500) focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddGoal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-living flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Crear Objetivo</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevelopmentPlan;