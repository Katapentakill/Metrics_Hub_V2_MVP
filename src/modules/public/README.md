# Módulo Público - Ofertas de Voluntariado

Este módulo contiene las páginas y componentes públicos para mostrar las ofertas de voluntariado de Living Stones, inspirado en plataformas como Computrabajo.

## Estructura

```
src/modules/public/
├── jobs/                   # Componentes de ofertas
│   ├── JobSearchHero.tsx   # Hero section con búsqueda
│   ├── JobCard.tsx         # Tarjeta de oferta individual
│   └── ...
└── layout/                 # Componentes de layout público
    ├── PublicHeader.tsx    # Header con login/register
    └── PublicFooter.tsx    # Footer con información
```

## Rutas Públicas

- `/ofertas` - Listado de todas las ofertas publicadas
- `/ofertas/[id]` - Detalle de una oferta específica
- `/login` - Página de inicio de sesión
- `/register` - Página de registro

## Características

### 🎨 Diseño Verde (green_design_system.html)
- Usa la paleta de colores verde institucional
- `green-800` (#166534) para elementos principales
- `green-600` para botones CTA
- `green-50/100` para fondos suaves

### 🔍 Búsqueda y Filtros
- Búsqueda por palabra clave
- Filtro por categoría (Technology, Design, Marketing, etc.)
- Filtro por ubicación (Remoto, Híbrido, Presencial)
- Resultados en tiempo real

### 📋 Listado de Ofertas
- Vista en grid (2 columnas en desktop)
- Tarjetas con información clave:
  - Título y departamento
  - Categoría y nivel de experiencia
  - Descripción breve
  - Skills requeridos
  - Ubicación, horas/semana, duración
  - Número de postulantes
- Badge "¡Nuevo!" para ofertas recientes (< 7 días)

### 📄 Detalle de Oferta
- Información completa de la oferta
- Descripción detallada
- Responsabilidades
- Requisitos y cualificaciones
- Habilidades requeridas
- Beneficios
- Botones para postular (redirige a /register)
- Ofertas similares
- Opciones de compartir y guardar

### 🧭 Navegación
- Header sticky con logo y navegación
- Botones de Login/Register siempre visibles
- Footer con enlaces rápidos y contacto
- Breadcrumbs en páginas de detalle

## Datos Mock

Los datos de las ofertas se generan usando `@faker-js/faker` en:
- `src/lib/types/jobOpenings.ts` - Tipos TypeScript
- `src/lib/data/jobOpenings.ts` - Mock data generator

### Ejemplo de uso:

```typescript
import { getMockJobOpenings } from '@/lib/data/jobOpenings';

const allJobs = getMockJobOpenings(25); // Genera 25 ofertas
const publishedJobs = allJobs.filter(job => job.status === 'published');
```

## Integración futura

Este módulo está preparado para integrarse con:
- Sistema de autenticación existente
- Módulo de recruitment (admin/hr)
- Sistema de aplicaciones de candidatos
- Base de datos real (reemplazar mocks)

## Notas de implementación

- Las páginas usan el layout `(public)` para evitar autenticación
- Se usa `'use client'` para funcionalidades interactivas
- Los colores siguen el sistema de diseño verde definido
- Responsive design (mobile-first)
- SEO-friendly con metadata apropiada
