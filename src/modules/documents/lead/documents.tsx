// src/modules/documents/lead/documents.tsx
'use client';

import { useState } from 'react';
import { Upload, Download, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Mock de documentos con fecha de subida
const mockProjectDocs = [
  {
    id: 1,
    name: 'Project Roadmap - Green Initiative',
    type: 'Roadmap',
    project: 'Green Initiative',
    url: '/docs/green-roadmap.pdf',
    uploadedAt: '2025-09-01',
  },
  {
    id: 2,
    name: 'Final Report - Climate Action',
    type: 'Report',
    project: 'Climate Action',
    url: '/docs/climate-final.pdf',
    uploadedAt: '2025-09-05',
  },
  {
    id: 3,
    name: 'Team Guide - Renewable Energy',
    type: 'Guide',
    project: 'Renewable Energy',
    url: '/docs/renewable-guide.pdf',
    uploadedAt: '2025-09-10',
  },
];

export default function ProjectLeadDocuments() {
  const [docs] = useState(mockProjectDocs);
  const [search, setSearch] = useState('');

  const filteredDocs = docs.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleUpload = () => {
    alert('Upload functionality restricted to your project scope.');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Project Documents
        </h1>
        <button
          onClick={handleUpload}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md px-3 py-2 w-full max-w-md"
      />

      {/* Grid de tarjetas de documentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600">
                    <FileText className="w-5 h-5" />
                    <CardTitle className="text-base font-semibold">
                      {doc.name}
                    </CardTitle>
                  </div>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline text-sm"
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-500 text-sm space-y-1">
                  <p>
                    <strong>Project:</strong> {doc.project}
                  </p>
                  <p>
                    <strong>Type:</strong> {doc.type}
                  </p>
                  <p>
                    <strong>Uploaded At:</strong>{' '}
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No documents found.
          </p>
        )}
      </div>
    </div>
  );
}