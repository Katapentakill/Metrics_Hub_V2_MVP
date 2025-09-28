// 📁 src/app/hr/profile/page.tsx
// Página de perfil para recursos humanos

import ProfilePage from '@/modules/profile/ProfilePage';

export default function HrProfilePage() {
  return <ProfilePage allowedRoles={['hr']} />;
}
