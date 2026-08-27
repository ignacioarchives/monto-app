import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CaretLeft, CaretRight } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export default function MonthSelector({ monthLabel, canGoPrev, canGoNext, onPrev, onNext, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>
        <Text style={styles.labelMuted}>Mes de </Text>
        <Text style={styles.labelStrong}>{monthLabel}</Text>
      </Text>

      <View style={styles.arrows}>
        <TouchableOpacity
          style={[styles.arrowButton, !canGoPrev && styles.arrowButtonDisabled]}
          onPress={onPrev}
          disabled={!canGoPrev}
          activeOpacity={0.7}
        >
          <CaretLeft weight="bold" size={16} color={canGoPrev ? colors.primary[500] : colors.warm[400]} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.arrowButton, !canGoNext && styles.arrowButtonDisabled]}
          onPress={onNext}
          disabled={!canGoNext}
          activeOpacity={0.7}
        >
          <CaretRight weight="bold" size={16} color={canGoNext ? colors.primary[500] : colors.warm[400]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
  },
  label: {
    ...typography.h3,
  },
  labelMuted: {
    color: semanticColors.text.secondary,
  },
  labelStrong: {
    color: semanticColors.text.primary,
  },
  arrows: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  arrowButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButtonDisabled: {
    backgroundColor: colors.warm[150],
  },
});
