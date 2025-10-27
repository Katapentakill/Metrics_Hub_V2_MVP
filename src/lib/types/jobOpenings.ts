// src/lib/types/jobOpenings.ts

export type JobStatus = 'draft' | 'published' | 'closed' | 'filled';

export type JobType = 'Regular' | 'CPT' | 'OPT';

export type JobCategory =
  | 'Technology'
  | 'Design'
  | 'Marketing'
  | 'Operations'
  | 'Human Resources'
  | 'Finance'
  | 'Legal'
  | 'Other';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  team: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  location: string;
  locationType: 'Remote' | 'Hybrid' | 'On-site';
  hoursPerWeek: number;
  duration: string;
  startDate: Date | null;
  endDate: Date | null;
  jobType: JobType;
  category: JobCategory;
  status: JobStatus;
  publishedDate: Date | null;
  closingDate: Date | null;
  numberOfPositions: number;
  applicantsCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  salary?: string;
  benefits: string[];
  skills: string[];
  experienceLevel: 'Entry Level' | 'Intermediate' | 'Advanced' | 'Expert';
  languageRequirements?: string[];
  timezone?: string;
  applicationUrl?: string;
  contactEmail?: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedDate: Date;
  coverLetter?: string;
  resumeUrl?: string;
}
