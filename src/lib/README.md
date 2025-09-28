# 📁 Estructura de Tipos y Datos Mock

Esta carpeta contiene la estructura organizada de tipos TypeScript y datos mock para el proyecto Metrics Hub.

## 🏗️ Estructura de Tipos (`/types`)

### Archivos Principales

- **`index.ts`** - Archivo principal que exporta todos los tipos
- **`base.ts`** - Tipos fundamentales del sistema (User, UserProfile, Skill, etc.)
- **`users.ts`** - Tipos relacionados con usuarios y gestión de personal
- **`projects.ts`** - Tipos para proyectos, tareas y equipos
- **`evaluations.ts`** - Tipos para el sistema de evaluaciones
- **`communications.ts`** - Tipos para comunicaciones y notificaciones
- **`dashboard.ts`** - Tipos para dashboards y métricas
- **`files.ts`** - Tipos para gestión de archivos y documentos
- **`notifications.ts`** - Tipos para notificaciones y alertas
- **`combined.ts`** - Tipos combinados y utilitarios

### Ventajas de la Nueva Estructura

✅ **Organización por dominio** - Cada archivo se enfoca en un área específica
✅ **Reutilización** - Los tipos se pueden importar selectivamente
✅ **Mantenibilidad** - Fácil encontrar y actualizar tipos específicos
✅ **Escalabilidad** - Fácil agregar nuevos tipos sin afectar otros dominios

## 📊 Estructura de Datos Mock (`/data`)

### Archivos Principales

- **`index.ts`** - Archivo principal que exporta todos los datos mock
- **`users.ts`** - Datos mock para usuarios, aplicaciones y entrevistas
- **`projects.ts`** - Datos mock para proyectos, tareas y equipos
- **`evaluations.ts`** - Datos mock para evaluaciones (mantiene archivo existente)
- **`communications.ts`** - Datos mock para comunicaciones y notificaciones
- **`dashboard.ts`** - Datos mock para dashboards y métricas
- **`files.ts`** - Datos mock para archivos y documentos
- **`projectFiles.ts`** - Datos mock específicos para archivos de proyecto

### Ventajas de los Nuevos Mocks

✅ **Centralizados** - Todos los datos mock en un lugar organizado
✅ **Tipados** - Todos los mocks están tipados correctamente
✅ **Reutilizables** - Se pueden usar en múltiples componentes
✅ **Mantenibles** - Fácil actualizar datos sin tocar componentes

## 🔄 Migración de Componentes

### Antes (Datos Hardcodeados)
```tsx
// ❌ Datos hardcodeados en el componente
const [mockFiles, setMockFiles] = useState<ProjectFile[]>([
  {
    id: '1',
    name: 'Documento.pdf',
    // ... más datos hardcodeados
  }
]);
```

### Después (Datos Centralizados)
```tsx
// ✅ Importar datos mock organizados
import { mockProjectFiles, getProjectFiles } from '@/lib/data';

// Usar datos mock organizados
const projectFiles = useMemo(() => getProjectFiles(projectId), [projectId]);
```

## 📋 Lista de Componentes a Actualizar

### Componentes con Datos Hardcodeados Identificados:

1. **ProjectFilesManager** (admin/hr/lead/volunteer)
   - ✅ Creado: `ProjectFilesManagerUpdated.tsx`
   - 📝 Estado: Listo para reemplazar

2. **CommunicationsDashboard** (admin/hr/lead/volunteer)
   - 📝 Estado: Pendiente de actualización

3. **RecentHires** (dashboard/hr)
   - 📝 Estado: Pendiente de actualización

4. **ApplicationsPending** (dashboard/hr)
   - 📝 Estado: Pendiente de actualización

5. **DashboardStats** (dashboard/admin)
   - 📝 Estado: Pendiente de actualización

6. **RecentActivity** (dashboard/admin)
   - 📝 Estado: Pendiente de actualización

## 🚀 Cómo Usar la Nueva Estructura

### 1. Importar Tipos
```tsx
// Importar tipos específicos
import { ProjectFile, ExternalResource } from '@/lib/types';

// O importar desde un dominio específico
import { ProjectFile } from '@/lib/types/projects';
import { Communication } from '@/lib/types/communications';
```

### 2. Importar Datos Mock
```tsx
// Importar datos mock específicos
import { mockProjectFiles, getProjectFiles } from '@/lib/data';

// O importar desde un archivo específico
import { mockCommunications } from '@/lib/data/communications';
```

### 3. Usar en Componentes
```tsx
// Usar datos mock organizados
const projectFiles = useMemo(() => getProjectFiles(projectId), [projectId]);

// Filtrar y procesar datos
const filteredFiles = useMemo(() => {
  return projectFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [projectFiles, searchTerm]);
```

## 🔧 Funciones Utilitarias

### Para Archivos de Proyecto
- `getProjectFiles(projectId)` - Obtener archivos de un proyecto específico
- `getExternalResourcesByCategory(category)` - Obtener recursos por categoría

### Para Usuarios
- `getUsersByRole(role)` - Obtener usuarios por rol
- `getUsersByCountry(country)` - Obtener usuarios por país

### Para Comunicaciones
- `getCommunicationsByType(type)` - Obtener comunicaciones por tipo
- `getCommunicationsByAudience(audience)` - Obtener comunicaciones por audiencia

## 📈 Beneficios de la Reorganización

1. **Mantenibilidad** - Fácil encontrar y actualizar tipos/datos
2. **Reutilización** - Los mismos datos se pueden usar en múltiples componentes
3. **Consistencia** - Todos los componentes usan los mismos tipos y datos
4. **Escalabilidad** - Fácil agregar nuevos tipos y datos
5. **Tipado Fuerte** - Mejor experiencia de desarrollo con TypeScript
6. **Organización** - Estructura clara y lógica

## 🎯 Próximos Pasos

1. **Actualizar componentes** - Reemplazar datos hardcodeados con mocks centralizados
2. **Crear funciones utilitarias** - Para filtrado y procesamiento de datos
3. **Documentar patrones** - Crear guías para el uso de tipos y mocks
4. **Optimizar rendimiento** - Implementar memoización donde sea necesario
5. **Testing** - Crear tests para los tipos y mocks

## 📚 Referencias

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Next.js Documentation](https://nextjs.org/docs)
