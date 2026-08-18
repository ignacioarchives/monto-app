import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { House, Cardholder, ChartPieSlice } from 'phosphor-react-native';
import { colors, semanticColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import { shadows } from '../theme/shadows';

const NAV_ITEMS = [
  { id: 'Home', label: 'Home', Icon: House },
  { id: 'Subscriptions', label: 'Suscripciones', Icon: Cardholder },
  { id: 'Analytics', label: 'Informe', Icon: ChartPieSlice },
];

// Altura compartida entre la barra y el botón de add, para que queden a la misma altura
const NAV_HEIGHT = spacing['5xl'] + spacing.lg;

export default function BottomNavBar({ state, navigation }) {
  const activeRouteName = state?.routes[state.index]?.name;

  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeRouteName === item.id;
          const IconComponent = item.Icon;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, isActive && styles.navItemActive]}
              onPress={() => navigation.navigate(item.id)}
              activeOpacity={0.7}
            >
              <IconComponent
                weight={isActive ? 'fill' : 'bold'}
                size={24}
                color={isActive ? colors.primary[500] : colors.warm[700]}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddSubscriptionModal')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={semanticColors.text.inverse} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    bottom: spacing['2xl'],
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    height: NAV_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.warm[0],
    borderWidth: 1,
    borderColor: colors.warm[150],
    borderRadius: borderRadius.xl, // 24, exacto a Figma (ya no es un pill 100% redondo)
    paddingHorizontal: spacing.lg,
    marginRight: spacing.sm,
    ...shadows.sm, // coincide exacto con la sombra del Figma (0,1,3, opacity 0.06)
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 20, // exacto a Figma, sin token que coincida
  },
  navItemActive: {
    backgroundColor: colors.primary[100],
  },
  label: {
    ...typography.badge,
    marginTop: spacing.xxs,
    color: colors.warm[700],
  },
  labelActive: {
    color: colors.primary[500],
  },
  addButton: {
    width: NAV_HEIGHT,
    height: NAV_HEIGHT,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});