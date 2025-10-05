// 📁 src/components/configuration/ConfigurationPage.tsx
// Componente compartido para configuración del sistema

"use client";

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Palette,
  Globe,
  Bell,
  Shield,
  Monitor,
  Sun,
  Moon,
  Volume2,
  Mail,
  Smartphone,
  Save,
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { ConfigurationSettings } from '@/lib/types/base';
import { 
  getConfigurationByRole, 
  colorOptions, 
  languageOptions,
  defaultConfiguration 
} from '@/lib/data/configuration';
import { getCurrentUserRole } from '@/lib/auth';

export default function ConfigurationPage() {
  const [settings, setSettings] = useState<ConfigurationSettings>(defaultConfiguration);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Cargar configuración basada en el rol del usuario
  useEffect(() => {
    const userRole = getCurrentUserRole();
    if (userRole) {
      const roleConfig = getConfigurationByRole(userRole);
      setSettings(roleConfig);
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    const userRole = getCurrentUserRole();
    if (userRole) {
      const roleConfig = getConfigurationByRole(userRole);
      setSettings(roleConfig);
    } else {
      setSettings(defaultConfiguration);
    }
  };

  const updateSettings = (section: keyof ConfigurationSettings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' ? {
        ...prev[section],
        [key]: value
      } : value
    }));
  };

  const themeOptions = [
    { value: 'light', label: 'Claro', icon: Sun }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          </div>
          <p className="text-gray-600">Personaliza tu experiencia en la plataforma</p>
        </div>

        {/* Mensaje de guardado */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Configuración guardada exitosamente</span>
          </div>
        )}

        <div className="space-y-8">
          {/* Apariencia */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Apariencia</h2>
            </div>

            <div className="space-y-6">
              {/* Tema */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Tema</label>
                <div className="grid grid-cols-3 gap-3">
                  {themeOptions.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings('theme', '', value)}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-all ${
                        settings.theme === value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${settings.theme === value ? 'text-emerald-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${settings.theme === value ? 'text-emerald-700' : 'text-gray-700'}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Color principal</label>
                <div className="flex space-x-3">
                  {colorOptions.map(({ value, label, color }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings('primaryColor', '', value)}
                      className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center transition-all ${
                        settings.primaryColor === value
                          ? 'ring-4 ring-gray-300 scale-110'
                          : 'hover:scale-105'
                      }`}
                      title={label}
                    >
                      {settings.primaryColor === value && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Idioma */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Idioma y región</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Idioma de la interfaz</label>
              <div className="grid grid-cols-2 gap-3">
                {languageOptions.map(({ value, label, flag }) => (
                  <button
                    key={value}
                    onClick={() => updateSettings('language', '', value)}
                    className={`p-4 border-2 rounded-lg flex items-center space-x-3 transition-all ${
                      settings.language === value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{flag}</span>
                    <span className={`font-medium ${settings.language === value ? 'text-emerald-700' : 'text-gray-700'}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'email', label: 'Notificaciones por email', icon: Mail },
                { key: 'push', label: 'Notificaciones push', icon: Smartphone },
                { key: 'sound', label: 'Sonidos de notificación', icon: Volume2 },
                { key: 'evaluationReminders', label: 'Recordatorios de evaluaciones', icon: Bell },
                { key: 'weeklyReports', label: 'Reportes semanales', icon: Mail },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">{label}</span>
                  </div>
                  <button
                    onClick={() => updateSettings('notifications', key, !settings.notifications[key as keyof typeof settings.notifications])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications[key as keyof typeof settings.notifications]
                        ? 'bg-emerald-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications[key as keyof typeof settings.notifications]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacidad */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Privacidad</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Visibilidad del perfil</label>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => updateSettings('privacy', 'profileVisibility', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="public">Público</option>
                  <option value="team">Solo mi equipo</option>
                  <option value="private">Privado</option>
                </select>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'showOnlineStatus', label: 'Mostrar estado en línea' },
                  { key: 'allowDirectMessages', label: 'Permitir mensajes directos' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between py-3">
                    <span className="text-gray-700">{label}</span>
                    <button
                      onClick={() => updateSettings('privacy', key, !settings.privacy[key as keyof typeof settings.privacy])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.privacy[key as keyof typeof settings.privacy]
                          ? 'bg-emerald-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.privacy[key as keyof typeof settings.privacy]
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pantalla */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Monitor className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Pantalla</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'compactMode', label: 'Modo compacto' },
                { key: 'showAvatars', label: 'Mostrar avatares' },
                { key: 'animationsEnabled', label: 'Animaciones habilitadas' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-3">
                  <span className="text-gray-700">{label}</span>
                  <button
                    onClick={() => updateSettings('display', key, !settings.display[key as keyof typeof settings.display])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.display[key as keyof typeof settings.display]
                        ? 'bg-emerald-600'
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.display[key as keyof typeof settings.display]
                          ? 'translate-x-6'
                          : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-8 flex items-center justify-between bg-white border border-gray-200 rounded-xl p-6">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restablecer</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
