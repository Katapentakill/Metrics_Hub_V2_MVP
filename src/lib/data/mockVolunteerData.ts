//src/lib/data/mockVolunteerData.ts
import { faker } from '@faker-js/faker';

// Interfaz para la información del voluntario activo
export interface MockVolunteer {
  id: string;
  name: string;
  email: string;
  team: string;
  signedVA: 'Yes' | 'No'; // Volunteer Agreement Status
  evaluationStatus: 'pending' | 'completed' | 'overdue';
  hasPromotionRequest: boolean;
  startDate: Date;
  weeksLeft: number;
}

// Generamos datos ficticios para los voluntarios activos
export const getMockVolunteers = (count: number = 30): MockVolunteer[] => {
  const teams = ['Marketing Digital', 'Desarrollo Frontend', 'Análisis de Datos', 'Proyectos Sociales'];
  const evaluationStatuses = ['pending', 'completed', 'overdue'];
  const signedVAStatus = ['Yes', 'No'];

  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    team: faker.helpers.arrayElement(teams),
    signedVA: faker.helpers.arrayElement(signedVAStatus) as 'Yes' | 'No',
    evaluationStatus: faker.helpers.arrayElement(evaluationStatuses) as 'pending' | 'completed' | 'overdue',
    hasPromotionRequest: faker.datatype.boolean(),
    startDate: faker.date.past({ years: 1 }),
    weeksLeft: faker.number.int({ min: 1, max: 20 }),
  }));
};
