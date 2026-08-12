# Monto — Contexto del Proyecto

## Qué es Monto
Monto es una app para la gestión y control personal de suscripciones y débitos automáticos.
Objetivo principal: evitar que el usuario se quede sin dinero o sufra cobros inesperados por
servicios que no usa o cuyo vencimiento desconoce.

### Funcionalidades clave
- **Calendario y vista de vencimientos**: panel para visualizar en qué día del mes se cobra cada suscripción.
- **Notificaciones inteligentes**: alertas configurables (ej. 24hs/48hs antes) previas a cada débito.
- **Widgets interactivos**: integración en la pantalla de inicio del teléfono para ver próximos cobros.
- **Manejo de precios e impuestos**: consideración de fluctuaciones de precio o cargos extra en compras en moneda extranjera.

## Stack técnico
- **Framework**: React Native + Expo
- **Entry point**: `App.js` — envuelve `AppNavigator` y el status bar
- **Navegación**: `React Navigation` (`@react-navigation/native` + `@react-navigation/bottom-tabs`),
  configurada en `src/navigation/AppNavigator.js`. Bottom Tabs entre `HomeScreen`, `SubscriptionsScreen`,
  `AnalyticsScreen` y `UserScreen`, más modales/stacks para el flujo de agregar suscripción
  (`AddSubscriptionScreen`).
- **Estado global**: React Context API nativo (sin Redux/Zustand, para mantener la app liviana),
  centralizado en `src/context/SubscriptionContext.js`. Maneja el listado de suscripciones activas,
  cálculo de totales mensuales, y métodos para agregar/eliminar suscripciones.

## Estructura de carpetas
```
src/
  theme/            → Design tokens (fuente de verdad: src/theme/index.js)
  context/          → Contextos de React (estado global)
  hooks/            → Custom hooks (lógica de negocio separada de la UI)
  data/             → Datos estáticos (ej. lista de servicios populares con sus dominios/slugs)
  components/
    ui/             → Componentes primitivos reutilizables en TODA la app
                       (ej. FormInput, TagBadge, PlanCard)
    subscriptions/  → Componentes específicos del flujo de suscripciones
                       (ej. ServiceListItem, ServiceIcon)
    [resto]         → Componentes generales ya existentes (Header, BottomNavBar, etc.)
  screens/          → Pantallas de la app (Home, Suscripciones, Analytics...)
  navigation/       → Configuración de navegación (AppNavigator, Bottom Tabs)
```

**Criterio para `ui/` vs `subscriptions/` vs específico de pantalla**: si el componente es una pieza de
diseño genérica que podría reusarse en cualquier formulario/pantalla futura → `ui/`. Si es específico
del dominio de suscripciones pero podría usarse en más de una pantalla de ese flujo → `subscriptions/`.
Si es exclusivo de una sola pantalla → queda directo en `components/` o junto a la pantalla.

**Regla importante**: no crear componentes o estilos fuera de esta estructura.
Antes de crear un archivo nuevo, revisar si ya existe algo similar en `src/components/` o `src/screens/`.

## Design System

### Fuente de verdad
Todos los tokens viven en **`src/theme/index.js`**. Ningún componente debe usar colores,
espaciados o tipografías "hardcodeados" — todo tiene que salir de este archivo.

### Estructura de archivos del theme
```
src/theme/
  index.js        → fuente de verdad, combina y exporta todos los tokens
  colors.js        → tokens primitivos + agrupados + semánticos de color
  typography.js    → tokens de tipografía (familia, tamaños, line-heights, pesos)
  spacing.js       → tokens de espaciado y radios de borde
```

### Colores (`src/theme/colors.js`)

Tres niveles de acceso, en este orden de preferencia para usar en componentes:
1. **`semanticColors`** (preferido) — nombres por intención: `semanticColors.background.screen`, `semanticColors.text.danger`, `semanticColors.border.focus`, etc.
2. **`colors`** — agrupado por categoría: `colors.primary[500]`, `colors.text.darkPrimary`, `colors.green[500]`
3. **`colorTokens`** — tokens primitivos planos (el nivel más bajo, evitar usar directo en componentes)

**Brand / Primary (Azul Monto)** — `colors.primary[100..900]`
| Token | Hex |
|---|---|
| 100 | `#DBEAFE` |
| 200 | `#BFDBFE` |
| 300 | `#93C5FD` |
| 400 | `#60A5FA` |
| **500** | `#2563EB` ← Azul principal |
| 600 | `#1D4ED8` |
| 700 | `#1E40AF` |
| 800 | `#1E3A8A` |
| 900 | `#172554` |

**Surface / fondos** — `colors.surface`
| Token | Hex | Uso |
|---|---|---|
| `white` | `#FFFFFF` | — |
| `warmBg` | `#F2F1ED` | Fondo cálido principal (`semanticColors.background.screen`) |
| `warmCardSubtle` | `#FBFAF8` | Fondo tarjetas sutiles (`semanticColors.background.cardSubtle`) |
| `warmElement` | `#EDEDED` | Inputs/pills (`semanticColors.background.pill`, `border.subtle`) |

**Texto** — `colors.text`
| Token | Hex | Uso |
|---|---|---|
| `darkPrimary` | `#1C1917` | Texto principal (`semanticColors.text.primary`) |
| `darkAlt` | `#232323` | — |
| `darkDeep` | `#0F172A` | — |
| `graySecondary` | `#64748B` | Texto secundario (`semanticColors.text.secondary`) |
| `grayLight` | `#94A3B8` | — |

**Estados semánticos** — `colors.green` / `colors.orange` / `colors.red` / `colors.purple`
| Estado | 100 (claro) | 500 (base) | 700 (fuerte) |
|---|---|---|---|
| Success (verde) | `#DCFCE7` | `#16A34A` | `#15803D` |
| Warning (naranja) | `#FEF3C7` | `#F59E0B` | `#B45309` |
| Danger (rojo) | `#FEE2E2` | `#EF4444` | `#B91C1C` |
| Accent (morado) | `#DCD5FE` | `#4C2FD5` | — (sin definir aún) |

⚠️ Nota de naming: los estados semánticos se llaman **`green` / `orange` / `red`** en el código
(no `success` / `warning` / `error`). Usar estos nombres exactos al pedirle cambios a Claude Code.

### Escala de neutros cálidos — `colors.warm[...]`

Agregada para resolver falta de jerarquía visual entre bloques (fondo/tarjeta/elemento anidado)
sin depender del color primario. **Reemplaza a `colors.text.grayLight`, `colors.text.graySecondary`
y `colors.text.darkDeep`, que quedan deprecados** (no borrados todavía por compatibilidad, pero no
usar en código nuevo).

| Token | Hex | Uso |
|---|---|---|
| `colors.warm[0]` | `#FFFFFF` | Máxima elevación: modales, popups sobre tarjetas |
| `colors.warm[25]` | `#FDFCFB` | Superficie elevada — ej. fondo de tarjetas que necesitan destacar más que el estándar |
| `colors.warm[50]` | `#FBFAF8` | Fondo de tarjeta estándar / elemento anidado dentro de una tarjeta `warm-25` |
| `colors.warm[75]` | `#F7F5F1` | Elemento anidado dentro de una tarjeta (ej. fila dentro de una lista) |
| `colors.warm[100]` | `#F2F1ED` | Fondo de pantalla |
| `colors.warm[150]` | `#EAE7E1` | Sección secundaria de pantalla, fondo de inputs |
| `colors.warm[200]` | `#E2DFD8` | Bordes sutiles, separadores livianos |
| `colors.warm[300]` | `#D0CCC3` | Bordes marcados, líneas divisorias entre secciones |
| `colors.warm[400]` | `#A8A29A` | Texto placeholder, íconos inactivos |
| `colors.warm[500]` | `#78716C` | Texto secundario |
| `colors.warm[700]` | `#4A4542` | Texto secundario con énfasis |
| `colors.warm[900]` | `#1C1917` | Texto principal |

⚠️ **Regla de temperatura de color — importante**: todo neutro/gris del proyecto debe salir de
`colors.warm[...]`. Nunca usar valores tipo `#9CA3AF`, `#6B7280`, `#4B5563`, `#374151`, `#F9FAFB`,
`#E5E7EB`, `#F3F4F6` (paleta gris fría de Tailwind) — quedan de una migración incompleta en
componentes viejos (ej. `AddSubscriptionModal.js`) y hay que reemplazarlos por el `warm[...]`
equivalente más cercano en tono.

**Objeto `semanticColors`** (mapeo de intención → color, ya armado en el código):
```js
semanticColors.background = { screen, card, cardSubtle, pill, pillActive }
semanticColors.text       = { primary, secondary, inverse, success, warning, danger }
semanticColors.border     = { subtle, focus }
```

### Tipografía (`src/theme/typography.js`)

Familia: **Inter**. Pesos: `regular` 400, `medium` 500, `semibold` 600, `bold` 700.

Acceso preferido vía `typography.<nombre>` (ej. `typography.h1`, `typography.bodyMedium`):

| Alias (`typography.X`) | Tamaño | Line-height | Peso | Uso |
|---|---|---|---|---|
| `displayLarge` | 34 | 42 | bold | Montos principales grandes |
| `displayMedium` | 28 | 36 | bold | Montos principales |
| `h1` | 24 | 32 | bold | Título de pantalla |
| `h2` | 20 | 28 | semibold | Subtítulo |
| `h3` | 18 | 24 | semibold | Título de sección/card |
| `bodyLarge` | 16 | 24 | regular | Texto de cuerpo destacado |
| `bodyMedium` | 14 | 20 | regular | Texto de cuerpo estándar |
| `bodySmall` | 13 | 18 | regular | Texto secundario |
| `caption` | 12 | 16 | medium | Aclaraciones, metadata |
| `badge` | 11 | 14 | semibold | Etiquetas/badges |

### Espaciado y radios (`src/theme/spacing.js`)

Acceso preferido vía `spacing.<alias>` y `borderRadius.<alias>` (no usar los números "spacing-N" directo):

| Alias | Valor (px) |
|---|---|
| `spacing.xxs` | 2 |
| `spacing.xs` | 4 |
| `spacing.sm` | 8 |
| `spacing.md` | 12 |
| `spacing.lg` | 16 |
| `spacing.xl` | 20 |
| `spacing['2xl']` | 24 |
| `spacing['3xl']` | 32 |
| `spacing['4xl']` | 40 |
| `spacing['5xl']` | 48 |

| Alias | Valor (px) |
|---|---|
| `borderRadius.xs` | 4 |
| `borderRadius.sm` | 8 |
| `borderRadius.md` | 12 |
| `borderRadius.lg` | 16 |
| `borderRadius.xl` | 24 |
| `borderRadius.full` | 9999 |

### Sincronía con Figma
Los tokens están pensados para reflejar 1:1 lo definido en Figma (mismo naming cuando sea posible),
para que el flujo diseño → código sea directo.

## Íconos

**Librería de UI: Phosphor Icons** (`phosphor-react-native`) — reemplaza a `@expo/vector-icons`
(Ionicons), que queda deprecado. Todo ícono de interfaz (navegación, acciones, estados) debe usar
Phosphor con **`weight="bold"` explícito** (la librería no lo aplica por default).
- Ejemplo: `<ClockCountdown weight="bold" size={20} color={colors.primary[500]} />`
- Íconos con estado activo/inactivo (ej. tabs) usan **componentes separados**, no una prop:
  `House` (inactivo) vs `HouseFill` (activo) — no es lo mismo que cambiarle el color.
- ⚠️ Componentes viejos (ej. `AddSubscriptionModal.js`) todavía tienen `Ionicons` sin migrar —
  pendiente de reemplazo.

**Logos de marca/servicio: Simple Icons** (`simple-icons`), vía el componente `ServiceIcon`
(`src/components/subscriptions/ServiceIcon.js`). NO se usa Clearbit Logo API — se descartó porque
no permite recolorear el ícono a un solo color sobre fondo custom, y acá se necesita el logo
monocromático (color de marca oficial vía `icon.hex`) sobre un contenedor `colors.warm[25]`,
mismo patrón visual que los íconos de Phosphor en las tarjetas de `SummarySection`.
- Uso: `<ServiceIcon serviceName="netflix" size={40} />`
- Si el servicio no existe en Simple Icons, hace fallback (ver implementación del componente).
- La lista de servicios con su slug de Simple Icons vive en `AddSubscriptionModal.js`
  (`POPULAR_SERVICES`) — candidata a moverse a `src/data/services.js`.

## Patrones de UX ya definidos (no rediseñar sin consultar)
- **Búsqueda Dinámica con Fallback** (pantalla de añadir suscripción): el usuario busca un servicio;
  si no existe en la base de datos, aparece dinámicamente la opción "Crear suscripción personalizada"
  sin recargar visualmente la interfaz. Inspirado en patrones de Apple/Stripe.
- Se priorizó jerarquía visual limpia: se eliminaron controles segmentados ambiguos en la pantalla
  de búsqueda para mantener el foco directo en la acción principal.

## Convenciones de trabajo
- **No hacer refactors masivos en un solo pedido.** Migrar de a un componente por vez, probar, y recién pasar al siguiente. Excepción: si es el mismo archivo ya abierto en la sesión, agrupar cambios del mismo tipo (ej. color + tipografía) para no releerlo en otra sesión.
- Antes de aplicar cambios grandes (ej. migrar estilos a tokens), usar modo **Plan** para revisar el approach primero.
- Cualquier color/tamaño/espaciado nuevo debe agregarse primero en `src/theme/colors.js`, `typography.js` o `spacing.js` (no directo en el componente), y exportarse a través de `src/theme/index.js`.
- Al migrar un componente, preferir los objetos semánticos/agrupados (`semanticColors`, `colors`, `typography`, `spacing`, `borderRadius`) por sobre los tokens primitivos planos (`colorTokens`, `spacingTokens`, etc.).
- Los estados semánticos se llaman `green` / `orange` / `red` / `purple` en el código (no `success` / `warning` / `error`) — usar esos nombres.
- **Regla de temperatura**: todo neutro/gris debe ser `colors.warm[...]`. Nunca introducir grises fríos (paleta Tailwind tipo `#9CA3AF`, `#E5E7EB`, etc.) — es el error más común al portar código o componentes hechos fuera de este proyecto.
- **Separar lógica de presentación**: en componentes con estado complejo (varios `useState`, handlers), extraer la lógica a un custom hook en `src/hooks/` antes de dividir la UI en subcomponentes. Facilita el refactor y evita arrastrar estado a mitad de camino.
- Componentes reutilizables en toda la app van en `components/ui/`; específicos de un dominio (ej. suscripciones) van en su propia subcarpeta (`components/subscriptions/`).

## Errores conocidos / cosas ya resueltas
- Se resolvieron bloqueos al correr el proyecto con Expo Web: pantallas en blanco, rutas de
  importación relativas mal armadas, y problemas con exportaciones por defecto (default exports).
  Si reaparece un problema similar, revisar primero rutas de import y default vs named exports.

## Estado actual del proyecto
- ✅ UX y flujos diseñados en Figma (incluye pantalla de añadir suscripción)
- ✅ Design tokens completos: colores, tipografía, espaciado, radios y escala de neutros cálidos (`colors.warm`)
- ✅ Estructura de carpetas y navegación base configurada
- ✅ `BottomNavBar` y `SummarySection` (ambas tarjetas) migradas al design system, con íconos Phosphor
- ✅ Librería de íconos de marca (`Simple Icons` + `ServiceIcon`) instalada e integrada en la lista de servicios populares
- 🔄 En curso: refactor de `AddSubscriptionModal.js` en 4 pasos — (1) íconos Phosphor, (2) tokens de color/spacing/tipografía, (3) extraer lógica a `useAddSubscriptionForm` hook, (4) partir en subcomponentes (`ui/` y `subscriptions/`)
- 🔲 Pendiente: mover `POPULAR_SERVICES`/`TAGS` a `src/data/services.js`
- 🔲 Pendiente: definir si el modal usa datos históricos reales para "vs. mes pasado" o se mockea por ahora (ver `SubscriptionContext`)
