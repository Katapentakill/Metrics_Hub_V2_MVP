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
│   ├── admin/                    # Panel administrativo (SIN route group)
│   │   ├── dashboard/page.tsx
│   │   ├── users/page.tsx
│   │   └── layout.tsx
│   ├── volunteer/                # Panel de Voluntarios
│   ├── hr/                       # Panel de Recursos Humanos
│   ├── lead_project/             # Panel de Líderes de Proyecto
│   ├── layout.tsx                # Layout raíz
│   ├── page.tsx                  # Página principal (redirección)
│   └── globals.css               # Estilos globales
├── features/                     # Funcionalidades por rol
│   ├── auth/                     # Autenticación
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── actions.ts
│   └── admin/                    # Funcionalidades de Admin
│       ├── DashboardStats.tsx
│       ├── QuickActions.tsx
│       ├── RecentActivity.tsx
│       ├── SystemHealth.tsx
│       ├── UserFilters.tsx
│       ├── UserModal.tsx
│       ├── UserActions.tsx
│       └── ExportUsers.tsx
├── components/                   # Componentes reutilizables
│   └── layout/
│       ├── Admin/
│       │   ├── HeaderAdmin.tsx
│       │   └── FooterAdmin.tsx
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

## 🔐 Sistema de Autenticación

### Funcionamiento
El sistema utiliza **localStorage** para mantener las sesiones de usuario. Cada rol tiene redirecciones específicas:

```typescript
// Rutas de redirección por rol
const ROLE_REDIRECTS = {
  admin: '/admin/dashboard',
  hr: '/hr/dashboard', 
  lead_project: '/lead_project/projects',
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
└── lead-branch     # Funcionalidades de Lead Project
```

### Flujo de Trabajo
1. **Desarrollo individual** en rama específica por rol
2. **Push a rama Test** para integración
3. **Pull Request** de Test → rama individual para sincronizar
4. **Pull Request** de Test → Main cuando esté estable

### Comunicación
- **Avisar cambios** antes de hacer push a Test
- **Documentar modificaciones** en types.ts
- **No tocar código** de otros roles sin coordinación
- **Revisar conflictos** antes de merge a Main

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

### Para Agregar una Nueva Página
1. **Crear archivo** en el directorio del rol correspondiente
2. **Seguir estructura** de páginas existentes
3. **Actualizar navegación** en el Header correspondiente
4. **Agregar tipos** necesarios en `types.ts`

### Para Agregar Componentes
1. **Ubicar en features/** según el rol específico
2. **Usar TypeScript** con interfaces apropiadas
3. **Seguir convenciones** de naming existentes
4. **Documentar props** complejas

### Para Agregar Datos Ficticios
1. **Crear/modificar archivos** en `lib/data/`
2. **Seguir interfaces** de `types.ts`
3. **Mantener consistencia** con datos existentes
4. **Actualizar exportaciones** necesarias

## 🧩 Componentes Principales Implementados

### Autenticación Pública
- ✅ **LoginForm**: Formulario completo con validación
- ✅ **RegisterForm**: Registro con redirección
- ✅ **ForgotPasswordForm**: Recuperación de contraseña
- ✅ **HeaderPublic/FooterPublic**: Layout público

### Panel Administrativo
- ✅ **DashboardStats**: Métricas y gráficos en tiempo real
- ✅ **UserManagement**: CRUD completo de usuarios
- ✅ **UserFilters**: Filtros avanzados y búsqueda
- ✅ **ExportUsers**: Exportación en múltiples formatos
- ✅ **HeaderAdmin/FooterAdmin**: Layout específico admin

### Sistema de Navegación
- ✅ **ActiveLink**: Detección automática de página activa
- ✅ **Carpetas por rol**: Separación clara (admin/, hr/, volunteer/, lead_project/)
- ✅ **Protected Routes**: Validación de permisos automática

## 🎯 Estado Actual de Implementación

### ✅ Completado (Funcional)
- **Sistema de autenticación** completo con redirecciones por rol
- **Panel administrativo** con dashboard y gestión de usuarios completos
- **Layouts específicos** por rol con headers/footers únicos
- **Sistema de tipos** TypeScript completo y consistente
- **Datos ficticios** para 30 usuarios con perfiles completos
- **CSS moderno** responsive con variables personalizadas
- **Componentes Admin**: DashboardStats, UserFilters, UserModal, etc.

### 🔄 Pendiente de Implementación
- **Panel HR**: Gestión de aplicaciones y reclutamiento
- **Panel Lead Project**: Administración de proyectos y equipos
- **Panel Volunteer**: Perfil personal y tareas
- **Features específicas**: hr/, lead_project/, volunteer/ en carpeta features/

## 📞 Soporte y Contribución

### Antes de Contribuir
1. **Revisar este README** completamente
2. **Entender la estructura** de tipos y datos
3. **Coordinar con el equipo** cambios en archivos compartidos
4. **Probar localmente** antes de push

### Reportar Problemas
1. **Verificar tipos** y interfaces afectadas
2. **Documentar pasos** para reproducir
3. **Incluir logs** de error si aplica
4. **Sugerir solución** si es posible

---

**Desarrollado con ❤️ para Living Stones Foundation**