// 📁 src/app/lead/profile/page.tsx
// Página de perfil para líderes de proyecto

import ProfilePage from '@/modules/profile/ProfilePage';

export default function LeadProfilePage() {
  return <ProfilePage allowedRoles={['lead']} />;
}
