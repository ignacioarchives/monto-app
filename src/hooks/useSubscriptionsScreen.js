import { useMemo } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';

export function useSubscriptionsScreen() {
  const { subscriptions, calculateNextBillingDate } = useSubscriptions();

  // Ordenadas por precio, de mayor a menor (criterio fijo por ahora: "Precio (Mas alto)")
  const sortedSubscriptions = useMemo(() => {
    return [...subscriptions].sort((a, b) => Number(b.price) - Number(a.price));
  }, [subscriptions]);

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
  };
}
