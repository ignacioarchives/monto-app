import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';
import { useFontsLoaded } from '../../context/FontsContext';

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export default function HeroSection() {
  const { subscriptions } = useSubscriptions();
  const fontsLoaded = useFontsLoaded();

  const totalAmount = subscriptions.reduce((sum, sub) => {
    return sum + (Number(sub.price) || 0);
  }, 0);
  const formattedTotal = `$${totalAmount.toLocaleString('es-AR')}`;
  const currentMonthName = monthNames[new Date().getMonth()];

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.fallbackAmount}>{formattedTotal}</Text>
        <Text style={styles.fallbackLabel}>Gastados en {currentMonthName}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heroAmount}>{formattedTotal}</Text>
      <Text style={styles.heroLabel}>Gastados en {currentMonthName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['2xl'],
    marginTop: spacing['2xl'], // 24, separación con HomeTopBar
  },
  heroAmount: {
    ...typography.displayHeroNumber,
    color: colors.primary[500],
  },
  heroLabel: {
    ...typography.displayHeroLabel,
    color: semanticColors.text.primary,
    marginTop: spacing.xs,
  },
  fallbackAmount: {
    ...typography.displayLarge,
    color: colors.primary[500],
  },
  fallbackLabel: {
    ...typography.h2,
    color: semanticColors.text.primary,
    marginTop: spacing.xs,
  },
});
