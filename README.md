# Living Stones - Volunteer Management System 🌿

## 📋 Descripción General

Living Stones es un sistema completo de gestión de voluntarios desarrollado en Next.js 14 que permite administrar organizaciones benéficas y sus equipos de trabajo. El sistema está diseñado con una arquitectura basada en roles que proporciona interfaces específicas para cada tipo de usuario.

## 🏗️ Arquitectura del Sistema

### Roles de Usuario
- **🔐 Admin**: Control total del sistema, gestión de usuarios, métricas y configuración
- **👥 HR**: Gestión de aplicaciones, reclutamiento y procesos de selección
- **📊 Lead Project**: Administración de proyectos, equipos y asignación de tareas
- **🤝 Volunteer**: Perfil personal, tareas asignadas y participación en proyectos

### Estructura de Carpetas

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Rutas públicas (sin autenticación)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── layout.tsx
│   ├── admin/                    # Panel administrativo
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   └── layout.tsx
│   ├── volunteer/                # Panel de Voluntarios
│   ├── hr/                       # Panel de Recursos Humanos
│   ├── lead_project/             # Panel de Líderes de Proyecto
│   ├── layout.tsx                # Layout raíz
│   ├── page.tsx                  # Página principal (redirección)
│   └── globals.css               # Estilos globales
├── modules/                      # 🆕 MÓDULOS POR FUNCIONALIDAD
│   ├── auth/                     # Módulo de Autenticación
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── actions.ts
│   ├── dashboard/                # Módulo Dashboard
│   │   ├── admin/               # Dashboard específico para Admin
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   └── SystemHealth.tsx
│   │   ├── hr/                  # Dashboard para HR
│   │   ├── lead/                # Dashboard para Lead Project
│   │   └── volunteer/           # Dashboard para Volunteer
│   ├── users/                   # Módulo de Gestión de Usuarios
│   │   ├── admin/               # Gestión completa de usuarios (Admin)
│   │   │   ├── UserFilters.tsx
│   │   │   ├── UserModal.tsx
│   │   │   ├── UserActions.tsx
│   │   │   └── ExportUsers.tsx
│   │   ├── hr/                  # Gestión de aplicaciones y candidatos
│   │   ├── lead/                # Gestión de equipos de proyecto
│   │   └── volunteer/           # Perfil personal y configuración
│   ├── projects/                # Módulo de Gestión de Proyectos
│   │   ├── admin/               # Supervisión general de proyectos
│   │   ├── hr/                  # Asignación de personal
│   │   ├── lead/                # Administración directa de proyectos
│   │   └── volunteer/           # Participación en proyectos
│   ├── documents/               # Módulo de Documentos
│   │   ├── admin/               # Gestión completa de documentos
│   │   ├── hr/                  # Documentos de reclutamiento y legales
│   │   ├── lead/                # Documentos de proyectos y equipos
│   │   └── volunteer/           # Documentos personales y recursos
│   ├── evaluations/             # Módulo de Evaluaciones
│   │   ├── admin/               # Supervisión de evaluaciones
│   │   ├── hr/                  # Procesamiento de evaluaciones
│   │   ├── lead/                # Evaluaciones de equipo
│   │   └── volunteer/           # Auto-evaluaciones y resultados
│   ├── recruitment/             # Módulo de Reclutamiento
│   │   ├── admin/               # Supervisión del proceso
│   │   ├── hr/                  # Gestión completa del proceso
│   │   ├── lead/                # Participación en entrevistas
│   │   └── volunteer/           # Estado de aplicación (solo candidatos)
│   └── settings/                # Módulo de Configuración
│       ├── admin/               # Configuración completa del sistema
│       ├── hr/                  # Configuración de procesos HR
│       ├── lead/                # Configuración de proyectos
│       └── volunteer/           # Configuración personal
├── components/                   # Componentes reutilizables
│   └── layout/
│       ├── Admin/
│       │   ├── HeaderAdmin.tsx
│       │   └── FooterAdmin.tsx
│       ├── HR/
│       │   ├── HeaderHR.tsx
│       │   └── FooterHR.tsx
│       ├── Lead/
│       │   ├── HeaderLead.tsx
│       │   └── FooterLead.tsx
│       ├── Volunteer/
│       │   ├── HeaderVolunteer.tsx
│       │   └── FooterVolunteer.tsx
│       ├── Public/
│       │   ├── HeaderPublic.tsx
│       │   └── FooterPublic.tsx
│       └── ActiveLink.tsx
├── lib/                          # Utilidades y configuración
│   ├── data/                     # Datos ficticios para desarrollo
│   │   └── extendedUsers.ts
│   ├── types.ts                  # Definiciones de TypeScript
│   └── auth.ts                   # Sistema de autenticación
```

## 🔧 Nueva Arquitectura de Módulos

### Concepto de Módulos
Cada **módulo** representa una funcionalidad del sistema (Dashboard, Usuarios, Comunicaciones, etc.) y contiene carpetas específicas para cada rol:

```
modules/
├── {nombre-modulo}/
│   ├── admin/          # Funcionalidad para administradores
│   ├── hr/             # Funcionalidad para recursos humanos
│   ├── lead/           # Funcionalidad para líderes de proyecto
│   └── volunteer/      # Funcionalidad para voluntarios
```

### Distribución de Trabajo por Integrante

**Cada integrante del equipo trabajará en:**
1. **Su rama específica**: `admin-branch`, `hr-branch`, `lead-branch`, `volunteer-branch`
2. **Su carpeta dentro de cada módulo**: `modules/{modulo}/{su-rol}/`
3. **Las páginas de su rol**: `app/{su-rol}/`
4. **Su layout específico**: `components/layout/{SuRol}/`

### Módulos Principales - Etapa Primaria

#### 🔐 Auth Module (`modules/auth/`)
- **Sistema de autenticación**: Login, registro, recuperación de contraseña
- **Gestión de sesiones**: Tokens de seguridad, redirecciones por rol
- **Verificación**: Validación de email, seguridad de cuentas

#### 🏠 Dashboard Module (`modules/dashboard/`)
- **Admin**: Métricas generales, usuarios activos, salud del sistema
- **HR**: Aplicaciones pendientes, procesos de selección, estadísticas de reclutamiento
- **Lead**: Estado de proyectos, equipos asignados, deadlines próximos
- **Volunteer**: Tareas personales, progreso individual, próximas actividades

#### 👥 Users Module (`modules/users/`)
- **Admin**: CRUD completo, gestión de roles, suspensiones, exportación
- **HR**: Gestión de aplicaciones, entrevistas, onboarding, candidatos
- **Lead**: Asignación de equipos, evaluación de performance, disponibilidad
- **Volunteer**: Edición de perfil, configuraciones personales, historial

#### 📊 Projects Module (`modules/projects/`)
- **Admin**: Supervisión general, métricas de todos los proyectos
- **HR**: Asignación de personal, necesidades de recursos humanos
- **Lead**: Administración directa, cronogramas, entregables, equipos, gestión de tareas con tableros Kanban
- **Volunteer**: Proyectos asignados, tareas específicas, progreso

#### 📄 Documents Module (`modules/documents/`)
- **Personal Documents**: CVs, certificados personales, evaluaciones de cada voluntario
- **General Resources**: Manuales, guías, políticas de la organización
- **Legal Documents**: Acuerdos de voluntariado, documentos específicos por región
- **Templates**: Plantillas de certificados, cartas de referencia
- **Knowledge Base**: FAQ, tutoriales, recursos de capacitación para voluntarios

#### 📈 Evaluations Module (`modules/evaluations/`)
- **Sistema de evaluaciones**: Evaluaciones de desempeño cada 2 meses
- **Feedback bidireccional**: Evaluación hacia arriba, hacia abajo y horizontal
- **Planes de mejora**: Identificación automática de áreas de crecimiento
- **Métricas de progreso**: Tracking del desarrollo personal y profesional

#### 🔄 Recruitment Module (`modules/recruitment/`)
- **Proceso de selección**: Las 6 etapas completas del blueprint (Aplicación → Filtro HR → Video → Entrevista → Decisión → Onboarding)
- **Gestión de candidatos**: Pipeline de aplicaciones y estados
- **Entrevistas virtuales**: Programación y seguimiento
- **Onboarding**: Proceso de integración de nuevos voluntarios

#### ⚙️ Settings Module (`modules/settings/`)
- **Configuración del sistema**: Parámetros generales de la plataforma
- **Permisos por rol**: Matriz de permisos y configuraciones específicas
- **Personalización**: Configuración de notificaciones, idioma, zona horaria
- **Integraciones**: Configuración de herramientas externas (Slack, Zoom, etc.)

## 🔐 Sistema de Autenticación

### Funcionamiento
El sistema utiliza **localStorage** para mantener las sesiones de usuario. Cada rol tiene redirecciones específicas:

```typescript
// Rutas de redirección por rol
const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  hr: '/hr/dashboard', 
  lead_project: '/lead_project/dashboard',
  volunteer: '/volunteer/profile',
  unassigned: '/volunteer/profile'
}
```

### Credenciales de Desarrollo
Para testing y desarrollo, usar estas credenciales:

- **Admin**: `admin_1@example.com` / `password123`
- **HR**: `hr_1@example.com` / `password123`
- **Lead Project**: `lead_1@example.com` / `password123`
- **Volunteer**: `volunteer_1@example.com` / `password123`

### Protección de Rutas
Cada layout verifica automáticamente los permisos:

```typescript
// Ejemplo de protección en layout de Admin
useEffect(() => {
  const session = localStorage.getItem('auth_session');
  if (!session || JSON.parse(session).role !== 'admin') {
    window.location.href = '/login';
  }
}, []);
```

## 📊 Gestión de Datos

### Estructura de Types
Todas las interfaces están definidas en `src/lib/types.ts`. Al agregar nuevos tipos:

1. **Mantener consistencia** con las interfaces existentes
2. **Documentar cambios** que afecten otras partes del código
3. **Usar nombres descriptivos** y seguir la convención establecida

```typescript
// Ejemplo de interfaz principal
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'lead_project' | 'volunteer' | 'unassigned';
  status: 'active' | 'inactive' | 'suspended' | 'deleted';
  // ... más campos
}
```

### Datos Ficticios
Los datos de desarrollo se almacenan en `src/lib/data/`:

- **Formato**: Seguir las interfaces de `types.ts`
- **Consistencia**: Mantener relaciones coherentes entre entidades
- **Ubicación**: Un archivo por tipo de dato principal

```typescript
// Ejemplo en extendedUsers.ts
export const extendedMockUsers: ExtendedUserWithProfile[] = [
  {
    id: '1',
    email: 'admin_1@example.com',
    name: 'Admin Principal',
    role: 'admin',
    // ... datos completos siguiendo la interfaz
  }
];
```

## 🎨 Sistema de Estilos

### Variables CSS Personalizadas
Definidas en `globals.css` con el tema Living Stones:

```css
:root {
  --living-green-50: #f0fdf4;
  --living-green-500: #22c55e;
  --living-green-600: #16a34a;
  /* ... más variables */
}
```

### Clases Utilitarias
- `.card`: Tarjetas con sombra y bordes redondeados
- `.btn-living`: Botones principales con gradiente verde
- `.nav-link-active`: Estado activo en navegación
- `.loading-skeleton`: Animación de carga

## 🔄 Metodología de Trabajo en Equipo

### Estructura de Ramas
```
main                 # Rama principal (producción)
├── test            # Rama de integración
├── admin-branch    # Funcionalidades de Admin
├── hr-branch       # Funcionalidades de HR
├── lead-branch     # Funcionalidades de Lead Project
└── volunteer-branch # Funcionalidades de Volunteer
```

### Flujo de Trabajo con Módulos
1. **Desarrollo individual** en rama específica por rol
2. **Trabajar en tu carpeta** dentro de cada módulo: `modules/{modulo}/{tu-rol}/`
3. **Push a rama Test** para integración
4. **Pull Request** de Test → rama individual para sincronizar
5. **Pull Request** de Test → Main cuando esté estable

### Ejemplo de Flujo de Trabajo
```bash
# Trabajar en tu rama específica
git checkout admin-branch

# Crear/modificar archivos en tu carpeta de cada módulo
# modules/dashboard/admin/
# modules/users/admin/
# modules/communications/admin/
# app/admin/

git add .
git commit -m "Add: dashboard stats component for admin"
git push origin admin-branch

# Para integración
git checkout test
git merge admin-branch
git push origin test
```

### Comunicación
- **Avisar cambios** antes de hacer push a Test
- **Documentar modificaciones** en types.ts
- **No tocar código** de otros roles sin coordinación
- **Revisar conflictos** antes de merge a Main
- **Coordinar cambios** en archivos compartidos (types.ts, layouts, etc.)

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 📁 Agregando Nuevas Funcionalidades

### Para Agregar un Nuevo Módulo
1. **Crear carpeta** en `modules/{nuevo-modulo}/`
2. **Crear subcarpetas** para cada rol: `admin/`, `hr/`, `lead/`, `volunteer/`
3. **Coordinar con el equipo** la estructura y responsabilidades
4. **Actualizar headers** de navegación en cada rol

### Para Agregar Componentes en tu Módulo
1. **Ubicar en modules/{modulo}/{tu-rol}/** 
2. **Usar TypeScript** con interfaces apropiadas
3. **Seguir convenciones** de naming existentes
4. **Documentar props** complejas

### Para Agregar Páginas en tu Rol
1. **Crear archivo** en `app/{tu-rol}/{nueva-pagina}/page.tsx`
2. **Importar componentes** desde `modules/{modulo}/{tu-rol}/`
3. **Actualizar navegación** en tu header específico
4. **Agregar tipos** necesarios en `types.ts`

### Headers y Navegación por Rol

Cada rol debe tener su header con navegación a los módulos correspondientes:

```typescript
// Ejemplo HeaderAdmin.tsx
const adminModules = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Usuarios', href: '/admin/users', icon: Users },
  { name: 'Comunicaciones', href: '/admin/communications', icon: MessageSquare },
  { name: 'Proyectos', href: '/admin/projects', icon: FolderOpen },
];

// Ejemplo HeaderHR.tsx
const hrModules = [
  { name: 'Dashboard', href: '/hr/dashboard', icon: LayoutDashboard },
  { name: 'Candidatos', href: '/hr/users', icon: UserPlus },
  { name: 'Comunicaciones', href: '/hr/communications', icon: MessageSquare },
  { name: 'Reclutamiento', href: '/hr/recruitment', icon: Search },
];
```

## 🧩 Componentes Principales Implementados

### Autenticación Pública (`modules/auth/`)
- ✅ **LoginForm**: Formulario completo con validación
- ✅ **RegisterForm**: Registro con redirección
- ✅ **ForgotPasswordForm**: Recuperación de contraseña

### Panel Administrativo (`modules/dashboard/admin/`, `modules/users/admin/`)
- ✅ **DashboardStats**: Métricas y gráficos en tiempo real
- ✅ **UserManagement**: CRUD completo de usuarios
- ✅ **UserFilters**: Filtros avanzados y búsqueda
- ✅ **ExportUsers**: Exportación en múltiples formatos

### Sistema de Navegación
- ✅ **ActiveLink**: Detección automática de página activa
- ✅ **Layouts por rol**: Headers y footers específicos
- ✅ **Protected Routes**: Validación de permisos automática

## 🎯 Estado Actual de Implementación

### ✅ Completado (Funcional)
- **Sistema de autenticación** completo con redirecciones por rol
- **Panel administrativo** con dashboard y gestión de usuarios completos
- **Layouts específicos** por rol con headers/footers únicos
- **Sistema de tipos** TypeScript completo y consistente
- **Datos ficticios** para 30 usuarios con perfiles completos
- **CSS moderno** responsive con variables personalizadas
- **Módulo Dashboard Admin**: DashboardStats, QuickActions, SystemHealth
- **Módulo Users Admin**: UserFilters, UserModal, ExportUsers

### 🔄 Pendiente de Implementación por Integrante

#### **Integrante Admin** (`admin-branch`)
- [ ] `modules/communications/admin/` - Sistema de notificaciones
- [ ] `modules/projects/admin/` - Supervisión general de proyectos
- [ ] `app/admin/communications/` - Páginas de comunicaciones admin
- [ ] `app/admin/projects/` - Páginas de proyectos admin

#### **Integrante HR** (`hr-branch`)
- [ ] `modules/dashboard/hr/` - Dashboard HR con métricas de reclutamiento
- [ ] `modules/users/hr/` - Gestión de candidatos y aplicaciones
- [ ] `modules/communications/hr/` - Comunicación con candidatos
- [ ] `modules/projects/hr/` - Asignación de personal a proyectos
- [ ] `app/hr/` - Todas las páginas del panel HR

#### **Integrante Lead Project** (`lead-branch`)
- [ ] `modules/dashboard/lead/` - Dashboard con estado de proyectos
- [ ] `modules/users/lead/` - Gestión de equipos de trabajo
- [ ] `modules/communications/lead/` - Coordinación con equipos
- [ ] `modules/projects/lead/` - Administración directa de proyectos
- [ ] `app/lead_project/` - Todas las páginas del panel Lead

#### **Integrante Volunteer** (`volunteer-branch`)
- [ ] `modules/dashboard/volunteer/` - Dashboard personal
- [ ] `modules/users/volunteer/` - Perfil y configuración personal
- [ ] `modules/communications/volunteer/` - Mensajes y notificaciones
- [ ] `modules/projects/volunteer/` - Proyectos asignados y tareas
- [ ] `app/volunteer/` - Todas las páginas del panel Volunteer

## 📞 Soporte y Contribución

### Antes de Contribuir
1. **Revisar este README** completamente
2. **Entender la estructura de módulos** y tu responsabilidad específica
3. **Coordinar con el equipo** cambios en archivos compartidos
4. **Probar localmente** antes de push

### Reportar Problemas
1. **Verificar si afecta tu módulo** o es compartido
2. **Documentar pasos** para reproducir
3. **Incluir logs** de error si aplica
4. **Mencionar el módulo afectado** en el reporte

### Coordinación entre Integrantes
1. **Avisar cambios en types.ts** - afecta a todos
2. **Coordinar cambios en layouts** - puede afectar navegación
3. **Comunicar nuevos módulos** - todos deben conocer la estructura
4. **Documentar APIs internas** - para reutilización entre roles

---

**Desarrollado con ❤️ para Living Stones Foundation**