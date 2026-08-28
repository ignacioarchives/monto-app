import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, semanticColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { useSubscriptions } from '../context/SubscriptionContext';
import { useFontsLoaded } from '../context/FontsContext';
import { MONTH_NAMES } from '../data/months';

export default function Header() {
  const { subscriptions } = useSubscriptions();
  const fontsLoaded = useFontsLoaded();

  // Total gastado este mes (misma lógica que usaba SummarySection)
  const totalAmount = subscriptions.reduce((sum, sub) => {
    return sum + (Number(sub.price) || 0);
  }, 0);
  const formattedTotal = `$${totalAmount.toLocaleString('es-AR')}`;
  const currentMonthName = MONTH_NAMES[new Date().getMonth()];

  if (!fontsLoaded) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.fallbackAmount}>{formattedTotal}</Text>
        <Text style={styles.fallbackLabel}>Gastados en {currentMonthName}</Text>
      </View>
    );
  }

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.heroAmount}>{formattedTotal}</Text>
      <Text style={styles.heroLabel}>Gastados en {currentMonthName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing['5xl'] + spacing.md, // 60
    marginBottom: spacing.xl,
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
