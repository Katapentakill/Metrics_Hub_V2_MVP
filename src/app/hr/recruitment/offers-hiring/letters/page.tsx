// src/app/hr/recruitment/offers-hiring/letters/page.tsx
import Link from 'next/link';
import { FileText, PlusCircle, Send, Edit, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ------------------
// Tipos
// ------------------
type Letter = {
  id: string;
  type: string;
  candidate: string;
  role: string;
  status: 'Enviada' | 'Pendiente de Firma' | 'Firmada' | string;
  date: string;
};

// ------------------
// Datos simulados
// ------------------
const mockLetters: Letter[] = [
  {
    id: 'offer-1',
    type: 'Oferta de Empleo',
    candidate: 'Juan Pérez',
    role: 'Desarrollador de Software',
    status: 'Enviada',
    date: '2025-09-17',
  },
  {
    id: 'offer-2',
    type: 'Acuerdo de Voluntariado',
    candidate: 'María Rodríguez',
    role: 'Asistente de Marketing',
    status: 'Pendiente de Firma',
    date: '2025-09-15',
  },
  {
    id: 'offer-3',
    type: 'Carta de Bienvenida',
    candidate: 'Carlos Sánchez',
    role: 'Diseñador Gráfico',
    status: 'Firmada',
    date: '2025-09-10',
  },
];

// ------------------
// Utilidades
// ------------------
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Enviada':
      return 'bg-blue-100 text-blue-700';
    case 'Pendiente de Firma':
      return 'bg-yellow-100 text-yellow-700';
    case 'Firmada':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(date));

// ------------------
// Componente principal
// ------------------
export default function OffersAndLettersPage() {
  return (
    <div className="p-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Generación y Envío de Cartas</h1>
        <Button asChild>
          <Link href="/hr/recruitment/offers-hiring/letters/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nueva Carta
          </Link>
        </Button>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-10">
        Crea, personaliza y realiza un seguimiento de las cartas de oferta, acuerdos y otros documentos importantes para la contratación.
      </p>

      {/* Listado de cartas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLetters.map((letter) => (
          <Card key={letter.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-500" />
                  {letter.type}
                </CardTitle>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                    letter.status,
                  )}`}
                >
                  {letter.status}
                </span>
              </div>
              <CardDescription>Para: {letter.candidate}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <div className="text-sm text-gray-500 mb-2">
                <p>
                  <strong>Rol:</strong> {letter.role}
                </p>
                <p>
                  <strong>Fecha:</strong> {formatDate(letter.date)}
                </p>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Reenviar
                </Button>

                <Button asChild variant="ghost" size="sm">
                  <Link href={`/hr/recruitment/offers-hiring/letters/${letter.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>

                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
