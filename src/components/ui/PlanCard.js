import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { CheckCircle } from 'phosphor-react-native';
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
      {selected && (
        <View style={styles.checkBadge}>
          <CheckCircle weight="bold" size={16} color={colors.primary[500]} />
        </View>
      )}
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
    position: 'relative',
  },
  planCardSelected: {
    borderColor: colors.primary[500],
  },
  planTitle: {
    ...typography.bodyLarge,
  },
  brandName: {
    fontWeight: fontWeights.bold,
  },
  planName: {
    color: colors.text.darkAlt,
  },
  planPrice: {
    marginTop: spacing.xs,
  },
  priceAmount: {
    ...typography.bodyLarge,
    color: colors.text.darkAlt,
  },
  priceUnit: {
    ...typography.caption,
    color: colors.warm[400],
  },
  checkBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
});
