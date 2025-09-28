// UBICACIÓN: src/modules/projects/admin/trello/ProjectKanbanBoard.tsx
// Componente principal del tablero Kanban CON función de comentarios

import React, { useState, useRef, useEffect } from 'react';
import { Settings, Columns } from 'lucide-react';
import type { Task, ExtendedUserWithProfile } from '@/lib/types';
import { NewColumnForm, NewTaskForm } from './types';
import { KanbanColumn as KanbanColumnType } from './types';
import KanbanColumn from './KanbanColumn';
import NewTaskModal from './modals/NewTaskModal';
import NewColumnModal from './modals/NewColumnModal';
import ColumnSettingsModal from './modals/ColumnSettingsModal';
import TaskDetailModal from './modals/TaskDetailModal';
import AddCommentModal from './modals/AddCommentModal';

interface ProjectKanbanBoardProps {
  projectId: string;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  projectMembers: ExtendedUserWithProfile[];
  projectLead?: ExtendedUserWithProfile;
}

export default function ProjectKanbanBoard({
  projectId,
  tasks,
  setTasks,
  projectMembers,
  projectLead
}: ProjectKanbanBoardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Estados de modales
  const [showNewTaskModal, setShowNewTaskModal] = useState<string | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState<Task | null>(null);
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  const [showNewColumnModal, setShowNewColumnModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState<{ taskId: string; taskTitle: string } | null>(null);

  // Estados de formularios
  const [newTaskForm, setNewTaskForm] = useState<NewTaskForm>({
    title: '',
    description: '',
    priority: 'medium',
    estimated_hours: 8,
  });

  const [newColumnForm, setNewColumnForm] = useState<NewColumnForm>({
    title: '',
    color: 'bg-gray-100 border-gray-300',
  });

  // Estado de columnas
  const [columns, setColumns] = useState<KanbanColumnType[]>([
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-100 border-gray-300', order: 1, isDefault: true },
    { id: 'todo', title: 'Por Hacer', color: 'bg-blue-100 border-blue-300', limit: 8, order: 2, isDefault: true },
    { id: 'in_progress', title: 'En Progreso', color: 'bg-yellow-100 border-yellow-300', limit: 5, order: 3, isDefault: true },
    { id: 'review', title: 'En Revisión', color: 'bg-purple-100 border-purple-300', limit: 3, order: 4, isDefault: true },
    { id: 'testing', title: 'Testing', color: 'bg-orange-100 border-orange-300', limit: 4, order: 5, isDefault: false },
    { id: 'done', title: 'Completado', color: 'bg-green-100 border-green-300', order: 6, isDefault: true },
    { id: 'blocked', title: 'Bloqueado', color: 'bg-red-100 border-red-300', order: 7, isDefault: false }
  ]);

  // Scroll automático durante drag
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const scrollThreshold = 100;
      const scrollSpeed = 10;

      if (e.clientX < containerRect.left + scrollThreshold) {
        container.scrollLeft -= scrollSpeed;
      } else if (e.clientX > containerRect.right - scrollThreshold) {
        container.scrollLeft += scrollSpeed;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging]);

  // Funciones utilitarias
  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  // Handlers de drag and drop
  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (targetStatus: string) => {
    setIsDragging(false);
    
    if (!draggedTask) return;
    
    const targetColumn = columns.find(col => col.id === targetStatus);
    if (targetColumn?.limit) {
      const tasksInTarget = getTasksByStatus(targetStatus);
      if (tasksInTarget.length >= targetColumn.limit && draggedTask.status !== targetStatus) {
        alert(`Esta columna tiene un límite de ${targetColumn.limit} tareas`);
        return;
      }
    }

    const updatedTasks = tasks.map(task => 
      task.id === draggedTask.id 
        ? { ...task, status: targetStatus as Task['status'] }
        : task
    );
    
    setTasks(updatedTasks);
    setDraggedTask(null);
  };

  // Handlers de columnas
  const handleCreateColumn = (columnData: NewColumnForm) => {
    if (!columnData.title.trim()) {
      alert('El título de la columna es obligatorio');
      return;
    }

    const newColumn: KanbanColumnType = {
      id: `col_${Date.now()}`,
      title: columnData.title.trim(),
      color: columnData.color,
      limit: columnData.limit,
      order: Math.max(...columns.map(c => c.order)) + 1,
      isDefault: false
    };

    setColumns([...columns, newColumn]);
  };

  const handleDeleteColumn = (columnId: string) => {
    const column = columns.find(c => c.id === columnId);
    if (column?.isDefault) {
      alert('No puedes eliminar columnas por defecto');
      return;
    }

    const tasksInColumn = getTasksByStatus(columnId);
    if (tasksInColumn.length > 0) {
      if (!confirm(`Esta columna tiene ${tasksInColumn.length} tareas. ¿Mover todas a "Backlog" y eliminar la columna?`)) {
        return;
      }
      
      const updatedTasks = tasks.map(task => 
        task.status === columnId 
          ? { ...task, status: 'backlog' as Task['status'] }
          : task
      );
      setTasks(updatedTasks);
    }

    setColumns(columns.filter(c => c.id !== columnId));
  };

  const handleUpdateColumnLimit = (columnId: string, limit?: number) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, limit }
        : col
    ));
  };

  // Handlers de tareas
  const openNewTaskModal = (status: string) => {
    setShowNewTaskModal(status);
    setNewTaskForm({
      title: '',
      description: '',
      priority: 'medium',
      estimated_hours: 8,
    });
  };

  const handleCreateTask = (taskData: NewTaskForm) => {
    if (!taskData.title.trim()) {
      alert('El título de la tarea es obligatorio');
      return;
    }

    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      project_id: projectId,
      assigned_to: taskData.assigned_to || undefined,
      created_by: 'admin',
      status: (showNewTaskModal as Task['status']) || 'todo',
      priority: taskData.priority,
      estimated_hours: taskData.estimated_hours,
      due_date: taskData.due_date || undefined,
      created_at: new Date().toISOString(),
      tags: taskData.tags?.trim() || undefined
    };

    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleDuplicateTask = (originalTask: Task) => {
    const duplicatedTask: Task = {
      ...originalTask,
      id: `task_${Date.now()}_copy`,
      title: `${originalTask.title} (Copia)`,
      status: 'todo',
      created_at: new Date().toISOString(),
      actual_hours: undefined
    };

    setTasks([...tasks, duplicatedTask]);
  };

  // Handler de comentarios
  const handleAddComment = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setShowCommentModal({
        taskId: task.id,
        taskTitle: task.title
      });
    }
  };

  const handleSubmitComment = (comment: string) => {
    // Aquí podrías actualizar el estado con el comentario
    // Por ahora solo mostramos una confirmación
    console.log('Comentario añadido:', comment);
    alert('Comentario añadido correctamente');
  };

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      {/* Header del Kanban - SOLO Nueva Columna y Configurar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Tablero de Tareas</h2>
          <p className="text-gray-600">Gestiona las tareas del proyecto con el sistema Kanban</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowNewColumnModal(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
          >
            <Columns className="w-4 h-4" />
            <span>Nueva Columna</span>
          </button>
          
          <button 
            onClick={() => setShowColumnSettings(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Configurar</span>
          </button>
        </div>
      </div>

      {/* Tablero Kanban */}
      <div className="overflow-x-auto" ref={scrollContainerRef}>
        <div className="flex space-x-4 min-w-max pb-4">
          {sortedColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              isDragging={isDragging}
              onDrop={handleDrop}
              onOpenNewTask={openNewTaskModal}
              onDeleteColumn={handleDeleteColumn}
              onTaskDetail={setShowTaskDetail}
              onTaskDelete={handleDeleteTask}
              onTaskDuplicate={handleDuplicateTask}
              onAddComment={handleAddComment}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              projectMembers={[...projectMembers, ...(projectLead ? [projectLead] : [])]}
            />
          ))}
        </div>
      </div>

      {/* Estadísticas del tablero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas del Tablero</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sortedColumns.slice(0, 4).map((column) => (
            <div key={column.id} className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getTasksByStatus(column.id).length}</div>
              <div className="text-sm text-gray-600">{column.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modales */}
      <NewTaskModal
        isOpen={!!showNewTaskModal}
        onClose={() => setShowNewTaskModal(null)}
        onSubmit={handleCreateTask}
        columnTitle={columns.find(c => c.id === showNewTaskModal)?.title || ''}
        projectMembers={[...projectMembers, ...(projectLead ? [projectLead] : [])]}
        formData={newTaskForm}
        setFormData={setNewTaskForm}
      />

      <NewColumnModal
        isOpen={showNewColumnModal}
        onClose={() => setShowNewColumnModal(false)}
        onSubmit={handleCreateColumn}
        formData={newColumnForm}
        setFormData={setNewColumnForm}
      />

      <ColumnSettingsModal
        isOpen={showColumnSettings}
        onClose={() => setShowColumnSettings(false)}
        columns={sortedColumns}
        getTasksByStatus={getTasksByStatus}
        onDeleteColumn={handleDeleteColumn}
        onUpdateColumnLimit={handleUpdateColumnLimit}
      />

      <TaskDetailModal
        task={showTaskDetail}
        isOpen={!!showTaskDetail}
        onClose={() => setShowTaskDetail(null)}
        projectMembers={[...projectMembers, ...(projectLead ? [projectLead] : [])]}
      />

      <AddCommentModal
        isOpen={!!showCommentModal}
        onClose={() => setShowCommentModal(null)}
        onSubmit={handleSubmitComment}
        taskId={showCommentModal?.taskId || ''}
        taskTitle={showCommentModal?.taskTitle || ''}
      />
    </div>
  );
}