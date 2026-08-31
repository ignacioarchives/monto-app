import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { semanticColors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useSubscriptionsScreen } from '../hooks/useSubscriptionsScreen';

import HomeTopBar from '../components/home/HomeTopBar';
import NextChargeHero from '../components/subscriptions/NextChargeHero';
import SubscriptionsList from '../components/subscriptions/SubscriptionsList';

export default function SubscriptionsScreen() {
  const { sortedSubscriptions, nextCharge, sortOption, setSortOption } = useSubscriptionsScreen();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContent}>
          <HomeTopBar title="Mis Suscripciones" showConfigButton={false} />
          <NextChargeHero nextCharge={nextCharge} />
          <SubscriptionsList
            subscriptions={sortedSubscriptions}
            sortOption={sortOption}
            onChangeSortOption={setSortOption}
          />
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
    paddingBottom: spacing['5xl'] * 2 + spacing.xxs, // 100, mismo clearance que HomeScreen sobre el bottom nav
  },
  innerContent: {
    marginTop: spacing.xl, // 20, mismo criterio que HomeScreen
  },
});
