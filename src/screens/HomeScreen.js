// src/screens/HomeScreen.js
import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, ScrollView, View } from 'react-native';

import { colors } from '../theme/colors';
import Header from '../components/Header';
import SummarySection from '../components/SummarySection';
import CalendarSection from '../components/CalendarSection';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

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
    flex: 1, // 👈 Debe tener flex: 1
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  innerContent: {
    marginTop: -15,
  },
});