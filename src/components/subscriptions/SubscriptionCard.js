import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import ServiceIcon from '../ServiceIcon';

export default function SubscriptionCard({ subscription }) {
  const { name, tag, price, icon } = subscription;
  const formattedPrice = `$${Number(price).toLocaleString('es-AR')}`;

  return (
    <View style={styles.card}>
      <ServiceIcon serviceName={icon || name} size={40} />

      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tag}>{tag || 'Suscripción'}</Text>
      </View>

      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>{formattedPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
  tag: {
    ...typography.bodyLarge, // 16/24/regular, exacto a Figma
    color: semanticColors.text.secondary,
  },
  priceBadge: {
    backgroundColor: colors.green[100],
    borderWidth: 1,
    borderColor: colors.green[100],
    borderRadius: borderRadius.md, // 12, exacto a Figma
    paddingHorizontal: spacing.lg, // 16
    paddingVertical: spacing.xxs, // Figma trae py-12/h-24 que son incompatibles entre sí (el padding solo ya llena el alto); dejo que el contenido defina el alto
  },
  priceText: {
    fontSize: 12, // "Action M": 12px semibold, sin token exacto en typography.js
    fontWeight: fontWeights.semibold,
    color: colors.green[700],
  },
});
