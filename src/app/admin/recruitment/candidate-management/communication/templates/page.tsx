// src/app/admin/recruitment/candidate-management/communication/templates/page.tsx
'use client';

import DocumentList from '@/modules/documents/hr/documentlist';
import { PenTool } from 'lucide-react';

export default function AdminCommunicationTemplatesPage() {
  const allowedTypes = ['plantilla de correo', 'carta de oferta', 'notificación'];

  return (
    <DocumentList
      title="Gestión de Plantillas"
      description="Crea y administra plantillas reutilizables para correos electrónicos, cartas de oferta y otros documentos de comunicación con los candidatos."
      allowedTypes={allowedTypes}
      cardColor="text-blue-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}
