import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

// `icon` (opcional) reemplaza al punto de color — se usa para el chip especial "Añadir".
export default function TagBadge({ label, selected, onPress, activeColor, icon }) {
  const dotColor = selected ? colors.primary[300] : activeColor;

  return (
    <TouchableOpacity
      style={[styles.tagBadge, selected && styles.tagBadgeSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon ? icon : <View style={[styles.dot, { backgroundColor: dotColor }]} />}
      <Text style={[styles.tagText, selected && styles.tagTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.warm[75],
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: borderRadius.full,
    marginRight: spacing.xs,
  },
  tagBadgeSelected: {
    borderColor: colors.primary[300],
  },
  tagText: {
    ...typography.caption,
    color: colors.warm[700],
  },
  tagTextSelected: {
    color: colors.primary[300],
  },
});
