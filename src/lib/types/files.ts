// 📁 src/lib/types/files.ts
// Tipos para gestión de archivos y documentos

export interface ProjectFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other';
  category: 'project_docs' | 'multimedia' | 'legal' | 'technical' | 'presentations' | 'other';
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
  file_path?: string;
  mime_type?: string;
  download_count?: number;
  is_public?: boolean;
}

export interface ExternalResource {
  id: string;
  name: string;
  url: string;
  description: string;
  category: 'documentation' | 'tools' | 'references' | 'templates' | 'other';
  color: string;
}

export interface Document {
  id: string;
  user_id: string;
  type: 'certificate' | 'letter' | 'agreement' | 'reference';
  title: string;
  content: string;
  verification_code: string;
  status: 'draft' | 'generated' | 'sent' | 'verified';
  expires_at?: string;
  created_at: string;
  metadata?: string;
}

export interface CertificateData {
  type: 'participation' | 'outstanding_contribution' | 'leadership' | 'technical_specialization' | 'community_service' | 'volunteer_of_the_year';
  recipient_name: string;
  service_period: {
    start_date: string;
    end_date: string;
  };
  total_hours: number;
  main_project: string;
  key_skills: string[];
  verification_code: string;
  issued_date: string;
  expires_date?: string;
  issuer_signature: string;
}
