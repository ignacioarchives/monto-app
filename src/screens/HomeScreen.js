import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { colors, semanticColors } from '../theme/colors';
import { spacing } from '../theme/spacing';

// Componentes de Home
import HomeTopBar from '../components/home/HomeTopBar';
import HeroSection from '../components/home/HeroSection';
import CalendarSection from '../components/home/CalendarSection';
import NextPaymentSection from '../components/home/NextPaymentSection';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContent}>
          <HomeTopBar />
          <HeroSection />
          <CalendarSection />
          <NextPaymentSection />
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
    paddingBottom: spacing['5xl'] * 2 + spacing.xxs, // 100
  },
  innerContent: {
    marginTop: spacing.xl, // 20, breathing room desde la safe area (antes lo daba el paddingTop de Header)
  },
});