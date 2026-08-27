import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DotsThreeVertical } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import SubscriptionCard from './SubscriptionCard';

export default function SubscriptionsList({ subscriptions }) {
  return (
    <View style={styles.container}>
      <View style={styles.sortRow}>
        <Text style={styles.sortText}>
          <Text style={styles.sortLabel}>Ordenar por: </Text>
          <Text style={styles.sortValue}>Precio (Mas alto)</Text>
        </Text>

        <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
          <DotsThreeVertical weight="bold" size={20} color={colors.warm[700]} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsList}>
        {subscriptions.length === 0 ? (
          <Text style={styles.emptyText}>No tenés suscripciones cargadas</Text>
        ) : (
          subscriptions.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} />
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: spacing['2xl'], // 24, mismo criterio que el resto de las secciones de la pantalla
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
  },
  sortText: {
    ...typography.bodyMedium,
  },
  sortLabel: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.medium,
    color: semanticColors.text.secondary,
  },
  sortValue: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.medium,
    color: semanticColors.text.primary,
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsList: {
    paddingHorizontal: spacing['2xl'],
    marginTop: spacing.lg, // 16
    gap: spacing.lg, // 16, mismo gap que NextPaymentSection
  },
  emptyText: {
    ...typography.bodyMedium,
    color: semanticColors.text.secondary,
  },
});
