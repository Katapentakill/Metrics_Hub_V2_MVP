// src/lib/types/applications.ts
// Tipos para aplicaciones y postulaciones a ofertas

export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'withdrawn';
export type ApplicantRole = 'volunteer' | 'lead';

export interface VolunteerJobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicantRole: ApplicantRole;
  status: ApplicationStatus;
  submittedDate: Date | null;
  coverLetter: string;
  motivations: string[];
  availabilityDetails: {
    startDate: Date;
    endDate?: Date;
    hoursPerWeek: number;
    timezone: string;
  };
  relevantExperience: string;
  whyYouAreFit: string;
  additionalInfo?: string;
  attachments?: string[];
  reviewNotes?: string;
  interviewDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerApplicationData {
  coverLetter: string;
  motivations: string[];
  availabilityDetails: {
    startDate: string;
    endDate?: string;
    hoursPerWeek: number;
    timezone: string;
  };
  relevantExperience: string;
  whyYouAreFit: string;
  additionalInfo?: string;
}

export interface LeadApplicationData {
  coverLetter: string;
  motivations: string[];
  projectExperience: string;
  teamManagement: string;
  whyYouAreFit: string;
  additionalInfo?: string;
}
