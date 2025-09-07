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
  | 'requested'
  | 'received'
  | 'approved'
  | 'rejected';

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
  hrInterviewDate: string | null;
  cvLink: string;
  timezone: string;
  hrsWk: number;
  cptOptStatus: CptOptStatus;
  
  // NUEVOS CAMPOS AÑADIDOS
  volunteerType: 'Regular' | 'CPT' | 'OPT';
  interviewAssigned: string | null;
  supervisor: string | null;
  pmInterviewDate: string | null;
  duration: string;
  startDate: string | null;
  endDate: string | null;
  offerLetterStatus: 'Not Sent' | 'Sent' | 'Accepted' | 'Rejected';
  offerLetterLink: string | null;
  vaStatus: 'Not Sent' | 'Sent' | 'Signed' | 'Rejected';
  vaLink: string | null;
  wlStatus: 'Not Sent' | 'Sent';
  wlLink: string | null;
}


// Generador de datos ficticios
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

  const teams = [
    'Global Affairs Office',
    'Genesis',
    'Brand & Design',
    'Human Resources',
    'Vitalink',
  ];

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

    // Generamos fecha mock como string
    const hrInterviewDate = hasInterview
      ? faker.date.future({ years: 1 }).toISOString().split('T')[0] // formato YYYY-MM-DD
      : null;

    const toDo: ToDoTask[] = [];

    // Lógica para tareas según estado
    if (status === 'Application Received') {
      toDo.push('HR Review', 'Schedule Interview');
    } else if (status === 'Accepted by PM') {
      toDo.push('Send Offer Letter');
    } else if (status === 'Accepted by Candidate') {
      toDo.push('Complete Onboarding Docs');
    }

    // Nuevos campos mock
    const volunteerTypes = ['Regular', 'CPT', 'OPT'] as const;
    const offerLetterStatuses = ['Not Sent', 'Sent', 'Accepted', 'Rejected'] as const;
    const vaStatuses = ['Not Sent', 'Sent', 'Signed', 'Rejected'] as const;
    const wlStatuses = ['Not Sent', 'Sent'] as const;

    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: faker.helpers.arrayElement(roles),
      team: faker.helpers.arrayElement(teams),
      applicationStatus: status,
      toDo,
      hrInterviewDate,
      cvLink: faker.internet.url(),
      timezone: faker.helpers.arrayElement([
        'America/New_York',
        'Europe/Madrid',
        'America/Mexico_City',
        'Asia/Tokyo',
        'America/Bogota',
        'Europe/London',
      ]), // timezone como string mock
      hrsWk: faker.number.int({ min: 10, max: 40 }),
      cptOptStatus: faker.helpers.arrayElement([
        'No required',
        'requested',
        'received',
        'approved',
        'rejected',
      ]),
      // NUEVOS CAMPOS AÑADIDOS
      volunteerType: faker.helpers.arrayElement(volunteerTypes),
      interviewAssigned: faker.person.fullName(),
      supervisor: faker.person.fullName(),
      pmInterviewDate: hasInterview
        ? faker.date.future({ years: 1 }).toISOString().split('T')[0]
        : null,
      duration: `${faker.number.int({ min: 1, max: 12 })} months`,
      startDate: faker.date.future({ years: 1 }).toISOString().split('T')[0],
      endDate: faker.date.future({ years: 2 }).toISOString().split('T')[0],
      offerLetterStatus: faker.helpers.arrayElement(offerLetterStatuses),
      offerLetterLink: faker.internet.url(),
      vaStatus: faker.helpers.arrayElement(vaStatuses),
      vaLink: faker.internet.url(),
      wlStatus: faker.helpers.arrayElement(wlStatuses),
      wlLink: faker.internet.url(),
    };
  });
};
