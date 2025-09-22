// src/app/lead/recruitment/candidate-management/database/page.tsx
'use client';

import { Briefcase, FileText, UserPlus, Users, Clock, Handshake, Search, BookOpen, UserCheck, BarChart, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useMemo } from 'react';

const initialMockData = getMockRecruitmentData(50);
const mockLeadTeam = 'vitanlink'; // Simula el equipo del líder

export default function LeadCandidateDatabasePage() {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialMockData);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = useMemo(() => {
    // Se filtra por equipo del líder primero, luego por término de búsqueda
    const teamCandidates = candidates.filter(candidate => candidate.team === mockLeadTeam);
    
    return teamCandidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.appliedRole.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [candidates, searchTerm]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Base de Datos de Candidatos de mi Equipo</h1>
      <p className="text-gray-600 mb-6">
        Accede, busca y gestiona los perfiles de los candidatos que han aplicado a los puestos de tu equipo.
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Buscar por nombre, email o rol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol Aplicado</TableHead>
              <TableHead>Último Contacto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.appliedRole}</TableCell>
                <TableCell>{candidate.lastContact?.toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No se encontraron candidatos que coincidan con la búsqueda en tu equipo.
        </div>
      )}
    </div>
  );
}