// src/lib/data/mockVolunteerData.ts
export interface VolunteerRecord {
  name: string;
  action: string;
  actionTaken: string;
  attitudeEngagement: string;
  cv: string;
  certificate: string;
  duration: number | null;
  endDate: string;
  livingStonesEmail: string;
  personalEmail: string;
  role: string;
  startDate: string;
  status: string;
  supervisor: string;
  supervisorEmail: string;
  team: string;
  technicalSkills: string;
  timezone: string;
  volunteerType: string;
  weeksLeft: number | null;
  hrsPerWeek: number | null;
}

// Helper arrays for realistic data generation
const names = [
  "Ana García", "Carlos Mendoza", "María Rodríguez", "Juan Pérez", "Laura Martínez",
  "Diego Silva", "Sofia López", "Miguel Torres", "Valentina Cruz", "Daniel Ramírez",
  "Camila Flores", "Andrés Castro", "Isabella Morales", "Lucas Vargas", "Martina Reyes",
  "Santiago Herrera", "Lucía Ortiz", "Mateo Díaz", "Emma Ruiz", "Sebastián Gómez",
  "Catalina Núñez", "Rafael Jiménez", "Victoria Soto", "Gabriel Moreno", "Emilia Guzmán",
  "Nicolás Vega", "Renata Campos", "Felipe Rojas", "Julieta Ríos", "Joaquín Medina",
  "Amanda Silva", "Bruno Fernández", "Carolina Vásquez", "Eduardo Navarro", "Fernanda Paredes",
  "Gustavo Aguilar", "Helena Molina", "Ignacio Paz", "Jimena Cortés", "Kevin Bravo",
  "Lorena Muñoz", "Manuel Delgado", "Natalia Sánchez", "Oscar Peña", "Paola Romero",
  "Ricardo Cárdenas", "Silvana Guerrero", "Tomás Espinoza", "Úrsula León", "Vicente Ramos",
  "Ximena Ponce", "Yolanda Castro", "Zacarías Fuentes", "Adriana Maldonado", "Bernardo Gil",
  "Cecilia Márquez", "Damián Vera", "Elena Figueroa", "Fabián Contreras", "Gabriela Acosta",
  "Héctor Salazar", "Irene Valdez", "Javier Mendez", "Karen Ochoa", "Leonardo Arias",
  "Mónica Lara", "Néstor Zamora", "Olivia Parra", "Pablo Duarte", "Quiana Serrano",
  "Rodrigo Cabrera", "Susana Estrada", "Tadeo Gallardo", "Ulises Sandoval", "Verónica Ibarra",
  "Walter Carrillo", "Yesenia Montoya", "Zoe Valenzuela"
];

const roles = [
  "Software Developer", "Project Manager", "Content Writer", "Graphic Designer",
  "Marketing Specialist", "Data Analyst", "Community Manager", "HR Coordinator",
  "Fundraising Specialist", "Event Coordinator", "Social Media Manager", "Video Editor",
  "UX/UI Designer", "Translator", "Researcher", "Teaching Assistant"
];

const teams = [
  "Technology", "Marketing", "Communications", "HR & Recruitment", "Fundraising",
  "Events", "Education", "Design", "Content Creation", "Community Outreach",
  "Data & Analytics", "Operations", "Social Media"
];

const supervisors = [
  { name: "Ana García", email: "ana.garcia@livingstones.org" },
  { name: "Carlos Mendoza", email: "carlos.mendoza@livingstones.org" },
  { name: "María Rodríguez", email: "maria.rodriguez@livingstones.org" },
  { name: "Juan Pérez", email: "juan.perez@livingstones.org" },
  { name: "Laura Martínez", email: "laura.martinez@livingstones.org" }
];

const statuses = ["Active", "Inactive", "On Hold", "Completed", "Pending"];

const actions = [
  "Continue", "Review Performance", "Extend Contract", "Close", "Follow Up",
  "Evaluate", "Schedule Meeting", "Provide Feedback", "None"
];

const actionsTaken = [
  "Completed", "In Progress", "Pending", "Scheduled", "Not Started", "N/A"
];

const attitudeEngagement = [
  "Excellent", "Very Good", "Good", "Satisfactory", "Needs Improvement", "Outstanding"
];

const technicalSkillsList = [
  "JavaScript, React, Node.js", "Python, Django, SQL", "Adobe Suite, Figma, Sketch",
  "Excel, PowerPoint, Data Analysis", "Content Writing, SEO, WordPress",
  "Social Media Marketing, Analytics", "Video Editing, Premiere Pro, After Effects",
  "Project Management, Agile, Scrum", "HTML, CSS, JavaScript", "Fundraising, Grant Writing",
  "Event Planning, Logistics", "Translation, Proofreading", "Research, Documentation",
  "Customer Service, CRM", "Teaching, Curriculum Development"
];

const timezones = [
  "America/New_York", "America/Los_Angeles", "America/Chicago", "America/Denver",
  "America/Mexico_City", "America/Bogota", "America/Lima", "America/Santiago",
  "America/Buenos_Aires", "America/Sao_Paulo", "Europe/London", "Europe/Madrid",
  "Asia/Tokyo", "Australia/Sydney"
];

const volunteerTypes = ["Remote", "Hybrid", "On-site"];

// Generate mock data
export const mockVolunteers: VolunteerRecord[] = Array.from({ length: 78 }, (_, i) => {
  const firstName = names[i % names.length].split(' ')[0].toLowerCase();
  const lastName = names[i % names.length].split(' ')[1].toLowerCase();
  const isActive = Math.random() > 0.3;
  const hasEndDate = Math.random() > 0.5;
  const startYear = 2023 + Math.floor(Math.random() * 2);
  const startMonth = Math.floor(Math.random() * 12) + 1;
  const startDay = Math.floor(Math.random() * 28) + 1;
  const durationWeeks = isActive ? Math.floor(Math.random() * 52) + 4 : Math.floor(Math.random() * 40) + 8;
  
  const startDate = `${startYear}-${startMonth.toString().padStart(2, '0')}-${startDay.toString().padStart(2, '0')}`;
  
  let endDate = "";
  if (hasEndDate || !isActive) {
    const endDateObj = new Date(startDate);
    endDateObj.setDate(endDateObj.getDate() + (durationWeeks * 7));
    endDate = endDateObj.toISOString().split('T')[0];
  }

  const weeksLeft = isActive && hasEndDate 
    ? Math.max(0, Math.floor(Math.random() * 20)) 
    : null;

  const hrsPerWeek = isActive ? [5, 10, 15, 20, 25, 30, 40][Math.floor(Math.random() * 7)] : null;

  return {
    name: names[i % names.length],
    action: isActive ? actions[Math.floor(Math.random() * actions.length)] : "Close",
    actionTaken: actionsTaken[Math.floor(Math.random() * actionsTaken.length)],
    attitudeEngagement: isActive 
      ? attitudeEngagement[Math.floor(Math.random() * attitudeEngagement.length)] 
      : "N/A",
    cv: Math.random() > 0.2 ? "Yes" : "No",
    certificate: Math.random() > 0.5 ? "Yes" : "No",
    duration: durationWeeks,
    endDate,
    livingStonesEmail: `${firstName}.${lastName}@livingstones.org`,
    personalEmail: `${firstName}.${lastName}${Math.floor(Math.random() * 999)}@gmail.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    startDate,
    status: isActive 
      ? statuses[Math.floor(Math.random() * 2)] 
      : statuses[Math.floor(Math.random() * statuses.length)],
    supervisor: supervisors[Math.floor(Math.random() * supervisors.length)].name,
    supervisorEmail: supervisors[Math.floor(Math.random() * supervisors.length)].email,
    team: teams[Math.floor(Math.random() * teams.length)],
    technicalSkills: technicalSkillsList[Math.floor(Math.random() * technicalSkillsList.length)],
    timezone: timezones[Math.floor(Math.random() * timezones.length)],
    volunteerType: volunteerTypes[Math.floor(Math.random() * volunteerTypes.length)],
    weeksLeft,
    hrsPerWeek
  };
});

// Export helper functions for filtering and searching
export const getActiveVolunteers = () => 
  mockVolunteers.filter(v => v.status === "Active");

export const getVolunteersByTeam = (team: string) => 
  mockVolunteers.filter(v => v.team === team);

export const getVolunteersBySupervisor = (supervisorEmail: string) => 
  mockVolunteers.filter(v => v.supervisorEmail === supervisorEmail);

export const getVolunteersWithCV = () => 
  mockVolunteers.filter(v => v.cv === "Yes");

export const getVolunteersWithCertificate = () => 
  mockVolunteers.filter(v => v.certificate === "Yes");

// Export statistics
export const volunteerStats = {
  total: mockVolunteers.length,
  active: mockVolunteers.filter(v => v.status === "Active").length,
  inactive: mockVolunteers.filter(v => v.status === "Inactive").length,
  withCV: mockVolunteers.filter(v => v.cv === "Yes").length,
  withCertificate: mockVolunteers.filter(v => v.certificate === "Yes").length,
  teams: [...new Set(mockVolunteers.map(v => v.team))],
  roles: [...new Set(mockVolunteers.map(v => v.role))],
  averageHoursPerWeek: mockVolunteers
    .filter(v => v.hrsPerWeek !== null)
    .reduce((acc, v) => acc + (v.hrsPerWeek || 0), 0) / 
    mockVolunteers.filter(v => v.hrsPerWeek !== null).length
};

// Export default
export default mockVolunteers;