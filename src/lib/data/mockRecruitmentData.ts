//src/lib/data/mockRecruitmentData.ts
import { faker } from '@faker-js/faker';

export type CandidateStatus =
  | 'Application Received'
  | 'Application Accepted'
  | 'HR Review'
  | 'HR Interview Scheduled'
  | 'HR Interview Completed'
  | 'Accepted by HR'
  | 'PM Interview Scheduled'
  | 'PM Interview Completed'
  | 'Accepted by PM'
  | 'Accepted by Candidate'
  | 'Offer Sent'
  | 'Onboard'
  | 'Rejected by HR'
  | 'Rejected by PM'
  | 'Rejected by Candidate';

export type ToDoTask =
  | 'HR Review'
  | 'Schedule Interview'
  | 'Send Offer Letter'
  | 'Complete Onboarding Docs';

export type CptOptStatus =
  | 'No Required'
  | 'Requested'
  | 'Received'
  | 'Approved'
  | 'Rejected';

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
  volunteerType: 'Regular' | 'CPT' | 'OPT';
  interviewAssigned: string | null;
  supervisor: string | null;
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
  editingNotesId?: string | null;
}

export const teams = [
  'Global Affairs Office',
  'Genesis',
  'Brand & Design',
  'Human Resources',
  'Vitalink',
];

export const roles = [
  'Innovation Manager',
  'Senior Project Manager',
  'Data Analyst',
  'Graphic Designer',
  'Software Developer',
  'UX/UI Designer',
];

export const timezones = [
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Australia/Sydney',
];

export const vaStatuses = ['Not Sent', 'Sent', 'Signed', 'Rejected'] as const;
export const wlStatuses = ['Not Sent', 'Sent'] as const;
export const offerLetterStatuses = ['Not Sent', 'Sent', 'Accepted', 'Rejected'] as const;

export const cptOptOptions: CptOptStatus[] = [
  'No Required',
  'Requested',
  'Received',
  'Approved',
  'Rejected',
];

export const getMockRecruitmentData = (count: number = 20): MockCandidate[] => {
  const statuses: CandidateStatus[] = [
    'Application Received',
    'Application Accepted',
    'Accepted by HR',
    'Rejected by HR',
    'Accepted by PM',
    'Rejected by PM',
    'Rejected by Candidate',
    'Accepted by Candidate',
    'Onboard',
    'HR Review',
    'HR Interview Scheduled',
    'HR Interview Completed',
    'PM Interview Scheduled',
    'PM Interview Completed',
    'Offer Sent',
  ];

  const volunteerTypes = ['Regular', 'CPT', 'OPT'] as const;

  return Array.from({ length: count }, () => {
    const status = faker.helpers.arrayElement(statuses);
    const volunteerType = faker.helpers.arrayElement(volunteerTypes);
    const hasInterview = [
      'Application Accepted',
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
      cptOptStatus: volunteerType === 'Regular' ? 'No Required' : faker.helpers.arrayElement(cptOptOptions.filter(opt => opt !== 'No Required')),
      volunteerType,
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
      timezone: faker.helpers.arrayElement(timezones),
      hrsWk: faker.number.int({ min: 5, max: 20 }),
      duration: `${faker.number.int({ min: 1, max: 12 })} months`,
      startDate: startDate,
      endDate: endDate,
      editingNotesId: null
    };
  });
};