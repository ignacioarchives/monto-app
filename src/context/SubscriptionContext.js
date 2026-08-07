import React, { createContext, useState, useContext } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);

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
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => useContext(SubscriptionContext);