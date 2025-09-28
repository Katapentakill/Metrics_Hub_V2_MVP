// src/app/admin/recruitment/users-permissions/page.tsx
// src/app/admin/recruitment/users-permissions/page.tsx
import Link from 'next/link';
import { Users, UserPlus, Shield, ClipboardList } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const usersPermissionsSections = [
  {
    title: 'Gestión de Usuarios',
    description: 'Crea, edita o desactiva las cuentas de usuario de todo el equipo que utiliza el módulo de reclutamiento.',
    href: '/admin/recruitment/users-permissions/manage-users',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Roles y Permisos',
    description: 'Define y asigna roles específicos (ej. Reclutador, Gerente de Contratación) para controlar el acceso y las funciones de cada usuario.',
    href: '/admin/recruitment/users-permissions/roles',
    icon: Shield,
    color: 'text-purple-600',
  },
  {
    title: 'Registro de Actividad',
    description: 'Supervisa las acciones de los usuarios en el sistema para fines de auditoría y para garantizar el cumplimiento.',
    href: '/admin/recruitment/users-permissions/activity-log',
    icon: ClipboardList,
    color: 'text-orange-600',
  },
];

export default function AdminUsersPermissionsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usuarios y Permisos (Admin)</h1>
        <Button asChild>
          <Link href="/admin/recruitment/users-permissions/new-user">
            <UserPlus className="mr-2 h-4 w-4" />
            Crear Nuevo Usuario
          </Link>
        </Button>
      </div>
      <p className="text-gray-600 mb-10">
        Controla quién tiene acceso al sistema y qué funciones puede realizar. Desde aquí, puedes gestionar usuarios, roles y permisos para toda la organización.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usersPermissionsSections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`flex items-center gap-3 ${section.color}`}>
                  <section.icon className="w-6 h-6" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}