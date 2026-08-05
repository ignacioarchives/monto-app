import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
// 1. Usamos la SafeAreaView oficial de Expo/React Native Safe Area
import { SafeAreaView } from 'react-native-safe-area-context';
// 2. Usamos la StatusBar oficial de Expo
import { StatusBar } from 'expo-status-bar';

import { colors } from '../theme/colors';
import Header from '../components/Header';
import SummarySection from '../components/SummarySection';
import CalendarSection from '../components/CalendarSection';

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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  innerContent: {
    marginTop: 10,
  },
});