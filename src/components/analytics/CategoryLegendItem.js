import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function CategoryLegendItem({ color, label, amount }) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <Text style={styles.amount}>{`$${Number(amount).toLocaleString('es-AR')}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    ...typography.bodyMedium,
    fontWeight: '500',
    color: semanticColors.text.primary,
    flexShrink: 1,
  },
  amount: {
    ...typography.bodyMedium,
    fontWeight: '500',
    color: semanticColors.text.secondary,
  },
});
