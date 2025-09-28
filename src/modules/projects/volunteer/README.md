# Módulo de Proyectos para Voluntarios

## Descripción
Este módulo proporciona una experiencia completa para los voluntarios en la gestión de proyectos, incluyendo componentes expandidos que antes solo estaban disponibles para leads.

## Estructura de Archivos

### Componentes Principales
- `VolunteerProjectsDashboard.tsx` - Dashboard principal con múltiples pestañas
- `VolunteerProjectsGridView.tsx` - Vista de cuadrícula de proyectos
- `EnhancedProjectCard.tsx` - Tarjeta mejorada de proyecto

### Gestión de Archivos
- `files/ProjectFilesManager.tsx` - Gestor de archivos y enlaces del proyecto
- `files/modals/` - Modales para gestión de archivos (pendiente de implementar)

### Modales
- `modals/ProjectDetailModal.tsx` - Modal de detalles del proyecto

### Tablero Kanban
- `trello/ProjectKanbanBoard.tsx` - Tablero Kanban para gestión de tareas
- `trello/TaskCard.tsx` - Tarjeta individual de tarea

### Filtros y Exportación
- `AdvancedProjectFilters.tsx` - Filtros avanzados para proyectos
- `ExportProjects.tsx` - Exportación de proyectos a PDF/Excel

## Funcionalidades Implementadas

### Dashboard Expandido
El dashboard ahora incluye 7 pestañas:
1. **Resumen** - Métricas y estadísticas generales
2. **Rendimiento** - Análisis de rendimiento personal
3. **Equipos** - Información de equipos de trabajo
4. **Cronograma** - Fechas importantes y deadlines
5. **Archivos** - Gestión de archivos y enlaces del proyecto
6. **Tareas** - Tablero Kanban para gestión de tareas
7. **Exportar** - Exportación de reportes

### Gestión de Archivos
- Visualización de archivos del proyecto
- Enlaces externos (Drive, WhatsApp, GitHub, etc.)
- Categorización por tipo (documentos, multimedia, legal)
- Búsqueda y filtrado

### Tablero Kanban
- 4 columnas: Por Hacer, En Progreso, En Revisión, Completado
- Drag & drop para mover tareas
- Información detallada de cada tarea
- Progreso visual

### Filtros Avanzados
- Búsqueda por texto
- Filtros por estado y prioridad
- Rango de fechas
- Tamaño del equipo
- Progreso del proyecto

### Exportación
- Exportación a PDF con gráficos
- Exportación a Excel para análisis
- Vista previa de datos

## Usuario Mock Configurado

Se ha configurado el usuario voluntario (ID: '4') para que esté asociado al proyecto "Centro Comunitario Santiago" (ID: 'p1') como miembro del equipo.

### Credenciales de Prueba
- **Email**: volunteer_1@example.com
- **Contraseña**: password123
- **Proyecto Asociado**: Centro Comunitario Santiago

## Diferencias con la Vista de Leads

### Limitaciones para Voluntarios
- Solo pueden ver proyectos donde son miembros
- No pueden crear o editar proyectos
- Acceso de solo lectura a la mayoría de funcionalidades
- Vista limitada de información sensible

### Funcionalidades Disponibles
- Visualización completa de archivos del proyecto
- Participación en el tablero Kanban
- Exportación de reportes personales
- Filtrado y búsqueda avanzada
- Acceso a cronogramas y deadlines

## Próximos Pasos

1. **Implementar modales de archivos** - Completar la funcionalidad de gestión de archivos
2. **Integrar tareas reales** - Conectar el Kanban con datos reales de tareas
3. **Notificaciones** - Sistema de notificaciones para voluntarios
4. **Chat del equipo** - Comunicación en tiempo real
5. **Reportes avanzados** - Métricas más detalladas

## Uso

```tsx
import VolunteerProjectsDashboard from '@/modules/projects/volunteer/VolunteerProjectsDashboard';

// En tu componente
<VolunteerProjectsDashboard 
  projects={projectViews}
  timeframe="30d"
/>
```

## Notas Técnicas

- Todos los componentes están optimizados para la experiencia de voluntarios
- Se mantiene la consistencia visual con el resto de la aplicación
- Los componentes son reutilizables y modulares
- Se incluye manejo de estados de carga y errores
