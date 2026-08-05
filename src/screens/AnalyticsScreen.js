import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas y Gastos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E' },
});