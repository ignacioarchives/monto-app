import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext();

const SUBSCRIPTIONS_STORAGE_KEY = '@monto/subscriptions';
const MONTHLY_HISTORY_STORAGE_KEY = '@monto/monthlyHistory';

const CATEGORY_KEYS = [
  'streaming',
  'servicios',
  'musica',
  'educacion',
  'alquiler',
  'salud',
  'hogar',
  'finanzas',
];

// Clave de mes en formato "YYYY-MM", usada para indexar monthlyHistory
const getMonthKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

// Snapshot del mes actual: total y desglose por categoría a partir de las subscriptions activas
const buildMonthSnapshot = (subscriptions) => {
  const categoryTotals = CATEGORY_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  let total = 0;
  subscriptions.forEach((sub) => {
    const amount = Number(sub.price) || 0;
    total += amount;
    if (sub.category && categoryTotals[sub.category] !== undefined) {
      categoryTotals[sub.category] += amount;
    }
  });

  return { total, categoryTotals };
};

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [monthlyHistory, setMonthlyHistory] = useState({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar subscriptions y monthlyHistory persistidos al montar
  useEffect(() => {
    const hydrate = async () => {
      try {
        const [storedSubs, storedHistory] = await Promise.all([
          AsyncStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY),
          AsyncStorage.getItem(MONTHLY_HISTORY_STORAGE_KEY),
        ]);
        if (storedSubs) setSubscriptions(JSON.parse(storedSubs));
        if (storedHistory) setMonthlyHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.warn('No se pudo cargar el estado persistido de suscripciones', error);
      } finally {
        setIsHydrated(true);
      }
    };
    hydrate();
  }, []);

  // Persistir subscriptions en cada cambio (una vez hidratado, para no pisar el storage con [])
  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(subscriptions)).catch((error) =>
      console.warn('No se pudo guardar subscriptions', error)
    );
  }, [subscriptions, isHydrated]);

  // Recalcular y persistir el snapshot del mes actual cada vez que cambian las subscriptions.
  // Los meses ya cerrados nunca se vuelven a tocar acá — quedan congelados tal cual quedaron.
  useEffect(() => {
    if (!isHydrated) return;
    const currentMonthKey = getMonthKey();
    const snapshot = buildMonthSnapshot(subscriptions);

    setMonthlyHistory((prev) => {
      const next = { ...prev, [currentMonthKey]: snapshot };
      AsyncStorage.setItem(MONTHLY_HISTORY_STORAGE_KEY, JSON.stringify(next)).catch((error) =>
        console.warn('No se pudo guardar monthlyHistory', error)
      );
      return next;
    });
  }, [subscriptions, isHydrated]);

  // Función para agregar una suscripción
  const addSubscription = (newSub) => {
    setSubscriptions((prev) => [...prev, newSub]);
  };

  // Función para eliminar
  const deleteSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
  };

  // Helper: Función que calcula la fecha exacta del próximo cobro
  const calculateNextBillingDate = (dayOfPayment) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 a 11
    const currentDay = today.getDate();

    let targetMonth = currentMonth;
    let targetYear = currentYear;

    // Si el día de cobro ya pasó este mes, el próximo cobro es el mes que viene
    if (dayOfPayment < currentDay) {
      targetMonth += 1;
      if (targetMonth > 11) {
        targetMonth = 0;
        targetYear += 1;
      }
    }

    return new Date(targetYear, targetMonth, dayOfPayment);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        deleteSubscription,
        calculateNextBillingDate,
        monthlyHistory,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => useContext(SubscriptionContext);
