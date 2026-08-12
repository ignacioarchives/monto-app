import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { CheckCircle } from 'phosphor-react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export default function PlanCard({ name, price, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.planCard, selected && styles.planCardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.planName, selected && styles.planNameSelected]}>{name}</Text>
      <Text style={[styles.planPrice, selected && styles.planPriceSelected]}>${price}</Text>
      {selected && (
        <View style={styles.checkBadge}>
          <CheckCircle weight="bold" size={18} color={colors.primary[500]} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  planCard: {
    flex: 1,
    backgroundColor: colors.warm[50],
    borderWidth: 1.5,
    borderColor: colors.warm[150],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[100],
  },
  planName: {
    ...typography.caption,
    fontWeight: fontWeights.semibold,
    color: colors.warm[700],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  planNameSelected: {
    color: colors.primary[500],
  },
  planPrice: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.bold,
    color: colors.warm[900],
  },
  planPriceSelected: {
    color: colors.primary[500],
  },
  checkBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
});
