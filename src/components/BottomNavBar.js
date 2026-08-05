// src/components/BottomNavBar.js (Prueba rápida con Ionicons)
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const NAV_ITEMS = [
  { id: 'Home', label: 'Inicio', iconName: 'home-outline', iconActive: 'home' },
  { id: 'Subscriptions', label: 'Suscripciones', iconName: 'card-outline', iconActive: 'card' },
  { id: 'add', isActionButton: true },
  { id: 'Analytics', label: 'Estadísticas', iconName: 'stats-chart-outline', iconActive: 'stats-chart' },
  { id: 'User', label: 'Ajustes', iconName: 'person-outline', iconActive: 'person' },
];

export default function BottomNavBar({ state, navigation }) {
  const activeRouteName = state?.routes[state.index]?.name;

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        if (item.isActionButton) {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.addButton}
              onPress={() => navigation.navigate('AddSubscriptionModal')}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          );
        }

        const isActive = activeRouteName === item.id;
        const iconColor = isActive ? colors.primary : colors.textSecondary;
        const currentIcon = isActive ? item.iconActive : item.iconName;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.id)}
            activeOpacity={0.7}
          >
            <Ionicons name={currentIcon} size={24} color={iconColor} />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});