import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FunnelSimple } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { SORT_OPTIONS } from '../../hooks/useSubscriptionsScreen';
import SubscriptionCard from './SubscriptionCard';
import SortMenu from './SortMenu';

export default function SubscriptionsList({ subscriptions, sortOption, onChangeSortOption, onPressSubscription }) {
  const menuButtonRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const sortLabel = SORT_OPTIONS.find((option) => option.key === sortOption)?.label ?? '';

  const openMenu = () => {
    menuButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      const screenWidth = Dimensions.get('window').width;
      setMenuAnchor({
        top: pageY + height + spacing.xs,
        right: screenWidth - (pageX + width),
      });
      setMenuVisible(true);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortRow}>
        <Text style={styles.sortText}>
          <Text style={styles.sortLabel}>Ordenar por: </Text>
          <Text style={styles.sortValue}>{sortLabel}</Text>
        </Text>

        <TouchableOpacity
          ref={menuButtonRef}
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={openMenu}
        >
          <FunnelSimple weight="bold" size={20} color={colors.warm[700]} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardsList}>
        {subscriptions.length === 0 ? (
          <Text style={styles.emptyText}>No tenés suscripciones cargadas</Text>
        ) : (
          subscriptions.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} onPress={() => onPressSubscription(sub)} />
          ))
        )}
      </View>

      <SortMenu
        visible={menuVisible}
        anchor={menuAnchor}
        selectedOption={sortOption}
        onSelect={onChangeSortOption}
        onClose={() => setMenuVisible(false)}
      />
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
