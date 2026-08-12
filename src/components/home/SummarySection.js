import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ClockCountdown, ChartLineUp } from 'phosphor-react-native';
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

  // 2. Total del mes (= suma de todas las suscripciones activas)
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
      {/* ===== TARJETA 1: AZUL (IZQUIERDA) — suscripción más costosa ===== */}
      <View style={styles.cardDark}>
        <View style={styles.iconContainerDark}>
          <ClockCountdown weight="bold" size={18} color={colors.primary[500]} />
        </View>

        <Text style={styles.nameDark} numberOfLines={1}>
          {mostExpensiveName}
        </Text>

        <Text style={styles.priceRow} numberOfLines={1}>
          <Text style={styles.priceAmountDark}>{mostExpensivePrice}</Text>
          <Text style={styles.priceUnitDark}>/mes</Text>
        </Text>

        <Text style={styles.bottomLabelDark} numberOfLines={2}>
          Próximo Cobro
        </Text>
      </View>

      {/* ===== TARJETA 2: CLARA (DERECHA) — gasto mensual ===== */}
      <View style={styles.cardLight}>
        <View style={styles.iconContainerLight}>
          <ChartLineUp weight="bold" size={18} color={colors.purple[500]} />
        </View>

        <Text style={styles.nameLight} numberOfLines={1}>
          Gasto Mensual
        </Text>

        <Text style={styles.priceRow} numberOfLines={1}>
          <Text style={styles.priceAmountLight}>{formattedTotal}</Text>
          <Text style={styles.priceUnitLight}>/mes</Text>
        </Text>

        <Text style={styles.bottomLabelLight} numberOfLines={2}>
          {comparisonText}
        </Text>
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
    backgroundColor: semanticColors.background.cardSubtle,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: semanticColors.border.subtle,
    padding: spacing.lg,
    height: 184,
    justifyContent: 'flex-start',
  },
  iconContainerDark: {
    width: spacing['3xl'],
    height: spacing['3xl'],
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerLight: {
    width: spacing['3xl'],
    height: spacing['3xl'],
    borderRadius: borderRadius.sm,
    backgroundColor: colors.purple[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameDark: {
    ...typography.h3,
    color: semanticColors.text.inverse,
    marginTop: spacing.sm,
  },
  nameLight: {
    ...typography.h3,
    color: semanticColors.text.primary,
    marginTop: spacing.sm,
  },
  priceRow: {
    marginTop: spacing.xxs,
  },
  priceAmountDark: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: semanticColors.text.inverse,
  },
  priceUnitDark: {
    ...typography.bodyMedium,
    color: semanticColors.text.inverse,
  },
  priceAmountLight: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: semanticColors.text.primary,
  },
  priceUnitLight: {
    ...typography.bodyMedium,
    color: semanticColors.text.secondary,
  },
  bottomLabelDark: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.inverse,
    opacity: 0.85,
    height: spacing['4xl'],
    marginTop: 'auto',
  },
  bottomLabelLight: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.secondary,
    height: spacing['4xl'],
    marginTop: 'auto',
  },
});
