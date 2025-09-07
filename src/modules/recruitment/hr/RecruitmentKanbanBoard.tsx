// src/modules/recruitment/hr/RecruitmentKanbanBoard.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getMockRecruitmentData, MockCandidate, CandidateStatus } from '@/lib/data/mockRecruitmentData';
import { Calendar, Briefcase } from 'lucide-react';

// Genera los datos una sola vez fuera del componente
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
// Añade la definición del tipo 'Column' aquí
type Column = {
  id: CandidateStatus;
  title: string;
  candidates: MockCandidate[];
};
// ... (Rest of the code, getStatusColor, getColumnColor, etc.)

export default function RecruitmentKanbanBoard() {
  const [columns, setColumns] = useState<{ [key in CandidateStatus]: Column }>({} as any);

  // Simular actualización en DB
  const updateCandidateStatusInDB = (candidateId: string, newStatus: CandidateStatus) => {
    console.log(`Simulando actualización en la base de datos: Candidato ${candidateId} movido a ${newStatus}`);
    return new Promise(resolve => setTimeout(resolve, 500));
  };

  // Inicializar columnas con los datos estables
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

  // ... (Rest of the onDragEnd and return JSX code)
}