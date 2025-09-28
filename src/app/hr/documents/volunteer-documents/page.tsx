import DocumentList from '@/modules/documents/hr/documentlist';

export default function VolunteerDocumentsPage() {
  const allowedTypes = ['volunteer-submissions'];

  return (
    <DocumentList
      title="Documentos de Voluntarios"
      description="Gestiona y accede a todos los documentos enviados por los voluntarios, como formularios de solicitud y certificaciones."
      allowedTypes={allowedTypes}
      cardColor="text-orange-600"
      canAdd
      canEdit
      canDelete
    />
  );
}
