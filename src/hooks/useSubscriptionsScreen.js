import { useMemo, useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { TAGS } from '../components/subscriptions/AddSubscriptionModal';

export function useSubscriptionsScreen() {
  const { subscriptions, calculateNextBillingDate } = useSubscriptions();
  const [selectedTag, setSelectedTag] = useState('Todas');

  const tags = useMemo(() => ['Todas', ...TAGS], []);

  const filteredSubscriptions = useMemo(() => {
    if (selectedTag === 'Todas') return subscriptions;
    return subscriptions.filter((sub) => sub.tag === selectedTag);
  }, [subscriptions, selectedTag]);

  const nextCharge = useMemo(() => {
    if (subscriptions.length === 0) return null;

    const nextSub = subscriptions.reduce((closest, sub) => {
      return calculateNextBillingDate(sub.day) < calculateNextBillingDate(closest.day) ? sub : closest;
    }, subscriptions[0]);

    return calculateNextBillingDate(nextSub.day);
  }, [subscriptions, calculateNextBillingDate]);

  return {
    tags,
    selectedTag,
    setSelectedTag,
    filteredSubscriptions,
    nextCharge,
  };
}
