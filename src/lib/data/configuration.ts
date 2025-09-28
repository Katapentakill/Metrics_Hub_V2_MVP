// 📁 src/lib/data/configuration.ts
// Datos mock para configuración del sistema

import { ConfigurationSettings } from '@/lib/types/base';

// Configuración por defecto del sistema
export const defaultConfiguration: ConfigurationSettings = {
  theme: 'light',
  language: 'es',
  primaryColor: 'emerald',
  notifications: {
    email: true,
    push: true,
    sound: false,
    evaluationReminders: true,
    weeklyReports: true,
  },
  privacy: {
    profileVisibility: 'team',
    showOnlineStatus: true,
    allowDirectMessages: true,
  },
  display: {
    compactMode: false,
    showAvatars: true,
    animationsEnabled: true,
  }
};

// Configuraciones específicas por rol (opcional - para personalización futura)
export const roleSpecificConfigurations: Record<string, Partial<ConfigurationSettings>> = {
  admin: {
    notifications: {
      email: true,
      push: true,
      sound: true,
      evaluationReminders: true,
      weeklyReports: true,
    },
    privacy: {
      profileVisibility: 'public',
      showOnlineStatus: true,
      allowDirectMessages: true,
    }
  },
  hr: {
    notifications: {
      email: true,
      push: true,
      sound: false,
      evaluationReminders: true,
      weeklyReports: true,
    },
    privacy: {
      profileVisibility: 'team',
      showOnlineStatus: true,
      allowDirectMessages: true,
    }
  },
  lead: {
    notifications: {
      email: true,
      push: true,
      sound: false,
      evaluationReminders: true,
      weeklyReports: false,
    },
    privacy: {
      profileVisibility: 'team',
      showOnlineStatus: true,
      allowDirectMessages: true,
    }
  },
  volunteer: {
    notifications: {
      email: true,
      push: false,
      sound: false,
      evaluationReminders: true,
      weeklyReports: false,
    },
    privacy: {
      profileVisibility: 'private',
      showOnlineStatus: false,
      allowDirectMessages: false,
    }
  }
};

// Función para obtener configuración por rol
export function getConfigurationByRole(role: string): ConfigurationSettings {
  const baseConfig = { ...defaultConfiguration };
  const roleConfig = roleSpecificConfigurations[role] || {};
  
  return {
    ...baseConfig,
    ...roleConfig,
    notifications: {
      ...baseConfig.notifications,
      ...roleConfig.notifications
    },
    privacy: {
      ...baseConfig.privacy,
      ...roleConfig.privacy
    },
    display: {
      ...baseConfig.display,
      ...roleConfig.display
    }
  };
}

// Opciones de configuración para la UI
export const colorOptions = [
  { value: 'emerald', label: 'Esmeralda', color: 'bg-emerald-500' },
  { value: 'blue', label: 'Azul', color: 'bg-blue-500' },
  { value: 'purple', label: 'Púrpura', color: 'bg-purple-500' },
  { value: 'rose', label: 'Rosa', color: 'bg-rose-500' },
  { value: 'orange', label: 'Naranja', color: 'bg-orange-500' },
];

export const languageOptions = [
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'pt', label: 'Português', flag: '🇧🇷' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
];

export const themeOptions = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Oscuro' },
  { value: 'system', label: 'Sistema' }
];

export const profileVisibilityOptions = [
  { value: 'public', label: 'Público' },
  { value: 'team', label: 'Solo mi equipo' },
  { value: 'private', label: 'Privado' }
];
