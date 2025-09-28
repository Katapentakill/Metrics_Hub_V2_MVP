// 📁 src/app/admin/profile/page.tsx
// Página de perfil para administradores

import ProfilePage from '@/modules/profile/ProfilePage';

export default function AdminProfilePage() {
  return <ProfilePage allowedRoles={['admin']} />;
}
