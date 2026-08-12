import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export default function TagBadge({ label, selected, onPress }) {
  return (
    <TouchableOpacity style={[styles.tagBadge, selected && styles.activeTagBadge]} onPress={onPress}>
      <Text style={[styles.tagText, selected && styles.activeTagText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.warm[75],
    marginRight: spacing.sm,
  },
  activeTagBadge: {
    backgroundColor: colors.primary[500],
  },
  tagText: {
    ...typography.caption,
    color: colors.warm[700],
  },
  activeTagText: {
    color: colors.warm[0],
    fontWeight: fontWeights.bold,
  },
});
