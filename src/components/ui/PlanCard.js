import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

// brandName/brandColor: nombre y color de marca del servicio (ver ServiceIcon.getServiceColor),
// name/price: nombre y precio del plan puntual dentro de ese servicio.
export default function PlanCard({ brandName, brandColor, name, price, selected, onPress }) {
  const formattedPrice = Number(price).toLocaleString('es-AR');

  return (
    <TouchableOpacity
      style={[styles.planCard, selected && styles.planCardSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.planTitle} numberOfLines={1}>
        <Text style={[styles.brandName, { color: brandColor }]}>{brandName} </Text>
        <Text style={styles.planName}>{name}</Text>
      </Text>
      <Text style={styles.planPrice}>
        <Text style={styles.priceAmount}>${formattedPrice}</Text>
        <Text style={styles.priceUnit}> /m</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  planCard: {
    width: 152,
    height: 95,
    backgroundColor: colors.warm[0],
    borderWidth: 2,
    borderColor: colors.warm[100],
    borderRadius: 15,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  planCardSelected: {
    borderColor: colors.primary[300],
  },
  planTitle: {
    ...typography.bodyLarge,
  },
  brandName: {
    fontWeight: fontWeights.bold,
  },
  planName: {
    fontWeight: fontWeights.semibold,
    color: colors.text.darkAlt,
  },
  planPrice: {
    marginTop: spacing.xs,
  },
  priceAmount: {
    ...typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.text.darkAlt,
  },
  priceUnit: {
    ...typography.caption,
    color: colors.warm[400],
  },
});
