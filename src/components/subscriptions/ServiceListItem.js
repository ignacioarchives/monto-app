import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CaretRight } from 'phosphor-react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import ServiceIcon from '../ServiceIcon';

export default function ServiceListItem({ service, onPress }) {
  return (
    <TouchableOpacity style={styles.serviceItem} onPress={onPress}>
      <View style={styles.serviceLeft}>
        <View style={styles.serviceIconWrapper}>
          <ServiceIcon serviceName={service.icon} size={40} />
        </View>
        <View>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceTag}>
            {service.plans ? `${service.plans.length} planes disponibles` : service.category}
          </Text>
        </View>
      </View>
      <CaretRight weight="bold" size={20} color={colors.warm[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.warm[75],
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIconWrapper: {
    marginRight: spacing.md,
  },
  serviceName: {
    ...typography.bodyLarge,
    fontWeight: fontWeights.semibold,
    color: colors.warm[900],
  },
  serviceTag: {
    ...typography.caption,
    color: colors.warm[400],
  },
});
