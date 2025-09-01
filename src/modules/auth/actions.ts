'use server';

import { User } from '@/lib/types';

const staticUsers: User[] = [
  {
    id: '1',
    email: 'admin_1@example.com',
    password: 'password123',
    name: 'Admin Uno',
    role: 'admin',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'hr_1@example.com',
    password: 'password123',
    name: 'HR Uno',
    role: 'hr',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'lead_1@example.com',
    password: 'password123',
    name: 'Líder Uno',
    role: 'lead_project',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  },
  {
    id: '4',
    email: 'volunteer_1@example.com',
    password: 'password123',
    name: 'Voluntario Uno',
    role: 'volunteer',
    status: 'active',
    avatar: '',
    email_verified: 1,
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  },
];

export interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
  redirectPath?: string;
}

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email y contraseña son requeridos' };
  }

  const user = staticUsers.find(
    (u) => u.email === email && u.password === password && u.status === 'active'
  );

  if (!user) {
    return { success: false, error: 'Credenciales inválidas' };
  }

  const redirectPaths = {
    admin: '/admin/dashboard',
    hr: '/hr/dashboard',
    lead_project: '/lead_project/projects',
    volunteer: '/volunteer/profile',
    unassigned: '/volunteer/profile',
  };

  return {
    success: true,
    user,
    redirectPath: redirectPaths[user.role],
  };
}
