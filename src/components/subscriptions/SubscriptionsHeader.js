import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { semanticColors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

export default function SubscriptionsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Suscripciones</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['2xl'], // 24, mismo padding horizontal que el resto de las secciones
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
    color: semanticColors.text.primary,
  },
});
