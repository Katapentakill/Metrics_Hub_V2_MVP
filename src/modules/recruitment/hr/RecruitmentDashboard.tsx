// src/modules/recruitment/hr/RecruitmentKanbanBoard.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getMockRecruitmentData, MockCandidate, CandidateStatus } from '@/lib/data/mockRecruitmentData';
import { Calendar, Briefcase } from 'lucide-react';

// Genera los datos una sola vez fuera del componente para evitar errores de hidratación
const initialMockData = getMockRecruitmentData(20);

// Definición de columnas iniciales
const initialStatuses: CandidateStatus[] = [
  'Application Received',
  'HR Review',
  'Interview Scheduled',
  'Interview Completed',
  'Offer Sent',
  'Accepted by Candidate',
  'Rejected by HR',
  'Rejected by PM',
  'Rejected by Candidate',
  'Onboard',
];

// Define el tipo 'Column' para la estructura de las columnas del tablero
type Column = {
  id: CandidateStatus;
  title: string;
  candidates: MockCandidate[];
};

// Colores para las etiquetas de estado de los candidatos
const getStatusColor = (status: CandidateStatus) => { 
  switch (status) { 
    case 'Application Received': return 'bg-blue-100 text-blue-800'; 
    case 'HR Review': return 'bg-purple-100 text-purple-800'; 
    case 'Interview Scheduled': return 'bg-yellow-100 text-yellow-800'; 
    case 'Interview Completed': return 'bg-orange-100 text-orange-800'; 
    case 'Offer Sent': return 'bg-sky-100 text-sky-800'; 
    case 'Accepted by Candidate': 
    case 'Onboard': return 'bg-green-100 text-green-800'; 
    case 'Rejected by HR': 
    case 'Rejected by PM': 
    case 'Rejected by Candidate': return 'bg-red-100 text-red-800'; 
    default: return 'bg-gray-100 text-gray-800'; 
  } 
}; 

// Colores para los contenedores de las columnas
const getColumnColor = (status: CandidateStatus) => { 
  switch (status) { 
    case 'Application Received': return 'bg-blue-50 border-blue-200'; 
    case 'HR Review': return 'bg-purple-50 border-purple-200'; 
    case 'Interview Scheduled': return 'bg-yellow-50 border-yellow-200'; 
    case 'Interview Completed': return 'bg-orange-50 border-orange-200'; 
    case 'Offer Sent': return 'bg-sky-50 border-sky-200'; 
    case 'Accepted by Candidate': 
    case 'Onboard': return 'bg-green-50 border-green-200'; 
    case 'Rejected by HR': 
    case 'Rejected by PM': 
    case 'Rejected by Candidate': return 'bg-red-50 border-red-200'; 
    default: return 'bg-gray-50 border-gray-200'; 
  } 
}; 

export default function RecruitmentKanbanBoard() {
  const [columns, setColumns] = useState<{ [key in CandidateStatus]: Column }>({} as any);

  // Simula la actualización en la base de datos
  const updateCandidateStatusInDB = (candidateId: string, newStatus: CandidateStatus) => {
    console.log(`Simulando actualización en la base de datos: Candidato ${candidateId} movido a ${newStatus}`);
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  // Inicializa las columnas del tablero con los datos estables al montar el componente
  useEffect(() => {
    const newColumns: { [key in CandidateStatus]: Column } = {} as any;
    initialStatuses.forEach(status => {
      newColumns[status] = {
        id: status,
        title: status,
        candidates: [],
      };
    });

    initialMockData.forEach(candidate => {
      if (newColumns[candidate.applicationStatus]) {
        newColumns[candidate.applicationStatus].candidates.push(candidate);
      }
    });

    setColumns(newColumns);
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez

  const onDragEnd = async (result: any) => { 
    const { source, destination } = result; 
    if (!destination) return; 
 
    const sourceDroppableId = source.droppableId as CandidateStatus; 
    const destinationDroppableId = destination.droppableId as CandidateStatus; 
 
    if (sourceDroppableId === destinationDroppableId) { 
      // Reordenar dentro de la misma columna
      const column = columns[sourceDroppableId]; 
      const newCandidates = Array.from(column.candidates); 
      const [removed] = newCandidates.splice(source.index, 1); 
      newCandidates.splice(destination.index, 0, removed); 
 
      setColumns(prev => ({ 
        ...prev, 
        [column.id]: { 
          ...column, 
          candidates: newCandidates, 
        }, 
      })); 
    } else { 
      // Mover a otra columna
      const start = columns[sourceDroppableId]; 
      const end = columns[destinationDroppableId]; 
      const newStartCandidates = Array.from(start.candidates); 
      const [removed] = newStartCandidates.splice(source.index, 1); 
 
      const newMovedCandidate = { ...removed, applicationStatus: end.id }; 
      const newEndCandidates = Array.from(end.candidates); 
      newEndCandidates.splice(destination.index, 0, newMovedCandidate); 
 
      await updateCandidateStatusInDB(removed.id, end.id); 
 
      setColumns(prev => ({ 
        ...prev, 
        [start.id]: { 
          ...start, 
          candidates: newStartCandidates, 
        }, 
        [end.id]: { 
          ...end, 
          candidates: newEndCandidates, 
        }, 
      })); 
    } 
  }; 
 
  // La función del componente debe retornar JSX
  return ( 
    <DragDropContext onDragEnd={onDragEnd}> 
      <div className="flex flex-col md:flex-row space-x-4 overflow-x-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> 
        {Object.values(columns).map(column => ( 
          <Droppable droppableId={column.id} key={column.id}> 
            {(provided) => ( 
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps} 
                className={`flex-shrink-0 w-80 min-h-screen rounded-lg shadow-md border ${getColumnColor(column.id)}`} 
              > 
                <h3 className="text-sm font-semibold p-4 rounded-t-lg border-b text-slate-800"> 
                  {column.title} ({column.candidates.length}) 
                </h3> 
                <div className="p-2 space-y-2"> 
                  {column.candidates.map((candidate, index) => ( 
                    <Draggable key={candidate.id} draggableId={candidate.id} index={index}> 
                      {(provided, snapshot) => ( 
                        <div 
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps} 
                          className={`p-4 bg-white rounded-lg shadow-sm border border-slate-200 cursor-pointer ${ 
                            snapshot.isDragging ? 'rotate-2 shadow-lg' : '' 
                          }`} 
                        > 
                          <div className="flex flex-col space-y-1"> 
                            <h4 className="font-semibold text-sm text-slate-900">{candidate.name}</h4> 
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full w-fit ${getStatusColor(candidate.applicationStatus)}`}> 
                              {candidate.applicationStatus} 
                            </span> 
                            <p className="text-xs text-slate-500 flex items-center mt-1"> 
                              <Briefcase size={12} className="mr-1" /> 
                              {candidate.role} 
                            </p> 
                            <p className="text-xs text-slate-500 flex items-center"> 
                              <Calendar size={12} className="mr-1" /> 
                              {candidate.hrInterviewDate 
                                ? `Entrevista HR: ${candidate.hrInterviewDate} (${candidate.timezone})` 
                                : 'Sin fecha de entrevista'} 
                            </p> 
                          </div> 
                        </div> 
                      )} 
                    </Draggable> 
                  ))} 
                  {provided.placeholder} 
                </div> 
              </div> 
            )} 
          </Droppable> 
        ))} 
      </div> 
    </DragDropContext> 
  ); 
}