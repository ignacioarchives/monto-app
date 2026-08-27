import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { semanticColors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useReportsScreen } from '../hooks/useReportsScreen';
import HomeTopBar from '../components/home/HomeTopBar';
import MonthSelector from '../components/analytics/MonthSelector';
import CategoryDonutChart from '../components/analytics/CategoryDonutChart';
import CategoryLegendItem from '../components/analytics/CategoryLegendItem';

export default function AnalyticsScreen() {
  const {
    monthLabel,
    totalLabel,
    categoryBreakdown,
    canGoPrev,
    canGoNext,
    goToPrevMonth,
    goToNextMonth,
  } = useReportsScreen();

  const half = Math.ceil(categoryBreakdown.length / 2);
  const leftColumn = categoryBreakdown.slice(0, half);
  const rightColumn = categoryBreakdown.slice(half);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContent}>
          <HomeTopBar title="Informe Mensual" showConfigButton={false} />

          <MonthSelector
            style={styles.monthSelectorSpacing}
            monthLabel={monthLabel}
            canGoPrev={canGoPrev}
            canGoNext={canGoNext}
            onPrev={goToPrevMonth}
            onNext={goToNextMonth}
          />

          <CategoryDonutChart
            style={styles.donutSpacing}
            data={categoryBreakdown}
            centerLabel={totalLabel}
          />

          <View style={[styles.legend, styles.legendSpacing]}>
            <View style={styles.legendColumn}>
              {leftColumn.map((item) => (
                <CategoryLegendItem key={item.key} color={item.color} label={item.label} amount={item.amount} />
              ))}
            </View>
            <View style={styles.legendColumn}>
              {rightColumn.map((item) => (
                <CategoryLegendItem key={item.key} color={item.color} label={item.label} amount={item.amount} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: semanticColors.background.screen },
  scrollContent: { paddingBottom: spacing['5xl'] * 2 + spacing.xxs },
  innerContent: { marginTop: spacing.xl },
  monthSelectorSpacing: { marginTop: spacing['2xl'] },
  // 65px exacto pedido para el espacio entre el selector de mes y el donut chart —
  // no coincide con ningún token de spacing.js
  donutSpacing: { marginTop: 65 },
  legend: {
    flexDirection: 'row',
    paddingHorizontal: spacing['2xl'],
    gap: spacing.xl,
  },
  // 50px exacto pedido para el espacio entre el donut chart y la lista de categorías —
  // no coincide con ningún token de spacing.js
  legendSpacing: { marginTop: 50 },
  legendColumn: {
    flex: 1,
    gap: spacing.lg,
  },
});
