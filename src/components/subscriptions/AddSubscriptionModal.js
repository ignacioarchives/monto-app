import React from 'react';
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
import { ArrowLeft, X, MagnifyingGlass } from 'phosphor-react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useAddSubscriptionForm } from '../../hooks/useAddSubscriptionForm';
import FormInput from '../ui/FormInput';
import TagBadge from '../ui/TagBadge';
import PlanCard from '../ui/PlanCard';
import ServiceListItem from './ServiceListItem';

const TAGS = ['Entretenimiento', 'Música', 'Salud', 'Trabajo', 'Tecnología', 'Gaming', 'Otros'];

export default function AddSubscriptionModal({ visible, onClose }) {
  const form = useAddSubscriptionForm();

  const handleCloseModal = () => {
    form.resetForm();
    onClose();
  };

  const handleSavePress = () => {
    if (form.handleSave()) onClose();
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
                <ArrowLeft weight="bold" size={22} color={colors.warm[900]} />
                <Text style={styles.backTitle}>{form.selectedService.name}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.title}>Agregar Suscripción</Text>
            )}

            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <X weight="bold" size={24} color={colors.warm[500]} />
            </TouchableOpacity>
          </View>

          {/* Solapas sólo si no se ha seleccionado un servicio popular específico */}
          {!form.selectedService && (
            <View style={styles.tabSelector}>
              <TouchableOpacity
                style={[styles.tabButton, form.activeTab === 'popular' && styles.activeTabButton]}
                onPress={() => form.setActiveTab('popular')}
              >
                <Text style={[styles.tabText, form.activeTab === 'popular' && styles.activeTabText]}>
                  Populares
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, form.activeTab === 'custom' && styles.activeTabButton]}
                onPress={() => {
                  form.setActiveTab('custom');
                  form.setSelectedService(null);
                }}
              >
                <Text style={[styles.tabText, form.activeTab === 'custom' && styles.activeTabText]}>
                  Personalizada
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* OPCIÓN 1: VISTA DE SERVICIO POPULAR SELECCIONADO (CON SUS 3 CARDS DE PLANES) */}
          {form.selectedService ? (
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420 }}>
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
                keyboardType="numeric"
                value={form.day}
                onChangeText={form.setDay}
                maxLength={2}
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
                <Text style={styles.saveButtonText}>Guardar Suscripción</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : form.activeTab === 'popular' ? (
            /* LISTA DE POPULARES CON BUSCADOR */
            <View style={styles.popularContainer}>
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

              <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
                {form.filteredPopulars.map((service) => (
                  <ServiceListItem
                    key={service.id}
                    service={service}
                    onPress={() => form.handleSelectService(service)}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            /* FORMULARIO PERSONALIZADO (SIN OPCIÓN DE REPETIR) */
            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <FormInput
                label="Nombre de la suscripción"
                placeholder="Ej. Gimnasio, Club..."
                value={form.name}
                onChangeText={form.setName}
              />

              <FormInput
                label="Precio ($)"
                placeholder="Ej. 4500"
                keyboardType="numeric"
                value={form.price}
                onChangeText={form.setPrice}
              />

              <FormInput
                label="Día de cobro mensual (Día 1 al 31)"
                placeholder="Ej. 10"
                keyboardType="numeric"
                value={form.day}
                onChangeText={form.setDay}
                maxLength={2}
              />

              <View style={styles.formGroup}>
                <Text style={styles.label}>Categoría (Tag)</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {TAGS.map((tag) => (
                    <TagBadge
                      key={tag}
                      label={tag}
                      selected={form.selectedTag === tag}
                      onPress={() => form.setSelectedTag(tag)}
                    />
                  ))}
                </ScrollView>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
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
  backTitle: {
    ...typography.h3,
    fontWeight: fontWeights.bold,
    color: colors.warm[900],
    marginLeft: spacing.sm,
  },
  closeButton: {
    padding: spacing.xs,
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
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  activeTabButton: {
    backgroundColor: colors.warm[0],
    elevation: 2,
  },
  tabText: {
    ...typography.bodySmall,
    fontWeight: fontWeights.medium,
    color: colors.warm[500],
  },
  activeTabText: {
    color: colors.primary[500],
    fontWeight: fontWeights.bold,
  },
  popularContainer: {
    minHeight: 250,
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
  saveButton: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  saveButtonText: {
    ...typography.bodyLarge,
    fontWeight: fontWeights.bold,
    color: colors.warm[0],
  },
});
