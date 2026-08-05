import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View } from 'react-native';

import { colors } from './src/theme/colors';
import Header from './src/components/Header';
import SummarySection from './src/components/SummarySection';
import CalendarSection from './src/components/CalendarSection'; 
import BottomNavBar from './src/components/BottomNavBar'; 

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 👈 Envolvemos el contenido en esta View para forzar el subidón */}
        <View style={styles.innerContent}>
          <Header />
          <SummarySection />
          <CalendarSection /> 
        </View>
      </ScrollView>

      <BottomNavBar />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  innerContent: {
    marginTop: -15, // 👈 Ponemos -12px para que notes bien cómo sube todo de un tirón
  },
});