// src/app/volunteer/documents/upload/page.tsx
'use client';

import { useState } from 'react';
import { 
  FileUp, 
  CheckCircle, 
  UploadCloud, 
  Loader2,
  Sparkles,
  AlertCircle,
  X,
  File,
  Image,
  FileText,
  ArrowRight,
  Info
} from 'lucide-react';

const documentTypes = [
  { value: 'cv', label: 'CV / Currículum', icon: FileText },
  { value: 'id', label: 'Identificación', icon: File },
  { value: 'agreement', label: 'Acuerdo de Voluntariado', icon: FileText },
  { value: 'certificate', label: 'Certificado', icon: File },
  { value: 'other', label: 'Otro', icon: File },
];

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
    return <Image className="w-5 h-5 text-purple-500" />;
  }
  if (ext === 'pdf') {
    return <FileText className="w-5 h-5 text-red-500" />;
  }
  return <File className="w-5 h-5 text-gray-500" />;
};

const formatFileSize = (bytes: number): string => {
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export default function VolunteerDocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !documentType) {
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      console.log('Archivo subido:', file?.name);
      console.log('Tipo de documento:', documentType);
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  const removeFile = () => {
    setFile(null);
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center border border-gray-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">¡Documento Subido!</h1>
            <p className="text-gray-600 mb-8">Tu archivo ha sido enviado exitosamente a RR.HH. para revisión. Te notificaremos cuando sea aprobado.</p>
            <button
              onClick={() => window.location.href = '/volunteer/documents/my-application-files'}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2"
            >
              Ver Mis Documentos
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl blur-lg opacity-50" />
              <div className="relative p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl">
                <UploadCloud className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold text-gray-900">Subir Documento</h1>
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-gray-600 text-lg">Adjunta documentos adicionales solicitados</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Formatos Aceptados</h3>
                <p className="text-sm text-blue-700">PDF, DOC, DOCX, JPG, PNG (máximo 10MB). Asegúrate de que los documentos sean legibles y estén actualizados.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileUp className="w-6 h-6 text-green-600" />
              Formulario de Carga
            </h2>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Tipo de Documento *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setDocumentType(type.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        documentType === type.value
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${documentType === type.value ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`font-medium ${documentType === type.value ? 'text-green-900' : 'text-gray-700'}`}>
                          {type.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Seleccionar Archivo *
              </label>
              <div
                className={`relative rounded-xl border-2 border-dashed transition-all ${
                  dragActive
                    ? 'border-green-500 bg-green-50'
                    : file
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!file ? (
                  <div className="p-12 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="p-4 bg-gray-100 rounded-full">
                        <UploadCloud className="w-10 h-10 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Arrastra y suelta tu archivo aquí
                    </p>
                    <p className="text-sm text-gray-500 mb-4">o</p>
                    <label className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 cursor-pointer transition-all">
                      Seleccionar Archivo
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    <p className="text-xs text-gray-500 mt-4">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getFileIcon(file.name)}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!file || !documentType ? (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <p className="text-sm text-yellow-700 font-medium">
                    Por favor, selecciona un tipo de documento y un archivo para continuar
                  </p>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || !documentType || isUploading}
              className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                !file || !documentType || isUploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Subiendo Documento...
                </>
              ) : (
                <>
                  <UploadCloud className="w-5 h-5" />
                  Subir Documento
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}