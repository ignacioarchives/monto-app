import { useMemo, useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { REPORT_CATEGORIES } from '../data/categories';

const MONTH_NAMES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const getMonthKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const getMonthLabel = (monthKey) => {
  const [, month] = monthKey.split('-');
  return MONTH_NAMES[Number(month) - 1];
};

// Formato abreviado para el total central del donut (ej. $11.3K, $850)
const formatCurrencyShort = (amount) => {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `$${Number(amount).toLocaleString('es-AR')}`;
};

export function useReportsScreen() {
  const { monthlyHistory } = useSubscriptions();

  const availableMonthKeys = useMemo(() => Object.keys(monthlyHistory).sort(), [monthlyHistory]);

  const [selectedMonthKey, setSelectedMonthKey] = useState(getMonthKey());

  const selectedIndex = availableMonthKeys.indexOf(selectedMonthKey);
  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex !== -1 && selectedIndex < availableMonthKeys.length - 1;

  const goToPrevMonth = () => {
    if (canGoPrev) setSelectedMonthKey(availableMonthKeys[selectedIndex - 1]);
  };

  const goToNextMonth = () => {
    if (canGoNext) setSelectedMonthKey(availableMonthKeys[selectedIndex + 1]);
  };

  const report = monthlyHistory[selectedMonthKey] || { total: 0, categoryTotals: {} };

  const categoryBreakdown = useMemo(
    () =>
      REPORT_CATEGORIES.map(({ key, label, color }) => ({
        key,
        label,
        color,
        amount: report.categoryTotals[key] || 0,
      })),
    [report]
  );

  return {
    monthLabel: getMonthLabel(selectedMonthKey),
    total: report.total,
    totalLabel: formatCurrencyShort(report.total),
    categoryBreakdown,
    canGoPrev,
    canGoNext,
    goToPrevMonth,
    goToNextMonth,
  };
}
