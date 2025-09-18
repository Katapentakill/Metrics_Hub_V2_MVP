// src/app/hr/documents/volunteer-termination/page.tsx
import DocumentList from '@/modules/documents/hr/documentlist';

export default function VolunteerTerminationPage() {
  const allowedTypes = ['volunteer-termination'];

  return (
    <DocumentList
      title="Certificados de Terminación de Voluntariado"
      description="Administra y emite los certificados de finalización para los voluntarios, reconociendo su servicio y contribución a la organización."
      allowedTypes={allowedTypes}
      cardColor="text-green-600"
      canAdd={true}
      canEdit={true}
      canDelete={true}
    />
  );
}
