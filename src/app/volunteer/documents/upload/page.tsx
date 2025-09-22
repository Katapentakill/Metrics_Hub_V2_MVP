// src/app/volunteer/documents/upload/page.tsx
'use client';

import { useState } from 'react';
import { FileUp, FileText, CheckCircle, UploadCloud, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

const documentTypes = ['CV', 'Identificación', 'Acuerdo de Voluntariado', 'Otro'];

export default function VolunteerDocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !documentType) {
      alert('Por favor, selecciona un archivo y un tipo de documento.');
      return;
    }

    setIsUploading(true);
    // Simular una subida de archivo
    setTimeout(() => {
      console.log('Archivo subido:', file?.name);
      console.log('Tipo de documento:', documentType);
      setIsUploading(false);
      setUploadSuccess(true);
      setFile(null);
      setDocumentType('');
    }, 2000);
  };

  if (uploadSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">¡Documento subido con éxito!</h1>
        <p className="text-gray-600 mb-6">Tu archivo ha sido enviado a RR.HH. para su revisión.</p>
        <Link href="/volunteer/documents" passHref>
          <Button>Volver al Centro de Documentos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Subir Nuevos Documentos</h1>
      <p className="text-gray-600 mb-10">
        Usa este formulario para subir cualquier documento adicional que te haya sido solicitado.
      </p>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <UploadCloud className="h-6 w-6" />
            Subir Archivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Documento
              </label>
              <Select onValueChange={setDocumentType} value={documentType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tipo..." />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Archivo
              </label>
              <div
                className="flex items-center justify-center w-full px-6 py-8 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setFile(e.dataTransfer.files[0]);
                  }
                }}
              >
                <div className="text-center">
                  <FileUp className="mx-auto h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Arrastra y suelta tu archivo aquí, o
                    <label className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer ml-1">
                      haz clic para seleccionarlo
                      <input type="file" className="sr-only" onChange={handleFileChange} />
                    </label>
                  </p>
                  {file && <p className="mt-1 text-xs text-gray-500">Archivo seleccionado: {file.name}</p>}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={!file || !documentType || isUploading}>
              {isUploading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Subiendo...
                </span>
              ) : (
                'Subir Documento'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}