import { useMemo, useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';

export const SORT_OPTIONS = [
  { key: 'price_desc', label: 'Precio (Más alto)' },
  { key: 'price_asc', label: 'Precio (Más bajo)' },
  { key: 'next_billing', label: 'Próxima a cobrarse' },
  { key: 'most_recent', label: 'Más reciente' },
];

export function useSubscriptionsScreen() {
  const { subscriptions, calculateNextBillingDate } = useSubscriptions();
  const [sortOption, setSortOption] = useState('price_desc');

  const sortedSubscriptions = useMemo(() => {
    const list = [...subscriptions];

    switch (sortOption) {
      case 'price_asc':
        return list.sort((a, b) => Number(a.price) - Number(b.price));
      case 'next_billing':
        return list.sort(
          (a, b) => calculateNextBillingDate(a.day) - calculateNextBillingDate(b.day)
        );
      case 'most_recent':
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'price_desc':
      default:
        return list.sort((a, b) => Number(b.price) - Number(a.price));
    }
  }, [subscriptions, sortOption, calculateNextBillingDate]);

  const nextCharge = useMemo(() => {
    if (subscriptions.length === 0) return null;

    const nextSub = subscriptions.reduce((closest, sub) => {
      return calculateNextBillingDate(sub.day) < calculateNextBillingDate(closest.day) ? sub : closest;
    }, subscriptions[0]);

    return calculateNextBillingDate(nextSub.day);
  }, [subscriptions, calculateNextBillingDate]);

  return {
    sortedSubscriptions,
    nextCharge,
    sortOption,
    setSortOption,
  };
}
