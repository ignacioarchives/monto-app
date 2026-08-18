import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { CaretDown, CalendarBlank, ShieldCheck, X, Trash } from 'phosphor-react-native';
import { colors, semanticColors } from '../../theme/colors';
import { typography, fontWeights } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { useSubscriptions } from '../../context/SubscriptionContext';
import ServiceIcon from '../ServiceIcon';
import { getCalendarDayInfo } from '../../utils/calendarHelpers';

// Días de la semana para la cabecera de las columnas (sin tildes, igual que el Figma)
const weekDays = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

// Generamos automáticamente los 31 días del mes
const monthDays = Array.from({ length: 31 }, (_, index) => index + 1);

const monthNames = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export default function CalendarSection() {
  const { subscriptions, deleteSubscription } = useSubscriptions();
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // Cobros este mes: todas las subs cobran una vez por mes (sin campo de frecuencia todavía)
  const chargeCount = subscriptions.length;
  const currentMonthLabel =
    monthNames[currentMonth][0].toUpperCase() + monthNames[currentMonth].slice(1);

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

      {/* ===== TARJETA DEL CALENDARIO ===== */}
      <View style={styles.card}>

        {/* 1. RESUMEN DEL MES + SELECTOR */}
        <View style={styles.monthRow}>
          {chargeCount === 0 ? (
            <Text style={styles.monthSummaryEmpty}>No hay cobros este mes</Text>
          ) : (
            <Text style={styles.monthSummaryText}>
              <Text style={styles.monthSummaryMuted}>Tenes </Text>
              <Text style={styles.monthSummaryCount}>
                {chargeCount} {chargeCount === 1 ? 'cobro' : 'cobros'}
              </Text>
              <Text style={styles.monthSummaryMuted}> este mes</Text>
            </Text>
          )}

          <TouchableOpacity style={styles.monthPill} activeOpacity={0.7}>
            <Text style={styles.monthPillText}>{currentMonthLabel}</Text>
            <CaretDown weight="bold" size={10} color={semanticColors.text.secondary} style={styles.monthPillIcon} />
          </TouchableOpacity>
        </View>

        {/* 2. CABECERA DE LOS DÍAS DE LA SEMANA */}
        <View style={styles.weekHeaderRow}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* 3. GRILLA DE LOS 31 DÍAS */}
        <View style={styles.gridContainer}>
          {monthDays.map((dayNumber) => {
            // Día real del mes actual vs. inexistente/pasado/hoy/futuro
            const { exists, status } = getCalendarDayInfo(currentYear, currentMonth, dayNumber, today);
            const isDisabled = !exists || status === 'past';
            const isToday = status === 'today';
            const isSelected = dayNumber === selectedDay;

            // Buscamos si hay cobros este día (nunca en días desactivados/pasados)
            const subsOnThisDay = isDisabled ? [] : subscriptions.filter((s) => s.day === dayNumber);
            const hasSubscription = subsOnThisDay.length > 0;

            // "Hoy" y "seleccionado" comparten el mismo tratamiento (borde), pero
            // un cobro real siempre gana por sobre ese indicador
            const isHighlighted = !isDisabled && !hasSubscription && (isToday || isSelected);
            const isFuturePlain = !isDisabled && !hasSubscription && !isHighlighted;

            return (
              <TouchableOpacity
                key={dayNumber}
                style={[
                  styles.dayCell,
                  isFuturePlain && styles.dayCellFuture,
                  isHighlighted && styles.dayCellHighlighted,
                  hasSubscription && styles.dayCellCharged,
                ]}
                onPress={() => handleDayPress(dayNumber)}
                activeOpacity={0.7}
                disabled={isDisabled}
              >
                {/* Íconos de las marcas que cobran ese día (hasta 2) */}
                {hasSubscription && (
                  <View style={styles.indicatorStack}>
                    {subsOnThisDay.slice(0, 2).map((sub, index) => (
                      <View
                        key={sub.id}
                        style={[styles.indicatorIconWrapper, index > 0 && styles.indicatorIconOverlap]}
                      >
                        <ServiceIcon serviceName={sub.icon || sub.name} size={14} variant="circle" tinted />
                      </View>
                    ))}
                  </View>
                )}

                {/* Número del día anclado bien abajo */}
                <Text style={[
                  styles.dateNumber,
                  hasSubscription && styles.dateNumberCharged,
                  isDisabled && styles.dateNumberDisabled,
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
            <CalendarBlank weight="bold" size={28} color={colors.warm[200]} />
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
                <ServiceIcon serviceName={sub.icon || sub.name} size={40} />
                <View style={styles.subCardText}>
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
                <ShieldCheck weight="bold" size={24} color={colors.primary[500]} />
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <X weight="bold" size={20} color={colors.warm[500]} />
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
                  <CalendarBlank weight="bold" size={16} color={colors.warm[500]} />
                  <Text style={styles.infoText}>Fecha de cobro: Día {selectedSub.day} de cada mes</Text>
                </View>

                {/* Acciones del Modal */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(selectedSub.id)}
                  >
                    <Trash weight="bold" size={18} color={colors.red[500]} style={{ marginRight: spacing.sm }} />
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
    marginTop: spacing.md, // 12, lo más cerca de 14px que hay en el design system
    width: '100%',
    paddingHorizontal: spacing.lg,
  },

  /* --- TARJETA DEL CALENDARIO --- */
  card: {
    width: '100%',
    backgroundColor: colors.warm[0],
    borderWidth: 1,
    borderColor: colors.warm[150],
    borderRadius: borderRadius.lg, // 16, coincide con Figma
    paddingHorizontal: spacing['2xl'], // 24
    paddingVertical: spacing.lg, // 16
    ...shadows.lg, // sombra grande y difusa, la más cercana a la del diseño
  },

  /* --- RESUMEN DEL MES + SELECTOR --- */
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  monthSummaryText: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.medium,
  },
  monthSummaryMuted: {
    color: semanticColors.text.secondary,
  },
  monthSummaryCount: {
    color: semanticColors.text.primary,
    fontWeight: fontWeights.semibold,
  },
  monthSummaryEmpty: {
    ...typography.bodyMedium,
    fontWeight: fontWeights.medium,
    color: semanticColors.text.secondary,
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warm[75],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  monthPillText: {
    ...typography.badge,
    color: semanticColors.text.secondary,
  },
  monthPillIcon: {
    marginLeft: spacing.xxs,
  },

  /* --- CABECERA DE DÍAS DE LA SEMANA --- */
  weekHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8, aprox al gap de Figma (~9px)
    marginBottom: spacing.sm,
  },
  weekDayCell: {
    width: 34, // ancho de celda de grilla (ver dayCell)
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    ...typography.badge, // 11/14/semibold, coincide exacto con Figma
    color: semanticColors.text.primary,
  },

  /* --- GRILLA DEL CALENDARIO --- */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // 8, aprox al gap de Figma (~9px)
  },

  dayCell: {
    width: 34, // ancho exacto de celda en Figma
    height: 45, // 38 (Figma) + 7px para que los días queden un poco más largos
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center', // centra verticalmente el ícono de suscripción
    borderRadius: borderRadius.sm, // 8, más cercano al 7-10px que trae Figma
  },
  // Día futuro habilitado, sin cobro, sin seleccionar
  dayCellFuture: {
    backgroundColor: colors.warm[50],
  },
  // Día actual o seleccionado (sin cobro): sin fondo, solo borde
  dayCellHighlighted: {
    borderWidth: 1,
    borderColor: colors.warm[150],
  },
  // Día con cobro: siempre gana por sobre cualquier otro estado
  dayCellCharged: {
    backgroundColor: colors.primary[500],
  },

  /* --- INDICADOR DE SUSCRIPCIÓN --- */
  indicatorStack: {
    flexDirection: 'row',
    marginTop: -13, // sube el ícono respecto del centro de la celda
  },
  indicatorIconWrapper: {
    borderRadius: borderRadius.full,
  },
  indicatorIconOverlap: {
    marginLeft: -spacing.xxs,
  },

  dateNumber: {
    position: 'absolute',
    bottom: spacing.xs, // 4
    ...typography.caption, // 12/16/medium, coincide con Figma para días sin cobro
    color: semanticColors.text.primary,
  },
  dateNumberCharged: {
    color: semanticColors.text.inverse,
    fontWeight: fontWeights.semibold,
  },
  dateNumberDisabled: {
    color: colors.warm[300],
  },

  /* --- DETALLES DEL DÍA --- */
  detailsContainer: {
    width: '100%',
    marginTop: spacing['2xl'],
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
  subCardText: {
    marginLeft: spacing.md,
  },
  subName: {
    ...typography.bodyLarge,
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
    width: spacing['5xl'], // 48
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
    ...typography.h1, // 24/bold
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
