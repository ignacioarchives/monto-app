import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export default function NextChargeHero({ nextCharge }) {
  if (!nextCharge) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No hay cobros este mes</Text>
      </View>
    );
  }

  const dateLabel = `${nextCharge.getDate()} de ${monthNames[nextCharge.getMonth()]}`;

  return (
    <View style={styles.container}>
      <Text style={styles.heroText}>
        <Text style={styles.heroLead}>Tu próximo cobro es el </Text>
        <Text style={styles.heroDate}>{dateLabel}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['2xl'],
    marginTop: spacing['2xl'],
  },
  heroText: {
    // el wrapping Text solo agrupa los dos spans, sin estilo propio
  },
  heroLead: {
    ...typography.displayHeroLabel,
    color: semanticColors.text.primary,
  },
  heroDate: {
    ...typography.displayHeroNumber,
    color: colors.primary[500],
  },
  emptyText: {
    ...typography.h2,
    color: semanticColors.text.secondary,
  },
});
