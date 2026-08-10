/**
 * Design System - Monto App
 * Tokens Primitivos de Color
 */
export const colorTokens = {
  // --- BRAND / PRIMARY (AZUL MONTO) ---
  'color-primary-100': '#DBEAFE',
  'color-primary-200': '#BFDBFE',
  'color-primary-300': '#93C5FD',
  'color-primary-400': '#60A5FA',
  'color-primary-500': '#2563EB',
  'color-primary-600': '#1D4ED8',
  'color-primary-700': '#1E40AF',
  'color-primary-800': '#1E3A8A',
  'color-primary-900': '#172554',

  // --- NEUTRALES & FONDOS CÁLIDOS ---5
  'color-white': '#FFFFFF',
  'color-warm-bg': '#F2F1ED',
  'color-warm-card-subtle': '#FBFAF8',
  'color-warm-element': '#EDEDED',
  'color-gray-400': '#94A3B8',
  'color-gray-500': '#64748B',
  'color-dark-text': '#1C1917',
  'color-dark-23': '#232323',
  'color-dark-900': '#0F172A',

  // --- GREEN / SUCCESS ---
  'color-green-100': '#DCFCE7',
  'color-green-500': '#16A34A',
  'color-green-700': '#15803D',

  // --- ORANGE / WARNING ---
  'color-orange-100': '#FEF3C7',
  'color-orange-500': '#F59E0B',
  'color-orange-700': '#B45309',

  // --- RED / DANGER ---
  'color-red-100': '#FEE2E2',
  'color-red-500': '#EF4444',
  'color-red-700': '#B91C1C',
};

// Acceso agrupado por categoría
export const colors = {
  primary: {
    100: colorTokens['color-primary-100'],
    200: colorTokens['color-primary-200'],
    300: colorTokens['color-primary-300'],
    400: colorTokens['color-primary-400'],
    500: colorTokens['color-primary-500'],
    600: colorTokens['color-primary-600'],
    700: colorTokens['color-primary-700'],
    800: colorTokens['color-primary-800'],
    900: colorTokens['color-primary-900'],
  },
  surface: {
    white: colorTokens['color-white'],
    warmBg: colorTokens['color-warm-bg'],
    warmCardSubtle: colorTokens['color-warm-card-subtle'],
    warmElement: colorTokens['color-warm-element'],
  },
  text: {
    darkPrimary: colorTokens['color-dark-text'],
    darkAlt: colorTokens['color-dark-23'],
    darkDeep: colorTokens['color-dark-900'],
    graySecondary: colorTokens['color-gray-500'],
    grayLight: colorTokens['color-gray-400'],
  },
  green: {
    100: colorTokens['color-green-100'],
    500: colorTokens['color-green-500'],
    700: colorTokens['color-green-700'],
  },
  orange: {
    100: colorTokens['color-orange-100'],
    500: colorTokens['color-orange-500'],
    700: colorTokens['color-orange-700'],
  },
  red: {
    100: colorTokens['color-red-100'],
    500: colorTokens['color-red-500'],
    700: colorTokens['color-red-700'],
  },
};

// Tokens Semánticos (Uso directo según intención)
export const semanticColors = {
  background: {
    screen: colors.surface.warmBg,
    card: colors.surface.white,
    cardSubtle: colors.surface.warmCardSubtle,
    pill: colors.surface.warmElement,
    pillActive: colors.text.darkPrimary,
  },
  text: {
    primary: colors.text.darkPrimary,
    secondary: colors.text.graySecondary,
    inverse: colors.surface.white,
    success: colors.green[500],
    warning: colors.orange[500],
    danger: colors.red[500],
  },
  border: {
    subtle: colors.surface.warmElement,
    focus: colors.primary[500],
  },
};

export default colors;