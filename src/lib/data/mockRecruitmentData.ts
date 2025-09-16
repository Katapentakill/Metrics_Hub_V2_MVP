// src/lib/data/mockRecruitmentData.ts
import { faker } from '@faker-js/faker';

// Tipos de estados de candidatos
export type CandidateStatus =
  | 'Application Received'
  | 'Accepted by HR'
  | 'Rejected by HR'
  | 'Accepted by PM'
  | 'Rejected by PM'
  | 'Rejected by Candidate'
  | 'Accepted by Candidate'
  | 'Onboard'
  | 'HR Review'
  | 'Interview Scheduled'
  | 'Interview Completed'
  | 'Offer Sent';

export type ToDoTask =
  | 'HR Review'
  | 'Schedule Interview'
  | 'Send Offer Letter'
  | 'Complete Onboarding Docs';

// Estado CPT/OPT
export type CptOptStatus =
  | 'No required'
  | 'Requested'
  | 'Received'
  | 'Approved'
  | 'Rejected';

// Interfaz para candidatos
export interface MockCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  team: string;
  applicationStatus: CandidateStatus;
  toDo: ToDoTask[];
  cvLink: string;
  timezone: string;
  hrsWk: number;
  cptOptStatus: CptOptStatus;
  appliedRole: string;
  projectPreferences: string[];
  linkedinUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  recruitmentStage: string;
  lastContact: Date;
  interviewDate: Date | null;
  notes: string;

  // Nuevos campos
  volunteerType: 'Regular' | 'CPT' | 'OPT';
  interviewAssigned: string | null;
  supervisor: string | null;
  
  // Tipos de fecha corregidos
  hrInterviewDate: Date | null;
  pmInterviewDate: Date | null;
  startDate: Date | null;
  endDate: Date | null;

  duration: string;
  offerLetterStatus: 'Not Sent' | 'Sent' | 'Accepted' | 'Rejected';
  offerLetterLink: string | null;
  vaStatus: 'Not Sent' | 'Sent' | 'Signed' | 'Rejected';
  vaLink: string | null;
  wlStatus: 'Not Sent' | 'Sent';
  wlLink: string | null;
}

// Generador de datos ficticios
export const teams = [
  'Global Affairs Office',
  'Genesis',
  'Brand & Design',
  'Human Resources',
  'Vitalink',
];

export const vaStatuses = ['Not Sent', 'Sent', 'Signed', 'Rejected'] as const;
export const wlStatuses = ['Not Sent', 'Sent'] as const;
export const offerLetterStatuses = ['Not Sent', 'Sent', 'Accepted', 'Rejected'] as const;

export const cptOptOptions: CptOptStatus[] = [ // Added 'export' here
  'No required',
  'Requested',
  'Received',
  'Approved',
  'Rejected',
];

export const getMockRecruitmentData = (count: number = 20): MockCandidate[] => {
  const statuses: CandidateStatus[] = [
    'Application Received',
    'Accepted by HR',
    'Rejected by HR',
    'Accepted by PM',
    'Rejected by PM',
    'Rejected by Candidate',
    'Accepted by Candidate',
    'Onboard',
    'HR Review',
    'Interview Scheduled',
    'Interview Completed',
    'Offer Sent',
  ];

  const roles = [
    'Innovation Manager',
    'Senior Project Manager',
    'Data Analyst',
    'Graphic Designer',
    'Software Developer',
    'UX/UI Designer',
  ];

  const volunteerTypes = ['Regular', 'CPT', 'OPT'] as const;

  return Array.from({ length: count }, () => {
    const status = faker.helpers.arrayElement(statuses);
    const hasInterview = [
      'Accepted by HR',
      'Accepted by PM',
      'Accepted by Candidate',
      'Onboard',
      'Interview Scheduled',
      'Interview Completed',
    ].includes(status);

    const toDo: ToDoTask[] = [];
    if (status === 'Application Received') toDo.push('HR Review', 'Schedule Interview');
    else if (status === 'Accepted by PM') toDo.push('Send Offer Letter');
    else if (status === 'Accepted by Candidate') toDo.push('Complete Onboarding Docs');
    
    const startDate = faker.date.future({ years: 1 });
    const endDate = faker.date.future({ years: 2, refDate: startDate });

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: faker.helpers.arrayElement(roles),
      appliedRole: faker.helpers.arrayElement(roles),
      projectPreferences: [faker.commerce.department(), faker.commerce.department()],
      linkedinUrl: faker.internet.url(),
      portfolioUrl: faker.internet.url(),
      githubUrl: faker.internet.url(),
      team: faker.helpers.arrayElement(teams),
      applicationStatus: status,
      toDo,
      hrInterviewDate: hasInterview ? faker.date.future({ years: 1 }) : null,
      interviewDate: hasInterview ? faker.date.future({ years: 1 }) : null,
      recruitmentStage: faker.helpers.arrayElement(['Screening', 'Interview', 'Offer', 'Onboarding']),
      lastContact: faker.date.recent(),
      notes: faker.lorem.paragraph(),
      cptOptStatus: faker.helpers.arrayElement(cptOptOptions),
      volunteerType: faker.helpers.arrayElement(volunteerTypes),
      interviewAssigned: faker.person.fullName(),
      supervisor: faker.person.fullName(),
      pmInterviewDate: hasInterview ? faker.date.future({ years: 1 }) : null,
      offerLetterStatus: faker.helpers.arrayElement(offerLetterStatuses),
      offerLetterLink: faker.internet.url(),
      vaStatus: faker.helpers.arrayElement(vaStatuses),
      vaLink: faker.internet.url(),
      wlStatus: faker.helpers.arrayElement(wlStatuses),
      wlLink: faker.internet.url(),
      cvLink: faker.internet.url(),
      timezone: faker.location.timeZone(),
      hrsWk: faker.number.int({ min: 5, max: 20 }),
      duration: `${faker.number.int({ min: 1, max: 12 })} months`,
      startDate: startDate,
      endDate: endDate,
      editingNotesId: null
    };
  });
};