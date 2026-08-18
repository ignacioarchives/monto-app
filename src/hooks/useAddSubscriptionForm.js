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
    plans: [
      { id: 'ub1', name: 'Mensual', price: '4990' },
    ],
  },
];

export function useAddSubscriptionForm() {
  const { addSubscription } = useSubscriptions();

  const [activeTab, setActiveTab] = useState('popular'); // 'popular' | 'custom'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [day, setDay] = useState('');
  const [selectedTag, setSelectedTag] = useState('Entretenimiento');

  // Al hacer clic en un servicio popular (ej: Netflix)
  const handleSelectService = (service) => {
    setSelectedService(service);
    setName(service.name);
    setSelectedTag(service.category);
    if (service.plans && service.plans.length > 0) {
      setSelectedPlan(service.plans[0]);
      setPrice(service.plans[0].price);
    }
  };

  // Al hacer clic en una tarjeta de plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPrice(plan.price);
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setDay('');
    setSelectedTag('Entretenimiento');
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
      price: parseFloat(price),
      day: parseInt(day),
      tag: selectedTag,
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
    selectedTag,
    setSelectedTag,
    handleSelectService,
    handleSelectPlan,
    handleSave,
    resetForm,
    filteredPopulars,
  };
}
