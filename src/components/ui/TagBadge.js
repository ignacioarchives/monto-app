import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

// `icon` (opcional) reemplaza al punto de color — se usa para el chip especial "Añadir".
export default function TagBadge({ label, selected, onPress, activeColor, icon }) {
  return (
    <TouchableOpacity
      style={[styles.tagBadge, selected && activeColor && { borderColor: activeColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon ? icon : <View style={[styles.dot, { backgroundColor: activeColor }]} />}
      <Text style={styles.tagText}>{label}</Text>
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
  tagText: {
    ...typography.caption,
    color: colors.warm[700],
  },
});
