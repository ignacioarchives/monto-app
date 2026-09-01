import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';
import { MONTH_NAMES } from '../../data/months';
import ServiceIcon from '../ServiceIcon';

export default function SubscriptionCard({ subscription, onPress }) {
  const { name, price, icon, day } = subscription;
  const { calculateNextBillingDate } = useSubscriptions();
  const formattedPrice = `$${Number(price).toLocaleString('es-AR')}`;

  const nextBillingDate = calculateNextBillingDate(day);
  const nextBillingLabel = `${nextBillingDate.getDate()} de ${MONTH_NAMES[nextBillingDate.getMonth()]}`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <ServiceIcon serviceName={icon || name} size={40} />

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nextCharge}>
          Cobro el <Text style={styles.nextChargeDate}>{nextBillingLabel}</Text>
        </Text>
      </View>

      <Text style={styles.priceText}>{formattedPrice}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start', // el precio queda a la altura del título, no centrado contra las 2 líneas
    gap: spacing.lg, // 16, exacto a Figma
    width: '100%',
    padding: spacing.lg, // 16
    backgroundColor: colors.warm[50],
    borderWidth: 1,
    borderColor: colors.warm[100],
    borderRadius: borderRadius.lg, // 16, exacto a Figma
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.h3, // 18/24/semibold, exacto a Figma
    color: semanticColors.text.primary,
  },
  nextCharge: {
    ...typography.caption, // 12px, exacto a Figma
    fontWeight: fontWeights.regular,
    color: semanticColors.text.secondary,
  },
  nextChargeDate: {
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.primary,
  },
  priceText: {
    ...typography.bodyMedium, // 14px, exacto a Figma
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.primary,
  },
});
