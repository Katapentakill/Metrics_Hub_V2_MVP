import { User } from "../types";

export interface MockDocument {
    id: string;
    name: string;
    type: 'company-library' | 'policies-guides' | 'hiring-onboarding' | 'employee-management' | 'termination' | 'volunteer-submissions'| 'volunteer-reference';
    status: 'draft' | 'published' | 'in-review' | 'approved' | 'completed' | 'verified' | 'filed' | 'signed' | 'sent' | 'submitted';
    uploadDate: string;
    lastModifiedDate: string;
    version: string;
    uploadedBy: string;
  }
  
  // Permisos específicos para el módulo de documentos
  export interface DocumentsRolePermissions {
    canView: boolean;
    canDownload: boolean;
    canUpload: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
    allowedTypes: MockDocument['type'][];
  }
  
  export const DOCUMENTS_PERMISSIONS: Record<User['role'], DocumentsRolePermissions> = {
    admin: {
      canView: true,
      canDownload: true,
      canUpload: false,
      canEdit: false,
      canDelete: false,
      canApprove: true,
      allowedTypes: ['company-library', 'policies-guides', 'volunteer-submissions'],
    },
    hr: {
      canView: true,
      canDownload: true,
      canUpload: true,
      canEdit: true,
      canDelete: true,
      canApprove: true,
      allowedTypes: ['company-library', 'policies-guides', 'hiring-onboarding', 'employee-management', 'termination', 'volunteer-submissions', 'volunteer-reference'],
    },
    lead: {
      canView: true,
      canDownload: true,
      canUpload: true,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      allowedTypes: ['company-library', 'policies-guides'],
    },
    volunteer: {
      canView: true,
      canDownload: true,
      canUpload: true,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      allowedTypes: ['volunteer-submissions'],
    },
    unassigned: {
      canView: false,
      canDownload: false,
      canUpload: false,
      canEdit: false,
      canDelete: false,
      canApprove: false,
      allowedTypes: [],
    }
  };