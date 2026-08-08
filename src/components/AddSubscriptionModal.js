import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useSubscriptions } from '../context/SubscriptionContext';

// Lista de plataformas populares con sus 3 planes coSrresponSdientes
const POPULAR_SERVICES = [
  {
    id: 'p1',
    name: 'Netflix',
    icon: 'tv-outline',
    category: 'Entretenimiento',
    plans: [
      { id: 'n1', name: 'Estándar c/anuncios', price: '2499' },
      { id: 'n2', name: 'Estándar', price: '4199' },
      { id: 'n3', name: 'Premium', price: '5799' },
    ],
  },
  {
    id: 'p2',
    name: 'YouTube Premium',
    icon: 'logo-youtube',
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
    icon: 'musical-notes-outline',
    category: 'Música',
    plans: [
      { id: 's1', name: 'Estudiante', price: '1290' },
      { id: 's2', name: 'Individual', price: '2490' },
      { id: 's3', name: 'Familiar', price: '4190' },
    ],
  },
  {
    id: 'p4',
    name: 'PlayStation Plus',
    icon: 'game-controller-outline',
    category: 'Gaming',
    plans: [
      { id: 'ps1', name: 'Essential', price: '6999' },
      { id: 'ps2', name: 'Extra', price: '10499' },
      { id: 'ps3', name: 'Deluxe', price: '11999' },
    ],
  },
  {
    id: 'p5',
    name: 'HBO Max',
    icon: 'videocam-outline',
    category: 'Entretenimiento',
    plans: [
      { id: 'h1', name: 'Básico con anuncios', price: '2190' },
      { id: 'h2', name: 'Estándar', price: '3290' },
      { id: 'h3', name: 'Platino', price: '4390' },
    ],
  },
  {
    id: 'p6',
    name: 'Amazon Prime Video',
    icon: 'film-outline',
    category: 'Entretenimiento',
    plans: [
      { id: 'a1', name: 'Mensual Estándar', price: '2500' },
      { id: 'a2', name: 'Anual Oferta', price: '22000' },
    ],
  },
  {
    id: 'p7',
    name: 'Apple TV+',
    icon: 'desktop-outline',
    category: 'Entretenimiento',
    plans: [
      { id: 'ap1', name: 'Individual', price: '3500' },
      { id: 'ap2', name: 'Apple One', price: '7900' },
    ],
  },
  {
    id: 'p8',
    name: 'Hulu',
    icon: 'play-circle-outline',
    category: 'Entretenimiento',
    plans: [
      { id: 'hu1', name: 'Con anuncios', price: '2800' },
      { id: 'hu2', name: 'Sin anuncios', price: '5200' },
    ],
  },
];

const TAGS = ['Entretenimiento', 'Música', 'Salud', 'Trabajo', 'Tecnología', 'Gaming', 'Otros'];

export default function AddSubscriptionModal({ visible, onClose }) {
  const { addSubscription } = useSubscriptions();

  const [activeTab, setActiveTab] = useState('popular'); // 'popular' | 'custom'
  const [searchQuery, setSearchQuery] = useState('');

  // Plataforma popular seleccionada (si aplica)
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Campos del formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [day, setDay] = useState('');
  const [selectedTag, setSelectedTag] = useState('Entretenimiento');

  // Al hacer clic en un servicio popular (ej: Netflix)
  const handleSelectService = (service) => {
    setSelectedService(service);
    setName(service.name);
    setSelectedTag(service.category);
    // Seleccionar por defecto el primer plan
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

  const handleSave = () => {
    if (!name || !price || !day) return;

    const finalName = selectedService && selectedPlan 
      ? `${selectedService.name} (${selectedPlan.name})` 
      : name;

    const newSub = {
      id: Date.now().toString(),
      name: finalName,
      price: parseFloat(price),
      day: parseInt(day),
      tag: selectedTag,
      createdAt: new Date().toISOString(),
    };

    addSubscription(newSub);
    resetForm();
    onClose();
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

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  const filteredPopulars = POPULAR_SERVICES.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Header del Modal */}
          <View style={styles.header}>
            {selectedService ? (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setSelectedService(null)}
              >
                <Ionicons name="arrow-back" size={22} color="#1F2937" />
                <Text style={styles.backTitle}>{selectedService.name}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.title}>Agregar Suscripción</Text>
            )}

            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Solapas sólo si no se ha seleccionado un servicio popular específico */}
          {!selectedService && (
            <View style={styles.tabSelector}>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'popular' && styles.activeTabButton]}
                onPress={() => setActiveTab('popular')}
              >
                <Text style={[styles.tabText, activeTab === 'popular' && styles.activeTabText]}>
                  Populares
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, activeTab === 'custom' && styles.activeTabButton]}
                onPress={() => {
                  setActiveTab('custom');
                  setSelectedService(null);
                }}
              >
                <Text style={[styles.tabText, activeTab === 'custom' && styles.activeTabText]}>
                  Personalizada
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* OPCIÓN 1: VISTA DE SERVICIO POPULAR SELECCIONADO (CON SUS 3 CARDS DE PLANES) */}
          {selectedService ? (
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
              <Text style={styles.sectionLabel}>Seleccioná tu plan</Text>

              {/* Contenedor de las 3 Cards de Planes */}
              <View style={styles.plansContainer}>
                {selectedService.plans.map((plan) => {
                  const isSelected = selectedPlan?.id === plan.id;
                  return (
                    <TouchableOpacity
                      key={plan.id}
                      style={[styles.planCard, isSelected && styles.planCardSelected]}
                      onPress={() => handleSelectPlan(plan)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.planName, isSelected && styles.planNameSelected]}>
                        {plan.name}
                      </Text>
                      <Text style={[styles.planPrice, isSelected && styles.planPriceSelected]}>
                        ${plan.price}
                      </Text>
                      {isSelected && (
                        <View style={styles.checkBadge}>
                          <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Campo para la fecha de cobro / cuándo empieza */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Día de cobro / Cuándo empieza (Día 1 al 31)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. 15"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={day}
                  onChangeText={setDay}
                  maxLength={2}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Suscripción</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : activeTab === 'popular' ? (
            /* LISTA DE POPULARES CON BUSCADOR */
            <View style={styles.popularContainer}>
              <View style={styles.searchBox}>
                <Ionicons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar plataforma..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
                {filteredPopulars.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    style={styles.serviceItem}
                    onPress={() => handleSelectService(service)}
                  >
                    <View style={styles.serviceLeft}>
                      <View style={styles.iconCircle}>
                        <Ionicons name={service.icon} size={22} color={colors.primary} />
                      </View>
                      <View>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.serviceTag}>
                          {service.plans ? `${service.plans.length} planes disponibles` : service.category}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ) : (
            /* FORMULARIO PERSONALIZADO (SIN OPCIÓN DE REPETIR) */
            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nombre de la suscripción</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. Gimnasio, Club..."
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Precio ($)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. 4500"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Día de cobro mensual (Día 1 al 31)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ej. 10"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={day}
                  onChangeText={setDay}
                  maxLength={2}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Categoría (Tag)</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {TAGS.map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      style={[styles.tagBadge, selectedTag === tag && styles.activeTagBadge]}
                      onPress={() => setSelectedTag(tag)}
                    >
                      <Text style={[styles.tagText, selectedTag === tag && styles.activeTagText]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar Suscripción</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
  popularContainer: {
    minHeight: 250,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  serviceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  serviceTag: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  planCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 3,
    alignItems: 'center',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#EEF2FF',
  },
  planName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 6,
  },
  planNameSelected: {
    color: colors.primary,
  },
  planPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  planPriceSelected: {
    color: colors.primary,
  },
  checkBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  formGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1F2937',
  },
  tagBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeTagBadge: {
    backgroundColor: colors.primary,
  },
  tagText: {
    fontSize: 12,
    color: '#4B5563',
  },
  activeTagText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});