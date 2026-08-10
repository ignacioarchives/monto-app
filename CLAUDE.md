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
  theme/        → Design tokens (fuente de verdad: src/theme/index.js)
  context/      → Contextos de React (estado global)
  components/   → Componentes reutilizables de UI
  screens/      → Pantallas de la app (Home, Suscripciones, Analytics...)
  navigation/   → Configuración de navegación (AppNavigator, Bottom Tabs)
```

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

**Estados semánticos** — `colors.green` / `colors.orange` / `colors.red`
| Estado | 100 (claro) | 500 (base) | 700 (fuerte) |
|---|---|---|---|
| Success (verde) | `#DCFCE7` | `#16A34A` | `#15803D` |
| Warning (naranja) | `#FEF3C7` | `#F59E0B` | `#B45309` |
| Danger (rojo) | `#FEE2E2` | `#EF4444` | `#B91C1C` |

⚠️ Nota de naming: los estados semánticos se llaman **`green` / `orange` / `red`** en el código
(no `success` / `warning` / `error`). Usar estos nombres exactos al pedirle cambios a Claude Code.

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

## Patrones de UX ya definidos (no rediseñar sin consultar)
- **Búsqueda Dinámica con Fallback** (pantalla de añadir suscripción): el usuario busca un servicio;
  si no existe en la base de datos, aparece dinámicamente la opción "Crear suscripción personalizada"
  sin recargar visualmente la interfaz. Inspirado en patrones de Apple/Stripe.
- Se priorizó jerarquía visual limpia: se eliminaron controles segmentados ambiguos en la pantalla
  de búsqueda para mantener el foco directo en la acción principal.

## Convenciones de trabajo
- **No hacer refactors masivos en un solo pedido.** Migrar de a un componente por vez, probar, y recién pasar al siguiente.
- Antes de aplicar cambios grandes (ej. migrar estilos a tokens), usar modo **Plan** para revisar el approach primero.
- Cualquier color/tamaño/espaciado nuevo debe agregarse primero en `src/theme/colors.js`, `typography.js` o `spacing.js` (no directo en el componente), y exportarse a través de `src/theme/index.js`.
- Al migrar un componente, preferir los objetos semánticos/agrupados (`semanticColors`, `colors`, `typography`, `spacing`, `borderRadius`) por sobre los tokens primitivos planos (`colorTokens`, `spacingTokens`, etc.).
- Los estados semánticos se llaman `green` / `orange` / `red` en el código (no `success` / `warning` / `error`) — usar esos nombres.

## Errores conocidos / cosas ya resueltas
- Se resolvieron bloqueos al correr el proyecto con Expo Web: pantallas en blanco, rutas de
  importación relativas mal armadas, y problemas con exportaciones por defecto (default exports).
  Si reaparece un problema similar, revisar primero rutas de import y default vs named exports.

## Estado actual del proyecto
- ✅ UX y flujos diseñados en Figma (incluye pantalla de añadir suscripción)
- ✅ Design tokens completos: colores, tipografía, espaciado y radios (`colors.js`, `typography.js`, `spacing.js`)
- ✅ Estructura de carpetas y navegación base configurada
- 🔄 Próximo paso: migrar componentes existentes para consumir estos tokens
  (en vez de estilos sueltos por componente) — hacerlo de a un componente por vez
