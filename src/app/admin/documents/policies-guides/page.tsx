//src/app/admin/documents/policies-guides/page.tsx
'use client';

import { useState } from 'react';
import { FileText, Download, Search } from 'lucide-react';
import { mockDocuments } from '@/lib/data/mockDocuments';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PoliciesGuides() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar documentos de tipo "general" o "policy"
  const documents = mockDocuments.filter(
    (doc) =>
      (doc.type === 'general' || doc.type === 'policy') &&
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📄 Policies & Guides</h1>
      <p className="text-gray-600 mb-6">
        Consulta políticas internas y guías de referencia de la organización.
      </p>

      {/* Barra de búsqueda */}
      <div className="mb-6 w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Buscar documentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-slate-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Lista de documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 text-green-600">
                <FileText className="w-5 h-5" />
                <CardTitle>{doc.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-2">Tipo: {doc.type}</p>
              <p className="text-gray-500 mb-2">Versión: {doc.version}</p>
              <p className="text-gray-500 mb-2">Subido por: {doc.uploadedBy}</p>
              <p className="text-gray-500 mb-2">Fecha de subida: {doc.uploadDate}</p>
              <button
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm flex items-center gap-1"
                onClick={() => alert(`Descargando: ${doc.name}`)}
              >
                <Download size={16} />
                Descargar
              </button>
            </CardContent>
          </Card>
        ))}
        {documents.length === 0 && (
          <p className="text-gray-500 col-span-full">No se encontraron documentos.</p>
        )}
      </div>
    </div>
  );
}
