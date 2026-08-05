import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 1. IMPORTAMOS TUS COLORES GLOBALES
import { colors } from '../theme/colors';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>5 Suscripciones</Text>
      <Text style={styles.subtitle}>Próximo cobro →</Text>
      <Text style={styles.dateBlue}>10 de abril</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.textPrimary, // <-- Usamos la variable global
    lineHeight: 40,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.textPrimary, // <-- Usamos la variable global
    lineHeight: 40,
  },
  dateBlue: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.primary, // <-- Usamos el azul global
    lineHeight: 40,
  },
});