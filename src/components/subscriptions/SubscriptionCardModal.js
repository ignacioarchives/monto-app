import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';
import { MONTH_NAMES } from '../../data/months';
import ServiceIcon from '../ServiceIcon';

// Variante de SubscriptionCard exclusiva del modal de cobros del día (CalendarSection).
// Se mantiene separada a propósito: los cambios acá no deben afectar la card de la
// lista principal de Suscripciones (SubscriptionCard.js).
export default function SubscriptionCardModal({ subscription }) {
  const { name, price, icon, day } = subscription;
  const { calculateNextBillingDate } = useSubscriptions();
  const formattedPrice = `$${Number(price).toLocaleString('es-AR')}`;

  const nextBillingDate = calculateNextBillingDate(day);
  const nextBillingLabel = `${nextBillingDate.getDate()} de ${MONTH_NAMES[nextBillingDate.getMonth()]}`;

  return (
    <View style={styles.card}>
      <ServiceIcon serviceName={icon || name} size={40} />

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nextCharge}>
          Cobro el <Text style={styles.nextChargeDate}>{nextBillingLabel}</Text>
        </Text>
      </View>

      <Text style={styles.priceText}>{formattedPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
    width: '100%',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.warm[100],
  },
  content: {
    flex: 1,
  },
  name: {
    ...typography.h3,
    color: semanticColors.text.primary,
  },
  nextCharge: {
    ...typography.caption,
    fontWeight: fontWeights.regular,
    color: semanticColors.text.secondary,
  },
  nextChargeDate: {
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.primary,
  },
  priceText: {
    ...typography.bodyMedium,
    lineHeight: typography.h3.lineHeight, // mismo alto de línea que el título, para que el texto quede a la misma altura
    fontWeight: fontWeights.semibold,
    color: semanticColors.text.primary,
  },
});
