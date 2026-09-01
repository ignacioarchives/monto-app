import { useEffect, useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';
import { formatPriceDigits, sanitizePriceDigits, sanitizeDayDigits } from '../utils/subscriptionFormUtils';

export function useEditSubscriptionForm(subscription) {
  const { updateSubscription } = useSubscriptions();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [day, setDay] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('servicios');

  // Sincroniza los campos cuando cambia la sub a editar (no en cada apertura/cierre del
  // modal, que sigue montado con visible=false — solo cuando realmente cambia el id).
  useEffect(() => {
    if (!subscription) return;
    setName(subscription.name);
    setPrice(formatPriceDigits(String(subscription.price)));
    setDay(String(subscription.day));
    setSelectedCategory(subscription.category);
  }, [subscription?.id]);

  // onChangeText del campo de precio: sanitiza (con tope de MAX_CUSTOM_PRICE) y formatea en cada tecleo
  const handlePriceChange = (text) => {
    setPrice((previousFormatted) => {
      const previousDigits = previousFormatted.replace(/\D/g, '');
      const sanitizedDigits = sanitizePriceDigits(text, previousDigits);
      return formatPriceDigits(sanitizedDigits);
    });
  };

  // onChangeText del campo de día: solo dígitos, y solo valores entre 1 y 31
  const handleDayChange = (text) => {
    setDay((previousDay) => sanitizeDayDigits(text, previousDay));
  };

  // Devuelve true si guardó, false si faltaban campos — así el componente sabe si cerrar el modal.
  const handleSave = () => {
    if (!name || !price || !day) return false;

    updateSubscription(subscription.id, {
      name,
      price: parseInt(price.replace(/\D/g, ''), 10) || 0,
      day: parseInt(day, 10),
      category: selectedCategory,
    });

    return true;
  };

  return {
    name,
    setName,
    price,
    day,
    selectedCategory,
    setSelectedCategory,
    handlePriceChange,
    handleDayChange,
    handleSave,
  };
}
