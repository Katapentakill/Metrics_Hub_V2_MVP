// src/features/admin/ExportUsers.tsx
'use client';

import { useState } from 'react';
import { Download, FileText, Table, Users, ChevronDown } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  email_verified: number;
  created_at: string;
  last_login?: string;
  profile?: {
    first_name: string;
    last_name: string;
    phone?: string;
    country: string;
    city: string;
    timezone: string;
    hours_per_week: number;
    preferred_hours: string;
    bio?: string;
  };
}

interface ExportUsersProps {
  users: UserData[];
}

export default function ExportUsers({ users }: ExportUsersProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = async () => {
    setIsExporting(true);
    
    try {
      // Preparar datos para CSV
      const csvData = users.map(user => ({
        'ID': user.id,
        'Nombre': user.name,
        'Email': user.email,
        'Rol': user.role,
        'Estado': user.status,
        'País': user.profile?.country || '',
        'Ciudad': user.profile?.city || '',
        'Teléfono': user.profile?.phone || '',
        'Zona Horaria': user.profile?.timezone || '',
        'Horas por Semana': user.profile?.hours_per_week || '',
        'Horario Preferido': user.profile?.preferred_hours || '',
        'Fecha Registro': user.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : '',
        'Último Login': user.last_login ? new Date(user.last_login).toLocaleDateString('es-ES') : 'Nunca',
        'Email Verificado': user.email_verified ? 'Sí' : 'No'
      }));

      // Crear CSV
      const headers = Object.keys(csvData[0] || {});
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            // Escapar comillas y agregar comillas si contiene comas
            return typeof value === 'string' && value.includes(',') 
              ? `"${value.replace(/"/g, '""')}"` 
              : value;
          }).join(',')
        )
      ].join('\n');

      // Descargar archivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `usuarios_living_stones_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShowOptions(false);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Error al exportar CSV. Intenta nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    setIsExporting(true);
    
    try {
      // Preparar datos para JSON (más completo)
      const jsonData = {
        exported_at: new Date().toISOString(),
        total_users: users.length,
        users: users.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          email_verified: user.email_verified,
          created_at: user.created_at,
          last_login: user.last_login,
          profile: user.profile ? {
            first_name: user.profile.first_name,
            last_name: user.profile.last_name,
            phone: user.profile.phone,
            country: user.profile.country,
            city: user.profile.city,
            timezone: user.profile.timezone,
            hours_per_week: user.profile.hours_per_week,
            preferred_hours: user.profile.preferred_hours,
            bio: user.profile.bio
          } : null
        }))
      };

      // Descargar archivo JSON
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `usuarios_living_stones_${new Date().toISOString().split('T')[0]}.json`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShowOptions(false);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Error al exportar JSON. Intenta nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportSummaryReport = async () => {
    setIsExporting(true);
    
    try {
      // Generar reporte resumen
      const roleStats = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const statusStats = users.reduce((acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const countryStats = users.reduce((acc, user) => {
        const country = user.profile?.country || 'Sin especificar';
        acc[country] = (acc[country] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const report = `REPORTE DE USUARIOS - LIVING STONES
Generado: ${new Date().toLocaleString('es-ES')}
========================================

RESUMEN GENERAL:
- Total de usuarios: ${users.length}
- Usuarios activos: ${statusStats.active || 0}
- Usuarios inactivos: ${statusStats.inactive || 0}
- Usuarios suspendidos: ${statusStats.suspended || 0}

DISTRIBUCIÓN POR ROL:
- Administradores: ${roleStats.admin || 0}
- Recursos Humanos: ${roleStats.hr || 0}
- Líderes de Proyecto: ${roleStats.lead_project || 0}
- Voluntarios: ${roleStats.volunteer || 0}
- Sin asignar: ${roleStats.unassigned || 0}

DISTRIBUCIÓN POR PAÍS:
${Object.entries(countryStats)
  .sort(([,a], [,b]) => (b as number) - (a as number))
  .map(([country, count]) => `- ${country}: ${count}`)
  .join('\n')}

USUARIOS RECIENTES (Últimos 10):
${users
  .sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime())
  .slice(0, 10)
  .map(user => `- ${user.name} (${user.email}) - ${new Date(user.created_at || '').toLocaleDateString('es-ES')}`)
  .join('\n')}

USUARIOS SIN LOGIN RECIENTE:
${users
  .filter(user => !user.last_login || 
    new Date().getTime() - new Date(user.last_login).getTime() > 30 * 24 * 60 * 60 * 1000)
  .slice(0, 10)
  .map(user => `- ${user.name} (${user.email}) - ${user.last_login ? 'Último login: ' + new Date(user.last_login).toLocaleDateString('es-ES') : 'Nunca'}`)
  .join('\n')}
`;

      // Descargar reporte
      const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `reporte_usuarios_${new Date().toISOString().split('T')[0]}.txt`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShowOptions(false);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error al generar reporte. Intenta nuevamente.');
    } finally {
      setIsExporting(false);
    }
  };

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="btn-living-outline flex items-center space-x-2"
        disabled={isExporting}
      >
        {isExporting ? (
          <>
            <div className="spinner w-4 h-4"></div>
            <span>Exportando...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Exportar</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>

      {showOptions && (
        <div className="absolute right-0 top-12 w-64 card p-3 z-50 animate-slide-down">
          <div className="space-y-2">
            <div className="px-2 py-1 text-xs font-semibold text-slate-600 border-b border-slate-200 pb-2 mb-2">
              Exportar {users.length} usuario{users.length !== 1 ? 's' : ''}
            </div>
            
            <button
              onClick={exportToCSV}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={isExporting}
            >
              <Table className="w-4 h-4 text-green-600" />
              <div className="text-left">
                <p className="font-medium">Archivo CSV</p>
                <p className="text-xs text-slate-500">Para Excel o Google Sheets</p>
              </div>
            </button>

            <button
              onClick={exportToJSON}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={isExporting}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <div className="text-left">
                <p className="font-medium">Archivo JSON</p>
                <p className="text-xs text-slate-500">Datos completos estructurados</p>
              </div>
            </button>

            <button
              onClick={exportSummaryReport}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              disabled={isExporting}
            >
              <Users className="w-4 h-4 text-purple-600" />
              <div className="text-left">
                <p className="font-medium">Reporte Resumen</p>
                <p className="text-xs text-slate-500">Estadísticas y análisis</p>
              </div>
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Los archivos se descargarán automáticamente
            </p>
          </div>
        </div>
      )}

      {/* Overlay para cerrar el menú */}
      {showOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
}