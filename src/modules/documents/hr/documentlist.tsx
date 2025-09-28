// src/modules/documents/hr/documentlist.tsx
'use client';

import { useState } from 'react';
import { FileText, Download, Search, Plus, Edit, Trash } from 'lucide-react';
import { mockDocuments } from '@/lib/data/mockDocuments';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Define la forma de un documento
interface Document {
  id: string;
  name: string;
  type: string;
  version: string;
  uploadedBy: string;
  uploadDate: string;
}

interface DocumentListProps {
  title: string;
  description: string;
  allowedTypes: string[];
  cardColor: string;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function DocumentList({ title, description, allowedTypes, cardColor, canAdd, canEdit, canDelete }: DocumentListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState<Document[]>(mockDocuments.filter(doc => allowedTypes.includes(doc.type)));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newDocData, setNewDocData] = useState({ name: '', type: '', version: '' });
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = mockDocuments.filter(
      (doc) =>
        allowedTypes.includes(doc.type) &&
        doc.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDocuments(filtered);
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewDocData({ name: '', type: '', version: '' });
  };

  const openEditModal = (doc: Document) => {
    setEditingDoc(doc);
    setNewDocData({ name: doc.name, type: doc.type, version: doc.version });
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingDoc(null);
    setNewDocData({ name: '', type: '', version: '' });
  };

  const handleAdd = () => {
    if (newDocData.name && newDocData.type && newDocData.version) {
      const newDocument: Document = {
        id: (Math.random() * 1000).toFixed(0),
        name: newDocData.name,
        type: newDocData.type,
        version: newDocData.version,
        uploadedBy: 'Admin',
        uploadDate: new Date().toISOString().split('T')[0],
      };
      setDocuments([newDocument, ...documents]);
      closeAddModal();
      alert(`Documento "${newDocData.name}" agregado con éxito.`);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleUpdate = () => {
    if (editingDoc && newDocData.name && newDocData.type && newDocData.version) {
      const updatedDocuments = documents.map(doc =>
        doc.id === editingDoc.id
          ? { ...doc, name: newDocData.name, type: newDocData.type, version: newDocData.version }
          : doc
      );
      setDocuments(updatedDocuments);
      closeEditModal();
      alert(`Documento "${newDocData.name}" actualizado con éxito.`);
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleDelete = (docId: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar este documento?`)) {
      setDocuments(documents.filter(doc => doc.id !== docId));
    }
  };

  const getButtonBgColor = () => {
    if (cardColor === 'text-blue-600') return 'bg-blue-500 hover:bg-blue-600';
    if (cardColor === 'text-green-600') return 'bg-green-500 hover:bg-green-600';
    if (cardColor === 'text-purple-600') return 'bg-purple-500 hover:bg-purple-600';
    if (cardColor === 'text-orange-600') return 'bg-orange-500 hover:bg-orange-600';
    return 'bg-gray-500 hover:bg-gray-600';
  };

  const typeOptions = allowedTypes.map(type => ({ value: type, label: type }));
  const versionOptions = ['1.0', '1.1', '2.0', '3.0'];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        {canAdd && (
          <button
            onClick={openAddModal}
            className={`px-4 py-2 text-white rounded-lg text-sm flex items-center gap-2 transition-colors ${getButtonBgColor()}`}
          >
            <Plus size={16} /> Subir Nuevo
          </button>
        )}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {/* Barra de búsqueda */}
      <div className="mb-6 w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Buscar documentos..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 placeholder:text-slate-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {/* Lista de documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className={`flex items-center gap-2 ${cardColor}`}>
                <FileText className="w-5 h-5" />
                <CardTitle>{doc.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-2">Tipo: {doc.type}</p>
              <p className="text-gray-500 mb-2">Versión: {doc.version}</p>
              <p className="text-gray-500 mb-2">Subido por: {doc.uploadedBy}</p>
              <p className="text-gray-500 mb-2">Fecha de subida: {doc.uploadDate}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className={`px-3 py-1 text-white rounded-lg hover:opacity-80 transition-opacity text-sm flex items-center gap-1 ${getButtonBgColor()}`}
                  onClick={() => alert(`Descargando: ${doc.name}`)}
                >
                  <Download size={16} /> Descargar
                </button>
                {canEdit && (
                  <button onClick={() => openEditModal(doc)} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm flex items-center gap-1">
                    <Edit size={16} /> Editar
                  </button>
                )}
                {canDelete && (
                  <button onClick={() => handleDelete(doc.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm flex items-center gap-1">
                    <Trash size={16} /> Eliminar
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {documents.length === 0 && (
          <p className="text-gray-500 col-span-full">No se encontraron documentos.</p>
        )}
      </div>

      {/* Modal para agregar nuevo documento */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">Subir Nuevo Documento</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
              <div className="mb-4">
                <label htmlFor="docName" className="block text-gray-700 font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  id="docName"
                  value={newDocData.name}
                  onChange={(e) => setNewDocData({ ...newDocData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="docType" className="block text-gray-700 font-bold mb-2">Tipo</label>
                <select
                  id="docType"
                  value={newDocData.type}
                  onChange={(e) => setNewDocData({ ...newDocData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {allowedTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="docVersion" className="block text-gray-700 font-bold mb-2">Versión</label>
                <select
                  id="docVersion"
                  value={newDocData.version}
                  onChange={(e) => setNewDocData({ ...newDocData, version: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccione una versión</option>
                  {versionOptions.map(version => (
                    <option key={version} value={version}>{version}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Subir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar documento */}
      {isEditModalOpen && editingDoc && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">Editar Documento</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <div className="mb-4">
                <label htmlFor="editDocName" className="block text-gray-700 font-bold mb-2">Nombre</label>
                <input
                  type="text"
                  id="editDocName"
                  value={newDocData.name}
                  onChange={(e) => setNewDocData({ ...newDocData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editDocType" className="block text-gray-700 font-bold mb-2">Tipo</label>
                <select
                  id="editDocType"
                  value={newDocData.type}
                  onChange={(e) => setNewDocData({ ...newDocData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {allowedTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="editDocVersion" className="block text-gray-700 font-bold mb-2">Versión</label>
                <select
                  id="editDocVersion"
                  value={newDocData.version}
                  onChange={(e) => setNewDocData({ ...newDocData, version: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {versionOptions.map(version => (
                    <option key={version} value={version}>{version}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}