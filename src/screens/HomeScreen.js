import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { colors, semanticColors } from '../theme/colors';

// 1. Componente global
import Header from '../components/Header';

// 2. Componentes exclusivos de Home
import SummarySection from '../components/home/SummarySection';
import CalendarSection from '../components/home/CalendarSection';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContent}>
          <Header />
          <SummarySection />
          <CalendarSection /> 
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.screen,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  innerContent: {
    marginTop: -40,
  },
});