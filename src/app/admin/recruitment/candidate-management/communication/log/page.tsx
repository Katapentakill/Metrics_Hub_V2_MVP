// src/app/admin/recruitment/candidate-management/communication/log/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Mail, Calendar, Search, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Datos simulados para el log de comunicaciones
const mockCommunicationLog = [
  {
    id: 'log-1',
    recipient: 'Juan Pérez',
    type: 'Correo de Entrevista',
    subject: 'Confirmación de entrevista para Desarrollador de Software',
    date: '2025-09-18 10:05 AM',
    status: 'Enviado',
  },
  {
    id: 'log-2',
    recipient: 'María Rodríguez',
    type: 'Notificación de Rechazo',
    subject: 'Actualización sobre su postulación',
    date: '2025-09-17 02:40 PM',
    status: 'Enviado',
  },
  {
    id: 'log-3',
    recipient: 'Carlos Sánchez',
    type: 'Recordatorio',
    subject: 'Próxima entrevista de portafolio',
    date: '2025-09-16 09:00 AM',
    status: 'Fallido',
  },
  {
    id: 'log-4',
    recipient: 'Ana García',
    type: 'Notificación de Aceptación',
    subject: '¡Felicidades! Oferta de Empleo Adjunta',
    date: '2025-09-15 11:30 AM',
    status: 'Enviado',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Enviado':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle2 className="mr-1 h-3 w-3" /> Enviado
        </span>
      );
    case 'Fallido':
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-700">
          <XCircle className="mr-1 h-3 w-3" /> Fallido
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
          {status}
        </span>
      );
  }
};

export default function AdminCommunicationLogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = useMemo(() => {
    return mockCommunicationLog.filter(log =>
      log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Log de Comunicación (Admin)</h1>
      </div>
      <p className="text-gray-600 mb-10">
        Revisa un registro completo de todos los correos electrónicos y notificaciones enviados por el sistema de reclutamiento.
      </p>

      <div className="mb-6 w-full relative">
        <Input
          placeholder="Buscar por candidato, asunto o tipo de mensaje..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <Card className="shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destinatario</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Fecha de Envío</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.recipient}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.subject}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No se encontraron registros de comunicación.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
