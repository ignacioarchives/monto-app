import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';

export default function SummarySection() {
  const { subscriptions } = useSubscriptions();

  // 1. Suscripción más costosa
  let mostExpensiveName = 'Sin datos';
  let mostExpensivePrice = '';

  if (subscriptions.length > 0) {
    const mostExpensive = subscriptions.reduce((max, sub) => {
      return (Number(sub.price) || 0) > (Number(max.price) || 0) ? sub : max;
    }, subscriptions[0]);

    if (mostExpensive && mostExpensive.name) {
      mostExpensiveName = mostExpensive.name;
      mostExpensivePrice = `$${Number(mostExpensive.price).toLocaleString('es-AR')}`;
    }
  }

  // 2. Total del mes
  const totalAmount = subscriptions.reduce((sum, sub) => {
    return sum + (Number(sub.price) || 0);
  }, 0);
  const formattedTotal = `$${totalAmount.toLocaleString('es-AR')}`;

  // 3. Comparación con el mes pasado — placeholder: SubscriptionContext aún no
  // guarda histórico mensual (billingHistory), así que no hay con qué comparar todavía.
  const lastMonthTotal = null;
  const comparisonText =
    lastMonthTotal === null
      ? 'Sin datos del mes pasado'
      : `${totalAmount - lastMonthTotal >= 0 ? '+' : '-'}${Math.abs(
          totalAmount - lastMonthTotal
        ).toLocaleString('es-AR')} /mes pasado`;

  return (
    <View style={styles.container}>
      {/* ===== TARJETA 1: OSCURA (IZQUIERDA) — suscripción más costosa ===== */}
      <View style={styles.cardDark}>
        <View style={styles.iconCircleDark} />

        <Text style={styles.nameDark} numberOfLines={1}>
          {mostExpensiveName}
        </Text>

        <Text style={styles.priceRow} numberOfLines={1}>
          <Text style={styles.priceAmountDark}>{mostExpensivePrice}</Text>
          <Text style={styles.priceUnitDark}>/mes</Text>
        </Text>

        <Text style={styles.bottomLabelDark}>Más costosa</Text>
      </View>

      {/* ===== TARJETA 2: CLARA (DERECHA) — total del mes ===== */}
      <View style={styles.cardLight}>
        <View style={styles.iconCircleLight} />

        <Text style={styles.nameLight} numberOfLines={1}>
          Total del mes
        </Text>

        <Text style={styles.amountLight} numberOfLines={1}>
          {formattedTotal}
        </Text>

        <Text style={styles.bottomLabelLight}>{comparisonText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing['2xl'],
  },
  cardDark: {
    flex: 1,
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    height: 184,
    justifyContent: 'flex-start',
  },
  cardLight: {
    flex: 1,
    backgroundColor: semanticColors.background.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: semanticColors.border.subtle,
    padding: spacing.lg,
    height: 184,
    justifyContent: 'flex-start',
  },
  iconCircleDark: {
    width: spacing['2xl'],
    height: spacing['2xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface.warmCardSubtle,
  },
  iconCircleLight: {
    width: spacing['2xl'],
    height: spacing['2xl'],
    borderRadius: borderRadius.full,
    backgroundColor: semanticColors.background.pill,
  },
  nameDark: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: semanticColors.text.inverse,
    marginTop: spacing.xs,
  },
  nameLight: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: semanticColors.text.primary,
    marginTop: spacing.xs,
  },
  priceRow: {
    marginTop: spacing.xxs,
  },
  priceAmountDark: {
    ...typography.h3,
    color: semanticColors.text.inverse,
  },
  priceUnitDark: {
    ...typography.bodyMedium,
    color: semanticColors.text.inverse,
    opacity: 0.7,
  },
  amountLight: {
    ...typography.displayMedium,
    color: colors.primary[500],
    marginTop: spacing.xxs,
  },
  bottomLabelDark: {
    ...typography.caption,
    color: semanticColors.text.inverse,
    opacity: 0.6,
    marginTop: 'auto',
  },
  bottomLabelLight: {
    ...typography.caption,
    color: semanticColors.text.secondary,
    marginTop: 'auto',
  },
});
