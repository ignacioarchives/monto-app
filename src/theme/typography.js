/**
 * Design System - Monto App
 * Tokens de Tipografía (Fuente: Inter)
 */

export const fontFamilies = {
  primary: 'Inter',
};

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const typographyTokens = {
  // Display (Montos Principales)
  'text-display-large': {
    fontFamily: fontFamilies.primary,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: fontWeights.bold,
  },
  'text-display-medium': {
    fontFamily: fontFamilies.primary,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: fontWeights.bold,
  },

  // Headings (Títulos)
  'text-heading-h1': {
    fontFamily: fontFamilies.primary,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: fontWeights.bold,
  },
  'text-heading-h2': {
    fontFamily: fontFamilies.primary,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: fontWeights.semibold,
  },
  'text-heading-h3': {
    fontFamily: fontFamilies.primary,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: fontWeights.semibold,
  },

  // Body (Cuerpo de texto)
  'text-body-large': {
    fontFamily: fontFamilies.primary,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeights.regular,
  },
  'text-body-medium': {
    fontFamily: fontFamilies.primary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.regular,
  },
  'text-body-small': {
    fontFamily: fontFamilies.primary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: fontWeights.regular,
  },

  // Captions & Labels
  'text-caption': {
    fontFamily: fontFamilies.primary,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.medium,
  },
  'text-label-badge': {
    fontFamily: fontFamilies.primary,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: fontWeights.semibold,
  },
};

// Acceso rápido estructurado (para autocompletado)
export const typography = {
  displayLarge: typographyTokens['text-display-large'],
  displayMedium: typographyTokens['text-display-medium'],
  h1: typographyTokens['text-heading-h1'],
  h2: typographyTokens['text-heading-h2'],
  h3: typographyTokens['text-heading-h3'],
  bodyLarge: typographyTokens['text-body-large'],
  bodyMedium: typographyTokens['text-body-medium'],
  bodySmall: typographyTokens['text-body-small'],
  caption: typographyTokens['text-caption'],
  badge: typographyTokens['text-label-badge'],
};

export default typography;