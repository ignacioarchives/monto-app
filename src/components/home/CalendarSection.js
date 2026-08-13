import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useSubscriptions } from '../../context/SubscriptionContext';
import ServiceIcon from '../ServiceIcon';

// Días de la semana para la cabecera de las columnas
const weekDays = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

// Generamos automáticamente los 31 días del mes
const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);

export default function CalendarSection() {
  const { subscriptions, deleteSubscription } = useSubscriptions();
  const [selectedDay, setSelectedDay] = useState(10);

  // Estados para controlar el Modal y el item seleccionado
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  // Filtramos qué suscripciones caen en el día seleccionado
  const selectedDaySubscriptions = subscriptions.filter(
    (sub) => sub.day === selectedDay
  );

  // Función para abrir el modal con la suscripción tocada
  const handleOpenModal = (sub) => {
    setSelectedSub(sub);
    setModalVisible(true);
  };

  // Manejador al tocar un día del calendario
  const handleDayPress = (dayNumber) => {
    setSelectedDay(dayNumber);

    // Buscamos si hay suscripciones en este día específico
    const subsOnThisDay = subscriptions.filter((s) => s.day === dayNumber);

    // Si hay cobros en este día, abrimos automáticamente el modal con el primero de ellos
    if (subsOnThisDay.length > 0) {
      setSelectedSub(subsOnThisDay[0]);
      setModalVisible(true);
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSub(null);
  };

  // Función para eliminar desde el modal
  const handleDelete = (id) => {
    deleteSubscription(id);
    handleCloseModal();
  };

  return (
    <View style={styles.container}>

      {/* ===== CONTENEDOR GENERAL DEL CALENDARIO ===== */}
      <View style={styles.calendarWrapper}>

        {/* 1. CABECERA DE LOS DÍAS DE LA SEMANA */}
        <View style={styles.weekHeaderRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* 2. GRILLA DE LOS 31 DÍAS */}
        <View style={styles.gridContainer}>
          {monthDays.map((dayNumber) => {
            const isSelected = dayNumber === selectedDay;

            // Buscamos si hay cobros este día para poner el indicador
            const subsOnThisDay = subscriptions.filter((s) => s.day === dayNumber);
            const hasSubscription = subsOnThisDay.length > 0;

            // NUEVA LÓGICA: El día es visualmente "activo" si lo tocaste o si tiene un cobro
            const isVisuallyActive = isSelected || hasSubscription;

            return (
              <TouchableOpacity
                key={dayNumber}
                style={[
                  styles.dayCell,
                  isVisuallyActive && styles.dayCellSelected // 👈 Se pinta de azul si cumple la condición
                ]}
                onPress={() => handleDayPress(dayNumber)}
                activeOpacity={0.7}
              >
                {/* Espacio central: Indicador de Suscripción (íconos de las marcas que cobran ese día, hasta 2) */}
                {hasSubscription && (
                  <View style={styles.indicatorStack}>
                    {subsOnThisDay.slice(0, 2).map((sub, index) => (
                      <View
                        key={sub.id}
                        style={[styles.indicatorIconWrapper, index > 0 && styles.indicatorIconOverlap]}
                      >
                        <ServiceIcon serviceName={sub.icon || sub.name} size={16} variant="circle" tinted />
                      </View>
                    ))}
                  </View>
                )}

                {/* Número del día anclado bien abajo */}
                <Text style={[
                  styles.dateNumber,
                  isVisuallyActive && styles.dateNumberSelected // 👈 Texto azul/bold si cumple la condición
                ]}>
                  {dayNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ===== DETALLE DEL DÍA SELECCIONADO ===== */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>Cobros del día {selectedDay}</Text>
          {selectedDaySubscriptions.length > 0 && (
            <Text style={styles.countBadge}>
              {selectedDaySubscriptions.length}
            </Text>
          )}
        </View>

        {selectedDaySubscriptions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-clear-outline" size={28} color={colors.warm[200]} />
            <Text style={styles.emptyText}>Día libre de cobros</Text>
          </View>
        ) : (
          selectedDaySubscriptions.map((sub) => (
            <TouchableOpacity
              key={sub.id}
              style={styles.subCard}
              activeOpacity={0.8}
              onPress={() => handleOpenModal(sub)}
            >
              <View style={styles.subCardLeft}>
                <View style={styles.iconCircle}>
                  <Ionicons name="sparkles" size={18} color={colors.primary[500]} />
                </View>
                <View>
                  <Text style={styles.subName}>{sub.name}</Text>
                  <Text style={styles.subTag}>{sub.tag || 'Suscripción'}</Text>
                </View>
              </View>
              <Text style={styles.subPrice}>${sub.price}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* ===== MODAL / POPUP DE DETALLE ===== */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {/* Cabecera del Modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="shield-checkmark" size={24} color={colors.primary[500]} />
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Ionicons name="close" size={20} color={colors.warm[500]} />
              </TouchableOpacity>
            </View>

            {/* Información de la Suscripción */}
            {selectedSub && (
              <View style={styles.modalBody}>
                <Text style={styles.modalSubName}>{selectedSub.name}</Text>
                <Text style={styles.modalSubTag}>{selectedSub.tag || 'Suscripción mensual'}</Text>

                <View style={styles.priceContainerModal}>
                  <Text style={styles.priceLabel}>Monto a debitar</Text>
                  <Text style={styles.modalSubPrice}>${selectedSub.price}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color={colors.warm[500]} />
                  <Text style={styles.infoText}>Fecha de cobro: Día {selectedSub.day} de cada mes</Text>
                </View>

                {/* Acciones del Modal */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(selectedSub.id)}
                  >
                    <Ionicons name="trash-outline" size={18} color={colors.red[500]} style={{ marginRight: spacing.sm }} />
                    <Text style={styles.deleteButtonText}>Eliminar suscripción</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing['3xl'], // 32, valor original era 28 (sin token exacto)
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  /* --- CONTENEDOR PRINCIPAL DEL CALENDARIO --- */
  calendarWrapper: {
    width: 364, // ancho de grilla calculado (7 columnas x 44px + gaps), no es un valor de espaciado
    alignSelf: 'center',
    marginLeft: spacing.lg, // 16, valor original era 15
  },

  /* --- CABECERA DE DÍAS DE LA SEMANA --- */
  weekHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8, valor original era 7
    marginBottom: spacing.sm,
  },
  weekDayCell: {
    width: 44, // ancho de celda de grilla (ver dayCell)
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    ...typography.bodySmall,
    fontWeight: fontWeights.bold,
    color: colors.primary[500],
  },

  /* --- GRILLA DEL CALENDARIO --- */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8, valor original era 7
  },

  dayCell: {
    width: 44, // ancho de celda de grilla
    height: 52, // alto de celda de grilla
    position: 'relative',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.warm[0],
    borderWidth: 1,
    borderColor: colors.warm[150],
  },
  dayCellSelected: {
    backgroundColor: colors.primary[100],
    borderColor: colors.primary[100],
    borderWidth: 1,
  },

  /* --- INDICADOR DE SUSCRIPCIÓN --- */
  indicatorStack: {
    flexDirection: 'row',
    marginTop: spacing.sm, // 8, más cerca del número de abajo
  },
  indicatorIconWrapper: {
    borderRadius: borderRadius.full,
  },
  indicatorIconOverlap: {
    marginLeft: -spacing.xs, // 4, para que el segundo ícono se superponga al primero
  },

  dateNumber: {
    position: 'absolute',
    bottom: spacing.xs, // 4
    ...typography.bodyLarge, // 16, valor original era 15
    fontWeight: fontWeights.medium,
    color: semanticColors.text.primary,
  },
  dateNumberSelected: {
    color: colors.primary[500],
    fontWeight: fontWeights.bold,
  },

  /* --- DETALLES DEL DÍA --- */
  detailsContainer: {
    width: '100%',
    marginTop: spacing['2xl'],
    paddingHorizontal: spacing.sm,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailsTitle: {
    ...typography.bodyLarge,
    fontWeight: fontWeights.bold,
    color: colors.warm[900],
  },
  countBadge: {
    backgroundColor: colors.primary[100],
    color: colors.primary[500],
    ...typography.caption,
    fontWeight: fontWeights.bold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    backgroundColor: colors.warm[50],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.warm[100],
  },
  emptyText: {
    marginTop: spacing.sm,
    ...typography.bodyMedium,
    color: colors.warm[400],
  },
  subCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.warm[0],
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.warm[100],
  },
  subCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: spacing['4xl'], // 40, valor original era 36
    height: spacing['4xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  subName: {
    ...typography.bodyLarge, // 16, valor original era 15
    fontWeight: fontWeights.semibold,
    color: colors.warm[900],
  },
  subTag: {
    ...typography.caption,
    color: colors.warm[500],
    marginTop: spacing.xxs,
  },
  subPrice: {
    ...typography.bodyLarge,
    fontWeight: fontWeights.bold,
    color: colors.warm[900],
  },

  /* --- ESTILOS DEL MODAL --- */
  modalOverlay: {
    flex: 1,
    // rgba equivalente a colors.warm[900] al 60% de opacidad (no hay helper hex->rgba en el theme)
    backgroundColor: 'rgba(28, 25, 23, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.warm[0],
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    shadowColor: colors.warm[900],
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalIconContainer: {
    width: spacing['5xl'], // 48, valor original era 44
    height: spacing['5xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: spacing['3xl'], // 32
    height: spacing['3xl'],
    borderRadius: borderRadius.full,
    backgroundColor: colors.warm[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    alignItems: 'flex-start',
  },
  modalSubName: {
    ...typography.h2, // 20
    fontWeight: fontWeights.bold,
    color: colors.warm[900],
  },
  modalSubTag: {
    ...typography.bodySmall,
    color: colors.warm[500],
    marginTop: spacing.xxs,
    marginBottom: spacing.xl,
  },
  priceContainerModal: {
    width: '100%',
    backgroundColor: colors.warm[50],
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.warm[100],
  },
  priceLabel: {
    ...typography.caption,
    color: colors.warm[500],
    marginBottom: spacing.xs,
  },
  modalSubPrice: {
    ...typography.h1, // 24/bold, match exacto
    color: colors.primary[500],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  infoText: {
    marginLeft: spacing.sm,
    ...typography.bodySmall,
    color: colors.warm[700],
  },
  modalActions: {
    width: '100%',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red[100],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.red[100],
  },
  deleteButtonText: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.semibold,
    color: colors.red[500],
  },
});
