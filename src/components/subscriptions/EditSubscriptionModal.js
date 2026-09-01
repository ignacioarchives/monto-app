import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { X } from 'phosphor-react-native';
import { colors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useEditSubscriptionForm } from '../../hooks/useEditSubscriptionForm';
import { REPORT_CATEGORIES } from '../../data/categories';
import FormInput from '../ui/FormInput';
import TagBadge from '../ui/TagBadge';

// Ícono "calendar-day" — misma copia que AddSubscriptionModal.js (fork intencional,
// mismo criterio que SubscriptionCardModal: sin acoplar componentes de modales distintos)
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

export default function EditSubscriptionModal({ visible, subscription, onClose }) {
  const form = useEditSubscriptionForm(subscription);
  const [attemptedSave, setAttemptedSave] = useState(false);

  const handleCloseModal = () => {
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
            <Text style={styles.title}>Editar suscripción</Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
              <X weight="bold" size={24} color={colors.warm[500]} />
            </TouchableOpacity>
          </View>

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
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
              <Text style={styles.saveButtonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </ScrollView>
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
  closeButton: {
    width: spacing['3xl'],
    height: spacing['3xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.warm[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabScroll: {
    flexGrow: 0,
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
