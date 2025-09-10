// src/lib/data/mockVolunteerData.ts
import { faker } from '@faker-js/faker';

// Interfaz para la información del voluntario
export interface MockVolunteer {
  id: string;
  name: string;
  action: string;
  status: string;
  role: string;
  team: string;
  supervisor: string;
  weeksLeft: number;
  hrsPerWk: number;
  volunteerType: string;
  duration: number;
  startDate: string;
  endDate: string;
  personalEmail: string;
}

// Generamos datos ficticios para los voluntarios
export const getMockVolunteers = (count: number = 30): MockVolunteer[] => {
  const teams = [
    'Genesis',
    'Vitalink',
    'Vitalink, Volunteer Metrics',
    'Brand & Design',
    'Cultive Connect',
    'Global Affairs Office',
    'Cultive Connect, Genesis',
    'Human Resources',
    'Green Verde',
    'English Program',
    'Finance',
    'Volunteer Metrics',
  ];
  const statuses = ['Acitive', 'Onleave', 'Inactive','Finalized'];
  const actions = ['First Call', 'Warning', 'Final Call'];
  const roles = [
    'Big Data Analyst',
    'Software developer',
    'Brand Designer - UI/UX Designer',
    'Project Developer',
    'Product Designer',
    'Community Manager',
    'Social Media Strategist',
    'Backend Developer',
  ];
  const volunteerTypes = ['Regular Volunteer', 'Intern', 'Onboarding Volunteer', ''];

  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    action: faker.helpers.arrayElement(actions),
    status: faker.helpers.arrayElement(statuses),
    role: faker.helpers.arrayElement(roles),
    team: faker.helpers.arrayElement(teams),
    supervisor: faker.person.fullName(),
    weeksLeft: faker.number.int({ min: 0, max: 24 }),
    hrsPerWk: faker.number.int({ min: 5, max: 20 }),
    volunteerType: faker.helpers.arrayElement(volunteerTypes),
    duration: faker.number.int({ min: 3, max: 12 }),
    startDate: faker.date.past({ years: 1 }).toDateString(),
    endDate: faker.date.future({ years: 1 }).toDateString(),
    personalEmail: faker.internet.email(),
  }));
};