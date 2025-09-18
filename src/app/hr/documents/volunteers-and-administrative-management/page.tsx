import DocumentList from '@/modules/documents/hr/documentlist';

export default function VolunteerAndAdministrativeDocumentsPage() {
  const allowedTypes = ['volunteer-submissions', 'employee-management'];

  return (
    <DocumentList
      title="Documentos de Gestión Administrativa y Voluntariado"
      description="Centraliza y administra los documentos relacionados con la gestión administrativa del personal y los archivos enviados por los voluntarios."
      allowedTypes={allowedTypes}
      cardColor="text-blue-600"
      canAdd
      canEdit
      canDelete
    />
  );
}
