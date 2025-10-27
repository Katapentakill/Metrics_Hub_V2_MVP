// src/lib/data/jobOpenings.ts
import { faker } from '@faker-js/faker';
import { JobOpening, JobStatus, JobType, JobCategory } from '@/lib/types/jobOpenings';

const departments = [
  'Global Affairs Office',
  'Genesis',
  'Brand & Design',
  'Human Resources',
  'Vitalink',
  'Technology',
  'Operations',
];

const jobTitles: Record<JobCategory, string[]> = {
  Technology: [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'Mobile Developer',
    'DevOps Engineer',
    'Data Engineer',
    'QA Engineer',
    'Software Architect',
  ],
  Design: [
    'UX/UI Designer',
    'Graphic Designer',
    'Product Designer',
    'Brand Designer',
    'Motion Designer',
    'Illustrator',
  ],
  Marketing: [
    'Digital Marketing Specialist',
    'Content Creator',
    'Social Media Manager',
    'SEO Specialist',
    'Marketing Analyst',
  ],
  Operations: [
    'Operations Manager',
    'Project Coordinator',
    'Business Analyst',
    'Process Improvement Specialist',
  ],
  'Human Resources': [
    'HR Coordinator',
    'Recruiter',
    'Talent Acquisition Specialist',
    'HR Analyst',
  ],
  Finance: [
    'Financial Analyst',
    'Accountant',
    'Budget Coordinator',
  ],
  Legal: [
    'Legal Advisor',
    'Compliance Specialist',
  ],
  Other: [
    'Administrative Assistant',
    'Executive Assistant',
  ],
};

const technicalSkills = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'Java', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git',
  'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'HTML/CSS',
  'Agile', 'Scrum', 'JIRA', 'Excel', 'PowerPoint', 'Google Analytics',
];

const benefits = [
  'Trabajo 100% remoto',
  'Horario flexible',
  'Desarrollo profesional',
  'Mentoría personalizada',
  'Certificados de voluntariado',
  'Networking internacional',
  'Experiencia en proyectos reales',
  'Carta de recomendación',
  'Acceso a capacitaciones',
];

export const getMockJobOpenings = (count: number = 25): JobOpening[] => {
  return Array.from({ length: count }, (_, index) => {
    const category = faker.helpers.arrayElement(Object.keys(jobTitles) as JobCategory[]);
    const title = faker.helpers.arrayElement(jobTitles[category]);
    const status: JobStatus = index < 20 ? 'published' : faker.helpers.arrayElement(['draft', 'closed', 'filled']);
    const jobType = faker.helpers.arrayElement<JobType>(['Regular', 'CPT', 'OPT']);
    const startDate = faker.date.future({ years: 0.5 });
    const duration = faker.helpers.arrayElement(['3 months', '6 months', '9 months', '12 months']);

    return {
      id: faker.string.uuid(),
      title,
      department: faker.helpers.arrayElement(departments),
      team: faker.helpers.arrayElement(departments),
      description: `Únete a nuestro equipo como ${title} y contribuye a proyectos de impacto social. Buscamos personas apasionadas por la tecnología y el cambio social que quieran desarrollar sus habilidades mientras ayudan a comunidades en América Latina.`,
      responsibilities: [
        `Desarrollar y mantener ${category === 'Technology' ? 'aplicaciones web' : 'proyectos'} de alta calidad`,
        'Colaborar con equipos multidisciplinarios internacionales',
        'Participar en reuniones semanales de equipo',
        `Contribuir a la documentación ${category === 'Technology' ? 'técnica' : 'del proyecto'}`,
        'Proponer mejoras e innovaciones continuas',
      ],
      requirements: [
        `Experiencia ${faker.helpers.arrayElement(['básica', 'intermedia', 'avanzada'])} en ${category}`,
        'Disponibilidad de al menos 10-15 horas semanales',
        'Excelentes habilidades de comunicación',
        'Capacidad para trabajar de forma autónoma',
        'Compromiso con la misión de Living Stones',
      ],
      preferredQualifications: [
        'Experiencia previa en voluntariado',
        'Conocimientos en metodologías ágiles',
        'Portafolio de proyectos previos',
        'Certificaciones relevantes',
      ],
      location: 'Remoto',
      locationType: 'Remote',
      hoursPerWeek: faker.number.int({ min: 10, max: 20 }),
      duration,
      startDate,
      endDate: faker.date.future({ years: 1, refDate: startDate }),
      jobType,
      category,
      status,
      publishedDate: status === 'published' ? faker.date.recent() : null,
      closingDate: status === 'published' ? faker.date.future() : null,
      numberOfPositions: faker.number.int({ min: 1, max: 5 }),
      applicantsCount: status === 'published' ? faker.number.int({ min: 0, max: 50 }) : 0,
      createdBy: faker.person.fullName(),
      createdAt: faker.date.past({ years: 0.5 }),
      updatedAt: faker.date.recent(),
      salary: 'Voluntariado',
      benefits: faker.helpers.arrayElements(benefits, { min: 3, max: 6 }),
      skills: faker.helpers.arrayElements(technicalSkills, { min: 3, max: 8 }),
      experienceLevel: faker.helpers.arrayElement(['Entry Level', 'Intermediate', 'Advanced', 'Expert']),
      languageRequirements: ['Español', faker.helpers.arrayElement(['Inglés básico', 'Inglés intermedio', 'Inglés avanzado'])],
      timezone: faker.helpers.arrayElement([
        'America/New_York',
        'America/Los_Angeles',
        'America/Mexico_City',
        'America/Santiago',
        'America/Bogota',
      ]),
      contactEmail: 'recruitment@livingstones.org',
    };
  });
};

// Featured job openings for the public page
export const getFeaturedJobOpenings = (): JobOpening[] => {
  const allJobs = getMockJobOpenings(25);
  return allJobs
    .filter(job => job.status === 'published')
    .sort((a, b) => (b.publishedDate?.getTime() || 0) - (a.publishedDate?.getTime() || 0))
    .slice(0, 10);
};

// Search and filter job openings
export const searchJobOpenings = (
  jobs: JobOpening[],
  filters: {
    searchTerm?: string;
    category?: JobCategory;
    jobType?: JobType;
    experienceLevel?: string;
    location?: string;
  }
): JobOpening[] => {
  return jobs.filter(job => {
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.department.toLowerCase().includes(term) ||
        job.skills.some(skill => skill.toLowerCase().includes(term));

      if (!matchesSearch) return false;
    }

    if (filters.category && job.category !== filters.category) {
      return false;
    }

    if (filters.jobType && job.jobType !== filters.jobType) {
      return false;
    }

    if (filters.experienceLevel && job.experienceLevel !== filters.experienceLevel) {
      return false;
    }

    if (filters.location && job.location !== filters.location) {
      return false;
    }

    return true;
  });
};
