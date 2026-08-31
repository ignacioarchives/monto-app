import { useState } from 'react';
import { useSubscriptions } from '../context/SubscriptionContext';

// Lista de plataformas populares con sus planes correspondientes.
// El campo "icon" es el slug de Simple Icons (ver components/ServiceIcon.js) — solo se
// listan servicios que tienen ícono de marca disponible.
const POPULAR_SERVICES = [
  {
    id: 'p1',
    name: 'Netflix',
    icon: 'netflix',
    category: 'Entretenimiento',
    defaultCategory: 'servicios',
    plans: [
      { id: 'n1', name: 'Estándar c/anuncios', price: '2499' },
      { id: 'n2', name: 'Estándar', price: '4199' },
      { id: 'n3', name: 'Premium', price: '5799' },
    ],
  },
  {
    id: 'p2',
    name: 'YouTube',
    icon: 'youtube',
    category: 'Entretenimiento',
    defaultCategory: 'servicios',
    plans: [
      { id: 'y1', name: 'Estudiante', price: '1090' },
      { id: 'y2', name: 'Individual', price: '1890' },
      { id: 'y3', name: 'Familiar', price: '3690' },
    ],
  },
  {
    id: 'p3',
    name: 'Spotify',
    icon: 'spotify',
    category: 'Música',
    defaultCategory: 'servicios',
    plans: [
      { id: 's1', name: 'Estudiante', price: '1290' },
      { id: 's2', name: 'Individual', price: '2490' },
      { id: 's3', name: 'Familiar', price: '4190' },
    ],
  },
  {
    id: 'p4',
    name: 'PlayStation',
    icon: 'playstation',
    category: 'Gaming',
    defaultCategory: 'servicios',
    plans: [
      { id: 'ps1', name: 'Essential', price: '6999' },
      { id: 'ps2', name: 'Extra', price: '10499' },
      { id: 'ps3', name: 'Deluxe', price: '11999' },
    ],
  },
  {
    id: 'p5',
    name: 'HBO',
    icon: 'hbomax',
    category: 'Entretenimiento',
    defaultCategory: 'servicios',
    plans: [
      { id: 'h1', name: 'Básico con anuncios', price: '2190' },
      { id: 'h2', name: 'Estándar', price: '3290' },
      { id: 'h3', name: 'Platino', price: '4390' },
    ],
  },
  {
    id: 'p6',
    name: 'Apple TV',
    icon: 'appletv',
    category: 'Entretenimiento',
    defaultCategory: 'servicios',
    plans: [
      { id: 'ap1', name: 'Individual', price: '3500' },
      { id: 'ap2', name: 'Apple One', price: '7900' },
    ],
  },
  {
    id: 'p7',
    name: 'Claude',
    icon: 'claude',
    category: 'Tecnología',
    defaultCategory: 'servicios',
    plans: [
      { id: 'cl1', name: 'Pro', price: '15000' },
      { id: 'cl2', name: 'Max', price: '35000' },
    ],
  },
  {
    id: 'p8',
    name: 'Uber',
    icon: 'uber',
    category: 'Otros',
    defaultCategory: 'servicios',
    plans: [
      { id: 'ub1', name: 'Mensual', price: '4990' },
    ],
  },
];

const MAX_CUSTOM_PRICE = 2000000;

// Igual criterio que sanitizeDayDigits: si el próximo dígito haría superar el máximo
// permitido para una suscripción personalizada, lo ignora y mantiene el valor anterior.
function sanitizePriceDigits(rawValue, previousDigits) {
  const digitsOnly = rawValue.replace(/\D/g, '');
  if (!digitsOnly) return '';
  const numeric = parseInt(digitsOnly, 10);
  if (numeric > MAX_CUSTOM_PRICE) return previousDigits;
  return digitsOnly;
}

// Formatea dígitos con puntos como separador de miles (ej. "15000" -> "15.000")
// y descarta cualquier caracter que no sea número — así una coma u otro símbolo
// que se cuele no rompe el parseo al guardar.
function formatPriceDigits(rawValue) {
  const digitsOnly = rawValue.replace(/\D/g, '');
  if (!digitsOnly) return '';
  return digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Solo deja pasar dígitos (nada de comas/símbolos) y valores de día válidos (1 a 31).
// Si el próximo dígito haría un número fuera de rango (ej. "35"), lo ignora y
// mantiene el valor anterior en vez de aceptar un día inválido.
function sanitizeDayDigits(rawValue, previousValue) {
  const digitsOnly = rawValue.replace(/\D/g, '').slice(0, 2);
  if (digitsOnly === '') return '';
  const numeric = parseInt(digitsOnly, 10);
  if (numeric >= 1 && numeric <= 31) return digitsOnly;
  return previousValue;
}

export function useAddSubscriptionForm() {
  const { addSubscription } = useSubscriptions();

  const [activeTab, setActiveTab] = useState('popular'); // 'popular' | 'custom'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [day, setDay] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('servicios');

  // Al hacer clic en un servicio popular (ej: Netflix)
  const handleSelectService = (service) => {
    setSelectedService(service);
    setName(service.name);
    setSelectedCategory(service.defaultCategory);
    if (service.plans && service.plans.length > 0) {
      setSelectedPlan(service.plans[0]);
      setPrice(formatPriceDigits(service.plans[0].price));
    }
  };

  // Al hacer clic en una tarjeta de plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPrice(formatPriceDigits(plan.price));
  };

  // onChangeText del campo de precio: sanitiza (con tope de MAX_CUSTOM_PRICE) y formatea en cada tecleo
  const handlePriceChange = (text) => {
    setPrice((previousFormatted) => {
      const previousDigits = previousFormatted.replace(/\D/g, '');
      const sanitizedDigits = sanitizePriceDigits(text, previousDigits);
      return formatPriceDigits(sanitizedDigits);
    });
  };

  // onChangeText de los campos de día: solo dígitos, y solo valores entre 1 y 31
  const handleDayChange = (text) => {
    setDay((previousDay) => sanitizeDayDigits(text, previousDay));
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDay('');
    setSelectedCategory('servicios');
    setSearchQuery('');
    setSelectedService(null);
    setSelectedPlan(null);
    setActiveTab('popular');
  };

  // Devuelve true si guardó, false si faltaban campos — así el componente sabe si cerrar el modal.
  const handleSave = () => {
    if (!name || !price || !day) return false;

    // Solo el nombre de marca del servicio (sin el plan elegido) — el plan
    // sigue determinando el precio, pero ya no se concatena al nombre.
    const finalName = selectedService ? selectedService.name : name;

    const newSub = {
      id: Date.now().toString(),
      name: finalName,
      icon: selectedService?.icon || null,
      price: parseInt(price.replace(/\D/g, ''), 10) || 0,
      day: parseInt(day),
      category: selectedCategory,
      createdAt: new Date().toISOString(),
    };

    addSubscription(newSub);
    resetForm();
    return true;
  };

  const filteredPopulars = POPULAR_SERVICES.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    selectedService,
    setSelectedService,
    selectedPlan,
    setSelectedPlan,
    name,
    setName,
    price,
    setPrice,
    day,
    setDay,
    selectedCategory,
    setSelectedCategory,
    handleSelectService,
    handleSelectPlan,
    handlePriceChange,
    handleDayChange,
    handleSave,
    resetForm,
    filteredPopulars,
  };
}
