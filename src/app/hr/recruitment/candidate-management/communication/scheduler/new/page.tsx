
// src/app/hr/recruitment/candidate-management/communication/scheduler/new/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

// Datos simulados para las opciones del formulario
const mockCandidates = [
  { id: 'c-1', name: 'Juan Pérez', role: 'Desarrollador de Software' },
  { id: 'c-2', name: 'María Rodríguez', role: 'Asistente de Marketing' },
  { id: 'c-3', name: 'Carlos Sánchez', role: 'Diseñador Gráfico' },
];

const mockInterviewers = [
  { id: 'i-1', name: 'Ana Gómez', team: 'Tecnología' },
  { id: 'i-2', name: 'David López', team: 'RR.HH.' },
  { id: 'i-3', name: 'Laura Morales', team: 'Diseño' },
];

const mockInterviewTypes = ['RR.HH.', 'Técnica', 'Portafolio', 'Gerencial'];

export default function NewInterviewPage() {
  const [formData, setFormData] = useState({
    candidate: '',
    date: '',
    time: '',
    type: '',
    interviewer: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Entrevista programada:', formData);
    // Lógica para guardar la entrevista en la base de datos
    alert('Entrevista programada con éxito!');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Programar Nueva Entrevista</h1>
        <Button asChild variant="outline">
          <Link href="/hr/recruitment/candidate-management/communication/scheduler">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de candidato */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="candidate">Candidato</Label>
          <Select onValueChange={(value) => handleSelectChange('candidate', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un candidato" />
            </SelectTrigger>
            <SelectContent>
              {mockCandidates.map((c) => (
                <SelectItem key={c.id} value={c.name}>
                  {c.name} - ({c.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fecha y hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="date">Fecha</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="time">Hora</Label>
            <Input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Tipo de entrevista */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="type">Tipo de Entrevista</Label>
          <Select onValueChange={(value) => handleSelectChange('type', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione el tipo" />
            </SelectTrigger>
            <SelectContent>
              {mockInterviewTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Asignar a */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="interviewer">Asignar a</Label>
          <Select onValueChange={(value) => handleSelectChange('interviewer', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un entrevistador" />
            </SelectTrigger>
            <SelectContent>
              {mockInterviewers.map((interviewer) => (
                <SelectItem key={interviewer.id} value={interviewer.name}>
                  {interviewer.name} - ({interviewer.team})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/hr/recruitment/candidate-management/communication/scheduler">
              <XCircle className="mr-2 h-4 w-4" />
              Cancelar
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
