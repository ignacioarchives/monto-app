import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography, fontWeights } from '../theme/typography';

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil / Configuración</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.warm[50] },
  title: { ...typography.h3, fontWeight: fontWeights.bold, color: colors.warm[900] },
});