// UBICACIÓN: src/modules/projects/admin/trello/KanbanColumn.tsx
// Componente individual de columna del Kanban CON función de comentarios

import React from 'react';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import type { Task, ExtendedUserWithProfile } from '@/lib/types';
import { KanbanColumn as KanbanColumnType } from './types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  column: KanbanColumnType;
  tasks: Task[];
  isDragging: boolean;
  onDrop: (targetStatus: string) => void;
  onOpenNewTask: (status: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onTaskDetail: (task: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskDuplicate: (task: Task) => void;
  onAddComment: (taskId: string) => void; // Esta línea faltaba
  onDragStart: (task: Task) => void;
  onDragEnd: () => void;
  projectMembers: ExtendedUserWithProfile[];
}

export default function KanbanColumn({
  column,
  tasks,
  isDragging,
  onDrop,
  onOpenNewTask,
  onDeleteColumn,
  onTaskDetail,
  onTaskDelete,
  onTaskDuplicate,
  onAddComment,
  onDragStart,
  onDragEnd,
  projectMembers
}: KanbanColumnProps) {
  const isOverLimit = column.limit && tasks.length >= column.limit;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(column.id);
  };

  return (
    <div
      className={`flex-shrink-0 w-80 rounded-lg border-2 border-dashed ${column.color} ${
        isOverLimit ? 'border-red-300 bg-red-50' : ''
      } ${isDragging ? 'transition-all duration-200' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header de la columna */}
      <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <h3 className="font-semibold text-gray-800">{column.title}</h3>
            <span className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
              isOverLimit ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {tasks.length}
            </span>
            {column.limit && (
              <span className="text-xs text-gray-500">/ {column.limit}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onOpenNewTask(column.id)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Añadir tarea"
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
            
            {!column.isDefault && (
              <button
                onClick={() => onDeleteColumn(column.id)}
                className="p-1 hover:bg-red-100 rounded transition-colors"
                title="Eliminar columna"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tareas de la columna */}
      <div className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
        {tasks.length === 0 ? (
          <div 
            className="text-center py-8 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors border-2 border-dashed border-gray-300"
            onClick={() => onOpenNewTask(column.id)}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No hay tareas</p>
            <p className="text-xs text-gray-400 mt-1">Haz clic para agregar</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDetail={onTaskDetail}
              onDelete={onTaskDelete}
              onDuplicate={onTaskDuplicate}
              onAddComment={onAddComment}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              projectMembers={projectMembers}
            />
          ))
        )}
      </div>
    </div>
  );
}