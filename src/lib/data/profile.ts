// 📁 src/lib/data/profile.ts
// Datos mock para perfiles de usuario

import { ExtendedUserWithProfile, UserProject, ActivityItem, CVData } from '@/lib/types';
import { extendedMockUsers, mockUserProjects, mockUserActivities, mockCVData } from './users';

// Función para obtener datos de perfil por rol
export function getProfileDataByRole(role: string, session: any) {
  // Buscar el usuario actual en los datos simulados
  let foundUser = extendedMockUsers.find(u => u.id === session?.userId);
  
  // Si no encuentra el usuario, crear uno ficticio para demostración
  if (!foundUser) {
    const roleDefaults = getRoleDefaults(role, session);
    foundUser = roleDefaults;
  }

  return {
    user: foundUser,
    projects: mockUserProjects.filter(p => p.user_id === foundUser?.id),
    activities: mockUserActivities.filter(a => a.user_id === foundUser?.id),
    cvData: foundUser?.id ? mockCVData[foundUser.id] || null : null
  };
}

// Configuraciones por defecto para cada rol
function getRoleDefaults(role: string, session: any): ExtendedUserWithProfile {
  const baseDefaults = {
    id: session?.userId || '1',
    email: session?.email || 'demo@example.com',
    name: session?.name || 'Demo User',
    role: role as any,
    status: 'active' as const,
    email_verified: 1,
    created_at: '2024-01-15 10:30:00',
    last_login: '2024-08-03 22:15:00',
    password: '',
  };

  const roleSpecificDefaults = {
    admin: {
      ...baseDefaults,
      id: session?.userId || '1',
      email: session?.email || 'admin_1@example.com',
      name: session?.name || 'Admin Demo',
      profile: {
        id: '1',
        user_id: '1',
        first_name: 'Admin',
        last_name: 'Demo',
        phone: '+34-665-010-101',
        country: 'España',
        city: 'Madrid',
        timezone: 'GMT+1',
        hours_per_week: 20 as 10 | 20,
        preferred_hours: 'Flexible',
        bio: 'Administrador de sistemas con más de 8 años de experiencia en tecnología. Apasionado por el impacto social a través de la tecnología y la gestión de equipos.',
        birth_date: '1988-03-15',
        preferred_days: 'Lunes,Martes,Miércoles,Jueves,Viernes',
        linkedin: 'https://linkedin.com/in/admin-demo',
        github: 'https://github.com/admin-demo',
        portfolio: 'https://admindemo.dev',
        motivation: 'Quiero usar mis habilidades técnicas para generar un impacto positivo en comunidades necesitadas.',
        university: 'Universidad Politécnica de Madrid',
        program: 'Ingeniería en Sistemas',
        supervisor_name: 'Dr. María González',
        supervisor_email: 'maria.gonzalez@upm.es',
        skills: [
          { name: 'JavaScript', level: 'expert' as const, category: 'development' as const },
          { name: 'React', level: 'expert' as const, category: 'development' as const },
          { name: 'Node.js', level: 'advanced' as const, category: 'development' as const },
          { name: 'Project Management', level: 'expert' as const, category: 'management' as const },
          { name: 'Team Leadership', level: 'expert' as const, category: 'management' as const }
        ],
        languages: [
          { name: 'Español', level: 'Native' as const },
          { name: 'English', level: 'C2' as const },
          { name: 'Français', level: 'B2' as const }
        ],
        certifications: [
          'PMP - Project Management Professional',
          'AWS Solutions Architect',
          'Scrum Master Certified'
        ]
      }
    },
    hr: {
      ...baseDefaults,
      id: session?.userId || '2',
      email: session?.email || 'hr_1@example.com',
      name: session?.name || 'HR Demo',
      profile: {
        id: '2',
        user_id: '2',
        first_name: 'HR',
        last_name: 'Demo',
        phone: '+52-55-9876-5432',
        country: 'México',
        city: 'Ciudad de México',
        timezone: 'CST',
        hours_per_week: 10 as 10 | 20,
        preferred_hours: 'Mañanas',
        bio: 'Especialista en Recursos Humanos con 6 años de experiencia en reclutamiento y desarrollo de talento. Enfocada en crear experiencias positivas para voluntarios.',
        birth_date: '1990-11-08',
        preferred_days: 'Lunes,Martes,Miércoles,Jueves,Viernes',
        linkedin: 'https://linkedin.com/in/hr-demo',
        github: 'https://github.com/hr-demo',
        portfolio: 'https://hrdemo.com',
        motivation: 'Mi pasión es conectar talento con oportunidades de impacto social.',
        university: 'Universidad Nacional Autónoma de México',
        program: 'Psicología Organizacional',
        supervisor_name: 'Dra. Ana Martínez',
        supervisor_email: 'ana.martinez@unam.mx',
        skills: [
          { name: 'Recruitment', level: 'expert' as const, category: 'hr' as const },
          { name: 'Talent Development', level: 'advanced' as const, category: 'hr' as const },
          { name: 'Communication', level: 'expert' as const, category: 'communication' as const },
          { name: 'Team Building', level: 'advanced' as const, category: 'management' as const }
        ],
        languages: [
          { name: 'Español', level: 'Native' as const },
          { name: 'English', level: 'C1' as const }
        ],
        certifications: [
          'SHRM-CP - Society for Human Resource Management',
          'Certified Talent Acquisition Professional',
          'Diversity & Inclusion Specialist'
        ]
      }
    },
    lead: {
      ...baseDefaults,
      id: session?.userId || '3',
      email: session?.email || 'lead_1@example.com',
      name: session?.name || 'Lead Demo',
      profile: {
        id: '3',
        user_id: '3',
        first_name: 'Lead',
        last_name: 'Demo',
        phone: '+57-1-789-0123',
        country: 'Colombia',
        city: 'Bogotá',
        timezone: 'GMT-5',
        hours_per_week: 20 as 10 | 20,
        preferred_hours: 'Tardes',
        bio: 'Full-stack developer con 5 años liderando equipos de desarrollo. Especializado en arquitecturas escalables y metodologías ágiles.',
        birth_date: '1989-01-10',
        preferred_days: 'Lunes,Martes,Miércoles,Jueves,Viernes',
        linkedin: 'https://linkedin.com/in/lead-demo',
        github: 'https://github.com/lead-demo',
        portfolio: 'https://leaddemo.co',
        motivation: 'Busco liderar proyectos que generen impacto social positivo a través de la tecnología.',
        university: 'Universidad de los Andes',
        program: 'Ingeniería de Sistemas',
        supervisor_name: 'Dr. Carlos Rodríguez',
        supervisor_email: 'carlos.rodriguez@uniandes.edu.co',
        skills: [
          { name: 'JavaScript', level: 'expert' as const, category: 'development' as const },
          { name: 'React', level: 'advanced' as const, category: 'development' as const },
          { name: 'Python', level: 'advanced' as const, category: 'development' as const },
          { name: 'Project Management', level: 'expert' as const, category: 'management' as const },
          { name: 'Agile Methodologies', level: 'expert' as const, category: 'management' as const }
        ],
        languages: [
          { name: 'Español', level: 'Native' as const },
          { name: 'English', level: 'C1' as const },
          { name: 'Português', level: 'B1' as const }
        ],
        certifications: [
          'Certified Scrum Master',
          'AWS Developer Associate',
          'Google Project Management Certificate'
        ]
      }
    },
    volunteer: {
      ...baseDefaults,
      id: session?.userId || '4',
      email: session?.email || 'volunteer_1@example.com',
      name: session?.name || 'Voluntario Demo',
      profile: {
        id: '4',
        user_id: '4',
        first_name: 'Voluntario',
        last_name: 'Demo',
        phone: '+57-300-123-4567',
        country: 'Colombia',
        city: 'Bogotá',
        timezone: 'GMT-5',
        hours_per_week: 10 as 10 | 20,
        preferred_hours: 'Fines de semana',
        bio: 'Estudiante de ingeniería apasionado por el desarrollo web y el impacto social. Busco contribuir con mis habilidades técnicas a proyectos que generen cambio positivo.',
        birth_date: '2001-05-20',
        preferred_days: 'Sábado,Domingo',
        linkedin: 'https://linkedin.com/in/volunteer-demo',
        github: 'https://github.com/volunteer-demo',
        portfolio: 'https://volunteerdemo.dev',
        motivation: 'Quiero usar mis conocimientos en programación para ayudar a comunidades que lo necesiten.',
        university: 'Universidad Nacional de Colombia',
        program: 'Ingeniería de Sistemas',
        supervisor_name: 'Ing. Laura Sánchez',
        supervisor_email: 'laura.sanchez@unal.edu.co',
        skills: [
          { name: 'HTML/CSS', level: 'intermediate' as const, category: 'development' as const },
          { name: 'JavaScript', level: 'intermediate' as const, category: 'development' as const },
          { name: 'React', level: 'beginner' as const, category: 'development' as const },
          { name: 'Communication', level: 'advanced' as const, category: 'communication' as const }
        ],
        languages: [
          { name: 'Español', level: 'Native' as const },
          { name: 'English', level: 'B2' as const }
        ],
        certifications: [
          'Responsive Web Design - freeCodeCamp',
          'JavaScript Algorithms and Data Structures - freeCodeCamp'
        ]
      }
    }
  };

  return roleSpecificDefaults[role as keyof typeof roleSpecificDefaults] || roleSpecificDefaults.volunteer;
}

// Configuraciones específicas por rol para la UI
export const roleUIConfig = {
  admin: {
    icon: 'Crown',
    color: 'purple',
    title: 'Administrador',
    description: 'Control total del sistema'
  },
  hr: {
    icon: 'Users',
    color: 'blue',
    title: 'Recursos Humanos',
    description: 'Gestión de talento y reclutamiento'
  },
  lead: {
    icon: 'Target',
    color: 'emerald',
    title: 'Líder de Proyecto',
    description: 'Administración de proyectos y equipos'
  },
  volunteer: {
    icon: 'Heart',
    color: 'rose',
    title: 'Voluntario',
    description: 'Participación en proyectos sociales'
  }
};

// Campos editables por rol
export const editableFieldsByRole = {
  admin: ['name', 'email', 'phone', 'country', 'city', 'bio', 'linkedin', 'github', 'portfolio'],
  hr: ['name', 'email', 'phone', 'country', 'city', 'bio', 'linkedin', 'github', 'portfolio'],
  lead: ['name', 'email', 'phone', 'country', 'city', 'bio', 'linkedin', 'github', 'portfolio'],
  volunteer: ['name', 'email', 'phone', 'country', 'city', 'bio', 'linkedin', 'github', 'portfolio', 'website']
};
