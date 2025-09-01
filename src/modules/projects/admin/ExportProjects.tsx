// src/features/admin/projects/ExportProjects.tsx
'use client';

import { Download } from 'lucide-react';
import { ProjectView } from '@/lib/map/projects/projectView';

export default function ExportProjects({ views }: { views: ProjectView[] }) {
  const toCSV = () => {
    const headers = [
      'id','name','status','lead_name','lead_email','country','city',
      'max_team_size','current_team_size','progress_pct','deadline','created_at'
    ];
    const rows = views.map(({ project, lead, country, city, progressPct }) => [
      project.id,
      project.name.replace(/,/g, ' '),
      project.status,
      lead?.name?.replace(/,/g, ' ') || '',
      lead?.email || '',
      country || '',
      city || '',
      project.max_team_size,
      project.current_team_size,
      progressPct,
      project.deadline || '',
      project.created_at,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects_export_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={toCSV} className="btn-living flex items-center space-x-2">
      <Download className="w-4 h-4" />
      <span>Exportar Proyectos</span>
    </button>
  );
}
