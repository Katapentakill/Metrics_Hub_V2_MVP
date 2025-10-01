// src/lib/data/mockVolunteerData.ts
import { faker } from '@faker-js/faker';

// Interfaz para la información del voluntario
export interface MockVolunteer {
  id: string;
  name: string;
  action: string;
  status: string; // 'active', 'inactive', 'suspended', 'Finalized'
  role: string; // 'Administrador', 'Recursos Humanos', 'Líder de Proyecto', 'Voluntario'
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
  const statuses = ['active', 'inactive', 'suspended', 'Finalized']; 
  const actions = ['First Call', 'Warning', 'Final Call'];
  const roles = [
    'Administrador',
    'Recursos Humanos',
    'Líder de Proyecto',
    'Voluntario',
    'Voluntario', 
    'Voluntario',
  ];
  const volunteerTypes = ['Regular Volunteer', 'Intern', 'Onboarding Volunteer', ''];

  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    action: faker.helpers.arrayElement(actions),
    status: faker.helpers.arrayElement(statuses) as any,
    role: faker.helpers.arrayElement(roles),
    team: faker.helpers.arrayElement(teams),
    supervisor: faker.person.fullName(),
    weeksLeft: faker.number.int({ min: 0, max: 24 }),
    hrsPerWk: faker.number.int({ min: 5, max: 20 }),
    volunteerType: faker.helpers.arrayElement(volunteerTypes),
    duration: faker.number.int({ min: 3, max: 12 }),
    startDate: faker.date.past({ years: 1 }).toISOString(), 
    endDate: faker.date.future({ years: 1 }).toISOString(), 
    personalEmail: faker.internet.email(),
  }));
};