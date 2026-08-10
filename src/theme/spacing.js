// src/theme/spacing.js

/**
 * Design System - Monto App
 * Tokens de Espaciado y Radios de Borde
 */

export const spacingTokens = {
  'spacing-2': 2,
  'spacing-4': 4,
  'spacing-8': 8,
  'spacing-12': 12,
  'spacing-16': 16,
  'spacing-20': 20,
  'spacing-24': 24,
  'spacing-32': 32,
  'spacing-40': 40,
  'spacing-48': 48,
};

export const borderRadiusTokens = {
  'radius-xs': 4,
  'radius-sm': 8,
  'radius-md': 12,
  'radius-lg': 16,
  'radius-xl': 24,
  'radius-full': 9999,
};

// Aliases para nombres semánticos cortos
export const spacing = {
  xxs: spacingTokens['spacing-2'],
  xs: spacingTokens['spacing-4'],
  sm: spacingTokens['spacing-8'],
  md: spacingTokens['spacing-12'],
  lg: spacingTokens['spacing-16'],
  xl: spacingTokens['spacing-20'],
  '2xl': spacingTokens['spacing-24'],
  '3xl': spacingTokens['spacing-32'],
  '4xl': spacingTokens['spacing-40'],
  '5xl': spacingTokens['spacing-48'],
};

export const borderRadius = {
  xs: borderRadiusTokens['radius-xs'],
  sm: borderRadiusTokens['radius-sm'],
  md: borderRadiusTokens['radius-md'],
  lg: borderRadiusTokens['radius-lg'],
  xl: borderRadiusTokens['radius-xl'],
  full: borderRadiusTokens['radius-full'],
};

export default {
  spacingTokens,
  borderRadiusTokens,
  spacing,
  borderRadius,
};