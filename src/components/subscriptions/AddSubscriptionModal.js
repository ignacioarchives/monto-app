import React, { useRef, useEffect, useState } from 'react';
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
  Animated,
} from 'react-native';
import { ArrowLeft, X, MagnifyingGlass, PlusCircle } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useAddSubscriptionForm } from '../../hooks/useAddSubscriptionForm';
import { REPORT_CATEGORIES } from '../../data/categories';
import FormInput from '../ui/FormInput';
import TagBadge from '../ui/TagBadge';
import PlanCard from '../ui/PlanCard';
import ServiceListItem from './ServiceListItem';

const AnimatedTabButton = Animated.createAnimatedComponent(TouchableOpacity);

export default function AddSubscriptionModal({ visible, onClose }) {
  const form = useAddSubscriptionForm();
  const [attemptedSave, setAttemptedSave] = useState(false);

  // Animación de fade del fondo de las solapas (Opción A: color, no posición)
  const popularAnim = useRef(new Animated.Value(form.activeTab === 'popular' ? 1 : 0)).current;
  const customAnim = useRef(new Animated.Value(form.activeTab === 'custom' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(popularAnim, {
      toValue: form.activeTab === 'popular' ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // backgroundColor no soporta el driver nativo
    }).start();
    Animated.timing(customAnim, {
      toValue: form.activeTab === 'custom' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [form.activeTab]);

  const popularBackground = popularAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.warm[75], colors.primary[500]],
  });
  const customBackground = customAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.warm[75], colors.primary[500]],
  });

  const handleCloseModal = () => {
    form.resetForm();
    setAttemptedSave(false);
    onClose();
  };

  const handleSavePress = () => {
    if (form.handleSave()) {
      setAttemptedSave(false);
      onClose();
    } else {
      setAttemptedSave(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          {/* Header del Modal */}
          <View style={styles.header}>
            {form.selectedService ? (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => form.setSelectedService(null)}
              >
                <View style={styles.backIconCircle}>
                  <ArrowLeft weight="bold" size={20} color={colors.warm[400]} />
                </View>
                <Text style={styles.backTitle}>Volver</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.title}>Añadir Suscripción</Text>
            )}

            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <X weight="bold" size={24} color={colors.warm[500]} />
            </TouchableOpacity>
          </View>

          {/* Siempre montado con el mismo tamaño (aunque no se vea) para que el modal
              mida igual elijas o no un servicio popular específico */}
          <View
            style={[styles.tabSelector, form.selectedService && styles.tabSelectorHidden]}
            pointerEvents={form.selectedService ? 'none' : 'auto'}
          >
            <AnimatedTabButton
              style={[styles.tabButton, { backgroundColor: popularBackground }]}
              onPress={() => form.setActiveTab('popular')}
            >
              <Text style={[styles.tabText, form.activeTab === 'popular' && styles.activeTabText]}>
                Populares
              </Text>
            </AnimatedTabButton>
            <AnimatedTabButton
              style={[styles.tabButton, { backgroundColor: customBackground }]}
              onPress={() => {
                form.setActiveTab('custom');
                form.setSelectedService(null);
              }}
            >
              <Text style={[styles.tabText, form.activeTab === 'custom' && styles.activeTabText]}>
                Personalizada
              </Text>
            </AnimatedTabButton>
          </View>

          {/* OPCIÓN 1: VISTA DE SERVICIO POPULAR SELECCIONADO (CON SUS 3 CARDS DE PLANES) */}
          {form.selectedService ? (
            <View style={styles.tabContent}>
              <ScrollView style={styles.tabScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionLabel}>Seleccioná tu plan</Text>

                {/* Contenedor de las 3 Cards de Planes */}
                <View style={styles.plansContainer}>
                  {form.selectedService.plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      name={plan.name}
                      price={plan.price}
                      selected={form.selectedPlan?.id === plan.id}
                      onPress={() => form.handleSelectPlan(plan)}
                    />
                  ))}
                </View>

                <FormInput
                  label="Día de cobro / Cuándo empieza (Día 1 al 31)"
                  placeholder="Ej. 15"
                  keyboardType="number-pad"
                  value={form.day}
                  onChangeText={form.handleDayChange}
                  maxLength={2}
                  error={attemptedSave && !form.day}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                  <Text style={styles.saveButtonText}>Añadir Suscripción</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            /* Alto fijo compartido entre "Populares" y "Personalizada" para que el modal no cambie de tamaño al cambiar de solapa */
            <View style={styles.tabContent}>
              {form.activeTab === 'popular' ? (
                /* LISTA DE POPULARES CON BUSCADOR */
                <>
                  <View style={styles.searchBox}>
                    <MagnifyingGlass weight="bold" size={20} color={colors.warm[400]} style={{ marginRight: spacing.sm }} />
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Buscar plataforma..."
                      placeholderTextColor={colors.warm[400]}
                      value={form.searchQuery}
                      onChangeText={form.setSearchQuery}
                    />
                  </View>

                  <ScrollView style={styles.tabScroll} showsVerticalScrollIndicator={false}>
                    {form.filteredPopulars.map((service) => (
                      <ServiceListItem
                        key={service.id}
                        service={service}
                        onPress={() => form.handleSelectService(service)}
                      />
                    ))}
                  </ScrollView>
                </>
              ) : (
                /* FORMULARIO PERSONALIZADO (SIN OPCIÓN DE REPETIR) */
                <ScrollView style={styles.tabScroll} showsVerticalScrollIndicator={false}>
                  <FormInput
                    label="Nombre de la suscripción"
                    placeholder="Ej. Gimnasio, Club..."
                    value={form.name}
                    onChangeText={form.setName}
                    error={attemptedSave && !form.name}
                  />

                  <FormInput
                    label="Precio ($)"
                    placeholder="Ej. 4.500"
                    keyboardType="number-pad"
                    value={form.price}
                    onChangeText={form.handlePriceChange}
                    error={attemptedSave && !form.price}
                  />

                  <FormInput
                    label="Día de cobro mensual (Día 1 al 31)"
                    placeholder="Ej. 10"
                    keyboardType="number-pad"
                    value={form.day}
                    onChangeText={form.handleDayChange}
                    maxLength={2}
                    error={attemptedSave && !form.day}
                  />

                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Categoría</Text>
                    <View style={styles.categoryRow}>
                      {REPORT_CATEGORIES.slice(0, 4).map(({ key, label, color }) => (
                        <TagBadge
                          key={key}
                          label={label}
                          selected={form.selectedCategory === key}
                          onPress={() => form.setSelectedCategory(key)}
                          activeColor={color}
                        />
                      ))}
                    </View>
                    <View style={styles.categoryRow}>
                      {REPORT_CATEGORIES.slice(4).map(({ key, label, color }) => (
                        <TagBadge
                          key={key}
                          label={label}
                          selected={form.selectedCategory === key}
                          onPress={() => form.setSelectedCategory(key)}
                          activeColor={color}
                        />
                      ))}
                      <TagBadge
                        label="Añadir"
                        icon={<PlusCircle weight="bold" size={16} color={colors.warm[500]} style={{ marginRight: spacing.xs }} />}
                        onPress={() => {}}
                      />
                    </View>
                  </View>

                  <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                    <Text style={styles.saveButtonText}>Añadir Suscripción</Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            </View>
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
    backgroundColor: colors.warm[0],
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing['2xl'],
    paddingBottom: spacing['4xl'],
    shadowColor: colors.warm[900],
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: colors.warm[900],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconCircle: {
    width: spacing['3xl'],
    height: spacing['3xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.warm[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backTitle: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: colors.warm[400],
    marginLeft: spacing.sm,
  },
  closeButton: {
    width: spacing['3xl'], // 32, mismo patrón que el closeButton del modal en CalendarSection.js
    height: spacing['3xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.warm[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.warm[75],
    borderRadius: borderRadius.md,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  tabSelectorHidden: {
    opacity: 0,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  tabText: {
    ...typography.bodySmall,
    fontWeight: fontWeights.medium,
    color: colors.warm[500],
  },
  activeTabText: {
    color: semanticColors.text.inverse,
    fontWeight: fontWeights.bold,
  },
  tabContent: {
    height: 380, // alto fijo compartido entre "Populares" y "Personalizada", no depende de la cantidad de contenido de cada solapa
  },
  tabScroll: {
    flex: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warm[50],
    borderWidth: 1,
    borderColor: colors.warm[150],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.warm[900],
  },
  sectionLabel: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.semibold,
    color: colors.warm[700],
    marginBottom: spacing.md,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: fontWeights.medium,
    color: colors.warm[700],
    marginBottom: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: colors.primary[500],
    borderRadius: 15,
    width: 344,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  saveButtonText: {
    ...typography.bodyLarge,
    fontWeight: fontWeights.bold,
    color: colors.warm[0],
  },
});
