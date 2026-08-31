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
import Svg, { Path } from 'react-native-svg';
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
import { getServiceColor } from '../ServiceIcon';

const AnimatedTabButton = Animated.createAnimatedComponent(TouchableOpacity);

// Ícono "calendar-day" exportado desde Figma (asset real, no dibujado a mano)
function CalendarDayIcon({ size = 24, color = colors.warm[400] }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
        d="M7.675 2C8.14444 2 8.525 2.38376 8.525 2.85714V3.71429H14.475V2.85714C14.475 2.38376 14.8556 2 15.325 2C15.7944 2 16.175 2.38376 16.175 2.85714V3.73545C18.3227 3.95047 20 5.77771 20 8V15.7143C20 18.0812 18.0972 20 15.75 20H7.25C4.90279 20 3 18.0812 3 15.7143V8C3 5.77771 4.67734 3.95047 6.825 3.73545V2.85714C6.825 2.38376 7.20556 2 7.675 2ZM4.8451 7.14286H18.1549C17.8048 6.14412 16.8603 5.42857 15.75 5.42857H7.25C6.13971 5.42857 5.19516 6.14412 4.8451 7.14286ZM18.3 8.85714H4.7V15.7143C4.7 17.1344 5.84167 18.2857 7.25 18.2857H15.75C17.1583 18.2857 18.3 17.1344 18.3 15.7143V8.85714ZM6.4 11.4286C6.4 10.9552 6.78056 10.5714 7.25 10.5714H10.65C11.1194 10.5714 11.5 10.9552 11.5 11.4286V14.8571C11.5 15.3305 11.1194 15.7143 10.65 15.7143H7.25C6.78056 15.7143 6.4 15.3305 6.4 14.8571V11.4286ZM9.8 12.2857H8.1V14H9.8V12.2857Z"
      />
    </Svg>
  );
}

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

          {/* Solapas sólo si no se ha seleccionado un servicio popular específico */}
          {!form.selectedService && (
            <View style={styles.tabSelector}>
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
          )}

          {/* OPCIÓN 1: VISTA DE SERVICIO POPULAR SELECCIONADO (CON SUS 3 CARDS DE PLANES) */}
          {form.selectedService ? (
            // Altura mayor que tabContent: compensa el espacio que ocupaba el selector de
            // solapas (que acá no se muestra), para que el modal mida igual en las dos vistas.
            <View style={styles.tabContentSelected}>
              <ScrollView style={styles.tabScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionLabel}>
                  Planes de <Text style={styles.sectionLabelBold}>{form.selectedService.name}</Text>
                </Text>

                {/* Contenedor de las cards de planes */}
                <View style={styles.plansContainer}>
                  {form.selectedService.plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      brandName={form.selectedService.name}
                      brandColor={getServiceColor(form.selectedService.icon)}
                      name={plan.name}
                      price={plan.price}
                      selected={form.selectedPlan?.id === plan.id}
                      onPress={() => form.handleSelectPlan(plan)}
                    />
                  ))}
                </View>

                <FormInput
                  label="Empieza"
                  placeholder="Empieza hoy mismo"
                  keyboardType="number-pad"
                  value={form.day}
                  onChangeText={form.handleDayChange}
                  maxLength={2}
                  error={attemptedSave && !form.day}
                  icon={<CalendarDayIcon size={20} color={colors.warm[400]} />}
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
                    placeholder="Empieza hoy mismo"
                    keyboardType="number-pad"
                    value={form.day}
                    onChangeText={form.handleDayChange}
                    maxLength={2}
                    error={attemptedSave && !form.day}
                    icon={<CalendarDayIcon size={20} color={colors.warm[400]} />}
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
    marginBottom: spacing['2xl'],
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
  tabContentSelected: {
    // 380 + el alto que ocupaba el selector de solapas (~42) + su marginBottom (16),
    // que en esta vista no se renderiza, para que el modal mida igual en total.
    height: 380 + 58,
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
    color: colors.warm[400],
    marginBottom: spacing.md,
  },
  sectionLabelBold: {
    fontWeight: fontWeights.bold,
    color: colors.text.darkAlt,
  },
  plansContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
