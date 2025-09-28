// 📁 src/app/volunteer/profile/page.tsx
// Página de perfil para voluntarios

import ProfilePage from '@/modules/profile/ProfilePage';

export default function VolunteerProfilePage() {
  return <ProfilePage allowedRoles={['volunteer', 'unassigned']} />;
}
