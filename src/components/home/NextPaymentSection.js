import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';
import SubscriptionCard from '../subscriptions/SubscriptionCard';

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export default function NextPaymentSection() {
  const { subscriptions, calculateNextBillingDate } = useSubscriptions();

  if (subscriptions.length === 0) {
    return null;
  }

  // Suscripción cuyo próximo cobro cae más cerca de hoy
  const nextSub = subscriptions.reduce((closest, sub) => {
    return calculateNextBillingDate(sub.day) < calculateNextBillingDate(closest.day) ? sub : closest;
  }, subscriptions[0]);

  const nextDate = calculateNextBillingDate(nextSub.day);
  const dateLabel = `${nextDate.getDate()} de ${monthNames[nextDate.getMonth()]}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        <Text style={styles.labelMuted}>Proximo cobro el </Text>
        <Text style={styles.labelDate}>{dateLabel}</Text>
      </Text>

      <SubscriptionCard subscription={nextSub} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing['2xl'], // 24, mismo margen de pantalla que el resto
    marginTop: spacing['2xl'], // 24, separación con CalendarSection (sin instrucción puntual, uso el mismo token que ya se repite en la pantalla)
    gap: spacing.lg, // 16, lo más cerca de los 17px que trae Figma
  },
  label: {
    ...typography.bodyMedium, // 14px base
  },
  labelMuted: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.medium,
    color: semanticColors.text.secondary,
  },
  labelDate: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.primary,
  },
});
