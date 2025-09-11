// src/lib/data/mockDocuments.ts
import { MockDocument } from '@/lib/types';


// Documentos de ejemplo para todo el sistema
export const mockDocuments: MockDocument[] = [
  // 🔹 Legal
  {
    id: '3',
    name: 'Volunteer Agreement v1.2',
    type: 'legal',
    status: 'approved',
    uploadDate: '2024-03-01',
    lastModifiedDate: '2024-03-05',
    version: '1.2',
    uploadedBy: 'HR Manager',
  },
  {
    id: '4',
    name: 'Confidentiality Agreement',
    type: 'legal',
    status: 'draft',
    uploadDate: '2024-03-10',
    lastModifiedDate: '2024-03-12',
    version: '0.9',
    uploadedBy: 'Admin',
  },

  // 🔹 Template
  {
    id: '5',
    name: 'Offer Letter Template',
    type: 'template',
    status: 'published',
    uploadDate: '2024-01-20',
    lastModifiedDate: '2024-01-25',
    version: '2.0',
    uploadedBy: 'HR Manager',
  },
  {
    id: '6',
    name: 'Onboarding Checklist',
    type: 'template',
    status: 'published',
    uploadDate: '2024-02-01',
    lastModifiedDate: '2024-02-03',
    version: '1.1',
    uploadedBy: 'HR Manager',
  },

  // 🔹 General
  {
    id: '7',
    name: 'Code of Conduct',
    type: 'general',
    status: 'published',
    uploadDate: '2024-01-15',
    lastModifiedDate: '2024-01-20',
    version: '3.0',
    uploadedBy: 'Admin',
  },
  {
    id: '8',
    name: 'Annual Report 2024',
    type: 'general',
    status: 'published',
    uploadDate: '2024-04-01',
    lastModifiedDate: '2024-04-05',
    version: '1.0',
    uploadedBy: 'Admin',
  },

  // 🔹 Volunteer-Personal
  {
    id: '9',
    name: 'CV - Jane Smith',
    type: 'volunteer-personal',
    status: 'submitted',
    uploadDate: '2024-03-12',
    lastModifiedDate: '2024-03-12',
    version: '1.0',
    uploadedBy: 'Jane Smith',
  },
  {
    id: '10',
    name: 'OPT EAD Card - John Doe',
    type: 'volunteer-personal',
    status: 'verified',
    uploadDate: '2024-03-15',
    lastModifiedDate: '2024-03-16',
    version: '1.0',
    uploadedBy: 'HR Manager',
  },

  // 🔹 Project
  {
    id: '11',
    name: 'Project Genesis Roadmap',
    type: 'project',
    status: 'in-review',
    uploadDate: '2024-02-22',
    lastModifiedDate: '2024-02-25',
    version: '0.8',
    uploadedBy: 'Project Lead',
  },
  {
    id: '12',
    name: 'Vitalink Weekly Report',
    type: 'project',
    status: 'published',
    uploadDate: '2024-03-05',
    lastModifiedDate: '2024-03-06',
    version: '1.0',
    uploadedBy: 'Team Member',
  },
];
