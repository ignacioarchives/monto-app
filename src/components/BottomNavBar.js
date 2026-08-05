import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// 🎨 Tus íconos SVG personalizados
import HouseIcon from '../assets/icons/house.svg';
import SubIcon from '../assets/icons/sub.svg';
import MetricIcon from '../assets/icons/metric.svg';
import UserIcon from '../assets/icons/user.svg';

const NAV_ITEMS = [
  { id: 'home', label: 'Inicio', IconComponent: HouseIcon },
  { id: 'subscriptions', label: 'Suscripciones', IconComponent: SubIcon },
  { id: 'add', isActionButton: true },
  { id: 'analytics', label: 'Estadísticas', IconComponent: MetricIcon },
  { id: 'settings', label: 'Ajustes', IconComponent: UserIcon },
];

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        // Renderizado del botón flotante (+)
        if (item.isActionButton) {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.addButton}
              onPress={() => console.log('Abrir modal agregar')}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
          );
        }

        const { IconComponent } = item;
        const isActive = activeTab === item.id;

        // Color del ícono: Azul (primary) cuando está activo, Gris cuando no
        const iconColor = isActive ? colors.primary : colors.textSecondary;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => setActiveTab(item.id)}
            activeOpacity={0.7}
          >
            {/* Pasamos el color dinámico al SVG */}
            <IconComponent 
              width={24} 
              height={24} 
              color={iconColor} 
            />

            {/* El estilo labelActive le aplica el color azul y la negrita (bold) */}
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
    color: colors.primary, // Color azul activo
    fontWeight: 'bold',    // 👈 Texto en negrita al estar activo
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