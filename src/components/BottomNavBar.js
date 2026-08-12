import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, semanticColors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';

const NAV_ITEMS = [
  { id: 'Home', label: 'Home', iconName: 'home-outline', iconActive: 'home' },
  { id: 'Subscriptions', label: 'Suscripciones', iconName: 'wallet-outline', iconActive: 'wallet' },
  { id: 'Analytics', label: 'Informe', iconName: 'pie-chart-outline', iconActive: 'pie-chart' },
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
          const currentIcon = isActive ? item.iconActive : item.iconName;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, isActive ? styles.navItemActive : styles.navItemInactive]}
              onPress={() => navigation.navigate(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons name={currentIcon} size={24} color={semanticColors.text.inverse} />
              <Text style={styles.label}>{item.label}</Text>
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
    backgroundColor: semanticColors.background.pillActive,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    marginRight: spacing.sm,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  navItemInactive: {
    opacity: 0.6,
  },
  navItemActive: {
    backgroundColor: colors.primary[500],
  },
  label: {
    ...typography.badge,
    marginTop: spacing.xxs,
    color: semanticColors.text.inverse,
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